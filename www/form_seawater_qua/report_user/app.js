let urid = 'user';

$("#tbdata").hide();

$(document).ready(() => {
    loadTable()

});

// const url = "https://eec-onep.online:3700";
const url = 'http://localhost:3700';


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

const tam = L.tileLayer.wms("https://rti2dss.com:8443/geoserver/th/wms?", {
    layers: "th:tambon_4326",
    format: "image/png",
    transparent: true,
    CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=22 OR pro_code=23 OR pro_code=24 OR pro_code=25 OR pro_code=26 OR pro_code=27'
});

const amp = L.tileLayer.wms("https://rti2dss.com:8443/geoserver/th/wms?", {
    layers: "th:amphoe_4326",
    format: "image/png",
    transparent: true,
    CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=22 OR pro_code=23 OR pro_code=24 OR pro_code=25 OR pro_code=26 OR pro_code=27'
});

const pro = L.tileLayer.wms("https://rti2dss.com:8443/geoserver/th/wms?", {
    layers: "th:province_4326",
    format: "image/png",
    transparent: true,
    CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=22 OR pro_code=23 OR pro_code=24 OR pro_code=25 OR pro_code=26 OR pro_code=27'
});

let lyrs = L.featureGroup().addTo(map)

var baseMap = {
    "Mapbox": mapbox.addTo(map),
    "google Hybrid": ghyb
}

var overlayMap = {
    "ขอบเขตตำบล": tam.addTo(map),
    "ขอบเขตอำเภอ": amp.addTo(map),
    "ขอบเขตจังหวัด": pro.addTo(map)
}

L.control.layers(baseMap, overlayMap).addTo(map);


let refreshPage = () => {
    window.open("./../report/index.html", "_self");
    // console.log("ok");
}

let confirmDelete = (sq_id, prj_name) => {
    $("#projId").val(sq_id)
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
    let sq_id = $("#projId").val()
    axios.post(url + "/sq-api/delete", { sq_id: sq_id }).then(r => {
        r.data.data == "success" ? closeModal() : null
    })
}

$("#chartdiv").hide()
function getChart(sq_id) {
    let obj = {
        sq_id: sq_id
    }
    axios.post(url + "/sq-api/getone", obj).then((r) => {
        $("#chartdiv").show()
        // console.log(r.data.data[0]);
        geneChart([{ "cat": "ค่าดีโอ", "val": r.data.data[0].sq_do }], "sq_do", "ค่าดีโอ", "mg/L");
        geneChart([{ "cat": "ปริมาณแบคทีเรียกลุ่มโคลิฟอร์มทั้งหมด", "val": r.data.data[0].sq_tcb }], "sq_tcb", "ปริมาณแบคทีเรียกลุ่มโคลิฟอร์มทั้งหมด", "MPN/100ml");
        geneChart([{ "cat": "ฟอสเฟต-ฟอสฟอรัส", "val": r.data.data[0].sq_po43p }], "sq_po43p", "ฟอสเฟต-ฟอสฟอรัส", "μg-P/l");
        geneChart([{ "cat": "ไนเตรท-ไนโตรเจน", "val": r.data.data[0].sq_no3n }], "sq_no3n", "ไนเตรท-ไนโตรเจน", "μg-N/l");
        geneChart([{ "cat": "อุณหภูมิ", "val": r.data.data[0].sq_temp }], "sq_temp", "อุณหภูมิ", "ºC");
        geneChart([{ "cat": "สารแขวนลอย", "val": r.data.data[0].sq_ss }], "sq_ss", "สารแขวนลอย", "");
        geneChart([{ "cat": "ค่าความเป็นกรด-ด่าง", "val": r.data.data[0].sq_ph }], "sq_ph", "ค่าความเป็นกรด ด่าง", "pH");
        geneChart([{ "cat": "ปริมาณแอมโมเนีย", "val": r.data.data[0].sq_nh3 }], "sq_nh3", "ปริมาณแอมโมเนีย", "μg-N/l");
        geneChart([{ "cat": "ค่ามาตรฐานคุณภาพน้ำทะเล", "val": r.data.data[0].sq_mwqi }], "sq_mwqi", "ค่ามาตรฐานคุณภาพน้ำทะเล", "");
        geneChart([{ "cat": "ปริมาณสารตะกั่ว", "val": r.data.data[0].sq_pb }], "sq_pb", "ปริมาณสารตะกั่ว", "μg/l");
    })
}

