let urid = 'user';

$("#tbdata").hide();
$("#tbdata2").hide();

var L62 = 'https://eec-onep.online/geoserver/eec/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=eec%3Aa__62_w_system_eec&maxFeatures=50&outputFormat=application%2Fjson'

$("#urbanlist").on("change", () => {
    let urname = document.getElementById('urbanlist').value;
    $("#myTable").dataTable().fnDestroy();
    loadTable({ urname });
})

$(document).ready(() => {
    loadTable({ urname: 'ทุกเทศบาล' });
    // loadMap()
    layermark(L62, 62)
});

let latlng = {
    lat: 13.305567,
    lng: 101.383101
}
let map = L.map('map', {
    center: latlng,
    zoom: 9
});

let marker;

// const url = 'http://localhost:3700';
const url = "https://eec-onep.online/api";

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

let confirmDelete = (w_id, prj_name, prj_prov, prj_time) => {
    $("#projId").val(w_id)
    $("#projName").html(`${prj_name} จ.${prj_prov}`)
    $("#projTime").html(`วันที่ ${prj_time}`)
    $("#deleteModal").modal("show")
}

let closeModal = () => {
    $('#editModal').modal('hide')
    $('#deleteModal').modal('hide')
    $('#myTable').DataTable().ajax.reload();
}

let deleteValue = () => {
    // console.log($("#projId").val());
    let w_id = $("#projId").val()
    axios.post(url + "/waste-api/delete", { w_id: w_id }).then(r => {
        r.data.data == "success" ? closeModal() : null
        $('#myTable').DataTable().ajax.reload();
    })
}

let showMarker = (lat, lon) => {
    map.eachLayer((lyr) => {
        if (lyr.options.name == 'mk') {
            map.removeLayer(lyr);
        }
    });

    marker = L.marker([lat, lon], {
        draggable: true,
        name: 'mk'
    }).addTo(map)
    marker.bindPopup("ตำแหน่งตรวจวัด").openPopup();
    map.panTo([lat, lon])

}

$("#chartdiv").hide()
let getChart = (w_id) => {
    // console.log(w_id);
    let obj = { w_id: w_id }
    axios.post(url + "/waste-api/getone", obj).then((r) => {
        $("#chartdiv").show()

        // if (r.data.data[0].geojson) {
        //     let json = JSON.parse(r.data.data[0].geojson);
        //     showMarker(json.coordinates[1], json.coordinates[0]);

        // }

        geneChart([{
            "cat": "น้ำเสียรวม",
            "val": r.data.data[0].quantity
        }, {
            "cat": "น้ำเสียที่เข้าระบบ",
            "val": r.data.data[0].qinput
        }, {
            "cat": "น้ำเสียที่ออกจากระบบ",
            "val": r.data.data[0].qoutput
        }],
            "w_total",
            "ปริมาณน้ำเสีย",
            "ลิตร/วัน",
            r.data.data[0].insti
        );

        pieChart(r.data.data[0].insti, [
            {
                cat: "อาคารชุด/บ้านพัก",
                val: r.data.data[0].no_house ? r.data.data[0].no_house : 0
            }, {
                cat: "โรงแรม",
                val: r.data.data[0].no_hotel ? r.data.data[0].no_hotel : 0
            }, {
                cat: "หอพัก",
                val: r.data.data[0].no_dorm ? r.data.data[0].no_dorm : 0
            }, {
                cat: "บ้านจัดสรร",
                val: r.data.data[0].no_vhouse ? r.data.data[0].no_vhouse : 0
            }, {
                cat: "สถานบริการ",
                val: r.data.data[0].no_serv ? r.data.data[0].no_serv : 0
            }, {
                cat: "โรงพยาบาล",
                val: r.data.data[0].no_hospi ? r.data.data[0].no_hospi : 0
            }, {
                cat: "ร้านอาหาร",
                val: r.data.data[0].no_restur ? r.data.data[0].no_restur : 0
            }, {
                cat: "ตลาด",
                val: r.data.data[0].no_market ? r.data.data[0].no_market : 0
            }, {
                cat: "ห้างสรรพสินค้า",
                val: r.data.data[0].no_mall ? r.data.data[0].no_mall : 0
            }, {
                cat: "สำนักงาน",
                val: r.data.data[0].no_office ? r.data.data[0].no_office : 0
            }, {
                cat: "โรงเรียน",
                val: r.data.data[0].no_school ? r.data.data[0].no_school : 0
            }, {
                cat: "สถานีบริการน้ำมัน",
                val: r.data.data[0].no_gassta ? r.data.data[0].no_gassta : 0
            }, {
                cat: "วัด",
                val: r.data.data[0].no_temple ? r.data.data[0].no_temple : 0
            }, {
                cat: "ศูนย์ราชการ",
                val: r.data.data[0].no_govcent ? r.data.data[0].no_govcent : 0
            }, {
                cat: "คลินิก",
                val: r.data.data[0].no_clinic ? r.data.data[0].no_clinic : 0
            }
        ]);
    })
}

