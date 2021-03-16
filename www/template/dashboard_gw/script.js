
let map = L.map('map', {
    center: [13.156242, 101.339052],
    zoom: 10,
    // layers: [CartoDB_Positron, marker]
})

var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
})

var ghyb = L.tileLayer("https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}", {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"]
});

var baseLayers = {
    "Mapbox": CartoDB_Positron.addTo(map),
    "Google Hybrid": ghyb
}
// var overlays = {
// "Marker": marker,
// };
L.control.layers(baseLayers).addTo(map);

function onLocationFound(e) {
    var radius = e.accuracy;
    // L.marker(e.latlng).addTo(map)
    // // .bindPopup("You are within " + radius + " meters from this point").openPopup();
    // L.circle(e.latlng, radius).addTo(map);
    // console.log(e.latlng)
    nearData(e)
}

function onLocationError(e) {
    alert(e.message);
}
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
map.locate({ setView: true, maxZoom: 8 });

var lc = L.control.locate({
    position: 'topleft',
    strings: {
        title: ""
    },
    locateOptions: {
        enableHighAccuracy: true,
    }
})
lc.addTo(map);

let a = 1;
if (a = 1) {
    lc.start();
} else if (a > 1) {
    lc.stop();
}

let rmLyr = () => {
    map.eachLayer(lyr => {
        if (lyr.options.name == 'marker') {
            map.removeLayer(lyr)
        }
    })
}

function zoomTo(elat, lng) {
    console.log(elat, elng)
    map.setView(new L.LatLng(lat, lng), 12);
}

const icon = L.icon({
    iconUrl: 'https://www.flaticon.com/svg/static/icons/svg/1397/1397897.svg',
    iconSize: [30, 30],
    popupAnchor: [0, -7]
})

const geojsonMarkerOptions = {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
}

const api_1 = "https://eec-onep.online:3700/api/get-water-near/"
const api_2 = "https://eec-onep.online:3700/api/underWater/"
const api_3 = "https://eec-onep.online:3700/api/rankWater/"

let nearData = async (r) => {
    let location = {
        lat: r.latlng.lat,
        lng: r.latlng.lng
    }
    let res = await axios.get(api_1 + location.lat + '/' + location.lng)
    let sta_id = res.data.data[0].station_id
    let res2 = await axios.get(api_2 + sta_id)
    console.log(res2)
    $("#av-depth").text(res2.data.data[0].depth)
    $("#av-wl").text(res2.data.data[0].wl);
    $("#av-ec").text(res2.data.data[0].ec);
    $("#av-ph").text(res2.data.data[0].ph);
    $("#av-temp").text(res2.data.data[0].temp);
    $("#av-tds").text(res2.data.data[0].tds);
    $("#av-sal").text(res2.data.data[0].sal);

    var staname_t = 'sta_name'
    staname_t = res.data.data[0].station_name + "\nตำบล" + res.data.data[0].tambon + "\nอำเภอ" + res.data.data[0].amphoe + "\nจังหวัด" + res.data.data[0].province
    document.getElementById('sta_name').innerHTML = staname_t;

    let Wl = [];
    let Ec = [];
    let Ph = [];
    let Temp = [];
    let Tds = [];
    let Sal = [];

    res2.data.data.map(i => {
        Wl.push({
            "date": i.wl_date,
            "value": Number(i.wl).toFixed(2)
        });

        Ec.push({
            "date": i.ec_date,
            "value": Number(i.ec).toFixed(2)
        });

        Ph.push({
            "date": i.ph_date,
            "value": Number(i.ph).toFixed(2)
        });

        Temp.push({
            "date": i.temp_date,
            "value": Number(i.temp).toFixed(2)
        });

        Tds.push({
            "date": i.tds_date,
            "value": Number(i.tds).toFixed(2)
        });

        Sal.push({
            "date": i.sal_date,
            "value": Number(i.sal).toFixed(2)
        });
    })

    chartTemplate(Wl, "chart1");
    chartTemplate(Ec, "chart2");
    chartTemplate(Ph, "chart3");
    chartTemplate(Temp, "chart4");
    chartTemplate(Tds, "chart5");
    chartTemplate(Sal, "chart6");

    showWl_frist()
    function showWl_frist() {
        axios.get(api_3 + 'wl').then((r) => {
            let datArr = [];
            let selDat = r.data.data
            selDat.map(e => {
                datArr.push({
                    "station_name": e.station_name,
                    "value": e.wl,
                })
            })
            console.log(datArr)
            barChart(datArr, 'เมตร', "ระดับน้ำ");
            $("#unit").html('ระดับน้ำ (เมตร)');
        })
    }

}

