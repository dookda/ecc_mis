let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let f_water_qua = sessionStorage.getItem('f_water_qua');
$("#usrname").text(urname);
urid ? null : $("#noauth").modal("show");

// if (f_water_qua == 'false') {
//     $("#noauth").modal("show")
//     // location.href = "./../../form_register/login/index.html";
// }

let gotoLogin = () => {
    location.href = "./../../form_register/login/index.html";
}


var L62 = 'https://eec-onep.online/geoserver/eec/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=eec%3Aa__62_w_system_eec&maxFeatures=50&outputFormat=application%2Fjson'

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
    transparent: true,
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

let confirmDelete = (wq_id, prj_name, prov, date) => {
    $("#projId").val(wq_id)
    $("#projName").text(`${prj_name} จ.${prov}`)
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
    let wq_id = $("#projId").val()
    axios.post(url + "/wq-api/deletedata", { wq_id: wq_id }).then(r => {
        r.data.data == "success" ? closeModal() : null
        $('#myTable').DataTable().ajax.reload();
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
        geneChart([{ "cat": "BOD", "value1": r.data.data[0].bf_wq_bod, "value2": r.data.data[0].af_wq_bod }], "wq_bod", "ค่าบีโอดี (BOD)", "mg/L", 0, 20)
        geneChart([{ "cat": "COD", "value1": r.data.data[0].bf_wq_cod, "value2": r.data.data[0].af_wq_cod }], "wq_cod", "ค่าซีโอดี (COD)", "mg/L", 0, 120)
        geneChart([{ "cat": "Conductivity", "value1": r.data.data[0].bf_wq_cond, "value2": r.data.data[0].af_wq_cond }], "wq_cond", "ความนำไฟฟ้า (Conductivity)", "μs/cm", 0, 9999)
        geneChart([{ "cat": "DO", "value1": r.data.data[0].bf_wq_do, "value2": r.data.data[0].af_wq_do }], "wq_do", "ออกซิเจนละลายในน้ำ (dissolved oxygen, DO)", "mg/L", 4, 10)
        geneChart([{ "cat": "FCB", "value1": r.data.data[0].bf_wq_fcb, "value2": r.data.data[0].af_wq_fcb }], "wq_fcb", "แบคทีเรียกลุ่มฟีคอลโคลิฟอร์ม (Fecal Coliform Bacteria, FCB)", "MPN /100 ml", 0, 4000)
        geneChart([{ "cat": "Oil&Grease", "value1": r.data.data[0].bf_wq_og, "value2": r.data.data[0].af_wq_og }], "wq_og", "น้ำมันและไขมัน (Oil&Grease)", "mg/L", 0, 5)
        geneChart([{ "cat": "pH", "value1": r.data.data[0].bf_wq_ph, "value2": r.data.data[0].af_wq_ph }], "wq_ph", "ความเป็นกรด-ด่าง (pH)", "pH", 5.5, 9)
        geneChart([{ "cat": "Salinity", "value1": r.data.data[0].bf_wq_sal, "value2": r.data.data[0].af_wq_sal }], "wq_sal", "ความเค็ม (Salinity)", "PPT", 0, 100)
        geneChart([{ "cat": "SeS", "value1": r.data.data[0].bf_wq_ses, "value2": r.data.data[0].af_wq_ses }], "wq_ses", "ค่าตะกอนหนัก (Settleable Solids: SeS)", "mg/L", 0, 0.5)
        geneChart([{ "cat": "SS", "value1": r.data.data[0].bf_wq_ss, "value2": r.data.data[0].af_wq_ss }], "wq_ss", "ของแข็งแขวนลอย (Suspended Solids: SS)", "mg/L", 0, 50)
        geneChart([{ "cat": "TCB", "value1": r.data.data[0].bf_wq_tcb, "value2": r.data.data[0].af_wq_tcb }], "wq_tcb", "โคลิฟอร์มแบคทีเรียทั้งหมด (Total Coliform Bacteria, TCB)", "MPN /100 ml", 0, 20000)
        geneChart([{ "cat": "TDS", "value1": r.data.data[0].bf_wq_tds, "value2": r.data.data[0].af_wq_tds }], "wq_tds", "ของแข็งละลายน้ำ (Total Dissolved Solids, TDS)", "mg/L", 0, 500)
        geneChart([{ "cat": "Temperature", "value1": r.data.data[0].bf_wq_temp, "value2": r.data.data[0].af_wq_temp }], "wq_temp", " อุณหภูมิ (Temperature) ", "Celsius", 20, 40)
        geneChart([{ "cat": "TKN", "value1": r.data.data[0].bf_wq_tkn, "value2": r.data.data[0].af_wq_tkn }], "wq_tkn", "ไนโตรเจนในรูปทีเคเอ็น (TKN)", "mg/L", 0, 40)
        geneChart([{ "cat": "TN", "value1": r.data.data[0].bf_wq_tn, "value2": r.data.data[0].af_wq_tn }], "wq_tn", "ไนโตรเจนทั้งหมด (TN)", "mg–N/l", 0, 1000)
        geneChart([{ "cat": "TP", "value1": r.data.data[0].bf_wq_tp, "value2": r.data.data[0].af_wq_tp }], "wq_tp", "ฟอสฟอรัสทั้งหมด (TP)", "mg–P/l", 0, 1000)
        geneChart([{ "cat": "Turbidity", "value1": r.data.data[0].bf_wq_turb, "value2": r.data.data[0].af_wq_turb }], "wq_turb", "ความขุ่น (Turbidity)", "NTU", 0, 1000)
    })

}

