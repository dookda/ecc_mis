let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
$("#usrname").text(urname);
urid ? null : location.href = "./../../form_register/login/index.html";

if (eecauth !== "admin" && eecauth !== "office") {
    location.href = "./../../form_register/login/index.html";
}
var L53 = 'https://engrids.soc.cmu.ac.th/geoserver/eec/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=eec%3Aa__53_9w_reser63_3p&maxFeatures=50&outputFormat=application%2Fjson'
var L58 = 'https://engrids.soc.cmu.ac.th/geoserver/eec/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=eec%3Aa__58_water_mnre&maxFeatures=50&outputFormat=application%2Fjson'
var L59 = 'https://engrids.soc.cmu.ac.th/geoserver/eec/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=eec%3Aa__59_water_onep&maxFeatures=50&outputFormat=application%2Fjson'
var L60 = 'https://engrids.soc.cmu.ac.th/geoserver/eec/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=eec%3Aa__60_water_stand_eec&maxFeatures=50&outputFormat=application%2Fjson'

$(document).ready(() => {
    loadTable({ type: "prov", dat: 'ทุกจังหวัด' })
    layermark(L53, 53)
    layermark(L58, 58)
    layermark(L59, 59)
    layermark(L60, 60)
    setall_dat()
})

const url = "https://engrids.soc.cmu.ac.th/api";

let latlng = {
    lat: 13.305567,
    lng: 101.383101
};

let map = L.map('map', {
    center: latlng,
    zoom: 8
});

var mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1
});

const ghyb = L.tileLayer('https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

const tam = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
    layers: "eec:a__03_tambon_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 18,
    // minZoom: 14,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const amp = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
    layers: "eec:a__02_amphoe_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 14,
    // minZoom: 10,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const pro = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
    layers: "eec:a__01_prov_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 10,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

// const watermnre = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
//     layers: 'eec:a__58_water_mnre',
//     name: "lyr",
//     format: 'image/png',
//     transparent: true,
// });
// const wateronep = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
//     layers: 'eec:a__59_water_onep',
//     name: "lyr",
//     format: 'image/png',
//     transparent: true,
// });
// const waterstandeec = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
//     layers: 'eec:a__60_water_stand_eec',
//     name: "lyr",
//     format: 'image/png',
//     transparent: true,
// });
let lyrs = L.featureGroup().addTo(map)



var baseMap = {
    "Mapbox": mapbox.addTo(map),
    "google Hybrid": ghyb
}

const overlayMap = {
    "ขอบเขตจังหวัด": pro.addTo(map),
    "ขอบเขตอำเภอ": amp,
    "ขอบเขตตำบล": tam,
    // "ตำแหน่งนำเข้าข้อมูล": mg,

    // "จุดเฝ้าระวังคุณภาพน้ำจากสสภ.13": watermnre.addTo(map),
    // "จุดเก็บน้ำเพื่อวิเคราะห์คุณภาพน้ำในโครงการฯ": wateronep.addTo(map),
    // "จุดวัดคุณภาพน้ำผิวดิน": waterstandeec.addTo(map),
}
const lyrControl = L.control.layers(baseMap, overlayMap, {
    collapsed: true
}).addTo(map);

var legend = L.control({ position: "bottomleft" });
function showLegend() {
    legend.onAdd = function (map) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += `<div class ="center"><button class="btn btn-sm" onClick="hideLegend()">
        <span class="kanit">ซ่อนสัญลักษณ์</span><i class="fa fa-angle-double-down" aria-hidden="true"></i>
      </button></div>`;
        div.innerHTML += '<i style="background: #FFFFFF; border-style: solid; border-width: 3px;"></i><span>ขอบเขตจังหวัด</span><br>';
        div.innerHTML += '<i style="background: #FFFFFF; border-style: solid; border-width: 1.5px;"></i><span>ขอบเขตอำเภอ</span><br>';
        div.innerHTML += '<i style="background: #FFFFFF; border-style: dotted; border-width: 1.5px;"></i><span>ขอบเขตตำบล</span><br>';
        div.innerHTML += '<i style="background: #7acdf3; border-radius: 1%;"></i><span>อ่างเก็บน้ำ</span><br>';
        div.innerHTML += '<i style="background: #006898; border-radius: 50%;"></i><span>จุดวัดคุณภาพน้ำผิวดิน</span><br>';
        div.innerHTML += '<img src="./Marker/sta_qua.png" width="50px"><span>จุดวัดคุณภาพน้ำผิวดิน (API)</span><br>';
        div.innerHTML += '<i style="background: #01c8ff; border-radius: 50%;"></i><span>จุดเฝ้าระวังคุณภาพน้ำจากสสภ.13</span><br>';
        div.innerHTML += '<i style="background: #216cdc; border-radius: 50%;"></i><span>จุดเก็บน้ำเพื่อวิเคราะห์คุณภาพน้ำในโครงการฯ</span><br>';
        div.innerHTML += '<img src="./Marker/Mark.png" width="10px"><span>ตำแหน่งนำเข้าข้อมูล</span>';
        return div;
    }
    legend.addTo(map);
}

