let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');

// console.log(urname);

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

// const url = 'http://localhost:3700';
const url = "https://eec-onep.online:3700";

let iconblue = L.icon({
  iconUrl: './marker/location-pin-blue.svg',
  iconSize: [50, 50],
  iconAnchor: [12, 37],
  popupAnchor: [5, -30]
});

let icongreen = L.icon({
  iconUrl: './marker/location-pin-green.svg',
  iconSize: [50, 50],
  iconAnchor: [12, 37],
  popupAnchor: [5, -30]
});

let iconyellow = L.icon({
  iconUrl: './marker/location-pin-yellow.svg',
  iconSize: [50, 50],
  iconAnchor: [12, 37],
  popupAnchor: [5, -30]
});

let iconorange = L.icon({
  iconUrl: './marker/location-pin-orange.svg',
  iconSize: [50, 50],
  iconAnchor: [12, 37],
  popupAnchor: [5, -30]
});

let iconred = L.icon({
  iconUrl: './marker/location-pin-red.svg',
  iconSize: [50, 50],
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

const airqualityeec = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
  layers: 'eec:a__65_airquality_eec',
  format: 'image/png',
  transparent: true
});

const baseMaps = {
  "Mapbox": mapbox.addTo(map),
  "Google Hybrid": ghyb
};

const overlayMaps = {
  "ขอบเขตจังหวัด": pro.addTo(map),
  "ขอบเขตอำเภอ": amp.addTo(map),
  "ขอบเขตตำบล": tam.addTo(map),
  "จุดตรวจวัดคุณภาพอากาศในพื้นที่เขตพัฒนาพิเศษภาคตะวันออก": airqualityeec.addTo(map),
};

var legend = L.control({ position: "bottomright" });
legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>สัญลักษณ์</h4>";
  div.innerHTML += '<i style="background: #FFFFFF; border-style: solid; border-width: 3px;"></i><span>ขอบเขตจังหวัด</span><br>';
  div.innerHTML += '<i style="background: #FFFFFF; border-style: solid; border-width: 1.5px;"></i><span>ขอบเขตอำเภอ</span><br>';
  div.innerHTML += '<i style="background: #FFFFFF; border-style: dotted; border-width: 1.5px;"></i><span>ขอบเขตตำบล</span><br>';
  div.innerHTML += '<img src="./marker/location-pin-blue.svg"  height="30px"><span>จุดตรวจวัดคุณภาพอากาศ</span><br>'
  div.innerHTML += '<i style="background: #FD7231; border-radius: 50%;"></i><span>จุดความร้อน</span><br>';
  div.innerHTML += '<i style="background: #BF1EFF; transform: rotate(45deg);"></i><span>จุดตรวจวัดคุณภาพอากาศในพื้นที่เขตพัฒนาพิเศษภาคตะวันออก</span><br>';
  // div.innerHTML += '<i style="background: #FFFFFF"></i><span>Ice</span><br>';
  // div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';
  return div;
};
legend.addTo(map);

const lyrControl = L.control.layers(baseMaps, overlayMaps, {
  collapsed: true
}).addTo(map);

let a = 1;
let onLocationFound = (e) => {
  nearData(e)
}

let onLocationError = (e) => {
  console.log(e.message);
}

map.on("locationfound", onLocationFound);
// map.on("locationerror", onLocationError);
// map.locate({ setView: true, maxZoom: 19 });

// start locate
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

let hpData = axios.get("https://rti2dss.com:3600/hp_api/hp_viirs_th?fbclid=IwAR34tLi82t2GbsXPK8DmS30NJDWN93Q1skgP-eACKOucWs9pNYjHs24kHT4");
let response = axios.get(url + '/eec-api/get-aqi');
let responseAll = axios.get(url + '/eec-api/get-aqi-all');

let rmLyr = () => {
  map.eachLayer(lyr => {
    if (lyr.options.name == 'marker') {
      map.removeLayer(lyr)
    }
  })
}

