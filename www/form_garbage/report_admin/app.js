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

});

const url = "https://eec-onep.online:3700";
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
    let gb_id = $("#projId").val()
    axios.post(url + "/gb-api/delete", { gb_id: gb_id }).then(r => {
        r.data.data == "success" ? closeModal() : null
    })
}

let geneChart = (div, data) => {
    am4core.ready(function () {
        am4core.useTheme(am4themes_animated);
        var chart = am4core.create(div, am4charts.XYChart);
        chart.data = data;
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "cat";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;
        categoryAxis.renderer.labels.template.horizontalCenter = "right";
        categoryAxis.renderer.labels.template.verticalCenter = "middle";
        categoryAxis.renderer.labels.template.rotation = 270;
        categoryAxis.tooltip.disabled = true;
        categoryAxis.renderer.minHeight = 110;

        categoryAxis.fontSize = 13;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.minWidth = 50;
        valueAxis.title.text = "ตัน/วัน";
        valueAxis.fontSize = 13;
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

        var hoverState = series.columns.template.column.states.create("hover");
        hoverState.properties.cornerRadiusTopLeft = 0;
        hoverState.properties.cornerRadiusTopRight = 0;
        hoverState.properties.fillOpacity = 1;

        series.columns.template.adapter.add("fill", function (fill, target) {
            return chart.colors.getIndex(target.dataItem.index);
        });

        chart.cursor = new am4charts.XYCursor();

    });
}

$("#chartdiv").hide()
function getChart(gb_id) {
    // console.log(gb_id);
    let obj = {
        gb_id: gb_id
    }
    axios.post(url + "/gb-api/getone", obj).then((r) => {
        $("#chartdiv").show();
        $("#year").text(`ปี ${r.data.data[0].year}`);
        $("#staDetail").text(`${r.data.data[0].dla} จ.${r.data.data[0].prov}`);
        $("#populace").text(`${r.data.data[0].populace ? (r.data.data[0].populace).toLocaleString() : "-"}`);
        $("#amtwas").text(`${r.data.data[0].amt_was ? r.data.data[0].amt_was : "-"}`);
        // console.log(r.data.data[0]);
        geneChart("gbDetail", [
            { "cat": "ปริมาณขยะที่เกิดขึ้น", "val": r.data.data[0].amt_was },
            { "cat": "ปริมาณขยะที่เกิดขึ้นใน อปท. พื้นที่ให้บริการ", "val": r.data.data[0].was_dla },
            { "cat": "ปริมาณขยะที่เก็บขนไปกำจัด", "val": r.data.data[0].amt_coll },
            { "cat": "ปริมาณขยะที่ถูกนำไปใช้ประโยชน์", "val": r.data.data[0].amt_benf },
            { "cat": "ปริมาณขยะที่ไม่มีการให้บริการ", "val": r.data.data[0].nwas_dla },
            { "cat": "ปริมาณขยะที่กำจัดไม่ถูกต้อง", "val": r.data.data[0].was_ncor },
            { "cat": "ปริมาณขยะที่กำจัดถูกต้อง", "val": r.data.data[0].was_corr },
            { "cat": "การนำไปใช้ประโยชน์", "val": r.data.data[0].use_benf },
            { "cat": "การนำไปกำจัด", "val": r.data.data[0].removal },
            { "cat": "Landfill", "val": r.data.data[0].landfill },
            { "cat": "Compost", "val": r.data.data[0].compost },
            { "cat": "Incinerator", "val": r.data.data[0].incinrt },
            { "cat": "ปริมาณขยะที่ถูกนำไปใช้ประโยชน์", "val": r.data.data[0].was_benf },
            { "cat": "ปริมาณขยะที่กำจัดไม่ถูกต้อง", "val": r.data.data[0].nwas_cor },
            { "cat": "ปริมาณขยะที่ถูกนำไปใช้ประโยชน์", "val": r.data.data[0].all_benf },
            { "cat": "ขยะทั่วไป", "val": r.data.data[0].ge_was },
            { "cat": "ขยะอินทรีย์", "val": r.data.data[0].orga_was },
            { "cat": "ขยะรีไซเคิล", "val": r.data.data[0].recy_was },
            { "cat": "ขยะอันตราย", "val": r.data.data[0].dang_was },
            { "cat": "ขยะอื่น ๆ", "val": r.data.data[0].other }
        ]);
    })
}

let getMarker = (d) => {
    map.eachLayer(i => {
        i.options.name == "marker" ? map.removeLayer(i) : null;
    });

    d.map(i => {

        if (i.geojson) {
            let json = JSON.parse(i.geojson);
            // json.properties = { bioname: i.bioname, biodetail: i.biodetail, img: i.img };
            L.geoJson(json, {
                name: "marker"
            }).addTo(map)
        }
    });
}

