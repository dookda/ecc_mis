let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let f_water_surface = sessionStorage.getItem('f_water_surface');

urid ? null : location.href = "./../../form_register/login/index.html";
if (f_water_surface == 'false') {
    location.href = "./../../form_register/login/index.html";
}

$("#usrname").text(urname);

const url = "https://eec-onep.online:3700";
// const url = 'http://localhost:3700';

let latlng = {
    lat: 13.305567,
    lng: 101.383101
};

let map = L.map('map', {
    center: latlng,
    zoom: 8
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

let lyrs = L.featureGroup().addTo(map)
let wtrlFc = L.featureGroup()

var baseMap = {
    "Mapbox": mapbox.addTo(map),
    "google Hybrid": ghyb
}

const overlayMap = {
    "ขอบเขตจังหวัด": pro.addTo(map),
    "ขอบเขตอำเภอ": amp,
    "ขอบเขตตำบล": tam,
    "จุดตรวจวัดปริมาณน้ำท่า": wtrlFc,
}

const lyrControl = L.control.layers(baseMap, overlayMap, {
    collapsed: true
}).addTo(map);

var legend = L.control({ position: "bottomleft" });
let showLegend = () => {
    legend.onAdd = function (map) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += `<div class ="center"><button class="btn btn-sm" onClick="hideLegend()">
        <span class="kanit">ซ่อนสัญลักษณ์</span><i class="fa fa-angle-double-down" aria-hidden="true"></i>
      </button></div>`;
        div.innerHTML += '<i style="background: #FFFFFF; border-style: solid; border-width: 3px;"></i><span>ขอบเขตจังหวัด</span><br>';
        div.innerHTML += '<i style="background: #FFFFFF; border-style: solid; border-width: 1.5px;"></i><span>ขอบเขตอำเภอ</span><br>';
        div.innerHTML += '<i style="background: #FFFFFF; border-style: dotted; border-width: 1.5px;"></i><span>ขอบเขตตำบล</span><br>';
        div.innerHTML += '<i style="background: #7acdf3; border-radius: 1%;"></i><span>อ่างเก็บน้ำ</span><br>';
        div.innerHTML += '<i style="background: #006898; border-radius: 50%;"></i><span>จุดวัดคุณภาพน้ำผิวดิน</span><br>';
        div.innerHTML += '<img src="./Marker/sta_qua.png" width="50px"><span>จุดวัดคุณภาพน้ำผิวดิน (API)</span><br>';
        div.innerHTML += '<i style="background: #01c8ff; border-radius: 50%;"></i><span>จุดเฝ้าระวังคุณภาพน้ำจากสสภ.13</span><br>';
        div.innerHTML += '<i style="background: #216cdc; border-radius: 50%;"></i><span>จุดเก็บน้ำเพื่อวิเคราะห์คุณภาพน้ำในโครงการฯ</span><br>';
        div.innerHTML += '<img src="./Marker/Mark.png" width="10px"><span>ตำแหน่งนำเข้าข้อมูล</span>';
        return div;
    }
    legend.addTo(map);
}

let hideLegend = () => {
    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend')
        div.innerHTML += `<div class ="center"><button class="btn btn-sm" onClick="showLegend()">
        <small class="prompt"><span class="kanit">แสดงสัญลักษณ์</span></small> 
        <i class="fa fa-angle-double-up" aria-hidden="true"></i>
    </button></div>`;
        return div;
    };
    legend.addTo(map);
}
hideLegend()



var MIcon1 = L.icon({
    iconUrl: './Marker/Mark1.png',
    iconSize: [18, 18],
    iconAnchor: [10, 5],
    // popupAnchor: [10, 0]
});
var MIcon2 = L.icon({
    iconUrl: './Marker/Mark2.png',
    iconSize: [18, 18],
    iconAnchor: [10, 5],
    // popupAnchor: [10, 0]
});
var MIcon3 = L.icon({
    iconUrl: './Marker/Mark3.png',
    iconSize: [18, 18],
    iconAnchor: [10, 5],
    // popupAnchor: [10, 0]
});

