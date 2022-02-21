let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let f_familyforest = sessionStorage.getItem('f_familyforest');
$("#usrname").text(urname);

// urid ? null : location.href = "./../../form_register/login/index.html";
urid ? null : $("#noauth").modal("show");

if (f_familyforest == 'false') {
    $("#noauth").modal("show")
    // location.href = "./../../form_register/login/index.html";
}

let gotoLogin = () => {
    location.href = "./../../form_register/login/index.html";
}

$(document).ready(async () => {
    console.log(urid)
    if (urid) {
        await checkdata();
        loadMap();
        loadready();
        loadTable();
    } else {
        $("#noauth").modal("show")
    }

})

let latlng = {
    lat: 13.196768,
    lng: 101.364720
}
let map = L.map('map', {
    center: latlng,
    zoom: 9
});

// let usr = sessionStorage.getItem('usr');
let marker, gps, dataurl;

// console.log(usr);

const url = "https://engrids.soc.cmu.ac.th/api";

function loadMap() {
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
    var baseMap = {
        "Mapbox": mapbox.addTo(map),
        "google Hybrid": ghyb
    }
    var overlayMap = {
        "ขอบเขตจังหวัด": pro.addTo(map),
        "ขอบเขตอำเภอ": amp,
        "ขอบเขตตำบล": tam,
    }
    L.control.layers(baseMap, overlayMap).addTo(map);

}
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
        div.innerHTML += '<i style="background: #feff17; border-color: #28a745; border-style: dotted; border-width: 2.5px;"></i><span>ป่าครอบครัว</span><br>';
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

let fc = L.featureGroup().addTo(map);

let datArr = [];

var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear() + "-" + (month) + "-" + (day);
var urlmap
// if (eecauth == 'admin') {
//     urlmap = url + "/ff-api/getparcelall";
// } else {
//     urlmap = url + "/ff-api/getparcel/uid";
let loadready = () => {
    axios.post(url + "/ff-api/getparcel/uid", { usrid: urid }).then(r => {
        console.log(r.data.data)
        r.data.data.map(i => {
            if (i.geom) {
                let dat = {
                    "type": "Feature",
                    "geometry": JSON.parse(i.geom),
                    "properties": {
                        "name": i.ffid
                    }
                }

                let json = L.geoJSON(dat);
                json.addTo(fc);
                // $("#listItem").append(`<a class="list-group-item list-group-item-action" onclick="getParcel(${i.ffid})">${i.ffid}</a>`);
            }
            // console.log(i);
        })
        map.fitBounds(fc.getBounds());
        // console.log(fc);
    });
}

fc.on("click", (e) => {
    // console.log(e.layer.toGeoJSON());
});

let getData = async (data) => {
    let eat = 0;
    let use = 0;
    let herb = 0;
    let econ = 0;
    await data.map(i => {
        // console.log(i);
        eat += Number(i.eat);
        use += Number(i.use);
        econ += Number(i.econ);
        herb += Number(i.herb);
        // i.ftype == "พืชกินได้" ? eat += Number(i.eat) : null;
        // i.ftype == "พืชใช้สอย" ? use += Number(i.use) : null;
        // i.ftype == "พืชเศรษฐกิจ" ? econ += Number(i.econ) : null;
        // i.ftype == "พืชสมุนไพร" ? herb += Number(i.herb) : null;
    });

    let dataArr = [
        {
            cat: "ใช้รับประทาน",
            val: eat
        }, {
            cat: "ใช้สอย",
            val: use
        }, {
            cat: "ใช้ทางด้านเศรษฐกิจ",
            val: herb
        }, {
            cat: "ใช้เป็นสมุนไพร",
            val: econ
        }
    ];
    // console.log(dataArr);
    showChart(dataArr);
}