let chartTemplate = (arrData, div) => {
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    var chart = am4core.create(div, am4charts.XYChart);

    // Add data
    chart.data = arrData;

    // Set input format for the dates
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}";
    series.tensionX = 0.8;
    series.strokeWidth = 2;
    series.minBulletDistance = 15;
    series.stroke = am4core.color("#ff0000");

    // Drop-shaped tooltips
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";

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

    // Create a horizontal scrollbar with previe and place it underneath the date axis
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);
    chart.scrollbarX.parent = chart.bottomAxesContainer;

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

    dateAxis.start = 0.59;
    dateAxis.keepSelection = true;
}

showDepth()
function showDepth() {
    axios.get(api_3 + 'depth').then((r) => {
        let datArr = [];
        let selDat = r.data.data
        selDat.map(e => {
            datArr.push({
                "station_name": e.station_name,
                "value": e.depth,
            })
        })
        console.log(datArr)
        barChart(datArr, 'เมตร', "ความลึก");
        $("#unit").html('ระดับความลึก (เมตร)');
    })
}

showWl()
function showWl() {
    axios.get(api_3 + 'wl').then((r) => {
        let datArr = [];
        let selDat = r.data.data
        selDat.map(e => {
            datArr.push({
                "station_name": e.station_name,
                "value": e.wl,
            })
        })
        console.log(datArr)
        barChart(datArr, 'เมตร', "ระดับน้ำ");
        $("#unit").html('ระดับน้ำ (เมตร)');
    })
}

showEc()
function showEc() {
    axios.get(api_3 + 'ec').then((r) => {
        let datArr = [];
        let selDat = r.data.data
        selDat.map(e => {
            datArr.push({
                "station_name": e.station_name,
                "value": e.ec,
            })
        })
        console.log(datArr)
        barChart(datArr, 'µs/cm', "ค่าการนำไฟฟ้า");
        $("#unit").html('ค่าการนำไฟฟ้า (µs/cm)');
    })
}

showPh()
function showPh() {
    axios.get(api_3 + 'ph').then((r) => {
        let datArr = [];
        let selDat = r.data.data
        selDat.map(e => {
            datArr.push({
                "station_name": e.station_name,
                "value": e.ph,
            })
        })
        console.log(datArr)
        barChart(datArr, '', "ค่าความเป็นกรด-ด่าง");
        $("#unit").html('ค่าความเป็นกรด-ด่าง');
    })
}

showTemp()
function showTemp() {
    axios.get(api_3 + 'temp').then((r) => {
        let datArr = [];
        let selDat = r.data.data
        selDat.map(e => {
            datArr.push({
                "station_name": e.station_name,
                "value": e.temp,
            })
        })
        console.log(datArr)
        barChart(datArr, '°C', "ค่าอุณหภูมิ");
        $("#unit").html('ค่าอุณหภูมิ (องศาเซลเซียส)');
    })
}

showTds()
function showTds() {
    axios.get(api_3 + 'tds').then((r) => {
        let datArr = [];
        let selDat = r.data.data
        selDat.map(e => {
            datArr.push({
                "station_name": e.station_name,
                "value": e.tds,
            })
        })
        console.log(datArr)
        barChart(datArr, 'mg/L', "ค่าความขุ่น");
        $("#unit").html('ค่าความขุ่น (mg/L)');
    })
}

