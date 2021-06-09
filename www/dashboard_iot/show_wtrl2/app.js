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

let showChart = async (param, cat, dat) => {
    Highcharts.chart(param, {

        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        subtitle: {
            text: '',
            style: {
                display: 'none'
            }
        },

        yAxis: {
            title: {
                text: param
            }
        },

        xAxis: {
            categories: cat
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        series: [{
            name: param,
            data: dat
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
}

let last = []
let loadData = async (station) => {
    try {
        let resp = await axios.post("https://eec-onep.soc.cmu.ac.th/api/wtrl-api-get2.php", { station: station, limit: 15 });
        let datDeep = [];
        let datTemp = [];
        let datHumi = [];
        let cat = [];
        let d;
        let t;
        resp.data.data.map(i => {
            d = i.d;
            t = i.t;
            $("#sta").text(`${i.stname}`);
            $("#date").text(`${i.d}`);
            $("#time").text(`${i.t}`);
            cat.push(i.t);
            datDeep.push(Number(i.deep));
            datTemp.push(Number(i.temperature));
            datHumi.push(Number(i.humidity));
        });

        if (last.toString() !== cat.toString()) {
            await showChart("deep", cat, datDeep);
            await showChart("temperature", cat, datTemp);
            await showChart("humidity", cat, datHumi);
        }
        // console.log(last, cat);
        last = cat;
    } catch (err) {
        console.error(err);
    }
}

loadData("station_01");

$("#station").on("change", function () {
    console.log(this.value);
    loadData(this.value);

    setInterval(async () => {
        await loadData(this.value);
    }, 10000);
})




