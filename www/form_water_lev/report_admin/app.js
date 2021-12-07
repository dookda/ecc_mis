let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
$("#usrname").text(urname);

// urid ? null : location.href = "./../../form_register/login/index.html";
urid ? null : $("#noauth").modal("show");

if (eecauth !== "admin" && eecauth !== "user") {
    $("#noauth").modal("show")
    // location.href = "./../../form_register/login/index.html";
}

let gotoLogin = () => {
    location.href = "./../../form_register/login/index.html";
}

$(document).ready(() => {
    loadTable({ bcode: "ทุกจังหวัด" })
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

let refreshPage = () => {
    location.href = "./../report/index.html";
    // console.log("ok");
}

let confirmDelete = (id, name, date) => {
    $("#projId").val(id)
    $("#projName").text(name)
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
            { data: 'ndate' },
        ],
        columnDefs: [
            { className: 'text-center', targets: [0, 1, 4, 5] },
            // { "width": "20%", "targets": 0 }
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
        counts[e.ndate] = 1 + (counts[e.ndate] || 0);
        // r[e.ndate] = (r[e.ndate] || 0) + +(r[e.ndate] || 1)
        return counts;
    }, {})

    for (const [key, value] of Object.entries(result)) {
        // console.log(`${key}: ${value}`);
        let date = key.split("-");
        let ndate = date[2] + "-" + date[1] + "-" + date[0]
        dat.push({
            date: ndate,
            value: value
        })
    }



    // timeLine("timeline", dat);
    timeLine2("timeline", dat);
}

let timeLine = (div, val) => {
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    var chart = am4core.create(div, am4charts.XYChart);

    val.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    });
    // Add data
    chart.data = val;

    // Set input format for the dates
    chart.dateFormatter.inputDateFormat = "dd-MM-yyyy";

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}"
    series.strokeWidth = 2;
    series.minBulletDistance = 15;

    // Drop-shaped tooltips
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";

    var labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.verticalCenter = "bottom";
    labelBullet.label.dy = 0;
    labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

    // Make bullets grow on hover
    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");

    var bullethover = bullet.states.create("hover");
    bullethover.properties.scale = 1.3;

    // Make a panning cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panXY";
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

    // Create vertical scrollbar and place it before the value axis
    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.parent = chart.leftAxesContainer;
    chart.scrollbarY.toBack();

    // Create a horizontal scrollbar with previe and place it underneath the date axis
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    // dateAxis.start = 0.40;
    // dateAxis.keepSelection = true;
}

let timeLine2 = (div, val) => {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create(div, am4charts.XYChart);
    chart.dateFormatter.dateFormat = "dd/MM/yyyy";

    val.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    });
    // Add data
    chart.data = val
    // Set input format for the dates
    // chart.dateFormatter.inputDateFormat = "dd-MM-yyyy";

    // Create axes

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minGridDistance = 30;

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = `วันที่ {dateX}: [bold]{valueY} ครั้ง[/] `;
    series.strokeWidth = 3;
    series.minBulletDistance = 15;
    series.connect = false;
    series.fillOpacity = 0.2;
    // series.tensionX = 0.94;

    // Drop-shaped tooltips
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";

    // var labelBullet = series.bullets.push(new am4charts.LabelBullet());
    // // labelBullet.label.verticalCenter = "bottom";
    // labelBullet.label.dy = -20;
    // labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

    // Make bullets grow on hover
    var bullet = series.bullets.push(new am4charts.CircleBullet());
    // bullet.stroke = new am4core.InterfaceColorSet().getFor("background");
    bullet.circle.strokeWidth = 3;
    bullet.circle.radius = 4;
    bullet.circle.propertyFields.radius = "value";
    bullet.circle.fill = am4core.color("#fff");

    var bullethover = bullet.states.create("hover");
    bullethover.properties.scale = 1.3;

    // Make a panning cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panXY";
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

    // Create vertical scrollbar and place it before the value axis
    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.parent = chart.leftAxesContainer;
    chart.scrollbarY.toBack();

    // Create a horizontal scrollbar with previe and place it underneath the date axis
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    // dateAxis.start = 0.79;
    dateAxis.keepSelection = true;

}

