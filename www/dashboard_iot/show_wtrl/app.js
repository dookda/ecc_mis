var map = L.map('map', {
    center: [18.335017, 99.719808],
    zoom: 9,
    zoomControl: false
});


var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    lyr: 'basemap'
});
var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
    lyr: 'basemap'
});

var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
    lyr: 'basemap'
});

const grod = L.tileLayer('https://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    lyr: 'basemap'
});
const ghyb = L.tileLayer('https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    lyr: 'basemap'
});

// let lyrs = L.layerGroup();
// axios.get('http://localhost:3700/api/basestation').then((r) => {
//     // console.log(r);
//     r.data.data.map(i => {
//         // console.log(i);
//         let mk = L.marker([i.y_coor, i.x_coor]);
//         mk.bindPopup('สถานี ' + i.stat_name)
//         mk.addTo(lyrs)
//     })
// })

var baseMap = {
    "แผนที่ OSM": osm,
    "แผนที่ CartoDB": CartoDB_Positron.addTo(map),
    "แผนที่ถนน": grod,
    "แผนที่ภาพถ่าย": ghyb
}

var overlayMap = {
    // "ตำแหน่งสถานีตรวจวัด": lyrs.addTo(map)
}

L.control.layers(baseMap, overlayMap).addTo(map)
L.control.zoom({ position: 'bottomright' }).addTo(map);

const url = "http://localhost:3700";

var chart;

let showChart = (div, unit, dat) => {
    Highcharts.chart(div, {
        chart: {
            type: 'spline',
            animation: Highcharts.svg,
            // marginRight: 100,
            events: {
                load: function () {
                    var series = this.series[0];
                    setInterval(async () => {
                        axios.post("https://eec-onep.soc.cmu.ac.th/api/wtrl-api.php", { param: "rangd", limit: 1 }).then((r) => {
                            console.log(r);
                            let x = r.data.data[0].ts;
                            // let x = Number(r.data.data[0].ts * 1000)
                            let y = Number(r.data.data[0].val);
                            // changeColorWarning(sta, y)
                            // changeColorMarker(sta, y)
                            return series.addPoint([x, y], true, true);
                        })
                    }, 2000);
                }
            },
            zoomType: 'x'
        },

        time: {
            useUTC: false
        },

        title: false,
        accessibility: {
            announceNewData: {
                enabled: true,
                minAnnounceInterval: 15000,
                announcementFormatter: function (allSeries, newSeries, newPoint) {
                    if (newPoint) {
                        return 'New point added. Value: ' + newPoint.y;
                    }
                    return false;
                }
            }
        },

        xAxis: {
            type: 'datetime',
            tickPixelInterval: 120,
            minorTickInterval: 'auto',
            startOnTick: false,
            endOnTick: false
        },

        yAxis: {
            title: {
                text: unit
            },
            // min: -5,
            // max: 5,
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],
            tickInterval: 1
        },

        tooltip: {
            headerFormat: '<b>{series.name}</b><br/>',
            //  pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f} cm'
            pointFormat: 'เวลา {point.x:%H:%M:%S} น.<br/>{point.y:.2f} cm'
        },

        legend: {
            enabled: false
        },

        exporting: {
            enabled: false
        },

        plotOptions: {
            series: {
                marker: {
                    enabled: false
                }
            }
        },
        series: [{
            name: 'value',
            data: dat
        }]
    })
}

axios.get("https://eec-onep.soc.cmu.ac.th/api/wtrq-api-get.php").then(async (r) => {
    console.log(r);
    let data = [];
    let time = (new Date()).getTime();
    r.data.data.map(i => {
        data.push({
            x: i.ts,
            y: Number(i.val)
        });
    })
    showChart("rangd", "mg/L", data)
})