var L53 = 'https://eec-onep.online:8443/geoserver/eec/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=eec%3Aa__53_9w_reser63_3p&maxFeatures=50&outputFormat=application%2Fjson'
var L58 = 'https://eec-onep.online:8443/geoserver/eec/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=eec%3Aa__58_water_mnre&maxFeatures=50&outputFormat=application%2Fjson'
var L59 = 'https://eec-onep.online:8443/geoserver/eec/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=eec%3Aa__59_water_onep&maxFeatures=50&outputFormat=application%2Fjson'
var L60 = 'https://eec-onep.online:8443/geoserver/eec/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=eec%3Aa__60_water_stand_eec&maxFeatures=50&outputFormat=application%2Fjson'


axios.get(L58).then((r) => {
    var d = r.data.features
    // console.log(r.data.features);
    let lg = L.layerGroup()
    d.map(i => {
        if (i.properties) {
            m58 = L.circleMarker([i.geometry.coordinates[1], i.geometry.coordinates[0]], {
                radius: 8,
                fillColor: "#01c8ff",
                color: "#232323",
                weight: 0.2,
                opacity: 1,
                fillOpacity: 1,
            }).bindPopup(`<h6><b>ที่ตั้ง :</b> ${i.properties.tam_nam_t} ${i.properties.amphoe_t} ${i.properties.prov_nam_t}</h6>`)
        }
        lg.addLayer(m58);
    })
    lg.addTo(map)
    lyrControl.addOverlay(lg, "จุดเฝ้าระวังคุณภาพน้ำจากสสภ.13")
});


axios.get(L59).then((r) => {
    var d = r.data.features
    // console.log(r.data.features);
    let lg = L.layerGroup()
    d.map(i => {
        if (i.properties) {
            m59 = L.circleMarker([i.properties.point_y, i.properties.point_x], {
                radius: 8,
                fillColor: "#216cdc",
                color: "#232323",
                weight: 0.2,
                opacity: 1,
                fillOpacity: 1,
            }).bindPopup(`<h6><b>ที่ตั้ง :</b> ${i.properties.tam_nam_t} ${i.properties.amphoe_t} ${i.properties.prov_nam_t}</h6>`)
        }
        lg.addLayer(m59);
    })
    lg.addTo(map)
    lyrControl.addOverlay(lg, "จุดเก็บน้ำเพื่อวิเคราะห์คุณภาพน้ำในโครงการฯ")
});

axios.get(L60).then((r) => {
    var d = r.data.features
    // console.log(r.data.features);
    let lg = L.layerGroup()
    d.map(i => {
        if (i.properties) {
            m60 = L.circleMarker([i.properties.lat, i.properties.long], {
                radius: 8,
                fillColor: "#006898",
                color: "#232323",
                weight: 0.2,
                opacity: 1,
                fillOpacity: 1,
            }).bindPopup(`<h6><b>รหัสสถานี :</b> ${i.properties.station}</h6><h6><b>ชื่อแหล่งน้ำ :</b> ${i.properties.name_river}</h6><h6><b>จังหวัด :</b> ${i.properties.prov}</h6><h6><b>ค่า WQI :</b> ${i.properties.wqi.toFixed(2)} ${i.properties.quality}</h6> `)
        }
        lg.addLayer(m60);
    })
    lg.addTo(map)
    lyrControl.addOverlay(lg, "จุดวัดคุณภาพน้ำผิวดิน")
});

axios.get(L53).then((r) => {
    var d = r.data.features
    // console.log(r.data.features);
    let lg = L.layerGroup()
    d.map(i => {
        if (i.geometry) {
            let json = i.geometry;
            m53 = L.geoJson(json, {
                style: {
                    fillcolor: "#7acdf3",
                    color: "#7acdf3",
                    weight: 0.2,
                    opacity: 1,
                    fillOpacity: 1,
                },
                name: "53",
            }).bindPopup(`<h6><b>ชื่อแหล่งน้ำ :</b> ${i.properties.name}</h6>`)
        }
        lg.addLayer(m53);
    })
    lg.addTo(map)
    lyrControl.addOverlay(lg, "อ่างเก็บน้ำ")
});

