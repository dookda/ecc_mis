let urid = 'user';
$("#usr1").hide()
$("#usr2").hide()

$("#tbdata").hide();

var L61 = 'https://eec-onep.online/geoserver/eec/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=eec%3Aa__61_sea_eec&maxFeatures=50&outputFormat=application%2Fjson'
$(document).ready(() => {
    loadTable()
    layermark(L61, 61)

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

const seaeec = L.tileLayer.wms("https://eec-onep.online/geoserver/eec/wms?", {
    layers: 'eec:a__61_sea_eec',
    format: 'image/png',
    transparent: true,
});

const mangrovelu = L.tileLayer.wms("https://eec-onep.online/geoserver/eec/wms?", {
    layers: 'eec:a__39_mangrovelu',
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

let confirmDelete = (sq_id, prj_name) => {
    $("#projId").val(sq_id)
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
    let sq_id = $("#projId").val()
    axios.post(url + "/sq-api/delete", { sq_id: sq_id }).then(r => {
        r.data.data == "success" ? closeModal() : null
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
        geneChart([{ "cat": "ค่าดีโอ", "val": r.data.data[0].sq_do }], "sq_do", "ค่าดีโอ", "mg/L");
        geneChart([{ "cat": "ปริมาณแบคทีเรียกลุ่มโคลิฟอร์มทั้งหมด", "val": r.data.data[0].sq_tcb }], "sq_tcb", "ปริมาณแบคทีเรียกลุ่มโคลิฟอร์มทั้งหมด", "MPN/100ml");
        geneChart([{ "cat": "ฟอสเฟต-ฟอสฟอรัส", "val": r.data.data[0].sq_po43p }], "sq_po43p", "ฟอสเฟต-ฟอสฟอรัส", "μg-P/l");
        geneChart([{ "cat": "ไนเตรท-ไนโตรเจน", "val": r.data.data[0].sq_no3n }], "sq_no3n", "ไนเตรท-ไนโตรเจน", "μg-N/l");
        geneChart([{ "cat": "อุณหภูมิ", "val": r.data.data[0].sq_temp }], "sq_temp", "อุณหภูมิ", "ºC");
        geneChart([{ "cat": "สารแขวนลอย", "val": r.data.data[0].sq_ss }], "sq_ss", "สารแขวนลอย", "");
        geneChart([{ "cat": "ค่าความเป็นกรด-ด่าง", "val": r.data.data[0].sq_ph }], "sq_ph", "ค่าความเป็นกรด ด่าง", "pH");
        geneChart([{ "cat": "ปริมาณแอมโมเนีย", "val": r.data.data[0].sq_nh3 }], "sq_nh3", "ปริมาณแอมโมเนีย", "μg-N/l");
        geneChart([{ "cat": "ค่ามาตรฐานคุณภาพน้ำทะเล", "val": r.data.data[0].sq_mwqi }], "sq_mwqi", "ค่ามาตรฐานคุณภาพน้ำทะเล", "");
        geneChart([{ "cat": "ปริมาณสารตะกั่ว", "val": r.data.data[0].sq_pb }], "sq_pb", "ปริมาณสารตะกั่ว", "μg/l");
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
            url: url + '/sq-api/getdata',
            data: { userid: "sakda" },
            dataSrc: 'data'
        },
        columns: [
            // { data: 'prj_name' },
            {
                data: '',
                render: (data, type, row, meta) => {
                    // console.log(meta.row);
                    return `${meta.row + 1}`
                }
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
            {
                data: null,
                render: function (data, type, row, meta) {
                    // console.log(data);
                    return `
                       <button class="btn btn-margin btn-outline-danger" onclick="confirmDelete(${row.sq_id},'${row.sta_loc}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>
                       <button class="btn btn-margin btn-outline-success" onclick="getChart(${row.sq_id})"><i class="bi bi-bar-chart-fill"></i>&nbsp;แสดงกราฟ</button>
                       <button class="btn btn-margin btn-outline-info" onclick="getDetail(${row.sq_id})"><i class="bi bi-bar-chart-fill"></i>&nbsp;รายละเอียด</button>`
                }
            }
        ],
        columnDefs: [
            { className: 'text-center', targets: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
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
                .bindPopup(`<h6><b>สถานี :</b> ${i.sta_loc}</h6><h6><b>จังหวัด :</b> ${i.prov}</h6><h6><b>วันที่รายงาน :</b> ${i.date}</h6>`)
            // .addTo(map) 
            mg.addLayer(mk);
        }

    });
    mg.addTo(map)
    lyrControl.addOverlay(mg, "ตำแหน่งนำเข้าข้อมูล")
}

let getDetail = (e) => {
    sessionStorage.setItem('sq_id', e);
    location.href = "./../detail/index.html";
}

let geneChart = (arr, div, tt, unit) => {
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create(div, am4charts.XYChart);

    chart.data = arr

    var title = chart.titles.create();
    title.text = tt;
    title.fontSize = 18;
    title.marginBottom = 5;

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
    axis.title.dy = 40;

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

let getDataByPro = (sq_pro) => {
    let sq_po43p = [];
    let sq_no3n = [];
    let sq_ph = [];
    let sq_mwqi = [];

    axios.post(url + "/sq-api/getsummarize", { sq_pro: sq_pro }).then(async (r) => {
        await r.data.data.map(i => {
            sq_po43p.push({ cat: i.sq_date, dat: i.sq_po43p ? Number(i.sq_po43p) : null });
            sq_no3n.push({ cat: i.sq_date, dat: i.sq_no3n ? Number(i.sq_no3n) : null });
            sq_ph.push({ cat: i.sq_date, dat: i.sq_ph ? Number(i.sq_ph) : null });
            sq_mwqi.push({ cat: i.sq_date, dat: i.sq_mwqi ? Number(i.sq_mwqi) : null });
        });

        lineChart("csq_po43p", sq_po43p, "ฟอสเฟต ฟอสฟอรัส", "ug - P/l");
        lineChart("csq_no3n", sq_no3n, "ไนเตรด ไนโตรเจน", "ug - N/l");
        lineChart("csq_ph", sq_ph, "ความเป็นกรด ด่าง", "pH");
        lineChart("csq_mwqi", sq_mwqi, "ค่ามาตรฐานคุณภาพน้ำทะเล", "MWQI");
    })
}

let lineChart = (div, data, label, unit) => {
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
    valueAxis.title.text = unit;

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "dat";
    series.dataFields.dateX = "cat";
    series.strokeWidth = 2;
    series.name = label;
    series.minBulletDistance = 10;
    series.tooltipText = "{valueY}";
    series.showOnInit = true;

    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");

    var bullethover = bullet.states.create("hover");
    bullethover.properties.scale = 1.3;

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

    dateAxis.start = 0.50;
    dateAxis.keepSelection = true;
}

getDataByPro("ชลบุรี");
$("#prov").change(function () {
    getDataByPro(this.value);
})

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
            // console.log(r.data.features);
            ms61 = L.layerGroup()
            d.map(i => {
                if (i.properties) {
                    m61 = L.circleMarker([i.geometry.coordinates[1], i.geometry.coordinates[0]], {
                        radius: 8,
                        fillColor: "#2febc9",
                        color: "#232323",
                        weight: 0.2,
                        opacity: 1,
                        fillOpacity: 1,
                    })
                        .bindPopup(`<h6><b>สถานี :</b> ${i.properties.station_n}</h6><h6><b>จังหวัด :</b> ${i.properties.prov}</h6> <h6><b>ค่าที่ตรวจวัดได้ :</b> ${i.properties.value}</h6>`)
                    // .addTo(map);
                }
                ms61.addLayer(m61);
            })
            ms61.addTo(map)
            lyrControl.addOverlay(ms61, "จุดวัดคุณภาพน้ำทะเล")
        });
    }

}