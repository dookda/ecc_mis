let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
$("#usrname").text(urname);
urid ? null : location.href = "./../../form_register/login/index.html";

if (eecauth !== "admin" && eecauth !== "office") {
    location.href = "./../../form_register/login/index.html";
}

$(document).ready(() => {
    loadTable()
    loadMap()
});

let latlng = {
    lat: 13.305567,
    lng: 101.383101
}
let map = L.map('map', {
    center: latlng,
    zoom: 13
});

let marker;

// const url = 'http://localhost:3700';
const url = "https://eec-onep.online:3700";

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
        "ขอบเขตจังหวัด": pro
    }
    L.control.layers(baseMap, overlayMap, { collapsed: false, }).addTo(map);
}

let refreshPage = () => {
    window.open("./../report/index.html", "_self");
    // console.log("ok");
}

let confirmDelete = (w_id, prj_name) => {
    $("#projId").val(w_id)
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
    let w_id = $("#projId").val()
    axios.post(url + "/waste-api/delete", { w_id: w_id }).then(r => {
        r.data.data == "success" ? closeModal() : null
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
    console.log(w_id);
    let obj = { w_id: w_id }
    axios.post(url + "/waste-api/getone", obj).then((r) => {
        $("#chartdiv").show()

        if (r.data.data[0].geojson) {
            let json = JSON.parse(r.data.data[0].geojson);
            showMarker(json.coordinates[1], json.coordinates[0]);
            // showMarker(json)
        }

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

let loadTable = () => {
    let table = $('#myTable').DataTable({
        ajax: {
            type: "POST",
            url: url + '/waste-api/getdata',
            data: { userid: "sakda" },
            dataSrc: 'data'
        },
        columns: [
            // { data: 'prj_name' },
            {
                data: '',
                render: (data, type, row, meta) => {
                    // console.log(meta.row);
                    return `${row.insti}`
                }
            },
            { data: 'prov' },
            // { data: 'prov' },
            { data: 'date' },

            { data: 'no_hospi' },
            { data: 'no_hotel' },
            { data: 'no_mall' },
            { data: 'no_market' },
            { data: 'no_office' },
            { data: 'no_restur' },
            // { data: 'opert_stat' },
            {
                data: null,
                render: function (data, type, row, meta) {
                    // console.log(data);
                    return `
                       <button class="btn btn-margin btn-outline-danger" onclick="confirmDelete(${row.w_id},'${row.insti}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>
                       <button class="btn btn-margin btn-outline-success" onclick="getChart(${row.w_id})"><i class="bi bi-bar-chart-fill"></i>&nbsp;ดูค่าที่ตรวจวัด</button>`
                }
            }
        ],
        searching: true,
        scrollX: true,
        dom: 'Bfrtip',
        buttons: [
            'excel', 'print'
        ],
    });
    table.on('search.dt', function () {
        let data = table.rows({ search: 'applied' }).data();
        getDatatable(data);
    });
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
    });
}

let getDatatable = async (data) => {
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

    compareWasteWater("no_house", no_house);
    compareWasteWater("no_hotel", no_hotel);
    compareWasteWater("no_dorm", no_dorm);
    compareWasteWater("no_serv", no_serv);
    compareWasteWater("no_vhouse", no_vhouse);
    compareWasteWater("no_restur", no_restur);
    compareWasteWater("no_hospi", no_hospi);
    compareWasteWater("no_market", no_market);
    compareWasteWater("no_mall", no_mall);
    compareWasteWater("no_office", no_office);
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

    });
}