let onEachFeature = (feature, layer) => {
  if (feature.properties) {
    const time = feature.properties.acq_time;
    const hr = Number(time.slice(0, 2));
    const mn = Number(time.slice(2, 4));
    layer.bindPopup(
      '<b>ตำแหน่งจุดความร้อน</b>' +
      '<br/>lat: ' + feature.properties.latitude +
      '<br/>lon: ' + feature.properties.longitude +
      // '<br/>satellite: ' + feature.properties.satellite +
      '<br/>วันที่: ' + feature.properties.acq_date +
      '<br/>เวลา: ' + hr + ':' + mn
    );
  }
}

let loadHotspot = async () => {
  let hp = await hpData;
  // console.log(hp);
  const fs = hp.data.data.features;

  var geojsonMarkerOptions = {
    radius: 6,
    fillColor: "#ff5100",
    color: "#a60b00",
    weight: 0,
    opacity: 1,
    fillOpacity: 0.8
  };

  const marker = await L.geoJSON(fs, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, geojsonMarkerOptions);
    },
    onEachFeature: onEachFeature
  }).addTo(map);

  lyrControl.addOverlay(marker, "จุดความร้อน");
}

let nearData = async (e) => {
  let res = await axios.post(url + '/eec-api/get-aqi-near', { geom: e.latlng });
  // console.log(res.data.data[0]);
  $("#sta_id").text(res.data.data[0].sta_id)
  $("#sta_th").text(res.data.data[0].sta_th)
  $("#area_th").text(res.data.data[0].area_th)
  $("#av-aqi").text(Number(res.data.data[0].aqi).toFixed(1));
  $("#av-pm10").text(Number(res.data.data[0].pm10).toFixed(1));
  $("#av-pm25").text(Number(res.data.data[0].pm25).toFixed(1));
  $("#av-o3").text(Number(res.data.data[0].o3).toFixed(1));
  $("#av-co").text(Number(res.data.data[0].co).toFixed(1));
  $("#av-no2").text(Number(res.data.data[0].no2).toFixed(1));
  $("#av-so2").text(Number(res.data.data[0].so2).toFixed(1));
  $("#datetime").text(`วันที่ ${res.data.data[0].dt_} เวลา ${res.data.data[0].time_} น.`)
}

let mapAQI = async () => {
  // $("#variable").text('ดัชนีคุณภาพอากาศ (Air Quality Index : AQI)')
  rmLyr()
  let d = await response;
  let datArr = [];
  d.data.data.map(i => {
    datArr.push({
      "station": i.sta_th,
      "data": Number(i.aqi)
    })
  })
  barChart(datArr, "AQI", "ดัชนีคุณภาพอากาศ (Air Quality Index : AQI)");
  $("#unit").html('AQI');

  let x = await responseAll;
  x.data.data.map(i => {
    let dat = {
      sta_id: i.sta_id,
      sta_th: i.sta_th,
      area_th: i.area_th,
      aqi: i.aqi,
      co: i.co,
      no2: i.no2,
      o3: i.o3,
      pm10: i.pm10,
      pm25: i.pm25,
      so2: i.so2
    }
    let marker
    if (Number(i.aqi) <= 25) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconblue,
        name: 'marker',
        data: dat
      });
    } else if (Number(i.aqi) <= 50) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: icongreen,
        name: 'marker',
        data: dat
      });
    } else if (Number(i.aqi) <= 100) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconyellow,
        name: 'marker',
        data: dat
      });
    } else if (Number(i.aqi) <= 200) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconorange,
        name: 'marker',
        data: dat
      });
    } else {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconred,
        name: 'marker',
        data: dat
      });
    }
    marker.addTo(map)
    marker.bindPopup(`รหัส : ${i.sta_id}<br> 
    ชื่อสถานี : ${i.sta_th} <br> 
      ค่า AQI : ${Number(i.aqi).toFixed(1)}`
    )
    marker.on('click', (e) => {
      // console.log(e.target.options);
      $("#sta_id").text(e.target.options.data.sta_id)
      $("#sta_th").text(e.target.options.data.sta_th)
      $("#area_th").text(e.target.options.data.area_th)
      $("#av-aqi").text(Number(e.target.options.data.aqi).toFixed(1));
      $("#av-pm10").text(Number(e.target.options.data.pm10).toFixed(1));
      $("#av-pm25").text(Number(e.target.options.data.pm25).toFixed(1));
      $("#av-o3").text(Number(e.target.options.data.o3).toFixed(1));
      $("#av-co").text(Number(e.target.options.data.co).toFixed(1));
      $("#av-no2").text(Number(e.target.options.data.no2).toFixed(1));
      $("#av-so2").text(Number(e.target.options.data.so2).toFixed(1));
    })
  })
}

