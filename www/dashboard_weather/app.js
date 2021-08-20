let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');

if (urname) {
  $("#nav").append(`<li><a href="./../../form_register/profile/index.html"><i
      class="bi bi-person-square"></i>&nbsp;<span >${urname}</span>
    </a></li>
    <li><a href="./../../form_register/login/index.html"><i class="bi bi-box-arrow-right"></i>
    ออกจากระบบ</a></li>`);
}

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
var L53 = 'https://eec-onep.online:8443/geoserver/eec/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=eec%3Aa__53_9w_reser63_3p&maxFeatures=50&outputFormat=application%2Fjson'
$(document).ready(() => {
  layermark(L53, 53)
})
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
  layers: "eec:__03_tambon_eec",
  format: "image/png",
  transparent: true,
  // maxZoom: 18,
  // minZoom: 14,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const amp = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
  layers: "eec:a__02_amphoe_eec",
  format: "image/png",
  transparent: true,
  // maxZoom: 14,
  // minZoom: 10,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const pro = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
  layers: "eec:a__01_prov_eec",
  format: "image/png",
  transparent: true,
  // maxZoom: 10,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});
const w2 = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
  layers: "eec:a__14_w2_eec",
  format: "image/png",
  transparent: true,
  // maxZoom: 10,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const baseMaps = {
  "Mapbox": mapbox.addTo(map),
  "Google Hybrid": ghyb
};

const overlayMaps = {
  "ขอบเขตจังหวัด": pro.addTo(map),
  "ขอบเขตอำเภอ": amp,
  "ขอบเขตตำบล": tam,
  "แหล่งน้ำ": w2,
};

var legend = L.control({ position: "bottomleft" });
function showLegend() {
  legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += `<button class="btn btn-sm" onClick="hideLegend()">
    <span class="kanit">ซ่อนสัญลักษณ์</span><i class="fa fa-angle-double-down" aria-hidden="true"></i>
  </button><br>`;
    div.innerHTML += '<i style="background: #FFFFFF; border-style: solid; border-width: 3px;"></i><span>ขอบเขตจังหวัด</span><br>';
    div.innerHTML += '<i style="background: #FFFFFF; border-style: solid; border-width: 1.5px;"></i><span>ขอบเขตอำเภอ</span><br>';
    div.innerHTML += '<i style="background: #FFFFFF; border-style: dotted; border-width: 1.5px;"></i><span>ขอบเขตตำบล</span><br>';
    div.innerHTML += '<img src="./marker/location-pin-blue.svg"  height="30px"><span>สถานีตรวจวัดสภาพอากาศ</span><br>'
    div.innerHTML += '<i style="background: #65d4fb; border-radius: 1%;"></i><span>แหล่งน้ำ</span><br>'
    div.innerHTML += '<img src="./marker/radar.png"  height="30px"></i><span>เรดาห์น้ำฝน</span><br>'
    div.innerHTML += '<i style="background: #7acdf3; border-radius: 1%;"></i><span>อ่างเก็บน้ำ</span><br>'
    return div;
  };
  legend.addTo(map);
}
function hideLegend() {
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend')
    div.innerHTML += `<button class="btn btn-sm" onClick="showLegend()">
      <small class="prompt"><span class="kanit">แสดงสัญลักษณ์</span></small> 
      <i class="fa fa-angle-double-up" aria-hidden="true"></i>
  </button>`;
    return div;
  };
  legend.addTo(map);
}

