let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let f_seawater_qua = sessionStorage.getItem('f_seawater_qua');
$("#usrname").text(urname);
urid ? null : $("#noauth").modal("show");

// if (f_seawater_qua == 'false') {
//     $("#noauth").modal("show")
//     // location.href = "./../../form_register/login/index.html";
// }

let gotoLogin = () => {
    location.href = "./../../form_register/login/index.html";
}

var L61 = 'https://engrids.soc.cmu.ac.th/geoserver/eec/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=eec%3Aa__61_sea_eec&maxFeatures=50&outputFormat=application%2Fjson'


const url = "https://engrids.soc.cmu.ac.th/api";


let latlng = {
    lat: 13.305567,
    lng: 101.383101
};

let map = L.map('map', {
    center: latlng,
    zoom: 10
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

// const seaeec = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
//     layers: 'eec:a__61_sea_eec',
//     format: 'image/png',
//     transparent: true,
// });
const mangrovelu = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
    layers: 'eec:a__39_mangrovelu',
    format: 'image/png',
    transparent: true,
});
const pollution = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
    layers: 'eec:a__81_pollution_group',
    format: 'image/png',
    transparent: true,
});


const coastalradar = L.tileLayer.wms("https://ocean.gistda.or.th/geoserver/coastalradar/wms?", {
    layers: "coastalradar:recent_gulf,coastalradar:v_recent_gul5",
    name: "lyr",
    format: "image/png",
    transparent: true
});