function hideLegend() {
    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend')
        div.innerHTML += `<div class ="center"><button class="btn btn-sm" onClick="showLegend()">
        <small class="prompt"><span class="kanit">แสดงสัญลักษณ์</span></small> 
        <i class="fa fa-angle-double-up" aria-hidden="true"></i>
    </button></div>`;
        return div;
    };
    legend.addTo(map);
}

hideLegend()

let refreshPage = () => {
    location.href = "./../report/index.html";
    // console.log("ok");
}

let confirmDelete = (ws_id, ws_station, ws_location, date) => {
    $("#projId").val(ws_id)
    $("#projName").text(`สถานี ${ws_station} ${ws_location}`)
    if (date !== 'null') {
        $("#projTime").text(`วันที่ ${date}`)
    }
    $("#deleteModal").modal("show")
}

let closeModal = () => {
    $('#editModal').modal('hide')
    $('#deleteModal').modal('hide')
    $('#myTable').DataTable().ajax.reload();
}

let deleteValue = () => {
    // console.log($("#projId").val());
    let ws_id = $("#projId").val()
    axios.post(url + "/ws-api/delete", { ws_id: ws_id }).then(r => {
        r.data.data == "success" ? closeModal() : null
        $('#myTable').DataTable().ajax.reload();
    })
}

let v = {
    ws_do: ['DO', '(mg/l)'],
    ws_bod: ['BOD', '(mg/l)'],
    ws_tcb: ['Total Coliform Bacteria', '(MPN/100ml)'],
    ws_fcb: ['Fecal Coliform Bacteria', '(MPN/100ml)'],
    ws_nh3n: ['แอมโมเนีย', '(mg/l)'],
    ws_wqi: ['ค่ามาตรฐานคุณภาพน้ำ', ''],
    ws_tp: ['ฟอสฟอรัสทั้งหมด', ''],
    ws_ts: ['ของแข็งทั้งหมด', ''],
    ws_ss: ['ของแข็งแขวนลอย', ''],
    ws_temp: ['อุณหภูมิ', 'c'],
    ws_ph: ['pH', 'pH'],
    ws_no3: ['ไนเตรด', '(mg/l)'],
    ws_phenols: ['ฟีนอล', '(mg/l)'],
    ws_cu: ['ทองแดง', '(mg/l)'],
    ws_ni: ['มิคเกิล', '(mg/l)'],
    ws_mn: ['แมงกานีส', '(mg/l)'],
    ws_zn: ['สังกะสี', '(mg/l)'],
    ws_cd: ['แคดเมียม', ''],
    ws_crhex: ['โครเมียมชนิดเฮ็กซาวาเล้นท์ (Cr Hexavalent)', ''],
    ws_pb: ['ตะกั่ว (mg/l)'],
    ws_totalhg: ['ปรอททั้งหมด', '(mg/l)'],
    ws_as: ['สารหนู'],
    ws_cyanide: ['ไซยาไนด์', '(mg/l)'],
    ws_radioa: ['กัมมันตภาพรังสี (Radioactivity)', ''],
    ws_top: ['สารฆ่าศัตรูพืชและสัตว์ชนิดที่มีคลอรีนทั้งหมด', '(mg/l)'],
    ws_ddt: ['ดีดีที (µg/l)'],
    ws_alphsb: ['บีเอชซีชนิดแอลฟา (Alpha-BHC)', '(µg/l)'],
    ws_dield: ['ดิลดริน (Dieldrin)', '(µg/l)'],
    ws_aldrin: ['อัลดริน (Aldrin)', '(µg/l)'],
    ws_hepta: ['เฮปตาคอร์ และเฮปตาคลอร์อีปอกไซด์', '(µg/l)'],
    ws_endrin: ['เอนดริน (Endrin)', ''],
}