let loadTable = (daturl, dattype) => {
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
    let dtable = $('#myTable').DataTable({
        ajax: {
            type: "POST",
            url: daturl,
            data: dattype,
            dataSrc: 'data'
        },
        columns: [
            // { data: 'prj_name' },
            {
                data: null,
                render: function (data, type, row, meta) {
                    // console.log(data);
                    return `
                       <button class="btn btn-margin btn-info" onclick="getBF(${row.wq_id})"><i class="bi bi-gear-fill"></i>&nbsp;แก้ไขข้อมูลก่อนบำบัด</button>
                       <button class="btn btn-margin btn-info" onclick="getAF(${row.wq_id})"><i class="bi bi-gear-fill"></i>&nbsp;แก้ไขข้อมูลหลังบำบัด</button>
                       <button class="btn btn-margin btn-danger" onclick="confirmDelete(${row.wq_id},'${row.syst}','${row.prov}','${row.bf_date}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>`
                }
            },
            {
                data: '',
                render: (data, type, row) => {
                    return ` <span class="badge bg-info text-white">${row.id}</span>`
                }
            },
            { data: 'prov' },
            { data: 'syst' },
            {
                data: 'bf_date'
            },

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
        // console.log(data)
        getMarker(data);
        stationList(data)
    });
}
let getBF = (e) => {
    sessionStorage.setItem('wq_id', e);
    sessionStorage.setItem('wq_report', 'admin');
    location.href = `./../edit_bf/index.html?id=${e}`;
}
let getAF = (e) => {
    sessionStorage.setItem('wq_id', e);
    sessionStorage.setItem('wq_report', 'admin');
    location.href = `./../edit_af/index.html?id=${e}`;
}
var mk, mg
let getMarker = (d) => {
    map.eachLayer(i => {
        i.options.name == "marker" ? map.removeLayer(i) : null;
    });
    // console.log(d)  
    if (!mg) {
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
}

let geneChart = (arr, div, tt, unit, min, max, value) => {
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create(div, am4charts.XYChart);
    chart.legend = new am4charts.Legend()
    chart.legend.position = 'bottom'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95

    // Add data
    chart.data = arr
    // console.log(arr)

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
    function createSeries(field, name) {
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = field;
        series.dataFields.categoryX = "cat";
        series.name = name;
        series.columns.template.tooltipText = "{name}: [bold]{valueY.formatNumber('###,###,###.##')}[/]";
        series.columns.template.fillOpacity = .8;

        var columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;

        if (field == "value1") {
            if (arr[0].value1 >= max) {
                series.stroke = am4core.color("#d32f2f");
                series.tooltip.getFillFromObject = false;
                series.tooltip.background.fill = am4core.color("#d32f2f");
                series.columns.template.stroke = am4core.color("#d32f2f");
                series.columns.template.fill = am4core.color("#d32f2f");
            }


            else if (arr[0].value1 < max) {
                series.stroke = am4core.color("#7e57c2");
                series.tooltip.getFillFromObject = false;
                series.tooltip.background.fill = am4core.color("#7e57c2");
                series.columns.template.stroke = am4core.color("#7e57c2");
                series.columns.template.fill = am4core.color("#7e57c2");
            }
        }
        else if (field == "value2") {
            if (arr[0].value2 >= max) {
                series.stroke = am4core.color("#d32f2f");
                series.tooltip.getFillFromObject = false;
                series.tooltip.background.fill = am4core.color("#d32f2f");
                series.columns.template.stroke = am4core.color("#d32f2f");
                series.columns.template.fill = am4core.color("#d32f2f");
            }
            else if (arr[0].value2 < max) {
                series.stroke = am4core.color("#57C2B4");
                series.tooltip.getFillFromObject = false;
                series.tooltip.background.fill = am4core.color("#57C2B4");
                series.columns.template.stroke = am4core.color("#57C2B4");
                series.columns.template.fill = am4core.color("#57C2B4");
            }
        }
    }

    createSeries("value1", "ก่อนบำบัด");
    createSeries("value2", "หลังบำบัด");


    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.align = "left";
    chart.exporting.menu.verticalAlign = "top";
    // chart.exporting.adapter.add("data", function (data, target) {
    //     var data = [];
    //     chart.series.each(function (series) {
    //         for (var i = 0; i < series.data.length; i++) {
    //             series.data[i].name = series.name;
    //             data.push(series.data[i]);
    //         }
    //     });
    //     return { data: data };
    // });
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

    var indicator2;
    function showIndicator2() {
        if (indicator2) {
            indicator2.show();
        }
        else {
            indicator2 = chart.tooltipContainer.createChild(am4core.Container);
            indicator2.background.fill = am4core.color("#fff");
            indicator2.background.fillOpacity = 0.8;
            indicator2.width = am4core.percent(100);
            indicator2.height = am4core.percent(100);

            var indicatorLabel = indicator2.createChild(am4core.Label);
            indicatorLabel.text = "ไม่มีข้อมูล";
            indicatorLabel.align = "center";
            indicatorLabel.valign = "middle";
            indicatorLabel.fontSize = 20;
        }
    }

    chart.events.on("beforedatavalidated", function (ev) {
        // console.log()
        let data = ev.target.data
        if (ev.target.data.length == 0) {
            showIndicator();
        } else if (ev.target.data.length == 1) {
            if (data[0].value1 == null && data[0].value2 == null) {
                showIndicator2();
            }
        }
    });
}
let provStation = (prov) => {
    var provnam = prov
    axios.post(url + "/wq-api/stationbyprov", { prov: provnam }).then(r => {
        var data = r.data.data.filter(e => e.syst !== null);
        data.map(i => {
            $("#sta").append(`<option value="${i.syst}">${i.syst}</option>`)
        })
    })
}
provStation();

let compareChart = (div, data, label, unit, min1, max1, min2, max2) => {
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
    // series.tooltipText = "{valueY}";
    series.showOnInit = true;
    series.stroke = am4core.color("#7e57c2");

    var bullet_s1 = series.bullets.push(new am4charts.CircleBullet());
    bullet_s1.circle.strokeWidth = 3;
    bullet_s1.circle.radius = 4;
    bullet_s1.circle.fill = am4core.color("#fff");
    // bullet.circle.stroke = am4core.color("#7e57c2");
    bullet_s1.adapter.add("stroke", function (fill, target) {
        if (target.dataItem.valueY > min2) {
            return am4core.color("#E53935");
        }
        else if (target.dataItem.valueY <= max1) {
            return am4core.color("#E53935");
        } return am4core.color("#7e57c2");

    })

    var bullet2_s1 = series.bullets.push(new am4charts.Bullet());
    bullet2_s1.tooltipText = `ก่อนบำบัด : [bold]{valueY.formatNumber('###,###,###.##')} ${unit}[/]`;
    bullet2_s1.adapter.add("fill", function (fill, target) {
        if (target.dataItem.valueY > min2) {
            return am4core.color("#E53935");
        }
        else if (target.dataItem.valueY <= max1) {
            return am4core.color("#E53935");
        } else {
            return am4core.color("#7e57c2");

        } return fill
    })
    var bullethover = bullet_s1.states.create("hover");
    bullethover.properties.scale = 1.3;

    var range_s1 = valueAxis.createSeriesRange(series);
    range_s1.value = min1;
    range_s1.endValue = max1;
    range_s1.contents.stroke = am4core.color("#E53935");
    range_s1.contents.fill = range_s1.contents.stroke;


    var range2_s1 = valueAxis.createSeriesRange(series);
    range2_s1.value = min2;
    range2_s1.endValue = max2;
    range2_s1.contents.stroke = am4core.color("#E53935");
    range2_s1.contents.fill = range2_s1.contents.stroke;

    ////////////////////////////////////////////////////////////// Create series2/////////////////////////////////////////////////////
    var series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "value2";
    series2.dataFields.dateX = "date";
    series2.strokeWidth = 2;
    series2.name = "หลังบำบัด";
    series2.strokeDasharray = "3,4";
    // series2.tooltipText = "{valueY}";
    series2.showOnInit = true;
    series2.stroke = am4core.color("#039be5");

    var bullet_s2 = series2.bullets.push(new am4charts.CircleBullet());
    bullet_s2.circle.strokeWidth = 3;
    bullet_s2.circle.radius = 4;
    bullet_s2.circle.fill = am4core.color("#fff");
    // bullet.circle.stroke = am4core.color("#039be5");
    bullet_s2.adapter.add("stroke", function (fill, target) {
        if (target.dataItem.valueY > min2) {
            return am4core.color("#E53935");
        }
        else if (target.dataItem.valueY < max1) {
            return am4core.color("#E53935");
        } return am4core.color("#039be5");

    })

    var bullet2_s2 = series2.bullets.push(new am4charts.Bullet());
    bullet2_s2.tooltipText = `หลังบำบัด : [bold]{valueY.formatNumber('###,###,###.##')} ${unit}[/]`;;
    bullet2_s2.adapter.add("fill", function (fill, target) {
        if (target.dataItem.valueY > min2) {
            return am4core.color("#E53935");
        }
        else if (target.dataItem.valueY <= max1) {
            return am4core.color("#E53935");
        } else {
            return am4core.color("#039be5");

        } return fill
    })

    var bullethover2 = bullet_s2.states.create("hover");
    bullethover2.properties.scale = 1.3;


    var range_s2 = valueAxis.createSeriesRange(series2);
    range_s2.value = min1;
    range_s2.endValue = max1;
    range_s2.contents.stroke = am4core.color("#E53935");
    range_s2.contents.fill = range_s2.contents.stroke;


    var range2_s2 = valueAxis.createSeriesRange(series2);
    range2_s2.value = min2;
    range2_s2.endValue = max2;
    range2_s2.contents.stroke = am4core.color("#E53935");
    range2_s2.contents.fill = range2_s2.contents.stroke;

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

    // dateAxis.start = 0.40;
    dateAxis.keepSelection = true;
}

$("#sta").on("change", function () {
    // console.log(this.value)
    var sta_n = $("#sta").children("option:selected").text()
    if (this.value !== "ทุกสถานีตรวจวัดค่า") {
        $("#myTable").dataTable().fnDestroy();
        loadTable(url + '/wq-api/getownerdatabystation', { syst: sta_n, usrid: urid })
    } else {
        var prov_n = $("#prov").children("option:selected").text()
        if (prov_n !== "ทุกจังหวัด") {
            $("#myTable").dataTable().fnDestroy();
            loadTable(url + '/wq-api/getdatabyprov', { prov: prov_n, usrid: urid })
        } else {
            $("#myTable").dataTable().fnDestroy();
            loadTable(url + 'wq-api/getownerdata', { usrid: urid })
        }
    }
    zoomsta(sta_n)

    $("#parameter").empty()
    $("#parameter").append(`
        <option>เลือก</option>
        <option value="BOD">BOD</option>
        <option value="COD">COD</option>
        <option value="DO">DO</option>
        <option value="PH">pH</option>
        <option value="SS">SS</option>
        <option value="TEMP">TEMP</option>
    `)

});
$("#prov").on("change", function () {
    var prov_n = $("#prov").children("option:selected").text()
    $("#sta").empty().append('<option value="ทุกสถานีตรวจวัดค่า">ทุกสถานีตรวจวัดค่า</option>');
    if (this.value == "ทุกจังหวัด") {
        $('#chartall').hide();
        provStation(prov_n);
        zoomExtent("pro", "eec")

        $("#myTable").dataTable().fnDestroy();
        loadTable(url + '/wq-api/getdata', { type: "ทุกจังหวัด" })
    } else {
        // $("#sta").empty()
        provStation(prov_n);
        zoomExtent("pro", this.value)

        $("#myTable").dataTable().fnDestroy();
        loadTable(url + '/wq-api/getdatabyprov', { prov: prov_n })
    }
});

$("#chartall").hide()
let callChart = () => {
    $("#chartall").show();
    var syst = $("#sta").val();
    var staname = $("#sta").children("option:selected").text()
    var prov_n = $("#prov").children("option:selected").text()
    var parameter = $("#parameter").val();

    if (syst == "ทุกสถานีตรวจวัดค่า") {
        if (prov_n !== "ทุกจังหวัด") {
            $('#staname').html(` ${parameter} ของจังหวัด${prov_n} ${staname} `)
        } else {
            $('#staname').html(` ${parameter} ของ${prov_n} ${staname} `)
        }
        var syst_n = []
        var provnam = prov_n
        axios.post(url + "/wq-api/stationbyprov", { prov: provnam }).then(r => {
            var data = r.data.data.filter(e => e.syst !== null);
            data.map(i => {
                syst_n.push({ syst_n: i.syst })
            })
            chartstaall(syst_n)
        })
    } else {
        $('#staname').html(` ${parameter} ของสถานี ${staname} `)
        axios.post(url + "/wq-api/getdata/chartbystation", { syst: syst }).then(async (r) => {
            let cbod = [];
            let ccod = [];
            let cdo = [];
            let cph = [];
            let css = [];
            let ctemp = [];
            // console.log(r);
            await r.data.data.map(i => {
                // var b = i.bf_date.split("-");
                // var bf_date = `${b[2]}-${b[1]}-${b[0]}`
                // console.log(i)

                cbod.push({ date: i.bf_date, value1: i.bf_wq_bod, value2: i.af_wq_bod });
                ccod.push({ date: i.bf_date, value1: i.bf_wq_cod, value2: i.af_wq_cod });
                cdo.push({ date: i.bf_date, value1: i.bf_wq_do, value2: i.af_wq_do });
                cph.push({ date: i.bf_date, value1: i.bf_wq_ph, value2: i.af_wq_ph });
                css.push({ date: i.bf_date, value1: i.bf_wq_ss, value2: i.af_wq_ss });
                ctemp.push({ date: i.bf_date, value1: i.bf_wq_temp, value2: i.af_wq_temp });
            });
            if (parameter == "BOD") {
                compareChart("divchart", cbod, "BOD", "mg/L", 0, 0, 20, 500);
            }
            else if (parameter == "COD") {
                compareChart("divchart", ccod, "COD", "mg/L", 0, 0, 120, 1000);
            }
            else if (parameter == "DO") {
                compareChart("divchart", cdo, "DO", "mg/L", 0, 4, 10, 100);
            }
            else if (parameter == "PH") {
                compareChart("divchart", cph, "pH", "pH", 0, 5.5, 9, 9999999);
            }
            else if (parameter == "SS") {
                compareChart("divchart", css, "SS", "mg/L", 0, 0, 50, 1000);
            }
            else if (parameter == "TEMP") {
                compareChart("divchart", ctemp, "Temperature", "°C", 0, 20, 40, 100);
            }
        })
    }
}
let chartstaall = (data) => {
    var sta = data
    var parameter = $("#parameter").val();
    var setDatBOD = [];
    var setDatCOD = [];
    var setDatDO = [];
    var setDatPH = [];
    var setDatSS = [];
    var setDatTEMP = [];

    let a = sta.map(i => {
        axios.post(url + '/wq-api/getdatabystation', { syst: i.syst_n }).then(r => {
            var data = r.data.data
            var length = data.length - 1
            setDatBOD.push({ category: data[length].syst, first: data[length].af_wq_bod, second: data[length].bf_wq_bod });
            setDatCOD.push({ category: data[length].syst, first: data[length].af_wq_cod, second: data[length].bf_wq_cod });
            setDatDO.push({ category: data[length].syst, first: data[length].af_wq_do, second: data[length].bf_wq_do });
            setDatPH.push({ category: data[length].syst, first: data[length].af_wq_ph, second: data[length].bf_wq_ph });
            setDatSS.push({ category: data[length].syst, first: data[length].af_wq_ss, second: data[length].bf_wq_ss });
            setDatTEMP.push({ category: data[length].syst, first: data[length].af_wq_temp, second: data[length].bf_wq_temp });

            if (parameter == "BOD") {
                chartall(setDatBOD, "BOD", "(mg/L)")
            } else if (parameter == "COD") {
                chartall(setDatCOD, "COD", "(mg/L)")
            } else if (parameter == "DO") {
                chartall(setDatDO, "DO", "(mg/L)")
            } else if (parameter == "PH") {
                chartall(setDatPH, "pH", "(pH)")
            } else if (parameter == "SS") {
                chartall(setDatSS, "SS", "(mg/L)")
            } else if (parameter == "TEMP") {
                chartall(setDatTEMP, "Temperature", "(°C)")
            }
        })
    })
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
    })
}
let chartall = (data, label, unit) => {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("divchart", am4charts.XYChart);

    // Add percent sign to all numbers
    chart.numberFormatter.numberFormat = "#.#";
    chart.legend = new am4charts.Legend()
    // chart.legend.position = 'bottom'
    // chart.legend.paddingBottom = 20
    // chart.legend.labels.template.maxWidth = 95

    // Add data
    chart.data = data
    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
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
    series.dataFields.valueY = "second";
    series.dataFields.categoryX = "category";
    series.clustered = false;
    series.name = 'ก่อนบำบัด'
    series.tooltipText = `ก่อนบำบัด {categoryX}: [bold]{valueY}[/] ${unit}`;
    series.stroke = am4core.color('#7e57c2');
    series.tooltip.getFillFromObject = false;
    series.tooltip.background.fill = am4core.color('#7e57c2');
    series.columns.template.stroke = am4core.color('#7e57c2');
    series.columns.template.fill = am4core.color('#7e57c2');

    var series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.dataFields.valueY = "first";
    series2.dataFields.categoryX = "category";
    series2.clustered = false;
    series2.name = 'หลังบำบัด'
    series2.columns.template.width = am4core.percent(50);
    series2.tooltipText = `หลังบำบัด {categoryX}: [bold]{valueY}[/] ${unit}`;
    series2.stroke = am4core.color('#4fc3f7');
    series2.tooltip.getFillFromObject = false;
    series2.tooltip.background.fill = am4core.color('#4fc3f7');
    series2.columns.template.stroke = am4core.color('#4fc3f7');
    series2.columns.template.fill = am4core.color('#4fc3f7');

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

let zoomsta = (sta) => {
    axios.get(L62).then((r) => {
        var d = r.data.features
        d.map(i => {
            if (i.properties.system == sta) {
                var popup = L.popup()
                    .setLatLng([i.geometry.coordinates[1], i.geometry.coordinates[0]])
                    .setContent(`<h6><b>ระบบบำบัดน้ำเสีย :</b> ${i.properties.system}</h6>`)
                    .openOn(map);
                map.setView([i.geometry.coordinates[1], i.geometry.coordinates[0]], 12);
                // console.log(i.properties.station_n)
            } else {
                // zoommap2(sta)
            }
        })
    })

    if (sta == "ทุกสถานีตรวจวัดค่า") {
        map.closePopup();
        var code = $('#prov').val()
        console.log(code)
        if (code == "ทุกจังหวัด") {
            zoomExtent("pro", "eec")
        } else {
            zoomExtent("pro", code)
        }
    }
}

$("#parameter").on("change", function () {
    callChart()
})

let stationList = (data) => {
    // console.log(data);
    $("#station").empty()
    data.map(i => $("#station").append(`<option value="${i.wq_id}">${i.syst} (เลข id:${i.wq_id} วันที่ ${i.bf_date})</option>`))
}

$("#station").on("change", function () {
    getChart(this.value)
})


$(document).ready(() => {
    loadTable(url + '/wq-api/getdata', { type: "ทุกจังหวัด", usrid: urid })
    layermark(L62, 62)
    checkdata()
});

let checkdata = async () => {
    await axios.post(url + '/wq-api/getdata', { type: "ทุกจังหวัด", usrid: urid }).then(r => {
        let d = r.data.data
        // console.log(r.data.data)
        if (f_water_qua == 'false') {
            $("#noauth").modal("show")
        } else {
            $("#noauth").modal("hide")
            if (d.length == 0) {
                $("#warningModal2").modal("show")
            } else {
                $("#warningModal2").modal("hide")
            }
        }
    })
}




