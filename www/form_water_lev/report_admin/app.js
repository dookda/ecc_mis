let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
$("#usrname").text(urname);
// urid ? null : location.href = "./../../form_register/login/index.html";
urid ? null : $("#noauth").modal("show");

if (eecauth !== "admin" && eecauth !== "office") {
    $("#noauth").modal("show")
    // location.href = "./../../form_register/login/index.html";
}

let gotoLogin = () => {
    location.href = "./../../form_register/login/index.html";
}

const url = "https://engrids.soc.cmu.ac.th/api";

let latlng = {
    lat: 13.196768,
    lng: 101.364720
}
let map = L.map('map', {
    center: latlng,
    zoom: 9
});

let fc = L.featureGroup();
const mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
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
const municiple = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
    layers: 'eec:a__04_municiple',
    format: "image/png",
    transparent: true,
    // maxZoom: 10,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

var baseMaps = {
    "Mapbox": mapbox.addTo(map),
    "google Hybrid": ghyb
}
const overlayMaps = {
    "ขอบเขตจังหวัด": pro.addTo(map),
    "ขอบเขตอำเภอ": amp.addTo(map),
    "ขอบเขตตำบล": tam.addTo(map),
    "ขอบเขตเทศบาล": municiple,
}

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
        div.innerHTML += '<img src="./Mark.png" width="20px"><span>ตำแหน่งนำเข้าข้อมูล</span><br>';
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


let refreshPage = () => {
    location.href = "./../report/index.html";
    // console.log("ok");
}

let confirmDelete = (id, name, date) => {
    $("#projId").val(id)
    $("#projName").text(name)
    if (date !== null) {
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
    let proj_id = $("#projId").val()
    axios.post(url + "/waterlevel-api/delete", { proj_id: proj_id }).then(r => {
        r.data.data == "success" ? closeModal() : null
        $('#myTable').DataTable().ajax.reload();
    })
}

$("#charttitle").hide();
$("#spinner").hide();

let onEachFeature = (feature, layer) => {
    // console.log(feature);
    if (feature.properties.img) {
        layer.bindPopup(`<b>${feature.properties.watername}</b>
            <br>${feature.properties.placename}
            <br>ระดับน้ำ${feature.properties.waterlevel}
            <br><img src="${feature.properties.img}" width="240px">`,
            { maxWidth: 240 });
    } else {
        layer.bindPopup(`<b>${feature.properties.watername}</b>
            <br>${feature.properties.placename}
            <br>ระดับน้ำ${feature.properties.waterlevel}`)
    }
}

let getDataForMap = (data) => {
    map.eachLayer(i => {
        i.options.name == "marker" ? map.removeLayer(i) : null;
    });

    data.map(i => {
        if (i.geojson) {

            let json = JSON.parse(i.geojson);
            json.properties = { watername: i.watername, placename: i.placename, waterlevel: i.waterlevel, img: i.img };

            L.geoJson(json, {
                onEachFeature: onEachFeature,
                name: "marker"
            }).addTo(map)
        }
    });
}

let zoomMap = (lat, lon) => {
    // console.log(lat, lon);
    map.setView([lat, lon], 14)
}

let showCountChart = (data, div, label) => {
    // Create chart instance
    var chart = am4core.create(div, am4charts.XYChart);

    // Add data
    chart.data = data;

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "cat";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    // categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

    valueAxis.title.text = label;

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "val";
    series.dataFields.categoryX = "cat";
    // series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;
    // series.tooltip.pointerOrientation = "vertical";
    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    // series.columns.template.column.fillOpacity = 0.8;

    var labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.verticalCenter = "bottom";
    labelBullet.label.dy = 0;
    labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

    series.columns.template.adapter.add("fill", function (fill, target) {
        // return chart.colors.getIndex(target.dataItem.index);
        return target.dataItem.dataContext["color"];
    });

    // Cursor
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
        }
    }

    chart.events.on("beforedatavalidated", function (ev) {
        // console.log(ev.target.data)
        if (ev.target.data.length == 1) {
            let dat = ev.target.data
            if (dat[0].val == 0) {
                showIndicator();
            }
        }
    });
}

let getDataForChart = (data) => {
    // console.log(data);
    let cb = 0;
    let ry = 0;
    let cs = 0;
    data.map(i => {
        i.prov_namt == "ชลบุรี" ? cb += 1 : null
        i.prov_namt == "ระยอง" ? ry += 1 : null
        i.prov_namt == "ฉะเชิงเทรา" ? cs += 1 : null
    })

    let cnt = [{
        "cat": "ฉะเชิงเทรา",
        "val": cs,
        "color": "#50b4d8"
    }, {
        "cat": "ชลบุรี",
        "val": cb,
        "color": "#9eddef"
    }, {
        "cat": "ระยอง",
        "val": ry,
        "color": "#96b3c1"
    },];

    showCountChart(cnt, 'cntChart', 'รายงาน (ครั้ง)')
}