let refreshPage = () => {
    location.href = "./../report/index.html";
    // console.log("ok");
}

let confirmDelete = (ws_id, ws_station, ws_location, date) => {
    $("#projId").val(ws_id)
    $("#projName").text(`สถานี ${ws_station} ${ws_location}`)
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
    let ws_id = $("#projId").val()
    axios.post(url + "/ws-api/delete", { ws_id: ws_id }).then(r => {
        r.data.data == "success" ? closeModal() : null
        $('#myTable').DataTable().ajax.reload();
    })
}

let getDetail = (e) => {
    sessionStorage.setItem('ws_id', e);
    sessionStorage.setItem('ws_from_admin', 'yes');
    location.href = "./../detail/index.html";
}
let dtable
let loadTable = (data) => {
    // console.log(data);
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

    data.usrid = urid
    dtable = $('#myTable').DataTable({
        ajax: {
            type: "POST",
            url: url + '/ws-api/getownerdata',
            data: data,
            dataSrc: 'data'
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    // console.log(data);
                    return `
                       <a class="btn btn-margin btn-info" href="#charttitle" onclick="getDetail(${row.ws_id})"><i class="bi bi-journal-richtext"></i>&nbsp;แก้ไขข้อมูล</a>
                       <button class="btn btn-margin btn-danger" onclick="confirmDelete('${row.ws_id}','${row.ws_station}','${row.ws_location}','${row.date}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>
                                             `
                    //    <a class="btn btn-margin btn-success" href="#charttitle" onclick="getChart(${row.ws_id})"><i class="bi bi-bar-chart-fill"></i>&nbsp;แสดงกราฟ</a>
                },
                // width: '30%'
            },
            {
                data: '',
                render: (data, type, row) => {
                    return `${row.ws_station}`
                }
            },
            { data: 'ws_location' },
            { data: 'ws_river' },
            { data: 'ws_province' },
            { data: 'date' },
            { data: 'ws_do' },
            { data: 'ws_bod' },
            { data: 'ws_tcb' },
            { data: 'ws_fcb' },
            { data: 'ws_nh3n' },
            {
                data: null,
                "render": function (data, type, row) { return Number(data.ws_wqi).toFixed(2) }
            },
            { data: 'ws_tp' }
        ],
        columnDefs: [
            { className: 'text-center', targets: [0, 1, 3, 5, 6, 7, 8, 9, 10, 11, 12] },
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
        // getMarker(data);
        stationList(data)
        station_hide()
    });
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


let lineChart = (div, label, unit, series, min1, max1, min2, max2) => {

    am4core.useTheme(am4themes_animated);

    // Create chart instance
    var chart = am4core.create(div, am4charts.XYChart);

    // Add data
    chart.data = series;

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = label + " " + unit;

    // Create series
    function createSeries(field, name) {
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.dateX = "date";
        series.name = name;
        // series.tooltipText = `{dateX}: [bold]{valueY.formatNumber('###,###,###.##')} ${unit}[/]`;
        series.strokeWidth = 2;
        // series.tensionX = 0.77;
        // series.tooltip.getFillFromObject = false;
        // series.tooltip.background.fill = am4core.color("#35E1E5");
        series.stroke = am4core.color("#42a5f5");

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 3;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color("#fff");
        // bullet.circle.stroke = am4core.color("#03a9f4");
        bullet.adapter.add("stroke", function (fill, target) {
            if (target.dataItem.valueY > min2) {
                return am4core.color("#E53935");
            }
            else if (target.dataItem.valueY < max1) {
                return am4core.color("#E53935");
            } return fill;

        })

        var bullet2 = series.bullets.push(new am4charts.Bullet());
        bullet2.tooltipText = `{dateX}: [bold]{valueY.formatNumber('###,###,###.##')} ${unit}[/]`;
        bullet2.adapter.add("fill", function (fill, target) {
            if (target.dataItem.valueY > min2) {
                return am4core.color("#E53935");
            }
            else if (target.dataItem.valueY < max1) {
                return am4core.color("#E53935");
            } return fill;
        })

        var bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;

        var range = valueAxis.createSeriesRange(series);
        range.value = min1;
        range.endValue = max1;
        range.contents.stroke = am4core.color("#E53935");
        range.contents.fill = range.contents.stroke;

        var range2 = valueAxis.createSeriesRange(series);
        range2.value = min2;
        range2.endValue = max2;
        range2.contents.stroke = am4core.color("#E53935");
        range2.contents.fill = range.contents.stroke;

        return series;
    }

    var series1 = createSeries("value", label);

    chart.legend = new am4charts.Legend();
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

    chart.events.on('ready', () => {
        $("#chartall").slideDown();
    });
}


