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
} else {
  $("#nav").append(`
    <li><a href="./../../form_register/login/index.html"><i class="bi bi-box-arrow-right"></i>
    เข้าสู่ระบบ</a></li>`);
}
let Accept = sessionStorage.getItem('accept');
if (Accept || eecauth) {
  $('.toast').toast('hide')
}
else {
  $('.toast').toast('show')
}
$('#btnDeny').click(() => {
  // eraseCookie('allowCookies')
  $('.toast').toast('hide')
})
let setAccept
$('#btnAccept').click(() => {
  // setCookie('allowCookies','1',7)
  $('.toast').toast('hide')
  setAccept = sessionStorage.setItem('accept', 'Yes');
})
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

const airqualityeec = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
  layers: 'eec:a__65_airquality_eec',
  format: 'image/png',
  transparent: true
});
const pollution = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
  layers: 'eec:a__81_pollution_group',
  format: 'image/png',
  transparent: true,
});
const baseMaps = {
  "Mapbox": mapbox.addTo(map),
  "Google Hybrid": ghyb
};

const overlayMaps = {
  "ขอบเขตจังหวัด": pro.addTo(map),
  "ขอบเขตอำเภอ": amp,
  "ขอบเขตตำบล": tam,
  "แหล่งกำเนิดมลพิษ": pollution,
  "จุดตรวจวัดคุณภาพอากาศในพื้นที่เขตพัฒนาพิเศษภาคตะวันออก": airqualityeec.addTo(map),
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
    div.innerHTML += '<img src="./marker/radar.png"  height="30px"></i><span>เรดาห์น้ำฝน</span><br>'
    div.innerHTML += `<button class="btn btn-sm" onClick="Puop()" id="PUOP">
    <span class="kanit">แหล่งกำเนิดมลพิษ</span><i class="fa fa-angle-double-up" aria-hidden="true"></i>
  </button>`
    div.innerHTML += `<div id='PU'></div>`
    div.innerHTML += '<img src="./marker/location-pin-blue.svg"  height="30px"><span>จุดตรวจวัดคุณภาพอากาศ</span><br>'
    div.innerHTML += '<i style="background: #FD7231; border-radius: 50%;"></i><span>จุดความร้อน</span><br>';
    div.innerHTML += '<i style="background: #657aff; border-radius: 50%; border-color: #2436a7; border-style: solid;"></i><span>จุดตรวจวัดคุณภาพอากาศ<br>ในพื้นที่เขตพัฒนาพิเศษภาคตะวันออก</span><br>';
    // div.innerHTML += '<i style="background: #FFFFFF"></i><span>Ice</span><br>';
    // div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';
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

function Puop() {
  $('#PUOP').hide()
  $('#PU').html(`<button class="btn btn-sm" onClick="Puclose()" id="PUCLOSE">
  <span class="kanit">แหล่งกำเนิดมลพิษ</span><i class="fa fa-angle-double-down" aria-hidden="true"></i></button><br>
  <i style="background: #ff3769; border-radius: 1%;"></i><span>ตัวเมืองและย่านการค้า</span><br>
  <i style="background: #379eff; border-radius: 1%;"></i><span>ท่าเรือ</span><br>
  <i style="background: #ad71db; border-radius: 1%;"></i><span>นิคมอุตสาหกรรม</span><br>
  <i style="background: #ffadec; border-radius: 1%;"></i><span>รีสอร์ท โรงแรม เกสต์เฮ้าส์</span><br>
  <i style="background: #861790; border-radius: 1%;"></i><span>โรงงานอุตสาหกรรม</span><br>
  <i style="background: #ffe435; border-radius: 1%;"></i><span>โรงเรือนเลี้ยงสัตว์</pan><br>
  <i style="background: #7ae3ff; border-radius: 1%;"></i><span>สถานที่เพาะเลี้ยงสัตว์น้ำ</span><br>
  <i style="background: #000988; border-radius: 1%;"></i><span>สถานที่ราชการและสถาบันต่าง ๆ</span><br>
  <i style="background: #f9b310; border-radius: 1%;"></i><span>สถานีบริการน้ำมัน</span><br>
  <i style="background: #984700; border-radius: 1%;"></i><span>หมู่บ้าน/ที่ดินจัดสรรร้าง</span><br></div>`).slideDown();
}
function Puclose() {
  $('#PUOP').show()
  $('#PU').html('').slideUp(function () {
    $('#PU').show();
  });
}
const lyrControl = L.control.layers(baseMaps, overlayMaps, {
  collapsed: true
}).addTo(map);

let a = 1;
let onLocationFound = (e) => {
  nearData(e)
}

let onLocationError = (e) => {
  // console.log(e.message);
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

let prov_n, amp_n, tam_n
$('#Hc_pat').html('ทุกจังหวัด')
$("#pro").on("change", function () {
  getPro(this.value)
  zoomExtent("pro", this.value)

  prov_n = $('#pro').children("option:selected").text()
  if (this.value == 'eec') {
    $("#pro_tn").html($('#pro').children("option:selected").text())
    $('#Hc_pat').html('ทุกจังหวัด')
    $('#chartparamiter').hide();
  } else {
    $("#pro_tn").html('จังหวัด' + $('#pro').children("option:selected").text())
    $('#Hc_pat').html(`จ.${prov_n}`)
    $('#chartparamiter').show();
  }


});
$("#amp").on("change", function () {
  if (this.value !== "eec") {
    getAmp(this.value)
    zoomExtent("amp", this.value)

    amp_n = $('#amp').children("option:selected").text()
    $("#amp_tn").html('อำเภอ' + $('#amp').children("option:selected").text())
    $('#Hc_pat').html(`อ.${amp_n} จ.${prov_n}`)
  }
});
$("#tam").on("change", function () {
  if (this.value !== "eec") {
    zoomExtent("tam", this.value)
    $("#tam_tn").html('ตำบล' + $('#tam').children("option:selected").text())

    tam_n = $('#tam').children("option:selected").text()
    $('#Hc_pat').html(`ต.${tam_n} อ.${amp_n} จ.${prov_n}`)
  }
});

let zoomExtent = (lyr, code) => {
  map.eachLayer(lyr => {
    if (lyr.options.name == 'bound') {
      map.removeLayer(lyr)
    }
  })

  axios.get(url + `/eec-api/get-bound-flip/${lyr}/${code}`).then(r => {
    let geom = JSON.parse(r.data.data[0].geom)
    var polygon = L.polygon(geom.coordinates, { color: "red", name: "bound", fillOpacity: 0.0 }).addTo(map);

    // console.log(lyr, code);

    $("#tab").dataTable().fnDestroy();
    showDataTable({ col: lyr, val: code });

    map.fitBounds(polygon.getBounds());
  })
}

// let zoomExtent = (lyr, code) => {
//   axios.get(url + `/eec-api/get-extent/ ${lyr} /${code}`).then(r => {
//     let geom = JSON.parse(r.data.data[0].geom)
//     map.fitBounds([
//       geom.coordinates[0][0],
//       geom.coordinates[0][2],
//     ]);
//   })
// }

let getPro = (procode) => {
  axios.get(url + `/eec-api/get-amp/${procode}`).then(r => {
    // console.log(r.data.data);
    $("#amp").empty().append(`<option value="eec">เลือกอำเภอ</option>`);;
    $("#tam").empty().append(`<option value="eec">เลือกตำบล</option>`);;
    r.data.data.map(i => {
      $("#amp").append(`<option value="${i.amphoe_idn}">${i.amp_namt}</option>`)
    })
  })
}

let getAmp = (ampcode) => {
  axios.get(url + `/eec-api/get-tam/${ampcode}`).then(r => {
    $("#tam").empty().append(`<option value="eec">เลือกตำบล</option>`);
    r.data.data.map(i => {
      $("#tam").append(`<option value="${i.tambon_idn}">${i.tam_namt}</option>`)
    })
  })
}

let hpData = axios.get("https://firms.modaps.eosdis.nasa.gov/mapserver/wfs/SouthEast_Asia/c56f7d70bc06160e3c443a592fd9c87e/?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAME=ms:fires_snpp_24hrs&STARTINDEX=0&COUNT=5000&SRSNAME=urn:ogc:def:crs:EPSG::4326&BBOX=-90,-180,90,180,urn:ogc:def:crs:EPSG::4326&outputformat=geojson");
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
    layer.bindPopup(
      `<span class="kanit"><b>ตำแหน่งจุดความร้อน</b>
      <br/>ข้อมูลจาก VIRRS
      <br/>ตำแหน่งที่พบ : ${feature.properties.latitude}, ${feature.properties.longitude} 
      <br/>ค่า Brightness temperature: ${feature.properties.satellite} Kelvin
      <br/>วันที่: ${feature.properties.acq_datetime} UTC`
    );
  }
}