$("#charttitle").hide();
$("#spinner").hide();
let getChart = (ws_id) => {
    $("#spinner").show();
    $("#chartd").empty()
    let obj = {
        ws_id: ws_id
    }
    axios.post(url + "/ws-api/getone", obj).then((r) => {
        // console.log(r);
        $("#staname").text(r.data.data[0].ws_station);
        $("#date").text(r.data.data[0].date)
        $("#charttitle").show();
        for (const [key, value] of Object.entries(r.data.data[0])) {
            // console.log(key)
            if (v[key] && value) {
                // console.log(key, value);
                if (Number(value) < 9999999) {
                    $("#chartd").append(
                        `<div class="col-sm-4">
                            <div class="card p-1">
                                <div class="card-body wschart" id="${key}"></div>
                            </div>
                        </div>`
                    )
                    if (key == "ws_do") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 4, 10, value); }
                    else if (key == "ws_bod") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 2, value); }
                    else if (key == "ws_fcb") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 4000, value); }
                    else if (key == "ws_wqi") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 61, 100, value); }
                    else if (key == "ws_nh3n") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 0.5, value); }
                    else if (key == "ws_tcb") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 20000, value); }
                    else if (key == "ws_tp") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 1000, value); }
                    else if (key == "ws_ts") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 1000, value); }
                    else if (key == "ws_ss") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 1000, value); }
                    else if (key == "ws_temp") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 40, value); }
                    else if (key == "ws_ph") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 5, 9, value); }
                    else if (key == "ws_no3") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 5, value); }
                    else if (key == "ws_phenols") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 0.005, value); }
                    else if (key == "ws_cu") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 0.1, value); }
                    else if (key == "ws_ni") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 0.1, value); }
                    else if (key == "ws_mn") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 1, value); }
                    else if (key == "ws_zn") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 1, value); }
                    else if (key == "ws_cd") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 0.005, value); }
                    else if (key == "ws_crhex") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 0.05, value); }
                    else if (key == "ws_pb") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 0.05, value); }
                    else if (key == "ws_totalhg") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 0.002, value); }
                    else if (key == "ws_as") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 0.01, value); }
                    else if (key == "ws_cyanide") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 0.005, value); }
                    else if (key == "ws_radioa") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 0.1, value); }
                    else if (key == "ws_top") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 0.05, value); }
                    else if (key == "ws_ddt") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 1, value); }
                    else if (key == "ws_alphsb") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 0.02, value); }
                    else if (key == "ws_dield") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 0.1, value); }
                    else if (key == "ws_aldrin") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 0.1, value); }
                    else if (key == "ws_hepta") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 0.2, value); }
                    else if (key == "ws_endrin") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 500000, value); }
                    else {
                        geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], 0, 999999, value);
                    }
                }
            }
        }
    });
    $("#referlink").html(
        `<div class="row" style="margin-left: 1%; color: darkgrey;">
                            หมายเหตุ: สีแดง หมายถึง ค่าคุณภาพน้ำผิวดินไม่อยู่ในเกณฑ์มาตรฐาน </div>
        <div class="row" style="margin-left: 1%;" id=>
        อ้างอิงจากเกณฑ์ของดัชนีคุณภาพน้ำของประเทศไทย <a
            href="http://pcd.go.th/info_serv/reg_std_water05.html">กรมควบคุมมลพิษ</a>
    </div>`)
}

let datapoint
let dtable
let loadTable = (data) => {
    console.log(data);
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
    dtable = $('#myTable').DataTable({
        ajax: {
            type: "POST",
            url: url + '/ws-api/getdata',
            data: data,
            dataSrc: 'data'
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    // console.log(data);
                    return `
                       <button class="btn btn-margin btn-danger" onclick="confirmDelete('${row.ws_id}','${row.ws_station}','${row.ws_location}','${row.date}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>
                       <a class="btn btn-margin btn-success" href="#charttitle" onclick="getChart(${row.ws_id})"><i class="bi bi-bar-chart-fill"></i>&nbsp;แสดงกราฟ</a>
                       <a class="btn btn-margin btn-info" href="#charttitle" onclick="getDetail(${row.ws_id})"><i class="bi bi-journal-richtext"></i>&nbsp;แก้ไขข้อมูล</a>`
                },
                // width: '30%'
            },
            {
                data: '',
                render: (data, type, row) => {
                    return `${row.ws_station}`
                }
            },
            { data: 'ws_location' },
            { data: 'ws_river' },
            { data: 'date' },
            { data: 'ws_do' },
            { data: 'ws_bod' },
            { data: 'ws_tcb' },
            { data: 'ws_fcb' },
            { data: 'ws_nh3n' },
            {
                data: null,
                "render": function (data, type, row) { return Number(data.ws_wqi).toFixed(2) }
            },
            { data: 'ws_tp' }
        ],
        columnDefs: [
            { className: 'text-center', targets: [0, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
        ],
        searching: true,
        scrollX: true,
        dom: 'Bfrtip',
        buttons: [
            'excel', 'print'
        ],
    });

    dtable.on('search.dt', function () {
        let data = dtable.rows({ search: 'applied' }).data()
        // getMarker(data);

    });
}