let loadTable = () => {
    let dtable = $('#myTable').DataTable({
        ajax: {
            type: "POST",
            url: url + '/sq-api/getdata',
            data: { userid: "sakda" },
            dataSrc: 'data'
        },
        columns: [
            // { data: 'prj_name' },
            {
                data: '',
                render: (data, type, row, meta) => {
                    // console.log(meta.row);
                    return `${meta.row + 1}`
                }
            },
            { data: 'sta_loc' },
            // { data: 'prov' },
            { data: 'date' },

            { data: 'sq_do' },
            { data: 'sq_tcb' },
            { data: 'sq_po43p' },
            { data: 'sq_no3n' },
            { data: 'sq_temp' },
            { data: 'sq_ss' },
            { data: 'sq_ph' },
            { data: 'sq_nh3' },
            { data: 'sq_mwqi' },
            { data: 'sq_pb' },
            // { data: 'opert_stat' },
            {
                data: null,
                render: function (data, type, row, meta) {
                    // console.log(data);
                    return `
                       <button class="btn btn-margin btn-outline-danger" onclick="confirmDelete(${row.sq_id},'${row.sta_loc}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>
                       <button class="btn btn-margin btn-outline-success" onclick="getChart(${row.sq_id})"><i class="bi bi-bar-chart-fill"></i>&nbsp;แสดงกราฟ</button>
                       <button class="btn btn-margin btn-outline-info" onclick="getDetail(${row.sq_id})"><i class="bi bi-bar-chart-fill"></i>&nbsp;รายละเอียด</button>`
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

    dtable.on('search.dt', function () {
        let data = dtable.rows({ search: 'applied' }).data()
        getMarker(data);
    });
}

let getMarker = (d) => {
    map.eachLayer(i => {
        i.options.name == "marker" ? map.removeLayer(i) : null;
    });

    d.map(i => {
        if (i.geojson) {
            let json = JSON.parse(i.geojson);
            L.geoJson(json, {
                name: "marker"
            }).addTo(map)
        }
    });
}

let getDetail = (e) => {
    sessionStorage.setItem('sq_id', e);
    location.href = "./../detail/index.html";
}

let geneChart = (arr, div, tt, unit) => {
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create(div, am4charts.XYChart);

    chart.data = arr

    var title = chart.titles.create();
    title.text = tt;
    title.fontSize = 18;
    title.marginBottom = 5;

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

let getDataByPro = (sq_pro) => {
    let sq_po43p = [];
    let sq_no3n = [];
    let sq_ph = [];
    let sq_mwqi = [];

    axios.post(url + "/sq-api/getsummarize", { sq_pro: sq_pro }).then(async (r) => {
        await r.data.data.map(i => {
            sq_po43p.push({ cat: i.sq_date, dat: i.sq_po43p ? Number(i.sq_po43p) : null });
            sq_no3n.push({ cat: i.sq_date, dat: i.sq_no3n ? Number(i.sq_no3n) : null });
            sq_ph.push({ cat: i.sq_date, dat: i.sq_ph ? Number(i.sq_ph) : null });
            sq_mwqi.push({ cat: i.sq_date, dat: i.sq_mwqi ? Number(i.sq_mwqi) : null });
        });

        lineChart("csq_po43p", sq_po43p, "ฟอสเฟต ฟอสฟอรัส", "ug - P/l");
        lineChart("csq_no3n", sq_no3n, "ไนเตรด ไนโตรเจน", "ug - N/l");
        lineChart("csq_ph", sq_ph, "ความเป็นกรด ด่าง", "pH");
        lineChart("csq_mwqi", sq_mwqi, "ค่ามาตรฐานคุณภาพน้ำทะเล", "MWQI");
    })
}

let lineChart = (div, data, label, unit) => {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create(div, am4charts.XYChart);

    // Add data
    chart.data = data;

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = unit;

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "dat";
    series.dataFields.dateX = "cat";
    series.strokeWidth = 2;
    series.name = label;
    series.minBulletDistance = 10;
    series.tooltipText = "{valueY}";
    series.showOnInit = true;

    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");

    var bullethover = bullet.states.create("hover");
    bullethover.properties.scale = 1.3;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.fullWidthLineX = true;
    chart.cursor.xAxis = dateAxis;
    chart.cursor.lineX.strokeOpacity = 0;
    chart.cursor.lineX.fill = am4core.color("#000");
    chart.cursor.lineX.fillOpacity = 0.1;

    chart.legend = new am4charts.Legend();

    // Create a horizontal scrollbar with previe and place it underneath the date axis
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    dateAxis.start = 0.50;
    dateAxis.keepSelection = true;
}

getDataByPro("ชลบุรี");
$("#prov").change(function () {
    getDataByPro(this.value);
})











