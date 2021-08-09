let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');

// $("#usrname").text(urname);
// urid ? null : location.href = "./../../form_register/login/index.html";

let latlng = {
  lat: 13.305567,
  lng: 101.383101
};
let map = L.map("map", {
  center: latlng,
  zoom: 8
});

// const url = 'http://localhost:3700';
// const url = "http://rti2dss.com:3700";
const url = "https://eec-onep.online:3700";

let iconblue = L.icon({
  iconUrl: './marker/location-pin-blue.svg',
  iconSize: [40, 45],
  iconAnchor: [12, 37],
  popupAnchor: [5, -30]
});

let icongreen = L.icon({
  iconUrl: './marker/location-pin-green.svg',
  iconSize: [40, 45],
  iconAnchor: [12, 37],
  popupAnchor: [5, -30]
});

let iconyellow = L.icon({
  iconUrl: './marker/location-pin-yellow.svg',
  iconSize: [40, 45],
  iconAnchor: [12, 37],
  popupAnchor: [5, -30]
});

let iconorange = L.icon({
  iconUrl: './marker/location-pin-orange.svg',
  iconSize: [40, 45],
  iconAnchor: [12, 37],
  popupAnchor: [5, -30]
});

let iconred = L.icon({
  iconUrl: './marker/location-pin-red.svg',
  iconSize: [40, 45],
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
const tam = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
  layers: "eec:a__03_tambon_eec",
  format: "image/png",
  transparent: true,
  maxZoom: 18,
  minZoom: 14,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const amp = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
  layers: "eec:a__02_amphoe_eec",
  format: "image/png",
  transparent: true,
  maxZoom: 14,
  minZoom: 10,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const pro = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
  layers: "eec:a__01_prov_eec",
  format: "image/png",
  transparent: true,
  maxZoom: 10,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const baseMaps = {
  "Mapbox": mapbox.addTo(map),
  "Google Hybrid": ghyb
};

const overlayMaps = {
  "ขอบเขตจังหวัด": pro.addTo(map),
  "ขอบเขตอำเภอ": amp.addTo(map),
  "ขอบเขตตำบล": tam.addTo(map),
};

var legend = L.control({ position: "bottomright" });
legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>สัญลักษณ์</h4>";
  div.innerHTML += '<i style="background: #FFFFFF; border-style: solid; border-width: 3px;"></i><span>ขอบเขตจังหวัด</span><br>';
  div.innerHTML += '<i style="background: #FFFFFF; border-style: solid; border-width: 1.5px;"></i><span>ขอบเขตอำเภอ</span><br>';
  div.innerHTML += '<i style="background: #FFFFFF; border-style: dotted; border-width: 1.5px;"></i><span>ขอบเขตตำบล</span><br>';
  div.innerHTML += '<img src="./marker/location-pin-blue.svg"  height="30px"><span>สถานีตรวจวัดสภาพอากาศ</span><br>'
  return div;
};
legend.addTo(map);

const lyrControl = L.control.layers(baseMaps, overlayMaps, {
  collapsed: true
}).addTo(map);

let latLng;

function onLocationFound(e) {
  // latLng = e.latlng;
  nearData(e)
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

lc.start();

$("#pro").on("change", function () {
  getPro(this.value)
  zoomExtent("pro", this.value)
});
$("#amp").on("change", function () {
  getAmp(this.value)
  zoomExtent("amp", this.value)
});
$("#tam").on("change", function () {
  zoomExtent("tam", this.value)
});

let zoomExtent = (lyr, code) => {
  axios.get(url + `/eec-api/get-extent/${lyr}/${code}`).then(r => {
    let geom = JSON.parse(r.data.data[0].geom)
    // console.log(geom);
    map.fitBounds([
      geom.coordinates[0][0],
      geom.coordinates[0][2],
    ]);
  })
}

let getPro = (procode) => {
  axios.get(url + `/eec-api/get-amp/${procode}`).then(r => {
    // console.log(r.data.data);
    $("#amp").empty();
    $("#tam").empty();
    r.data.data.map(i => {
      $("#amp").append(`<option value="${i.amphoe_idn}">${i.amp_namt}</option>`)
    })
  })
}

let getAmp = (ampcode) => {
  axios.get(url + `/eec-api/get-tam/${ampcode}`).then(r => {
    $("#tam").empty();
    r.data.data.map(i => {
      $("#tam").append(`<option value="${i.tambon_idn}">${i.tam_namt}</option>`)
    })
  })
}

let response = axios.get(url + '/eec-api/get-weather-3hr');
let responseAll = axios.get(url + '/eec-api/get-weather-3hr-all');

let rmLyr = () => {
  map.eachLayer(lyr => {
    if (lyr.options.name == 'marker') {
      map.removeLayer(lyr)
    }
  })
}

let nearData = async (e) => {
  let res = await axios.post(url + '/eec-api/get-weather-near', { geom: e.latlng });
  // console.log(res.data);
  $("#d").text(res.data.data[0].date_);
  $("#t").text(res.data.data[0].time_);
  $("#sta_th").text(res.data.data[0].sta_th);
  $("#rainfall24").text(res.data.data[0].rain24hr);
  $("#rainfall").text(res.data.data[0].rainfall);
  $("#air_temp").text(res.data.data[0].air_temp);
  $("#rh").text(res.data.data[0].rh);
  $("#msl_pressure").text(res.data.data[0].msl_pressure);
  $("#windspeed").text(res.data.data[0].windspeed);

}

let showTable = async () => {
  $.extend(true, $.fn.dataTable.defaults, {
    "language": {
      "sProcessing": "กำลังดำเนินการ...",
      "sLengthMenu": "แสดง_MENU_ แถว",
      "sZeroRecords": "ไม่พบข้อมูล",
      "sInfo": "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
      "sInfoEmpty": "แสดง 0 ถึง 0 จาก 0 แถว",
      "sInfoFiltered": "(กรองข้อมูล _MAX_ ทุกแถว)",
      "sInfoPostFix": "",
      "sSearch": "ค้นหา:",
      "sUrl": "",
      "oPaginate": {
        "sFirst": "เริ่มต้น",
        "sPrevious": "ก่อนหน้า",
        "sNext": "ถัดไป",
        "sLast": "สุดท้าย"
      }
    }
  });
  // console.log("ok")
  let table = $('#tab').DataTable({
    ajax: {
      url: url + '/eec-api/get-weather-3hr',
      dataSrc: 'data'
    },
    columns: [
      // { data: 'sta_num' },
      { data: 'sta_th' }, {
        data: null,
        "render": function (data, type, row) { return Number(data.msl_pressure).toFixed(1) }
      }, {
        data: null,
        "render": function (data, type, row) { return Number(data.air_temp).toFixed(1) }
      }, {
        data: null,
        "render": function (data, type, row) { return Number(data.dew).toFixed(1) }
      }, {
        data: null,
        "render": function (data, type, row) { return Number(data.rh).toFixed(1) }
      }, {
        data: null,
        "render": function (data, type, row) { return Number(data.land_vis).toFixed(1) }
      }, {
        data: null,
        "render": function (data, type, row) { return Number(data.winddir).toFixed(1) }
      }, {
        data: null,
        "render": function (data, type, row) { return Number(data.windspeed).toFixed(1) }
      }, {
        data: null,
        "render": function (data, type, row) { return Number(data.rainfall).toFixed(1) }
      }, {
        data: null,
        "render": function (data, type, row) { return Number(data.rain24hr).toFixed(1) }
      }
    ],
    select: true,
    pageLength: 8,
    responsive: {
      details: false
    }
  });

  $('#tab tbody').on('click', 'tr', function () {
    let data = table.row(this).data();
    // console.log(data)
    showChart(data)
    // map.setView([Number(data.lon), Number(data.lat)], 10)
    // L.popup({ offset: [0, -27] })
    //   .setLatLng([Number(data.lat), Number(data.lon)])
    //   .setContent(`รหัส: ${data.sta_id} <br> ชื่อสถานี: ${data.sta_th}`)
    //   .openOn(map);
    // map.panTo([Number(data.lat), Number(data.lon)])
    // showChart(data)
  });
}

let showRain = async () => {
  $("#variable").text('Rainfall')
  rmLyr()
  let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${d.data.data[0].date_} เวลา ${d.data.data[0].time_} น.`)
  d.data.data.map(i => {
    datArr.push({
      "station": i.sta_th,
      "rainfall": i.rainfall,
      "rain24hr": i.rain24hr
    })
  })
  rainChart(datArr);
  $("#unit").html('Rainfall (mm)');

  let x = await responseAll;
  x.data.data.map(i => {
    let dat = {
      sta_th: i.sta_th,
      rain24hr: i.rain24hr,
      air_temp: i.air_temp,
      rh: i.rh,
      msl_pressure: i.msl_pressure,
      windspeed: i.windspeed
    }
    let marker
    if (Number(i.rainfall) <= 25) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconblue,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else if (Number(i.rainfall) <= 50) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: icongreen,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else if (Number(i.rainfall) <= 100) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconyellow,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else if (Number(i.rainfall) <= 200) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconorange,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconred,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    }
    marker.addTo(map)
    marker.bindPopup(`รหัส : ${i.sta_num}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      ปริมาณน้ำฝนปัจจุบัน : ${Number(i.rainfall).toFixed(1)} mm.<br> 
      ปริมาณน้ำฝน 24 ชม. : ${Number(i.rain24hr).toFixed(1)} mm.`
    )
    marker.on('click', (e) => {
      $("#sta_th").text(e.target.options.data.sta_th);
      $("#rainfall24").text(e.target.options.data.rain24hr);
      $("#rainfall").text(e.target.options.data.rainfall);
      $("#air_temp").text(e.target.options.data.air_temp);
      $("#rh").text(e.target.options.data.rh);
      $("#msl_pressure").text(e.target.options.data.msl_pressure);
      $("#windspeed").text(e.target.options.data.windspeed);
    })
  })
}

let showPressure = async () => {
  $("#variable").text('MeanSeaLevelPressure')
  rmLyr()
  let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${d.data.data[0].datetime} เวลา ${d.data.data[0].time_} น.`)
  d.data.data.map(i => {
    datArr.push({
      "station": i.sta_th,
      "sta_pressure": i.sta_pressure,
      "msl_pressure": i.msl_pressure
    })
  })
  // barChart(datArr);
  // console.log(datArr);
  pressureChart(datArr)
  $("#unit").html('MeanSeaLevelPressure (mb)');

  let x = await responseAll;
  x.data.data.map(i => {
    let dat = {
      sta_th: i.sta_th,
      rain24hr: i.rain24hr,
      air_temp: i.air_temp,
      rh: i.rh,
      msl_pressure: i.msl_pressure,
      windspeed: i.windspeed
    }
    let marker
    if (Number(i.msl_pressure) <= 25) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconblue,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else if (Number(i.msl_pressure) <= 50) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: icongreen,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else if (Number(i.msl_pressure) <= 100) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconyellow,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else if (Number(i.msl_pressure) <= 200) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconorange,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconred,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    }
    marker.addTo(map)
    marker.bindPopup(`รหัส : ${i.sta_num}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      ความกดอากาศที่ระดับน้ำทะเล : ${Number(i.msl_pressure).toFixed(1)} hPa<br> 
      ความกดอากาศที่สถานี : ${Number(i.sta_pressure).toFixed(1)} hPa
      `
    )
    marker.on('click', (e) => {
      $("#sta_th").text(e.target.options.data.sta_th);
      $("#rainfall24").text(e.target.options.data.rain24hr);
      $("#rainfall").text(e.target.options.data.rainfall);
      $("#air_temp").text(e.target.options.data.air_temp);
      $("#rh").text(e.target.options.data.rh);
      $("#msl_pressure").text(e.target.options.data.msl_pressure);
      $("#windspeed").text(e.target.options.data.windspeed);
    })
  })
}