var mk, mg
let getMarker = (d) => {
    map.eachLayer(i => {
        i.options.name == "marker" ? map.removeLayer(i) : null;
    });
    // console.log(lyrControl._layers)
    if (!mg) {
        mg = L.layerGroup();
        d.map(i => {
            if (i.geojson) {
                let json = JSON.parse(i.geojson);
                // console.log(json)
                mk = L.geoJson(json, {
                    name: "marker"
                })
                    .bindPopup(`<h6><b>รหัสสถานี :</b> ${i.ws_station}</h6><h6><b>สถานที่ :</b> ${i.ws_location}</h6><h6><b>ชื่อแหล่งน้ำ :</b> ${i.ws_river}</h6><h6><b>วันที่รายงาน :</b> ${i.date}</h6>`)
                // .addTo(map)
            }
            mg.addLayer(mk);
        });
        mg.addTo(map)
        lyrControl.addOverlay(mg, "ตำแหน่งนำเข้าข้อมูล")
    }
    // let a = lyrControl._layers.filter(e => e.name == "ตำแหน่งนำเข้าข้อมูล")
    // if (a.length < 1) {
    //     lyrControl.addOverlay(mg, "ตำแหน่งนำเข้าข้อมูล")
    // }
}

let getDetail = (e) => {
    sessionStorage.setItem('ws_id', e);
    sessionStorage.setItem('ws_from_admin', 'yes');
    location.href = "./../detail/index.html";
}

let geneChart = (arr, div, tt, unit, min, max, value) => {
    $("#spinner").hide();
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create(div, am4charts.XYChart);
    chart.data = arr

    var title = chart.titles.create();
    title.text = tt;
    title.fontSize = 14;
    title.marginBottom = 5;

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "cat";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.fontSize = 14;

    var axis = chart.yAxes.push(new am4charts.ValueAxis());
    axis.paddingLeft = 5;
    axis.paddingRight = 5;
    axis.min = 0;
    // axis.layout = "absolute";

    axis.title.text = unit;
    axis.title.rotation = 270;
    axis.title.align = "center";
    axis.title.valign = "top";
    axis.title.dy = 12;
    axis.title.fontSize = 14;

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "val";
    series.dataFields.categoryX = "cat";
    // series.name = "Visits";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    if (value > max) {
        series.stroke = am4core.color("#e53935");
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color("#e53935");
        series.columns.template.stroke = am4core.color("#e53935");
        series.columns.template.fill = am4core.color("#e53935");
    }

    else if (value < max) {
        series.stroke = am4core.color("#64b5f6");
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color("#64b5f6");
        series.columns.template.stroke = am4core.color("#64b5f6");
        series.columns.template.fill = am4core.color("#64b5f6");
    }

    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

    // var range = axis.createSeriesRange(series);
    // range.value = min;
    // range.endValue = max;
    // range.contents.stroke = am4core.color("#396478");
    // range.contents.fill = range.contents.stroke;

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


let getStation = () => {
    axios.get(url + "/ws-api/getstation").then(r => {
        // console.log(r);
        r.data.data.map(i => $("#sta").append(`<option value="${i.ws_station}">${i.ws_river} (${i.ws_station})</option>`))
    })
}
getStation();

$("#sta").change(function () {
    let sta = this.value;
    if (sta == "ทุกสถานีตรวจวัดค่า") {
        $("#chartall").hide()
        dtable.search('').draw();
    } else {
        dtable.search(sta).draw();
    }
    $("#myTable").dataTable().fnDestroy();
    loadTable({ dat: sta, type: "station" })
    zoomsta(sta)
})

$("#chartall").hide()
let callChart = () => {
    $("#chartall").show();
    var sta = $("#sta").val();
    var staname = $("#sta").children("option:selected").text()
    var parameter = $("#parameter").val();
    $('#staname').html(` ${parameter} ของสถานี ${staname} `)
    let ws_wqi = [];
    let ws_bod = [];
    let ws_do = [];
    let ws_fcb = [];
    let ws_nh3n = [];
    let ws_tcb = [];


    if (sta == "ทุกสถานีตรวจวัดค่า") {
        chartstaall()
    } else {
        axios.post(url + "/ws-api/getstationone", { ws_station: sta }).then(async r => {
            // console.log(r);
            await r.data.data.map(i => {


                ws_wqi.push({ "date": i.ws_date, "value": Number(i.ws_wqi) });
                ws_bod.push({ "date": i.ws_date, "value": Number(i.ws_bod) });
                ws_do.push({ "date": i.ws_date, "value": Number(i.ws_do) });
                ws_fcb.push({ "date": i.ws_date, "value": Number(i.ws_fcb) });
                ws_nh3n.push({ "date": i.ws_date, "value": Number(i.ws_nh3n) });
                ws_tcb.push({ "date": i.ws_date, "value": Number(i.ws_tcb) });
            });

            if (parameter == "WQI") {
                lineChart("chartdiv", "WQI", "WQI", ws_wqi, 0, 61, 100, 500);
            }
            else if (parameter == "DO") {
                lineChart("chartdiv", "DO", "(mg/l)", ws_do, 0, 4, 10, 100);
            }
            else if (parameter == "BOD") {
                lineChart("chartdiv", "BOD", "(mg/l)", ws_bod, 0, 2, 100, 500);
            }
            else if (parameter == "FCB") {
                lineChart("chartdiv", "FCB", "(MPN/100ml)", ws_fcb, 0, 0, 4000, 500000);
            }
            else if (parameter == "AMM") {
                lineChart("chartdiv", "แอมโมเนีย", "(mg/l)", ws_nh3n, 0, 0, 0.5, 10);
            }
            else if (parameter == "TCB") {
                lineChart("chartdiv", "TCB", "(MPN/100ml)", ws_tcb, 0, 0, 20000, 250000);
            }

        })
    }
}