const coastalmon59 = L.tileLayer.wms("http://marinegiscenter.dmcr.go.th/cgi-bin/mapserv.exe?MAP=%2Fms4w%2Fapps%2Fgeomoose2%2Fmaps%2F%2Fdmcr%2Fgroup1%2Fshoreline_2559.map", {
    layers: "shoreline_2559",
    name: "lyr",
    format: "image/png",
    crs: L.CRS.EPSG3857,
    transparent: true
});
const coastalmon60 = L.tileLayer.wms("http://marinegiscenter.dmcr.go.th/cgi-bin/mapserv.exe?MAP=%2Fms4w%2Fapps%2Fgeomoose2%2Fmaps%2F%2Fdmcr%2Fgroup1%2Fshoreline2560.map", {
    layers: "shoreline2560",
    name: "lyr",
    format: "image/png",
    crs: L.CRS.EPSG3857,
    transparent: true
});
const coastalmon61 = L.tileLayer.wms("http://marinegiscenter.dmcr.go.th/cgi-bin/mapserv.exe?MAP=%2Fms4w%2Fapps%2Fgeomoose2%2Fmaps%2F%2Fdmcr%2Fgroup1%2Fshoreline2561_erosion_geo_status_erosion.map", {
    layers: "shoreline2561_erosion_geo_status_erosion",
    name: "lyr",
    format: "image/png",
    crs: L.CRS.EPSG3857,
    transparent: true
});
const coastalmon62 = L.tileLayer.wms("http://marinegiscenter.dmcr.go.th/cgi-bin/mapserv.exe?MAP=%2Fms4w%2Fapps%2Fgeomoose2%2Fmaps%2F%2Fdmcr%2Fgroup1%2Fstatuscoast2562.map", {
    layers: "statuscoast2562",
    name: "lyr",
    format: "image/png",
    crs: L.CRS.EPSG3857,
    transparent: true
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
    "การใช้ประโยชน์ที่ดินป่าชายเลน": mangrovelu,
    "ข้อมูลความเร็วและทิศทางกระแสน้ำจากระบบเรดาร์ชายฝั่ง บริเวณอ่าวไทยตอนบนและภาคตะวันออก (ที่มา: gistda)": coastalradar,
    "สถานการณ์การกัดเซาะชายฝั่ง ปี 2559": coastalmon59,
    "สถานการณ์การกัดเซาะชายฝั่ง ปี 2560": coastalmon60,
    "สถานการณ์การกัดเซาะชายฝั่ง ปี 2561": coastalmon61,
    "สถานการณ์การกัดเซาะชายฝั่ง ปี 2562": coastalmon62
    // "จุดวัดคุณภาพน้ำทะเล": seaeec.addTo(map),
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
        div.innerHTML += '<i style="background: #2febc9; border-radius: 50%;"></i><span>จุดวัดคุณภาพน้ำทะเล</span><br>';
        div.innerHTML += '<img src="./Marker/Mark.png" width="10px"><span>ตำแหน่งนำเข้าข้อมูล</span><br>';
        div.innerHTML += `<button class="btn btn-sm" onClick="Luop()" id="LUOP">
        <span class="kanit">การใช้ประโยชน์ที่ดินป่าชายเลน</span><i class="fa fa-angle-double-down" aria-hidden="true"></i>
      </button>`
        div.innerHTML += `<div id='LU'></div>`
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
function Luop() {
    $('#LUOP').hide()
    $('#LU').html(`<button class="btn btn-sm" onClick="Luclose()" id="LUCLOSE">
    <span class="kanit">การใช้ประโยชน์ที่ดินป่าชายเลน</span><i class="fa fa-angle-double-up" aria-hidden="true"></i></button><br>
    <i style="background: #000004; border-radius: 1%;"></i><span>ไม่มีข้อมูล</span><br>
    <i style="background: #231151; border-radius: 1%;"></i><span>ท่าเทียบเรือ</span><br>
    <i style="background: #5e177f; border-radius: 1%;"></i><span>นากุ้ง</span><br>
    <i style="background: #982c80; border-radius: 1%;"></i><span>นาเกลือ</span><br>
    <i style="background: #d3426e; border-radius: 1%;"></i><span>ป่าชายเลน</span><br>
    <i style="background: #f8765c; border-radius: 1%;"></i><span>พื้นที่ทิ้งร้าง</span><br>
    <i style="background: #febb80; border-radius: 1%;"></i><span>เมืองและสิ่งก่อสร้าง</span><br>
    <i style="background: #fcfdbf; border-radius: 1%;"></i><span>เลนงอก</span><br></div>`)
}
function Luclose() {
    $('#LUOP').show()
    $('#LU').html('')
}
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

let confirmDelete = (sq_id, prj_name, date) => {
    $("#projId").val(sq_id)
    $("#projName").text(prj_name)
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
    let sq_id = $("#projId").val()
    axios.post(url + "/sq-api/delete", { sq_id: sq_id }).then(r => {
        r.data.data == "success" ? closeModal() : null
        $('#myTable').DataTable().ajax.reload();
    })
}

$("#chartdiv").hide()
function getChart(sq_id) {
    let obj = {
        sq_id: sq_id
    }
    axios.post(url + "/sq-api/getone", obj).then((r) => {
        $("#chartdiv").show()
        // console.log(r.data.data[0]);
        geneChart([{ "cat": "ค่าดีโอ", "value": r.data.data[0].sq_do }], "sq_do", "ค่าดีโอ", "mg/L", 4, 10);
        geneChart([{ "cat": "ปริมาณแบคทีเรียกลุ่มโคลิฟอร์มทั้งหมด", "value": r.data.data[0].sq_tcb }], "sq_tcb", "ปริมาณแบคทีเรียกลุ่มโคลิฟอร์มทั้งหมด", "MPN/100ml", 0, 1000,);
        geneChart([{ "cat": "ฟอสเฟต-ฟอสฟอรัส", "value": r.data.data[0].sq_po43p }], "sq_po43p", "ฟอสเฟต-ฟอสฟอรัส", "μg-P/l", 0, 45);
        geneChart([{ "cat": "ไนเตรท-ไนโตรเจน", "value": r.data.data[0].sq_no3n }], "sq_no3n", "ไนเตรท-ไนโตรเจน", "μg-N/l", 0, 60);
        geneChart([{ "cat": "อุณหภูมิ", "value": r.data.data[0].sq_temp }], "sq_temp", "อุณหภูมิ", "ºC", 0, 100);
        geneChart([{ "cat": "สารแขวนลอย", "value": r.data.data[0].sq_ss }], "sq_ss", "สารแขวนลอย", "", 0, 1000);
        geneChart([{ "cat": "ค่าความเป็นกรด-ด่าง", "value": r.data.data[0].sq_ph }], "sq_ph", "ค่าความเป็นกรด ด่าง", "pH", 7, 8.5);
        geneChart([{ "cat": "ปริมาณแอมโมเนีย", "value": r.data.data[0].sq_nh3 }], "sq_nh3", "ปริมาณแอมโมเนีย", "μg-N/l", 0, 0.5);
        geneChart([{ "cat": "ค่ามาตรฐานคุณภาพน้ำทะเล", "value": r.data.data[0].sq_mwqi }], "sq_mwqi", "ค่ามาตรฐานคุณภาพน้ำทะเล", "", 0, 100);
        geneChart([{ "cat": "ปริมาณสารตะกั่ว", "value": r.data.data[0].sq_pb }], "sq_pb", "ปริมาณสารตะกั่ว", "μg/l", 0, 8.5);
    })
}
let dtable
let loadTable = (type, dat) => {
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
    dtable = $('#myTable').DataTable({
        ajax: {
            type: "POST",
            url: url + '/sq-api/getdata/user',
            data: { type, dat, usrid: urid },
            dataSrc: 'data'
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return `<button class="btn btn-margin btn-info" onclick="getDetail(${row.sq_id})"><i class="bi bi-bar-chart-fill"></i>&nbsp;แก้ไขข้อมูล</button>
                       <button class="btn btn-margin btn-danger" onclick="confirmDelete(${row.sq_id},'${row.sta_loc}','${row.date}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>`
                    //    <button class="btn btn-margin btn-success" onclick="getChart(${row.sq_id})"><i class="bi bi-bar-chart-fill"></i>&nbsp;แสดงกราฟ</button>
                }
            },
            {
                data: null
            },
            { data: 'sta_loc' },
            // { data: 'prov' },
            { data: 'date' },

            { data: 'sq_do' },
            { data: 'sq_tcb' },
            { data: 'sq_po43p' },
            { data: 'sq_no3n' },
            { data: 'sq_temp' },
            { data: 'sq_ss' },
            { data: 'sq_ph' },
            { data: 'sq_nh3' },
            { data: 'sq_mwqi' },
            { data: 'sq_pb' },
            // { data: 'opert_stat' },
        ],
        columnDefs: [
            { className: 'text-center', targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
            { type: 'date-uk', targets: 3 },
            {
                "searchable": false,
                "orderable": false,
                "targets": 1
            }
        ],
        order: [[3, "desc"]],
        searching: true,
        scrollX: true,
        dom: 'Bfrtip',
        buttons: [
            'excel', 'print'
        ],
    });

    dtable.on('search.dt', function () {
        let data = dtable.rows({ search: 'applied' }).data()
        // console.log(data);
        getMarker(data);
        stationList(data);
    });
    dtable.on('order.dt search.dt', function () {
        dtable.column(1, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
}


let getMarker = (d) => {
    // console.log(d)
    map.eachLayer(i => {
        i.options.name == "marker" ? map.removeLayer(i) : null;
    });

    let mg = L.layerGroup();
    d.map(i => {
        // console.log(i);
        if (i.geojson) {
            let json = JSON.parse(i.geojson);
            // console.log(json)
            var mk = L.geoJson(json, {
                name: "marker",
                // onEachFeature: onEachFeature
            }).bindPopup(`<h6><b>สถานี :</b> ${i.sta_loc}</h6><h6><b>จังหวัด :</b> ${i.pro}</h6><h6><b>วันที่รายงาน :</b> ${i.date}</h6>`)
            mg.addLayer(mk);
        }

    });
    mg.addTo(map)
    lyrControl.addOverlay(mg, "ตำแหน่งนำเข้าข้อมูล")
}

let getDetail = (e) => {
    sessionStorage.setItem('sq_gid', e);
    sessionStorage.setItem('sq_from_admin', 'yes');
    location.href = "./../detail/index.html";
}


let geneChart = (arr, div, tt, unit, min, max, value) => {
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create(div, am4charts.XYChart);

    chart.data = arr
    // console.log(arr)

    var title = chart.titles.create();
    title.text = tt;
    // title.align = "center";
    title.fontSize = 14;
    title.marginBottom = 12;
    title.fontWeight = 600;
    title.paddingLeft = 50;

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
    // axis.title.valign = "top";
    // axis.title.dy = 40;

    // Create series
    function createSeries(field, name) {
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = field;
        series.dataFields.categoryX = "cat";
        series.name = name;
        series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;

        var columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;

        if (field == "value") {
            if (arr[0].value > max) {
                series.stroke = am4core.color("#e53935");
                series.tooltip.getFillFromObject = false;
                series.tooltip.background.fill = am4core.color("#e53935");
                series.columns.template.stroke = am4core.color("#e53935");
                series.columns.template.fill = am4core.color("#e53935");
            }

            else if (arr[0].value < max) {
                series.stroke = am4core.color("#00bcd4");
                series.tooltip.getFillFromObject = false;
                series.tooltip.background.fill = am4core.color("#00bcd4");
                series.columns.template.stroke = am4core.color("#00bcd4");
                series.columns.template.fill = am4core.color("#00bcd4");
            }
        }
    }
    createSeries("value", "คุณภาพน้ำทะเล");

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
            indicatorLabel.text = "ไม่มีข้อมูล";
            indicatorLabel.align = "center";
            indicatorLabel.valign = "middle";
            indicatorLabel.fontSize = 20;
            indicatorLabel.paddingLeft = 50;
        }
    }



    chart.events.on("beforedatavalidated", function (ev) {
        // console.log()
        let data = ev.target.data
        if (data[0].value == null) {
            showIndicator();
        }
    });
}

let getDataByPro = (code) => {
    // console.log(code);
    let sq_pro
    if (code == "20") {
        sq_pro = "ชลบุรี"
    } else if (code == "21") {
        sq_pro = "ระยอง"
    } else if (code == "24") {
        sq_pro = "ฉะเชิงเทรา"
    }
    let parameter = $('#parameter').val()
    let sq_po43p = [];
    let sq_no3n = [];
    let sq_ph = [];
    let sq_mwqi = [];

    axios.post(url + "/sq-api/getsummarize", { sq_pro: sq_pro }).then(async (r) => {
        // console.log(r.data.data)
        await r.data.data.map(i => {
            sq_po43p.push({ cat: i.sq_date, dat: i.sq_po43p ? Number(i.sq_po43p) : null });
            sq_no3n.push({ cat: i.sq_date, dat: i.sq_no3n ? Number(i.sq_no3n) : null });
            sq_ph.push({ cat: i.sq_date, dat: i.sq_ph ? Number(i.sq_ph) : null });
            sq_mwqi.push({ cat: i.sq_date, dat: i.sq_mwqi ? Number(i.sq_mwqi) : null });
        });
        if (parameter == "MWQI") {
            lineChart("divchart", sq_mwqi, "ค่ามาตรฐานคุณภาพน้ำทะเล", "MWQI", 0, 0, 100, 500);
        }
        else if (parameter == "PH") {
            lineChart("divchart", sq_ph, "ความเป็นกรด ด่าง", "pH", 0, 7, 8.5, 20);
        }
        else if (parameter == "NN") {
            lineChart("divchart", sq_no3n, "ไนเตรด ไนโตรเจน", "ug - N/l", 0, 0, 60, 500);
        }
        else if (parameter == "FF") {
            lineChart("divchart", sq_po43p, "ฟอสเฟต ฟอสฟอรัส", "ug - P/l", 0, 0, 45, 500);
        }
    })
}

let lineChart = (div, data, label, unit, min1, max1, min2, max2,) => {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create(div, am4charts.XYChart);
    chart.dateFormatter.dateFormat = "dd/MM/yyyy";

    data.sort(function (a, b) {
        return new Date(b.cat) - new Date(a.cat);
    });
    // Add data
    chart.data = data;

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = unit;

    // Create series

    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "dat";
    series.dataFields.dateX = "cat";
    series.strokeWidth = 2;
    series.name = label;
    series.minBulletDistance = 10;
    // series.tooltipText = "{valueY}";
    series.showOnInit = true;
    series.stroke = am4core.color("#00bcd4");

    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 3;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");
    // bullet.circle.stroke = am4core.color("#00bcd4");
    bullet.adapter.add("stroke", function (fill, target) {
        if (target.dataItem.valueY > min2) {
            return am4core.color("#e53935");
        }
        else if (target.dataItem.valueY < max1) {
            return am4core.color("#e53935");
        } return fill;

    })

    var bullet2 = series.bullets.push(new am4charts.Bullet());
    bullet2.tooltipText = `วันที่ {dateX} : [bold]{valueY.formatNumber('###,###,###.##')} ${unit}[/]`;
    bullet2.adapter.add("fill", function (fill, target) {
        if (target.dataItem.valueY > min2) {
            return am4core.color("#e53935");
        }
        else if (target.dataItem.valueY < max1) {
            return am4core.color("#e53935");
        } return am4core.color("#00bcd4");
    })


    var bullethover = bullet.states.create("hover");
    bullethover.properties.scale = 1.3;

    var range = valueAxis.createSeriesRange(series);
    range.value = min1;
    range.endValue = max1;
    range.contents.stroke = am4core.color("#e53935");
    range.contents.fill = range.contents.stroke;

    var range2 = valueAxis.createSeriesRange(series);
    range2.value = min2;
    range2.endValue = max2;
    range2.contents.stroke = am4core.color("#e53935");
    range2.contents.fill = range.contents.stroke;


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
    // chart.events.on('ready', () => {
    //     $("#chartall").slideDown();
    // });
}
// dateAxis.start = 0.50;
// dateAxis.keepSelection = true;


let provStation = (prov) => {
    axios.post(url + "/sq-api/getstation", { prov, type: "user", usrid: urid }).then(r => {
        // console.log(r.data.data);
        var data = r.data.data.filter(e => e.sta_loc !== null);
        $("#parameter").empty();
        $("#sta").empty().append('<option value="ทุกสถานีตรวจวัดค่า">เลือก</option>');
        data.map(i => {
            $("#sta").append(`<option value="${i.sta_loc}">${i.sta_loc}</option>`)
        })
    })
}
// provStation()

let callData = (val) => {
    let prov_n = $("#prov").children("option:selected").text()
    if (val == "eec") {
        getDataByPro(val);
        // loadTable(url + '/sq-api/getdatabyprov', { prov: prov_n })
        // dtable.search(prov_n).draw();
        // $("#sta").empty()

        zoomExtent("pro", "eec")

        $("#myTable").dataTable().fnDestroy();
        loadTable("ทุกจังหวัด", "ทุกจังหวัด");

        provStation(prov_n)
        $('#chartall').hide();
    } else {
        $('#chartall').hide();
        zoomExtent("pro", val)

        $("#myTable").dataTable().fnDestroy();
        loadTable("pro", prov_n);

        provStation(prov_n)
    }
}

$("#chartall").hide();
$("#prov").change(function () {
    callData(this.value)
    $("#chartall").slideUp();
})
$("#sta").change(function () {
    let sta_n = $("#sta").children("option:selected").text()
    let prov_n = $("#prov").children("option:selected").text()
    if (sta_n !== "ทุกสถานีตรวจวัดค่า") {
        dtable.search(sta_n).draw();
    } else {
        dtable.search(prov_n).draw();
    }
    // zoomsta(sta_n)

    $("#chartall").slideUp();
    $("#parameter").empty().append(
        `<option>เลือก</option>
        <option value="MWQI">MWQI</option>
        <option value="NN">ไนเตรท-ไนโตรเจน</option>
        <option value="PH">ค่า pH</option>
        <option value="FF">ฟอสเฟต-ฟอสฟอรัส</option>`
    )

})
$("#parameter").on("change", function () {
    let parameter_n = $('#parameter').children("option:selected").text()
    let parameter = this.value;
    if (parameter_n !== 'เลือก') {
        callChart();


        if (parameter == "MWQI") {
            $('#criterion').empty().html(`ค่า MWQI ไม่กำหนดเกณฑ์มาตรฐาน`);
        }
        else if (parameter == "PH") {
            $('#criterion').empty().html(`<span style="color: #B30D02; font-weight: bold;"> สีแดง </span> หมายถึง ค่าความเป็นกรด-ด่าง ไม่อยู่ในเกณฑ์มาตรฐานช่วงที่ 7 - 8.5`);
        }
        else if (parameter == "NN") {
            $('#criterion').empty().html(`<span style="color: #B30D02; font-weight: bold;"> สีแดง </span> หมายถึง ค่าไนเตรด-ไนโตรเจน ไม่อยู่ในเกณฑ์มาตรฐานช่วงที่ 0 - 60`);
        }
        else if (parameter == "FF") {
            $('#criterion').empty().html(`<span style="color: #B30D02; font-weight: bold;"> สีแดง </span> หมายถึง ค่าฟอสเฟต-ฟอสฟอรัส ไม่อยู่ในเกณฑ์มาตรฐานช่วงที่ 0 - 45`);
        }
    } else {
        $('#chartall').slideUp();
        $('#criterion').empty().text(`ค่าคุณภาพน้ำทะเลและชายฝั่งไม่อยู่ในเกณฑ์มาตรฐาน`);
    }
})

let callChart = () => {
    let sq_pro = $("#prov").children("option:selected").text()
    let sq_sta = $("#sta").children("option:selected").text()
    let parameter = $('#parameter').val()
    let parameter_n = $('#parameter').children("option:selected").text()
    let sta_n = $("#sta").val()
    // console.log(sta_n)

    let sq_po43p = [];
    let sq_no3n = [];
    let sq_ph = [];
    let sq_mwqi = [];
    if (sta_n == "ทุกสถานีตรวจวัดค่า" && sq_pro !== "ทุกจังหวัด") {
        $("#chartall").slideDown();
        $('#staname').html(` ${parameter_n} ของจังหวัด${sq_pro} `)
        axios.post(url + "/sq-api/getsummarize", { sq_pro: sq_pro }).then(async (r) => {
            // console.log(r.data.data)
            await r.data.data.map(i => {
                sq_po43p.push({ cat: i.sq_date, dat: i.sq_po43p ? Number(i.sq_po43p) : null });
                sq_no3n.push({ cat: i.sq_date, dat: i.sq_no3n ? Number(i.sq_no3n) : null });
                sq_ph.push({ cat: i.sq_date, dat: i.sq_ph ? Number(i.sq_ph) : null });
                sq_mwqi.push({ cat: i.sq_date, dat: i.sq_mwqi ? Number(i.sq_mwqi) : null });
            });
            if (parameter == "MWQI") {
                lineChart("divchart", sq_mwqi, "ค่ามาตรฐานคุณภาพน้ำทะเล", "MWQI", 0, 0, 100, 500);
            }
            else if (parameter == "PH") {
                lineChart("divchart", sq_ph, "ความเป็นกรด ด่าง", "pH", 0, 7, 8.5, 20);
            }
            else if (parameter == "NN") {
                lineChart("divchart", sq_no3n, "ไนเตรด ไนโตรเจน", "ug - N/l", 0, 0, 60, 500);
            }
            else if (parameter == "FF") {
                lineChart("divchart", sq_po43p, "ฟอสเฟต ฟอสฟอรัส", "ug - P/l", 0, 0, 45, 500);
            }
        })
    } else if (sta_n !== "ทุกสถานีตรวจวัดค่า" && sq_pro !== "ทุกจังหวัด") {
        $("#chartall").slideDown();
        $('#staname').html(` ${parameter_n} ของสถานีตรวจวัด${sq_sta} จังหวัด${sq_pro} `)
        axios.post(url + "/sq-api/getdatabysta", { sta: sta_n, type: "user", usrid: urid }).then((r) => {
            r.data.data.map(i => {
                sq_po43p.push({ cat: i.sq_date, dat: i.sq_po43p ? Number(i.sq_po43p) : null });
                sq_no3n.push({ cat: i.sq_date, dat: i.sq_no3n ? Number(i.sq_no3n) : null });
                sq_ph.push({ cat: i.sq_date, dat: i.sq_ph ? Number(i.sq_ph) : null });
                sq_mwqi.push({ cat: i.sq_date, dat: i.sq_mwqi ? Number(i.sq_mwqi) : null });
            });
            // console.log(sq_mwqi)
            if (parameter == "MWQI") {
                lineChart("divchart", sq_mwqi, "ค่ามาตรฐานคุณภาพน้ำทะเล", "MWQI", 0, 0, 100, 500);
            }
            else if (parameter == "PH") {
                lineChart("divchart", sq_ph, "ความเป็นกรด ด่าง", "pH", 0, 7, 8.5, 20);
            }
            else if (parameter == "NN") {
                lineChart("divchart", sq_no3n, "ไนเตรด ไนโตรเจน", "ug - N/l", 0, 0, 60, 500);
            }
            else if (parameter == "FF") {
                lineChart("divchart", sq_po43p, "ฟอสเฟต ฟอสฟอรัส", "ug - P/l", 0, 0, 45, 500);
            }
        })
    } else if (sta_n == "ทุกสถานีตรวจวัดค่า" && sq_pro == "ทุกจังหวัด") {
        alert("กรุณาเลือกข้อมูลจังหวัด");
    }
}
let zoomExtent = (lyr, code) => {
    map.eachLayer(lyr => {
        if (lyr.options.name == 'bound') {
            map.removeLayer(lyr)
        }
    })

    axios.get(url + `/eec-api/get-bound-flip/${lyr}/${code}`).then(r => {
        // console.log(r);
        let geom = JSON.parse(r.data.data[0].geom)

        var polygon = L.polygon(geom.coordinates, { color: "red", name: "bound", fillOpacity: 0.0 }).addTo(map);
        map.fitBounds(polygon.getBounds());
    })
}

var m61, ms61
let layermark = (Url, Nlayer) => {
    var MIcon1 = L.icon({
        iconUrl: './Marker/Mark1.png',
        iconSize: [18, 18],
        iconAnchor: [10, 5],
        // popupAnchor: [10, 0]
    });

    if (Nlayer == 61) {
        axios.get(Url).then((r) => {
            var d = r.data.features
            // console.log(r);
            ms61 = L.layerGroup()
            d.map(i => {
                if (i.properties) {
                    m61 = L.circleMarker([i.properties.lat, i.properties.lng], {
                        radius: 8,
                        fillColor: "#2febc9",
                        color: "#232323",
                        weight: 0.2,
                        opacity: 1,
                        fillOpacity: 1,
                    })
                        .bindPopup(`<h6><b>สถานี :</b> ${i.properties.station_n}</h6><h6><b>จังหวัด :</b> ${i.properties.prov}</h6> <h6><b>ค่าที่ตรวจวัดได้ :</b> ${i.properties.value}</h6>`)
                    // .addTo(map);
                    // m61.on("click", function () {
                    //     dtable.search(i.properties.station_n).draw();
                    // })
                }
                ms61.addLayer(m61);
            })
            // ms61.addTo(map)
            lyrControl.addOverlay(ms61, "จุดวัดคุณภาพน้ำทะเล")
        });
    }

}
let zoomsta = (sta) => {
    axios.get(L61).then((r) => {
        var d = r.data.features
        // console.log(d)
        d.map(i => {
            if (i.properties.station_n == sta) {
                var popup = L.popup()
                    .setLatLng([i.geometry.coordinates[1], i.geometry.coordinates[0]])
                    .setContent(`<h6><b>สถานี :</b> ${i.properties.station_n}</h6><h6><b>จังหวัด :</b> ${i.properties.prov}</h6> <h6><b>ค่าที่ตรวจวัดได้ :</b> ${i.properties.value}</h6>`)
                    .openOn(map);
                map.setView([i.geometry.coordinates[1], i.geometry.coordinates[0]], 12);
                // console.log(i.properties.station_n)
            }
        })
    })
    if (sta == "ทุกสถานีตรวจวัดค่า") {
        map.closePopup();
        zoomExtent("pro", "eec")
    }
}

let stationList = (data) => {
    // console.log(data);
    $("#station").empty().append(`<option value="eec">เลือกสถานี/จุดตรวจวัด</option>`);
    data.map(i => $("#station").append(`<option value="${i.sq_id}">${i.sta_loc} ${i.date !== null ? "(วันที่ " + i.date + ")" : ''}</option>`))
}

$("#station").on("change", function () {
    if (this.value !== 'eec') {
        getChart(this.value)

        let station = $('#station').children("option:selected").text()
        $('#sta_name').text(station)
    } else {
        $("#chartdiv").hide();
    }

})

$(document).ready(() => {
    if (urid) {
        layermark(L61, 61)
        callData("eec")
        checkdata()
    } else {
        $("#noauth").modal("show");
    }
});


let checkdata = async () => {
    await axios.post(url + '/sq-api/getdata/user', { type: "ทุกจังหวัด", dat: "ทุกจังหวัด", usrid: urid }).then(r => {
        let d = r.data.data
        if (f_seawater_qua == 'false') {
            $("#noauth").modal("show")
        } else {
            $("#noauth").modal("hide")
            if (d.length == 0) {
                $("#warningModal").modal("show")
            } else {
                $("#warningModal").modal("hide")
            }
        }
    })
}