let geneChart = (arr, div, tt, unit, unit2, min, max, value) => {
    $("#spinner").hide();
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create(div, am4charts.XYChart);
    chart.data = arr

    var title = chart.titles.create();
    title.text = tt;
    // title.align = "center";
    title.fontSize = 14;
    title.marginBottom = 12;
    title.fontWeight = 600;
    title.paddingLeft = 50;

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "cat";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.fontSize = 14;

    var axis = chart.yAxes.push(new am4charts.ValueAxis());
    axis.paddingLeft = 5;
    axis.paddingRight = 5;
    axis.min = 0;
    // axis.layout = "absolute";

    axis.title.text = unit;
    axis.title.rotation = 270;
    axis.title.align = "center";
    // axis.title.valign = "top";
    // axis.title.dy = 12;
    axis.title.fontSize = 14;

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "val";
    series.dataFields.categoryX = "cat";
    // series.name = "Visits";
    series.columns.template.tooltipText = `{categoryX}: [bold]{valueY} ${unit2}[/] `;
    series.columns.template.fillOpacity = .8;

    if (value > max) {
        series.stroke = am4core.color("#e53935");
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color("#e53935");
        series.columns.template.stroke = am4core.color("#e53935");
        series.columns.template.fill = am4core.color("#e53935");
    }

    else if (value < max) {
        series.stroke = am4core.color("#64b5f6");
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color("#64b5f6");
        series.columns.template.stroke = am4core.color("#64b5f6");
        series.columns.template.fill = am4core.color("#64b5f6");
    }

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
        if (data[0].val == null) {
            showIndicator();
        }
    });
}

// let getStation = (prov) => {
//     $("#sta").empty();
//     $("#sta").append(`<option>เลือก</option>`);
//     axios.post(url + "/ws-api/getstation", { prov }).then(r => {
//         r.data.data.map(i => $("#sta").append(`<option value="${i.ws_station}">${i.ws_river} (${i.ws_station})</option>`))
//     })
// }

