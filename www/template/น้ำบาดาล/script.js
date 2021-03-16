
let map = L.map('map', {
    center: [13.1455402, 102.3137522],
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

// function onLocationFound(e) {
//     nearData(e)
// }

// function onLocationError(e) {
//     console.log(e.message);
// }

// map.on("locationfound", onLocationFound);
// map.on("locationerror", onLocationError);
// map.locate({ setView: true, maxZoom: 10 });

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

lc.start();

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
const api = "http://tgms.dgr.go.th/entries/poi-stations?keyword=&fbclid=IwAR37a4kYJD2nazmfNsnDKsNKlb2lUIGTs2C1BTkxAa5FPyuDciS18T61l0s"
$.get(api).done(async (r) => {
    let a = []
    let arrWl = [];
    let arrEc = [];
    let arrPh = [];
    let arrTemp = [];
    let arrTds = [];
    let arrSal = [];

    // || e.stations[0].sensors.length > 0
    await r.data.forEach(async (e) => {
        if (e.province === "ชลบุรี" || e.province == "ระยอง" || e.province == "ฉะเชิงเทรา") {
            j = 0; {
                let len = e.stations[0].sensors
                len.map(i => {
                    // console.log(e)
                    a.push({
                        "sensor_id": e.stations[0].sensors[j].sensor_id,
                        "depth": e.stations[0].sensors[j].depth,
                        "wl": e.stations[0].sensors[j].wl,
                        "ec": e.stations[0].sensors[j].ec,
                        "ph": e.stations[0].sensors[j].ph,
                        "temp": e.stations[0].sensors[j].temp,
                        "tds": e.stations[0].sensors[j].tds,
                        "sal": e.stations[0].sensors[j].sal,
                        "wl_min": e.stations[0].sensors[j].wl_max,
                        "wl_max": e.stations[0].sensors[j].wl_min,
                        "wl_avg": e.stations[0].sensors[j].wl_avg,
                        "wl_date": e.stations[0].sensors[j].wl_date,
                        "ec_date": e.stations[0].sensors[j].ec_date,
                        "ph_date": e.stations[0].sensors[j].ph_date,
                        "temp_date": e.stations[0].sensors[j].temp_date,
                        "tds_date": e.stations[0].sensors[j].tds_date,
                        "sal_date": e.stations[0].sensors[j].sal_date,

                        // "sensor1": e.stations[0].sensors[0],
                        // "sensor2": e.stations[0].sensors[1],
                        // "sensor3": e.stations[0].sensors[2],
                        "station_name": e.station_name,
                        "location": [e.lat, e.lng],
                        "tambon": e.tambon,
                        "amphoe": e.amphoe,
                        "province": e.province,
                    });
                    arrWl.push({
                        "date": e.stations[0].sensors[0].wl_date,
                        "value": e.stations[0].sensors[0].wl
                    });
                    arrEc.push({
                        "date": e.stations[0].sensors[0].ec_date,
                        "value": e.stations[0].sensors[0].ec
                    });
                    arrPh.push({
                        "date": e.stations[0].sensors[0].ph_date,
                        "value": e.stations[0].sensors[0].ph
                    });
                    arrTemp.push({
                        "date": e.stations[0].sensors[0].temp_date,
                        "value": e.stations[0].sensors[0].temp
                    });
                    arrTds.push({
                        "date": e.stations[0].sensors[0].tds_date,
                        "value": e.stations[0].sensors[0].tds
                    });
                    arrSal.push({
                        "date": e.stations[0].sensors[0].sal_date,
                        "value": e.stations[0].sensors[0].sal
                    });
                    j += 1
                })
                console.log(len)
            }
            createMarker(e)
        }
        // ChartWl()
        // ChartEc()
        // ChartPh()
        // ChartTemp()
        // ChartTds()
        // ChartSal()

        function ChartWl() {
            var dataWl = [];
            if (a.length > 0) {
                let lenq = a
                lenq.map(i => {
                    dataWl.push({
                        "date": a[0].wl_date,
                        "value": a[0].wl
                    })
                })
            }
            // console.log(arrWl[0].date)

            var chart = am4core.create("chart1", am4charts.XYChart);
            chart.data = dataWl;

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

            dateAxis.start = 0.59;
            dateAxis.keepSelection = true;
        }
        function ChartEc() {
            var dataEc = [];
            if (arrEc.length > 0) {

                let lenq = arrEc
                lenq.map(i => {
                    dataEc.push({
                        "date": arrEc[0].date,
                        "value": Number(arrEc[0].value)
                    })

                })

            }


            var chart = am4core.create("chart2", am4charts.XYChart);
            chart.data = dataEc;

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

            dateAxis.start = 0.59;
            dateAxis.keepSelection = true;
        }
        function ChartPh() {
            var dataPh = [];
            if (arrPh.length > 0) {

                let lenq = arrPh
                lenq.map(i => {
                    dataPh.push({
                        "date": arrPh[0].date,
                        "value": arrPh[0].value
                    })
                })
            }
            var chart = am4core.create("chart3", am4charts.XYChart);
            chart.data = dataPh;

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

            dateAxis.start = 0.59;
            dateAxis.keepSelection = true;
        }
        function ChartTemp() {
            var dataTemp = [];
            if (arrTemp.length > 0) {

                let lenq = arrTemp
                lenq.map(i => {
                    dataTemp.push({
                        "date": arrTemp[0].date,
                        "value": arrTemp[0].value
                    })

                })

            }
            var chart = am4core.create("chart4", am4charts.XYChart);
            chart.data = dataTemp;

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

            dateAxis.start = 0.59;
            dateAxis.keepSelection = true;
        }
        function ChartTds() {
            var dataTds = [];
            if (arrTds.length > 0) {
                let lenq = arrTemp
                lenq.map(i => {
                    dataTemp.push({
                        "date": arrTds[0].date,
                        "value": arrTds[0].value
                    })

                })

            }

            var chart = am4core.create("chart5", am4charts.XYChart);
            chart.data = dataTds;

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

            dateAxis.start = 0.59;
            dateAxis.keepSelection = true;
        }
        function ChartSal() {
            var dataSal = [];
            if (arrSal.length > 0) {
                let lenq = arrSal
                lenq.map(i => {
                    dataTemp.push({
                        "date": arrSal[0].date,
                        "value": arrSal[0].value
                    })

                })
            }
            var chart = am4core.create("chart6", am4charts.XYChart);
            chart.data = dataSal;

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

            dateAxis.start = 0.59;
            dateAxis.keepSelection = true;
        }
    });
    console.log(a)

    var depth = 'av-depth'
    for (i = 0; i < a.length; i++) {
        depth = a[375].depth;
        document.getElementById('av-depth').innerHTML = depth;
    }
    var wl = 'av-wl'
    for (i = 0; i < a.length; i++) {
        wl = a[375].wl;
        document.getElementById('av-wl').innerHTML = wl;
    }
    var ec = 'av-ec'
    for (i = 0; i < a.length; i++) {
        ec = a[375].ec;
        document.getElementById('av-ec').innerHTML = ec;
    }
    var ph = 'av-ph'
    for (i = 0; i < a.length; i++) {
        ph = a[375].ph;
        document.getElementById('av-ph').innerHTML = ph;
    }
    var temp = 'av-temp'
    for (i = 0; i < a.length; i++) {
        temp = a[375].temp;
        document.getElementById('av-temp').innerHTML = temp;
    }
    var tds = 'av-tds'
    for (i = 0; i < a.length; i++) {
        tds = a[375].tds;
        document.getElementById('av-tds').innerHTML = tds;
    }
    var sal = 'av-sal'
    for (i = 0; i < a.length; i++) {
        sal = a[375].sal;
        document.getElementById('av-sal').innerHTML = sal;
    }
    // $("#sta_name").text(`${a[0].station_name} ${e.area_th}`)
    // console.log(a[0].station_name)
    var staname = 'sta_name'
    for (i = 0; i < a.length; i++) {
        staname = a[375].station_name + "\nต." + a[375].tambon + "\nอ." + a[375].amphoe + "\nจ." + a[268].province
        document.getElementById('sta_name').innerHTML = staname;
    }
    // var k = '<tbody>'
    // for (i = 0; i < a.length; i++) {
    //     k += '<tr>';
    //     k += '<td>' + a[i].sensor_id + '</td>';
    //     k += '<td>' + a[i].station_name + '</td>';
    //     k += '<td>' + a[i].wl + '</td>';
    //     k += '<td>' + a[i].wl_max + '</td>';
    //     k += '<td>' + a[i].wl_min + '</td>';
    //     k += '<td>' + a[i].wl_avg + '</td>';
    //     k += '</tr>';
    // } i += 1
    // k += '</tbody>';
    // document.getElementById('Tdata').innerHTML = k;

})


getData()
function getData() {
    let b = [];
    axios.get(api).then((r) => {
        var selDat = r.data.data.filter(e => e.province === "ชลบุรี" || e.province == "ระยอง" || e.province == "ฉะเชิงเทรา")
        selDat.map(e => {
            j = 0;
            b.push({
                "sensor_id": e.stations[0].sensors[j].sensor_id,
                "station_name": e.station_name,
                "station_id": e.station_id,
                "province": e.province,
                "location": [e.lat, e.lng],
                "lat": e.lat,
                "lng": e.lng,
                // "lsensor": e.stations[0].sensors.length,
                "sensor_data": e.stations[0],

                "wl": e.stations[0].sensors[j].wl,
                "wl_min": e.stations[0].sensors[j].wl_max,
                "wl_max": e.stations[0].sensors[j].wl_min,
                "wl_avg": e.stations[0].sensors[j].wl_avg,
                "sensors": e.stations[0].sensors,
                "visits": Number(e.stations[0].sensors[j].wl),
                "sta": {
                    "station_name": e.station_name,
                    "station_id": e.station_id,
                    "location": [e.lat, e.lng],
                    "lat": e.lat,
                    "lng": e.lng,
                    "tambon": e.tambon,
                    "amphoe": e.amphoe,
                    "province": e.province
                },
                "data_wl": {
                    "wl": e.stations[0].sensors[j].wl,
                    "wl_min": e.stations[0].sensors[j].wl_max,
                    "wl_max": e.stations[0].sensors[j].wl_min,
                    "wl_avg": e.stations[0].sensors[j].wl_avg,
                    "date": e.stations[0].sensors[j].wl_date
                }
            })
            j += 1
        })
        showTable(b)
        // console.log(b.sensors.length)
    })
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
            { data: 'province' },
            { data: 'wl' },
            { data: 'wl_min' },
            { data: 'wl_max' },
            { data: 'wl_avg' }
        ],

        select: true,
        pageLength: 12,
        responsive: {
            details: false
        },


    });
    $("#spinner").hide()

    $('<div class="pull-right">' +
        '<select class="form-control">' +
        '<option value="ฉะเชิงเทรา">ฉะเชิงเทรา</option>' +
        '<option value= "ระยอง">ระยอง</option>' +
        '<option value="ชลบุรี">ชลบุรี</option>' +
        '</select>' +
        '</div>').appendTo("#tab_wrapper .dataTables_filter"); //example is our table id

    $(".dataTables_filter label").addClass("pull-right");

    $('#tab tbody').on('click', 'tr', function () {
        var a = table.row(this).data();
        console.log(a);
        L.popup({ offset: [0, -27] })
            .setLatLng([a.lat, a.lng])
            .setContent(`รหัส: ${a.station_id} <br> ชื่อสถานี: ${a.station_name}`)
            .openOn(map);
        map.panTo([a.lat, a.lng])

        // console.log(a)
        var depth_t = 'av-depth'
        for (i = 0; i < a.sensors.length; i++) {
            depth_t = a.sensors[0].depth;
            document.getElementById('av-depth').innerHTML = depth_t;
        }
        var wl_t = a.wl
        for (i = 0; i < a.sensors.length; i++) {
            wl_c = 0;
            document.getElementById('av-wl').innerHTML = wl_t;
        }
        var ec_t = 'av-ec'
        for (i = 0; i < a.sensors.length; i++) {
            ec_t = a.sensors[0].ec;
            document.getElementById('av-ec').innerHTML = ec_t;
        }
        var ph_t = 'av-ph'
        for (i = 0; i < a.sensors.length; i++) {
            ph_t = a.sensors[0].ph;
            document.getElementById('av-ph').innerHTML = ph_t;
        }
        var temp_t = 'av-temp'
        for (i = 0; i < a.sensors.length; i++) {
            temp_t = a.sensors[0].temp;
            document.getElementById('av-temp').innerHTML = temp_t;
        }
        var tds_t = 'av-tds'
        for (i = 0; i < a.sensors.length; i++) {
            tds_t = a.sensors[0].tds;
            document.getElementById('av-tds').innerHTML = tds_t;
        }
        var sal_t = 'av-sal'
        for (i = 0; i < a.sensors.length; i++) {
            sal_t = a.sensors[0].sal;
            document.getElementById('av-sal').innerHTML = sal_t;
        }

        var staname_t = 'sta_name'
        staname_t = a.station_name + "\nต." + a.sta.tambon + "\nอ." + a.sta.amphoe + "\nจ." + a.sta.province
        document.getElementById('sta_name').innerHTML = staname_t;

        if (a.sensors.length == 1) {
            // Chart7(a)
            showChart_S1(a)
            showChart_S2(a)
            showChart_S3(a)
            showChart_S4(a)
            showChart_S5(a)
            showChart_S6(a)
            showChart_S7(a)
        } else if (a.sensors.length == 2) {
            showChart_SS1(a)
            showChart_SS2(a)
            showChart_SS3(a)
            showChart_SS4(a)
            showChart_SS5(a)
            showChart_SS6(a)
            showChart_SS7(a)
        } else if (a.sensors.length > 2) {
            showChart_3S1(a)
            showChart_3S2(a)
            showChart_3S3(a)
            showChart_3S4(a)
            showChart_3S5(a)
            showChart_3S6(a)
        }
        //sensor1
        function showChart_S1() {
            // Create chart instance
            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chart1", am4charts.XYChart);

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 30;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = "ปริมาณของน้ำบาดาล (เมตร)";
            // Create series
            function createSeries(field, name, data) {
                var series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = field;
                series.dataFields.dateX = "date";
                series.name = name;
                series.tooltipText = "[b]{valueY}[/] เมตร";
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
            createSeries("value", "Sensor 1", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[0].wl_date, "value": Number(a.sensor_data.sensors[0].wl), },

            ]);
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
        function showChart_S2() {
            // Create chart instance
            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chart2", am4charts.XYChart);

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 30;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            // valueAxis.title.text = "ปริมาณของน้ำบาดาล (เมตร)";
            // Create series
            function createSeries(field, name, data) {
                var series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = field;
                series.dataFields.dateX = "date";
                series.name = name;
                series.tooltipText = "[b]{valueY}[/] µs/cm";
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
            createSeries("value", "Sensor 1", [
                { "date": a.sensor_data.sensors[0].ec_date, "value": Number(a.sensor_data.sensors[0].ec) },
                { "date": "2021-01-01", "value": 0 },

            ]);
            // createSeries("value", "Sensor 2", [
            //     { "date": a.sensor_data.sensors[1].ec_date, "value": Number(a.sensor_data.sensors[1].ec) }

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

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChart_S3() {
            // Create chart instance
            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chart3", am4charts.XYChart);

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 30;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            // valueAxis.title.text = "ปริมาณของน้ำบาดาล (เมตร)";
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
            createSeries("value", "Sensor 1", [
                { "date": a.sensor_data.sensors[0].ph_date, "value": Number(a.sensor_data.sensors[0].ph) },
                { "date": "2021-01-01", "value": 0 },

            ]);
            // createSeries("value", "Sensor 2", [
            //     { "date": a.sensor_data.sensors[1].ph_date, "value": Number(a.sensor_data.sensors[1].ph) }

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

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChart_S4() {
            // Create chart instance
            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chart4", am4charts.XYChart);

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 30;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            // valueAxis.title.text = "ปริมาณของน้ำบาดาล (เมตร)";
            // Create series
            function createSeries(field, name, data) {
                var series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = field;
                series.dataFields.dateX = "date";
                series.name = name;
                series.tooltipText = "[b]{valueY}[/] ppm";
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
            createSeries("value", "Sensor 1", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[0].temp_date, "value": Number(a.sensor_data.sensors[0].temp) },


            ]);
            // createSeries("value", "Sensor 2", [
            //     { "date": a.sensor_data.sensors[1].temp_date, "value": Number(a.sensor_data.sensors[1].temp) }

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

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChart_S5() {
            // Create chart instance
            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chart5", am4charts.XYChart);

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 30;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            // valueAxis.title.text = "ปริมาณของน้ำบาดาล (เมตร)";
            // Create series
            function createSeries(field, name, data) {
                var series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = field;
                series.dataFields.dateX = "date";
                series.name = name;
                series.tooltipText = "[b]{valueY}[/] mg/L";
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
            createSeries("value", "Sensor 1", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[0].tds_date, "value": Number(a.sensor_data.sensors[0].tds) }

            ]);
            // createSeries("value", "Sensor 2", [
            //     { "date": a.sensor_data.sensors[1].tds_date, "value": Number(a.sensor_data.sensors[1].tds) }

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


            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChart_S6() {
            // Create chart instance
            var chart = am4core.create("chart6", am4charts.XYChart);

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 30;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            // valueAxis.title.text = "ปริมาณของน้ำบาดาล (เมตร)";
            // Create series
            function createSeries(field, name, data) {
                var series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = field;
                series.dataFields.dateX = "date";
                series.name = name;
                series.tooltipText = "[b]{valueY}[/] ppt";
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
            createSeries("value", "Sensor 1", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[0].sal_date, "value": Number(a.sensor_data.sensors[0].sal) }

            ]);
            // createSeries("value", "Sensor 2", [
            //     { "date": a.sensor_data.sensors[1].sal_date, "value": Number(a.sensor_data.sensors[1].sal) }

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

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChart_S7() {
            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chart7", am4charts.XYChart);

            // Add data
            chart.data = [{
                "date": a.sensor_data.sensors[0].wl_date,
                "market1": a.sensor_data.sensors[0].wl_avg,
                // "market2": a.sensor_data.sensors[1].wl_avg,
                "wl_s1": a.sensor_data.sensors[0].wl,
                // "wl_s2": a.sensor_data.sensors[1].wl
            }];

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            //dateAxis.renderer.grid.template.location = 0;
            //dateAxis.renderer.minGridDistance = 30;

            var valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis1.title.text = "ปริมาณของน้ำบาดาล (เมตร)";

            var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
            // valueAxis2.title.text = "Market Days";
            valueAxis2.renderer.opposite = true;
            valueAxis2.renderer.grid.template.disabled = true;

            // Create series
            var series1 = chart.series.push(new am4charts.ColumnSeries());
            series1.dataFields.valueY = "wl_s1";
            series1.dataFields.dateX = "date";
            series1.yAxis = valueAxis1;
            series1.name = "Sensor 1";
            series1.tooltipText = "[font-size: 20]{valueY} เมตร";
            series1.fill = chart.colors.getIndex(0);
            series1.strokeWidth = 0;
            series1.clustered = false;
            series1.columns.template.width = am4core.percent(40);

            // var series2 = chart.series.push(new am4charts.ColumnSeries());
            // series2.dataFields.valueY = "wl_s2";
            // series2.dataFields.dateX = "date";
            // series2.yAxis = valueAxis1;
            // series2.name = "Sensor 2";
            // series2.tooltipText = "[font-size: 20]{valueY} เมตร";
            // series2.fill = chart.colors.getIndex(0).lighten(0.5);
            // series2.strokeWidth = 0;
            // series2.clustered = false;
            // series2.toBack();

            var series3 = chart.series.push(new am4charts.LineSeries());
            series3.dataFields.valueY = "market1";
            series3.dataFields.dateX = "date";
            series3.name = "ระดับน้ำเฉลี่ย S1";
            series3.strokeWidth = 2;
            series3.tensionX = 0.7;
            series3.yAxis = valueAxis2;
            series3.tooltipText = "{name}\n[bold font-size: 20]{valueY}[/]";

            var bullet3 = series3.bullets.push(new am4charts.CircleBullet());
            bullet3.circle.radius = 3;
            bullet3.circle.strokeWidth = 2;
            bullet3.circle.fill = am4core.color("#fff");

            // var series4 = chart.series.push(new am4charts.LineSeries());
            // series4.dataFields.valueY = "market2";
            // series4.dataFields.dateX = "date";
            // series4.name = "ระดับน้ำเฉลี่ย S2";
            // series4.strokeWidth = 2;
            // series4.tensionX = 0.7;
            // series4.yAxis = valueAxis2;
            // series4.tooltipText = "{name}\n[bold font-size: 20]{valueY}[/]";
            // series4.stroke = chart.colors.getIndex(0).lighten(0.5);
            // series4.strokeDasharray = "3,3";

            // var bullet4 = series4.bullets.push(new am4charts.CircleBullet());
            // bullet4.circle.radius = 3;
            // bullet4.circle.strokeWidth = 2;
            // bullet4.circle.fill = am4core.color("#fff");

            // Add cursor
            chart.cursor = new am4charts.XYCursor();

            // Add legend
            chart.legend = new am4charts.Legend();
            chart.legend.position = "top";

            // Add scrollbar
            chart.scrollbarX = new am4charts.XYChartScrollbar();
            chart.scrollbarX.series.push(series1);
            chart.scrollbarX.series.push(series3);
            chart.scrollbarX.parent = chart.bottomAxesContainer;

        }
        // sensor2
        function showChart_SS1() {
            // Create chart instance
            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chart1", am4charts.XYChart);

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 30;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = "ปริมาณของน้ำบาดาล (เมตร)";
            // Create series
            function createSeries(field, name, data) {
                var series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = field;
                series.dataFields.dateX = "date";
                series.name = name;
                series.tooltipText = "[b]{valueY}[/] เมตร";
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
            createSeries("value", "Sensor 1", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[0].wl_date, "value": Number(a.sensor_data.sensors[0].wl) }

            ]);
            createSeries("value", "Sensor 2", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[1].wl_date, "value": Number(a.sensor_data.sensors[1].wl) }

            ]);
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

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChart_SS2() {
            // Create chart instance
            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chart2", am4charts.XYChart);

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 30;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            // valueAxis.title.text = "ปริมาณของน้ำบาดาล (เมตร)";
            // Create series
            function createSeries(field, name, data) {
                var series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = field;
                series.dataFields.dateX = "date";
                series.name = name;
                series.tooltipText = "[b]{valueY}[/] µs/cm";
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
            createSeries("value", "Sensor 1", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[0].ec_date, "value": Number(a.sensor_data.sensors[0].ec) }

            ]);
            createSeries("value", "Sensor 2", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[1].ec_date, "value": Number(a.sensor_data.sensors[1].ec) }

            ]);
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

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChart_SS3() {
            // Create chart instance
            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chart3", am4charts.XYChart);

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 30;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            // valueAxis.title.text = "ปริมาณของน้ำบาดาล (เมตร)";
            // Create series
            function createSeries(field, name, data) {
                var series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = field;
                series.dataFields.dateX = "date";
                series.name = name;
                series.tooltipText = "[b]{valueY}[/] เมตร";
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
            createSeries("value", "Sensor 1", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[0].ph_date, "value": Number(a.sensor_data.sensors[0].ph) }

            ]);
            createSeries("value", "Sensor 2", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[1].ph_date, "value": Number(a.sensor_data.sensors[1].ph) }

            ]);
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

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChart_SS4() {
            // Create chart instance
            var chart = am4core.create("chart4", am4charts.XYChart);

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 30;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            // valueAxis.title.text = "ปริมาณของน้ำบาดาล (เมตร)";
            // Create series
            function createSeries(field, name, data) {
                var series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = field;
                series.dataFields.dateX = "date";
                series.name = name;
                series.tooltipText = "[b]{valueY}[/] ppm";
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
            createSeries("value", "Sensor 1", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[0].temp_date, "value": Number(a.sensor_data.sensors[0].temp) }

            ]);
            createSeries("value", "Sensor 2", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[1].temp_date, "value": Number(a.sensor_data.sensors[1].temp) }

            ]);
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

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChart_SS5() {
            // Create chart instance
            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chart5", am4charts.XYChart);

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 30;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            // valueAxis.title.text = "ปริมาณของน้ำบาดาล (เมตร)";
            // Create series
            function createSeries(field, name, data) {
                var series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = field;
                series.dataFields.dateX = "date";
                series.name = name;
                series.tooltipText = "[b]{valueY}[/] mg/L";
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
            createSeries("value", "Sensor 1", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[0].tds_date, "value": Number(a.sensor_data.sensors[0].tds) }

            ]);
            createSeries("value", "Sensor 2", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[1].tds_date, "value": Number(a.sensor_data.sensors[1].tds) }

            ]);
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

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChart_SS6() {
            // Create chart instance

            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chart6", am4charts.XYChart);

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 30;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            // valueAxis.title.text = "ปริมาณของน้ำบาดาล (เมตร)";
            // Create series
            function createSeries(field, name, data) {
                var series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = field;
                series.dataFields.dateX = "date";
                series.name = name;
                series.tooltipText = "[b]{valueY}[/] ppt";
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
            createSeries("value", "Sensor 1", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[0].sal_date, "value": Number(a.sensor_data.sensors[0].sal) }

            ]);
            createSeries("value", "Sensor 2", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[1].sal_date, "value": Number(a.sensor_data.sensors[1].sal) }

            ]);
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

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChart_SS7() {
            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chart7", am4charts.XYChart);

            // Add data
            chart.data = [{
                "date": a.sensor_data.sensors[0].wl_date,
                "market1": a.sensor_data.sensors[0].wl_avg,
                "market2": a.sensor_data.sensors[1].wl_avg,
                "wl_s1": a.sensor_data.sensors[0].wl,
                "wl_s2": a.sensor_data.sensors[1].wl
            }];

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            //dateAxis.renderer.grid.template.location = 0;
            //dateAxis.renderer.minGridDistance = 30;

            var valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis1.title.text = "ปริมาณของน้ำบาดาล (เมตร)";

            var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
            // valueAxis2.title.text = "Market Days";
            valueAxis2.renderer.opposite = true;
            valueAxis2.renderer.grid.template.disabled = true;

            // Create series
            var series1 = chart.series.push(new am4charts.ColumnSeries());
            series1.dataFields.valueY = "wl_s1";
            series1.dataFields.dateX = "date";
            series1.yAxis = valueAxis1;
            series1.name = "Sensor 1";
            series1.tooltipText = "[font-size: 20]{valueY} เมตร";
            series1.fill = chart.colors.getIndex(0);
            series1.strokeWidth = 0;
            series1.clustered = false;
            series1.columns.template.width = am4core.percent(40);

            var series2 = chart.series.push(new am4charts.ColumnSeries());
            series2.dataFields.valueY = "wl_s2";
            series2.dataFields.dateX = "date";
            series2.yAxis = valueAxis1;
            series2.name = "Sensor 2";
            series2.tooltipText = "[font-size: 20]{valueY} เมตร";
            series2.fill = chart.colors.getIndex(0).lighten(0.5);
            series2.strokeWidth = 0;
            series2.clustered = false;
            series2.toBack();

            var series3 = chart.series.push(new am4charts.LineSeries());
            series3.dataFields.valueY = "market1";
            series3.dataFields.dateX = "date";
            series3.name = "ระดับน้ำเฉลี่ย S1";
            series3.strokeWidth = 2;
            series3.tensionX = 0;
            series3.yAxis = valueAxis2;
            series3.tooltipText = "{name}\n[bold font-size: 20]{valueY}[/]";

            var bullet3 = series3.bullets.push(new am4charts.CircleBullet());
            bullet3.circle.radius = 3;
            bullet3.circle.strokeWidth = 2;
            bullet3.circle.fill = am4core.color("#fff");

            var series4 = chart.series.push(new am4charts.LineSeries());
            series4.dataFields.valueY = "market2";
            series4.dataFields.dateX = "date";
            series4.name = "ระดับน้ำเฉลี่ย S2";
            series4.strokeWidth = 2;
            series4.tensionX = 0;
            series4.yAxis = valueAxis2;
            series4.tooltipText = "{name}\n[bold font-size: 20]{valueY}[/]";
            series4.stroke = chart.colors.getIndex(0).lighten(0.5);
            series4.strokeDasharray = "3,3";

            var bullet4 = series4.bullets.push(new am4charts.CircleBullet());
            bullet4.circle.radius = 3;
            bullet4.circle.strokeWidth = 2;
            bullet4.circle.fill = am4core.color("#fff");

            // Add cursor
            chart.cursor = new am4charts.XYCursor();

            // Add legend
            chart.legend = new am4charts.Legend();
            chart.legend.position = "top";

            // Add scrollbar
            chart.scrollbarX = new am4charts.XYChartScrollbar();
            chart.scrollbarX.series.push(series1);
            chart.scrollbarX.series.push(series3);
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

        }
        //sensor3
        function showChart_3S1() {
            // Create chart instance
            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chart1", am4charts.XYChart);

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 30;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = "ปริมาณของน้ำบาดาล (เมตร)";
            // Create series
            function createSeries(field, name, data) {
                var series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = field;
                series.dataFields.dateX = "date";
                series.name = name;
                series.tooltipText = "[b]{valueY}[/] เมตร";
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
            createSeries("value", "Sensor 1", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[0].wl_date, "value": Number(a.sensor_data.sensors[0].wl) }

            ]);
            createSeries("value", "Sensor 2", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[1].wl_date, "value": Number(a.sensor_data.sensors[1].wl) }

            ]);
            createSeries("value", "Sensor 3", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[2].wl_date, "value": Number(a.sensor_data.sensors[2].wl) }

            ]);
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

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChart_3S2() {
            // Create chart instance
            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chart2", am4charts.XYChart);

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 30;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            // valueAxis.title.text = "ปริมาณของน้ำบาดาล (เมตร)";
            // Create series
            function createSeries(field, name, data) {
                var series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = field;
                series.dataFields.dateX = "date";
                series.name = name;
                series.tooltipText = "[b]{valueY}[/] µs/cm";
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
            createSeries("value", "Sensor 1", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[0].ec_date, "value": Number(a.sensor_data.sensors[0].ec) }

            ]);
            createSeries("value", "Sensor 2", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[1].ec_date, "value": Number(a.sensor_data.sensors[1].ec) }

            ]);
            createSeries("value", "Sensor 3", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[2].ec_date, "value": Number(a.sensor_data.sensors[2].ec) }

            ]);
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

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChart_3S3() {
            // Create chart instance
            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chart3", am4charts.XYChart);

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 30;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            // valueAxis.title.text = "ปริมาณของน้ำบาดาล (เมตร)";
            // Create series
            function createSeries(field, name, data) {
                var series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = field;
                series.dataFields.dateX = "date";
                series.name = name;
                series.tooltipText = "[b]{valueY}[/] เมตร";
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
            createSeries("value", "Sensor 1", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[0].ph_date, "value": Number(a.sensor_data.sensors[0].ph) }

            ]);
            createSeries("value", "Sensor 2", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[1].ph_date, "value": Number(a.sensor_data.sensors[1].ph) }

            ]);
            createSeries("value", "Sensor 3", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[2].ph_date, "value": Number(a.sensor_data.sensors[2].ph) }

            ]);
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

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChart_3S4() {
            // Create chart instance
            var chart = am4core.create("chart4", am4charts.XYChart);

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 30;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            // valueAxis.title.text = "ปริมาณของน้ำบาดาล (เมตร)";
            // Create series
            function createSeries(field, name, data) {
                var series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = field;
                series.dataFields.dateX = "date";
                series.name = name;
                series.tooltipText = "[b]{valueY}[/] ppm";
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
            createSeries("value", "Sensor 1", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[0].temp_date, "value": Number(a.sensor_data.sensors[0].temp) }

            ]);
            createSeries("value", "Sensor 2", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[1].temp_date, "value": Number(a.sensor_data.sensors[1].temp) }

            ]);
            createSeries("value", "Sensor 3", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[2].temp_date, "value": Number(a.sensor_data.sensors[2].temp) }

            ]);
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

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChart_3S5() {
            // Create chart instance
            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chart5", am4charts.XYChart);

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 30;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            // valueAxis.title.text = "ปริมาณของน้ำบาดาล (เมตร)";
            // Create series
            function createSeries(field, name, data) {
                var series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = field;
                series.dataFields.dateX = "date";
                series.name = name;
                series.tooltipText = "[b]{valueY}[/] mg/L";
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
            createSeries("value", "Sensor 1", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[0].tds_date, "value": Number(a.sensor_data.sensors[0].tds) }

            ]);
            createSeries("value", "Sensor 2", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[1].tds_date, "value": Number(a.sensor_data.sensors[1].tds) }

            ]);
            createSeries("value", "Sensor 3", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[2].tds_date, "value": Number(a.sensor_data.sensors[2].tds) }

            ]);
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

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChart_3S6() {
            // Create chart instance

            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chart6", am4charts.XYChart);

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 30;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            // valueAxis.title.text = "ปริมาณของน้ำบาดาล (เมตร)";
            // Create series
            function createSeries(field, name, data) {
                var series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = field;
                series.dataFields.dateX = "date";
                series.name = name;
                series.tooltipText = "[b]{valueY}[/] ppt";
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
            createSeries("value", "Sensor 1", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[0].sal_date, "value": Number(a.sensor_data.sensors[0].sal) }

            ]);
            createSeries("value", "Sensor 2", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[1].sal_date, "value": Number(a.sensor_data.sensors[1].sal) }

            ]);
            createSeries("value", "Sensor 3", [
                { "date": "2021-01-01", "value": 0 },
                { "date": a.sensor_data.sensors[2].sal_date, "value": Number(a.sensor_data.sensors[2].sal) }

            ]);
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

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
    })
}