showSal()
function showSal() {
    axios.get(api_3 + 'Sal').then((r) => {
        let datArr = [];
        let selDat = r.data.data
        selDat.map(e => {
            datArr.push({
                "station_name": e.station_name,
                "value": e.sal,
            })
        })
        console.log(datArr)
        barChart(datArr, 'ppt', "ค่าความเค็ม");
        $("#unit").html('ค่าความเค็ม (ppt)');
    })
}

barChart = async (data, unit, title) => {
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("chart", am4charts.XYChart);
    chart.numberFormatter.numberFormat = "#.#' " + unit + "'";
    chart.data = await data;

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "station_name";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.rotation = -90;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";

    categoryAxis.events.on("sizechanged", function (ev) {
        let axis = ev.target;
        var cellWidth = axis.pixelWidth / (axis.endIndex - axis.startIndex);
        if (cellWidth > axis.renderer.labels.template.maxWidth) {
            axis.renderer.labels.template.rotation = -45;
            axis.renderer.labels.template.horizontalCenter = "right";
            axis.renderer.labels.template.verticalCenter = "middle";
        }
        else {
            axis.renderer.labels.template.rotation = -25;
            axis.renderer.labels.template.horizontalCenter = "middle";
            axis.renderer.labels.template.verticalCenter = "top";
        }
    });

    let label = categoryAxis.renderer.labels.template;
    label.truncate = true;
    label.maxWidth = 150;
    label.tooltipText = "{category}";

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = title;
    valueAxis.title.fontWeight = 800;

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "station_name";
    series.clustered = false;
    series.tooltipText = title + "{categoryX} : [bold]{valueY}[/]";

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;

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
}

getData_Map()
function getData_Map() {
    axios.get(api_2).then((r) => {
        var selDat = r.data.data.filter(e => e.province === "ชลบุรี" || e.province == "ระยอง" || e.province == "ฉะเชิงเทรา")
        var a = [];
        selDat.map(e => {
            a.push({
                "station_id": e.station_id,
                "station_name": e.station_name,
                "tambon": e.tambon,
                "amphoe": e.amphoe,
                "province": e.province,
                "lat": e.y,
                "lng": e.x
            })
        })
        console.log(a)
        createMarker(a)
        showTable(a)
    })
}
function createMarker(data) {
    var markers = L.markerClusterGroup();
    for (let i = 0; i < data.length; i++) {
        var marker = L.circleMarker([data[i].lat, data[i].lng]
            , {
                radius: 8,
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 0.5,
                fillOpacity: 0.8,
                data: data
            }
            , {
                statname: data[i].station_name
            })
        // marker.addTo(map);
        marker.bindPopup("รหัสบ่อ:\n" + data[i].station_id + "<br> สถานีตรวจวัด:" + data[i].station_name + "<br> ที่ตั้ง\nตำบล" + data[i].tambon + "\nอำเภอ" + data[i].amphoe + "\nจังหวัด" + data[i].province).openPopup();
        // 
        markers.addLayer(marker);
        marker.on("click", g => {
            let sta_id = data[i].station_id
            axios.get('https://eec-onep.online:3700/api/underWater/' + sta_id).then((r) => {
                let res = r.data.data[0]
                // console.log(res)
                $("#av-depth").text(r.data.data[0].depth)
                $("#av-wl").text(r.data.data[0].wl);
                $("#av-ec").text(r.data.data[0].ec);
                $("#av-ph").text(r.data.data[0].ph);
                $("#av-temp").text(r.data.data[0].temp);
                $("#av-tds").text(r.data.data[0].tds);
                $("#av-sal").text(r.data.data[0].sal);

                let Wl = [{
                    "date": r.data.data[0].wl_date,
                    "value": r.data.data[0].wl
                }];
                let Ec = [{
                    "date": r.data.data[0].ec_date,
                    "value": r.data.data[0].ec
                }];
                let Ph = [{
                    "date": r.data.data[0].ph_date,
                    "value": r.data.data[0].ph
                }];
                let Temp = [{
                    "date": r.data.data[0].temp_date,
                    "value": r.data.data[0].temp
                }];
                let Tds = [{
                    "date": r.data.data[0].tds_date,
                    "value": r.data.data[0].tds
                }];
                let Sal = [{
                    "date": r.data.data[0].sal_date,
                    "value": r.data.data[0].sal
                }];

                chartTemplate(Wl, "chart1");
                chartTemplate(Ec, "chart2");
                chartTemplate(Ph, "chart3");
                chartTemplate(Temp, "chart4");
                chartTemplate(Tds, "chart5");
                chartTemplate(Sal, "chart6");

            })
            var staname_t = 'sta_name'
            staname_t = data[i].station_name + "\nตำบล" + data[i].tambon + "\nอำเภอ" + data[i].amphoe + "\nจังหวัด" + data[i].province
            document.getElementById('sta_name').innerHTML = staname_t;



        })
    }
    map.addLayer(markers);
}