$("#charttitle").hide();
$("#spinner").hide();
let v = {
    ws_do: ['DO', '(mg/l)', 'mg/l'],
    ws_bod: ['BOD', '(mg/l)', 'mg/l'],
    ws_tcb: ['Total Coliform Bacteria', '(MPN/100ml)', 'MPN/100ml'],
    ws_fcb: ['Fecal Coliform Bacteria', '(MPN/100ml)', 'MPN/100ml'],
    ws_nh3n: ['แอมโมเนีย', '(mg/l)', 'mg/l'],
    ws_wqi: ['ค่ามาตรฐานคุณภาพน้ำ', '', ''],
    ws_tp: ['ฟอสฟอรัสทั้งหมด', '', ''],
    ws_ts: ['ของแข็งทั้งหมด', '', ''],
    ws_ss: ['ของแข็งแขวนลอย', '', ''],
    ws_temp: ['อุณหภูมิ', 'องศาเซลเซียส', '°C'],
    ws_ph: ['pH', 'pH', ''],
    ws_no3: ['ไนเตรด', '(mg/l)', 'mg/l'],
    ws_phenols: ['ฟีนอล', '(mg/l)', 'mg/l'],
    ws_cu: ['ทองแดง', '(mg/l)', 'mg/l'],
    ws_ni: ['มิคเกิล', '(mg/l)', 'mg/l'],
    ws_mn: ['แมงกานีส', '(mg/l)', 'mg/l'],
    ws_zn: ['สังกะสี', '(mg/l)', 'mg/l'],
    ws_cd: ['แคดเมียม', '', ''],
    ws_crhex: ['โครเมียมชนิดเฮ็กซาวาเล้นท์ (Cr Hexavalent)', ''],
    ws_pb: ['ตะกั่ว', '(mg/l)', 'mg/l'],
    ws_totalhg: ['ปรอททั้งหมด', '(mg/l)', 'mg/l'],
    ws_as: ['สารหนู', '', ''],
    ws_cyanide: ['ไซยาไนด์', '(mg/l)', 'mg/l'],
    ws_radioa: ['กัมมันตภาพรังสี (Radioactivity)', '', ''],
    ws_top: ['สารฆ่าศัตรูพืชและสัตว์ชนิดที่มีคลอรีนทั้งหมด', '(mg/l)', 'mg/l'],
    ws_ddt: ['ดีดีที', '(µg/l)', 'µg/l'],
    ws_alphsb: ['บีเอชซีชนิดแอลฟา (Alpha-BHC)', '(µg/l)', 'µg/l'],
    ws_dield: ['ดิลดริน (Dieldrin)', '(µg/l)', 'µg/l'],
    ws_aldrin: ['อัลดริน (Aldrin)', '(µg/l)', 'µg/l'],
    ws_hepta: ['เฮปตาคอร์ และเฮปตาคลอร์อีปอกไซด์', '(µg/l)', 'µg/l'],
    ws_endrin: ['เอนดริน (Endrin)', '', ''],
}
let getChart = (ws_id) => {
    $("#spinner").show();
    $("#chartd").empty()
    let obj = {
        ws_id: ws_id
    }
    axios.post(url + "/ws-api/getone", obj).then((r) => {
        // console.log(r);
        $("#staname").text(r.data.data[0].ws_station);
        $("#date").text(r.data.data[0].date)
        $("#charttitle").show();
        for (const [key, value] of Object.entries(r.data.data[0])) {
            // console.log(key)
            if (v[key] && value) {
                // console.log(key, value);
                if (Number(value) < 9999999) {
                    $("#chartd").show().append(
                        `<div class="col-sm-4">
                            <div class="card p-1">
                                <div class="card-body wschart" id="${key}"></div>
                            </div>
                        </div>`
                    )
                    if (key == "ws_do") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 4, 10, value); }
                    else if (key == "ws_bod") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 2, value); }
                    else if (key == "ws_fcb") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 4000, value); }
                    else if (key == "ws_wqi") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 61, 100, value); }
                    else if (key == "ws_nh3n") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 0.5, value); }
                    else if (key == "ws_tcb") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 20000, value); }
                    else if (key == "ws_tp") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 1000, value); }
                    else if (key == "ws_ts") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 1000, value); }
                    else if (key == "ws_ss") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 1000, value); }
                    else if (key == "ws_temp") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 40, value); }
                    else if (key == "ws_ph") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 5, 9, value); }
                    else if (key == "ws_no3") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 5, value); }
                    else if (key == "ws_phenols") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 0.005, value); }
                    else if (key == "ws_cu") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 0.1, value); }
                    else if (key == "ws_ni") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 0.1, value); }
                    else if (key == "ws_mn") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 1, value); }
                    else if (key == "ws_zn") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 1, value); }
                    else if (key == "ws_cd") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 0.005, value); }
                    else if (key == "ws_crhex") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 0.05, value); }
                    else if (key == "ws_pb") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 0.05, value); }
                    else if (key == "ws_totalhg") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 0.002, value); }
                    else if (key == "ws_as") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 0.01, value); }
                    else if (key == "ws_cyanide") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 0.005, value); }
                    else if (key == "ws_radioa") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 0.1, value); }
                    else if (key == "ws_top") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], v[key][2], 0, 0.05, value); }
                    else if (key == "ws_ddt") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 1, value); }
                    else if (key == "ws_alphsb") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 0.02, value); }
                    else if (key == "ws_dield") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 0.1, value); }
                    else if (key == "ws_aldrin") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 0.1, value); }
                    else if (key == "ws_hepta") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 0.2, value); }
                    else if (key == "ws_endrin") { geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 500000, value); }
                    else {
                        geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1], v[key][2], 0, 999999, value);
                    }
                }
            }
        }
    });
    $("#referlink").show().html(
        `<div class="row" style="margin-left: 1%; color: darkgrey;">
        <span>หมายเหตุ: <span style="color: #B30D02; font-weight: bold;"> สีแดง </span> หมายถึง ค่าคุณภาพน้ำผิวดินไม่อยู่ในเกณฑ์มาตรฐาน</span>
        </div>
        <div class="row" style="margin-left: 1%;" id=>
        อ้างอิงจากเกณฑ์ของดัชนีคุณภาพน้ำของประเทศไทย <a
            href="https://www.pcd.go.th/laws/ประกาศคณะกรรมการสิ่งแ-19/" target="_blank">กรมควบคุมมลพิษ</a>
    </div>`)
}