let showChart = (dataArr) => {
    function am4themes_myTheme(target) {
        if (target instanceof am4core.ColorSet) {
            target.list = [
                am4core.color("#7FC8A9"),
                am4core.color("#D5EEBB"),
                am4core.color("#5F7A61"),
                am4core.color("#093824"),
            ];
        }
    }
    am4core.useTheme(am4themes_myTheme)

    // Themes begin
    // am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("chartType", am4charts.XYChart);

    chart.data = dataArr;

    chart.padding(40, 40, 40, 40);

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "cat";
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.extraMax = 0.1;
    //valueAxis.rangeChangeEasing = am4core.ease.linear;
    //valueAxis.rangeChangeDuration = 1500;

    // var axis = chart.yAxes.push(new am4charts.ValueAxis());
    // axis.renderer.grid.template.disabled = false;

    // Set up axis title
    valueAxis.title.text = 'ผลผลิต (กิโลกรัม)';

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "cat";
    series.dataFields.valueY = "val";
    series.tooltipText = "{valueY.value}"
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.cornerRadiusTopLeft = 10;
    //series.interpolationDuration = 1500;
    //series.interpolationEasing = am4core.ease.linear;
    var labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.verticalCenter = "bottom";
    labelBullet.label.dy = -10;
    labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

    chart.zoomOutButton.disabled = true;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
    });

    // setInterval(function () {
    //     am4core.array.each(chart.data, function (item) {
    //         item.visits += Math.round(Math.random() * 200 - 100);
    //         item.visits = Math.abs(item.visits);
    //     })
    //     chart.invalidateRawData();
    // }, 2000)

    categoryAxis.sortBySeries = series;
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
            },
            "emptyTable": "ไม่พบข้อมูล..."
        }
    });
    let table = $('#myTable').DataTable({
        ajax: {
            type: "POST",
            url: url + '/ff-api/getdaily/',
            data: { usrid: urid },
            dataSrc: 'data'
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return `
                    <button type="button" class="btn btn-margin btn-danger" onclick="confirmDelete(${row.gid},'${row.fplant}', '${row.date}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>`
                },
                // width: "15%"
            }, {
                data: '',
                render: (data, type, row, meta) => {
                    // console.log(row);
                    return `${meta.row + 1}`
                }
            },
            { data: 'fplant' },
            // { data: 'ftype' },
            { data: 'date' },
            {
                data: '',
                render: (data, type, row, meta) => {
                    return `${row.eat} ${row.eat_unit} `
                }
            }, {
                data: '',
                render: (data, type, row, meta) => {
                    return `${row.herb} ${row.herb_unit}`
                }
            }, {
                data: '',
                render: (data, type, row, meta) => {
                    return `${row.use} ${row.use_unit}`
                }
            }, {
                data: '',
                render: (data, type, row, meta) => {
                    return `${row.econ}  ${row.econ_unit}`
                }
            },
        ],
        columnDefs: [
            { className: 'text-center', targets: [0, 1, 2, 3, 4, 5, 6] },
        ],
        searching: true,
        scrollX: true,
        dom: 'Bfrtip',
        buttons: [
            'excel', 'print'
        ],
        // order: [2, 'asc'],
    });

    table.on('search.dt', function () {
        let data = table.rows({ search: 'applied' }).data();
        getData(data);
    });
}
let confirmDelete = (prj_id, prj_name, tbType) => {
    $("#projId").val(prj_id);
    if (prj_name !== 'null') { $("#projName").text(prj_name); }
    if (tbType !== 'null') { $("#projTime").text(`วันที่ ${tbType}`); }
    $("#tbType").val(tbType);
    $("#deleteModal").modal("show");
}

let closeModal = () => {
    $('#editModal').modal('hide');
    $('#deleteModal').modal('hide');
    $('#myTable').DataTable().ajax.reload();
    window.location.reload();
}

let confirmAdd = () => {
    $('#okModal').modal('hide');
    $('#myTable').DataTable().ajax.reload();
}

let deleteValue = () => {
    // console.log($("#projId").val());
    let gid = $("#projId").val()
    axios.post(url + "/ff-api/delete", { gid: gid }).then(r => {
        if (r.data.data == "success") {
            $('#deleteModal').modal('hide')
            $('#myTable').DataTable().ajax.reload();
            window.location.reload();
        }
    })
}

let checkdata = () => {
    axios.post(url + '/ff-api/getdaily/', { usrid: urid }).then(r => {
        let d = r.data.data
        if (f_familyforest == 'false') {
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