let mapPM25 = async () => {
  $("#variable").text('ฝุ่นละอองขนาดไม่เกิน 2.5 ไมครอน (PM2.5)')

  rmLyr()
  let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${d.data.data[0].date_} เวลา ${d.data.data[0].time_} น.`)
  d.data.data.map(i => {
    datArr.push({
      "station": i.sta_th,
      "data": Number(i.pm25)
    })
  })
  barChart(datArr, "µg./sqm", "ฝุ่นละอองขนาดไม่เกิน 2.5 ไมครอน(PM2.5)");
  $("#unit").html('pm25 (µg./m<sup>3</sup>)');

  let x = await responseAll;
  x.data.data.map(i => {
    let dat = {
      sta_id: i.sta_id,
      sta_th: i.sta_th,
      area_th: i.area_th,
      aqi: i.aqi,
      co: i.co,
      no2: i.no2,
      o3: i.o3,
      pm10: i.pm10,
      pm25: i.pm25,
      so2: i.so2
    }
    let marker
    if (Number(i.pm25) <= 25) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconblue,
        name: 'marker',
        data: dat
      });
    } else if (Number(i.pm25) <= 37) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: icongreen,
        name: 'marker',
        data: dat
      });
    } else if (Number(i.pm25) <= 50) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconyellow,
        name: 'marker',
        data: dat
      });
    } else if (Number(i.pm25) <= 90) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconorange,
        name: 'marker',
        data: dat
      });
    } else {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconred,
        name: 'marker',
        data: dat
      });
    }

    marker.addTo(map)
    marker.bindPopup(`รหัส : ${i.sta_id}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      ค่า PM2.5 : ${Number(i.pm25).toFixed(1)}`
    )
    marker.on('click', (e) => {
      // console.log(e.target.options);
      $("#sta_id").text(e.target.options.sta_id)
      $("#sta_th").text(e.target.options.sta_th)
      $("#area_th").text(e.target.options.area_th)
      $("#av-aqi").text(Number(e.target.options.aqi).toFixed(1));
      $("#av-pm10").text(Number(e.target.options.pm10).toFixed(1));
      $("#av-pm25").text(Number(e.target.options.pm25).toFixed(1));
      $("#av-o3").text(Number(e.target.options.o3).toFixed(1));
      $("#av-co").text(Number(e.target.options.co).toFixed(1));
      $("#av-no2").text(Number(e.target.options.no2).toFixed(1));
      $("#av-so2").text(Number(e.target.options.so2).toFixed(1));
    })
  })
}

let mapPM10 = async () => {
  $("#variable").text('ฝุ่นละอองขนาดไม่เกิน 10 ไมครอน (PM10)')
  rmLyr()
  let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${d.data.data[0].date_} เวลา ${d.data.data[0].time_} น.`)
  d.data.data.map(i => {
    datArr.push({
      "station": i.sta_th,
      "data": Number(i.pm10)
    })
  })
  barChart(datArr, "µg./sqm", "ฝุ่นละอองขนาดไม่เกิน 10 ไมครอน (PM10)");
  $("#unit").html('pm25 (µg./m<sup>3</sup>)');

  let x = await responseAll;
  x.data.data.map(i => {
    let dat = {
      sta_id: i.sta_id,
      sta_th: i.sta_th,
      area_th: i.area_th,
      aqi: i.aqi,
      co: i.co,
      no2: i.no2,
      o3: i.o3,
      pm10: i.pm10,
      pm25: i.pm25,
      so2: i.so2
    }
    let marker;
    if (Number(i.pm10) <= 50) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconblue,
        name: 'marker',
        data: dat
      });
    } else if (Number(i.pm10) <= 80) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: icongreen,
        name: 'marker',
        data: dat
      });
    } else if (Number(i.pm10) <= 120) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconyellow,
        name: 'marker',
        data: dat
      });
    } else if (Number(i.pm10) <= 150) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconorange,
        name: 'marker',
        data: dat
      });
    } else {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconred,
        name: 'marker',
        data: dat
      });
    }
    marker.addTo(map)
    marker.bindPopup(`รหัส : ${i.sta_id}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      ค่า PM10 : ${Number(i.pm10).toFixed(1)}`
    )
    marker.on('click', (e) => {
      // console.log(e.target.options);
      $("#sta_id").text(e.target.options.sta_id)
      $("#sta_th").text(e.target.options.sta_th)
      $("#area_th").text(e.target.options.area_th)
      $("#av-aqi").text(Number(e.target.options.aqi).toFixed(1));
      $("#av-pm10").text(Number(e.target.options.pm10).toFixed(1));
      $("#av-pm25").text(Number(e.target.options.pm25).toFixed(1));
      $("#av-o3").text(Number(e.target.options.o3).toFixed(1));
      $("#av-co").text(Number(e.target.options.co).toFixed(1));
      $("#av-no2").text(Number(e.target.options.no2).toFixed(1));
      $("#av-so2").text(Number(e.target.options.so2).toFixed(1));
    })
  })
}

