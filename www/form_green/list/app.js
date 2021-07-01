let urid = sessionStorage.getItem('id');
let urname = sessionStorage.getItem('name');
$("#usrname").text(urname);
urid ? null : location.href = "./../../form_register/login/index.html";

const url = "https://eec-onep.online:3700";
// const url = 'http://localhost:3700';

let latlng = {
    lat: 16.820378,
    lng: 100.265787
}
let map = L.map('map', {
    center: latlng,
    zoom: 13
});

let fc = L.featureGroup();

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

    var pro = L.tileLayer.wms("http://rti2dss.com:8080/geoserver/th/wms?", {
        layers: 'th:province_4326',
        format: 'image/png',
        transparent: true
    });
    var baseMap = {
        "Mapbox": mapbox.addTo(map),
        "google Hybrid": ghyb
    }
    var overlayMap = {
        "ขอบเขตจังหวัด": pro,
        "พื้นที่สีเขียว": fc.addTo(map)
    }
    L.control.layers(baseMap, overlayMap).addTo(map);
}

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
        console.log(r);
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
    console.log(e.layer.toGeoJSON());
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
    let table = $('#myTable').DataTable({
        scrollX: true,
        ajax: {
            async: true,
            type: "POST",
            url: url + '/green-api/getdata',
            data: { userid: "sakda" },
            dataSrc: 'data'
        },
        columns: [
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
                    return `${row.type == "ประเภทที่1" ? 1 : null}`
                }
            },
            { data: 'rai' },
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

let pieChart = () => {
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("chartdiv", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
        {
            cat: "Lithuania",
            val: 260
        },
        {
            country: "Czechia",
            value: 230
        },
        {
            country: "Ireland",
            value: 200
        },
        {
            country: "Germany",
            value: 165
        },
        {
            country: "Australia",
            value: 139
        },
        {
            country: "Austria",
            value: 128
        }
    ];

    var series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "val";
    series.dataFields.radiusValue = "val";
    series.dataFields.category = "cat";
    series.slices.template.cornerRadius = 6;
    series.colors.step = 3;

    series.hiddenState.properties.endAngle = -90;

    chart.legend = new am4charts.Legend();
}

$(document).ready(() => {
    loadTable();
    loadMap();
});