let table
let loadTable = (data) => {
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
    table = $('#myTable').DataTable({
        scrollX: true,
        ajax: {
            async: true,
            type: "POST",
            url: url + '/waterlevel-api/getalldata',
            data: data,
            dataSrc: 'data'
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    // console.log(row);
                    return `<button class="btn m btn-info" onclick="zoomMap(${row.lat}, ${row.lon})"><i class="bi bi-zoom-in"></i>&nbsp;ซูม</button>
                            <button class="btn m btn-danger" onclick="confirmDelete('${row.proj_id}','${row.placename}','${row.ndate}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>`
                },
                width: "16%"
            },
            {
                data: '',
                render: (data, type, row, meta) => {
                    // console.log(meta);
                    return `${meta.row + 1}`
                }
            },
            { data: 'placename' },
            { data: 'watername' },
            {
                data: '',
                render: (data, type, row) => {
                    return `${row.waterlevel} `
                }
            },
            { data: 'tam_namt' },
            { data: 'amp_namt' },
            { data: 'prov_namt' },
            { data: 'ndate' },
        ],
        columnDefs: [
            { className: 'text-center', targets: [0, 1, 4, 5] },
        ],
        // "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
        dom: 'Bfrtip',
        buttons: [
            'excel', 'print'
        ],
        searching: true
    });

    table.on('search.dt', function () {
        let data = table.rows({ search: 'applied' }).data();
        // console.log(data);
        getDataForMap(data);
        getDataForChart(data);
    });
}

let getDetail = (e) => {
    sessionStorage.setItem('green_gid', e);
    sessionStorage.setItem('green_from_admin', 'yes');
    location.href = "./../detail/index.html";
}


$(document).ready(() => {
    // loadTable();
    loadTable({ usrid: urid, bcode: "ทุกจังหวัด" })
    // loadMap();
    $("#amp").empty().append(`<option value="eec">เลือกอำเภอ</option>`);
    $("#tam").empty().append(`<option value="eec">เลือกตำบล</option>`);
});

$('#prov').on("change", function () {
    getPro(this.value)
    zoomExtent("pro", this.value)

    let pro = $("#prov").children("option:selected").text()
    if (pro !== "ทุกจังหวัด") {
        console.log(pro);
        table.search(pro).draw();
    } else {
        table.search('').draw();
    }
})
$('#amp').on("change", function () {
    $("#tam").empty().append(`<option value="eec">เลือกตำบล</option>`);
    if (this.value !== "eec") {
        getAmp(this.value)
        zoomExtent("amp", this.value)

        let amp = $("#amp").children("option:selected").text()
        table.search(amp).draw();
    } else {
        $("#tam").empty().append(`<option value="eec">เลือกตำบล</option>`);
        let prov_val = $("#prov").val();
        zoomExtent("pro", prov_val)

        let pro = $("#prov").children("option:selected").text()
        if (pro !== "ทุกจังหวัด") {
            table.search(pro).draw();
        } else {
            table.search('').draw();
        }
    }
})
$('#tam').on("change", function () {
    if (this.value !== "eec") {
        zoomExtent("tam", this.value)
        let tam = $("#tam").children("option:selected").text()
        table.search(tam).draw();
    } else {
        let amp_val = $("#amp").val();
        zoomExtent("amp", amp_val)
        let amp = $("#amp").children("option:selected").text()
        table.search(amp).draw();
    }
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
        $("#amp").empty().append(`<option value="eec">เลือกอำเภอ</option>`);
        $("#tam").empty().append(`<option value="eec">เลือกตำบล</option>`);
        r.data.data.map(i => {
            $("#amp").append(`<option value="${i.amphoe_idn}">${i.amp_namt}</option>`)
        })
    })
}
let getAmp = (ampcode) => {
    axios.get(url + `/eec-api/get-tam/${ampcode}`).then(r => {
        $("#tam").empty().append(`<option value="eec">เลือกตำบล</option>`);
        r.data.data.map(i => {
            $("#tam").append(`<option value="${i.tambon_idn}">${i.tam_namt}</option>`)
        })
    })
}

map.on("click", async (e) => {
    map.eachLayer(lyr => {
        if (lyr.options.name == 'bound') {
            map.removeLayer(lyr)
        }
    })
})