let mapO3 = async () => {
  $("#variable").text('ก๊าซโอโซน (O3)')
  rmLyr()
  let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${d.data.data[0].date_} เวลา ${d.data.data[0].time_} น.`)
  d.data.data.map(i => {
    datArr.push({
      "station": i.sta_th,
      "data": Number(i.o3)
    })
  })
  barChart(datArr, "ppb", "ก๊าซโอโซน (O3)");
  $("#unit").html('o<sub>3</sub> (ppb)');

  let x = await responseAll;
  x.data.data.map(i => {
    let dat = {
      sta_id: i.sta_id,
      sta_th: i.sta_th,
      area_th: i.area_th,
      aqi: i.aqi,
      co: i.co,
      no2: i.no2,
      o3: i.o3,
      pm10: i.pm10,
      pm25: i.pm25,
      so2: i.so2
    }
    let marker;
    if (Number(i.o3) <= 4.4) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconblue,
        name: 'marker',
        data: dat
      });
    } else if (Number(i.o3) <= 6.4) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: icongreen,
        name: 'marker',
        data: dat
      });
    } else if (Number(i.o3) <= 9.0) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconyellow,
        name: 'marker',
        data: dat
      });
    } else if (Number(i.o3) <= 30) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconorange,
        name: 'marker',
        data: dat
      });
    } else {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconred,
        name: 'marker',
        data: dat
      });
    }
    marker.addTo(map)
    marker.bindPopup(`รหัส : ${i.sta_id}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      ค่า O3 : ${Number(i.o3).toFixed(1)}`
    )
    marker.on('click', (e) => {
      // console.log(e.target.options);
      $("#sta_id").text(e.target.options.sta_id)
      $("#sta_th").text(e.target.options.sta_th)
      $("#area_th").text(e.target.options.area_th)
      $("#av-aqi").text(Number(e.target.options.aqi).toFixed(1));
      $("#av-pm10").text(Number(e.target.options.pm10).toFixed(1));
      $("#av-pm25").text(Number(e.target.options.pm25).toFixed(1));
      $("#av-o3").text(Number(e.target.options.o3).toFixed(1));
      $("#av-co").text(Number(e.target.options.co).toFixed(1));
      $("#av-no2").text(Number(e.target.options.no2).toFixed(1));
      $("#av-so2").text(Number(e.target.options.so2).toFixed(1));
    })
  })
}

let mapCO = async () => {
  $("#variable").text('คาร์บอนมอนอกไซด์ (CO)')
  rmLyr()
  let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${d.data.data[0].date_} เวลา ${d.data.data[0].time_} น.`)
  d.data.data.map(i => {
    datArr.push({
      "station": i.sta_th,
      "data": Number(i.co)
    })
  })
  barChart(datArr, "ppm", "คาร์บอนมอนอกไซด์ (CO)");
  $("#unit").html('co (ppm)');

  let x = await responseAll;
  x.data.data.map(i => {
    let dat = {
      sta_id: i.sta_id,
      sta_th: i.sta_th,
      area_th: i.area_th,
      aqi: i.aqi,
      co: i.co,
      no2: i.no2,
      o3: i.o3,
      pm10: i.pm10,
      pm25: i.pm25,
      so2: i.so2
    }
    let marker;
    if (Number(i.co) <= 4.4) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconblue,
        name: 'marker',
        data: dat
      });
    } else if (Number(i.co) <= 6.4) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: icongreen,
        name: 'marker',
        data: dat
      });
    } else if (Number(i.co) <= 9.0) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconyellow,
        name: 'marker',
        data: dat
      });
    } else if (Number(i.co) <= 30) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconorange,
        name: 'marker',
        data: dat
      });
    } else {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconred,
        name: 'marker',
        data: dat
      });
    }
    marker.addTo(map)
    marker.bindPopup(`รหัส : ${i.sta_id}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      ค่า CO : ${Number(i.co).toFixed(1)}`
    )
    marker.on('click', (e) => {
      // console.log(e.target.options);
      $("#sta_id").text(e.target.options.sta_id)
      $("#sta_th").text(e.target.options.sta_th)
      $("#area_th").text(e.target.options.area_th)
      $("#av-aqi").text(Number(e.target.options.aqi).toFixed(1));
      $("#av-pm10").text(Number(e.target.options.pm10).toFixed(1));
      $("#av-pm25").text(Number(e.target.options.pm25).toFixed(1));
      $("#av-o3").text(Number(e.target.options.o3).toFixed(1));
      $("#av-co").text(Number(e.target.options.co).toFixed(1));
      $("#av-no2").text(Number(e.target.options.no2).toFixed(1));
      $("#av-so2").text(Number(e.target.options.so2).toFixed(1));
    })
  })
}

