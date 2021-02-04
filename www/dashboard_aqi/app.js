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
const url = "http://rti2dss.com:3700";

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

let response = axios.get(url + '/eec-api/get-aqi');

let getAvAQI = async () => {
  let av = await axios.get(url + '/eec-api/get-av-aqi');
  av = av.data.data[0];
  $("#av-aqi").text(Number(av.aqi).toFixed(2));
  $("#av-pm10").text(Number(av.pm10).toFixed(2));
  $("#av-pm25").text(Number(av.pm25).toFixed(2));
  $("#av-o3").text(Number(av.o3).toFixed(2));
  $("#av-co").text(Number(av.co).toFixed(2));
  $("#av-no2").text(Number(av.no2).toFixed(2));
  $("#av-so2").text(Number(av.so2).toFixed(2));
  console.log(av)
}

let mapAQI = async () => {
  $("#variable").text('ดัชนีคุณภาพอากาศ (Air Quality Index : AQI)')
  rmLyr()
  let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${d.data.data[0].date_} เวลา ${d.data.data[0].time_} น.`)
  d.data.data.map(i => {
    // console.log(i);
    let marker
    if (Number(i.aqi) <= 25) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconblue, name: 'marker', id: i.sta_id });
    } else if (Number(i.aqi) <= 50) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: icongreen, name: 'marker', id: i.sta_id });
    } else if (Number(i.aqi) <= 100) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconyellow, name: 'marker', id: i.sta_id });
    } else if (Number(i.aqi) <= 200) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconorange, name: 'marker', id: i.sta_id });
    } else {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconred, name: 'marker', id: i.sta_id });
    }
    marker.addTo(map)
    marker.bindPopup(`รหัส : ${i.sta_id}<br> 
    ชื่อสถานี : ${i.sta_th} <br> 
      ค่า AQI : ${Number(i.aqi).toFixed(1)}`
    )
    datArr.push({
      "station": i.sta_th,
      "data": Number(i.aqi)
    })
    marker.on('click', (e) => {
      showHistoryChart(e)
    })
  })
  barChart(datArr);
  $("#unit").html('AQI');
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
    marker.bindPopup(`รหัส : ${i.sta_id}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      ค่า PM2.5 : ${Number(i.pm25).toFixed(1)}`
    )
    datArr.push({
      "station": i.sta_th,
      "data": Number(i.pm25)
    })
  })
  barChart(datArr);
  $("#unit").html('pm25 (µg./m<sup>3</sup>)');
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
    marker.bindPopup(`รหัส : ${i.sta_id}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      ค่า PM10 : ${Number(i.pm10).toFixed(1)}`
    )
    datArr.push({
      "station": i.sta_th,
      "data": Number(i.pm10)
    })
  })
  barChart(datArr);
  $("#unit").html('pm25 (µg./m<sup>3</sup>)');
}

let mapO3 = async () => {
  $("#variable").text('ก๊าซโอโซน (O3)')
  rmLyr()
  let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${d.data.data[0].date_} เวลา ${d.data.data[0].time_} น.`)
  d.data.data.map(i => {
    let marker;
    if (Number(i.o3) <= 4.4) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconblue, name: 'marker' });
    } else if (Number(i.o3) <= 6.4) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: icongreen, name: 'marker' });
    } else if (Number(i.o3) <= 9.0) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconyellow, name: 'marker' });
    } else if (Number(i.o3) <= 30) {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconorange, name: 'marker' });
    } else {
      marker = L.marker([Number(i.lat), Number(i.lon)], { icon: iconred, name: 'marker' });
    }
    marker.addTo(map)
    marker.bindPopup(`รหัส : ${i.sta_id}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      ค่า O3 : ${Number(i.o3).toFixed(1)}`
    )
    datArr.push({
      "station": i.sta_th,
      "data": Number(i.o3)
    })
  })
  barChart(datArr);
  $("#unit").html('o<sub>3</sub> (ppb)');
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
    marker.bindPopup(`รหัส : ${i.sta_id}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      ค่า CO : ${Number(i.co).toFixed(1)}`
    )
    datArr.push({
      "station": i.sta_th,
      "data": Number(i.co)
    })
  })
  barChart(datArr);
  $("#unit").html('co (ppm)');
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
    marker.bindPopup(`รหัส : ${i.sta_id}<br> 
      ชื่อสถานี : ${i.sta_th} <br>  
      ค่า NO2 : ${Number(i.no2).toFixed(1)}`
    )
    datArr.push({
      "station": i.sta_th,
      "data": Number(i.no2)
    })
  })
  barChart(datArr)
  $("#unit").html('co (ppm)');
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
    marker.bindPopup(`รหัส : ${i.sta_id}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      ค่า SO2 : ${Number(i.so2).toFixed(1)}`
    )
    datArr.push({
      "station": i.sta_th,
      "data": Number(i.so2)
    })
  })
  barChart(datArr);
  $("#unit").html('so<sub>2</sub> (ppb)');
}

