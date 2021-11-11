let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
$("#usrname").text(urname);
urid ? null : location.href = "./../../form_register/login/index.html";

if (eecauth !== "admin" && eecauth !== "user") {
    location.href = "./../../form_register/login/index.html";
}


let latlng = {
    lat: 13.196768,
    lng: 101.364720
}
let map = L.map('map', {
    center: latlng,
    zoom: 9
});

let marker, gps, dataurl;

// const url = 'http://localhost:3700';
const url = "https://eec-onep.online:3700";
let urltable
if (eecauth == "admin") {
    urltable = url + '/ff-api/getalldaily'
}
else if (eecauth == "user") {
    urltable = url + '/ff-api/getdaily'
}

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

let fc = L.featureGroup();
var baseMap = {
    "Mapbox": mapbox.addTo(map),
    "google Hybrid": ghyb
}
var overlayMap = {
    "ขอบเขตจังหวัด": pro.addTo(map),
    "ขอบเขตอำเภอ": amp,
    "ขอบเขตตำบล": tam,
    "แปลงป่าครอบครัว": fc.addTo(map)
}
L.control.layers(baseMap, overlayMap).addTo(map);
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


let datArr = [];

var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear() + "-" + (month) + "-" + (day);

// axios.post(url + "/ff-api/getparcelall", { usrid: urid }).then(r => {
//     r.data.data.map(i => {
//         if (i.geom) {

//             let dat = {
//                 "type": "Feature",
//                 "geometry": JSON.parse(i.geom),
//                 "properties": {
//                     "name": i.ffid
//                 }
//             }

//             let json = L.geoJSON(dat, {
//                 style: {
//                     fillColor: "yellow",
//                     weight: 2,
//                     opacity: 1,
//                     color: 'green',
//                     dashArray: '3',
//                     fillOpacity: 0.7
//                 }
//             });
//             json.bindPopup(`<h6><b>เจ้าของแปลง :</b> ${i.fname}</h6><h6><b>ประเภท :</b> ${i.flandtype}</h6>`).addTo(fc);// $("#listItem").append(`<a class="list-group-item list-group-item-action" onclick="getParcel(${i.ffid})">${i.ffid}</a>`);
//         }
//     })
//     map.fitBounds(fc.getBounds());
// });

// fc.on("click", (e) => {
// console.log(e.layer.toGeoJSON());
// });

let showParcel = (data) => {
    map.eachLayer(i => {
        i.options.name == "ff" ? map.removeLayer(i) : null;
    });

    data.map(i => {
        // console.log(i);
        let a = L.geoJSON(JSON.parse(i.geom), {
            name: "ff",
            style: {
                fillColor: "yellow",
                weight: 2,
                opacity: 1,
                color: 'green',
                dashArray: '3',
                fillOpacity: 0.7
            },
            onEachFeature: (feature, layer) => {

                let popupContent = `<span style="font-family: 'Kanit';font-size: 16px;"><b>ประเภทและชนิดของป่าครอบครัว</b> 
                <br>ประเภท: ${i.ftype} 
                <br>ชื่อชนิด: ${i.fplant}<span>`;
                layer.bindPopup(popupContent);
            }
        });
        a.addTo(fc)
    })
}


let zoomBound = (d) => {
    if (d) {
        let a = JSON.stringify(d);
        let b = L.geoJSON(JSON.parse(a))
        map.fitBounds(b.getBounds());
    } else {
        $('#warningModal').modal('show')
    }
    // console.log(d)
}

let getData = async (data) => {
    let eat = 0;
    let use = 0;
    let herb = 0;
    let econ = 0;
    await data.map(i => {
        console.log(i);
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
            cat: "พืชกินได้",
            val: eat
        }, {
            cat: "พืชใช้สอย",
            val: use
        }, {
            cat: "พืชเศรษฐกิจ",
            val: herb
        }, {
            cat: "พืชสมุนไพร",
            val: econ
        }
    ];
    // console.log(dataArr);
    showChart(dataArr);
    showParcel(data);
}

let showChart2 = (dataArr) => {
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("chartType", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = dataArr;

    var series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "val";
    series.dataFields.radiusValue = "val";
    series.dataFields.category = "cat";
    series.slices.template.cornerRadius = 6;
    series.colors.step = 3;

    series.hiddenState.properties.endAngle = -90;
    chart.legend = new am4charts.Legend();
    chart.exporting.menu = new am4core.ExportMenu();
    // chart.exporting.menu.align = "left";
    // chart.exporting.menu.verticalAlign = "top";
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

let loadTable = (dat) => {
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
            url: urltable,
            data: dat,
            dataSrc: 'data'
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    // console.log(data);
                    return `
                <button type="button" class="btn btn-margin btn-warning" onclick='zoomBound(${row.geom})'><i class="bi bi-zoom-in"></i>&nbsp;ซูม</button>
                <button type="button" class="btn btn-margin btn-danger" onclick="confirmDelete(${row.gid},'${row.fplant}','${row.date}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>`
                },
            },
            {
                data: '',
                render: (data, type, row, meta) => {
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
            }
        ],
        columnDefs: [
            { className: 'text-center', targets: [0, 2, 3, 4, 5, 6] },
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
        // getMarker(data)
        // console.log(data)
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
let closewarning = () => {
    $('#warningModal').modal('hide');
    window.location.reload();
    // $('#myTable').DataTable().ajax.reload();
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

$('#prov').on("change", function () {
    console.log(this.value);
    let pro;
    this.value == 'eec' ? pro = "ทุกจังหวัด" : null;
    this.value == '24' ? pro = "ฉะเชิงเทรา" : null;
    this.value == '20' ? pro = "ชลบุรี" : null;
    this.value == '21' ? pro = "ระยอง" : null;

    $("#myTable").dataTable().fnDestroy();
    loadTable({ usrid: urid, pro: pro })
    getPro(this.value)
    zoomExtent("pro", this.value)
})
$('#amp').on("change", function () {
    getAmp(this.value)
    zoomExtent("amp", this.value)
})
$('#tam').on("change", function () {
    zoomExtent("tam", this.value)
})

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

loadTable({ usrid: urid, pro: 'ทุกจังหวัด' })