getChart(129953.638292806);

let loadTable = (muname) => {
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
    let table = $('#myTable').DataTable({
        ajax: {
            type: "POST",
            url: url + '/waste-api/getdata',
            data: muname,
            dataSrc: 'data'
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    // console.log(data);
                    return `
                       <button class="btn btn-margin btn-success" onclick="getChart(${row.w_id})"><i class="bi bi-bar-chart-fill"></i>&nbsp;แสดงกราฟ</button>
                       <button class="btn btn-margin btn-info" onclick="getDetail(${row.w_id})"><i class="bi bi-journal-richtext"></i>&nbsp;ดูค่าที่ตรวจวัด</button>
                       <button class="btn btn-margin btn-danger" onclick="confirmDelete(${row.w_id},'${row.insti}','${row.prov}','${row.date}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>`
                }
            },
            {
                data: '',
                render: (data, type, row, meta) => {
                    // console.log(meta.row);
                    return `${row.insti}`
                }
            },
            {
                data: 'prov'
            },
            // { data: 'prov' },
            {
                data: 'date'
            },
            { data: 'no_house' },
            { data: 'no_hotel' },
            { data: 'no_dorm' },
            { data: 'no_vhouse' },
            { data: 'no_serv' },
            { data: 'no_hospi' },
            { data: 'no_restur' },
            { data: 'no_market' },
            { data: 'no_mall' },
            { data: 'no_office' },
            { data: 'no_school' },
            { data: 'no_gassta' },
            { data: 'no_temple' },
            { data: 'no_govcent' },
            { data: 'no_clinic' },
            // { data: 'opert_stat' },

        ],
        columnDefs: [
            { className: 'text-center', targets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17] },
        ],
        order: [2, 'dasc'],
        searching: true,
        scrollX: true,
        dom: 'Bfrtip',
        buttons: [
            'excel', 'print'
        ],
    });
    table.on('search.dt', function () {
        let data = table.rows({ search: 'applied' }).data();
        // console.log(data);
        getDatatable(data);
        getMarker(data)
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
                .bindPopup(`<h6><b>พื้นที่รับผิดชอบ :</b> ${i.insti}</h6><h6><b>จังหวัด :</b> ${i.prov}</h6><h6><b>วันที่รายงาน :</b> ${i.date}</h6>`)
            // .addTo(map)
            mg.addLayer(mk);
        }

    });
    mg.addTo(map)
    lyrControl.addOverlay(mg, "ตำแหน่งนำเข้าข้อมูล")
}

let getDetail = (e) => {
    sessionStorage.setItem('w_id', e);
    location.href = "./../detail/index.html";
}