function showTable(data) {
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

    let table = $('#tab').DataTable({
        language: {
            processing: true,
            // "lengthMenu": 'Display <select>' +
            //     '<option value="10">10</option>' +
            //     '<option value="20">20</option>' +
            //     '<option value="30">30</option>' +
            //     '<option value="40">40</option>' +
            //     '<option value="50">50</option>' +
            //     '<option value="-1">All</option>' +
            //     '</select> records'

        },

        data: data,
        columns: [
            { data: 'station_id' },
            { data: 'station_name' },
            { data: 'tambon' },
            { data: 'amphoe' },
            { data: 'province' },
        ],

        select: true,
        pageLength: 10,
        responsive: {
            details: false
        },



    });
    $("#spinner").hide()



    // $('<div class="pull-right">' +
    //     '<select class="form-control">' +
    //     '<option value="" disabled selected>Choose your country</option>' +
    //     '<option value="ฉะเชิงเทรา">ฉะเชิงเทรา</option>' +
    //     '<option value= "ระยอง">ระยอง</option>' +
    //     '<option value="ชลบุรี">ชลบุรี</option>' +
    //     '</select>' +
    //     '</div>').appendTo("#tab_wrapper .dataTables_filter"); //example is our table id

    // $(".dataTables_filter label").addClass("pull-right");

    $('#tab tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        console.log(data.lat);
        L.popup({ offset: [0, -27] })
            .setLatLng([data.lat, data.lng])
            .setContent(`รหัสบ่อ: ${data.station_id} <br> สถานีตรวจวัด: ${data.station_name}`)
            .openOn(map);
        map.panTo([data.lat, data.lng])
        getData_Tab(data)
    })
}