// $("#pro").on("change", function () {
//     // getPro(this.value)
//     let dat;
//     this.value == 'eec' ? dat = 'ทุกจังหวัด' : null;
//     this.value == '24' ? dat = 'ฉะเชิงเทรา' : null;
//     this.value == '20' ? dat = 'ชลบุรี' : null;
//     this.value == '21' ? dat = 'ระยอง' : null;

//     zoomExtent("pro", this.value);
//     getStation(dat);
//     $("#myTable").dataTable().fnDestroy();
//     loadTable({ type: "prov", dat });
// });

let ws_wqi = [];
let ws_bod = [];
let ws_do = [];
let ws_fcb = [];
let ws_nh3n = [];
let ws_tcb = [];

$("#sta").on("change", function () {
    // console.log(this.value);
    axios.post(url + "/ws-api/getstationone", { ws_station: this.value }).then(r => {
        ws_wqi = [];
        ws_bod = [];
        ws_do = [];
        ws_fcb = [];
        ws_nh3n = [];
        ws_tcb = [];

        r.data.data.map(i => {
            ws_wqi.push({ "date": i.ws_date, "value": Number(i.ws_wqi) });
            ws_bod.push({ "date": i.ws_date, "value": Number(i.ws_bod) });
            ws_do.push({ "date": i.ws_date, "value": Number(i.ws_do) });
            ws_fcb.push({ "date": i.ws_date, "value": Number(i.ws_fcb) });
            ws_nh3n.push({ "date": i.ws_date, "value": Number(i.ws_nh3n) });
            ws_tcb.push({ "date": i.ws_date, "value": Number(i.ws_tcb) });
        })
    })

    $('#chartall').slideUp();
    $('#parameter').prop('selectedIndex', 0);
    hidechart();
});
$("#chartall").hide()
$("#parameter").on("change", function () {

    let sta = $('#sta').val();
    var parameter = $("#parameter").val();

    let sta_n = $('#sta').children("option:selected").text()
    let para_n = $('#parameter').children("option:selected").text()
    $('#sta_H').text(sta_n);
    $('#para_H').text(para_n);

    if (sta !== 'eec') {
        if (parameter == "WQI") {
            lineChart("chartdiv", "WQI", "WQI", ws_wqi, 0, 61, 100, 500);
            $('#criterion').empty().text(`ค่า WQI ไม่อยู่ในเกณฑ์มาตรฐานช่วงที่ 61 - 100`)
        }
        else if (parameter == "DO") {
            lineChart("chartdiv", "DO", "(mg/l)", ws_do, 0, 4, 10, 100);
            $('#criterion').empty().text(`ค่า DO ไม่อยู่ในเกณฑ์มาตรฐานช่วงที่ 4 - 10`)
        }
        else if (parameter == "BOD") {
            lineChart("chartdiv", "BOD", "(mg/l)", ws_bod, 0, 0, 2, 500);
            $('#criterion').empty().text(`ค่า BOD ไม่อยู่ในเกณฑ์มาตรฐานช่วงที่ 0 - 2`)
        }
        else if (parameter == "FCB") {
            lineChart("chartdiv", "FCB", "(MPN/100ml)", ws_fcb, 0, 0, 4000, 500000);
            $('#criterion').empty().text(`ค่า FCB ไม่อยู่ในเกณฑ์มาตรฐานช่วงที่ 0 - 4,000`)
        }
        else if (parameter == "AMM") {
            lineChart("chartdiv", "แอมโมเนีย", "(mg/l)", ws_nh3n, 0, 0, 0.5, 10);
            $('#criterion').empty().text(`ค่าแอมโมเนีย ไม่อยู่ในเกณฑ์มาตรฐานช่วงที่ 0 - 0.5`)
        }
        else if (parameter == "TCB") {
            lineChart("chartdiv", "TCB", "(MPN/100ml)", ws_tcb, 0, 0, 20000, 250000);
            $('#criterion').empty().text(`ค่า TCB ไม่อยู่ในเกณฑ์มาตรฐานช่วงที่ 0 - 20,000`)
        } else {
            $('#chartall').slideUp();
            $('#criterion').empty().text(`ค่าคุณภาพน้ำผืวดินไม่อยู่ในเกณฑ์มาตรฐาน`)
        }
    } else {
        $('#warningModal').modal('show');
    }
});