let createMarker = (e) => {
    var arr = [];
    var len = e.stations[0].sensors;
    if (e.stations[0].sensors.length > 0) {
        j = 0;
        len.map(i => {
            arr.push(
                {
                    "station_name": e.station_name,
                    "sensor_id": e.stations[0].sensors[j].sensor_id,
                    "sensor_data": e.stations[0].sensors,
                    "depth": e.stations[0].sensors[j].depth,
                    "wl": e.stations[0].sensors[j].wl,
                    "wl_min": e.stations[0].sensors[j].wl_min,
                    "wl_max": e.stations[0].sensors[j].wl_max,
                    "wl_avg": e.stations[0].sensors[j].wl_avg,
                    "wl_date": e.stations[0].sensors[j].wl_date,
                    ec: e.stations[0].sensors[j].ec,
                    ph: e.stations[0].sensors[j].ph,
                    temp: e.stations[0].sensors[j].temp,
                    tds: e.stations[0].sensors[j].tds,
                    sal: e.stations[0].sensors[j].sal,
                    "sta": {
                        "tambon": e.tambon,
                        "amphoe": e.amphoe,
                        "province": e.province
                    },
                })
            j += 1
        })
    }
    var markerCluster = L.markerClusterGroup();
    // circleMarker
    var marker = L.circleMarker([e.lat, e.lng]
        , {
            radius: 8,
            fillColor: "#ff7800",
            color: "#000",
            weight: 1,
            opacity: 0.5,
            fillOpacity: 0.8,
            data: arr
        }, {
        statname: e.station_name
    }
    );

    marker.addTo(map);
    marker.bindPopup("รหัส:\n" + e.station_id + "<br>" + e.station_name + "<br> ที่ตั้ง\nตำบล" + e.tambon + "\nอำเภอ" + e.amphoe + "\nจังหวัด" + e.province +
        "<br> ระดับน้ำ\n:\n" + e.stations[0].sensors[0].wl + "\nเมตร").openPopup();
    marker.on("click", g => {
        console.log(g)


        markerCluster.addLayer(marker);
        map.addLayer(markerCluster);
        // var k = '<tbody>'
        // for (i = 0; i < arr.length; i++) {
        //     k += '<tr>';
        //     k += '<td>' + arr[i].sensor_id + '</td>';
        //     k += '<td>' + arr[i].station_name + '</td>';
        //     k += '<td>' + arr[i].wl + '</td>';
        //     k += '<td>' + arr[i].wl_max + '</td>';
        //     k += '<td>' + arr[i].wl_min + '</td>';
        //     k += '<td>' + arr[i].wl_avg + '</td>';
        //     k += '</tr>';
        // }
        // k += '</tbody>';
        // document.getElementById('Tdata').innerHTML = k;
        // console.log(arr)

        var depth_c = 'av-depth'
        for (i = 0; i < arr.length; i++) {
            depth_c = arr[0].depth;
            document.getElementById('av-depth').innerHTML = depth_c;
        }
        var wl_c = 'av-wl'
        for (i = 0; i < arr.length; i++) {
            wl_c = arr[0].wl;
            document.getElementById('av-wl').innerHTML = wl_c;
        }
        var ec_c = 'av-ec'
        for (i = 0; i < arr.length; i++) {
            ec_c = arr[0].ec;
            document.getElementById('av-ec').innerHTML = ec_c;
        }
        var ph_c = 'av-ph'
        for (i = 0; i < arr.length; i++) {
            ph_c = arr[0].ph;
            document.getElementById('av-ph').innerHTML = ph_c;
        }
        var temp_c = 'av-temp'
        for (i = 0; i < arr.length; i++) {
            temp_c = arr[0].temp;
            document.getElementById('av-temp').innerHTML = temp_c;
        }
        var tds_c = 'av-tds'
        for (i = 0; i < arr.length; i++) {
            tds_c = arr[0].tds;
            document.getElementById('av-tds').innerHTML = tds_c;
        }
        var sal_c = 'av-sal'
        for (i = 0; i < arr.length; i++) {
            sal_c = arr[0].sal;
            document.getElementById('av-sal').innerHTML = sal_c;
        }

        var staname_c = 'sta_name'
        staname_c = arr[0].station_name + "\nต." + arr[0].sta.tambon + "\nอ." + arr[0].sta.amphoe + "\nจ." + arr[0].sta.province
        document.getElementById('sta_name').innerHTML = staname_c;

        showChart1(g)
        showChart2(g)
        showChart3(g)
        showChart4(g)
        showChart5(g)
        showChart6(g)
        function showChart1() {
            var dataChart = []
            if (g.target.options.data.length > 0) {
                j = 0; {
                    let lenq = g.target.options.data
                    lenq.map(i => {
                        dataChart.push({
                            "sensor_id": g.target.options.data[j].sensor_id.toString(),
                            "wl": Number(g.target.options.data[j].wl),
                            "sen": g.target.options.data[j].sen
                        })
                        j += 1
                    })
                }
            }


            var chart = am4core.create("chart1", am4charts.XYChart);
            chart.data = dataChart;
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "sensor_id";
            categoryAxis.renderer.inside = true;
            categoryAxis.renderer.labels.template.valign = "top";
            categoryAxis.renderer.labels.template.fontSize = 20;

            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 20;
            categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
                if (target.dataItem && target.dataItem.index & 2 == 2) {
                    return dy + 25;
                }
                return dy;
            });
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = "wl";
            series.dataFields.categoryX = "sensor_id";
            series.name = "Visits";
            series.columns.template.tooltipText = "Sensor ID: [bold]{categoryX}[/]\nระดับน้ำ: [bold]{valueY} เมตร[/] ";
            series.columns.template.fillOpacity = .8;

            var columnTemplate = series.columns.template;
            columnTemplate.strokeWidth = 2;
            columnTemplate.strokeOpacity = 1;
        }
        function showChart2() {
            var dataChart = []
            if (g.target.options.data.length > 0) {
                j = 0; {
                    let lenq = g.target.options.data
                    lenq.map(i => {
                        dataChart.push({
                            "sensor_id": g.target.options.data[j].sensor_id.toString(),
                            "EC": Number(g.target.options.data[j].ec)
                        })
                        j += 1
                    })
                }
            }
            var chart = am4core.create("chart2", am4charts.XYChart);
            chart.data = dataChart;
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "sensor_id";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;
            categoryAxis.renderer.inside = true;
            categoryAxis.renderer.labels.template.valign = "top";
            categoryAxis.renderer.labels.template.fontSize = 20;
            categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
                if (target.dataItem && target.dataItem.index & 2 == 2) {
                    return dy + 25;
                }
                return dy;
            });
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = "EC";
            series.dataFields.categoryX = "sensor_id";
            series.name = "Visits";
            series.columns.template.tooltipText = "Sensor ID: [bold]{categoryX}[/]\nEC: [bold]{valueY} µs/cm[/]";
            series.columns.template.fillOpacity = .8;

            var columnTemplate = series.columns.template;
            columnTemplate.strokeWidth = 2;
            columnTemplate.strokeOpacity = 1;
        }

        function showChart3() {
            var dataChart = []
            if (g.target.options.data.length > 0) {
                j = 0; {
                    let lenq = g.target.options.data
                    lenq.map(i => {
                        dataChart.push({
                            "sensor_id": g.target.options.data[j].sensor_id.toString(),
                            "ph": Number(g.target.options.data[j].ph)
                        })
                        j += 1
                    })
                }
            }
            var chart = am4core.create("chart3", am4charts.XYChart);
            chart.data = dataChart;
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "sensor_id";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;
            categoryAxis.renderer.inside = true;
            categoryAxis.renderer.labels.template.valign = "top";
            categoryAxis.renderer.labels.template.fontSize = 20;
            categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
                if (target.dataItem && target.dataItem.index & 2 == 2) {
                    return dy + 25;
                }
                return dy;
            });
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = "ph";
            series.dataFields.categoryX = "sensor_id";
            series.name = "Visits";
            series.columns.template.tooltipText = "Sensor ID: [bold]{categoryX}[/]\nPh: [bold]{valueY}[/]";
            series.columns.template.fillOpacity = .8;

            var columnTemplate = series.columns.template;
            columnTemplate.strokeWidth = 2;
            columnTemplate.strokeOpacity = 1;

        }

        function showChart4() {
            var dataChart = []
            if (g.target.options.data.length > 0) {
                j = 0; {
                    let lenq = g.target.options.data
                    lenq.map(i => {
                        dataChart.push({
                            "sensor_id": g.target.options.data[j].sensor_id.toString(),
                            "temp": Number(g.target.options.data[j].temp)
                        })
                        j += 1
                    })
                }
            }
            var chart = am4core.create("chart4", am4charts.XYChart);
            chart.data = dataChart;
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "sensor_id";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;
            categoryAxis.renderer.inside = true;
            categoryAxis.renderer.labels.template.valign = "top";
            categoryAxis.renderer.labels.template.fontSize = 20;
            categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
                if (target.dataItem && target.dataItem.index & 2 == 2) {
                    return dy + 25;
                }
                return dy;
            });
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = "temp";
            series.dataFields.categoryX = "sensor_id";
            series.name = "Visits";
            series.columns.template.tooltipText = "Sensor ID: [bold]{categoryX}[/]\nTemp: [bold]{valueY} ppm[/]";
            series.columns.template.fillOpacity = .8;

            var columnTemplate = series.columns.template;
            columnTemplate.strokeWidth = 2;
            columnTemplate.strokeOpacity = 1;
        }

        function showChart5() {
            var dataChart = []
            if (g.target.options.data.length > 0) {
                j = 0; {
                    let lenq = g.target.options.data
                    lenq.map(i => {
                        dataChart.push({
                            "sensor_id": g.target.options.data[j].sensor_id.toString(),
                            "tds": Number(g.target.options.data[j].tds)
                        })
                        j += 1
                    })
                }
            }
            var chart = am4core.create("chart5", am4charts.XYChart);
            chart.data = dataChart;
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "sensor_id";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;
            categoryAxis.renderer.inside = true;
            categoryAxis.renderer.labels.template.valign = "top";
            categoryAxis.renderer.labels.template.fontSize = 20;
            categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
                if (target.dataItem && target.dataItem.index & 2 == 2) {
                    return dy + 25;
                }
                return dy;
            });
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = "tds";
            series.dataFields.categoryX = "sensor_id";
            series.name = "Visits";
            series.columns.template.tooltipText = "Sensor ID: [bold]{categoryX}[/]\nTds: [bold]{valueY} mg/L[/]";
            series.columns.template.fillOpacity = .8;

            var columnTemplate = series.columns.template;
            columnTemplate.strokeWidth = 2;
            columnTemplate.strokeOpacity = 1;
        }
        function showChart6() {
            var dataChart = []
            if (g.target.options.data.length > 0) {
                j = 0; {
                    let lenq = g.target.options.data
                    lenq.map(i => {
                        dataChart.push({
                            "sensor_id": g.target.options.data[j].sensor_id.toString(),
                            "sal": Number(g.target.options.data[j].sal)
                        })
                        j += 1
                    })
                }
            }
            var chart = am4core.create("chart6", am4charts.XYChart);
            chart.data = dataChart;
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "sensor_id";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;
            categoryAxis.renderer.inside = true;
            categoryAxis.renderer.labels.template.valign = "top";
            categoryAxis.renderer.labels.template.fontSize = 20;
            categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
                if (target.dataItem && target.dataItem.index & 2 == 2) {
                    return dy + 25;
                }
                return dy;
            });
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = "sal";
            series.dataFields.categoryX = "sensor_id";
            series.name = "Visits";
            series.columns.template.tooltipText = "Sensor ID: [bold]{categoryX}[/]\nSal: [bold]{valueY} ppt[/]";
            series.columns.template.fillOpacity = .8;

            var columnTemplate = series.columns.template;
            columnTemplate.strokeWidth = 2;
            columnTemplate.strokeOpacity = 1;
        }

    })
}
// }