let lineChart = (div, label, unit, series, min1, max1, min2, max2) => {

    am4core.useTheme(am4themes_animated);

    // Create chart instance
    var chart = am4core.create(div, am4charts.XYChart);

    // Add data
    chart.data = series;

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = label + " " + unit;

    // Create series
    function createSeries(field, name) {
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.dateX = "date";
        series.name = name;
        // series.tooltipText = `{dateX}: [bold]{valueY.formatNumber('###,###,###.##')} ${unit}[/]`;
        series.strokeWidth = 2;
        // series.tensionX = 0.77;
        // series.tooltip.getFillFromObject = false;
        // series.tooltip.background.fill = am4core.color("#35E1E5");
        series.stroke = am4core.color("#42a5f5");

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 3;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color("#fff");
        // bullet.circle.stroke = am4core.color("#03a9f4");
        bullet.adapter.add("stroke", function (fill, target) {
            if (target.dataItem.valueY > min2) {
                return am4core.color("#E53935");
            }
            else if (target.dataItem.valueY < max1) {
                return am4core.color("#E53935");
            } return fill;

        })

        var bullet2 = series.bullets.push(new am4charts.Bullet());
        bullet2.tooltipText = `{dateX}: [bold]{valueY.formatNumber('###,###,###.##')} ${unit}[/]`;
        bullet2.adapter.add("fill", function (fill, target) {
            if (target.dataItem.valueY > min2) {
                return am4core.color("#E53935");
            }
            else if (target.dataItem.valueY < max1) {
                return am4core.color("#E53935");
            } return fill;
        })

        var bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;

        var range = valueAxis.createSeriesRange(series);
        range.value = min1;
        range.endValue = max1;
        range.contents.stroke = am4core.color("#E53935");
        range.contents.fill = range.contents.stroke;

        var range2 = valueAxis.createSeriesRange(series);
        range2.value = min2;
        range2.endValue = max2;
        range2.contents.stroke = am4core.color("#E53935");
        range2.contents.fill = range.contents.stroke;

        return series;
    }

    var series1 = createSeries("value", label);

    chart.legend = new am4charts.Legend();
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
}

lineChart()

let Dws_wqi = [];
let Dws_bod = [];
let Dws_do = [];
let Dws_fcb = [];
let Dws_nh3n = [];
let Dws_tcb = [];
let setall_dat = () => {
    axios.get(url + "/ws-api/getstation").then(r => {
        r.data.data.map(i =>
            axios.post(url + '/ws-api/getstationone', { ws_station: i.ws_station }).then(r => {
                console.log(r.data.data)
                var data = r.data.data
                var length = data.length - 1
                var staname = data[length].ws_river + "(" + data[length].ws_station + ")";
                Dws_wqi.push({ "sta": staname, "value": Number(data[length].ws_wqi) });
                Dws_bod.push({ "sta": staname, "value": Number(data[length].ws_bod) });
                Dws_do.push({ "sta": staname, "value": Number(data[length].ws_do) });
                Dws_fcb.push({ "sta": staname, "value": Number(data[length].ws_fcb) });
                Dws_nh3n.push({ "sta": staname, "value": Number(data[length].ws_nh3n) });
                Dws_tcb.push({ "sta": staname, "value": Number(data[length].ws_tcb) });
            })
        )
    })
}


let chartstaall = () => {
    // var sta = data
    // console.log(sta)
    var parameter = $("#parameter").val();
    if (parameter == "WQI") {
        chartall(Dws_wqi, "WQI", "WQI")
    } else if (parameter == "BOD") {
        chartall(Dws_bod, "BOD", "mg/l")
    } else if (parameter == "DO") {
        chartall(Dws_do, "DO", "mg/l")
    } else if (parameter == "FCB") {
        chartall(Dws_fcb, "FCB", "MPN/100ml")
    } else if (parameter == "AMM") {
        chartall(Dws_nh3n, "แอมโมเนีย", "mg/l")
    } else if (parameter == "TCB") {
        chartall(Dws_tcb, "TCB", "MPN/100ml")
    }
}