$(document).ready(() => {
    loadTable({ type: "prov", dat: 'ทุกจังหวัด' })
    checkdata({ usrid: urid, type: "prov", dat: 'ทุกจังหวัด' })
    getsta({ usrid: urid, type: "prov", dat: 'ทุกจังหวัด' })
    // setall_dat()
})

let stationList = (data) => {
    // console.log(data);

    $("#station").empty().append(`<option value="eec">เลือกสถานี/จุดตรวจวัด</option>`);
    data.map(i => {
        if (i.location !== null) {
            $("#station").append(`<option value="${i.ws_id}">${i.ws_river} ${i.ws_location !== null ? i.ws_location : ''} (รหัสสถานี:${i.ws_station}  ${i.date !== null ? "วันที่" + i.date : ''})</option>`)
        }
    })

    // $("#sta").empty().append(`<option value="eec">เลือกสถานี/จุดตรวจวัด</option>`);
    // data.map(i => {
    //     $("#sta").append(`<option value="${i.ws_station}">${i.ws_river} (${i.ws_station})</option>`)
    // })
}
$("#pro").on("change", function () {
    getsta({ usrid: urid, type: "prov", dat: this.value })
    if (this.value !== "ทุกจังหวัด") {
        dtable.search(this.value).draw();
    } else {
        dtable.search(this.value).draw();
    }
})
$("#sta").on("change", function () {
    if (this.value !== "eec") {
        dtable.search(this.value).draw();
    } else {
        let pro_n = $("#pro").val();
        dtable.search(pro_n).draw();
    }
})
$("#station").on("change", function () {
    if (this.value !== 'eec') {
        getChart(this.value)
    } else {
        $("#charttitle").hide();
        $("#chartd").hide();
        $("#spinner").hide();
        $("#referlink").hide();
    }
})

let hidechart = () => {
    $("#charttitle").slideUp();
    $("#chartd").hide();
    $("#spinner").hide();
    $("#referlink").hide();
}

let checkdata = (prov) => {
    axios.post(url + '/ws-api/getownerdata', prov).then(r => {
        let d = r.data.data
        if (d.length == 0) {
            $("#warningModal2").modal("show")
        }
    })
}

let getsta = (data) => {
    axios.post(url + '/ws-api/getownerdata', data).then(r => {
        let d = r.data.data
        // console.log(d)
        $("#sta").empty().append(`<option value="eec">เลือกสถานี/จุดตรวจวัด</option>`);
        d.map(i => {
            $("#sta").append(`<option value="${i.ws_station}">${i.ws_river} จ.${i.ws_province} (${i.ws_station} )</option>`)
        })
    })
}
let station_hide = () => {
    $("#charttitle").hide();
    $("#chartd").hide();
    $("#spinner").hide();
    $("#referlink").hide();
}