let showTemp = async () => {
  $("#variable").text('Temperature')
  rmLyr()
  let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${d.data.data[0].date_} เวลา ${d.data.data[0].time_} น.`)
  d.data.data.map(i => {
    datArr.push({
      "category": i.sta_th,
      "value": Number(i.air_temp)
    })
  })

  barChart(datArr, ' ℃', "อุณหภูมิ");
  $("#unit").html('Temperature (celcius)');

  let x = await responseAll;
  x.data.data.map(i => {
    let dat = {
      sta_th: i.sta_th,
      rain24hr: i.rain24hr,
      air_temp: i.air_temp,
      rh: i.rh,
      msl_pressure: i.msl_pressure,
      windspeed: i.windspeed
    }
    let marker
    if (Number(i.air_temp) <= 25) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconblue,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else if (Number(i.air_temp) <= 50) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: icongreen,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else if (Number(i.air_temp) <= 100) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconyellow,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else if (Number(i.air_temp) <= 200) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconorange,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconred,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    }
    marker.addTo(map)
    marker.bindPopup(`รหัส : ${i.sta_num}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      อุณหภูมิ : ${Number(i.air_temp).toFixed(1)}`
    )
    marker.on('click', (e) => {
      $("#sta_th").text(e.target.options.data.sta_th);
      $("#rainfall24").text(e.target.options.data.rain24hr);
      $("#rainfall").text(e.target.options.data.rainfall);
      $("#air_temp").text(e.target.options.data.air_temp);
      $("#rh").text(e.target.options.data.rh);
      $("#msl_pressure").text(e.target.options.data.msl_pressure);
      $("#windspeed").text(e.target.options.data.windspeed);
    })
  })
}

let showRh = async () => {
  $("#variable").text('RelativeHumidity')
  rmLyr()
  let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${d.data.data[0].date_} เวลา ${d.data.data[0].time_} น.`)
  d.data.data.map(i => {
    datArr.push({
      "category": i.sta_th,
      "value": Number(i.rh)
    })
  })
  barChart(datArr, ' %', "ความชื้นสัมพัทธ์");
  $("#unit").html('RelativeHumidity (%)');

  let x = await responseAll;
  x.data.data.map(i => {
    let dat = {
      sta_th: i.sta_th,
      rain24hr: i.rain24hr,
      air_temp: i.air_temp,
      rh: i.rh,
      msl_pressure: i.msl_pressure,
      windspeed: i.windspeed
    }
    let marker
    if (Number(i.rh) <= 25) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconblue,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else if (Number(i.rh) <= 50) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: icongreen,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else if (Number(i.rh) <= 100) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconyellow,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else if (Number(i.rh) <= 200) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconorange,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconred,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    }
    marker.addTo(map)
    marker.bindPopup(`รหัส : ${i.sta_num}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      ความชื้นสัมพัทธ์ : ${Number(i.rh).toFixed(1)}`
    )
    marker.on('click', (e) => {
      $("#sta_th").text(e.target.options.data.sta_th);
      $("#rainfall24").text(e.target.options.data.rain24hr);
      $("#rainfall").text(e.target.options.data.rainfall);
      $("#air_temp").text(e.target.options.data.air_temp);
      $("#rh").text(e.target.options.data.rh);
      $("#msl_pressure").text(e.target.options.data.msl_pressure);
      $("#windspeed").text(e.target.options.data.windspeed);
    })
  })
}