let barChart = (datArr) => {
  am4core.useTheme(am4themes_kelly);
  am4core.useTheme(am4themes_animated);

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


let showHistoryChart = (id) => {
  let sta_id = id.target.options.id
  // console.log(sta_id.target.options.id)
  axios.post(url + '/eec-api/get-hist', { sta_id: sta_id }).then((r) => {

    console.log(r.data.data);
  }).catch((err) => {
    console.log(err);
  });

}

let showDataTable = async () => {
  let table = $('#tab').DataTable({
    ajax: {
      url: url + '/eec-api/get-aqi',
      dataSrc: 'data'
    },
    columns: [
      { data: 'sta_id' },
      { data: 'sta_th' },
      // { data: 'area_th' },
      {
        data: null,
        "render": function (data, type, row) { return Number(data.pm25).toFixed(1) }
      },
      {
        data: null,
        "render": function (data, type, row) { return Number(data.pm10).toFixed(1) }
      },
      {
        data: null,
        "render": function (data, type, row) { return Number(data.o3).toFixed(1) }
      },
      {
        data: null,
        "render": function (data, type, row) { return Number(data.co).toFixed(1) }
      },
      {
        data: null,
        "render": function (data, type, row) { return Number(data.no2).toFixed(1) }
      },
      {
        data: null,
        "render": function (data, type, row) { return Number(data.so2).toFixed(1) }
      },
      {
        data: null,
        "render": function (data, type, row) { return Number(data.aqi).toFixed(1) }
      }
    ],
    select: true,
    pageLength: 5,
  });
  $('#tab tbody').on('click', 'tr', function () {
    let data = table.row(this).data();
    // console.log(data)
    // map.setView([Number(data.lon), Number(data.lat)], 10)
    L.popup({ offset: [0, -27] })
      .setLatLng([Number(data.lat), Number(data.lon)])
      .setContent(`รหัส: ${data.sta_id} <br> ชื่อสถานี: ${data.sta_th}`)
      .openOn(map);
    map.panTo([Number(data.lat), Number(data.lon)])
    showChart(data)
  });
}

let showChart = async (e) => {
  let d = await axios.post(url + '/eec-api/get-hist', { sta_id: e.sta_id });

  let arrPM25 = [];
  let arrPM10 = [];
  let arrO3 = [];
  let arrCO = [];
  let arrNO2 = [];
  let arrSO2 = [];
  let arrAQI = [];

  d.data.data.map(i => {
    // console.log(i);
    arrPM25.push({
      "date": i.date_,
      "value": Number(i.pm25).toFixed(2)
    });
    arrPM10.push({
      "date": i.date_,
      "value": Number(i.pm10).toFixed(2)
    });
    arrO3.push({
      "date": i.date_,
      "value": Number(i.o3).toFixed(2)
    });
    arrCO.push({
      "date": i.date_,
      "value": Number(i.co).toFixed(2)
    });
    arrNO2.push({
      "date": i.date_,
      "value": Number(i.no2).toFixed(2)
    });
    arrSO2.push({
      "date": i.date_,
      "value": Number(i.so2).toFixed(2)
    });
    arrAQI.push({
      "date": i.date_,
      "value": Number(i.aqi).toFixed(2)
    });
  })

  chartTemplate(arrPM25, "chart-pm25");
  chartTemplate(arrPM10, "chart-pm10");
  chartTemplate(arrO3, "chart-o3");
  chartTemplate(arrCO, "chart-co");
  chartTemplate(arrNO2, "chart-no2");
  chartTemplate(arrSO2, "chart-so2");
  chartTemplate(arrAQI, "chart-aqi");
}

let chartTemplate = (arrData, div) => {
  am4core.useTheme(am4themes_animated);

  // Create chart instance
  var chart = am4core.create(div, am4charts.XYChart);

  // Add data
  chart.data = arrData;

  // Set input format for the dates
  chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

  // Create axes
  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

  // Create series
  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = "value";
  series.dataFields.dateX = "date";
  series.tooltipText = "{value}";
  series.tensionX = 0.8;
  series.strokeWidth = 2;
  series.minBulletDistance = 15;
  series.stroke = am4core.color("#ff0000");

  // Drop-shaped tooltips
  series.tooltip.background.cornerRadius = 20;
  series.tooltip.background.strokeOpacity = 0;
  series.tooltip.pointerOrientation = "vertical";
  series.tooltip.label.minWidth = 40;
  series.tooltip.label.minHeight = 40;
  series.tooltip.label.textAlign = "middle";
  series.tooltip.label.textValign = "middle";

  // Make bullets grow on hover
  var bullet = series.bullets.push(new am4charts.CircleBullet());
  bullet.circle.strokeWidth = 2;
  bullet.circle.radius = 4;
  bullet.circle.fill = am4core.color("#fff");

  var bullethover = bullet.states.create("hover");
  bullethover.properties.scale = 1.3;

  // Make a panning cursor
  chart.cursor = new am4charts.XYCursor();
  chart.cursor.behavior = "panXY";
  chart.cursor.xAxis = dateAxis;
  chart.cursor.snapToSeries = series;

  // Create a horizontal scrollbar with previe and place it underneath the date axis
  chart.scrollbarX = new am4charts.XYChartScrollbar();
  chart.scrollbarX.series.push(series);
  chart.scrollbarX.parent = chart.bottomAxesContainer;

  dateAxis.start = 0.59;
  dateAxis.keepSelection = true;
}


// init aqi
mapAQI()
getAvAQI()
showDataTable()
showChart({ sta_id: '74t' })


