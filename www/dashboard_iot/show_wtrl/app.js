var map = L.map('map', {
    center: [13.335017, 101.719808],
    zoom: 7,
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

const tam = L.tileLayer.wms("https://rti2dss.com:8443/geoserver/th/wms?", {
    layers: "th:tambon_4326",
    format: "image/png",
    transparent: true,
    CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=22 OR pro_code=23 OR pro_code=24 OR pro_code=25 OR pro_code=26 OR pro_code=27'
});

const amp = L.tileLayer.wms("https://rti2dss.com:8443/geoserver/th/wms?", {
    layers: "th:amphoe_4326",
    format: "image/png",
    transparent: true,
    CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=22 OR pro_code=23 OR pro_code=24 OR pro_code=25 OR pro_code=26 OR pro_code=27'
});

const pro = L.tileLayer.wms("https://rti2dss.com:8443/geoserver/th/wms?", {
    layers: "th:province_4326",
    format: "image/png",
    transparent: true,
    CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=22 OR pro_code=23 OR pro_code=24 OR pro_code=25 OR pro_code=26 OR pro_code=27'
});

let mk1 = L.marker([12.8661616, 100.9989804]).bindPopup('อบต.ห้วยใหญ่3'),
    mk2 = L.marker([12.848099999999983, 100.95313000000002]).bindPopup('อบต.ห้วยใหญ่2'),
    mk3 = L.marker([12.846510200000028, 100.9376361]).bindPopup('อบต.ห้วยใหญ่1'),
    mk4 = L.marker([12.694406999999996, 101.44470699999997]).bindPopup('อบต.สำนักทอง1'),
    mk5 = L.marker([12.703484000000008, 101.468717]).bindPopup('อบต.สำนักทอง2'),
    mk6 = L.marker([12.70139960000001, 101.49543049999]).bindPopup('อบต.กะเฉด3'),
    mk7 = L.marker([12.985111299999994, 101.6776677]).bindPopup('อบต.เขาชะเมา1'),
    mk8 = L.marker([12.909515899999995, 101.71460159999998]).bindPopup('อบต.น้ำเป็น2'),
    mk9 = L.marker([12.836749900000017, 101.73254899999998]).bindPopup('อบต.น้ำเป็น3');

var sensor = L.layerGroup([mk1, mk2, mk3, mk4, mk5, mk6, mk7, mk8, mk9]);

var baseMap = {
    "แผนที่ OSM": osm,
    "แผนที่ CartoDB": CartoDB_Positron,
    "แผนที่ถนน": grod,
    "แผนที่ภาพถ่าย": ghyb.addTo(map)
}

var overlayMap = {
    "ขอบเขตตำบล": tam.addTo(map),
    "ขอบเขตอำเภอ": amp.addTo(map),
    "ขอบเขตจังหวัด": pro.addTo(map),
    "ตำแหน่ง sensor": sensor.addTo(map)
}

L.control.layers(baseMap, overlayMap).addTo(map)
// L.control.zoom({ position: 'bottomright' }).addTo(map);
let onLocationFound = () => { };
map.on("locationfound", onLocationFound);
// map.on("locationerror", onLocationError);
// map.locate({ setView: true, maxZoom: 19 });

var lc = L.control.locate({
    position: 'topleft',
    strings: {
        title: ""
    },
    locateOptions: {
        enableHighAccuracy: true,
    }
}).addTo(map);

lc.start();


var chart;

let showChart = async (station, param, unit, dat) => {
    Highcharts.chart(param, {
        chart: {
            type: 'spline',
            animation: Highcharts.svg,
            // marginRight: 100,
            events: {
                load: function () {
                    var series = this.series[0];
                    setInterval(async () => {
                        await axios.post("https://eec-onep.soc.cmu.ac.th/api/wtrl-api.php", { station: station, param: param, limit: 1 }).then((r) => {
                            console.log(r);

                            let x = (new Date()).getTime();
                            let y = Number(r.data.data[0].val);
                            return series.addPoint([x, y], true, true);
                        })
                    }, 10000);
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
            name: param,
            data: dat
        }]
    })
}

$("#station").on("change", async function () {
    let station = this.value;
    let deep = "deep";
    let humidity = "humidity";
    let temperature = "temperature";
    await axios.post("https://eec-onep.soc.cmu.ac.th/api/wtrl-api.php", { station: station, param: deep, limit: 15 }).then(async (r) => {
        console.log(r);
        let data = [];
        let time = (new Date()).getTime();
        r.data.data.map((i, k) => {
            data.push({
                x: time + k * 500,
                y: Number(i.val)
            });
        })
        showChart(station, deep, "cm", data)
    })

    await axios.post("https://eec-onep.soc.cmu.ac.th/api/wtrl-api.php", { station: station, param: humidity, limit: 15 }).then(async (r) => {
        console.log(r);
        let data = [];
        let time = (new Date()).getTime();
        r.data.data.map((i, k) => {
            data.push({
                x: time + k * 500,
                y: Number(i.val)
            });
        })
        showChart(station, humidity, "%", data)
    })

    await axios.post("https://eec-onep.soc.cmu.ac.th/api/wtrl-api.php", { station: station, param: temperature, limit: 15 }).then((r) => {
        console.log(r);
        let data = [];
        let time = (new Date()).getTime();

        r.data.data.map((i, k) => {
            data.push({
                x: time + k * 500,
                y: Number(i.val)
            });
        })
        showChart(station, temperature, "°C", data)
    })
})