let getData_Tab = async (r) => {
    let sta_id = r.station_id
    // console.log(sta_id)
    let res2 = await axios.get('https://eec-onep.online:3700/api/underWater/' + sta_id)
    // console.log(res2.data.data.length)
    $("#av-depth").text(res2.data.data[0].depth)
    $("#av-wl").text(res2.data.data[0].wl);
    $("#av-ec").text(res2.data.data[0].ec);
    $("#av-ph").text(res2.data.data[0].ph);
    $("#av-temp").text(res2.data.data[0].temp);
    $("#av-tds").text(res2.data.data[0].tds);
    $("#av-sal").text(res2.data.data[0].sal);

    var staname_t = 'sta_name'
    staname_t = r.station_name + "\nตำบล" + r.tambon + "\nอำเภอ" + r.amphoe + "\nจังหวัด" + r.province
    document.getElementById('sta_name').innerHTML = staname_t;

    // console.log(res2.data.data.length)
    if (res2.data.data.length == 1) {
        let Wl_s1 = [{
            "date": res2.data.data[0].wl_date,
            "value": res2.data.data[0].wl
        }];
        let Ec_s1 = [{
            "date": res2.data.data[0].ec_date,
            "value": res2.data.data[0].ec
        }];
        let Ph_s1 = [{
            "date": res2.data.data[0].ph_date,
            "value": res2.data.data[0].ph
        }];
        let Temp_s1 = [{
            "date": res2.data.data[0].temp_date,
            "value": res2.data.data[0].temp
        }];
        let Tds_s1 = [{
            "date": res2.data.data[0].tds_date,
            "value": res2.data.data[0].tds
        }];
        let Sal_s1 = [{
            "date": res2.data.data[0].sal_date,
            "value": res2.data.data[0].sal
        }];

        showChart_1S(Wl_s1, "chart1", "ระดับน้ำ (เมตร)", "เมตร");
        showChart_1S(Ec_s1, "chart2", "ค่าการนำไฟฟ้า", "µs/cm");
        showChart_1S(Ph_s1, "chart3", "ค่าความเป็นกรด-ด่าง", "");
        showChart_1S(Temp_s1, "chart4", "ค่าอุณหภูมิ", "°C");
        showChart_1S(Tds_s1, "chart5", "ค่าความขุ่น", "mg/L");
        showChart_1S(Sal_s1, "chart6", "ค่าความเค็ม", "ppt");

    } else if (res2.data.data.length == 2) {
        //Wl
        let Wl_s1 = [{
            "date": res2.data.data[0].wl_date,
            "value": res2.data.data[0].wl
        }];
        let Wl_s2 = [{
            "date": res2.data.data[1].wl_date,
            "value": res2.data.data[1].wl
        }];
        showChart_2S(Wl_s1, Wl_s2, "chart1", "ระดับน้ำ (เมตร)", "เมตร");
        //Ec
        let Ec_s1 = [{
            "date": res2.data.data[0].ec_date,
            "value": res2.data.data[0].ec
        }];
        let Ec_s2 = [{
            "date": res2.data.data[1].ec_date,
            "value": res2.data.data[1].ec
        }];
        showChart_2S(Ec_s1, Ec_s2, "chart2", "ค่าการนำไฟฟ้า", "µs/cm");
        //Ph
        let Ph_s1 = [{
            "date": res2.data.data[0].ph_date,
            "value": res2.data.data[0].ph
        }];
        let Ph_s2 = [{
            "date": res2.data.data[1].ph_date,
            "value": res2.data.data[1].ph
        }];
        showChart_2S(Ph_s1, Ph_s2, "chart3", "ค่าความเป็นกรด-ด่าง", "");
        //Temp
        let Temp_s1 = [{
            "date": res2.data.data[0].temp_date,
            "value": res2.data.data[0].temp
        }];
        let Temp_s2 = [{
            "date": res2.data.data[1].temp_date,
            "value": res2.data.data[1].temp
        }];
        showChart_2S(Temp_s1, Temp_s2, "chart4", "ค่าอุณหภูมิ", "°C");
        //Tds
        let Tds_s1 = [{
            "date": res2.data.data[0].tds_date,
            "value": res2.data.data[0].tds
        }];
        let Tds_s2 = [{
            "date": res2.data.data[1].tds_date,
            "value": res2.data.data[1].tds
        }];
        showChart_2S(Tds_s1, Tds_s2, "chart5", "ค่าความขุ่น", "mg/L");
        //Sal
        let Sal_s1 = [{
            "date": res2.data.data[0].sal_date,
            "value": res2.data.data[0].sal
        }];
        let Sal_s2 = [{
            "date": res2.data.data[1].sal_date,
            "value": res2.data.data[1].sal
        }];
        showChart_2S(Sal_s1, Sal_s2, "chart6", "ค่าความเค็ม", "ppt");

    } else if (res2.data.data.length > 2) {
        //Wl
        let Wl_s1 = [{
            "date": res2.data.data[0].wl_date,
            "value": res2.data.data[0].wl
        }];
        let Wl_s2 = [{
            "date": res2.data.data[1].wl_date,
            "value": res2.data.data[1].wl
        }];
        let Wl_s3 = [{
            "date": res2.data.data[2].wl_date,
            "value": res2.data.data[2].wl
        }];
        showChart_3S(Wl_s1, Wl_s2, Wl_s3, "chart1", "ระดับน้ำ (เมตร)", "เมตร");
        //Ec
        let Ec_s1 = [{
            "date": res2.data.data[0].ec_date,
            "value": res2.data.data[0].ec
        }];
        let Ec_s2 = [{
            "date": res2.data.data[1].ec_date,
            "value": res2.data.data[1].ec
        }];
        let Ec_s3 = [{
            "date": res2.data.data[2].wl_date,
            "value": res2.data.data[2].wl
        }];
        showChart_3S(Ec_s1, Ec_s2, Ec_s3, "chart2", "ค่าการนำไฟฟ้า", "µs/cm");
        //Ph
        let Ph_s1 = [{
            "date": res2.data.data[0].ph_date,
            "value": res2.data.data[0].ph
        }];
        let Ph_s2 = [{
            "date": res2.data.data[1].ph_date,
            "value": res2.data.data[1].ph
        }];
        let Ph_s3 = [{
            "date": res2.data.data[2].ph_date,
            "value": res2.data.data[2].ph
        }];
        showChart_3S(Ph_s1, Ph_s2, Ph_s3, "chart3", "ค่าความเป็นกรด-ด่าง", "");
        //Temp
        let Temp_s1 = [{
            "date": res2.data.data[0].temp_date,
            "value": res2.data.data[0].temp
        }];
        let Temp_s2 = [{
            "date": res2.data.data[1].temp_date,
            "value": res2.data.data[1].temp
        }];
        let Temp_s3 = [{
            "date": res2.data.data[2].temp_date,
            "value": res2.data.data[2].temp
        }];
        showChart_3S(Temp_s1, Temp_s2, Temp_s3, "chart4", "ค่าอุณหภูมิ", "°C");
        //Tds
        let Tds_s1 = [{
            "date": res2.data.data[0].tds_date,
            "value": res2.data.data[0].tds
        }];
        let Tds_s2 = [{
            "date": res2.data.data[1].tds_date,
            "value": res2.data.data[1].tds
        }];
        let Tds_s3 = [{
            "date": res2.data.data[2].tds_date,
            "value": res2.data.data[2].tds
        }];
        showChart_3S(Tds_s1, Tds_s2, Tds_s3, "chart5", "ค่าความขุ่น", "mg/L");
        //Sal
        let Sal_s1 = [{
            "date": res2.data.data[0].sal_date,
            "value": res2.data.data[0].sal
        }];
        let Sal_s2 = [{
            "date": res2.data.data[1].sal_date,
            "value": res2.data.data[1].sal
        }];
        let Sal_s3 = [{
            "date": res2.data.data[2].sal_date,
            "value": res2.data.data[2].sal
        }];
        showChart_3S(Sal_s1, Sal_s2, Sal_s3, "chart6", "ค่าความเค็ม", "ppt");
    }
}

