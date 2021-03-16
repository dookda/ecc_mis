let userid;
$(document).ready(async function () {
    // await liff.init({ liffId: "1653987548-eakD174y" });
    loadMap();
});

let latlng = {
    lat: 13.305567,
    lng: 101.383101
};
let map = L.map("map", {
    center: latlng,
    zoom: 8
});
let marker, gps, dataurl;
const url = 'http://localhost:3100';
// const url = "https://rti2dss.com:3100";

function loadMap() {
    var mapbox = L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
        {
            maxZoom: 18,
            attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: "mapbox/light-v9",
            tileSize: 512,
            zoomOffset: -1
        }
    );

    const ghyb = L.tileLayer("https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}", {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"]
    });

    var pro = L.tileLayer.wms("https://rti2dss.com:8443/geoserver/th/wms?", {
        layers: "th:province_4326",
        format: "image/png",
        transparent: true,
        CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
    });

    var baseMap = {
        "Mapbox": mapbox.addTo(map),
        "Google Hybrid": ghyb
    };

    var overlayMap = {
        "ขอบเขตจังหวัด": pro.addTo(map)
    };
    L.control.layers(baseMap, overlayMap).addTo(map);
}

function onLocationFound(e) {
    gps = L.marker(e.latlng)
}

function onLocationError(e) {
    console.log(e.message);
}

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

// lc.start();



// fetch('http://localhost:3100/ecc-api/get-aqi')
//   .then(response => response.json())
//   .then(data => {
//     showMap(data);
//     showChart(data);
//   });

let showMap = (d) => {
    let iconblue = L.icon({
        iconUrl: './marker/location-pin-blue.svg',
        iconSize: [32, 37],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let icongreen = L.icon({
        iconUrl: './marker/location-pin-green.svg',
        iconSize: [32, 37],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let iconyellow = L.icon({
        iconUrl: './marker/location-pin-yellow.svg',
        iconSize: [32, 37],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let iconorange = L.icon({
        iconUrl: './marker/location-pin-orange.svg',
        iconSize: [32, 37],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let iconred = L.icon({
        iconUrl: './marker/location-pin-red.svg',
        iconSize: [32, 37],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });


    let marker
    d.data.map(i => {
        // console.log(i);
        if (Number(i.aqi) <= 25) {
            marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconblue });
        } else if (Number(i.aqi) <= 50) {
            marker = L.marker([Number(i.lat), Number(i.lon)], { icon: icongreen });
        } else if (Number(i.aqi) <= 100) {
            marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconyellow });
        } else if (Number(i.aqi) <= 200) {
            marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconorange });
        } else {
            marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconred });
        }

        marker.addTo(map)
        marker.bindPopup(`สถานี : ${i.sta_th}  ${i.sta_id}<br> 
      ที่ตั้ง : ${i.area_th} <br> 
      ค่า AQI : ${Number(i.aqi).toFixed(1)}`
        )
    })
}

let showChart = (d) => {
    let arrPM25 = [];
    let arrPM10 = [];
    let arrO3 = [];
    let arrCO = [];
    let arrNO2 = [];
    let arrSO2 = [];
    d.data.map(i => {
        // console.log(i)
        arrPM25.push({
            "station": i.sta_id,
            "pm25": i.pm25,
            // "expenses": 37
        })

        arrPM10.push({
            "station": i.sta_id,
            "pm10": i.pm10,
            // "expenses": 80
        })

        arrO3.push({
            "station": i.sta_id,
            "o3": i.o3,
            // "expenses": 50
        })

        arrCO.push({
            "station": i.sta_id,
            "co": i.co,
            // "expenses": 6.4
        })

        arrNO2.push({
            "station": i.sta_id,
            "no2": i.no2,
            // "expenses": 106
        })
        arrSO2.push({
            "station": i.sta_id,
            "so2": i.so2,
            // "expenses": 200
        })
    })

    chart("chartpm25", "station", "PM2.5", "pm25", "มคก./ลบ.ม.", arrPM25)
    chart("chartpm10", "station", "PM10", "pm10", "มคก./ลบ.ม.", arrPM10)
    chart("charto3", "station", "O3", "o3", "ppb", arrO3)
    chart("chartco", "station", "CO", "co", "ppb", arrCO)
    chart("chartno2", "station", "NO2", "no2", "ppb", arrNO2)
    chart("chartso2", "station", "SO2", "so2", "ppb", arrSO2)

}

let chart = (chartdiv, category, name, valueY, unit, datArr) => {

    am4core.useTheme(am4themes_animated);
    var chart = am4core.create(chartdiv, am4charts.XYChart);
    chart.exporting.menu = new am4core.ExportMenu();

    /* Create axes */
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = category;
    categoryAxis.renderer.minGridDistance = 30;

    /* Create value axis */
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    /* Create series */
    var columnSeries = chart.series.push(new am4charts.ColumnSeries());
    columnSeries.name = name;
    columnSeries.dataFields.valueY = valueY;
    columnSeries.dataFields.categoryX = category;

    columnSeries.columns.template.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional} " + unit + "[/] "
    columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
    columnSeries.columns.template.propertyFields.stroke = "stroke";
    columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
    columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";
    columnSeries.tooltip.label.textAlign = "middle";

    var lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.name = "Expenses";
    lineSeries.dataFields.valueY = "expenses";
    lineSeries.dataFields.categoryX = category;

    lineSeries.stroke = am4core.color("#fdd400");
    lineSeries.strokeWidth = 3;
    lineSeries.propertyFields.strokeDasharray = "lineDash";
    lineSeries.tooltip.label.textAlign = "middle";

    var bullet = lineSeries.bullets.push(new am4charts.Bullet());
    bullet.fill = am4core.color("#fdd400"); // tooltips grab fill from parent by default
    bullet.tooltipText = "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]"
    var circle = bullet.createChild(am4core.Circle);
    circle.radius = 4;
    circle.fill = am4core.color("#fff");
    circle.strokeWidth = 3;

    chart.data = datArr;
}