let loadWtrl = async () => {
    let iconblue = L.icon({
        iconUrl: './marker/gas-station.png',
        iconSize: [40, 45],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let sta = [
        {
            staname: "station_01",
            latlon: [12.8661616, 100.9989804],
            measure: 275.5
        }, {
            staname: "station_02",
            latlon: [12.848099999999983, 100.95313000000002],
            measure: 244
        }, {
            staname: "station_03",
            latlon: [12.846510200000028, 100.9376361],
            measure: 298
        }, {
            staname: "station_04",
            latlon: [12.694406999999996, 101.44470699999997],
            measure: 294
        }, {
            staname: "station_05",
            latlon: [12.703484000000008, 101.468717],
            measure: 280
        }, {
            staname: "station_06",
            latlon: [12.70139960000001, 101.49543049999],
            measure: 435
        }, {
            staname: "station_07",
            latlon: [12.985111299999994, 101.6776677],
            measure: 380.6
        }, {
            staname: "station_08",
            latlon: [12.909515899999995, 101.71460159999998],
            measure: 512
        }, {
            staname: "station_09",
            latlon: [12.836749900000017, 101.73254899999998],
            measure: 550.5
        }]

    sta.map(async (i) => {
        let resSt01 = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrl-api-get2.php', { station: i.staname, limit: 1 });
        resSt01.then(r => {
            let d = r.data.data[0];
            let marker = L.marker(i.latlon, {
                icon: iconblue,
                name: 'lyr',
                // data: dat
            });
            // console.log(i.measure);
            wtrlFc.addLayer(marker)
            // marker.addTo(map)
            marker.bindPopup(`<div style="font-family:'Kanit'"> 
                        ชื่อสถานี : ${i.staname} <br>
                        ระดับน้ำ : ${i.measure - Number(d.deep).toFixed(1) < 1 ? 0 : i.measure - Number(d.deep).toFixed(1)} mm.<br>
                        ความชื้นสัมพัทธ์ : ${Number(d.humidity).toFixed(1)} %.<br>
                        อุณหภูมิ : ${Number(d.temperature).toFixed(1)} องศาเซลเซียส<br>
                        ดูกราฟ <span style="font-size: 20px; color:#006fa2; cursor: pointer;" onclick="wtrlModal('${i.staname}', ${i.measure})"><i class="bi bi-file-earmark-bar-graph"></i></span>
                        </div>`
            )
        })
    })
}
let wtrlModal = (stname, measure) => {
    // console.log(measure);
    // 
    let arrDept = [];
    let arrTemp = [];
    let arrHumi = [];
    axios.post("https://eec-onep.soc.cmu.ac.th/api/wtrl-api-get-by-day.php", { stname }).then(r => {
        // console.log(r);
        r.data.data.map(i => {
            arrDept.push({
                "date": i.dt,
                "value": measure - i.dept < 1 ? 0.0 : Math.round(measure - i.dept)
            });
            arrTemp.push({
                "date": i.dt,
                "value": Math.round(i.temp)
            });
            arrHumi.push({
                "date": i.dt,
                "value": Math.round(i.humi)
            });
        })
    })

    setTimeout(() => {
        // console.log(arrDept, arrTemp, arrHumi);
        wtrlChart(arrDept, "depthChart", "ระดับน้ำ (cm.)");
        wtrlChart(arrTemp, "tempChart", "อุณหภูมิ (°C)");
        wtrlChart(arrHumi, "humiChart", "ความชื้น (%)");
    }, 500)


    $("#wtrlModal").modal("show");

}
let wtrlChart = (arrData, div, unit) => {
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    var chart = am4core.create(div, am4charts.XYChart);

    // Add data
    chart.data = arrData;

    // Set input format for the dates
    // chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm:ss";
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.baseValue = 0;
    valueAxis.title.text = unit;

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}";
    // series.tensionX = 0.8;
    series.strokeWidth = 2;
    series.minBulletDistance = 15;
    series.stroke = am4core.color("#00b80f");

    // Drop-shaped tooltips
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";

    // var range = valueAxis.createSeriesRange(series);
    // range.value = index;
    // range.endValue = -1000;
    // range.contents.stroke = am4core.color("#ff0000");
    // range.contents.fill = range.contents.stroke;

    // Make bullets grow on hover
    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");

    // Make a panning cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panXY";
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

    // Create a horizontal scrollbar with previe and place it underneath the date axis
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    dateAxis.start = 0.59;
    dateAxis.keepSelection = true;
}

loadWtrl()