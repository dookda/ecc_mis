let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');

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

// $("#usrname").text(urname);
// urid ? null : location.href = "./../../form_register/login/index.html";
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

let latlng = {
  lat: 13.305567,
  lng: 101.383101
};
let map = L.map("map", {
  center: latlng,
  zoom: 8
});

const url = "https://engrids.soc.cmu.ac.th/api";
// const url = 'http://localhost:3700';
const eecGeoserver = "https://engrids.soc.cmu.ac.th/geoserver/eec/wms?";
const eecGeoserverWFS = "https://engrids.soc.cmu.ac.th/geoserver";

var L53 = 'https://engrids.soc.cmu.ac.th/geoserver/eec/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=eec%3Aa__53_9w_reser63_3p&maxFeatures=50&outputFormat=application%2Fjson'
$(document).ready(() => {
  layermark(L53, 53)
  $("#amp").empty().append(`<option value="eec">เลือกอำเภอ</option>`);
  $("#tam").empty().append(`<option value="eec">เลือกตำบล</option>`);
})


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

const tam = L.tileLayer.wms(eecGeoserver, {
  layers: "eec:a__03_tambon_eec",
  format: "image/png",
  transparent: true,
  // maxZoom: 18,
  // minZoom: 14,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const amp = L.tileLayer.wms(eecGeoserver, {
  layers: "eec:a__02_amphoe_eec",
  format: "image/png",
  transparent: true,
  // maxZoom: 14,
  // minZoom: 10,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const pro = L.tileLayer.wms(eecGeoserver, {
  layers: "eec:a__01_prov_eec",
  format: "image/png",
  transparent: true,
  // maxZoom: 10,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});
const w2 = L.tileLayer.wms(eecGeoserver, {
  layers: "eec:a__14_w2_eec",
  format: "image/png",
  transparent: true,
  // maxZoom: 10,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});
const w13 = L.tileLayer.wms(eecGeoserver, {
  layers: "eec:a__13_water_path",
  format: "image/png",
  transparent: true,
  // maxZoom: 10,
  // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});
const w53 = L.tileLayer.wms(eecGeoserver, {
  layers: "eec:a__53_main_riv_3p",
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
  "ขอบเขตอำเภอ": amp.addTo(map),
  "ขอบเขตตำบล": tam.addTo(map),
  "แหล่งน้ำ": w2,
  "แม่น้ำสายหลัก": w53,
  "แม่น้ำสายรอง": w13,

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
    div.innerHTML += '<img src="./marker/gas-station.png"  height="30px"><span>จุดตรวจวัดระดับน้ำผิวดิน</span><br>'
    div.innerHTML += '<i style="background: #65d4fb; border-radius: 1%;"></i><span>แหล่งน้ำ</span><br>'
    div.innerHTML += '<img src="./marker/WW.png"  height="30px"></i><span>แม่น้ำสายหลัก</span><br>'
    div.innerHTML += '<img src="./marker/Wmain.png"  height="30px"></i><span>แม่น้ำสายรอง</span><br>'
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
  // console.log(e.message);
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

let prov_n, amp_n, tam_n
$('#Hc_pat').html('ทุกจังหวัด')
$('#chart_P').hide();
$("#pro").on("change", async function () {
  getPro(this.value)
  await zoomExtent("pro", this.value)

  prov_n = $('#pro').children("option:selected").text()
  if (this.value == 'eec') {
    // $("#pro_tn").html($('#pro').children("option:selected").text())
    $('#Hc_pat').html('ทุกจังหวัด')
    $('#chart_P').slideUp();
  } else {
    // $("#pro_tn").html('จังหวัด' + $('#pro').children("option:selected").text())
    $('#Hc_pat').html(`จ.${prov_n}`)
    $('#chart_P').slideDown();

    let parameter = $('#paramiter').val();
    if (parameter == 'Wtrl') {
      getwtrlUrl('prov', this.value)
      table2.search(prov_n).draw();
    } else {
      getparameter(parameter)
    }
  }
});

$("#amp").on("change", function () {
  if (this.value !== "eec") {
    getAmp(this.value)
    zoomExtent("amp", this.value)
    amp_n = $('#amp').children("option:selected").text()
    // $("#amp_tn").html('อำเภอ' + $('#amp').children("option:selected").text())
    $('#Hc_pat').html(`อ.${amp_n} จ.${prov_n}`)

    let parameter = $('#paramiter').val();
    if (parameter == 'Wtrl') {
      getwtrlUrl('amp', this.value)
      table2.search(amp_n).draw();
    } else {
      getparameter(parameter)
    }
  }
});

$("#tam").on("change", function () {
  if (this.value !== "eec") {
    zoomExtent("tam", this.value)

    // $("#tam_tn").html('ตำบล' + $('#tam').children("option:selected").text())
    tam_n = $('#tam').children("option:selected").text()
    $('#Hc_pat').html(`ต.${tam_n} อ.${amp_n} จ.${prov_n}`)

    let parameter = $('#paramiter').val();
    if (parameter == 'Wtrl') {
      getwtrlUrl('tam', this.value)
      table2.search(tam_n).draw();
    } else {
      getparameter(parameter)
    }
  }
});

let zoomExtent = async (lyr, code) => {
  map.eachLayer(lyr => {
    if (lyr.options.name == 'bound') {
      map.removeLayer(lyr)
    }
  })

  await axios.get(url + `/eec-api/get-bound-flip/${lyr}/${code}`).then(r => {
    let geom = JSON.parse(r.data.data[0].geom)
    var polygon = L.polygon(geom.coordinates, { color: "red", name: "bound", fillOpacity: 0.0 }).addTo(map);

    // console.log(lyr, code);

    $("#tab").dataTable().fnDestroy();
    showTable({ col: lyr, val: code });

    map.fitBounds(polygon.getBounds());
  })
}

let getPro = (procode) => {
  axios.get(url + `/eec-api/get-amp/${procode}`).then(r => {
    // console.log(r.data.data);
    $("#amp").empty().append(`<option value="eec">เลือกอำเภอ</option>`);
    $("#tam").empty().append(`<option value="eec">เลือกตำบล</option>`);
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


$('#T2').hide();
$('#C2').hide();
let getparameter = (r) => {
  let prov_n = $("#pro").children("option:selected").text()
  if (r == 'Rain') {
    $('#Hc_pat').html(`จ.${prov_n}`)
    showRain()
    $('#T1').show();
    $('#T2').hide();

    $('#C1').show();
    $('#C2').hide();
  } else if (r == 'Temp') {
    $('#Hc_pat').html(`จ.${prov_n}`)
    showTemp()
    $('#T1').show();
    $('#T2').hide();

    $('#C1').show();
    $('#C2').hide();
  } else if (r == 'Rh') {
    $('#Hc_pat').html(`จ.${prov_n}`)
    showRh()
    $('#T1').show();
    $('#T2').hide();

    $('#C1').show();
    $('#C2').hide();
  } else if (r == 'Pressure') {
    $('#Hc_pat').html(`จ.${prov_n}`)
    showPressure()
    $('#T1').show();
    $('#T2').hide();

    $('#C1').show();
    $('#C2').hide();
  } else if (r == 'Wind') {
    $('#Hc_pat').html(`จ.${prov_n}`)
    showWind()
    $('#T1').show();
    $('#T2').hide();

    $('#C1').show();
    $('#C2').hide();
  } else if (r == "Wtrl") {
    showWtrl()
    $('#T1').hide();
    $('#T2').show();

    $('#C2').show();
    $('#C1').hide();
  }
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

let resp = [];

let showTable = async (json) => {
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
  // console.log("ok")
  let table = $('#tab').DataTable({
    ajax: {
      url: url + '/eec-api/get-weather-3hr-bytam',
      type: 'POST',
      data: json,
      dataSrc: 'data'
    },
    columns: [
      // { data: 'sta_num' },
      // {
      //   data: null,
      //   render: function (data, type, row, meta) {
      //     return `
      //       <a type="button" href="#report-section" class="btn btn-margin btn-success" ><i class="bi bi-clipboard-data"></i> ดูข้อมูลย้อนหลัง</a>`
      //   },
      // },
      { data: 'sta_th' },
      {
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
    dom: 'Bfrtip',
    buttons: [
      'excel', 'print'
    ],
    searching: true,
    scrollX: true,
    select: true,
    pageLength: 8,
    responsive: {
      details: false
    }
  });

  table.on('search.dt', function () {
    resp = table.rows({ search: 'applied' }).data();
    // getData(data);
    // console.log(resp)
    getsta_2(resp)
    // showRain()
  });
  // $('#tab tbody').on('click', 'tr', function () {
  //   let data = table.row(this).data();

  //   showChart(data)
  // });
}

let showWtrl = async () => {
  $("#amp").prop("disabled", false);
  $("#tam").prop("disabled", false);
  rmLyr()
  let x = await wtrlUrl;
  $('#legend').empty()
  $('#legend').append(`<img src="./mk_legend/เกณฑ์น้ำท่า.png" width="100%">`)
  $('#Hc_p').text('ปริมาณน้ำท่า')

  let datArr = [];
  let prov = $('#pro').val();
  let valdata = x.data.data;
  if (prov !== "eec") {
    let a = valdata.filter(e => e.prov_code == prov)
    a.map(i => {
      datArr.push({
        "category": i.tele_station_name,
        "value": Number(i.waterlevel_msl).toFixed(1)
      })
    })
  }
  barChart(datArr, ' m', "ปริมาณน้ำท่า");
  $("#unit").html('ปริมาณน้ำท่า (เมตร)');
  table2.search(prov_n).draw();

  // showTable2(x.data.data)
  x.data.data.map(i => {
    // console.log(i);
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
  $("#amp").prop("disabled", true);
  $("#amp").prop("selectedIndex", 0);

  $("#tam").prop("disabled", true);
  $("#tam").prop("selectedIndex", 0);

  $('#legend').append(`<img src="./mk_legend/เกณฑ์น้ำฝน.png" width="100%">`)
  $("#variable").text('Rainfall')
  $('#Hc_p').text('ปริมาณน้ำฝน')
  rmLyr()

  // let d = await response;
  axios.post(url + '/eec-api/get-weather-3hr-bytam', { col: "pro", val: "eec" }).then(r => {
    let datArr = [];
    let d = r.data.data
    let prov = $("#pro").val();
    let d_filter = d.filter(e => e.prov_code == prov);
    if (prov !== "eec") {
      d_filter.map(i => {
        // console.log(i);
        datArr.push({
          "station": i.sta_th,
          "rainfall": i.rainfall,
          "rain24hr": i.rain24hr
        })
      })
      rainChart(datArr);
      $("#unit").html('Rainfall (mm)');
    } else {
      d.map(i => {
        // console.log(i);
        datArr.push({
          "station": i.sta_th,
          "rainfall": i.rainfall,
          "rain24hr": i.rain24hr
        })
      })
      rainChart(datArr);
      $("#unit").html('Rainfall (mm)');
    }
  })


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
  $("#amp").prop("disabled", true);
  $("#amp").prop("selectedIndex", 0);

  $("#tam").prop("disabled", true);
  $("#tam").prop("selectedIndex", 0);

  $("#variable").text('MeanSeaLevelPressure')
  $('#Hc_p').text('ความกดอากาศ')
  rmLyr()

  axios.post(url + '/eec-api/get-weather-3hr-bytam', { col: "pro", val: "eec" }).then(r => {
    let datArr = [];
    let d = r.data.data
    let prov = $("#pro").val();
    let d_filter = d.filter(e => e.prov_code == prov);
    if (prov !== "eec") {
      d_filter.map(i => {
        // console.log(i);
        datArr.push({
          "station": i.sta_th,
          "sta_pressure": i.sta_pressure,
          "msl_pressure": i.msl_pressure
        })
      })
      pressureChart(datArr)
      $("#unit").html('MeanSeaLevelPressure (mb)');
    } else {
      d.map(i => {
        // console.log(i);
        datArr.push({
          "station": i.sta_th,
          "sta_pressure": i.sta_pressure,
          "msl_pressure": i.msl_pressure
        })
      })
      pressureChart(datArr)
      $("#unit").html('MeanSeaLevelPressure (mb)');
    }
  })
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
  $("#amp").prop("disabled", true);
  $("#amp").prop("selectedIndex", 0);

  $("#tam").prop("disabled", true);
  $("#tam").prop("selectedIndex", 0);

  $('#legend').append(`<img src="./mk_legend/เกณฑ์อุณหภูมิ.png" width="100%">`)
  $("#variable").text('Temperature')
  $('#Hc_p').text('ค่าอุณหภูมิ')
  rmLyr()

  axios.post(url + '/eec-api/get-weather-3hr-bytam', { col: "pro", val: "eec" }).then(r => {
    let datArr = [];
    let d = r.data.data
    let prov = $("#pro").val();
    let d_filter = d.filter(e => e.prov_code == prov);
    if (prov !== "eec") {
      d_filter.map(i => {
        // console.log(i);
        datArr.push({
          "category": i.sta_th,
          "value": Number(i.air_temp)
        })
      })
      barChart(datArr, ' ℃', "อุณหภูมิ");
      $("#unit").html('Temperature (celcius)');
    } else {
      d.map(i => {
        // console.log(i);
        datArr.push({
          "category": i.sta_th,
          "value": Number(i.air_temp)
        })
      })
      barChart(datArr, ' ℃', "อุณหภูมิ");
      $("#unit").html('Temperature (celcius)');
    }
  })
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
  $("#amp").prop("disabled", true);
  $("#amp").prop("selectedIndex", 0);

  $("#tam").prop("disabled", true);
  $("#tam").prop("selectedIndex", 0);

  $("#variable").text('RelativeHumidity')
  $('#Hc_p').text('ความชื้น')
  rmLyr()

  axios.post(url + '/eec-api/get-weather-3hr-bytam', { col: "pro", val: "eec" }).then(r => {
    let datArr = [];
    let d = r.data.data
    let prov = $("#pro").val();
    let d_filter = d.filter(e => e.prov_code == prov);
    if (prov !== "eec") {
      d_filter.map(i => {
        // console.log(i);
        datArr.push({
          "category": i.sta_th,
          "value": Number(i.rh)
        })
      })
      barChart(datArr, ' %', "ความชื้นสัมพัทธ์");
      $("#unit").html('RelativeHumidity (%)');
    } else {
      d.map(i => {
        // console.log(i);
        datArr.push({
          "category": i.sta_th,
          "value": Number(i.rh)
        })
      })
      barChart(datArr, ' %', "ความชื้นสัมพัทธ์");
      $("#unit").html('RelativeHumidity (%)');
    }
  })

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
  $("#amp").prop("disabled", true);
  $("#amp").prop("selectedIndex", 0);

  $("#tam").prop("disabled", true);
  $("#tam").prop("selectedIndex", 0);
  $("#variable").text('WindSpeed')
  $('#Hc_p').text('ความเร็วลม')
  rmLyr()
  // let d = await response;
  // $("#datetime").text(`วันที่ ${resp[0].date_} เวลา ${resp[0].time_} น.`)
  axios.post(url + '/eec-api/get-weather-3hr-bytam', { col: "pro", val: "eec" }).then(r => {
    let datArr = [];
    let d = r.data.data
    let prov = $("#pro").val();
    let d_filter = d.filter(e => e.prov_code == prov);
    if (prov !== "eec") {
      d_filter.map(i => {
        // console.log(i);
        datArr.push({
          "category": i.sta_th,
          "value": Number(i.windspeed)
        })
      })
      barChart(datArr, ' km/h', "ความเร็วลม");
      $("#unit").html('WindSpeed (km/h)');
    } else {
      d.map(i => {
        // console.log(i);
        datArr.push({
          "category": i.sta_th,
          "value": Number(i.windspeed)
        })
      })
      barChart(datArr, ' km/h', "ความเร็วลม");
      $("#unit").html('WindSpeed (km/h)');
    }
  })

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

  let label = categoryAxis.renderer.labels.template;
  label.truncate = true;
  label.maxWidth = 150;
  label.tooltipText = "{category}";

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

let showChart = async (e) => {
  // console.log(e);
  let res = await axios.post(url + '/eec-api/get-weather-hist', { sta_num: e.sta_num });

  let rainfall = [];
  let temperature = [];
  let windspeed = [];
  let rh = [];
  let msl_pressure = [];

  res.data.data.map(i => {
    $("#sta_name").text(`จ.${i.province}`)

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

  await chartTemplate(rainfall, "chart-rainfall");
  await chartTemplate(temperature, "chart-temperature");
  await chartTemplate(windspeed, "chart-windspeed");
  await chartTemplate(rh, "chart-rh");
  await chartTemplate(msl_pressure, "chart-pressure");
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

  // dateAxis.start = 0.59;
  dateAxis.keepSelection = true;
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
  chart.events.on('ready', () => {
    if (div == "chart-pressure") {
      $("#card_Ps").slideDown("slow");
      // $("#spin1").hide();
    }
  });
}

// init aqi
// showTemp();
// showRain()
showTable({ col: "pro", val: "eec" });
// showChart({ sta_num: "48478" })
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
      console.log(r.data.features);
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
let mkWrl
let loadWtrl = async () => {
  let iconblue = L.icon({
    iconUrl: './marker/gas-station.png',
    iconSize: [40, 45],
    iconAnchor: [12, 37],
    popupAnchor: [5, -30]
  });

  let sta = [
    {
      staname: "station_01",
      latlon: [12.8661616, 100.9989804]
    }, {
      staname: "station_02",
      latlon: [12.848099999999983, 100.95313000000002]
    }, {
      staname: "station_03",
      latlon: [12.846510200000028, 100.9376361]
    }, {
      staname: "station_04",
      latlon: [12.694406999999996, 101.44470699999997]
    }, {
      staname: "station_05",
      latlon: [12.703484000000008, 101.468717]
    }, {
      staname: "station_06",
      latlon: [12.70139960000001, 101.49543049999]
    }, {
      staname: "station_07",
      latlon: [12.985111299999994, 101.6776677]
    }, {
      staname: "station_08",
      latlon: [12.909515899999995, 101.71460159999998]
    }, {
      staname: "station_09",
      latlon: [12.836749900000017, 101.73254899999998]
    }]
  mkWrl = L.layerGroup()
  sta.map(async (i) => {
    let resSt01 = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrl-api-get2.php', { station: i.staname, limit: 1 });
    resSt01.then(r => {
      let d = r.data.data[0];
      let marker = L.marker(i.latlon, {
        icon: iconblue,
        name: 'lyr',
        // data: dat
      });
      // marker.addTo(map)
      marker.bindPopup(`<div style="font-family:'Kanit'"> 
                      ชื่อสถานี : ${i.staname} <br>
                      ระดับน้ำ : ${Number(d.deep).toFixed(1)} mm.<br>
                      ความชื้นสัมพัทธ์ : ${Number(d.humidity).toFixed(1)} %.<br>
                      อุณหภูมิ : ${Number(d.temperature).toFixed(1)} องศาเซลเซียส<br>
                      ดูกราฟ <span style="font-size: 20px; color:#006fa2; cursor: pointer;" onclick="wtrlModal('${i.staname}')"><i class="bi bi-file-earmark-bar-graph"></i></span>
                      </div>`
      )
      mkWrl.addLayer(marker);
    })
  })
  lyrControl.addOverlay(mkWrl, "จุดตรวจวัดระดับน้ำผิวดิน")
}
loadWtrl()

let wtrlModal = (stname) => {
  // console.log(stname);
  let arrDept = [];
  let arrTemp = [];
  let arrHumi = [];
  axios.post("https://eec-onep.soc.cmu.ac.th/api/wtrl-api-get-by-day.php", { stname }).then(r => {
    // console.log(r);
    r.data.data.map(i => {
      arrDept.push({
        "date": i.dt,
        "value": Math.round(i.dept)
      });
      arrTemp.push({
        "date": i.dt,
        "value": Math.round(i.temp)
      });
      arrHumi.push({
        "date": i.dt,
        "value": Math.round(i.humi)
      });
    })
  })

  setTimeout(() => {
    // console.log(arrDept, arrTemp, arrHumi);
    wtrlChart(arrDept, "depthChart", "ระดับน้ำ (cm.)");
    wtrlChart(arrTemp, "tempChart", "อุณหภูมิ (°C)");
    wtrlChart(arrHumi, "humiChart", "ความชื้น (%)");
  }, 500)


  $("#wtrlModal").modal("show");

}
let wtrlChart = (arrData, div, unit) => {
  am4core.useTheme(am4themes_animated);

  // Create chart instance
  var chart = am4core.create(div, am4charts.XYChart);

  // Add data
  chart.data = arrData;

  // Set input format for the dates
  // chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm:ss";
  chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

  // Create axes
  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.baseValue = 0;
  valueAxis.title.text = unit;

  // Create series
  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = "value";
  series.dataFields.dateX = "date";
  series.tooltipText = "{value}";
  // series.tensionX = 0.8;
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

  // var range = valueAxis.createSeriesRange(series);
  // range.value = index;
  // range.endValue = -1000;
  // range.contents.stroke = am4core.color("#ff0000");
  // range.contents.fill = range.contents.stroke;

  // Make bullets grow on hover
  var bullet = series.bullets.push(new am4charts.CircleBullet());
  bullet.circle.strokeWidth = 2;
  bullet.circle.radius = 4;
  bullet.circle.fill = am4core.color("#fff");

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

$('#paramiter').on('change', function () {
  var prov = $('#pro').val()
  if (prov !== 'eec') {
    getparameter(this.value)
  } else {
    $('#warningModal').modal('show')
  }
})

let datafor_chart
let getsta_2 = (data) => {
  datafor_chart = data
  $("#sta_name").hide();
  // $("#spin1").hide();
  $("#card_Ps").hide();
  $("#sta_name2").empty().append(`<option value="eec">ทุกสถานีตรวจวัด</option>`);
  data.map(i => {
    $("#sta_name2").append(`<option value="${i.sta_num}">${i.sta_th}</option>`)
  })
}

$("#card_Ps").hide();
$("#spin1").hide();
$('#sta_name2').on('change', function () {
  if (this.value == "eec") {
    $("#card_Ps").slideUp();
    $("#sta_name").hide();
  } else {
    $("#sta_name").show();
    // $("#card_Ps").slideDown()
    let a = datafor_chart.filter(e => e.sta_num == this.value)
    let data = a

    showChart({ sta_num: data[0].sta_num })
  }
})
let table2
let showTable2 = async () => {

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
  // console.log("ok")
  let x = await wtrlUrl;
  table2 = $('#tab2').DataTable({

    data: x.data.data,
    columns: [
      {
        data: null,
        render: function (data, type, row) {
          let dt = new Date(data.waterlevel_datetime);
          let day = dt.getDate();
          let mm = dt.getMonth();
          let year = dt.getFullYear();
          let a = `${day}/${mm}/${year}`
          return a
        }
      },
      { data: 'tele_station_name' },
      {
        data: null,
        render: function (data, type, row) {
          let a = data.tam_nam_t;
          let tam = a.split(".");
          // return data.tam_nam_t
          return tam[1]
        }
      },
      {
        data: null,
        render: function (data, type, row) {
          let a = data.amp_nam_t;
          let amp = a.split(".");
          // return data.amp_nam_t
          return amp[1]
        }
      },
      {
        data: null,
        render: function (data, type, row) {
          let a = data.prov_nam_t;
          let prov = a.split(".");
          // return data.prov_nam_t
          return prov[1]
        }
      },
      {
        data: null,
        render: function (data, type, row) {
          return Number(data.waterlevel_msl).toFixed(1)
        }
      },
    ],
    columnDefs: [
      { className: 'text-center', targets: [2, 3, 4, 5] },
    ],
    dom: 'Bfrtip',
    buttons: [
      'excel', 'print'
    ],
    searching: true,
    scrollX: true,
    select: true,
    pageLength: 8,
    responsive: {
      details: false
    }
  });
  table2.on('search.dt', async function () {
    let data = table2.rows({ search: 'applied' }).data();
    getsta_3(data)
  });
}
showTable2()

let getwtrlUrl = async (lyr, code) => {
  let x = await wtrlUrl;
  let datArr = [];

  let valdata = x.data.data;
  console.log(valdata)
  if (lyr == "prov") {
    let a = valdata.filter(e => e.prov_code == code)
    a.map(i => {
      datArr.push({
        "category": i.tele_station_name,
        "value": Number(i.waterlevel_msl).toFixed(1)
      })
    })
  } else if (lyr == "amp") {
    let a = valdata.filter(e => e.amp_code == code)
    a.map(i => {
      datArr.push({
        "category": i.tele_station_name,
        "value": Number(i.waterlevel_msl).toFixed(1)
      })
    })
  } else if (lyr == "tam") {
    let a = valdata.filter(e => e.tam_code == code)
    a.map(i => {
      datArr.push({
        "category": i.tele_station_name,
        "value": Number(i.waterlevel_msl).toFixed(1)
      })
    })
  }
  barChart(datArr, ' m', "ปริมาณน้ำท่า");
  $("#unit").html('ปริมาณน้ำท่า (เมตร)');
}
let dataTable2
let getsta_3 = (data) => {
  dataTable2 = data
  $('#cardWtrl').hide();
  $("#sta_name3").empty().append(`<option value="eec">ทุกสถานีตรวจวัด</option>`);
  data.map(i => {
    $("#sta_name3").append(`<option value="${i.tele_station_name}">${i.tele_station_name}</option>`)
  })
}

$('#cardWtrl').hide();
$('#sta_name3').on('change', async function () {
  if (this.value !== 'eec') {
    let res = await axios.post(url + '/eec-api/get-wtrl/timeline', { staname: this.value });
    let lo = dataTable2.filter(e => e.tele_station_name == this.value);
    let location = `${lo[0].tam_nam_t} ${lo[0].amp_nam_t} ${lo[0].prov_nam_t}`
    $("#locat_W").show();
    $("#locat_W").text(location);

    let datarr = [];
    res.data.data.map(i => {
      let time = i.waterlevel_datetime
      let date = time.split('T')
      let dtime = date[1].split('.');
      let datetime = `${date[0]} ${dtime[0]}`
      // console.log(datetime)
      datarr.push({
        "date": datetime,
        "value": Number(i.waterlevel_msl).toFixed(1)
      });
    })
    $('#cardWtrl').show();
    Wtrlchart(datarr, "chart-Wtrl", "ปริมาณน้ำท่า (m.)");
  } else {
    $("#locat_W").hide();
    $('#cardWtrl').hide();
  }
})

let Wtrlchart = function (data, div, title) {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  var chart = am4core.create(div, am4charts.XYChart);
  chart.paddingRight = 60;
  chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm:ss";

  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.baseInterval = {
    "timeUnit": "minute",
    "count": 1
  };

  dateAxis.dateFormats.setKey("dd MMMM yyyy");
  dateAxis.renderer.grid.template.location = 0;
  dateAxis.renderer.minGridDistance = 60;
  dateAxis.tooltipDateFormat = "yyyy-MM-dd HH:mm:ss";

  data.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  chart.data = data;
  // Create axes
  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.tooltip.disabled = true;
  valueAxis.title.text = title;


  // Create series
  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = "value";
  series.dataFields.dateX = "date";
  series.strokeWidth = 2;
  // series.tensionX = 0.8;
  series.stroke = am4core.color("#00BFFF");
  series.minBulletDistance = 10;
  series.tooltipText = "{valueY}";
  series.tooltip.pointerOrientation = "value";
  series.tooltip.background.cornerRadius = 20;
  series.tooltip.background.fillOpacity = 0.5;
  series.tooltip.background.strokeOpacity = 0;
  series.tooltip.label.minWidth = 40;
  series.tooltip.label.minHeight = 40;
  series.tooltip.label.textAlign = "middle";
  series.tooltip.label.textValign = "middle";
  // Make bullets grow on hover
  var bullet = series.bullets.push(new am4charts.CircleBullet());
  bullet.circle.strokeWidth = 2;
  bullet.circle.radius = 4;
  bullet.circle.fill = am4core.color("#fff");

  // var range = valueAxis.createSeriesRange(series);
  // range.value = 35;
  // range.endValue = 100;
  // range.contents.stroke = am4core.color("#ff0000");
  // range.contents.fill = range.contents.stroke;


  // chart.scrollbarY = new am4core.Scrollbar();
  // chart.scrollbarX = new am4core.Scrollbar();
  chart.scrollbarX = new am4charts.XYChartScrollbar();
  chart.scrollbarX.series.push(series);
  chart.scrollbarX.parent = chart.bottomAxesContainer;

  // Add cursor
  chart.cursor = new am4charts.XYCursor();
  chart.cursor.xAxis = dateAxis;
  chart.cursor.snapToSeries = series;

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
};