let loadTable = () => {
    let dtable = $('#myTable').DataTable({
        ajax: {
            type: "POST",
            url: url + '/gb-api/getdata',
            data: { userid: "sakda" },
            dataSrc: 'data'
        },
        columns: [
            // { data: 'prj_name' },
            {
                data: '',
                render: (data, type, row, meta) => {
                    return `${meta.row + 1}`
                }
            },
            { data: 'dla' },
            { data: 'prov' },
            { data: 'year' },

            { data: 'amt_was' },
            { data: 'amt_coll' },
            { data: 'amt_benf' },
            { data: 'was_ncor' },
            { data: 'usrname' },
            {
                data: null,
                render: function (data, type, row, meta) {
                    // console.log(data);
                    return `
                       <button class="btn btn-margin btn-outline-danger" onclick="confirmDelete(${row.gb_id},'${row.dla}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>
                       <button class="btn btn-margin btn-outline-success" onclick="getChart(${row.gb_id})"><i class="bi bi-bar-chart-fill"></i>&nbsp;แสดงกราฟ</button>
                       <button class="btn btn-margin btn-outline-info" onclick="getDetail(${row.gb_id})"><i class="bi bi-bar-chart-fill"></i>&nbsp;ดูรายละเอียด</button>`
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
        // console.log(data);
        showChart(data)
        getMarker(data);
        // loadBiotype(data);
        // loadBiopro(data);
    });
    getChart(1897);
}

let getDetail = (e) => {
    sessionStorage.setItem('garbage_id', e);
    location.href = "./../detail/index.html";
}

let showChart = (data) => {
    let cr_amt56 = 0; let cr_amt57 = 0; let cr_amt58 = 0; let cr_amt59 = 0; let cr_amt60 = 0; let cr_amt61 = 0; let cr_amt62 = 0; let cr_amt63 = 0; let cr_amt64 = 0
    let ry_amt56 = 0; let ry_amt57 = 0; let ry_amt58 = 0; let ry_amt59 = 0; let ry_amt60 = 0; let ry_amt61 = 0; let ry_amt62 = 0; let ry_amt63 = 0; let ry_amt64 = 0;
    let cs_amt56 = 0; let cs_amt57 = 0; let cs_amt58 = 0; let cs_amt59 = 0; let cs_amt60 = 0; let cs_amt61 = 0; let cs_amt62 = 0; let cs_amt63 = 0; let cs_amt64 = 0;

    data.map(async (i) => {
        // console.log(i);
        if (i.year == "2556" && i.amt_was) {
            i.prov == "ชลบุรี" ? cr_amt56 += i.amt_was : null;
            i.prov == "ระยอง" ? ry_amt56 += Number(i.amt_was) : null;
            i.prov == "ฉะเชิงเทรา" ? cs_amt56 += Number(i.amt_was) : null;
        } else if (i.year == "2557" && i.amt_was) {
            i.prov == "ชลบุรี" ? cr_amt57 += Number(i.amt_was) : null;
            i.prov == "ระยอง" ? ry_amt57 += Number(i.amt_was) : null;
            i.prov == "ฉะเชิงเทรา" ? cs_amt57 += Number(i.amt_was) : null;
        } else if (i.year == "2558" && i.amt_was) {
            i.prov == "ชลบุรี" ? cr_amt58 += Number(i.amt_was) : null;
            i.prov == "ระยอง" ? ry_amt58 += Number(i.amt_was) : null;
            i.prov == "ฉะเชิงเทรา" ? cs_amt58 += Number(i.amt_was) : null;
        } else if (i.year == "2559" && i.amt_was) {
            i.prov == "ชลบุรี" ? cr_amt59 += Number(i.amt_was) : null;
            i.prov == "ระยอง" ? ry_amt59 += Number(i.amt_was) : null;
            i.prov == "ฉะเชิงเทรา" ? cs_amt59 += Number(i.amt_was) : null;
        } else if (i.year == "2560" && i.amt_was) {
            i.prov == "ชลบุรี" ? cr_amt60 += Number(i.amt_was) : null;
            i.prov == "ระยอง" ? ry_amt60 += Number(i.amt_was) : null;
            i.prov == "ฉะเชิงเทรา" ? cs_amt60 += Number(i.amt_was) : null;
        } else if (i.year == "2561" && i.amt_was) {
            i.prov == "ชลบุรี" ? cr_amt61 += Number(i.amt_was) : null;
            i.prov == "ระยอง" ? ry_amt61 += Number(i.amt_was) : null;
            i.prov == "ฉะเชิงเทรา" ? cs_amt61 += Number(i.amt_was) : null;
        } else if (i.year == "2562" && i.amt_was) {
            i.prov == "ชลบุรี" ? cr_amt62 += Number(i.amt_was) : null;
            i.prov == "ระยอง" ? ry_amt62 += Number(i.amt_was) : null;
            i.prov == "ฉะเชิงเทรา" ? cs_amt62 += Number(i.amt_was) : null;
        } else if (i.year == "2563" && i.amt_was) {
            i.prov == "ชลบุรี" ? cr_amt63 += Number(i.amt_was) : null;
            i.prov == "ระยอง" ? ry_amt63 += Number(i.amt_was) : null;
            i.prov == "ฉะเชิงเทรา" ? cs_amt63 += Number(i.amt_was) : null;
        } else if (i.year == "2564" && i.amt_was) {
            i.prov == "ชลบุรี" ? cr_amt64 += Number(i.amt_was) : null;
            i.prov == "ระยอง" ? ry_amt64 += Number(i.amt_was) : null;
            i.prov == "ฉะเชิงเทรา" ? cs_amt64 += Number(i.amt_was) : null;
        }
    })

    let dat = [{
        "year": "2556",
        "cb": cr_amt56,
        "ry": ry_amt56,
        "cs": cs_amt56
    }, {
        "year": "2557",
        "cb": cr_amt57,
        "ry": ry_amt57,
        "cs": cs_amt57
    }, {
        "year": "2558",
        "cb": cr_amt58,
        "ry": ry_amt58,
        "cs": cs_amt58
    }, {
        "year": "2559",
        "cb": cr_amt59,
        "ry": ry_amt59,
        "cs": cs_amt59
    }, {
        "year": "2560",
        "cb": cr_amt60,
        "ry": ry_amt60,
        "cs": cs_amt60
    }, {
        "year": "2561",
        "cb": cr_amt61,
        "ry": ry_amt61,
        "cs": cs_amt61
    }, {
        "year": "2562",
        "cb": cr_amt62,
        "ry": ry_amt62,
        "cs": cs_amt62
    }, {
        "year": "2563",
        "cb": cr_amt63,
        "ry": ry_amt63,
        "cs": cs_amt63
    }, {
        "year": "2564",
        "cb": cr_amt64,
        "ry": ry_amt64,
        "cs": cs_amt64
    }];

    compareChart("summarize", dat, "ปริมาณขยะ", "(ตัน/ปี)");
}

let compareChart = (div, data, label, unit) => {
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create(div, am4charts.XYChart);
    chart.data = data;
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = label + " " + unit;

    // Create series
    var series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "cb";
    series2.dataFields.dateX = "year";
    series2.strokeWidth = 2;
    series2.name = "ชลบุรี";
    series2.minBulletDistance = 10;
    // series2.strokeDasharray = "3,4";
    series2.tooltipText = "{valueY}";
    series2.showOnInit = true;

    // Create series
    var series3 = chart.series.push(new am4charts.LineSeries());
    series3.dataFields.valueY = "ry";
    series3.dataFields.dateX = "year";
    series3.strokeWidth = 2;
    series3.name = "ระยอง";
    series3.strokeDasharray = "3,4";
    series3.tooltipText = "{valueY}";
    series3.showOnInit = true;

    // Create series
    var series4 = chart.series.push(new am4charts.LineSeries());
    series4.dataFields.valueY = "cs";
    series4.dataFields.dateX = "year";
    series4.strokeWidth = 2;
    series4.name = "ฉะเชิงเทรา ";
    series4.strokeDasharray = "6,7";
    series4.tooltipText = "{valueY}";
    series4.showOnInit = true;

    var bullet2 = series2.bullets.push(new am4charts.CircleBullet());
    bullet2.circle.strokeWidth = 2;
    bullet2.circle.radius = 4;
    bullet2.circle.fill = am4core.color("#fff");
    var bullethover2 = bullet2.states.create("hover");
    bullethover2.properties.scale = 1.3;

    var bullet3 = series3.bullets.push(new am4charts.CircleBullet());
    bullet3.circle.strokeWidth = 2;
    bullet3.circle.radius = 4;
    bullet3.circle.fill = am4core.color("#fff");
    var bullethover3 = bullet3.states.create("hover");
    bullethover3.properties.scale = 1.3;

    var bullet4 = series4.bullets.push(new am4charts.CircleBullet());
    bullet4.circle.strokeWidth = 2;
    bullet4.circle.radius = 4;
    bullet4.circle.fill = am4core.color("#fff");
    var bullethover4 = bullet4.states.create("hover");
    bullethover4.properties.scale = 1.3;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.fullWidthLineX = true;
    chart.cursor.xAxis = dateAxis;
    chart.cursor.lineX.strokeOpacity = 0;
    chart.cursor.lineX.fill = am4core.color("#000");
    chart.cursor.lineX.fillOpacity = 0.1;

    chart.legend = new am4charts.Legend();

    // Create a horizontal scrollbar with previe and place it underneath the date axis
    // chart.scrollbarX = new am4charts.XYChartScrollbar();
    // chart.scrollbarX.series.push(series2);
    // chart.scrollbarX.parent = chart.bottomAxesContainer;

    // dateAxis.start = 0.40;
    // dateAxis.keepSelection = true;
}