let loadHotspot = async () => {
  let hp = await hpData;
  console.log(hp);
  const fs = hp.data.features;

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


let resp = [];

let showDataTable = async (json) => {
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
      },
      "emptyTable": "ไม่พบข้อมูล..."
    }
  });
  let table = $('#tab').DataTable({
    ajax: {
      url: url + '/eec-api/get-aqi-bytam',
      type: 'POST',
      data: json,
      dataSrc: 'data'
    },
    columns: [
      // {
      //   data: null,
      //   "render": function (data, type, row) { return `<a type="button" href="#report-section" class="btn btn-margin btn-success" ><i class="bi bi-clipboard-data"></i> ดูข้อมูลย้อนหลัง</a>` }
      // },
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
    columnDefs: [
      { className: 'text-center', targets: [0, 2, 3, 4, 5, 6, 7, 8] },
      // { "width": "10%", "targets": [0] },
      // { "width": "100%", "targets": [1, 2, 3, 4, 5, 6, 7, 8, 9] }
      // {
      //     'targets': 0,
      //     'searchable': false,
      //     'orderable': false,
      //     'className': 'dt-body-center',
      //     'render': function (data, type, full, meta) {
      //         return '<input type="radio" name="id[]" value="' + $('<div/>').text(data).html() + '">';
      //     }
      // }
    ],
    dom: 'Bfrtip',
    buttons: [
      'excel', 'print'
    ],
    scrollX: true,
    select: true,
    pageLength: 7,
    responsive: {
      details: true
    }
  });

  table.on('search.dt', function () {
    resp = table.rows({ search: 'applied' }).data();

    getsta_2(resp);
    // console.log("resp");
    mapAQI()
    $('#paramiter').prop('selectedIndex', 0);
  });

  // $('#tab tbody').on('click', 'tr', function () {
  //   let data = table.row(this).data();
  //   // console.log(data);
  //   showChart(data)
  // });

  // $('#tab tbody').on('click', 'tr', function () {
  //   let data = table.row(this).data();
  //   console.log(data)
  //   L.popup({ offset: [0, -27] })
  //     .setLatLng([Number(data.lat), Number(data.lon)])
  //     .setContent(`รหัส: ${data.sta_id} <br> ชื่อสถานี: ${data.sta_th}`)
  //     .openOn(map);
  //   map.panTo([Number(data.lat), Number(data.lon)])
  //   showChart(data)
  // });
}

