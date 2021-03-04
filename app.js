var map = L.map('map', {
    center: [18.335017, 99.719808],
    zoom: 12,
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

let lyrs = L.layerGroup();
axios.get('http://localhost:3000/api/basestation').then((r) => {
    // console.log(r);
    r.data.data.map(i => {
        // console.log(i);
        let mk = L.marker([i.y_coor, i.x_coor]);
        mk.bindPopup('สถานี ' + i.stat_name)
        mk.addTo(lyrs)
    })
})

var baseMap = {
    "แผนที่ OSM": osm,
    "แผนที่ CartoDB": CartoDB_Positron.addTo(map),
    "แผนที่ถนน": grod,
    "แผนที่ภาพถ่าย": ghyb
}

var overlayMap = {
    "ตำแหน่งสถานีตรวจวัด": lyrs.addTo(map)
}

L.control.layers(baseMap, overlayMap).addTo(map)
L.control.zoom({ position: 'bottomright' }).addTo(map);


let showChart = (sta, data) => {
    Highcharts.chart(sta, {
        chart: {
            // type: 'spline',
            animation: Highcharts.svg,
            // marginRight: 100,
            events: {
                load: function () {
                    var series = this.series[0];
                    setInterval(async () => {
                        let d = await data;
                        console.log(d.data.data[0]);
                        var x = (new Date()).getTime(), // current time
                            y = d.data.data[0].diff;
                        return series.addPoint([x, y], true, true);
                    }, 3000);
                }
            }
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
            tickPixelInterval: 150
        },

        yAxis: {
            title: {
                text: 'Difference'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },

        tooltip: {
            headerFormat: '<b>{series.name}</b><br/>',
            pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
        },

        legend: {
            enabled: false
        },

        exporting: {
            enabled: false
        },

        series: [{
            name: 'difference',
            data: (function () {
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -5; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: Math.random()
                    });
                }
                // console.log(data);
                return data;
            }())
        }]
    })
}

const sta_01 = axios.post('http://localhost:3000/api/lastposition', { stat_code: 'sta001' })
const sta_02 = axios.post('http://localhost:3000/api/lastposition', { stat_code: 'sta002' })
const sta_03 = axios.post('http://localhost:3000/api/lastposition', { stat_code: 'sta003' })
const sta_04 = axios.post('http://localhost:3000/api/lastposition', { stat_code: 'sta004' })
const sta_05 = axios.post('http://localhost:3000/api/lastposition', { stat_code: 'sta005' })

// call function
showChart('sta_01', sta_01);
showChart('sta_02', sta_02);
showChart('sta_03', sta_03);
showChart('sta_04', sta_04);
showChart('sta_05', sta_05);

