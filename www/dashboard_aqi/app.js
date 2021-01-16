let userid;
$(document).ready(async () => {
  // await liff.init({ liffId: "1653987548-eakD174y" });
});

let latlng = {
  lat: 13.305567,
  lng: 101.383101
};
let map = L.map("map", {
  center: latlng,
  zoom: 8
});

// const url = 'http://localhost:3700';
const url = "https://rti2dss.com:3700";

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


const mapbox = L.tileLayer(
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

const pro = L.tileLayer.wms("https://rti2dss.com:8443/geoserver/th/wms?", {
  layers: "th:province_4326",
  format: "image/png",
  transparent: true,
  CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const baseMap = {
  "Mapbox": mapbox.addTo(map),
  "google Hybrid": ghyb
};

const overlayMap = {
  "ขอบจังหวัด": pro.addTo(map)
};
L.control.layers(baseMap, overlayMap).addTo(map);


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

let rmLyr = () => {
  map.eachLayer(lyr => {
    if (lyr.options.name == 'marker') {
      map.removeLayer(lyr)
    }
  })
}

let response = axios.get(url + '/ecc-api/get-aqi');

let mapAQI = async () => {
  $("#variable").text('ดัชนีคุณภาพอากาศ (Air Quality Index : AQI)')
  rmLyr()
  let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${d.data.data[0].date_} เวลา ${d.data.data[0].time_} น.`)
  d.data.data.map(i => {
    let marker
    if (Number(i.aqi) <= 25) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconblue, name: 'marker' });
    } else if (Number(i.aqi) <= 50) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: icongreen, name: 'marker' });
    } else if (Number(i.aqi) <= 100) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconyellow, name: 'marker' });
    } else if (Number(i.aqi) <= 200) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconorange, name: 'marker' });
    } else {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconred, name: 'marker' });
    }
    marker.addTo(map)
    marker.bindPopup(`สถานี : ${i.sta_th}  ${i.sta_id}<br> 
      ที่ตั้ง : ${i.area_th} <br> 
      ค่า AQI : ${Number(i.aqi).toFixed(1)}`
    )
    datArr.push({
      "station": i.sta_id,
      "data": Number(i.aqi)
    })
  })
  barChart(datArr)
}

let mapPM25 = async () => {
  $("#variable").text('ฝุ่นละอองขนาดไม่เกิน 2.5 ไมครอน (PM2.5)')

  rmLyr()
  let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${d.data.data[0].date_} เวลา ${d.data.data[0].time_} น.`)
  d.data.data.map(i => {
    let marker
    if (Number(i.pm25) <= 25) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconblue, name: 'marker' });
    } else if (Number(i.pm25) <= 37) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: icongreen, name: 'marker' });
    } else if (Number(i.pm25) <= 50) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconyellow, name: 'marker' });
    } else if (Number(i.pm25) <= 90) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconorange, name: 'marker' });
    } else {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconred, name: 'marker' });
    }

    marker.addTo(map)
    marker.bindPopup(`สถานี : ${i.sta_th}  ${i.sta_id}<br> 
      ที่ตั้ง : ${i.area_th} <br> 
      ค่า PM2.5 : ${Number(i.pm25).toFixed(1)}`
    )
    datArr.push({
      "station": i.sta_id,
      "data": Number(i.pm25)
    })
  })
  barChart(datArr)
}

let mapPM10 = async () => {
  $("#variable").text('ฝุ่นละอองขนาดไม่เกิน 10 ไมครอน (PM10)')
  rmLyr()
  let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${d.data.data[0].date_} เวลา ${d.data.data[0].time_} น.`)
  d.data.data.map(i => {
    let marker;
    if (Number(i.pm10) <= 50) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconblue, name: 'marker' });
    } else if (Number(i.pm10) <= 80) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: icongreen, name: 'marker' });
    } else if (Number(i.pm10) <= 120) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconyellow, name: 'marker' });
    } else if (Number(i.pm10) <= 150) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconorange, name: 'marker' });
    } else {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconred, name: 'marker' });
    }
    marker.addTo(map)
    marker.bindPopup(`สถานี : ${i.sta_th}  ${i.sta_id}<br> 
      ที่ตั้ง : ${i.area_th} <br> 
      ค่า PM10 : ${Number(i.pm10).toFixed(1)}`
    )
    datArr.push({
      "station": i.sta_id,
      "data": Number(i.pm10)
    })
  })
  barChart(datArr)
}

let mapCO = async () => {
  $("#variable").text('คาร์บอนมอนอกไซด์ (CO)')
  rmLyr()
  let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${d.data.data[0].date_} เวลา ${d.data.data[0].time_} น.`)
  d.data.data.map(i => {
    let marker;
    if (Number(i.co) <= 4.4) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconblue, name: 'marker' });
    } else if (Number(i.co) <= 6.4) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: icongreen, name: 'marker' });
    } else if (Number(i.co) <= 9.0) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconyellow, name: 'marker' });
    } else if (Number(i.co) <= 30) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconorange, name: 'marker' });
    } else {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconred, name: 'marker' });
    }
    marker.addTo(map)
    marker.bindPopup(`สถานี : ${i.sta_th}  ${i.sta_id}<br> 
      ที่ตั้ง : ${i.area_th} <br> 
      ค่า CO : ${Number(i.co).toFixed(1)}`
    )
    datArr.push({
      "station": i.sta_id,
      "data": Number(i.co)
    })
  })
  barChart(datArr)
}

