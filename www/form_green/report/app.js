let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let f_green = sessionStorage.getItem('f_green');

if (f_green == 'true') {
    location.href = "./../../form_register/login/index.html";
}

$("#usrname").text(urname);

const url = "https://eec-onep.online:3700";
// const url = 'http://localhost:3700';

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
const greenmuni = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: 'eec:a__52_gsus_muni',
    format: "image/png",
    transparent: true,
    // maxZoom: 10,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});
const municiple = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
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
    "ขอบเขตอำเภอ": amp,
    "ขอบเขตตำบล": tam,
    "ขอบเขตเทศบาล": municiple,
    "พื้นที่สีเขียว": fc.addTo(map),
    "พื้นที่สีเขียวยั่งยืนในเขตเทศบาล": greenmuni,

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
        div.innerHTML += '<i style="background: #FFFFFF; border-color: #987db7; border-style: solid; border-width: 2px;"></i><span>ขอบเขตเทศบาล</span><br>';
        div.innerHTML += '<i style="background: #0c9953; border-color: #038a5a; border-style: solid; border-width: 1.5px;"></i><span>พื้นที่สีเขียว</span><br>';
        div.innerHTML += '<i style="background: #74e19e; border-radius: 1%;"></i><span>พื้นที่สีเขียวยั่งยืนในเขตเทศบาล</span><br>';
        div.innerHTML += '<i style="background: #ff5100; border-radius: 50%;"></i><span>จุดความร้อน</span><br>';
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

let confirmDelete = (id, gr_name) => {
    $("#projId").val(id)
    $("#projName").text(gr_name)
    $("#deleteModal").modal("show")
}

let closeModal = () => {
    $('#editModal').modal('hide')
    $('#deleteModal').modal('hide')
    $('#myTable').DataTable().ajax.reload();
}

let deleteValue = () => {
    // console.log($("#projId").val());
    let orgid = $("#projId").val()
    axios.post(url + "/green-api/delete", { orgid: orgid }).then(r => {
        r.data.data == "success" ? closeModal() : null
        $('#myTable').DataTable().ajax.reload();
    })
}

$("#charttitle").hide();
$("#spinner").hide();
let getChart = (ws_id) => {
    $("#spinner").show();
    $("#chartd").empty()
    let obj = {
        ws_id: ws_id
    }
    axios.post(url + "/ws-api/getone", obj).then((r) => {
        // console.log(r);
        $("#staname").text(r.data.data[0].ws_station)
        $("#charttitle").show()
        for (const [key, value] of Object.entries(r.data.data[0])) {
            if (v[key] && value) {
                $("#chartd").append(
                    `<div class="col-sm-4">
                        <div class="card p-1">
                            <div class="card-body" id="${key}"></div>
                        </div>
                    </div>`
                )
                geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1]);
            }
        }
    })
}

fc.on("click", (e) => {
    // console.log(e.layer.toGeoJSON());
});

let removeLayer = () => {
    map.eachLayer(i => {
        i.options.name ? map.removeLayer(i) : null;
        // console.log(i);
    })
}

let getDataForMap = (data) => {
    removeLayer()

    let style = {
        fillColor: '#0c9953',
        weight: 3,
        opacity: 1,
        color: '#038a5a',
        // dashArray: '3',
        fillOpacity: 0.7
    }

    data.map(i => {
        let json = L.geoJSON(JSON.parse(i.geojson), { name: "json", style: style });
        json.addTo(fc);

    })
    map.fitBounds(fc.getBounds());
}

let showAreaChart = (data) => {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("areaChart", am4charts.PieChart);

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "val";
    pieSeries.dataFields.category = "cat";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template
        // change the cursor on hover to make it apparent the object can be interacted with
        .cursorOverStyle = [
            {
                "property": "cursor",
                "value": "pointer"
            }
        ];

    pieSeries.alignLabels = false;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
    shadow.opacity = 0;

    // Create hover state
    var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // Add a legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
    // chart.legend.valueLabels.template.textAlign = "end";
    // chart.legend.itemContainers.template.paddingLeft = 15;

    chart.data = data;
}

let showCountChart = (data) => {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("cntChart", am4charts.XYChart);
    chart.scrollbarX = new am4core.Scrollbar();

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
}