let showChart_1S = (arrData, div, title, unit) => {
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create(div, am4charts.XYChart);
    chart.numberFormatter.numberFormat = "#.#' " + unit + "'";

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 30;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = title;
    // Create series
    function createSeries(field, name, data) {
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.dateX = "date";
        series.name = name;
        series.tooltipText = "[b]{valueY}[/]";
        series.strokeWidth = 2;
        series.data = data;

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.stroke = am4core.color("#fff");
        bullet.circle.strokeWidth = 2;
        // Create a horizontal scrollbar with previe and place it underneath the date axis
        chart.scrollbarX = new am4core.Scrollbar();
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series);
        chart.scrollbarX.parent = chart.bottomAxesContainer;

        return series;
    }
    createSeries("value", "Sensor 1", arrData
        // { "date": "2021-01-01", "value": 0 },
        // { "date": arrData.date, "value": arrData.value, },

    );
    // createSeries("value", "Sensor 2", [
    //     { "date": a.sensor_data.sensors[1].wl_date, "value": a.sensor_data.sensors[1].wl }

    // ]);
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

    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.parent = chart.leftAxesContainer;
    chart.scrollbarY.toBack();

    // // Create a horizontal scrollbar with previe and place it underneath the date axis
    // chart.scrollbarX = new am4core.Scrollbar();
    // chart.scrollbarX = new am4charts.XYChartScrollbar();
    // chart.scrollbarX.series.push(series);
    // chart.scrollbarX.parent = chart.bottomAxesContainer;

    dateAxis.start = 0.79;
    dateAxis.keepSelection = true;
}
let showChart_2S = (arrDataS1, arrDataS2, div, title, unit) => {

    am4core.useTheme(am4themes_animated);
    var chart = am4core.create(div, am4charts.XYChart);
    chart.numberFormatter.numberFormat = "#.#' " + unit + "'";

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 30;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = title;
    // Create series
    function createSeries(field, name, data) {
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.dateX = "date";
        series.name = name;
        series.tooltipText = "[b]{valueY}[/]";
        series.strokeWidth = 2;
        series.data = data;

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.stroke = am4core.color("#fff");
        bullet.circle.strokeWidth = 2;
        // Create a horizontal scrollbar with previe and place it underneath the date axis
        chart.scrollbarX = new am4core.Scrollbar();
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series);
        chart.scrollbarX.parent = chart.bottomAxesContainer;

        return series;
    }
    createSeries("value", "Sensor 1", arrDataS1
        // { "date": "2021-01-01", "value": 0 },
        // { "date": arrData.date, "value": arrData.value, },

    );
    createSeries("value", "Sensor 2", arrDataS2
        //     { "date": a.sensor_data.sensors[1].wl_date, "value": a.sensor_data.sensors[1].wl }

    );
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

    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.parent = chart.leftAxesContainer;
    chart.scrollbarY.toBack();

    // // Create a horizontal scrollbar with previe and place it underneath the date axis
    // chart.scrollbarX = new am4core.Scrollbar();
    // chart.scrollbarX = new am4charts.XYChartScrollbar();
    // chart.scrollbarX.series.push(series);
    // chart.scrollbarX.parent = chart.bottomAxesContainer;

    dateAxis.start = 0.79;
    dateAxis.keepSelection = true;
}
let showChart_3S = (arrDataS1, arrDataS2, arrDataS3, div, title, unit) => {

    am4core.useTheme(am4themes_animated);
    var chart = am4core.create(div, am4charts.XYChart);
    chart.numberFormatter.numberFormat = "#.#' " + unit + "'";

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 30;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = title;
    // Create series
    function createSeries(field, name, data) {
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.dateX = "date";
        series.name = name;
        series.tooltipText = "[b]{valueY}[/]";
        series.strokeWidth = 2;
        series.data = data;

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.stroke = am4core.color("#fff");
        bullet.circle.strokeWidth = 2;
        // Create a horizontal scrollbar with previe and place it underneath the date axis
        chart.scrollbarX = new am4core.Scrollbar();
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series);
        chart.scrollbarX.parent = chart.bottomAxesContainer;

        return series;
    }
    createSeries("value", "Sensor 1", arrDataS1
        // { "date": "2021-01-01", "value": 0 },
        // { "date": arrData.date, "value": arrData.value, },

    );
    createSeries("value", "Sensor 2", arrDataS2
        //     { "date": a.sensor_data.sensors[1].wl_date, "value": a.sensor_data.sensors[1].wl }

    );
    createSeries("value", "Sensor 2", arrDataS3
        //     { "date": a.sensor_data.sensors[1].wl_date, "value": a.sensor_data.sensors[1].wl }

    );
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

    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.parent = chart.leftAxesContainer;
    chart.scrollbarY.toBack();

    // // Create a horizontal scrollbar with previe and place it underneath the date axis
    // chart.scrollbarX = new am4core.Scrollbar();
    // chart.scrollbarX = new am4charts.XYChartScrollbar();
    // chart.scrollbarX.series.push(series);
    // chart.scrollbarX.parent = chart.bottomAxesContainer;

    dateAxis.start = 0.79;
    dateAxis.keepSelection = true;
}