$("#parameter").on("change", function () {
    var parameter = $("#parameter").val();
    if (parameter == "WQI") {
        chartall(Dws_wqi, "WQI", "WQI")
    } else if (parameter == "BOD") {
        chartall(Dws_bod, "BOD", "mg/l")
    } else if (parameter == "DO") {
        chartall(Dws_do, "DO", "mg/l")
    } else if (parameter == "FCB") {
        chartall(Dws_fcb, "FCB", "MPN/100ml")
    } else if (parameter == "AMM") {
        chartall(Dws_nh3n, "แอมโมเนีย", "mg/l")
    } else if (parameter == "TCB") {
        chartall(Dws_tcb, "TCB", "MPN/100ml")
    }

    callChart()
})


let chartall = (data, label, unit) => {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add percent sign to all numbers
    chart.numberFormatter.numberFormat = "#,###,###.##";
    chart.legend = new am4charts.Legend()
    // chart.legend.position = 'bottom'
    // chart.legend.paddingBottom = 20
    // chart.legend.labels.template.maxWidth = 95

    // Add data
    chart.data = data
    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "sta";
    // categoryAxis.renderer.inside = true;
    // categoryAxis.renderer.labels.template.valign = "top";
    categoryAxis.renderer.labels.template.fontSize = 14;
    // categoryAxis.renderer.grid.template.location = 0;
    // categoryAxis.renderer.minGridDistance = 30;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = label + " " + "(" + unit + ")";
    valueAxis.title.fontWeight = 800;

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "sta";
    series.clustered = false;
    series.name = 'สถานีตรวจวัด'
    series.tooltipText = `สถานีตรวจวัด {categoryX}: [bold]{valueY}[/] ${unit}`;
    series.stroke = am4core.color('#5AD6F4');
    series.tooltip.getFillFromObject = false;
    series.tooltip.background.fill = am4core.color('#5AD6F4');
    series.columns.template.stroke = am4core.color('#5AD6F4');
    series.columns.template.fill = am4core.color('#5AD6F4');

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;

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
}

var m53, lg, m58, m59, m60, lg, lg, lg
let layermark = (Url, Nlayer) => {
    var MIcon1 = L.icon({
        iconUrl: './Marker/Mark1.png',
        iconSize: [18, 18],
        iconAnchor: [10, 5],
        // popupAnchor: [10, 0]
    });
    var MIcon2 = L.icon({
        iconUrl: './Marker/Mark2.png',
        iconSize: [18, 18],
        iconAnchor: [10, 5],
        // popupAnchor: [10, 0]
    });
    var MIcon3 = L.icon({
        iconUrl: './Marker/Mark3.png',
        iconSize: [18, 18],
        iconAnchor: [10, 5],
        // popupAnchor: [10, 0]
    });
    if (Nlayer == 58) {
        axios.get(Url).then((r) => {
            var d = r.data.features
            // console.log(r.data.features);
            lg = L.layerGroup()
            d.map(i => {
                if (i.properties) {
                    m58 = L.circleMarker([i.geometry.coordinates[1], i.geometry.coordinates[0]]
                        , {
                            radius: 8,
                            fillColor: "#01c8ff",
                            color: "#232323",
                            weight: 0.2,
                            opacity: 1,
                            fillOpacity: 1,
                        })
                        .bindPopup(`<h6><b>ที่ตั้ง :</b> ${i.properties.tam_nam_t} ${i.properties.amphoe_t} ${i.properties.prov_nam_t}</h6>`)
                    // .addTo(map);
                }
                lg.addLayer(m58);
            })
            lg.addTo(map)
            lyrControl.addOverlay(lg, "จุดเฝ้าระวังคุณภาพน้ำจากสสภ.13")
        });
    }
    else if (Nlayer == 59) {
        axios.get(Url).then((r) => {
            var d = r.data.features
            // console.log(r.data.features);
            lg = L.layerGroup()
            d.map(i => {
                if (i.properties) {
                    m59 = L.circleMarker([i.properties.point_y, i.properties.point_x]
                        , {
                            radius: 8,
                            fillColor: "#216cdc",
                            color: "#232323",
                            weight: 0.2,
                            opacity: 1,
                            fillOpacity: 1,
                        })
                        .bindPopup(`<h6><b>ที่ตั้ง :</b> ${i.properties.tam_nam_t} ${i.properties.amphoe_t} ${i.properties.prov_nam_t}</h6>`)
                    // .addTo(map);
                }
                lg.addLayer(m59);
            })
            lg.addTo(map)
            lyrControl.addOverlay(lg, "จุดเก็บน้ำเพื่อวิเคราะห์คุณภาพน้ำในโครงการฯ")
        });
    }
    else if (Nlayer == 60) {
        axios.get(Url).then((r) => {
            var d = r.data.features
            // console.log(r.data.features);
            lg = L.layerGroup()
            d.map(i => {
                if (i.properties) {
                    m60 = L.circleMarker([i.properties.lat, i.properties.long], {
                        radius: 8,
                        fillColor: "#006898",
                        color: "#232323",
                        weight: 0.2,
                        opacity: 1,
                        fillOpacity: 1,
                    })
                        .bindPopup(`<h6><b>รหัสสถานี :</b> ${i.properties.station}</h6><h6><b>ชื่อแหล่งน้ำ :</b> ${i.properties.name_river}</h6><h6><b>จังหวัด :</b> ${i.properties.prov}</h6><h6><b>ค่า WQI :</b> ${i.properties.wqi.toFixed(2)} ${i.properties.quality}</h6> `)
                    // .addTo(map);
                }
                lg.addLayer(m60);
            })
            lg.addTo(map)
            lyrControl.addOverlay(lg, "จุดวัดคุณภาพน้ำผิวดิน")
        });
    }
    else if (Nlayer == 53) {
        axios.get(Url).then((r) => {
            var d = r.data.features
            // console.log(r.data.features);
            lg = L.layerGroup()
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
                lg.addLayer(m53);
            })
            lg.addTo(map)
            lyrControl.addOverlay(lg, "อ่างเก็บน้ำ")
        });
    }
}