let geneChart = (arr, div, tt, unit, place) => {
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    var chart = am4core.create(div, am4charts.XYChart);

    // Add data
    chart.data = arr

    var title = chart.titles.create();
    title.text = tt + " " + place;
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

let pieChart = (place, arr) => {
    am4core.ready(function () {
        am4core.useTheme(am4themes_animated);
        var chart = am4core.create("w_each", am4charts.PieChart);
        chart.data = arr;
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "val";
        pieSeries.dataFields.category = "cat";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeOpacity = 1;

        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;

        var title = chart.titles.create();
        title.text = "สัดส่วนของแหล่งกำเนิดน้ำเสียของ" + place;
        title.fontSize = 18;
        title.marginBottom = 5;

        chart.hiddenState.properties.radius = am4core.percent(0);

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
    });
}

let no_hospi = [];
let no_hotel = [];
let no_house = [];
let no_market = [];
let no_office = [];
let no_restur = [];
let no_mall = [];
let no_vhouse = [];
let no_dorm = [];
let no_serv = [];

let getDatatable = async (data) => {
    // console.log('da');
    no_hospi = [];
    no_hotel = [];
    no_house = [];
    no_market = [];
    no_office = [];
    no_restur = [];
    no_mall = [];
    no_vhouse = [];
    no_dorm = [];
    no_serv = [];

    await data.map(i => {
        no_house.push({ "cat": i.insti, "val": i.no_house ? Number(i.no_house) * 500 : 0 });
        no_hotel.push({ "cat": i.insti, "val": i.no_hotel ? Number(i.no_hotel) * 1000 : 0 });
        no_dorm.push({ "cat": i.insti, "val": i.no_dorm ? Number(i.no_dorm) * 80 : 0 });
        no_serv.push({ "cat": i.insti, "val": i.no_serv ? Number(i.no_serv) * 400 : 0 });
        no_vhouse.push({ "cat": i.insti, "val": i.no_vhouse ? Number(i.no_vhouse) * 180 : 0 });
        no_restur.push({ "cat": i.insti, "val": i.no_restur ? Number(i.no_restur) * 800 : 0 });
        no_hospi.push({ "cat": i.insti, "val": i.no_hospi ? Number(i.no_hospi) * 25 : 0 });
        no_market.push({ "cat": i.insti, "val": i.no_market ? Number(i.no_market) * 70 : 0 });
        no_mall.push({ "cat": i.insti, "val": i.no_mall ? Number(i.no_mall) * 5 : 0 });
        no_office.push({ "cat": i.insti, "val": i.no_office ? Number(i.no_office) * 3 : 0 });
    })
}

let compareWasteWater = (div, data) => {
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create(div, am4charts.XYChart);
        // chart.scrollbarX = new am4core.Scrollbar();

        // Add data
        chart.data = data;

        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "cat";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;
        categoryAxis.renderer.labels.template.horizontalCenter = "right";
        categoryAxis.renderer.labels.template.verticalCenter = "middle";
        categoryAxis.renderer.labels.template.rotation = 270;
        categoryAxis.tooltip.disabled = true;
        categoryAxis.renderer.minHeight = 110;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.minWidth = 50;
        valueAxis.title.text = "ลิตร/วัน";

        // Create series
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.sequencedInterpolation = true;
        series.dataFields.valueY = "val";
        series.dataFields.categoryX = "cat";
        series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
        series.columns.template.strokeWidth = 0;

        series.tooltip.pointerOrientation = "vertical";

        series.columns.template.column.cornerRadiusTopLeft = 10;
        series.columns.template.column.cornerRadiusTopRight = 10;
        series.columns.template.column.fillOpacity = 0.8;

        // on hover, make corner radiuses bigger
        var hoverState = series.columns.template.column.states.create("hover");
        hoverState.properties.cornerRadiusTopLeft = 0;
        hoverState.properties.cornerRadiusTopRight = 0;
        hoverState.properties.fillOpacity = 1;

        series.columns.template.adapter.add("fill", function (fill, target) {
            return chart.colors.getIndex(target.dataItem.index);
        });

        // Cursor
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

    });
}

let callChart = () => {
    let build = document.getElementById("buildlist").value;
    build == 'อาคารชุด/บ้านพัก' ? compareWasteWater("no_house", no_house) : null;
    build == 'โรงแรม' ? compareWasteWater("no_house", no_hotel) : null;
    build == 'หอพัก' ? compareWasteWater("no_house", no_dorm) : null;
    build == 'สถานบริการ' ? compareWasteWater("no_house", no_serv) : null;
    build == 'บ้านจัดสรร' ? compareWasteWater("no_house", no_vhouse) : null;
    build == 'ภัตาคาร/ร้านอาหาร' ? compareWasteWater("no_house", no_restur) : null;
    build == 'โรงพยาบาล' ? compareWasteWater("no_house", no_hospi) : null;
    build == 'ตลาด' ? compareWasteWater("no_house", no_market) : null;
    build == 'ห้างสรรพสินค้า' ? compareWasteWater("no_house", no_mall) : null;
    build == 'สำนักงาน' ? compareWasteWater("no_house", no_office) : null;
    document.getElementById("sourcename").innerHTML = build;
}


setTimeout(() => {
    callChart()
}, 1500)

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