let showWind = async () => {
  $("#variable").text('WindSpeed')
  rmLyr()
  let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${d.data.data[0].date_} เวลา ${d.data.data[0].time_} น.`)
  d.data.data.map(i => {
    // console.log(i);
    datArr.push({
      "category": i.sta_th,
      "value": Number(i.windspeed)
    })
  })

  barChart(datArr, ' km/h', "ความเร็วลม");
  $("#unit").html('WindSpeed (km/h)');

  let x = await responseAll;
  x.data.data.map(i => {
    let dat = {
      sta_th: i.sta_th,
      rain24hr: i.rain24hr,
      air_temp: i.air_temp,
      rh: i.rh,
      msl_pressure: i.msl_pressure,
      windspeed: i.windspeed
    }
    let marker
    if (Number(i.windspeed) <= 25) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconblue,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else if (Number(i.windspeed) <= 50) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: icongreen,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else if (Number(i.windspeed) <= 100) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconyellow,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else if (Number(i.windspeed) <= 200) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconorange,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconred,
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    }
    marker.addTo(map)
    marker.bindPopup(`รหัส : ${i.sta_num}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      ความเร็วลม : ${Number(i.windspeed).toFixed(1)}`
    )
    marker.on('click', (e) => {
      $("#sta_th").text(e.target.options.data.sta_th);
      $("#rainfall24").text(e.target.options.data.rain24hr);
      $("#rainfall").text(e.target.options.data.rainfall);
      $("#air_temp").text(e.target.options.data.air_temp);
      $("#rh").text(e.target.options.data.rh);
      $("#msl_pressure").text(e.target.options.data.msl_pressure);
      $("#windspeed").text(e.target.options.data.windspeed);
    })
  })
}

rainChart = async (data) => {
  am4core.useTheme(am4themes_animated);
  var chart = am4core.create("chart", am4charts.XYChart);
  chart.numberFormatter.numberFormat = "#.#' mm.'";
  chart.data = await data;

  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "station";
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 30;
  categoryAxis.renderer.labels.template.rotation = -90;
  categoryAxis.renderer.labels.template.horizontalCenter = "right";
  categoryAxis.renderer.labels.template.verticalCenter = "middle";

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.title.text = "ปริมาณน้ำฝน";
  valueAxis.title.fontWeight = 800;

  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueY = "rainfall";
  series.dataFields.categoryX = "station";
  series.clustered = false;
  series.tooltipText = "ปริมาณน้ำฝนใน 3 ชั่วโมง {categoryX} : [bold]{valueY}[/]";

  var series2 = chart.series.push(new am4charts.ColumnSeries());
  series2.dataFields.valueY = "rain24hr";
  series2.dataFields.categoryX = "station";
  series2.clustered = false;
  series2.columns.template.width = am4core.percent(50);
  series2.tooltipText = "ปริมาณน้ำฝน 24 ชั่วโมง {categoryX} : [bold]{valueY}[/]";

  chart.cursor = new am4charts.XYCursor();
  chart.cursor.lineX.disabled = true;
  chart.cursor.lineY.disabled = true;
}

barChart = async (data, unit, title) => {
  am4core.useTheme(am4themes_animated);
  var chart = am4core.create("chart", am4charts.XYChart);
  chart.numberFormatter.numberFormat = "#.#' " + unit + "'";
  chart.data = await data;

  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "category";
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 30;
  categoryAxis.renderer.labels.template.rotation = -90;
  categoryAxis.renderer.labels.template.horizontalCenter = "right";
  categoryAxis.renderer.labels.template.verticalCenter = "middle";

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.title.text = title;
  valueAxis.title.fontWeight = 800;

  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueY = "value";
  series.dataFields.categoryX = "category";
  series.clustered = false;
  series.tooltipText = title + "{categoryX} : [bold]{valueY}[/]";

  chart.cursor = new am4charts.XYCursor();
  chart.cursor.lineX.disabled = true;
  chart.cursor.lineY.disabled = true;
}

lollipopChart = async (data, unit) => {
  // Themes begin
  am4core.useTheme(am4themes_animated);
  var chart = am4core.create("chart", am4charts.XYChart);
  chart.numberFormatter.numberFormat = `#.#'${unit}'`;

  chart.data = data;
  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.dataFields.category = "category";
  categoryAxis.renderer.minGridDistance = 15;
  categoryAxis.renderer.grid.template.location = 0.5;
  categoryAxis.renderer.grid.template.strokeDasharray = "1,3";
  categoryAxis.renderer.labels.template.rotation = -90;
  categoryAxis.renderer.labels.template.horizontalCenter = "left";
  categoryAxis.renderer.labels.template.location = 0.5;

  categoryAxis.renderer.labels.template.adapter.add("dx", function (dx, target) {
    return -target.maxRight / 2;
  })

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.tooltip.disabled = true;
  valueAxis.renderer.ticks.template.disabled = true;
  valueAxis.renderer.axisFills.template.disabled = true;

  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.categoryX = "category";
  series.dataFields.valueY = "value";
  series.tooltipText = "{valueY.value}";
  series.sequencedInterpolation = true;
  series.fillOpacity = 0;
  series.strokeOpacity = 1;
  series.strokeDashArray = "1,3";
  series.columns.template.width = 0.01;
  series.tooltip.pointerOrientation = "horizontal";

  var bullet = series.bullets.create(am4charts.CircleBullet);

  chart.cursor = new am4charts.XYCursor();
}