let zoomsta = (sta) => {
    axios.get(L60).then((r) => {
        var d = r.data.features
        d.map(i => {
            if (i.properties.station == sta) {
                var popup = L.popup()
                    .setLatLng([i.properties.lat, i.properties.long])
                    .setContent(`<h6><b>รหัสสถานี :</b> ${i.properties.station}</h6><h6><b>ชื่อแหล่งน้ำ :</b> ${i.properties.name_river}</h6><h6><b>จังหวัด :</b> ${i.properties.prov}</h6><h6><b>ค่า WQI :</b> ${i.properties.wqi.toFixed(2)} ${i.properties.quality}</h6> `)
                    .openOn(map);
                map.setView([i.properties.lat, i.properties.long], 12);
                // console.log(i.properties.station_n)
            } else {
                zoommap2(sta)
            }
        })
    })

    if (sta == "ทุกสถานีตรวจวัดค่า") {
        map.closePopup();
        zoomExtent("pro", "eec")
    }
}
let zoomExtent = (lyr, code) => {
    map.eachLayer(lyr => {
        if (lyr.options.name == 'bound') {
            map.removeLayer(lyr)
        }
    })
    axios.get(url + `/eec-api/get-bound-flip/${lyr}/${code}`).then(r => {
        let geom = JSON.parse(r.data.data[0].geom)
        var polygon = L.polygon(geom.coordinates, { color: "red", name: "bound", fillOpacity: 0.0 }).addTo(map);
        map.fitBounds(polygon.getBounds());


        // $("#tab").dataTable().fnDestroy();
        // showTable({ col: lyr, val: code });

    })
}

let zoommap2 = (sta) => {
    axios.post(url + '/ws-api/getdata', { staid: sta }).then((r) => {
        var dat = r.data.data
        dat.map(i => {
            if (i.geojson !== null && sta !== "ทุกสถานีตรวจวัดค่า") {
                let json = JSON.parse(i.geojson);
                // console.log(json)
                var popup = L.popup()
                    .setLatLng([json.coordinates[1], json.coordinates[0]])
                    .setContent(`<h6><b>รหัสสถานี:</b> ${i.ws_station}</h6><h6><b>ชื่อแหล่งน้ำ:</b> ${i.ws_river}</h6><h6><b>สถานที่ตรวจวัด:</b> ${i.ws_location}</h6>
                    <h6><b>จังหวัด:</b> ${i.ws_province}</h6><h6><b>ค่า WQI:</b> ${i.ws_wqi}</h6> `)
                    .openOn(map);
                map.setView([json.coordinates[1], json.coordinates[0]], 12);
            }

        })
    })
}

