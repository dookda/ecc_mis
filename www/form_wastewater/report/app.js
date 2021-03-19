$(document).ready(() => {
    loadTable()
    loadMap()
});

let latlng = {
    lat: 16.820378,
    lng: 100.265787
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
            "ลิตร/วัน"
        );

        pieChart([
            {
                cat: "อาคารชุด/บ้านพัก",
                val: r.data.data[0].no_house
            }, {
                cat: "โรงแรม",
                val: r.data.data[0].no_hotel
            }, {
                cat: "หอพัก",
                val: r.data.data[0].no_dorm
            }, {
                cat: "บ้านจัดสรร",
                val: r.data.data[0].no_vhouse
            }, {
                cat: "สถานบริการ",
                val: r.data.data[0].no_serv
            }, {
                cat: "โรงพยาบาล",
                val: r.data.data[0].no_hospi
            }, {
                cat: "ร้านอาหาร",
                val: r.data.data[0].no_restur
            }, {
                cat: "ตลาด",
                val: r.data.data[0].no_market
            }, {
                cat: "ห้างสรรพสินค้า",
                val: r.data.data[0].no_mall
            }, {
                cat: "สำนักงาน",
                val: r.data.data[0].no_office
            }, {
                cat: "โรงเรียน",
                val: r.data.data[0].no_school
            }, {
                cat: "สถานีบริการน้ำมัน",
                val: r.data.data[0].no_gassta
            }, {
                cat: "วัด",
                val: r.data.data[0].no_temple
            }, {
                cat: "ศูนย์ราชการ",
                val: r.data.data[0].no_govcent
            }, {
                cat: "คลินิก",
                val: r.data.data[0].no_clinic
            }
        ]);
    })
}

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
                render: (data, type, row) => {
                    return `${row.insti} <span class="badge bg-info text-white">aa</span>`
                }
            },
            { data: 'prov' },
            // { data: 'prov' },
            { data: 'date' },
            // { data: 'proc_stat' },
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
    });

}

let geneChart = (arr, div, tt, unit) => {
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    var chart = am4core.create(div, am4charts.XYChart);

    // Add data
    chart.data = arr

    var title = chart.titles.create();
    title.text = tt;
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

let pieChart = (arr) => {
    am4core.useTheme(am4themes_animated);

    // Create chart
    var chart = am4core.create("w_each", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = arr

    var series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "val";
    series.dataFields.radiusValue = "val";
    series.dataFields.category = "cat";
    series.slices.template.cornerRadius = 6;
    series.colors.step = 3;

    series.hiddenState.properties.endAngle = -90;
    series.hiddenInLegend = true;
    chart.legend = new am4charts.Legend();
}