let mapNO2 = async () => {
  $("#variable").text('ก๊าซไนโตรเจนไดออกไซด์ (NO2)')
  rmLyr()
  let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${d.data.data[0].date_} เวลา ${d.data.data[0].time_} น.`)
  d.data.data.map(i => {
    datArr.push({
      "station": i.sta_th,
      "data": Number(i.no2)
    })
  })
  barChart(datArr, "ppm", "ก๊าซไนโตรเจนไดออกไซด์ (NO2)")
  $("#unit").html('co (ppm)');

  let x = await responseAll;
  x.data.data.map(i => {
    let dat = {
      sta_id: i.sta_id,
      sta_th: i.sta_th,
      area_th: i.area_th,
      aqi: i.aqi,
      co: i.co,
      no2: i.no2,
      o3: i.o3,
      pm10: i.pm10,
      pm25: i.pm25,
      so2: i.so2
    }
    let marker;
    if (Number(i.no2) <= 60) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconblue,
        name: 'marker',
        data: dat
      });
    } else if (Number(i.no2) <= 106) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: icongreen,
        name: 'marker',
        data: dat
      });
    } else if (Number(i.no2) <= 170) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconyellow,
        name: 'marker',
        data: dat
      });
    } else if (Number(i.no2) <= 340) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconorange,
        name: 'marker',
        data: dat
      });
    } else {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconred,
        name: 'marker',
        data: dat
      });
    }
    marker.addTo(map)
    marker.bindPopup(`รหัส : ${i.sta_id}<br> 
      ชื่อสถานี : ${i.sta_th} <br>  
      ค่า NO2 : ${Number(i.no2).toFixed(1)}`
    )
    marker.on('click', (e) => {
      // console.log(e.target.options);
      $("#sta_id").text(e.target.options.sta_id)
      $("#sta_th").text(e.target.options.sta_th)
      $("#area_th").text(e.target.options.area_th)
      $("#av-aqi").text(Number(e.target.options.aqi).toFixed(1));
      $("#av-pm10").text(Number(e.target.options.pm10).toFixed(1));
      $("#av-pm25").text(Number(e.target.options.pm25).toFixed(1));
      $("#av-o3").text(Number(e.target.options.o3).toFixed(1));
      $("#av-co").text(Number(e.target.options.co).toFixed(1));
      $("#av-no2").text(Number(e.target.options.no2).toFixed(1));
      $("#av-so2").text(Number(e.target.options.so2).toFixed(1));
    })
  })
}

let mapSO2 = async () => {
  $("#variable").text('ก๊าซซัลเฟอร์ไดออกไซด์ (SO2)')
  rmLyr()
  let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${d.data.data[0].date_} เวลา ${d.data.data[0].time_} น.`)
  d.data.data.map(i => {
    datArr.push({
      "station": i.sta_th,
      "data": Number(i.so2)
    })
  })
  barChart(datArr, "ppb", "ก๊าซซัลเฟอร์ไดออกไซด์ (SO2)");
  $("#unit").html('so<sub>2</sub> (ppb)');

  let x = await responseAll;
  x.data.data.map(i => {
    let dat = {
      sta_id: i.sta_id,
      sta_th: i.sta_th,
      area_th: i.area_th,
      aqi: i.aqi,
      co: i.co,
      no2: i.no2,
      o3: i.o3,
      pm10: i.pm10,
      pm25: i.pm25,
      so2: i.so2
    }
    let marker
    if (Number(i.so2) <= 100) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconblue,
        name: 'marker',
        data: dat
      });
    } else if (Number(i.so2) <= 200) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: icongreen,
        name: 'marker',
        data: dat
      });
    } else if (Number(i.so2) <= 300) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconyellow,
        name: 'marker',
        data: dat
      });
    } else if (Number(i.so2) <= 400) {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconorange,
        name: 'marker',
        data: dat
      });
    } else {
      marker = L.marker([Number(i.lat), Number(i.lon)], {
        icon: iconred,
        name: 'marker',
        data: dat
      });
    }
    marker.addTo(map)
    marker.bindPopup(`รหัส : ${i.sta_id}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      ค่า SO2 : ${Number(i.so2).toFixed(1)}`
    )
    marker.on('click', (e) => {
      // console.log(e.target.options);
      $("#sta_id").text(e.target.options.sta_id)
      $("#sta_th").text(e.target.options.sta_th)
      $("#area_th").text(e.target.options.area_th)
      $("#av-aqi").text(Number(e.target.options.aqi).toFixed(1));
      $("#av-pm10").text(Number(e.target.options.pm10).toFixed(1));
      $("#av-pm25").text(Number(e.target.options.pm25).toFixed(1));
      $("#av-o3").text(Number(e.target.options.o3).toFixed(1));
      $("#av-co").text(Number(e.target.options.co).toFixed(1));
      $("#av-no2").text(Number(e.target.options.no2).toFixed(1));
      $("#av-so2").text(Number(e.target.options.so2).toFixed(1));
    })
  })
}

