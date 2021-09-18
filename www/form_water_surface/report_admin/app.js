let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
$("#usrname").text(urname);
urid ? null : location.href = "./../../form_register/login/index.html";

if (eecauth !== "admin" && eecauth !== "office") {
    location.href = "./../../form_register/login/index.html";
}
var L53 = 'https://eec-onep.online:8443/geoserver/eec/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=eec%3Aa__53_9w_reser63_3p&maxFeatures=50&outputFormat=application%2Fjson'
var L58 = 'https://eec-onep.online:8443/geoserver/eec/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=eec%3Aa__58_water_mnre&maxFeatures=50&outputFormat=application%2Fjson'
var L59 = 'https://eec-onep.online:8443/geoserver/eec/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=eec%3Aa__59_water_onep&maxFeatures=50&outputFormat=application%2Fjson'
var L60 = 'https://eec-onep.online:8443/geoserver/eec/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=eec%3Aa__60_water_stand_eec&maxFeatures=50&outputFormat=application%2Fjson'
$(document).ready(() => {
    loadTable()
    layermark(L53, 53)
    layermark(L58, 58)
    layermark(L59, 59)
    layermark(L60, 60)
})

// const url = "https://eec-onep.online:3700";
const url = 'http://localhost:3700';

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

// const watermnre = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
//     layers: 'eec:a__58_water_mnre',
//     name: "lyr",
//     format: 'image/png',
//     transparent: true,
// });
// const wateronep = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
//     layers: 'eec:a__59_water_onep',
//     name: "lyr",
//     format: 'image/png',
//     transparent: true,
// });
// const waterstandeec = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
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
                    geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1]);
                }
            }
        }
    });
}


let loadTable = () => {
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
    let dtable = $('#myTable').DataTable({
        ajax: {
            type: "POST",
            url: url + '/ws-api/getdata',
            data: { userid: "sakda" },
            dataSrc: 'data'
        },
        columns: [
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
            { data: 'ws_tp' },
            {
                data: null,
                render: function (data, type, row, meta) {
                    // console.log(data);
                    return `
                       <button class="btn btn-margin btn-outline-danger" onclick="confirmDelete('${row.ws_id}','${row.ws_station}','${row.ws_location}','${row.date}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>
                       <a class="btn btn-margin btn-outline-success" href="#charttitle" onclick="getChart(${row.ws_id})"><i class="bi bi-bar-chart-fill"></i>&nbsp;แสดงกราฟ</a>
                       <a class="btn btn-margin btn-outline-info" href="#charttitle" onclick="getDetail(${row.ws_id})"><i class="bi bi-journal-richtext"></i>&nbsp;ดูค่าที่ตรวจวัด</a>`
                },
                // width: '30%'
            }
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
        getMarker(data);
    });
}

var mk, mg
let getMarker = (d) => {
    map.eachLayer(i => {
        i.options.name == "marker" ? map.removeLayer(i) : null;
    });
    // console.log(d)
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

let getDetail = (e) => {
    sessionStorage.setItem('ws_id', e);
    sessionStorage.setItem('ws_from_admin', 'yes');
    location.href = "./../detail/index.html";
}

let geneChart = (arr, div, tt, unit) => {
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

    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

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

let getSeries = (sta) => {
    let ws_wqi = [];
    let ws_bod = [];
    let ws_do = [];
    let ws_fcb = [];
    let ws_nh3n = [];
    let ws_tcb = [];
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

        lineChart("_ws_wqi", "WQI", "WQI", ws_wqi);
        lineChart("_ws_bod", "DO", "(mg/l)", ws_bod);
        lineChart("_ws_do", "BOD", "(mg/l)", ws_do);
        lineChart("_ws_fcb", "FCB", "(MPN/100ml)", ws_fcb);
        lineChart("_ws_nh3n", "แอมโมเนีย", "(mg/l)", ws_nh3n);
        lineChart("_ws_tcb", "TCB", "(MPN/100ml)", ws_tcb);
    })
}
getSeries("BK01");
$("#sta").change(function () {
    getSeries(this.value);
})

let lineChart = (div, label, unit, series) => {

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
        series.tooltipText = "{dateX}: [b]{valueY}[/]";
        series.strokeWidth = 2;

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color("#fff");

        var bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;

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

var m53, ms53, m58, m59, m60, ms58, ms59, ms60
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
            ms58 = L.layerGroup()
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
                ms58.addLayer(m58);
            })
            ms58.addTo(map)
            lyrControl.addOverlay(ms58, "จุดเฝ้าระวังคุณภาพน้ำจากสสภ.13")
        });
    }
    else if (Nlayer == 59) {
        axios.get(Url).then((r) => {
            var d = r.data.features
            // console.log(r.data.features);
            ms59 = L.layerGroup()
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
                ms59.addLayer(m59);
            })
            ms59.addTo(map)
            lyrControl.addOverlay(ms59, "จุดเก็บน้ำเพื่อวิเคราะห์คุณภาพน้ำในโครงการฯ")
        });
    }
    else if (Nlayer == 60) {
        axios.get(Url).then((r) => {
            var d = r.data.features
            // console.log(r.data.features);
            ms60 = L.layerGroup()
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
                ms60.addLayer(m60);
            })
            ms60.addTo(map)
            lyrControl.addOverlay(ms60, "จุดวัดคุณภาพน้ำผิวดิน")
        });
    }
    else if (Nlayer == 53) {
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
            ms53.addTo(map)
            lyrControl.addOverlay(ms53, "อ่างเก็บน้ำ")
        });
    }
}








