let urid = 'user';

$("#tbdata").hide()

var L62 = 'https://eec-onep.online/geoserver/eec/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=eec%3Aa__62_w_system_eec&maxFeatures=50&outputFormat=application%2Fjson'
$(document).ready(() => {
    loadTable()
    // loadMap()
    layermark(L62, 62)
});

const url = "https://eec-onep.online/api";
// const url = 'http://localhost:3700';


let latlng = {
    lat: 13.305567,
    lng: 101.383101
};

let map = L.map('map', {
    center: latlng,
    zoom: 9
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

const tam = L.tileLayer.wms("https://eec-onep.online/geoserver/eec/wms?", {
    layers: "eec:a__03_tambon_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 18,
    // minZoom: 14,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const amp = L.tileLayer.wms("https://eec-onep.online/geoserver/eec/wms?", {
    layers: "eec:a__02_amphoe_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 14,
    // minZoom: 10,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const pro = L.tileLayer.wms("https://eec-onep.online/geoserver/eec/wms?", {
    layers: "eec:a__01_prov_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 10,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const wsystemeec = L.tileLayer.wms("https://eec-onep.online/geoserver/eec/wms?", {
    layers: 'eec:a__62_w_system_eec',
    format: 'image/png',
    transparent: true
});
const wpipeeec = L.tileLayer.wms("https://eec-onep.online/geoserver/eec/wms?", {
    layers: 'eec:a__63_w_pipe_eec',
    format: 'image/png',
    transparent: true
});
const wscopeeec = L.tileLayer.wms("https://eec-onep.online/geoserver/eec/wms?", {
    layers: 'eec:a__64_w_scope_eec',
    format: 'image/png',
    transparent: true
});
const pollution = L.tileLayer.wms("https://eec-onep.online/geoserver/eec/wms?", {
    layers: 'eec:a__81_pollution_group',
    format: 'image/png',
    transparent: true,
});

let lyrs = L.featureGroup().addTo(map)

var baseMap = {
    "Mapbox": mapbox.addTo(map),
    "google Hybrid": ghyb
}

const overlayMap = {
    "ขอบเขตจังหวัด": pro.addTo(map),
    "ขอบเขตอำเภอ": amp,
    "ขอบเขตตำบล": tam,
    "แหล่งกำเนิดมลพิษ": pollution,
    // "ระบบบำบัดน้ำเสียในพื้นที่เขตพัฒนาพิเศษภาคตะวันออก": wsystemeec.addTo(map),
    "เส้นท่อระบบบำบัดน้ำเสียในพื้นที่เขตพัฒนาพิเศษภาคตะวันออก": wpipeeec.addTo(map),
    "ขอบเขตระบบบำบัดน้ำเสียในพื้นที่เขตพัฒนาพิเศษภาคตะวันออก": wscopeeec.addTo(map),
}
// L.control.layers(baseMap, overlayMap).addTo(map);
const lyrControl = L.control.layers(baseMap, overlayMap, {
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
        div.innerHTML += '<img src="./img/arrowup.png"  height="30px"><span>ระบบบำบัดน้ำเสีย</span><br>';
        div.innerHTML += '<img src="./img/linepipe.png" width="10px"><span>เส้นท่อระบบบำบัดน้ำเสีย</span><br>';
        div.innerHTML += '<img src="./img/linescope.png" width="10px"><span>ขอบเขตระบบบำบัดน้ำเสีย</span><br>';
        div.innerHTML += '<img src="./img/Mark.png" width="10px"><span>ตำแหน่งนำเข้าข้อมูล</span><br>';
        div.innerHTML += `<button class="btn btn-sm" onClick="Puop()" id="PUOP">
        <span class="kanit">แหล่งกำเนิดมลพิษ</span><i class="fa fa-angle-double-down" aria-hidden="true"></i>
      </button>`
        div.innerHTML += `<div id='PU'></div>`

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
    <span class="kanit">แหล่งกำเนิดมลพิษ</span><i class="fa fa-angle-double-up" aria-hidden="true"></i></button><br>
    <i style="background: #ff3769; border-radius: 1%;"></i><span>ตัวเมืองและย่านการค้า</span><br>
    <i style="background: #379eff; border-radius: 1%;"></i><span>ท่าเรือ</span><br>
    <i style="background: #ad71db; border-radius: 1%;"></i><span>นิคมอุตสาหกรรม</span><br>
    <i style="background: #ffadec; border-radius: 1%;"></i><span>รีสอร์ท โรงแรม เกสต์เฮ้าส์</span><br>
    <i style="background: #861790; border-radius: 1%;"></i><span>โรงงานอุตสาหกรรม</span><br>
    <i style="background: #ffe435; border-radius: 1%;"></i><span>โรงเรือนเลี้ยงสัตว์</pan><br>
    <i style="background: #7ae3ff; border-radius: 1%;"></i><span>สถานที่เพาะเลี้ยงสัตว์น้ำ</span><br>
    <i style="background: #000988; border-radius: 1%;"></i><span>สถานที่ราชการและสถาบันต่าง ๆ</span><br>
    <i style="background: #f9b310; border-radius: 1%;"></i><span>สถานีบริการน้ำมัน</span><br>
    <i style="background: #984700; border-radius: 1%;"></i><span>หมู่บ้าน/ที่ดินจัดสรรร้าง</span><br></div>`)
}
function Puclose() {
    $('#PUOP').show()
    $('#PU').html('')
}

let refreshPage = () => {
    window.open("./../report/index.html", "_self");
    // console.log("ok");
}

let confirmDelete = (wq_id, prj_name) => {
    $("#projId").val(wq_id)
    $("#projName").text(prj_name)
    $("#deleteModal").modal("show")
}

let closeModal = () => {
    $('#editModal').modal('hide')
    $('#deleteModal').modal('hide')
    $('#myTable').DataTable().ajax.reload();
}

let deleteValue = () => {
    // console.log($("#projId").val());
    let wq_id = $("#projId").val()
    axios.post(url + "/wq-api/deletedata", { wq_id: wq_id }).then(r => {
        r.data.data == "success" ? closeModal() : null
    })
}

$("#chartdiv").hide()
function getChart(wq_id) {
    let obj = {
        wq_id: wq_id
    }
    axios.post(url + "/wq-api/getone", obj).then((r) => {
        $("#chartdiv").show()
        $("#chartModal").modal("show");
        // console.log(r.data.data[0]);
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].bf_wq_bod }, { "cat": "หลังบำบัด", "val": r.data.data[0].af_wq_bod }], "wq_bod", "ค่าบีโอดี (BOD)", "mg/L")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].bf_wq_cod }, { "cat": "หลังบำบัด", "val": r.data.data[0].af_wq_cod }], "wq_cod", "ค่าซีโอดี (COD)", "mg/L")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].bf_wq_cond }, { "cat": "หลังบำบัด", "val": r.data.data[0].af_wq_cond }], "wq_cond", "ความนำไฟฟ้า (Conductivity)", "μs/cm")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].bf_wq_do }, { "cat": "หลังบำบัด", "val": r.data.data[0].af_wq_do }], "wq_do", "ออกซิเจนละลายในน้ำ (dissolved oxygen, DO)", "mg/L")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].bf_wq_fcb }, { "cat": "หลังบำบัด", "val": r.data.data[0].af_wq_fcb }], "wq_fcb", "แบคทีเรียกลุ่มฟีคอลโคลิฟอร์ม (Fecal Coliform Bacteria, FCB)", "MPN /100 ml")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].bf_wq_og }, { "cat": "หลังบำบัด", "val": r.data.data[0].af_wq_og }], "wq_og", "น้ำมันและไขมัน (Oil&Grease)", "mg/L")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].bf_wq_ph }, { "cat": "หลังบำบัด", "val": r.data.data[0].af_wq_ph }], "wq_ph", "ความเป็นกรด-ด่าง (pH)", "pH")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].bf_wq_sal }, { "cat": "หลังบำบัด", "val": r.data.data[0].af_wq_sal }], "wq_sal", "ความเค็ม (Salinity)", "PPT")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].bf_wq_ses }, { "cat": "หลังบำบัด", "val": r.data.data[0].af_wq_ses }], "wq_ses", "ค่าตะกอนหนัก (Settleable Solids: SeS)", "mg/L")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].bf_wq_ss }, { "cat": "หลังบำบัด", "val": r.data.data[0].af_wq_ss }], "wq_ss", "ของแข็งแขวนลอย (Suspended Solids: SS)", "mg/L")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].bf_wq_tcb }, { "cat": "หลังบำบัด", "val": r.data.data[0].af_wq_tcb }], "wq_tcb", "โคลิฟอร์มแบคทีเรียทั้งหมด (Total Coliform Bacteria, TCB)", "MPN /100 ml")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].bf_wq_tds }, { "cat": "หลังบำบัด", "val": r.data.data[0].af_wq_tds }], "wq_tds", "ของแข็งละลายน้ำ (Total Dissolved Solids, TDS)", "mg/L")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].bf_wq_temp }, { "cat": "หลังบำบัด", "val": r.data.data[0].af_wq_temp }], "wq_temp", "Temperature ", "Celsius")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].bf_wq_tkn }, { "cat": "หลังบำบัด", "val": r.data.data[0].af_wq_tkn }], "wq_tkn", "ไนโตรเจนในรูปทีเคเอ็น (TKN)", "mg/L")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].bf_wq_tn }, { "cat": "หลังบำบัด", "val": r.data.data[0].af_wq_tn }], "wq_tn", "ไนโตรเจนทั้งหมด (TN)", "mg–N/l")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].bf_wq_tp }, { "cat": "หลังบำบัด", "val": r.data.data[0].af_wq_tp }], "wq_tp", "ฟอสฟอรัสทั้งหมด (TP)", "mg–P/l")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].bf_wq_turb }, { "cat": "หลังบำบัด", "val": r.data.data[0].af_wq_turb }], "wq_turb", "ความขุ่น (Turbidity)", "NTU")
    })
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
            url: url + '/wq-api/getdata',
            data: { userid: "sakda" },
            dataSrc: 'data'
        },
        columns: [
            // { data: 'prj_name' },
            {
                data: '',
                render: (data, type, row) => {
                    return ` <span class="badge bg-info text-white">${row.id}</span>`
                }
            },
            { data: 'prov' },
            { data: 'syst' },
            { data: 'bf_date' },

            {
                data: null,
                "render": function (data, type, row) { return Number(data.bf_wq_bod).toFixed(2) }
            },
            {
                data: null,
                "render": function (data, type, row) { return Number(data.bf_wq_cod).toFixed(2) }
            },
            {
                data: null,
                "render": function (data, type, row) { return Number(data.bf_wq_do).toFixed(2) }
            },
            {
                data: null,
                "render": function (data, type, row) { return Number(data.bf_wq_ph).toFixed(2) }
            },
            {
                data: null,
                "render": function (data, type, row) { return Number(data.bf_wq_temp).toFixed(2) }
            },

            {
                data: null,
                "render": function (data, type, row) { return Number(data.af_wq_bod).toFixed(2) }
            },
            {
                data: null,
                "render": function (data, type, row) { return Number(data.af_wq_cod).toFixed(2) }
            },
            {
                data: null,
                "render": function (data, type, row) { return Number(data.af_wq_do).toFixed(2) }
            },
            {
                data: null,
                "render": function (data, type, row) { return Number(data.af_wq_ph).toFixed(2) }
            },
            {
                data: null,
                "render": function (data, type, row) { return Number(data.af_wq_temp).toFixed(2) }
            },

            {
                data: null,
                render: function (data, type, row, meta) {
                    // console.log(data);
                    return `
                       <a class="btn btn-margin btn-outline-info" href="./../edit_bf/index.html?id=${row.wq_id}"><i class="bi bi-gear-fill"></i>&nbsp;ก่อนบำบัด</a>
                       <a class="btn btn-margin btn-outline-info" href="./../edit_af/index.html?id=${row.wq_id}"><i class="bi bi-gear-fill"></i>&nbsp;หลังบำบัด</a>
                       <button class="btn btn-margin btn-outline-danger" onclick="confirmDelete(${row.wq_id},'${row.bf_date}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>
                       <button class="btn btn-margin btn-outline-success" onclick="getChart(${row.wq_id})"><i class="bi bi-bar-chart-fill"></i>&nbsp;ดูค่าที่ตรวจวัด</button>`
                }
            }
        ],
        columnDefs: [
            { className: 'text-center', targets: [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
        ],
        order: [[4, "desc"]],
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
    mg = L.layerGroup();
    d.map(i => {
        if (i.geojson) {
            let json = JSON.parse(i.geojson);
            mk = L.geoJson(json, {
                name: "marker"
            })
                .bindPopup(`<h6><b>ระบบ :</b> ${i.syst}</h6><h6><b>จังหวัด :</b> ${i.prov}</h6><h6><b>วันที่รายงาน :</b> ${i.bf_date}</h6>`)
            // .addTo(map)
            mg.addLayer(mk);
        }

    });
    mg.addTo(map)
    lyrControl.addOverlay(mg, "ตำแหน่งนำเข้าข้อมูล")
}

let geneChart = (arr, div, tt, unit) => {
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create(div, am4charts.XYChart);

    // Add data
    chart.data = arr

    var title = chart.titles.create();
    title.text = tt;
    title.fontSize = 18;
    title.marginBottom = 5;

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "cat";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    var axis = chart.yAxes.push(new am4charts.ValueAxis());
    axis.paddingLeft = 5;
    axis.paddingRight = 5;
    // axis.layout = "absolute";

    axis.title.text = unit;
    axis.title.rotation = 270;
    axis.title.align = "center";
    axis.title.valign = "top";
    axis.title.dy = 20;

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

let getStation = (syst) => {
    axios.post(url + "/wq-api/getdatabystation", { syst: syst }).then(async (r) => {
        // console.log(r);
        let cbod = [];
        let ccod = [];
        let cdo = [];
        let cph = [];
        let css = [];
        let ctemp = [];
        await r.data.data.map(i => {
            cbod.push({ date: i.bf_date, value1: i.bf_wq_bod, value2: i.af_wq_bod });
            ccod.push({ date: i.bf_date, value1: i.bf_wq_cod, value2: i.af_wq_cod });
            cdo.push({ date: i.bf_date, value1: i.bf_wq_do, value2: i.af_wq_do });
            cph.push({ date: i.bf_date, value1: i.bf_wq_ph, value2: i.af_wq_ph });
            css.push({ date: i.bf_date, value1: i.bf_wq_ss, value2: i.af_wq_ss });
            ctemp.push({ date: i.bf_date, value1: i.bf_wq_temp, value2: i.af_wq_temp });
        });
        compareChart("c_bod", cbod, "BOD", "(mg/L)");
        compareChart("c_cod", ccod, "COD", "(mg/L)");
        compareChart("c_do", cdo, "DO", "(mg/L)");
        compareChart("c_ph", cph, "pH", "(pH)");
        compareChart("c_ss", css, "SS", "(mg/L)");
        compareChart("c_temp", ctemp, "Temperature", "(°C)");
    })
}


let compareChart = (div, data, label, unit) => {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create(div, am4charts.XYChart);

    // Add data
    chart.data = data;

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = label + " " + unit;

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value1";
    series.dataFields.dateX = "date";
    series.strokeWidth = 2;
    series.name = "ก่อนบำบัด";
    series.minBulletDistance = 10;
    series.tooltipText = "{valueY}";
    series.showOnInit = true;

    // Create series
    var series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "value2";
    series2.dataFields.dateX = "date";
    series2.strokeWidth = 2;
    series2.name = "หลังบำบัด";
    series2.strokeDasharray = "3,4";
    series2.tooltipText = "{valueY}";
    series2.showOnInit = true;

    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");

    var bullethover = bullet.states.create("hover");
    bullethover.properties.scale = 1.3;

    var bullet2 = series2.bullets.push(new am4charts.CircleBullet());
    bullet2.circle.strokeWidth = 2;
    bullet2.circle.radius = 4;
    bullet2.circle.fill = am4core.color("#fff");

    var bullethover2 = bullet2.states.create("hover");
    bullethover2.properties.scale = 1.3;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.fullWidthLineX = true;
    chart.cursor.xAxis = dateAxis;
    chart.cursor.lineX.strokeOpacity = 0;
    chart.cursor.lineX.fill = am4core.color("#000");
    chart.cursor.lineX.fillOpacity = 0.1;

    chart.legend = new am4charts.Legend();

    // Create a horizontal scrollbar with previe and place it underneath the date axis
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);
    chart.scrollbarX.parent = chart.bottomAxesContainer;

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

    dateAxis.start = 0.40;
    dateAxis.keepSelection = true;
}

$("#sta").on("change", function () {
    getStation(this.value)
});

getStation("ทม.แสนสุข (เหนือ)");

var m62, ms62
let layermark = (Url, Nlayer) => {
    var MIcon1 = L.icon({
        iconUrl: './img/arrowup.png',
        iconSize: [18, 18],
        iconAnchor: [10, 5],
        // popupAnchor: [10, 0]
    });

    if (Nlayer == 62) {
        axios.get(Url).then((r) => {
            var d = r.data.features
            // console.log(r.data.features);
            ms62 = L.layerGroup()
            d.map(i => {
                if (i.properties) {
                    m62 = L.marker([i.geometry.coordinates[1], i.geometry.coordinates[0]], { icon: MIcon1 })
                        .bindPopup(`<h6><b>ระบบบำบัดน้ำเสีย :</b> ${i.properties.system}</h6>`)
                    // .addTo(map);
                }
                ms62.addLayer(m62);
            })
            ms62.addTo(map)
            lyrControl.addOverlay(ms62, "ระบบบำบัดน้ำเสียในพื้นที่เขตพัฒนาพิเศษภาคตะวันออก")
        });
    }

}