pressureChart = async (data) => {
  am4core.useTheme(am4themes_animated);
  var chart = am4core.create("chart", am4charts.XYChart);
  chart.numberFormatter.numberFormat = "#.#' hPa'";
  chart.data = await data;

  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "station";
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 30;
  categoryAxis.renderer.labels.template.rotation = -90;
  categoryAxis.renderer.labels.template.horizontalCenter = "right";
  categoryAxis.renderer.labels.template.verticalCenter = "middle";

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.title.text = "ความกดอากาศ";
  valueAxis.title.fontWeight = 800;

  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueY = "sta_pressure";
  series.dataFields.categoryX = "station";
  series.clustered = false;
  series.tooltipText = "ความกดอากาศที่สถานี {categoryX} : [bold]{valueY}[/]";

  var series2 = chart.series.push(new am4charts.ColumnSeries());
  series2.dataFields.valueY = "msl_pressure";
  series2.dataFields.categoryX = "station";
  series2.clustered = false;
  series2.columns.template.width = am4core.percent(50);
  series2.tooltipText = "ความกดอากาศที่ระดับน้ำทะเล {categoryX} : [bold]{valueY}[/]";

  chart.cursor = new am4charts.XYCursor();
  chart.cursor.lineX.disabled = true;
  chart.cursor.lineY.disabled = true;
}