hideLegend()

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
let wtrlUrl = axios.get(url + '/eec-api/get-wtrl')

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
  $("#rainfall24").text(Number(res.data.data[0].rain24hr).toFixed(2));
  $("#rainfall").text(Number(res.data.data[0].rainfall).toFixed(2));
  $("#air_temp").text(Number(res.data.data[0].air_temp).toFixed(2));
  $("#rh").text(Number(res.data.data[0].rh).toFixed(2));
  $("#msl_pressure").text(Number(res.data.data[0].msl_pressure).toFixed(2));
  $("#windspeed").text(Number(res.data.data[0].windspeed).toFixed(2));

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
    columnDefs: [
      { className: 'text-center', targets: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
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

let showWtrl = async () => {
  rmLyr()
  let x = await wtrlUrl;
  $('#legend').empty()
  $('#legend').append(`<img src="./mk_legend/เกณฑ์น้ำท่า.png" width="100%">`)

  x.data.data.map(i => {
    console.log(i);
    let icon = {
      // iconUrl: './marker/location-pin-blue.svg',
      iconSize: [40, 42],
      iconAnchor: [12, 37],
      popupAnchor: [5, -30]
    };
    let marker
    if (i.tele_station_lat > 0 && i.tele_station_long > 0) {
      if (Number(i.waterlevel_msl) <= 10) {
        icon.iconUrl = "./mk_runoff/1.png"
        marker = L.marker([Number(i.tele_station_lat), Number(i.tele_station_long)], {
          icon: L.icon(icon),
          name: 'marker',
          id: i.sta_id
        });
      } else if (Number(i.waterlevel_msl) <= 30) {
        icon.iconUrl = "./mk_runoff/2.png"
        marker = L.marker([Number(i.tele_station_lat), Number(i.tele_station_long)], {
          icon: L.icon(icon),
          name: 'marker',
          id: i.sta_id
        });
      } else if (Number(i.waterlevel_msl) <= 70) {
        icon.iconUrl = "./mk_runoff/3.png"
        marker = L.marker([Number(i.tele_station_lat), Number(i.tele_station_long)], {
          icon: L.icon(icon),
          name: 'marker',
          id: i.sta_id
        });
      } else if (Number(i.waterlevel_msl) <= 100) {
        icon.iconUrl = "./mk_runoff/4.png"
        marker = L.marker([Number(i.tele_station_lat), Number(i.tele_station_long)], {
          icon: L.icon(icon),
          name: 'marker',
          id: i.sta_id
        });
      } else {
        icon.iconUrl = "./mk_runoff/5.png"
        marker = L.marker([Number(i.tele_station_lat), Number(i.tele_station_long)], {
          icon: L.icon(icon),
          name: 'marker',
          id: i.sta_id
        });
      }
      let dt = new Date(i.waterlevel_datetime);
      let day = dt.getDate();
      let mm = dt.getMonth();
      let year = dt.getFullYear();
      marker.addTo(map)
      marker.bindPopup(`<span style="font-family: 'Kanit'; font-size:14px">ชื่อสถานี : ${i.tele_station_name} <br> 
        ระดับน้ำผิวดิน : ${Number(i.waterlevel_msl).toFixed(1)} m. <br> วันที่ : ${day}/${mm}/${year} </span>`
      )
    }
  })
}

let showRain = async () => {
  $('#legend').empty()
  $('#legend').append(`<img src="./mk_legend/เกณฑ์น้ำฝน.png" width="100%">`)
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

    let icon = {
      // iconUrl: './marker/location-pin-blue.svg',
      iconSize: [40, 42],
      iconAnchor: [12, 37],
      popupAnchor: [5, -30]
    };

    let marker
    if (Number(i.rain24hr) <= 10) {
      icon.iconUrl = "./mk_rain/8.png"
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: L.icon(icon),
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else if (Number(i.rain24hr) <= 20) {
      icon.iconUrl = "./mk_rain/9.png"
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: L.icon(icon),
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else if (Number(i.rain24hr) <= 35) {
      icon.iconUrl = "./mk_rain/10.png"
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: L.icon(icon),
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else if (Number(i.rain24hr) <= 50) {
      icon.iconUrl = "./mk_rain/11.png"
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: L.icon(icon),
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else if (Number(i.rain24hr) <= 70) {
      icon.iconUrl = "./mk_rain/12.png"
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: L.icon(icon),
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else if (Number(i.rain24hr) <= 90) {
      icon.iconUrl = "./mk_rain/13.png"
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: L.icon(icon),
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else {
      icon.iconUrl = "./mk_rain/14.png"
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: L.icon(icon),
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    }
    marker.addTo(map)
    marker.bindPopup(`<span style="font-family: 'Kanit'; font-size:14px">รหัส : ${i.sta_num}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      ปริมาณน้ำฝนปัจจุบัน : ${Number(i.rainfall).toFixed(1)} mm.<br> 
      ปริมาณน้ำฝน 24 ชม. : ${Number(i.rain24hr).toFixed(1)} mm.</span>`
    )
    // marker.on('click', (e) => {
    //   console.log(e.target.options.data);
    //   $("#sta_th").text(e.target.options.data.sta_th);
    //   $("#rainfall24").text(e.target.options.data.rain24hr);
    //   $("#rainfall").text(e.target.options.data.rainfall);
    //   $("#air_temp").text(e.target.options.data.air_temp);
    //   $("#rh").text(e.target.options.data.rh);
    //   $("#msl_pressure").text(e.target.options.data.msl_pressure);
    //   $("#windspeed").text(e.target.options.data.windspeed);
    // })
  })
}

let showPressure = async () => {
  $('#legend').empty()
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
    marker.bindPopup(`<span style="font-family: 'Kanit'; font-size:14px">รหัส : ${i.sta_num}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      ความกดอากาศที่ระดับน้ำทะเล : ${Number(i.msl_pressure).toFixed(1)} hPa<br> 
      ความกดอากาศที่สถานี : ${Number(i.sta_pressure).toFixed(1)} hPa
      </span>`
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
  $('#legend').empty()
  $('#legend').append(`<img src="./mk_legend/เกณฑ์อุณหภูมิ.png" width="100%">`)
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

    let icon = {
      // iconUrl: './marker/location-pin-blue.svg',
      iconSize: [40, 42],
      iconAnchor: [12, 37],
      popupAnchor: [5, -30]
    };

    let marker
    if (Number(i.air_temp) <= 15.9) {
      icon.iconUrl = "./mk_temp/1.png"
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: L.icon(icon),
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else if (Number(i.air_temp) <= 17.9) {
      icon.iconUrl = "./mk_temp/2.png"
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: L.icon(icon),
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else if (Number(i.air_temp) <= 23) {
      icon.iconUrl = "./mk_temp/3.png"
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: L.icon(icon),
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else if (Number(i.air_temp) <= 34.9) {
      icon.iconUrl = "./mk_temp/4.png"
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: L.icon(icon),
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else if (Number(i.air_temp) <= 39.9) {
      icon.iconUrl = "./mk_temp/5.png"
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: L.icon(icon),
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    } else {
      icon.iconUrl = "./mk_temp/6.png"
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: L.icon(icon),
        name: 'marker',
        id: i.sta_id,
        data: dat
      });
    }
    marker.addTo(map)
    marker.bindPopup(`<span style="font-family: 'Kanit'; font-size:14px">รหัส : ${i.sta_num}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      อุณหภูมิ : ${Number(i.air_temp).toFixed(1)}</span>`
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
  $('#legend').empty()
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
    marker.bindPopup(`<span style="font-family: 'Kanit'; font-size:14px">รหัส : ${i.sta_num}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      ความชื้นสัมพัทธ์ : ${Number(i.rh).toFixed(1)}</span>`
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
  $('#legend').empty()
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
    marker.bindPopup(`<span style="font-family: 'Kanit'; font-size:14px">รหัส : ${i.sta_num}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      ความเร็วลม : ${Number(i.windspeed).toFixed(1)}</span>`
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
// showTemp();
showRain()
showTable();
showChart({ sta_num: "48478" })
// getWeatherHist();
// showWtrl()

var apiData = {};
var mapFrames = [];
var lastPastFramePosition = -1;
var radarLayers = [];

var optionKind = 'radar'; // can be 'radar' or 'satellite'

var optionTileSize = 256; // can be 256 or 512.
var optionColorScheme = 2; // from 0 to 8. Check the https://rainviewer.com/api/color-schemes.html for additional information
var optionSmoothData = 1; // 0 - not smooth, 1 - smooth
var optionSnowColors = 1; // 0 - do not show snow colors, 1 - show snow colors

var animationPosition = 0;
var animationTimer = false;

var apiRequest = new XMLHttpRequest();
apiRequest.open("GET", "https://api.rainviewer.com/public/weather-maps.json", true);
apiRequest.onload = function (e) {
  // store the API response for re-use purposes in memory
  apiData = JSON.parse(apiRequest.response);
  initialize(apiData, optionKind);
};
apiRequest.send();

function initialize(api, kind) {
  // remove all already added tiled layers
  for (var i in radarLayers) {
    map.removeLayer(radarLayers[i]);
  }
  mapFrames = [];
  radarLayers = [];
  animationPosition = 0;

  if (!api) {
    return;
  }
  if (kind == 'satellite' && api.satellite && api.satellite.infrared) {
    mapFrames = api.satellite.infrared;

    lastPastFramePosition = api.satellite.infrared.length - 1;
    showFrame(lastPastFramePosition);
  }
  else if (api.radar && api.radar.past) {
    mapFrames = api.radar.past;
    if (api.radar.nowcast) {
      mapFrames = mapFrames.concat(api.radar.nowcast);
    }
    lastPastFramePosition = api.radar.past.length - 1;
    showFrame(lastPastFramePosition);
  }
}

function addLayer(frame) {
  // radar = radarLayers[frame.path])
  if (!radarLayers[frame.path]) {
    var colorScheme = optionKind == 'satellite' ? 0 : optionColorScheme;
    var smooth = optionKind == 'satellite' ? 0 : optionSmoothData;
    var snow = optionKind == 'satellite' ? 0 : optionSnowColors;

    radarLayers[frame.path] = new L.TileLayer(apiData.host + frame.path + '/' + optionTileSize + '/{z}/{x}/{y}/' + colorScheme + '/' + smooth + '_' + snow + '.png', {
      tileSize: 256,
      opacity: 0.001,
      zIndex: frame.time,
      name: "lyr"
    });
  }

  if (!map.hasLayer(radarLayers[frame.path])) {
    map.addLayer(radarLayers[frame.path]);
  }
  lyrControl.addOverlay(radarLayers[frame.path], "เรดาห์น้ำฝน")
}

function changeRadarPosition(position, preloadOnly) {
  while (position >= mapFrames.length) {
    position -= mapFrames.length;
  }
  while (position < 0) {
    position += mapFrames.length;
  }

  var currentFrame = mapFrames[animationPosition];
  var nextFrame = mapFrames[position];

  addLayer(nextFrame);

  if (preloadOnly) {
    return;
  }

  animationPosition = position;

  if (radarLayers[currentFrame.path]) {
    radarLayers[currentFrame.path].setOpacity(0);
  }
  radarLayers[nextFrame.path].setOpacity(100);
}

function showFrame(nextPosition) {
  var preloadingDirection = nextPosition - animationPosition > 0 ? 1 : -1;

  changeRadarPosition(nextPosition);
  // changeRadarPosition(nextPosition + preloadingDirection, true);
}

var m53, ms53
let layermark = (Url, Nlayer) => {
  if (Nlayer == 53) {
    axios.get(Url).then((r) => {
      var d = r.data.features
      // console.log(r.data.features);
      ms53 = L.layerGroup()
      d.map(i => {
        if (i.geometry) {
          let json = i.geometry;
          m53 = L.geoJson(json, {
            style: {
              fillcolor: "#7acdf3",
              color: "#7acdf3",
              weight: 0.2,
              opacity: 1,
              fillOpacity: 1,
            },
            name: "53",
          })
            .bindPopup(`<h6><b>ชื่อแหล่งน้ำ :</b> ${i.properties.name}</h6>`)
          //        .addTo(map)
        }
        ms53.addLayer(m53);
      })
      // ms53.addTo(map)
      lyrControl.addOverlay(ms53, "อ่างเก็บน้ำ")
    });
  }
}