$('#q1').hide();
let mapAQI = async () => {
  $('#q1').hide();
  $('#imgaqi').show();
  $('#Hc_p').text('ค่าดัชนีคุณภาพอากาศ (Air Quality Index : AQI)')
  // $("#variable").text('ดัชนีคุณภาพอากาศ (Air Quality Index : AQI)')
  rmLyr()
  // let d = await response;
  let datArr = [];
  // $("#datetime").text(`วันที่ ${resp[0].date_} เวลา ${resp[0].time_} น.`)
  resp.map(i => {
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
    marker.bindPopup(`<span class="kanit"> รหัส : ${i.sta_id}<br> 
    ชื่อสถานี : ${i.sta_th} <br> 
      ค่า AQI : ${Number(i.aqi).toFixed(1)}</span>`
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
  $('#imgaqi').hide();
  $('#q1').show();
  $("#variable").text('ฝุ่นละอองขนาดไม่เกิน 2.5 ไมครอน (PM2.5)')

  $('#Hc_p').text('ค่าฝุ่นละอองขนาดไม่เกิน 2.5 ไมครอน (PM2.5)')

  rmLyr()
  // let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${resp[0].date_} เวลา ${resp[0].time_} น.`)
  resp.map(i => {
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
    marker.bindPopup(`<span class="kanit"> รหัส : ${i.sta_id}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      ค่า PM2.5 : ${Number(i.pm25).toFixed(1)} </span>`
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
  $('#imgaqi').hide();
  $('#q1').show();
  // $("#variable").text('ฝุ่นละอองขนาดไม่เกิน 10 ไมครอน (PM10)')
  $('#Hc_p').text('ค่าฝุ่นละอองขนาดไม่เกิน 10 ไมครอน (PM10)')
  rmLyr()
  // let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${resp[0].date_} เวลา ${resp[0].time_} น.`)
  resp.map(i => {
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
    marker.bindPopup(`<span class="kanit"> รหัส : ${i.sta_id}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      ค่า PM10 : ${Number(i.pm10).toFixed(1)}</span>`
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
  $('#imgaqi').hide();
  $('#q1').show();
  // $("#variable").text('ก๊าซโอโซน (O3)')
  $("#Hc_p").text('ค่าก๊าซโอโซน (O3)')
  rmLyr()
  // let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${resp[0].date_} เวลา ${resp[0].time_} น.`)
  resp.map(i => {
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
    marker.bindPopup(`<span class="kanit">รหัส : ${i.sta_id}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      ค่า O3 : ${Number(i.o3).toFixed(1)}</span>`
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
  $('#imgaqi').hide();
  $('#q1').show();
  // $("#variable").text('คาร์บอนมอนอกไซด์ (CO)')
  $("#Hc_p").text('ค่าคาร์บอนมอนอกไซด์ (CO)')

  rmLyr()
  // let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${resp[0].date_} เวลา ${resp[0].time_} น.`)
  resp.map(i => {
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
    marker.bindPopup(`<span class="kanit">รหัส : ${i.sta_id}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      ค่า CO : ${Number(i.co).toFixed(1)}</span>`
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
  $('#imgaqi').hide();
  $('#q1').show();
  // $("#variable").text('ก๊าซไนโตรเจนไดออกไซด์ (NO2)')
  $("#Hc_p").text('ค่าก๊าซไนโตรเจนไดออกไซด์ (NO2)')
  rmLyr()
  // let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${resp[0].date_} เวลา ${resp[0].time_} น.`)
  resp.map(i => {
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
    marker.bindPopup(`<span class="kanit">รหัส : ${i.sta_id}<br> 
      ชื่อสถานี : ${i.sta_th} <br>  
      ค่า NO2 : ${Number(i.no2).toFixed(1)}</span>`
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
  $('#imgaqi').hide();
  $('#q1').show();
  // $("#variable").text('ก๊าซซัลเฟอร์ไดออกไซด์ (SO2)')
  $("#Hc_p").text('ค่าก๊าซซัลเฟอร์ไดออกไซด์ (SO2)')
  rmLyr()
  // let d = await response;
  let datArr = [];
  $("#datetime").text(`วันที่ ${resp[0].date_} เวลา ${resp[0].time_} น.`)
  resp.map(i => {
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
    marker.bindPopup(`<span class="kanit">รหัส : ${i.sta_id}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
      ค่า SO2 : ${Number(i.so2).toFixed(1)}</span>`
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

  let label = categoryAxis.renderer.labels.template;
  label.truncate = true;
  label.maxWidth = 150;
  label.tooltipText = "{category}";

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
  chart.exporting.menu = new am4core.ExportMenu();
  chart.exporting.adapter.add("data", function (data, target) {
    var data = [];
    chart.series.each(function (series) {
      for (var i = 0; i < series.data.length; i++) {
        series.data[i].name = series.name;
        data.push(series.data[i]);
      }
    });
    return { data: data };
  });

  var indicator;
  function showIndicator() {
    if (indicator) {
      indicator.show();
    }
    else {
      indicator = chart.tooltipContainer.createChild(am4core.Container);
      indicator.background.fill = am4core.color("#fff");
      indicator.background.fillOpacity = 0.8;
      indicator.width = am4core.percent(100);
      indicator.height = am4core.percent(100);

      var indicatorLabel = indicator.createChild(am4core.Label);
      indicatorLabel.text = "ไม่พบข้อมูล...";
      indicatorLabel.align = "center";
      indicatorLabel.valign = "middle";
      indicatorLabel.fontSize = 20;
    }
  }

  chart.events.on("beforedatavalidated", function (ev) {
    // console.log(ev.target.data)
    if (ev.target.data.length == 0) {
      showIndicator();
    }
  });
}

// let showHistoryChart = (id) => {
//   let sta_id = id.target.options.id
//   axios.post(url + '/eec-api/get-hist', { sta_id: sta_id }).then((r) => {
//   }).catch((err) => {
//   });
// }

let showChart = async (e) => {
  // ${e.sta_th} 
  $("#sta_name").text(`${e.area_th}`)
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

  await chartTemplate(arrPM25, "chart-pm25", pm25);
  await chartTemplate(arrPM10, "chart-pm10", pm10);
  await chartTemplate(arrO3, "chart-o3", o3);
  await chartTemplate(arrCO, "chart-co", co);
  await chartTemplate(arrNO2, "chart-no2", no2);
  await chartTemplate(arrSO2, "chart-so2", so2);
  await chartTemplate(arrAQI, "chart-aqi", aqi);
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

  chart.exporting.menu = new am4core.ExportMenu();
  chart.exporting.menu.align = "left";
  chart.exporting.menu.verticalAlign = "bottom";
  chart.exporting.adapter.add("data", function (data, target) {
    var data = [];
    chart.series.each(function (series) {
      for (var i = 0; i < series.data.length; i++) {
        series.data[i].name = series.name;
        data.push(series.data[i]);
      }
    });
    return { data: data };
  });

  chart.events.on('ready', async () => {
    if (div == "chart-aqi") {
      await $('#spin1').hide();
      $('#Dechart').fadeIn("slow")

      // await $('#spin1').hide(function () {
      //   $('#Paramiterchart').fadeIn(100);

      // });
    }
  });

  var indicator;
  function showIndicator() {
    if (indicator) {
      indicator.show();
    }
    else {
      indicator = chart.tooltipContainer.createChild(am4core.Container);
      indicator.background.fill = am4core.color("#fff");
      indicator.background.fillOpacity = 0.8;
      indicator.width = am4core.percent(100);
      indicator.height = am4core.percent(100);

      var indicatorLabel = indicator.createChild(am4core.Label);
      indicatorLabel.text = "ไม่พบข้อมูล...";
      indicatorLabel.align = "center";
      indicatorLabel.valign = "middle";
      indicatorLabel.fontSize = 20;
    }
  }

  chart.events.on("beforedatavalidated", function (ev) {
    // console.log(ev.target.data)
    if (ev.target.data.length == 0) {
      showIndicator();
    }
  });
}

// init aqi
// mapAQI()
loadHotspot()
// getAvAQI()
// showDataTable()
showDataTable({ col: "pro", val: "eec" });
// showChart({ sta_id: '74t', sta_th: "ศูนย์ราชการจังหวัดระยอง", area_th: "ต.เนินพระ อ.เมือง, ระยอง" })


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
$('#paramiter').on('change', function () {
  var prov = $('#pro').val()
  if (prov !== 'eec') {
    if (this.value == "AQI") { mapAQI() }
    else if (this.value == "PM25") { mapPM25() }
    else if (this.value == "PM10") { mapPM10() }
    else if (this.value == "O3") { mapO3() }
    else if (this.value == "CO") { mapCO() }
    else if (this.value == "NO2") { mapNO2() }
    else if (this.value == "SO2") { mapSO2() }
  } else {
    $('#warningModal').modal('show')
  }
})

let datafor_chart
let getsta_2 = (data) => {
  datafor_chart = data
  $("#sta_name").hide();
  $("#spin1").hide();
  $("#Dechart").hide();

  $("#sta_name2").empty().append(`<option value="eec">ทุกสถานีตรวจวัด</option>`);
  data.map(i => {
    $("#sta_name2").append(`<option value="${i.sta_id}">${i.sta_th}</option>`)
  })
}

$("#spin1").hide();
$("#Dechart").hide();
$("#chartparamiter").hide();
$('#sta_name2').on('change', function () {
  if (this.value == "eec") {
    $("#sta_name").text(``);
    $("#sta_name").hide();
    $("#Dechart").slideUp();
    $("#spin1").slideUp();
    // H1_close()
    // H2_close()
  } else {
    $("#sta_name").show();
    $("#spin1").slideDown();
    $("#Dechart").hide();
    // $('#Dechart1').hide();
    // $('#spin1').show();

    // $('#Dechart2').hide();
    // $('#spin2').show();

    let a = datafor_chart.filter(e => e.sta_id == this.value)
    let data = a

    showChart({ sta_id: data[0].sta_id, sta_th: data[0].sta_th, area_th: data[0].area_th })
  }
})