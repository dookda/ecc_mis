
const url = "http://localhost:3700"

// axios.post(url + "/eec-api/iot-data-example", { token: 'ZWVjSW9UYnlFbkdSSURzU3RhdGlvbjE=' }).then(r => {
//     console.log(r);
// })

var chart;

let showChart = (typ, unit, dat) => {
    Highcharts.chart(typ, {
        chart: {
            type: 'spline',
            animation: Highcharts.svg,
            // marginRight: 100,
            events: {
                load: function () {
                    var series = this.series[0];
                    setInterval(async () => {
                        axios.get(url + '/eec-api/iot-data-bytype/' + typ).then((r) => {
                            // console.log(r);
                            let x = (new Date()).getTime();
                            // let x = Number(r.data.data[0].ts * 1000)
                            let y = Number(r.data.data[0].val);
                            // changeColorWarning(sta, y)
                            // changeColorMarker(sta, y)
                            return series.addPoint([x, y], true, true);
                        })
                    }, 10000);
                }
            },
            zoomType: 'x'
        },

        time: {
            useUTC: false
        },

        title: false,
        accessibility: {
            announceNewData: {
                enabled: true,
                minAnnounceInterval: 15000,
                announcementFormatter: function (allSeries, newSeries, newPoint) {
                    if (newPoint) {
                        return 'New point added. Value: ' + newPoint.y;
                    }
                    return false;
                }
            }
        },

        xAxis: {
            type: 'datetime',
            tickPixelInterval: 120,
            minorTickInterval: 'auto',
            startOnTick: false,
            endOnTick: false
        },

        yAxis: {
            title: {
                text: unit
            },
            // min: -5,
            // max: 5,
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],
            tickInterval: 1
        },

        tooltip: {
            headerFormat: '<b>{series.name}</b><br/>',
            //  pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f} cm'
            pointFormat: 'เวลา {point.x:%H:%M:%S} น.<br/>{point.y:.2f} cm'
        },

        legend: {
            enabled: false
        },

        exporting: {
            enabled: false
        },

        plotOptions: {
            series: {
                marker: {
                    enabled: false
                }
            }
        },
        series: [{
            name: 'value',
            data: dat
        }]
    })
}


axios.get(url + "/eec-api/iot-data-bytype-last20/rangd").then(async (r) => {
    let data = [];
    let time = (new Date()).getTime();
    r.data.data.map((j, k) => {
        data.push({
            x: time + k * 1000,
            y: Number(Number(j.val))
        });
    })
    showChart("rangd", "meter", data)
})

axios.get(url + "/eec-api/iot-data-bytype-last20/bmehumi").then(async (r) => {
    let data = [];
    let time = (new Date()).getTime();
    r.data.data.map((j, k) => {
        data.push({
            x: time + k * 1000,
            y: Number(Number(j.val))
        });
    })
    showChart("bmehumi", "%", data)
})

axios.get(url + "/eec-api/iot-data-bytype-last20/bmealti").then(async (r) => {
    let data = [];
    let time = (new Date()).getTime();
    r.data.data.map((j, k) => {
        data.push({
            x: time + k * 1000,
            y: Number(Number(j.val))
        });
    })
    showChart("bmealti", "meter", data)
})

axios.get(url + "/eec-api/iot-data-bytype-last20/bmepres").then(async (r) => {
    let data = [];
    let time = (new Date()).getTime();
    r.data.data.map((j, k) => {
        data.push({
            x: time + k * 1000,
            y: Number(Number(j.val))
        });
    })
    showChart("bmepres", "Pa", data)
})

axios.get(url + "/eec-api/iot-data-bytype-last20/bmetemp").then(async (r) => {
    let data = [];
    let time = (new Date()).getTime();
    r.data.data.map((j, k) => {
        data.push({
            x: time + k * 1000,
            y: Number(Number(j.val))
        });
    })
    showChart("bmetemp", "°c", data)
})