let barChart = (datArr, unit, title) => {
  // console.log(datArr);
  am4core.useTheme(am4themes_material);
  var chart = am4core.create("chart", am4charts.XYChart);
  chart.numberFormatter.numberFormat = "#.#' " + unit + "'";

  // Add data
  chart.data = datArr;

  // Create axes
  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "station";
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 30;
  categoryAxis.renderer.labels.template.horizontalCenter = "right";
  categoryAxis.renderer.labels.template.verticalCenter = "middle";
  categoryAxis.renderer.labels.template.rotation = 270;
  categoryAxis.tooltip.disabled = true;
  categoryAxis.renderer.minHeight = 110;

  categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
    if (target.dataItem && target.dataItem.index & 2 == 2) {
      return dy + 25;
    }
    return dy;
  });

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.title.text = title;
  valueAxis.title.fontWeight = 800;

  // Create series
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueY = "data";
  series.dataFields.categoryX = "station";
  series.name = "data";
  series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
  series.columns.template.fillOpacity = .8;
  series.columns.template.width = am4core.percent(60);

  var columnTemplate = series.columns.template;
  columnTemplate.strokeWidth = 2;
  columnTemplate.strokeOpacity = 1;

  chart.cursor = new am4charts.XYCursor();
}

// let showHistoryChart = (id) => {
//   let sta_id = id.target.options.id
//   axios.post(url + '/eec-api/get-hist', { sta_id: sta_id }).then((r) => {
//   }).catch((err) => {
//   });
// }

