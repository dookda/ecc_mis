let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let f_water_lev = sessionStorage.getItem('f_water_lev');
$("#usrname").text(urname);

// urid ? null : location.href = "./../../form_register/login/index.html";

// if (f_water_lev == 'false') {
//     $("#noauth").modal("show")
//     // location.href = "./../../form_register/login/index.html";
// }

let gotoLogin = () => {
    location.href = "./../../form_register/login/index.html";
}

$(document).ready(() => {
    loadTable({ usrid: urid, bcode: "ทุกจังหวัด" })
    checkdata({ usrid: urid, bcode: "ทุกจังหวัด" })
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
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const amp = L.tileLayer.wms("https://eec-onep.online/geoserver/eec/wms?", {
    layers: "eec:a__02_amphoe_eec",
    format: "image/png",
    transparent: true,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const pro = L.tileLayer.wms("https://eec-onep.online/geoserver/eec/wms?", {
    layers: "eec:a__01_prov_eec",
    format: "image/png",
    transparent: true,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

let lyrs = L.featureGroup().addTo(map)

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
            },
            "emptyTable": "ไม่พบข้อมูล..."
        }
    });
    let dtable = $('#myTable').DataTable({
        scrollX: true,
        ajax: {
            async: true,
            type: "POST",
            url: url + '/waterlevel-api/getownerdata',
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

    dtable.on('search.dt', function () {
        let data = dtable.rows({ search: 'applied' }).data()
        getMarker(data);
        loadChartData(data);
    });
}

let zoomMap = (lat, lon) => {
    // console.log(lat, lon);
    map.setView([lat, lon], 14)
}

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

let getMarker = (d) => {
    map.eachLayer(i => {
        i.options.name == "marker" ? map.removeLayer(i) : null;
    });

    d.map(i => {
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

let loadChartData = async (d) => {
    // console.log(d);
    let dat = [];
    // await d.map(i => {
    //     dat.push({
    //         date: i.ndate,
    //         value: i.waterlevel
    //     })
    // })

    var counts = {};

    var result = await d.reduce(function (r, e) {
        // console.log(e.ndate)
        counts[e.watername] = 1 + (counts[e.watername] || 0);
        // r[e.ndate] = (r[e.ndate] || 0) + +(r[e.ndate] || 1)
        return counts;
    }, {})

    for (const [key, value] of Object.entries(result)) {
        // console.log(`${key}: ${value}`);
        // let date = key.split("-");
        // let ndate = date[2] + "-" + date[1] + "-" + date[0]
        dat.push({
            category: key,
            value: value
        })
    }
    // console.log(dat)
    timeLine("timeline", dat);
}

let timeLine = (div, val) => {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create(div, am4charts.XYChart);
    // chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = val

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    // categoryAxis.renderer.labels.template.horizontalCenter = "right";
    // categoryAxis.renderer.labels.template.verticalCenter = "middle";
    // categoryAxis.renderer.labels.template.rotation = 270;
    // categoryAxis.tooltip.disabled = true;
    // categoryAxis.renderer.minHeight = 110;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "category";
    series.tooltipText = "สถานที่ {categoryX}: [bold]{valueY} ครั้ง[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    var labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.verticalCenter = "bottom";
    labelBullet.label.dy = -20;
    labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')} ครั้ง";

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

}

let checkdata = async (prov) => {
    axios.post(url + '/waterlevel-api/getownerdata', prov).then(r => {
        let d = r.data.data
        if (f_water_lev == 'false') {
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