let loadWqua = async () => {
    let sta = [
        {
            staname: "station_01",
            latlon: [13.691624, 101.442835]
        }, {
            staname: "station_02",
            latlon: [13.0465397, 100.9197114]
        }, {
            staname: "station_03",
            latlon: [12.8291659, 101.3244348]
        }]

    let sum_data = []
    sta.map(async (i) => {
        let dat_ec = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrq-api-cherry.php', { param: "ec", sort: "DESC", stname: i.staname, limit: 1 });
        dat_ec.then(r => {
            let A1 = r.data.data;

            let dat_ph = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrq-api-cherry.php', { param: "ph", sort: "DESC", stname: i.staname, limit: 1 });
            dat_ph.then(r => {
                let B1 = r.data.data;

                let dat_do = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrq-api-cherry.php', { param: "do", sort: "DESC", stname: i.staname, limit: 1 });
                dat_do.then(r => {
                    let C1 = r.data.data;

                    let dat_tmp = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrq-api-cherry.php', { param: "tmp", sort: "DESC", stname: i.staname, limit: 1 });
                    dat_tmp.then(r => {
                        let D1 = r.data.data;
                        sum_data.push({ staname: i.staname, latlon: i.latlon, ec: Number(A1[0].val), ec_time: A1[0].t, ph: Number(B1[0].val), ph_time: B1[0].t, do: Number(C1[0].val), do_time: C1[0].t, tmp: Number(D1[0].val), tmp_time: D1[0].t, tmp: Number(D1[0].val), tmp_time: D1[0].t });

                        if (sum_data.length == '3') {
                            marker_Wqua(sum_data)
                        }
                    })
                })
            })
        })
    })
}

let staW_qua
let marker_Wqua = (d) => {
    let iconblue = L.icon({
        iconUrl: './Marker/sta_qua.png',
        iconSize: [50, 50],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });
    staW_qua = L.layerGroup()
    let data = d;
    data.map(i => {
        let marker = L.marker(i.latlon, {
            icon: iconblue,
            name: 'lyr',
            // data: dat
        });
        // marker.addTo(map)
        marker.bindPopup(`<div style="font-family:'Kanit'; font-size: 15px;"> 
                        ชื่อสถานี : ${i.staname} <br>
                        ค่า pH : ${Number(i.ph).toFixed(1)}<br>
                        ค่าการนำไฟฟ้า : ${Number(i.ec).toFixed(1)} µS/cm<br>
                        ค่า DO : ${Number(i.do).toFixed(1)} ppm<br>
                        อุณหภูมิ : ${Number(i.tmp).toFixed(1)} องศาเซลเซียส<br>
                        ดูกราฟ <span style="font-size: 20px; color:#006fa2; cursor: pointer;" onclick="WquaModal('${i.staname}')"><i class="bi bi-file-earmark-bar-graph"></i></span>
                        </div>`)
        staW_qua.addLayer(marker);
    })
    lyrControl.addOverlay(staW_qua, "จุดตรวจวัดคุณภาพน้ำผิวดิน (API)")
}

let WquaModal = (stname) => {
    // console.log(stname);
    let arrPh = [];
    let arrTemp = [];
    let arrEC = [];
    let arrDO = [];

    let dat_ec = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrq-api-cherry.php', { param: "ec", sort: "DESC", stname: stname, limit: 90 });
    dat_ec.then(r => {
        let A1 = r.data.data;
        // console.log(A1)
        A1.map(i => {
            arrEC.push({
                "date": i.t,
                "value": Number(i.val)
            });
        })
    })

    let dat_ph = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrq-api-cherry.php', { param: "ph", sort: "DESC", stname: stname, limit: 90 });
    dat_ph.then(r => {
        let B1 = r.data.data;
        // console.log(B1)
        B1.map(i => {
            arrPh.push({
                "date": i.t,
                "value": Number(i.val)
            });
        })
    })

    let dat_do = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrq-api-cherry.php', { param: "do", sort: "DESC", stname: stname, limit: 90 });
    dat_do.then(r => {
        let C1 = r.data.data;
        // console.log(C1)
        C1.map(i => {
            arrDO.push({
                "date": i.t,
                "value": Number(i.val)
            });
        })
    })

    let dat_tmp = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrq-api-cherry.php', { param: "tmp", sort: "DESC", stname: stname, limit: 90 });
    dat_tmp.then(r => {
        let D1 = r.data.data;
        // console.log(D1)
        D1.map(i => {
            arrTemp.push({
                "date": i.t,
                "value": Number(i.val)
            });
        })
    })

    setTimeout(() => {
        // console.log(arrDept, arrTemp, arrHumi);
        Wquachart(arrPh, "pHChart", "ค่า pH");
        Wquachart(arrEC, "ECChart", "ค่าการนำไฟฟ้า (µS/cm)");
        Wquachart(arrTemp, "TempChart", "อุณหภูมิ (°C)");
        Wquachart(arrDO, "DOChart", "ค่า DO (ppm)");
    }, 500)


    $("#WquaModal").modal("show");

}

let Wquachart = function (data, div, title) {

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

};
loadWqua()


$("#pro").on("change", function () {
    // getPro(this.value)
    let dat
    this.value == 'eec' ? dat = 'ทุกจังหวัด' : null;
    this.value == '24' ? dat = 'ฉะเชิงเทรา' : null;
    this.value == '20' ? dat = 'ชลบุรี' : null;
    this.value == '21' ? dat = 'ระยอง' : null;

    zoomExtent("pro", this.value)

    $("#myTable").dataTable().fnDestroy();
    loadTable({ type: "prov", dat })
});