let showDataTable = async () => {
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
    pageLength: 7,
    responsive: {
      details: true
    }
  });
  $('#tab tbody').on('click', 'tr', function () {
    let data = table.row(this).data();
    console.log(data)
    L.popup({ offset: [0, -27] })
      .setLatLng([Number(data.lat), Number(data.lon)])
      .setContent(`รหัส: ${data.sta_id} <br> ชื่อสถานี: ${data.sta_th}`)
      .openOn(map);
    map.panTo([Number(data.lat), Number(data.lon)])
    showChart(data)
  });
}

let showChart = async (e) => {
  $("#sta_name").text(`${e.sta_th} ${e.area_th}`)
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
      "value": Number(i.pm25).toFixed(1)
    });
    arrPM10.push({
      "date": i.date_,
      "value": Number(i.pm10).toFixed(1)
    });
    arrO3.push({
      "date": i.date_,
      "value": Number(i.o3).toFixed(1)
    });
    arrCO.push({
      "date": i.date_,
      "value": Number(i.co).toFixed(1)
    });
    arrNO2.push({
      "date": i.date_,
      "value": Number(i.no2).toFixed(1)
    });
    arrSO2.push({
      "date": i.date_,
      "value": Number(i.so2).toFixed(1)
    });
    arrAQI.push({
      "date": i.date_,
      "value": Number(i.aqi).toFixed(1)
    });
  })

  let pm25 = 37;
  let pm10 = 80;
  let o3 = 50;
  let co = 6.4;
  let no2 = 106;
  let so2 = 200;
  let aqi = 50;

  $("#idxpm25").text(pm25)
  $("#idxpm10").text(pm10)
  $("#idxo3").text(o3)
  $("#idxco").text(co)
  $("#idxno2").text(no2)
  $("#idxso2").text(so2)
  $("#idxaqi").text(aqi)

  chartTemplate(arrPM25, "chart-pm25", pm25);
  chartTemplate(arrPM10, "chart-pm10", pm10);
  chartTemplate(arrO3, "chart-o3", o3);
  chartTemplate(arrCO, "chart-co", co);
  chartTemplate(arrNO2, "chart-no2", no2);
  chartTemplate(arrSO2, "chart-so2", so2);
  chartTemplate(arrAQI, "chart-aqi", aqi);
}

let chartTemplate = (arrData, div, index) => {
  am4core.useTheme(am4themes_animated);

  // Create chart instance
  var chart = am4core.create(div, am4charts.XYChart);

  // Add data
  chart.data = arrData;

  // Set input format for the dates
  chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm:ss";

  // Create axes
  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.baseValue = 0;
  // Create series
  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = "value";
  series.dataFields.dateX = "date";
  series.tooltipText = "{value}";
  series.tensionX = 0.8;
  series.strokeWidth = 2;
  series.minBulletDistance = 15;
  series.stroke = am4core.color("#00b80f");

  // Drop-shaped tooltips
  series.tooltip.background.cornerRadius = 20;
  series.tooltip.background.strokeOpacity = 0;
  series.tooltip.pointerOrientation = "vertical";
  series.tooltip.label.minWidth = 40;
  series.tooltip.label.minHeight = 40;
  series.tooltip.label.textAlign = "middle";
  series.tooltip.label.textValign = "middle";

  var range = valueAxis.createSeriesRange(series);
  range.value = index;
  // range.endValue = -1000;
  range.contents.stroke = am4core.color("#ff0000");
  range.contents.fill = range.contents.stroke;

  // Make bullets grow on hover
  // var bullet = series.bullets.push(new am4charts.CircleBullet());
  // bullet.circle.strokeWidth = 2;
  // bullet.circle.radius = 4;
  // bullet.circle.fill = am4core.color("#fff");

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
loadHotspot()
// getAvAQI()
showDataTable()
showChart({ sta_id: '74t', sta_th: "ศูนย์ราชการจังหวัดระยอง", area_th: "ต.เนินพระ อ.เมือง, ระยอง" })