let showChart = async (e) => {
  let res = await axios.post(url + '/eec-api/get-weather-hist', { sta_num: e.sta_num });

  let rainfall = [];
  let temperature = [];
  let windspeed = [];
  let rh = [];
  let msl_pressure = [];

  res.data.data.map(i => {
    // console.log(i);
    $("#sta_name").text(i.sta_th)

    rainfall.push({
      "date": i.date_,
      "value": Number(i.rainfall).toFixed(2)
    });

    temperature.push({
      "date": i.date_,
      "value": Number(i.temperature).toFixed(2)
    });

    windspeed.push({
      "date": i.date_,
      "value": Number(i.windspeed).toFixed(2)
    });

    rh.push({
      "date": i.date_,
      "value": Number(i.rh).toFixed(2)
    });

    msl_pressure.push({
      "date": i.date_,
      "value": Number(i.msl_pressure).toFixed(2)
    });
  })

  chartTemplate(rainfall, "chart-rainfall");
  chartTemplate(temperature, "chart-temperature");
  chartTemplate(windspeed, "chart-windspeed");
  chartTemplate(rh, "chart-rh");
  chartTemplate(msl_pressure, "chart-pressure");
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
showTemp();
showTable();
showChart({ sta_num: "48478" })
// getWeatherHist();