let getDataForChart = (data) => {
    // console.log(data);
    let cba = 0;
    let cb = 0;
    let rya = 0;
    let ry = 0;
    let csa = 0;
    let cs = 0;
    data.map(i => {
        // console.log(i);
        if (i.prov_nam_t == "จ.ชลบุรี") {
            cba += Number(i.rai);
            cb += 1;
        }

        if (i.prov_nam_t == "จ.ระยอง") {
            rya += Number(i.rai);
            ry += 1;
        }

        if (i.prov_nam_t == "จ.ฉะเชิงเทรา") {
            csa += Number(i.rai);
            cs += 1;
        }
    })

    let cnt = [{
        "cat": "จ.ชลบุรี",
        "val": cb
    }, {
        "cat": "จ.ระยอง",
        "val": ry
    }, {
        "cat": "จ.ฉะเชิงเทรา",
        "val": cs
    }];

    let area = [{
        "cat": "จ.ชลบุรี",
        "val": cba
    }, {
        "cat": "จ.ระยอง",
        "val": rya
    }, {
        "cat": "จ.ฉะเชิงเทรา",
        "val": csa
    }];

    // console.log(cnt);
    showAreaChart(area);
    showCountChart(cnt)
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
    let table = $('#myTable').DataTable({
        scrollX: true,
        ajax: {
            async: true,
            type: "POST",
            url: url + '/green-api/getownerdata',
            data: { usrid: urid },
            dataSrc: 'data'
        },
        columns: [
            {
                data: null,
                render: (data, type, row, meta) => {
                    return `${meta.row + 1}`
                }
            },
            { data: 'gr_name' },
            {
                data: '',
                render: (data, type, row) => {
                    return `${row.amphoe_t} ${row.prov_nam_t} `
                }
            },
            {
                data: '',
                render: (data, type, row) => {
                    // console.log();
                    if (row.type == "ประเภทที่1") {
                        return 1;
                    } else if (row.type == "ประเภทที่2") {
                        return 2;
                    } else if (row.type == "ประเภทที่3") {
                        return 3;
                    } else if (row.type == "ประเภทที่4") {
                        return 4;
                    } else if (row.type == "ประเภทที่5") {
                        return 5;
                    } else if (row.type == "ประเภทที่6") {
                        return 6;
                    } else {
                        return 'ไม่ระบุ'
                    }
                }
            },
            { data: 'rai' },
            { data: 'usrname' },
            {
                data: null,
                render: function (data, type, row, meta) {
                    // console.log(row);
                    return `<button class="btn btn-margin btn-outline-success" onclick="getDetail(${row.gid})"><i class="bi bi-bar-chart-fill"></i>&nbsp;รายละเอียด</button>&nbsp;
                            <button class="btn btn-margin btn-outline-danger" onclick="confirmDelete('${row.gid}','${row.gr_name}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>`
                },
                width: "25%"
            }
        ],
        columnDefs: [
            { className: 'text-center', targets: [0, 3, 4, 5, 6] },
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
    location.href = "./../detail/index.html";
}

let geneChart = (arr, div, tt, unit) => {
    $("#spinner").hide();
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create(div, am4charts.XYChart);
    chart.data = arr

    var title = chart.titles.create();
    title.text = tt;
    title.fontSize = 14;
    title.marginBottom = 5;

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "cat";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.fontSize = 14;

    var axis = chart.yAxes.push(new am4charts.ValueAxis());
    axis.paddingLeft = 5;
    axis.paddingRight = 5;
    // axis.layout = "absolute";

    axis.title.text = unit;
    axis.title.rotation = 270;
    axis.title.align = "center";
    axis.title.valign = "top";
    axis.title.dy = 12;
    axis.title.fontSize = 14;

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
}


$(document).ready(() => {
    loadTable();
    loadHotspot()
});
let hpData = axios.get("https://rti2dss.com:3600/hp_api/hp_viirs_th?fbclid=IwAR34tLi82t2GbsXPK8DmS30NJDWN93Q1skgP-eACKOucWs9pNYjHs24kHT4");
let onEachFeature = (feature, layer) => {
    if (feature.properties) {
        const time = feature.properties.acq_time;
        const hr = Number(time.slice(0, 2));
        const mn = Number(time.slice(2, 4));
        layer.bindPopup(
            `<h6><b>ตำแหน่งจุดความร้อน</b></h6>
        <span class="kanit">lat: ${feature.properties.latitude}</span>
        <span class="kanit">lon: ${feature.properties.longitude} </span>
        <br/><span class="kanit">satellite: ${feature.properties.satellite} </span>
        <br/><span class="kanit">วันที่: ${feature.properties.acq_date} </span>
        <br/><span class="kanit">เวลา: ${hr}:${mn}</span>`
        );
    }
}
let loadHotspot = async () => {
    let hp = await hpData;
    // console.log(hp);
    const fs = hp.data.data.features;

    var geojsonMarkerOptions = {
        radius: 6,
        fillColor: "#ff5100",
        color: "#a60b00",
        weight: 0,
        opacity: 1,
        fillOpacity: 0.8
    };

    const marker = await L.geoJSON(fs, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: onEachFeature
    })
    // .addTo(map);

    lyrControl.addOverlay(marker, "จุดความร้อน");
}