let mapNO2 = async () => {
  $("#variable").text('ก๊าซไนโตรเจนไดออกไซด์ (NO2)')
  rmLyr()
  let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${d.data.data[0].date_} เวลา ${d.data.data[0].time_} น.`)
  d.data.data.map(i => {
    let marker;
    if (Number(i.no2) <= 60) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconblue, name: 'marker' });
    } else if (Number(i.no2) <= 106) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: icongreen, name: 'marker' });
    } else if (Number(i.no2) <= 170) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconyellow, name: 'marker' });
    } else if (Number(i.no2) <= 340) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconorange, name: 'marker' });
    } else {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconred, name: 'marker' });
    }
    marker.addTo(map)
    marker.bindPopup(`สถานี : ${i.sta_th}  ${i.sta_id}<br> 
      ที่ตั้ง : ${i.area_th} <br> 
      ค่า NO2 : ${Number(i.no2).toFixed(1)}`
    )
    datArr.push({
      "station": i.sta_id,
      "data": Number(i.no2)
    })
  })
  barChart(datArr)
}

let mapSO2 = async () => {
  $("#variable").text('ก๊าซซัลเฟอร์ไดออกไซด์ (SO2)')
  rmLyr()
  let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${d.data.data[0].date_} เวลา ${d.data.data[0].time_} น.`)
  d.data.data.map(i => {
    let marker
    if (Number(i.so2) <= 100) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconblue, name: 'marker' });
    } else if (Number(i.so2) <= 200) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: icongreen, name: 'marker' });
    } else if (Number(i.so2) <= 300) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconyellow, name: 'marker' });
    } else if (Number(i.so2) <= 400) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconorange, name: 'marker' });
    } else {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconred, name: 'marker' });
    }
    marker.addTo(map)
    marker.bindPopup(`สถานี : ${i.sta_th}  ${i.sta_id}<br> 
      ที่ตั้ง : ${i.area_th} <br> 
      ค่า SO2 : ${Number(i.so2).toFixed(1)}`
    )
    datArr.push({
      "station": i.sta_id,
      "data": Number(i.so2)
    })
  })
  barChart(datArr)
}

let barChart = (datArr) => {
  // Themes begin
  am4core.useTheme(am4themes_kelly);
  am4core.useTheme(am4themes_animated);
  // Themes end

  var chart = am4core.create("chart", am4charts.XYChart);
  chart.padding(40, 40, 40, 40);

  var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.dataFields.category = "station";
  categoryAxis.renderer.minGridDistance = 1;
  categoryAxis.renderer.inversed = true;
  categoryAxis.renderer.grid.template.disabled = true;

  var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
  valueAxis.min = 0;

  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.categoryY = "station";
  series.dataFields.valueX = "data";
  series.tooltipText = "{valueX.value}"
  series.columns.template.strokeOpacity = 0;
  series.columns.template.column.cornerRadiusBottomRight = 5;
  series.columns.template.column.cornerRadiusTopRight = 5;

  var labelBullet = series.bullets.push(new am4charts.LabelBullet())
  labelBullet.label.horizontalCenter = "left";
  labelBullet.label.dx = 10;
  labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
  labelBullet.locationX = 1;

  // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
  series.columns.template.adapter.add("fill", function (fill, target) {
    return chart.colors.getIndex(target.dataItem.index);
  });

  categoryAxis.sortBySeries = series;
  chart.data = datArr
}

// init aqi
mapAQI()

