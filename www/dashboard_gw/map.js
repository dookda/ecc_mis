
let map = L.map('map', {
    center: [13.305567, 101.383101],
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
    map.setView(new L.LatLng(lat, lng), 10);
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
    let b = []

    // || e.stations[0].sensors.length > 0
    await r.data.forEach(async (e) => {
        if (e.province === "ชลบุรี" || e.province == "จันทบุรี" || e.province == "ฉะเชิงเทรา") {
            j = 0; {
                let len = e.stations[0].sensors
                len.map(i => {
                    // console.log(e)
                    a.push({
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
                        "wl_date": e.stations[0].sensors[j].wl_data,
                        "station_name": e.station_name,
                        "tambon": e.tambon,
                        "amphoe": e.amphoe,
                        "province": e.province
                    });
                    j += 1


                })
            }
            createMarker(e)
            $("#spinner").hide()
        }
        // Console.log(b)
    });


    var depth = 'av-depth'
    for (i = 0; i < a.length; i++) {
        depth = a[0].depth;
        document.getElementById('av-depth').innerHTML = depth;
    }
    var wl = 'av-wl'
    for (i = 0; i < a.length; i++) {
        wl = a[0].wl;
        document.getElementById('av-wl').innerHTML = wl;
    }
    var ec = 'av-ec'
    for (i = 0; i < a.length; i++) {
        ec = a[0].ec;
        document.getElementById('av-ec').innerHTML = ec;
    }
    var ph = 'av-ph'
    for (i = 0; i < a.length; i++) {
        ph = a[0].ph;
        document.getElementById('av-ph').innerHTML = ph;
    }
    var temp = 'av-temp'
    for (i = 0; i < a.length; i++) {
        temp = a[0].temp;
        document.getElementById('av-temp').innerHTML = temp;
    }
    var tds = 'av-tds'
    for (i = 0; i < a.length; i++) {
        tds = a[0].tds;
        document.getElementById('av-tds').innerHTML = tds;
    }
    var sal = 'av-sal'
    for (i = 0; i < a.length; i++) {
        sal = a[0].sal;
        document.getElementById('av-sal').innerHTML = sal;
    }
    // $("#sta_name").text(`${a[0].station_name} ${e.area_th}`)
    // console.log(a[0].station_name)
    var staname = 'sta_name'
    for (i = 0; i < a.length; i++) {
        staname = a[0].station_name + "\nต." + a[0].tambon + "\nอ." + a[0].amphoe + "\nจ." + a[0].province
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
    // wlChart(a)
    // var lat = []
    // var lng = []
    // var station_id = []
    // var station_name = []


})

getData()
function getData() {
    let b = [];
    let wl = []
    axios.get(api).then((r) => {
        var selDat = r.data.data.filter(e => e.province === "ชลบุรี" || e.province == "จันทบุรี" || e.province == "ฉะเชิงเทรา")
        selDat.map(e => {
            j = 0;
            b.push({
                "station_name": e.station_name,
                "station_id": e.station_id,
                "location": [e.lat, e.lng],
                "lat": e.lat,
                "lng": e.lng,
                // "lsensor": e.stations[0].sensors.length,
                "sensor_data": e.stations[0],
                "sensor_id": e.stations[0].sensors[j].sensor_id,
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
            wl.push({
                "sensor_id": e.stations[0].sensors[j]
            })
            j += 1
        })
        showTable(b)
        console.log(b)
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
            processing: true
        },
        data: data,
        columns: [
            { data: 'station_id' },
            { data: 'station_name' },
            { data: 'wl' },
            { data: 'wl_min' },
            { data: 'wl_max' },
            { data: 'wl_avg' }
        ],
        select: true,
        pageLength: 10,
        responsive: {
            details: false
        }

    });

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



        // Chart1(a)
        // Chart2(a)
        // Chart3(a)
        // Chart4(a)
        // Chart5(a)
        // Chart6(a)
        if (a.sensors.length == 1) {
            // Chart7(a)
            showChartS1(a)
            showChartS2(a)
            showChartS3(a)
            showChartS4(a)
            showChartS5(a)
            showChartS6(a)
            showChartS7(a)
        } else if (a.sensors.length > 1) {
            showChartSS1(a)
            showChartSS2(a)
            showChartSS3(a)
            showChartSS4(a)
            showChartSS5(a)
            showChartSS6(a)
            showChartSS7(a)
        }

        function Chart1() {
            var dataChart = []
            if (a.sensor_data.sensors.length > 0) {
                j = 0; {
                    let lenq = a.sensor_data.sensors
                    lenq.map(i => {
                        dataChart.push({
                            "sensor_id": a.sensor_data.sensors[j].sensor_id,
                            "wl": Number(a.sensor_data.sensors[j].wl)
                        })
                        j += 1
                    })
                }
            }
            console.log(dataChart)
            var chart = am4core.create("chartdiv", am4charts.XYChart);
            chart.data = dataChart;
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "sensor_id";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;

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
            series.name = "sensor";
            series.columns.template.tooltipText = "ระดับน้ำ: [bold]{valueY}[/] เมตร";
            series.columns.template.fillOpacity = .8;

            var columnTemplate = series.columns.template;
            columnTemplate.strokeWidth = 2;
            columnTemplate.strokeOpacity = 1;
        }
        function Chart2() {
            var dataChart = []
            if (a.sensor_data.sensors.length > 0) {
                j = 0; {
                    let lenq = a.sensor_data.sensors
                    lenq.map(i => {
                        dataChart.push({
                            "sensor_id": a.sensor_data.sensors[j].sensor_id,
                            "EC": Number(a.sensor_data.sensors[j].ec)
                        })
                        j += 1
                    })
                }
            }
            var chart = am4core.create("chartdiw", am4charts.XYChart);
            chart.data = dataChart;
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "sensor_id";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;

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
            series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
            series.columns.template.fillOpacity = .8;

            var columnTemplate = series.columns.template;
            columnTemplate.strokeWidth = 2;
            columnTemplate.strokeOpacity = 1;
        }

        function Chart3() {
            var dataChart = []
            if (a.sensor_data.sensors.length > 0) {
                j = 0; {
                    let lenq = a.sensor_data.sensors
                    lenq.map(i => {
                        dataChart.push({
                            "sensor_id": a.sensor_data.sensors[j].sensor_id,
                            "ph": Number(a.sensor_data.sensors[j].ph)
                        })
                        j += 1
                    })
                }
            }
            var chart = am4core.create("chartdie", am4charts.XYChart);
            chart.data = dataChart;
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "sensor_id";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;

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
            series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
            series.columns.template.fillOpacity = .8;

            var columnTemplate = series.columns.template;
            columnTemplate.strokeWidth = 2;
            columnTemplate.strokeOpacity = 1;

        }

        function Chart4() {
            var dataChart = []
            if (a.sensor_data.sensors.length > 0) {
                j = 0; {
                    let lenq = a.sensor_data.sensors
                    lenq.map(i => {
                        dataChart.push({
                            "sensor_id": a.sensor_data.sensors[j].sensor_id,
                            "temp": Number(a.sensor_data.sensors[j].temp)
                        })
                        j += 1
                    })
                }
            }
            var chart = am4core.create("chartdir", am4charts.XYChart);
            chart.data = dataChart;
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "sensor_id";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;

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
            series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
            series.columns.template.fillOpacity = .8;

            var columnTemplate = series.columns.template;
            columnTemplate.strokeWidth = 2;
            columnTemplate.strokeOpacity = 1;
        }

        function Chart5() {
            var dataChart = []
            if (a.sensor_data.sensors.length > 0) {
                j = 0; {
                    let lenq = a.sensor_data.sensors
                    lenq.map(i => {
                        dataChart.push({
                            "sensor_id": a.sensor_data.sensors[j].sensor_id,
                            "tds": Number(a.sensor_data.sensors[j].tds)
                        })
                        j += 1
                    })
                }
            }
            var chart = am4core.create("chartdit", am4charts.XYChart);
            chart.data = dataChart;
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "sensor_id";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;

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
            series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
            series.columns.template.fillOpacity = .8;

            var columnTemplate = series.columns.template;
            columnTemplate.strokeWidth = 2;
            columnTemplate.strokeOpacity = 1;
        }

        function Chart6() {
            var dataChart = []
            if (a.sensor_data.sensors.length > 0) {
                j = 0; {
                    let lenq = a.sensor_data.sensors
                    lenq.map(i => {
                        dataChart.push({
                            "sensor_id": a.sensor_data.sensors[j].sensor_id,
                            "sal": Number(a.sensor_data.sensors[j].sal)
                        })
                        j += 1
                    })
                }
            }
            var chart = am4core.create("chartdiy", am4charts.XYChart);
            chart.data = dataChart;
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "sensor_id";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;

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
            series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
            series.columns.template.fillOpacity = .8;

            var columnTemplate = series.columns.template;
            columnTemplate.strokeWidth = 2;
            columnTemplate.strokeOpacity = 1;
        }

        function Chart7() {
            var chart = am4core.create("chartdiu", am4charts.XYChart);

            chart.colors.step = 2;
            chart.maskBullets = false;

            var dataChart = [];
            if (a.sensor_data.sensors.length == 1) {
                dataChart.push({
                    "sensor1": a.sensor_data.sensors[0].sensor_id,
                    "wl_s1": Number(a.sensor_data.sensors[0].wl),
                    "date1": a.sensor_data.sensors[0].wl_date,
                })
            };;
            chart.data = dataChart

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 50;
            dateAxis.renderer.grid.template.disabled = true;
            dateAxis.renderer.fullWidthTooltip = true;

            var distanceAxis = chart.yAxes.push(new am4charts.ValueAxis());
            distanceAxis.title.text = "ปริมาณของน้ำบาดาล (เมตร)";
            // distanceAxis.renderer.grid.template.disabled = true;

            var durationAxis = chart.yAxes.push(new am4charts.ValueAxis());
            // durationAxis.title.text = "wl_s1";
            durationAxis.baseUnit = "minute";
            // durationAxis.renderer.grid.template.disabled = true;
            durationAxis.renderer.opposite = true;
            // durationAxis.syncWithAxis = distanceAxis;

            // durationAxis.durationFormatter.durationFormat = "hh'h' mm'min'";

            var latitudeAxis = chart.yAxes.push(new am4charts.ValueAxis());
            latitudeAxis.renderer.grid.template.disabled = true;
            latitudeAxis.renderer.labels.template.disabled = true;
            latitudeAxis.syncWithAxis = distanceAxis;

            // Create series
            var durationSeries = chart.series.push(new am4charts.LineSeries());
            durationSeries.dataFields.valueY = "wl_s1";
            durationSeries.dataFields.dateX = "date1";
            durationSeries.yAxis = durationAxis;
            durationSeries.name = "Sensor1";
            durationSeries.strokeWidth = 2;
            durationSeries.propertyFields.strokeDasharray = "dashLength";
            durationSeries.tooltipText = "sensor1: {valueY} Id: {townName}";
            durationSeries.showOnInit = true;


            var durationBullet = durationSeries.bullets.push(new am4charts.Bullet());
            var durationRectangle = durationBullet.createChild(am4core.Rectangle);
            durationBullet.horizontalCenter = "middle";
            durationBullet.verticalCenter = "middle";
            durationBullet.width = 7;
            durationBullet.height = 7;
            durationRectangle.width = 7;
            durationRectangle.height = 7;

            var durationState = durationBullet.states.create("hover");
            durationState.properties.scale = 1.2;

            // Add legend
            chart.legend = new am4charts.Legend();

            // Add cursor
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.fullWidthLineX = true;
            chart.cursor.xAxis = dateAxis;
            chart.cursor.lineX.strokeOpacity = 0;
            chart.cursor.lineX.fill = am4core.color("#000");
            chart.cursor.lineX.fillOpacity = 0.1;


            // Create vertical scrollbar and place it before the value axis
            chart.scrollbarY = new am4core.Scrollbar();
            chart.scrollbarY.parent = chart.leftAxesContainer;
            chart.scrollbarY.toBack();

            // Create a horizontal scrollbar with previe and place it underneath the date axis
            chart.scrollbarX = new am4charts.XYChartScrollbar();
            chart.scrollbarX.series.push(durationSeries);
            chart.scrollbarX.parent = chart.bottomAxesContainer;

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChartS1() {
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

                return series;
            }
            createSeries("value", "Sensor 1", [
                { "date": a.sensor_data.sensors[0].wl_date, "value": a.sensor_data.sensors[0].wl }

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

            // Create a horizontal scrollbar with previe and place it underneath the date axis
            chart.scrollbarX = new am4core.Scrollbar();
            chart.scrollbarX = new am4charts.XYChartScrollbar();
            // chart.scrollbarX.series.push(series);
            chart.scrollbarX.parent = chart.bottomAxesContainer;

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChartS2() {
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
                series.tooltipText = "[b]{valueY}[/] เมตร";
                series.strokeWidth = 2;
                series.data = data;

                var bullet = series.bullets.push(new am4charts.CircleBullet());
                bullet.circle.stroke = am4core.color("#fff");
                bullet.circle.strokeWidth = 2;

                return series;
            }
            createSeries("value", "Sensor 1", [
                { "date": a.sensor_data.sensors[0].ec_date, "value": Number(a.sensor_data.sensors[0].ec) }

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

            // Create a horizontal scrollbar with previe and place it underneath the date axis
            chart.scrollbarX = new am4core.Scrollbar();
            chart.scrollbarX = new am4charts.XYChartScrollbar();
            // chart.scrollbarX.series.push(series);
            chart.scrollbarX.parent = chart.bottomAxesContainer;

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChartS3() {
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

                return series;
            }
            createSeries("value", "Sensor 1", [
                { "date": a.sensor_data.sensors[0].ph_date, "value": Number(a.sensor_data.sensors[0].ph) }

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

            // Create a horizontal scrollbar with previe and place it underneath the date axis
            chart.scrollbarX = new am4core.Scrollbar();
            chart.scrollbarX = new am4charts.XYChartScrollbar();
            // chart.scrollbarX.series.push(series);
            chart.scrollbarX.parent = chart.bottomAxesContainer;

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChartS4() {
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
                series.tooltipText = "[b]{valueY}[/] เมตร";
                series.strokeWidth = 2;
                series.data = data;

                var bullet = series.bullets.push(new am4charts.CircleBullet());
                bullet.circle.stroke = am4core.color("#fff");
                bullet.circle.strokeWidth = 2;

                return series;
            }
            createSeries("value", "Sensor 1", [
                { "date": a.sensor_data.sensors[0].temp_date, "value": Number(a.sensor_data.sensors[0].temp) }

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

            // Create a horizontal scrollbar with previe and place it underneath the date axis
            chart.scrollbarX = new am4core.Scrollbar();
            chart.scrollbarX = new am4charts.XYChartScrollbar();
            // chart.scrollbarX.series.push(series);
            chart.scrollbarX.parent = chart.bottomAxesContainer;

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChartS5() {
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
                series.tooltipText = "[b]{valueY}[/] เมตร";
                series.strokeWidth = 2;
                series.data = data;

                var bullet = series.bullets.push(new am4charts.CircleBullet());
                bullet.circle.stroke = am4core.color("#fff");
                bullet.circle.strokeWidth = 2;

                return series;
            }
            createSeries("value", "Sensor 1", [
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

            // Create a horizontal scrollbar with previe and place it underneath the date axis
            chart.scrollbarX = new am4core.Scrollbar();
            chart.scrollbarX = new am4charts.XYChartScrollbar();
            // chart.scrollbarX.series.push(series);
            chart.scrollbarX.parent = chart.bottomAxesContainer;

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChartS6() {
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
                series.tooltipText = "[b]{valueY}[/] เมตร";
                series.strokeWidth = 2;
                series.data = data;

                var bullet = series.bullets.push(new am4charts.CircleBullet());
                bullet.circle.stroke = am4core.color("#fff");
                bullet.circle.strokeWidth = 2;

                return series;
            }
            createSeries("value", "Sensor 1", [
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

            // Create a horizontal scrollbar with previe and place it underneath the date axis
            chart.scrollbarX = new am4core.Scrollbar();
            chart.scrollbarX = new am4charts.XYChartScrollbar();
            // chart.scrollbarX.series.push(series);
            chart.scrollbarX.parent = chart.bottomAxesContainer;

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChartS7() {
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

        function showChartSS1() {
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

                return series;
            }
            createSeries("value", "Sensor 1", [
                { "date": a.sensor_data.sensors[0].wl_date, "value": a.sensor_data.sensors[0].wl }

            ]);
            createSeries("value", "Sensor 2", [
                { "date": a.sensor_data.sensors[1].wl_date, "value": a.sensor_data.sensors[1].wl }

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

            // Create a horizontal scrollbar with previe and place it underneath the date axis
            chart.scrollbarX = new am4core.Scrollbar();
            chart.scrollbarX = new am4charts.XYChartScrollbar();
            // chart.scrollbarX.series.push(series);
            chart.scrollbarX.parent = chart.bottomAxesContainer;

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }

        function showChartSS2() {
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
                series.tooltipText = "[b]{valueY}[/] เมตร";
                series.strokeWidth = 2;
                series.data = data;

                var bullet = series.bullets.push(new am4charts.CircleBullet());
                bullet.circle.stroke = am4core.color("#fff");
                bullet.circle.strokeWidth = 2;

                return series;
            }
            createSeries("value", "Sensor 1", [
                { "date": a.sensor_data.sensors[0].ec_date, "value": Number(a.sensor_data.sensors[0].ec) }

            ]);
            createSeries("value", "Sensor 2", [
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

            // Create a horizontal scrollbar with previe and place it underneath the date axis
            chart.scrollbarX = new am4core.Scrollbar();
            chart.scrollbarX = new am4charts.XYChartScrollbar();
            // chart.scrollbarX.series.push(series);
            chart.scrollbarX.parent = chart.bottomAxesContainer;

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChartSS3() {
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

                return series;
            }
            createSeries("value", "Sensor 1", [
                { "date": a.sensor_data.sensors[0].ph_date, "value": Number(a.sensor_data.sensors[0].ph) }

            ]);
            createSeries("value", "Sensor 2", [
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

            // Create a horizontal scrollbar with previe and place it underneath the date axis
            chart.scrollbarX = new am4core.Scrollbar();
            chart.scrollbarX = new am4charts.XYChartScrollbar();
            // chart.scrollbarX.series.push(series);
            chart.scrollbarX.parent = chart.bottomAxesContainer;

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChartSS4() {
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
                series.tooltipText = "[b]{valueY}[/] เมตร";
                series.strokeWidth = 2;
                series.data = data;

                var bullet = series.bullets.push(new am4charts.CircleBullet());
                bullet.circle.stroke = am4core.color("#fff");
                bullet.circle.strokeWidth = 2;

                return series;
            }
            createSeries("value", "Sensor 1", [
                { "date": a.sensor_data.sensors[0].temp_date, "value": Number(a.sensor_data.sensors[0].temp) }

            ]);
            createSeries("value", "Sensor 2", [
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

            // Create a horizontal scrollbar with previe and place it underneath the date axis
            chart.scrollbarX = new am4core.Scrollbar();
            chart.scrollbarX = new am4charts.XYChartScrollbar();
            // chart.scrollbarX.series.push(series);
            chart.scrollbarX.parent = chart.bottomAxesContainer;

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChartSS5() {
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
                series.tooltipText = "[b]{valueY}[/] เมตร";
                series.strokeWidth = 2;
                series.data = data;

                var bullet = series.bullets.push(new am4charts.CircleBullet());
                bullet.circle.stroke = am4core.color("#fff");
                bullet.circle.strokeWidth = 2;

                return series;
            }
            createSeries("value", "Sensor 1", [
                { "date": a.sensor_data.sensors[0].tds_date, "value": Number(a.sensor_data.sensors[0].tds) }

            ]);
            createSeries("value", "Sensor 2", [
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

            // Create a horizontal scrollbar with previe and place it underneath the date axis
            chart.scrollbarX = new am4core.Scrollbar();
            chart.scrollbarX = new am4charts.XYChartScrollbar();
            // chart.scrollbarX.series.push(series);
            chart.scrollbarX.parent = chart.bottomAxesContainer;

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChartSS6() {
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
                series.tooltipText = "[b]{valueY}[/] เมตร";
                series.strokeWidth = 2;
                series.data = data;

                var bullet = series.bullets.push(new am4charts.CircleBullet());
                bullet.circle.stroke = am4core.color("#fff");
                bullet.circle.strokeWidth = 2;

                return series;
            }
            createSeries("value", "Sensor 1", [
                { "date": a.sensor_data.sensors[0].sal_date, "value": Number(a.sensor_data.sensors[0].sal) }

            ]);
            createSeries("value", "Sensor 2", [
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

            // Create a horizontal scrollbar with previe and place it underneath the date axis
            chart.scrollbarX = new am4core.Scrollbar();
            chart.scrollbarX = new am4charts.XYChartScrollbar();
            // chart.scrollbarX.series.push(series);
            chart.scrollbarX.parent = chart.bottomAxesContainer;

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
        }
        function showChartSS7() {
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
                    station_name: e.station_name,
                    sensor_id: e.stations[0].sensors[j].sensor_id,
                    sensor_data: e.stations[0].sensors,
                    depth: e.stations[0].sensors[j].depth,
                    wl: e.stations[0].sensors[j].wl,
                    wl_min: e.stations[0].sensors[j].wl_min,
                    wl_max: e.stations[0].sensors[j].wl_max,
                    wl_avg: e.stations[0].sensors[j].wl_avg,
                    wl_date: e.stations[0].sensors[j].wl_date,
                    ec: e.stations[0].sensors[j].ec,
                    ph: e.stations[0].sensors[j].ph,
                    temp: e.stations[0].sensors[j].temp,
                    tds: e.stations[0].sensors[j].tds,
                    sal: e.stations[0].sensors[j].sal,
                    "sta": {
                        "tambon": e.tambon,
                        "amphoe": e.amphoe,
                        "province": e.province
                    }
                })
            j += 1
        })
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
        marker.bindPopup(e.station_name + "<br> ที่ตั้ง\nตำบล" + e.tambon + "\nอำเภอ" + e.amphoe + "\nจังหวัด" + e.province +
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
                                "sensor_id": g.target.options.data[j].sensor_id,
                                "wl": Number(g.target.options.data[j].wl)
                            })
                            j += 1
                        })
                    }
                }
                var chart = am4core.create("chart1", am4charts.XYChart);
                chart.data = dataChart;
                var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "sensor_id";
                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.renderer.minGridDistance = 30;

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
                series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
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
                                "sensor_id": g.target.options.data[j].sensor_id,
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
                series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
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
                                "sensor_id": g.target.options.data[j].sensor_id,
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
                series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
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
                                "sensor_id": g.target.options.data[j].sensor_id,
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
                series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
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
                                "sensor_id": g.target.options.data[j].sensor_id,
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
                series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
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
                                "sensor_id": g.target.options.data[j].sensor_id,
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
                series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
                series.columns.template.fillOpacity = .8;

                var columnTemplate = series.columns.template;
                columnTemplate.strokeWidth = 2;
                columnTemplate.strokeOpacity = 1;
            }




        })
    }
}
