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

// if (eecauth !== "admin" && eecauth !== "office") {
//     location.href = "./../../form_register/login/index.html";
// }
// urid ? null : location.href = "./../../form_register/login/index.html";

// const url = "http://localhost:3000/"
const url = "https://eec-onep.online:3700";

let map = L.map('map', {
    center: [13.156242, 101.339052],
    zoom: 9,
    // layers: [CartoDB_Positron, marker]
})

var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    // maxZoom: 19
})

var ghyb = L.tileLayer("https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}", {
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
const LU61 = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__46_lu_eec_61",
    format: "image/png",
    transparent: true,
    // maxZoom: 10,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});


var baseMaps = {
    "Mapbox": CartoDB_Positron.addTo(map),
    "Google Hybrid": ghyb
}
const overlayMaps = {
    "ขอบเขตจังหวัด": pro.addTo(map),
    "ขอบเขตอำเภอ": amp,
    "ขอบเขตตำบล": tam,
    "การใช้ประโยชน์ที่ดิน ปีพ.ศ.2561": LU61,
};
const lyrControl = L.control.layers(baseMaps, overlayMaps, {
    collapsed: true
}).addTo(map);

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
        div.innerHTML += '<i style="background: #FD7231; border-radius: 50%; border-style: solid; border-width: 1.5px;"></i><span>บ่อสังเกตการณ์</span><br>';
        div.innerHTML += `<button class="btn btn-sm" onClick="Luop()" id="LUOP">
    <span class="kanit">การใช้ประโยชน์ที่ดิน ปีพ.ศ.2561</span><i class="fa fa-angle-double-down" aria-hidden="true"></i>
  </button>`
        div.innerHTML += `<div id='LU'></div>`
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

function Luop() {
    $('#LUOP').hide()
    $('#LU').html(`<button class="btn btn-sm" onClick="Luclose()" id="LUCLOSE">
    <span class="kanit">การใช้ประโยชน์ที่ดิน ปีพ.ศ.2561</span><i class="fa fa-angle-double-up" aria-hidden="true"></i></button><br>
    <i style="background: #ffedb1; border-radius: 1%;"></i><span>เกษตรกรรม</span><br>
    <i style="background: #2ea200; border-radius: 1%;"></i><span>ป่าไม้</span><br>
    <i style="background: #ff7f00; border-radius: 1%;"></i><span>พื้นที่เบ็ดเตล็ด</span><br>
    <i style="background: #ff5d6d; border-radius: 1%;"></i><span>พื้นที่เมือง</span><br>
    <i style="background: #0560c1; border-radius: 1%;"></i><span>แหล่งน้ำ</span><br></div>`)
}
function Luclose() {
    $('#LUOP').show()
    $('#LU').html('')
}

function onLocationFound(e) {
    var radius = e.accuracy;
    // L.marker(e.latlng).addTo(map)
    // // .bindPopup("You are within " + radius + " meters from this point").openPopup();
    // L.circle(e.latlng, radius).addTo(map);
    // console.log(e.latlng)
    nearData(e)
}

function onLocationError(e) {
    alert(e.message);
}
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
map.locate({ setView: true, maxZoom: 8 });

var lc = L.control.locate({
    position: 'topleft',
    strings: {
        title: ""
    },
    locateOptions: {
        enableHighAccuracy: true,
    }
})
lc.addTo(map);
lc.start();

$("#pro").on("change", function () {
    getPro(this.value)
    zoomExtent("pro", this.value);
    seclectdata("pro", this.value);
    if (this.value == 'eec') {
        $("#pro_tn").html($('#pro').children("option:selected").text())
    } else {
        $("#pro_tn").html('จังหวัด' + $('#pro').children("option:selected").text())
    }
    $("#amp_tn").html('')
    $("#tam_tn").html('')
});
$("#amp").on("change", function () {
    getAmp(this.value)
    zoomExtent("amp", this.value);
    seclectdata("amp", this.value);
    $("#amp_tn").html('อำเภอ' + $('#amp').children("option:selected").text())
});
$("#tam").on("change", function () {
    zoomExtent("tam", this.value);
    seclectdata("tam", this.value);
    $("#tam_tn").html('ตำบล' + $('#tam').children("option:selected").text())
});
// const url = "https://eec-onep.online:3700";
let zoomExtent = (lyr, code) => {
    axios.get(url + `/eec-api/get-extent/${lyr}/${code}`).then(r => {
        let geom = JSON.parse(r.data.data[0].geom)
        // console.log(geom);
        map.fitBounds([
            geom.coordinates[0][0],
            geom.coordinates[0][2],
        ]);
    })

    map.eachLayer(lyr => {
        if (lyr.options.name == 'bound') {
            map.removeLayer(lyr)
        }
    })

    axios.get(url + `/eec-api/get-bound-flip/${lyr}/${code}`).then(r => {
        let geom = JSON.parse(r.data.data[0].geom)
        var polygon = L.polygon(geom.coordinates, { color: "red", name: "bound", fillOpacity: 0.0 }).addTo(map);
        map.fitBounds(polygon.getBounds());
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

let rmLyr = () => {
    map.eachLayer(lyr => {
        if (lyr.options.name == 'marker') {
            map.removeLayer(lyr)
        }
    })
}


function zoomTo(elat, lng) {
    // console.log(elat, elng)
    map.setView(new L.LatLng(lat, lng), 12);
}

const icon = L.icon({
    iconUrl: 'https://www.flaticon.com/svg/static/icons/svg/1397/1397897.svg',
    iconSize: [30, 30],
    popupAnchor: [0, -7]
})

const geojsonMarkerOptions = {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
}

const api_1 = url + "/api/get-water-near/";
const api_2 = url + "/api/underWater/";
const api_3 = url + "/api/rankWater/";
const api_4 = url + "/form_gw/getintro";
let nearData = async (r) => {
    let location = {
        lat: r.latlng.lat,
        lng: r.latlng.lng
    }
    let res = await axios.get(api_1 + location.lat + '/' + location.lng)
    let sta_id = res.data.data[0].station_id
    let res2 = await axios.get(api_2 + sta_id)
    // console.log(res.data.data)
    $("#av-depth").text(res2.data.data[0].depth)
    $("#av-wl").text(res2.data.data[0].wl);
    $("#av-ec").text(res2.data.data[0].ec);
    $("#av-ph").text(res2.data.data[0].ph);
    $("#av-temp").text(res2.data.data[0].temp);
    $("#av-tds").text(res2.data.data[0].tds);
    $("#av-sal").text(res2.data.data[0].sal);

    var staname_t = 'sta_name'
    staname_t = res.data.data[0].station_name + "\nตำบล" + res.data.data[0].tambon + "\nอำเภอ" + res.data.data[0].amphoe + "\nจังหวัด" + res.data.data[0].province
    document.getElementById('sta_name').innerHTML = staname_t;
    document.getElementById('sta_th').innerHTML = res.data.data[0].station_name + "\nต." + res.data.data[0].tambon + "\nอ." + res.data.data[0].amphoe + "\nจ." + res.data.data[0].province;

    let Wl = [];
    let Ec = [];
    let Ph = [];
    let Temp = [];
    let Tds = [];
    let Sal = [];

    res2.data.data.map(i => {
        Wl.push({
            "date": i.wl_date,
            "value": Number(i.wl).toFixed(2)
        });

        Ec.push({
            "date": i.ec_date,
            "value": Number(i.ec).toFixed(2)
        });

        Ph.push({
            "date": i.ph_date,
            "value": Number(i.ph).toFixed(2)
        });

        Temp.push({
            "date": i.temp_date,
            "value": Number(i.temp).toFixed(2)
        });

        Tds.push({
            "date": i.tds_date,
            "value": Number(i.tds).toFixed(2)
        });

        Sal.push({
            "date": i.sal_date,
            "value": Number(i.sal).toFixed(2)
        });
    })
    // console.log(Ph)
    chartTemplate(Wl, "chart1");
    chartTemplate(Ec, "chart2");
    chartTemplate(Ph, "chart3");
    chartTemplate(Temp, "chart4");
    chartTemplate(Tds, "chart5");
    chartTemplate(Sal, "chart6");
}

let chartTemplate = (arrData, div) => {
    am4core.useTheme(am4themes_animated);
    am4core.options.suppressErrors = true;
    am4core.options.suppressWarnings = true;
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

    dateAxis.start = 0.59;
    dateAxis.keepSelection = true;
}
let parameter = 'wl'
// let getshow = async (r) => {
//     let st_all = barChartdat
//     let Pcode = $('#pro').val()
//     $("#years").hide();
//     if (r == "showDepth") {
//         parameter = 'depth';
//         if (Pcode !== 'eec') {
//             axios.get(api_3 + 'depth').then((r) => {
//                 let datArr = [];
//                 let selDat = r.data.data
//                 for (var i = 0; i < st_all.length; i++) {
//                     let a = selDat.filter(e => e.station_id == st_all[i].station_id)
//                     if (a.length == 1) {
//                         datArr.push({
//                             "station_name": a[0].station_name,
//                             "value": a[0].depth,
//                         })
//                     }
//                 }
//                 barChart(datArr, 'เมตร', "ความลึก (เมตร)");
//                 $("#unit").html('ระดับความลึก (เมตร)');
//             })
//         } else {
//             axios.get(api_3 + 'depth').then((r) => {
//                 let datArr = [];
//                 let selDat = r.data.data
//                 selDat.map(e => {
//                     datArr.push({
//                         "station_name": e.station_name,
//                         "value": e.depth,
//                     })
//                 })
//                 barChart(datArr, 'เมตร', "ความลึก (เมตร)");
//                 $("#unit").html('ระดับความลึก (เมตร)');
//             })
//         }

//     } else if (r == "showWl") {
//         parameter = 'wl';
//         if (Pcode !== 'eec') {
//             // console.log(st_all)
//             axios.get(api_3 + 'wl').then((r) => {
//                 let datArr = [];
//                 let selDat = r.data.data
//                 // console.log(selDat)
//                 for (var i = 0; i < st_all.length; i++) {
//                     let a = selDat.filter(e => e.station_id == st_all[i].station_id)
//                     if (a.length == 1) {
//                         datArr.push({
//                             "station_name": a[0].station_name,
//                             "value": a[0].wl,
//                             'staid': a[0].station_id,
//                         })
//                     }
//                 }
//                 // console.log(datArr)
//                 barChart(datArr, 'เมตร', "ระดับน้ำ (เมตร)");
//                 $("#unit").html('เมตร');
//             })
//         } else {
//             axios.get(api_3 + 'wl').then((r) => {
//                 let datArr = [];
//                 let selDat = r.data.data
//                 selDat.map(e => {
//                     datArr.push({
//                         "station_name": e.station_name,
//                         "value": e.wl,
//                     })
//                 })
//                 barChart(datArr, 'เมตร', "ระดับน้ำ (เมตร)");
//                 $("#unit").html('เมตร');
//             })
//         }

//     } else if (r == "showTemp") {
//         parameter = 'temp';
//         if (Pcode !== 'eec') {
//             axios.get(api_3 + 'temp').then((r) => {
//                 let datArr = [];
//                 let selDat = r.data.data
//                 for (var i = 0; i < st_all.length; i++) {
//                     let a = selDat.filter(e => e.station_id == st_all[i].station_id)
//                     if (a.length == 1) {
//                         datArr.push({
//                             "station_name": a[0].station_name,
//                             "value": a[0].temp,
//                         })
//                     }
//                 }
//                 barChart(datArr, '°C', "ค่าอุณหภูมิ (องศาเซลเซียส)");
//                 $("#unit").html('ค่าอุณหภูมิ (องศาเซลเซียส)');
//             })
//         } else {
//             axios.get(api_3 + 'temp').then((r) => {
//                 let datArr = [];
//                 let selDat = r.data.data
//                 selDat.map(e => {
//                     datArr.push({
//                         "station_name": e.station_name,
//                         "value": e.temp,
//                     })
//                 })
//                 barChart(datArr, '°C', "ค่าอุณหภูมิ (องศาเซลเซียส)");
//                 $("#unit").html('ค่าอุณหภูมิ (องศาเซลเซียส)');
//             })
//         }
//     } else if (r == "showTds") {
//         parameter = 'tds';
//         if (Pcode !== 'eec') {
//             axios.get(api_3 + 'tds').then((r) => {
//                 let datArr = [];
//                 let selDat = r.data.data
//                 for (var i = 0; i < st_all.length; i++) {
//                     let a = selDat.filter(e => e.station_id == st_all[i].station_id)
//                     if (a.length == 1) {
//                         datArr.push({
//                             "station_name": a[0].station_name,
//                             "value": a[0].tds,
//                         })
//                     }
//                 }
//                 barChart(datArr, 'mg/L', "ค่าความขุ่น (mg/L)");
//                 $("#unit").html('ค่าความขุ่น (mg/L)');
//             })
//         } else {
//             axios.get(api_3 + 'tds').then((r) => {
//                 let datArr = [];
//                 let selDat = r.data.data
//                 selDat.map(e => {
//                     datArr.push({
//                         "station_name": e.station_name,
//                         "value": e.tds,
//                     })
//                 })
//                 barChart(datArr, 'mg/L', "ค่าความขุ่น (mg/L)");
//                 $("#unit").html('ค่าความขุ่น (mg/L)');
//             })
//         }
//     } else if (r == "showSal") {
//         parameter = 'sal';
//         if (Pcode !== 'eec') {
//             axios.get(api_3 + 'Sal').then((r) => {
//                 let datArr = [];
//                 let selDat = r.data.data
//                 for (var i = 0; i < st_all.length; i++) {
//                     let a = selDat.filter(e => e.station_id == st_all[i].station_id)
//                     if (a.length == 1) {
//                         datArr.push({
//                             "station_name": a[0].station_name,
//                             "value": a[0].sal,
//                         })
//                     }
//                 }
//                 barChart(datArr, 'ppt', "ค่าความเค็ม (ppt)");
//                 $("#unit").html('ค่าความเค็ม (ppt)');
//             })
//         } else {
//             axios.get(api_3 + 'Sal').then((r) => {
//                 let datArr = [];
//                 let selDat = r.data.data
//                 selDat.map(e => {
//                     datArr.push({
//                         "station_name": e.station_name,
//                         "value": e.sal,
//                     })
//                 })
//                 barChart(datArr, 'ppt', "ค่าความเค็ม (ppt)");
//                 $("#unit").html('ค่าความเค็ม (ppt)');
//             })
//         }
//     }
// }
let showEc = async (r, year, data) => {
    $("#years").show();
    $("#type").val(r);
    let st_all = data;
    var Y = $("#year").val()
    parameter = 'ec';
    if (Y == year) {
        let r2 = await axios.get(url + "/form_gw/get/rank_ec/" + year).then(r => {
            var a = r.data.data
            var b = []
            for (var i = 0; i < st_all.length; i++) {
                let dat = a.filter(e => e.staid == st_all[i].staid)
                dat.map(i => {
                    b.push({
                        "station_name": i.staname,
                        "value": i.ec,
                    })
                })
            }
            barChart(b, 'µS/cm', `ค่าการนำไฟฟ้า ปี ${year}`);
            $("#unit").html(`ค่าการนำไฟฟ้า ปี ${year}`);
        })

    } else {
        let r2 = await axios.get(url + "/form_gw/get/rank_ec/2563").then(r => {
            var a = r.data.data
            var b = []
            for (var i = 0; i < st_all.length; i++) {
                let dat = a.filter(e => e.staid == st_all[i].staid)
                dat.map(i => {
                    b.push({
                        "station_name": i.staname,
                        "value": i.ec,
                    })
                })
            }
            barChart(b, 'µS/cm', `ค่าการนำไฟฟ้า ปี ${Y}`);
            $("#unit").html(`ค่าการนำไฟฟ้า ปี ${Y}`);
        })

    }
    // else {
    //     let r2 = await axios.get(url + "/form_gw/get/rank_ec/2563").then(r => {
    //         var a = r.data.data
    //         var b = []
    //         a.map(i => {
    //             b.push(
    //                 {
    //                     // "staid": i.staid,
    //                     "station_name": i.staname,
    //                     "value": i.ec
    //                 }
    //             )
    //         })
    //         b.sort(function (a, b) {
    //             if (a.ec < b.ec) {
    //                 return -1;
    //             } else if (a.ec > b.ec) {
    //                 return 1;
    //             } else {
    //                 return 0;
    //             }
    //         });
    //         b.reverse();
    //         // var btop_10 = b.slice(0, 10);
    //         barChart(b, 'µS/cm', `ค่าการนำไฟฟ้า ปี ${Y}`);
    //         $("#unit").html(`ค่าการนำไฟฟ้า ปี ${Y}`);
    //     })
    // }
}
let showPh = async (r, year, data) => {
    $("#years").show();
    $("#type").val(r);
    var Y = $("#year").val();
    let st_all = data;
    parameter = 'ph';
    if (Y == year) {
        let r2 = await axios.get(url + "/form_gw/get/rank_ph/" + year).then(r => {
            var a = r.data.data
            var b = []
            for (var i = 0; i < st_all.length; i++) {
                let dat = a.filter(e => e.staid == st_all[i].staid)
                dat.map(i => {
                    b.push({
                        "station_name": i.staname,
                        "value": i.ph,
                    })
                })
            }
            barChart(b, '', `ค่าความเป็นกรด-ด่าง ปี ${year}`);
            $("#unit").html(`ค่าความเป็นกรด-ด่าง ปี ${year}`);
        })

    } else {
        let r2 = await axios.get(url + "/form_gw/get/rank_ph/").then(r => {
            var a = r.data.data
            var b = []
            for (var i = 0; i < st_all.length; i++) {
                let dat = a.filter(e => e.staid == st_all[i].staid)
                dat.map(i => {
                    b.push({
                        "station_name": i.staname,
                        "value": i.ph,
                    })
                })
            }
            barChart(b, '', `ค่าความเป็นกรด-ด่าง ปี ${year}`);
            $("#unit").html(`ค่าความเป็นกรด-ด่าง ปี ${year}`);
        })
    }
}
let showDepth = (data) => {
    let st_all = data;
    parameter = 'depth';
    $("#years").hide();
    axios.get(api_3 + 'depth').then((r) => {
        let datArr = [];
        let selDat = r.data.data
        for (var i = 0; i < st_all.length; i++) {
            let a = selDat.filter(e => e.station_id == st_all[i].staid)
            if (a.length) {
                datArr.push({
                    "station_name": a[0].station_name,
                    "value": a[0].depth,
                })
            }
        }
        barChart(datArr, 'เมตร', "ความลึก (เมตร)");
        $("#unit").html('ระดับความลึก (เมตร)');
    })
}
let showWl = (data) => {
    let st_all = data;
    parameter = 'wl';
    $("#years").hide();
    axios.get(api_3 + 'wl').then((r) => {
        let datArr = [];
        let selDat = r.data.data
        for (var i = 0; i < st_all.length; i++) {
            let a = selDat.filter(e => e.station_id == st_all[i].staid)
            if (a.length) {
                datArr.push({
                    "station_name": a[0].station_name,
                    "value": a[0].wl,
                })
            }
        }
        barChart(datArr, 'เมตร', "ระดับน้ำ (เมตร)");
        $("#unit").html('เมตร');
    })
}
let showTemp = (data) => {
    let st_all = data;
    parameter = 'temp';
    $("#years").hide();
    axios.get(api_3 + 'temp').then((r) => {
        let datArr = [];
        let selDat = r.data.data
        for (var i = 0; i < st_all.length; i++) {
            let a = selDat.filter(e => e.station_id == st_all[i].staid)
            if (a.length) {
                datArr.push({
                    "station_name": a[0].station_name,
                    "value": a[0].temp,
                })
            }
        }
        barChart(datArr, '°C', "ค่าอุณหภูมิ (องศาเซลเซียส)");
        $("#unit").html('ค่าอุณหภูมิ (องศาเซลเซียส)');
    })
}
let showTds = (data) => {
    let st_all = data;
    parameter = 'tds';
    $("#years").hide();
    axios.get(api_3 + 'tds').then((r) => {
        let datArr = [];
        let selDat = r.data.data
        for (var i = 0; i < st_all.length; i++) {
            let a = selDat.filter(e => e.station_id == st_all[i].staid)
            if (a.length) {
                datArr.push({
                    "station_name": a[0].station_name,
                    "value": a[0].tds,
                })
            }
        }
        barChart(datArr, 'mg/L', "ค่าความขุ่น (mg/L)");
        $("#unit").html('ค่าความขุ่น (mg/L)');
    })
}
let showSal = (data) => {
    let st_all = data;
    parameter = 'sal';
    $("#years").hide();
    axios.get(api_3 + 'sal').then((r) => {
        let datArr = [];
        let selDat = r.data.data
        for (var i = 0; i < st_all.length; i++) {
            let a = selDat.filter(e => e.station_id == st_all[i].staid)
            if (a.length) {
                datArr.push({
                    "station_name": a[0].station_name,
                    "value": a[0].sal,
                })
            }
        }
        barChart(datArr, 'ppt', "ค่าความเค็ม (ppt)");
        $("#unit").html('ค่าความเค็ม (ppt)');
    })
}

let Tyear
$("#year").on("change", function () {
    Tyear = $("#year").val()
    var y = $("#year").val()
    var t = $("#type").val()
    if (t == "ph") {
        showPh(t, y, barChartdat)
    } else if (t == "ec") {
        showEc(t, y, barChartdat)
    }
})

let getparameter = (r) => {
    if (r == 'wl') {
        showWl(barChartdat)
    } else if (r == 'depth') {
        showDepth(barChartdat)
    } else if (r == 'temp') {
        showTemp(barChartdat)
    } else if (r == 'tds') {
        showTds(barChartdat)
    } else if (r == 'sal') {
        showSal(barChartdat)
    } else if (r == 'ec') {
        var y = $("#year").val()
        showEc(r, y, barChartdat)
    } else if (r == 'ph') {
        var y = $("#year").val()
        showPh(r, y, barChartdat)
    }
}

barChart = async (data, unit, title, header) => {
    am4core.useTheme(am4themes_animated);
    am4core.options.suppressErrors = true;
    am4core.options.suppressWarnings = true;

    var chart = am4core.create("chart", am4charts.XYChart);
    chart.numberFormatter.numberFormat = "#,###.#' " + unit + "'";
    chart.data = await data;

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "station_name";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    // categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;

    // categoryAxis.events.on("sizechanged", function (ev) {
    //     let axis = ev.target;
    //     var cellWidth = axis.pixelWidth / (axis.endIndex - axis.startIndex);
    //     if (cellWidth > axis.renderer.labels.template.maxWidth) {
    //         axis.renderer.labels.template.rotation = 270;
    //         axis.renderer.labels.template.horizontalCenter = "right";
    //         axis.renderer.labels.template.verticalCenter = "middle";
    //     }
    //     else {
    //         axis.renderer.labels.template.rotation = 270;
    //         axis.renderer.labels.template.horizontalCenter = "middle";
    //         axis.renderer.labels.template.verticalCenter = "top";
    //     }
    // });

    let label = categoryAxis.renderer.labels.template;
    label.truncate = true;
    label.maxWidth = 150;
    label.tooltipText = "{category}";

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = title;
    valueAxis.title.fontWeight = 800;

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "station_name";
    series.clustered = false;
    series.tooltipText = "{categoryX} : [bold]{valueY}[/]";

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;

    var title = chart.titles.create();
    title.text = header;
    title.fontSize = 25;
    title.marginBottom = 30;

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
}
let dataurl
$(document).ready(function getdata() {
    axios.get(api_4).then((r) => {
        var data = r.data.data
        Marker(data)
        Table()
    })
    dataurl = url + "/form_gw/getintro";
})

$(document).ready(function showWl_frist() {
    axios.get(api_3 + 'wl').then((r) => {
        let datArr = [];
        let selDat = r.data.data
        selDat.map(e => {
            datArr.push({
                "station_name": e.station_name,
                "value": e.wl,
            })
        })
        // console.log(datArr)
        barChart(datArr, 'เมตร', "ระดับน้ำ (เมตร)", "");
        $("#unit").html('ระดับน้ำ (เมตร)');
    })
})
let seclectdata = (type, code) => {
    if (type == "pro" && code !== "eec") {
        dataurl = url + '/form_gw/getintro/pro/' + code;
        // console.log(dataurl);
        table.ajax.url(dataurl).load();
    } else if (type == "pro" && code == 'eec') {
        dataurl = url + "/form_gw/getintro";
        // console.log(dataurl);
        table.ajax.url(dataurl).load();

    }
    else if (type == "amp") {
        dataurl = url + '/form_gw/getintro/amp/' + code
        // console.log(dataurl);
        table.ajax.url(dataurl).load();

    } else if (type == "tam") {
        dataurl = url + '/form_gw/getintro/tam/' + code
        // console.log(dataurl);
        table.ajax.url(dataurl).load();
    } else {
        dataurl = url + "/form_gw/getintro";
    }
}
let barChartdat
let getchat_by_table = (data) => {
    barChartdat = data
    $('#pro_tn').hide();
    $('#amp_tn').hide();
    $('#tam_tn').hide();
    // let st_all = data;
    let r = parameter;
    getparameter(r)
    // if (r == "depth") {
    //     axios.get(api_3 + 'depth').then((r) => {
    //         let datArr = [];
    //         let selDat = r.data.data
    //         for (var i = 0; i < st_all.length; i++) {
    //             let a = selDat.filter(e => e.station_id == st_all[i].staid)
    //             if (a.length == 1) {
    //                 datArr.push({
    //                     "station_name": a[0].station_name,
    //                     "value": a[0].depth,
    //                 })
    //             }
    //         }
    //         barChart(datArr, 'เมตร', "ความลึก (เมตร)");
    //         $("#unit").html('ระดับความลึก (เมตร)');
    //     })
    // } else if (r == "wl") {
    //     axios.get(api_3 + 'wl').then((r) => {
    //         let datArr = [];
    //         let selDat = r.data.data
    //         for (var i = 0; i < st_all.length; i++) {
    //             let a = selDat.filter(e => e.station_id == st_all[i].staid)
    //             if (a.length == 1) {
    //                 datArr.push({
    //                     "station_name": a[0].station_name,
    //                     "value": a[0].wl,
    //                     'staid': a[0].station_id,
    //                 })
    //             }
    //         }
    //         barChart(datArr, 'เมตร', "ระดับน้ำ (เมตร)");
    //         $("#unit").html('เมตร');
    //     })
    // } else if (r == "temp") {
    //     axios.get(api_3 + 'temp').then((r) => {
    //         let datArr = [];
    //         let selDat = r.data.data
    //         for (var i = 0; i < st_all.length; i++) {
    //             let a = selDat.filter(e => e.station_id == st_all[i].staid)
    //             if (a.length == 1) {
    //                 datArr.push({
    //                     "station_name": a[0].station_name,
    //                     "value": a[0].temp,
    //                 })
    //             }
    //         }
    //         barChart(datArr, '°C', "ค่าอุณหภูมิ (องศาเซลเซียส)");
    //         $("#unit").html('ค่าอุณหภูมิ (องศาเซลเซียส)');
    //     })
    // } else if (r == "tds") {
    //     axios.get(api_3 + 'tds').then((r) => {
    //         let datArr = [];
    //         let selDat = r.data.data
    //         for (var i = 0; i < st_all.length; i++) {
    //             let a = selDat.filter(e => e.station_id == st_all[i].staid)
    //             if (a.length == 1) {
    //                 datArr.push({
    //                     "station_name": a[0].station_name,
    //                     "value": a[0].tds,
    //                 })
    //             }
    //         }
    //         barChart(datArr, 'mg/L', "ค่าความขุ่น (mg/L)");
    //         $("#unit").html('ค่าความขุ่น (mg/L)');
    //     })

    // } else if (r == "sal") {
    //     axios.get(api_3 + 'Sal').then((r) => {
    //         let datArr = [];
    //         let selDat = r.data.data
    //         for (var i = 0; i < st_all.length; i++) {
    //             let a = selDat.filter(e => e.station_id == st_all[i].staid)
    //             if (a.length == 1) {
    //                 datArr.push({
    //                     "station_name": a[0].station_name,
    //                     "value": a[0].sal,
    //                 })
    //             }
    //         }
    //         barChart(datArr, 'ppt', "ค่าความเค็ม (ppt)");
    //         $("#unit").html('ค่าความเค็ม (ppt)');
    //     })
    // } else if (r == 'ec') {
    //     let year = Tyear
    //     $("#years").show();
    //     axios.get(url + "/form_gw/get/rank_ec/" + year).then(r => {
    //         var a = r.data.data
    //         var b = []
    //         for (var i = 0; i < st_all.length; i++) {
    //             let dat = a.filter(e => e.staid == st_all[i].staid)
    //             dat.map(i => {
    //                 b.push({
    //                     "station_name": i.staname,
    //                     "value": i.ec,
    //                 })
    //             })
    //         }
    //         barChart(b, '', `ค่าความเป็นกรด-ด่าง ปี ${year}`);
    //         $("#unit").html(`ค่าความเป็นกรด-ด่าง ปี ${year}`);
    //     })

    // } else if (r == 'ph') {
    //     let year = Tyear
    //     $("#years").show();
    //     axios.get(url + "/form_gw/get/rank_ph/" + year).then(r => {
    //         var a = r.data.data
    //         var b = []
    //         for (var i = 0; i < st_all.length; i++) {
    //             let dat = a.filter(e => e.staid == st_all[i].staid)
    //             dat.map(i => {
    //                 b.push({
    //                     "station_name": i.staname,
    //                     "value": i.ph,
    //                 })
    //             })
    //         }
    //         barChart(b, '', `ค่าความเป็นกรด-ด่าง ปี ${year}`);
    //         $("#unit").html(`ค่าความเป็นกรด-ด่าง ปี ${year}`);
    //     })
    // }
}
function Marker(data) {
    var markers = L.markerClusterGroup();
    for (let i = 0; i < data.length; i++) {
        if (data[i].lat !== null && data[i].lng !== null) {
            var marker = L.circleMarker([data[i].lat, data[i].lng]
                , {
                    radius: 8,
                    fillColor: "#ff7800",
                    color: "#000",
                    weight: 1,
                    opacity: 0.5,
                    fillOpacity: 0.8,
                    data: data
                }
                , {
                    statname: data[i].staname
                })
            // marker.addTo(map);
            marker.bindPopup(`<h6><b>รหัสบ่อ :</b> ${data[i].staid}</h6><h6><b>บ่อสังเกตการณ์ :</b> ${data[i].staname} </h6><h6><b>ที่ตั้ง :</b> ต.${data[i].tambon} อ.${data[i].amphoe} จ.${data[i].prov}</h6>`).openPopup();
            // 
            markers.addLayer(marker);
            marker.on("click", g => {
                let sta_id = data[i].staid
                axios.get('https://eec-onep.online:3700/api/underWater/' + sta_id).then((r) => {
                    let res = r.data.data[0]
                    // console.log(res)
                    $("#av-depth").text(r.data.data[0].depth)
                    $("#av-wl").text(r.data.data[0].wl);
                    $("#av-ec").text(r.data.data[0].ec);
                    $("#av-ph").text(r.data.data[0].ph);
                    $("#av-temp").text(r.data.data[0].temp);
                    $("#av-tds").text(r.data.data[0].tds);
                    $("#av-sal").text(r.data.data[0].sal);

                    let Wl = [{
                        "date": r.data.data[0].wl_date,
                        "value": r.data.data[0].wl
                    }];
                    let Ec = [{
                        "date": r.data.data[0].ec_date,
                        "value": r.data.data[0].ec
                    }];
                    let Ph = [{
                        "date": r.data.data[0].ph_date,
                        "value": r.data.data[0].ph
                    }];
                    let Temp = [{
                        "date": r.data.data[0].temp_date,
                        "value": r.data.data[0].temp
                    }];
                    let Tds = [{
                        "date": r.data.data[0].tds_date,
                        "value": r.data.data[0].tds
                    }];
                    let Sal = [{
                        "date": r.data.data[0].sal_date,
                        "value": r.data.data[0].sal
                    }];

                    chartTemplate(Wl, "chart1");
                    chartTemplate(Ec, "chart2");
                    chartTemplate(Ph, "chart3");
                    chartTemplate(Temp, "chart4");
                    chartTemplate(Tds, "chart5");
                    chartTemplate(Sal, "chart6");

                })
                var staname_t = 'sta_name'
                // console.log(data[i])
                staname_t = data[i].staname + "\nตำบล" + data[i].tambon + "\nอำเภอ" + data[i].amphoe + "\nจังหวัด" + data[i].prov
                document.getElementById('sta_name').innerHTML = staname_t;

                $("#timeline").hide()
                $("#realtime").show()
            })
        }
    }
    map.addLayer(markers);
    // var overlays = {
    //     "บ่อสังเกตการณ์": markers,
    // };
    lyrControl.addOverlay(markers, "บ่อสังเกตการณ์")
}
let table
function Table() {
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
    table = $('#tab').DataTable({
        language: {
            processing: true,
        },
        // data: data,
        ajax: {
            type: "get",
            url: dataurl,
            data: { userid: urid },
            dataSrc: 'data'
        },
        columns: [
            { data: '' },
            { data: 'staid' },
            { data: 'staname' },
            { data: 'tambon' },
            { data: 'amphoe' },
            { data: 'prov' },
        ],
        columnDefs: [
            { className: 'text-center', targets: [0, 1, 3, 4, 5] },
            {
                'targets': 0,
                'searchable': false,
                'orderable': false,
                'className': 'dt-body-center',
                'render': function (data, type, full, meta) {
                    return '<input type="radio" name="id[]" value="' + $('<div/>').text(data).html() + '">';
                }
            }
        ],
        // order: [[1, 'asc']],
        select: true,
        dom: 'Bfrtip',
        buttons: [
            'excel', 'print'
        ],
        pageLength: 8,
        responsive: {
            details: false
        },
        // 
    });
    table.on('search.dt', function () {
        let data = table.rows({ search: 'applied' }).data();
        getchat_by_table(data)
    });
    // $("#spin_table").hide()
    // $('#tab tbody').on('click', 'tr', function () {
    //     var data = table.row(this).data();
    //     console.log(data);
    //     L.popup({ offset: [0, -27] })
    //         .setLatLng([data.lat, data.lng])
    //         .setContent(`<h6><b>รหัสบ่อ :</b> ${data.staid} </h6><h6><b>บ่อสังเกตการณ์ :</b> ${data.staname} </h6>`)
    //         .openOn(map);
    //     map.panTo([data.lat, data.lng])
    //     $("#timeline").show()
    //     $("#realtime").hide()
    //     getData_Tab(data)
    // })
    $('#tab tbody').on('change', 'input[type="radio"]', function () {
        if (this.checked) {
            var data = table.row(this.closest('tr')).data()
            // console.log(data);
            L.popup({ offset: [0, -27] })
                .setLatLng([data.lat, data.lng])
                .setContent(`<h6><b>รหัสบ่อ :</b> ${data.staid} </h6><h6><b>บ่อสังเกตการณ์ :</b> ${data.staname} </h6>`)
                .openOn(map);
            map.panTo([data.lat, data.lng])
            $("#timeline").show()
            $("#realtime").hide()
            getData_Tab(data)
        }
    })
}
let getData_Tab = async (r) => {
    let sta_id = r.staid
    var sen = [];
    axios.get(api_2 + sta_id).then((r) => {
        var q = r.data.data
        q.map(e => {
            for (let i = 0; i < q.length; i++) {
                sen.push({
                    "senid": q[i].sensor_id,
                })
            }
        })
        // console.log(q)
    })
    var staname_t = 'sta_name'
    staname_t = r.staname + "\nตำบล" + r.tambon + "\nอำเภอ" + r.amphoe + "\nจังหวัด" + r.prov
    document.getElementById('sta_name2').innerHTML = staname_t;
    // console.log(sen)
    let res = await axios.get(url + "/form_gw/get-api").then((r) => {
        let res2 = r.data.data.filter(e => e.staid == sta_id)
        if (sen.length == 1) {
            //กลุ่ม 1 sensor1
            var datasen1_ph = [];
            var datasen1_ec = [];
            var datasen1_cal = [];
            var datasen1_magne = [];
            var datasen1_sodium = [];
            var datasen1_pota = [];
            var datasen1_fe = [];
            var datasen1_mnn = [];
            var datasen1_so4 = [];
            var datasen1_cl = [];
            var datasen1_fluor = [];
            var datasen1_no3 = [];
            var datasen1_ts = [];
            //กลุ่ม 2 sensor1
            var datasen1_cu = [];
            var datasen1_zn = [];
            var datasen1_ars = [];
            var datasen1_pb = [];
            var datasen1_cd = [];
            var datasen1_cm = [];
            var datasen1_hg = [];
            var datasen1_se = [];
            var datasen1_nc = [];
            var datasen1_sv = [];
            var datasen1_br = [];
            var datasen1_cn = [];

            let sen1 = res2.filter(e => e.senid == sen[0].senid)
            sen1.map(i => {
                //กลุ่ม 1 sensor1
                datasen1_ph.push({ "date": i.gwdate, "value": Number(i.ph) });
                datasen1_ec.push({ "date": i.gwdate, "value": Number(i.ec) });
                datasen1_cal.push({ "date": i.gwdate, "value": Number(i.cal) });
                datasen1_magne.push({ "date": i.gwdate, "value": Number(i.magne) });
                datasen1_sodium.push({ "date": i.gwdate, "value": Number(i.sodium) });
                datasen1_pota.push({ "date": i.gwdate, "value": Number(i.pota) });
                datasen1_fe.push({ "date": i.gwdate, "value": Number(i.fe) });
                datasen1_mnn.push({ "date": i.gwdate, "value": Number(i.mnn) });
                datasen1_so4.push({ "date": i.gwdate, "value": Number(i.so4) });
                datasen1_cl.push({ "date": i.gwdate, "value": Number(i.cl) });
                datasen1_fluor.push({ "date": i.gwdate, "value": Number(i.fluor) });
                datasen1_no3.push({ "date": i.gwdate, "value": Number(i.no3) });
                datasen1_ts.push({ "date": i.gwdate, "value": Number(i.ts) });
                //กลุ่ม2 sensor1
                datasen1_cu.push({ "date": i.gwdate, "value": Number(i.cu) });
                datasen1_zn.push({ "date": i.gwdate, "value": Number(i.zn) });
                datasen1_ars.push({ "date": i.gwdate, "value": Number(i.ars) });
                datasen1_pb.push({ "date": i.gwdate, "value": Number(i.pb) });
                datasen1_cd.push({ "date": i.gwdate, "value": Number(i.cd) });
                datasen1_cm.push({ "date": i.gwdate, "value": Number(i.cm) });
                datasen1_hg.push({ "date": i.gwdate, "value": Number(i.hg) });
                datasen1_se.push({ "date": i.gwdate, "value": Number(i.se) });
                datasen1_nc.push({ "date": i.gwdate, "value": Number(i.nc) });
                datasen1_sv.push({ "date": i.gwdate, "value": Number(i.sv) });
                datasen1_br.push({ "date": i.gwdate, "value": Number(i.br) });
                datasen1_cn.push({ "date": i.gwdate, "value": Number(i.cn) });
            })
            //กลุ่ม1
            showChart_1S(datasen1_ph, "chart7", "ph", "", 5, 9.2);
            showChart_1S(datasen1_ec, "chart8", "EC", "µs/cm", 9999, 9999);
            showChart_1S(datasen1_cal, "chart9", "Calcium", "mg/l", 9999, 9999);
            showChart_1S(datasen1_magne, "chart10", "Magnesium", "mg/l", 9999, 9999)
            showChart_1S(datasen1_sodium, "chart11", " Sodium", "mg/l", 9999, 9999)
            showChart_1S(datasen1_pota, "chart12", "Potassium", "mg/l", 9999, 9999)
            showChart_1S(datasen1_fe, "chart13", "Iron", "mg/l", 0.5, 1)
            showChart_1S(datasen1_mnn, "chart14", "Manganese", "mg/l", 0.5, 1)
            showChart_1S(datasen1_so4, "chart15", "Sulfate", "mg/l", 200, 250)
            showChart_1S(datasen1_cl, "chart16", "Chloride", "mg/l", 200, 600)
            showChart_1S(datasen1_fluor, "chart17", "Fluoride", "mg/l", 1, 1.5)
            showChart_1S(datasen1_no3, "chart18", "Nitrates", "mg/l", 5, 45)
            showChart_1S(datasen1_ts, "chart19", "Total Dissolved Solids", "mg/l", 750, 1500)
            // กลุ่ม 2
            showChart_1S(datasen1_cu, "chart21", "Dissolved Copper", "mg/l", 0.1, 1.5);
            showChart_1S(datasen1_zn, "chart22", "Dissolved Zinc", "mg/l", 1, 15);
            showChart_1S(datasen1_ars, "chart23", "Dissolved Arsenic", "mg/l", 1, 1);
            showChart_1S(datasen1_pb, "chart24", "Dissolved Lead", "mg/l", 0.01, 0.05);
            showChart_1S(datasen1_cd, "chart25", "Cadmium", "mg/l", 0.001, 0.05);
            showChart_1S(datasen1_cm, "chart26", "Chromium", "mg/l", 0.01, 0.05);
            showChart_1S(datasen1_hg, "chart27", "Dissolved Mercury", "µg/l", 0.001, 0.002);
            showChart_1S(datasen1_se, "chart28", "Dissolved Selenium", "mg/l", 0.001, 0.01);
            showChart_1S(datasen1_nc, "chart29", "Dissolved Nickel", "mg/l", 1, 1);
            showChart_1S(datasen1_sv, "chart30", "Dissolved Silver", "mg/l", 1, 1);
            showChart_1S(datasen1_br, "chart31", "Dissolved Barium", "mg/l", 1, 1);
            showChart_1S(datasen1_cn, "chart32", "Dissolved Cyanide", "mg/l", 0.001, 0.005);

        }
        else if (sen.length > 1) {
            let sen1 = res2.filter(e => e.senid == sen[0].senid)
            let sen2 = res2.filter(e => e.senid == sen[1].senid)
            //กลุ่ม 1 sensor1
            var datasen1_ph = [];
            var datasen1_ec = [];
            var datasen1_cal = [];
            var datasen1_magne = [];
            var datasen1_sodium = [];
            var datasen1_pota = [];
            var datasen1_fe = [];
            var datasen1_mnn = [];
            var datasen1_so4 = [];
            var datasen1_cl = [];
            var datasen1_fluor = [];
            var datasen1_no3 = [];
            var datasen1_ts = [];
            //กลุ่ม 1 sensor2
            var datasen2_ph = [];
            var datasen2_ec = [];
            var datasen2_cal = [];
            var datasen2_magne = [];
            var datasen2_sodium = [];
            var datasen2_pota = [];
            var datasen2_fe = [];
            var datasen2_mnn = [];
            var datasen2_so4 = [];
            var datasen2_cl = [];
            var datasen2_fluor = [];
            var datasen2_no3 = [];
            var datasen2_ts = [];

            //กลุ่ม 2 sensor1
            var datasen1_cu = [];
            var datasen1_zn = [];
            var datasen1_ars = [];
            var datasen1_pb = [];
            var datasen1_cd = [];
            var datasen1_cm = [];
            var datasen1_hg = [];
            var datasen1_se = [];
            var datasen1_nc = [];
            var datasen1_sv = [];
            var datasen1_br = [];
            var datasen1_cn = [];
            //กลุ่ม 2 sensor2
            var datasen2_cu = [];
            var datasen2_zn = [];
            var datasen2_ars = [];
            var datasen2_pb = [];
            var datasen2_cd = [];
            var datasen2_cm = [];
            var datasen2_hg = [];
            var datasen2_se = [];
            var datasen2_nc = [];
            var datasen2_sv = [];
            var datasen2_br = [];
            var datasen2_cn = [];

            sen1.map(i => {
                //กลุ่ม 1
                datasen1_ph.push({ "date": i.gwdate, "value": Number(i.ph) });
                datasen1_ec.push({ "date": i.gwdate, "value": Number(i.ec) });
                datasen1_cal.push({ "date": i.gwdate, "value": Number(i.cal) });
                datasen1_magne.push({ "date": i.gwdate, "value": Number(i.magne) });
                datasen1_sodium.push({ "date": i.gwdate, "value": Number(i.sodium) });
                datasen1_pota.push({ "date": i.gwdate, "value": Number(i.pota) });
                datasen1_fe.push({ "date": i.gwdate, "value": Number(i.fe) });
                datasen1_mnn.push({ "date": i.gwdate, "value": Number(i.mnn) });
                datasen1_so4.push({ "date": i.gwdate, "value": Number(i.so4) });
                datasen1_cl.push({ "date": i.gwdate, "value": Number(i.cl) });
                datasen1_fluor.push({ "date": i.gwdate, "value": Number(i.fluor) });
                datasen1_no3.push({ "date": i.gwdate, "value": Number(i.no3) });
                datasen1_ts.push({ "date": i.gwdate, "value": Number(i.ts) });
                //กลุ่ม2 
                datasen1_cu.push({ "date": i.gwdate, "value": Number(i.cu) });
                datasen1_zn.push({ "date": i.gwdate, "value": Number(i.zn) });
                datasen1_ars.push({ "date": i.gwdate, "value": Number(i.ars) });
                datasen1_pb.push({ "date": i.gwdate, "value": Number(i.pb) });
                datasen1_cd.push({ "date": i.gwdate, "value": Number(i.cd) });
                datasen1_cm.push({ "date": i.gwdate, "value": Number(i.cm) });
                datasen1_hg.push({ "date": i.gwdate, "value": Number(i.hg) });
                datasen1_se.push({ "date": i.gwdate, "value": Number(i.se) });
                datasen1_nc.push({ "date": i.gwdate, "value": Number(i.nc) });
                datasen1_sv.push({ "date": i.gwdate, "value": Number(i.sv) });
                datasen1_br.push({ "date": i.gwdate, "value": Number(i.br) });
                datasen1_cn.push({ "date": i.gwdate, "value": Number(i.cn) });
            })
            sen2.map(i => {
                datasen2_ph.push({ "date": i.gwdate, "value": Number(i.ph) });
                datasen2_ec.push({ "date": i.gwdate, "value": Number(i.ec) });
                datasen2_cal.push({ "date": i.gwdate, "value": Number(i.cal) });
                datasen2_magne.push({ "date": i.gwdate, "value": Number(i.magne) });
                datasen2_sodium.push({ "date": i.gwdate, "value": Number(i.sodium) });
                datasen2_pota.push({ "date": i.gwdate, "value": Number(i.pota) });
                datasen2_fe.push({ "date": i.gwdate, "value": Number(i.fe) });
                datasen2_mnn.push({ "date": i.gwdate, "value": Number(i.mnn) });
                datasen2_so4.push({ "date": i.gwdate, "value": Number(i.so4) });
                datasen2_cl.push({ "date": i.gwdate, "value": Number(i.cl) });
                datasen2_fluor.push({ "date": i.gwdate, "value": Number(i.fluor) });
                datasen2_no3.push({ "date": i.gwdate, "value": Number(i.no3) });
                datasen2_ts.push({ "date": i.gwdate, "value": Number(i.ts) });
                //กลุ่ม2 
                datasen2_cu.push({ "date": i.gwdate, "value": Number(i.cu) });
                datasen2_zn.push({ "date": i.gwdate, "value": Number(i.zn) });
                datasen2_ars.push({ "date": i.gwdate, "value": Number(i.ars) });
                datasen2_pb.push({ "date": i.gwdate, "value": Number(i.pb) });
                datasen2_cd.push({ "date": i.gwdate, "value": Number(i.cd) });
                datasen2_cm.push({ "date": i.gwdate, "value": Number(i.cm) });
                datasen2_hg.push({ "date": i.gwdate, "value": Number(i.hg) });
                datasen2_se.push({ "date": i.gwdate, "value": Number(i.se) });
                datasen2_nc.push({ "date": i.gwdate, "value": Number(i.nc) });
                datasen2_sv.push({ "date": i.gwdate, "value": Number(i.sv) });
                datasen2_br.push({ "date": i.gwdate, "value": Number(i.br) });
                datasen2_cn.push({ "date": i.gwdate, "value": Number(i.cn) });
            })
            //กลุ่ม1
            showChart_2S(datasen1_ph, datasen2_ph, "chart7", "ph", "", 5, 9.2);
            showChart_2S(datasen1_ec, datasen2_ec, "chart8", "EC", "µs/cm", 9999, 9999);
            showChart_2S(datasen1_cal, datasen2_cal, "chart9", "Calcium", "mg/l", 9999, 9999);
            showChart_2S(datasen1_magne, datasen2_magne, "chart10", "Magnesium", "mg/l", 9999, 9999)
            showChart_2S(datasen1_sodium, datasen2_sodium, "chart11", " Sodium", "mg/l", 9999, 9999)
            showChart_2S(datasen1_pota, datasen2_pota, "chart12", "Potassium", "mg/l", 9999, 9999)
            showChart_2S(datasen1_fe, datasen2_fe, "chart13", "Iron", "mg/l", 0.5, 1)
            showChart_2S(datasen1_mnn, datasen2_mnn, "chart14", "Manganese", "mg/l", 0.5, 1)
            showChart_2S(datasen1_so4, datasen2_so4, "chart15", "Sulfate", "mg/l", 200, 250)
            showChart_2S(datasen1_cl, datasen2_cl, "chart16", "Chloride", "mg/l", 200, 600)
            showChart_2S(datasen1_fluor, datasen2_fluor, "chart17", "Fluoride", "mg/l", 1, 1.5)
            showChart_2S(datasen1_no3, datasen2_no3, "chart18", "Nitrates", "mg/l", 5, 45)
            showChart_2S(datasen1_ts, datasen2_ts, "chart19", "Total Dissolved Solids", "mg/l", 750, 1500)
            // กลุ่ม 2
            showChart_2S(datasen1_cu, datasen2_cu, "chart21", "Dissolved Copper", "mg/l", 0.1, 1.5);
            showChart_2S(datasen1_zn, datasen2_zn, "chart22", "Dissolved Zinc", "mg/l", 1, 15);
            showChart_2S(datasen1_ars, datasen2_ars, "chart23", "Dissolved Arsenic", "mg/l", 1, 1);
            showChart_2S(datasen1_pb, datasen2_pb, "chart24", "Dissolved Lead", "mg/l", 0.01, 0.05);
            showChart_2S(datasen1_cd, datasen2_cd, "chart25", "Cadmium", "mg/l", 0.001, 0.05);
            showChart_2S(datasen1_cm, datasen2_cm, "chart26", "Chromium", "mg/l", 0.01, 0.05);
            showChart_2S(datasen1_hg, datasen2_hg, "chart27", "Dissolved Mercury", "µg/l", 0.001, 0.002);
            showChart_2S(datasen1_se, datasen2_se, "chart28", "Dissolved Selenium", "mg/l", 0.001, 0.01);
            showChart_2S(datasen1_nc, datasen2_nc, "chart29", "Dissolved Nickel", "mg/l", 1, 1);
            showChart_2S(datasen1_sv, datasen2_sv, "chart30", "Dissolved Silver", "mg/l", 1, 1);
            showChart_2S(datasen1_br, datasen2_br, "chart31", "Dissolved Barium", "mg/l", 1, 1);
            showChart_2S(datasen1_cn, datasen2_cn, "chart32", "Dissolved Cyanide", "mg/l", 0.001, 0.005);
        }
    })
    // console.log(sta_id)
}

let showChart_1S = (arrData, div, title, unit, standard, standMax) => {
    am4core.useTheme(am4themes_animated);
    am4core.options.animationsEnabled = false;
    am4core.options.suppressErrors = true;
    am4core.options.suppressWarnings = true;

    // am4core.options.queue = false;
    // am4core.options.deferredDelay = 0;

    var chart = am4core.create(div, am4charts.XYChart);
    chart.numberFormatter.numberFormat = "#,###.#' " + unit + "'";

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.dateFormats.setKey("day", "dd MMMM yyyy");
    dateAxis.renderer.minGridDistance = 50;
    dateAxis.renderer.grid.template.location = 0.5;
    dateAxis.startLocation = 0.5;
    dateAxis.endLocation = 0.5;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = title;
    // Create series
    function createSeries(field, name, data, color) {
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.dateX = "date";
        series.name = name;
        // series.tooltipText = "[b]{valueY}[/]";
        series.strokeWidth = 2;
        series.data = data;
        // series.tooltip.getFillFromObject = false;
        // series.tooltip.background.fill = am4core.color(color);
        series.stroke = am4core.color(color);

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.stroke = am4core.color("#fff");
        bullet.circle.strokeWidth = 2;
        bullet.adapter.add("fill", function (fill, target) {
            if (target.dataItem.valueY > standMax) {
                return am4core.color("#FF0000");
            } else if (target.dataItem.valueY >= standard) {
                return am4core.color("#ffd500");
            } else if (target.dataItem.valueY < standard) {
                return am4core.color(color);
            } return fill;
        })

        var bullet2 = series.bullets.push(new am4charts.Bullet());
        bullet2.tooltipText = "[b]{valueY}[/]";
        bullet2.adapter.add("fill", function (fill, target) {
            if (target.dataItem.valueY > standMax) {
                return am4core.color("#FF0000");
            } else if (target.dataItem.valueY >= standard) {
                return am4core.color("#ffd500");
            } else if (target.dataItem.valueY < standard) {
                return am4core.color(color);
            } return fill;
        })

        var range = valueAxis.createSeriesRange(series);
        range.value = 9999;
        range.endValue = standMax;
        range.contents.stroke = am4core.color("#FF0000");
        // range.contents.fill = range.contents.stroke;

        var range1 = valueAxis.createSeriesRange(series);
        range1.value = standMax;
        range1.endValue = standard;
        range1.contents.stroke = am4core.color("#ffd500");
        // range1.contents.fill = range1.contents.stroke;

        // Create a horizontal scrollbar with previe and place it underneath the date axis
        // chart.scrollbarX = new am4core.Scrollbar();
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series);
        chart.scrollbarX.parent = chart.bottomAxesContainer;
        chart.scrollbarX.toBack();
        // chart.scrollbarX.startGrip.disabled = false;
        // chart.scrollbarX.endGrip.disabled = false;


        return series;
    }
    createSeries("value", "Sensor 1", arrData, "#67b7dc"
        // { "date": "2021-01-01", "value": 0 },
        // { "date": arrData.date, "value": arrData.value, },

    );
    chart.legend = new am4charts.Legend();
    chart.legend.useDefaultMarker = true;
    var marker = chart.legend.markers.template.children.getIndex(0);
    marker.cornerRadius(12, 12, 12, 12);
    marker.strokeWidth = 2;
    marker.strokeOpacity = 1;
    marker.stroke = am4core.color("#ccc");

    chart.cursor = new am4charts.XYCursor();
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.align = "left";
    chart.exporting.menu.verticalAlign = "top";
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

    // chart.scrollbarY = new am4core.Scrollbar();
    // chart.scrollbarY.parent = chart.leftAxesContainer;
    // chart.scrollbarY.toBack();

    // dateAxis.start = 0.79;
    dateAxis.keepSelection = true;
    chart.animationEnabled = false;

    var refreshAmcharts = function (title, arrDataS1) {
        $('.amchartContainer').empty();
        AmCharts.makeChart(title, arrDataS1);
    }

}
let showChart_2S = (arrDataS1, arrDataS2, div, title, unit, standard, standMax) => {
    am4core.useTheme(am4themes_animated);
    am4core.options.suppressErrors = true;
    am4core.options.suppressWarnings = true;

    var chart = am4core.create(div, am4charts.XYChart);
    chart.numberFormatter.numberFormat = "#.####' " + unit + "'";

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.dateFormats.setKey("day", "dd MMMM yyyy");
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 60;


    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = title;
    // Create series
    function createSeries(field, name, data, color) {
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.dateX = "date";
        series.name = name;
        // series.tooltipText = "[b]{valueY}[/]";
        series.strokeWidth = 2;
        series.data = data;
        // series.tooltip.getFillFromObject = false;
        // series.tooltip.background.fill = am4core.color(color);
        series.stroke = am4core.color(color);

        var range = valueAxis.createSeriesRange(series);
        range.value = 9999;
        range.endValue = standMax;
        range.contents.stroke = am4core.color("#FF0000");
        // range.contents.fill = range.contents.stroke;

        var range1 = valueAxis.createSeriesRange(series);
        range1.value = standMax;
        range1.endValue = standard;
        range1.contents.stroke = am4core.color("#ffd500");
        // range1.contents.fill = range.contents.stroke;

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.stroke = am4core.color("#fff");
        bullet.circle.strokeWidth = 2;
        bullet.adapter.add("fill", function (fill, target) {
            if (target.dataItem.valueY > standMax) {
                return am4core.color("#FF0000");
            } else if (target.dataItem.valueY >= standard) {
                return am4core.color("#ffd500");
            } else if (target.dataItem.valueY < standard) {
                return am4core.color(color);
            } return fill;
        })

        var bullet2 = series.bullets.push(new am4charts.Bullet());
        bullet2.tooltipText = "[b]{valueY}[/]";
        bullet2.adapter.add("fill", function (fill, target) {
            if (target.dataItem.valueY > standMax) {
                return am4core.color("#FF0000");
            } else if (target.dataItem.valueY >= standard) {
                return am4core.color("#ffd500");
            } else if (target.dataItem.valueY < standard) {
                return am4core.color(color);
            } return fill;
        })

        // Create a horizontal scrollbar with previe and place it underneath the date axis
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series);
        chart.scrollbarX.parent = chart.bottomAxesContainer;
        chart.scrollbarX.toBack();

        return series;
    }
    createSeries("value", "Sensor 1", arrDataS1, "#67d4dc"
        // { "date": "2021-01-01", "value": 0 },
        // { "date": arrData.date, "value": arrData.value, },
    );
    createSeries("value", "Sensor 2", arrDataS2, "#808bd5"
        // { "date": a.sensor_data.sensors[1].wl_date, "value": a.sensor_data.sensors[1].wl }
    );
    chart.legend = new am4charts.Legend();
    chart.legend.useDefaultMarker = true;
    var marker = chart.legend.markers.template.children.getIndex(0);
    marker.cornerRadius(12, 12, 12, 12);
    marker.strokeWidth = 2;
    marker.strokeOpacity = 1;
    marker.stroke = am4core.color("#ccc");

    chart.cursor = new am4charts.XYCursor();
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.align = "left";
    chart.exporting.menu.verticalAlign = "top";
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

    // chart.scrollbarY = new am4core.Scrollbar();
    // chart.scrollbarY.parent = chart.leftAxesContainer;
    // chart.scrollbarY.toBack();

    // // Create a horizontal scrollbar with previe and place it underneath the date axis
    // chart.scrollbarX = new am4core.Scrollbar();
    // chart.scrollbarX = new am4charts.XYChartScrollbar();
    // chart.scrollbarX.series.push(series);
    // chart.scrollbarX.parent = chart.bottomAxesContainer;

    // dateAxis.start = 0.79;
    dateAxis.keepSelection = true;
}
let showChart_3S = (arrDataS1, arrDataS2, arrDataS3, div, title, unit) => {

    am4core.useTheme(am4themes_animated);
    var chart = am4core.create(div, am4charts.XYChart);
    chart.numberFormatter.numberFormat = "#.#' " + unit + "'";

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 30;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = title;
    // Create series
    function createSeries(field, name, data) {
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.dateX = "date";
        series.name = name;
        // series.tooltipText = "[b]{valueY}[/]";
        series.strokeWidth = 2;
        series.data = data;

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.stroke = am4core.color("#fff");
        bullet.circle.strokeWidth = 2;
        bullet.adapter.add("fill", function (fill, target) {
            if (target.dataItem.valueY > standMax) {
                return am4core.color("#FF0000");
            } else if (target.dataItem.valueY <= standard) {
                return am4core.color("#5bc0de");
            } else if (target.dataItem.valueY >= standard <= standMax) {
                return am4core.color("#ffd500");
            } else { return fill; }
        })

        var bullet2 = series.bullets.push(new am4charts.Bullet());
        bullet2.tooltipText = "[b]{valueY}[/]";
        bullet2.adapter.add("fill", function (fill, target) {
            if (target.dataItem.valueY > standMax) {
                return am4core.color("#FF0000");
            } else if (target.dataItem.valueY <= standard) {
                return am4core.color("#5bc0de");
            } else if (target.dataItem.valueY >= standard <= standMax) {
                return am4core.color("#ffd500");
            } else { return fill; }
        })
        // Create a horizontal scrollbar with previe and place it underneath the date axis
        chart.scrollbarX = new am4core.Scrollbar();
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series);
        chart.scrollbarX.parent = chart.bottomAxesContainer;

        return series;
    }
    createSeries("value", "Sensor 1", arrDataS1
        // { "date": "2021-01-01", "value": 0 },
        // { "date": arrData.date, "value": arrData.value, },

    );
    createSeries("value", "Sensor 2", arrDataS2
        //     { "date": a.sensor_data.sensors[1].wl_date, "value": a.sensor_data.sensors[1].wl }

    );
    createSeries("value", "Sensor 2", arrDataS3
        //     { "date": a.sensor_data.sensors[1].wl_date, "value": a.sensor_data.sensors[1].wl }

    );
    chart.legend = new am4charts.Legend();
    chart.cursor = new am4charts.XYCursor();
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.align = "left";
    chart.exporting.menu.verticalAlign = "top";
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

    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.parent = chart.leftAxesContainer;
    chart.scrollbarY.toBack();

    // // Create a horizontal scrollbar with previe and place it underneath the date axis
    // chart.scrollbarX = new am4core.Scrollbar();
    // chart.scrollbarX = new am4charts.XYChartScrollbar();
    // chart.scrollbarX.series.push(series);
    // chart.scrollbarX.parent = chart.bottomAxesContainer;

    // dateAxis.start = 0.79;
    dateAxis.keepSelection = true;
}
function GetValue() {
    var province = $('#filter_province').val()
    var amphoe = $('#filter_amphoe').val()
    var tambon = $('#filter_tambon').val()
    $('#tab').dataTable().fnClearTable();
    map.eachLayer(function (layer) {
        if (!!layer.toGeoJSON) {
            map.removeLayer(layer);
        }
    })
    var baseControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
    map.removeControl(lyrControl);
    baseControl.addTo(map);

    if (province && amphoe && tambon) {
        let res3 = axios.get(api_2).then((r) => {
            var set_province = r.data.data.filter(q => q.province === province)
            var set_amphoe = set_province.filter(q => q.amphoe == amphoe)
            var set_tambon = set_amphoe.filter(q => q.tambon == tambon)
            var a = [];
            set_tambon.map(e => {
                a.push({
                    "station_id": e.station_id,
                    "station_name": e.station_name,
                    "tambon": e.tambon,
                    "amphoe": e.amphoe,
                    "province": e.province,
                    "lat": e.y,
                    "lng": e.x
                })
            })
            $('#tab').dataTable().fnAddData(a);
            createMarker(a)
        });
    } else if (province && amphoe) {
        let res2 = axios.get(api_2).then((r) => {
            var set_province = r.data.data.filter(q => q.province === province)
            var set_amphoe = set_province.filter(q => q.amphoe == amphoe)
            var a = [];
            set_amphoe.map(e => {
                a.push({
                    "station_id": e.station_id,
                    "station_name": e.station_name,
                    "tambon": e.tambon,
                    "amphoe": e.amphoe,
                    "province": e.province,
                    "lat": e.y,
                    "lng": e.x
                })
            })
            $('#tab').dataTable().fnAddData(a);
            createMarker(a)
        });
    } else if (province) {
        let res1 = axios.get(api_2).then((r) => {
            var set_province = r.data.data.filter(q => q.province === province)
            var a = [];
            set_province.map(e => {
                a.push({
                    "station_id": e.station_id,
                    "station_name": e.station_name,
                    "tambon": e.tambon,
                    "amphoe": e.amphoe,
                    "province": e.province,
                    "lat": e.y,
                    "lng": e.x
                })
            })
            $('#tab').dataTable().fnAddData(a);
            createMarker(a)
        });
    }
}
$('#filter_province').on('click', function GetSelect_amphoe() {
    var e = document.getElementById("filter_province");
    var result = e.options[e.selectedIndex].value;
    axios.get(api_2).then((r) => {
        var selDat = r.data.data.filter(q => q.province === result)
        var selectInput = [];
        for (let i = 0; i < selDat.length; i++) {
            var selectVal = selDat[i].amphoe;
            var get = "onclick='GetSelect_tambon()'"
            selectInput = '<option value=' + selectVal + '\n' + get + '>' + selectVal + '</option>';
            $('#filter_amphoe').append(selectInput);
            // console.log(selectVal)
        }
    })
})

$('#filter_amphoe').on('click', function GetSelect_tambon() {
    var e = document.getElementById("filter_amphoe");
    var result = e.options[e.selectedIndex].value;
    let res2 = axios.get(api_2).then((r) => {
        var selDat = r.data.data.filter(q => q.amphoe === result)
        var selectInput = [];
        for (let i = 0; i < selDat.length; i += 1) {
            var selectVal = selDat[i].tambon;
            selectInput = '<option value=' + selectVal + '>' + selectVal + '</option>';
            $('#filter_tambon').append(selectInput);
        }
    })
})

function reset() {
    $('#filter_province').val("")

    $('#filter_amphoe').find('option').not('[value=999]').not(':first').remove()
        ;
    $('#filter_tambon').find('option').not('[value=999]').not(':first').remove()

    $('#tab').dataTable().fnClearTable();
    let tab_all = axios.get(api_2).then((r) => {
        var data_tab = r.data.data.filter(e => e.province === "ชลบุรี" || e.province == "ระยอง" || e.province == "ฉะเชิงเทรา")
        var a = [];
        data_tab.map(e => {
            a.push({
                "station_id": e.station_id,
                "station_name": e.station_name,
                "tambon": e.tambon,
                "amphoe": e.amphoe,
                "province": e.province,
                "lat": e.y,
                "lng": e.x
            })
        })
        $('#tab').dataTable().fnAddData(a);
    });

}
