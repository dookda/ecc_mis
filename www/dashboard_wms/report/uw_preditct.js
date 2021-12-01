let UW_prov_all = (code) => {
    let url = "https://eec-onep.online:3700";
    axios.post(url + "/predict_UW_industry/data/prov").then(async (r) => {
        let arrData = []
        let data = r.data.data.filter(e => e.p_code == code);
        await data.map(i => {
            arrData.push(
                { category: "ปี 2550", four: i.y2550 },
                { category: "ปี 2551", four: i.y2551 },
                { category: "ปี 2552", four: i.y2552 },
                { category: "ปี 2553", four: i.y2553 },
                { category: "ปี 2554", four: i.y2554 },
                { category: "ปี 2555", four: i.y2555 },
                { category: "ปี 2556", four: i.y2556 },
                { category: "ปี 2557", four: i.y2557 },
                { category: "ปี 2558", four: i.y2558 },
                { category: "ปี 2559", four: i.y2559 },
                { category: "ปี 2560", four: i.y2560 },
                { category: "ปี 2561", four: i.y2561 },
                { category: "ปี 2565", four: i.y2565 },
                { category: "ปี 2570", four: i.y2570 },
                { category: "ปี 2575", four: i.y2575 },
                { category: "ปี 2580", four: i.y2580 },
            )
        })
        if (code == "eec") { chart_UW_industry(arrData, 'ภาพรวมทั้ง 3 จังหวัด', 'ล้านลบ.ม./ปี', 'chartUW_industry', '#DEAD54', '#DEAD54') }
        else if (code == "eec20") { chart_UW_industry(arrData, 'ภาพรวมจังหวัดชลบุรี', 'ล้านลบ.ม./ปี', 'chartUW_industry', '#F2C95F', '#EEB930') }
        else if (code == "eec21") { chart_UW_industry(arrData, 'ภาพรวมจังหวัดระยอง', 'ล้านลบ.ม./ปี', 'chartUW_industry', '#000080', '#000080') }
        else if (code == "eec24") { chart_UW_industry(arrData, 'ภาพรวมจังหวัดฉะเชิงเทรา', 'ล้านลบ.ม./ปี', 'chartUW_industry', '#CB0000', '#CB0000') }
        // UW_prov("2001")
    })
}
// UW_prov_all("eec20")
let UW_prov = (code) => {
    let url = "https://eec-onep.online:3700";
    axios.post(url + "/predict_UW_industry/data/prov").then(async (r) => {
        let arrData3 = []
        let data3 = r.data.data.filter(e => e.a_code == code);
        await data3.map(i => {
            arrData3.push(
                { "year": "2550", "value": i.y2550 },
                { "year": "2551", "value": i.y2551 },
                { "year": "2552", "value": i.y2552 },
                { "year": "2553", "value": i.y2553 },
                { "year": "2554", "value": i.y2554 },
                { "year": "2555", "value": i.y2555 },
                { "year": "2556", "value": i.y2556 },
                { "year": "2557", "value": i.y2557 },
                { "year": "2558", "value": i.y2558 },
                { "year": "2559", "value": i.y2559 },
                { "year": "2560", "value": i.y2560 },
                { "year": "2561", "value": i.y2561 },
                { "year": "2565", "value": i.y2565 },
                { "year": "2570", "value": i.y2570 },
                { "year": "2575", "value": i.y2575 },
                { "year": "2580", "value": i.y2580 }
            )
        })
        chart_UW_industrybyamp(arrData3, data3[0].amp, 'ล้านลบ.ม./ปี', 'chartUW_industry', '#55AA69', '#55AA69')
    })
}
let UW_year = (pcode) => {
    let url = "https://eec-onep.online:3700";
    axios.post(url + "/predict_UW_industry/data/prov").then(async (r) => {
        let arrData2 = []
        let data2 = r.data.data.filter(e => e.p_code == pcode);
        let year = $('#Y_industry').val();
        await data2.map(i => {
            if (year == "y2550") { arrData2.push({ category: i.amp, four: i.y2550 }) }
            else if (year == "y2551") { arrData2.push({ category: i.amp, four: i.y2551 }) }
            else if (year == "y2552") { arrData2.push({ category: i.amp, four: i.y2552 }) }
            else if (year == "y2553") { arrData2.push({ category: i.amp, four: i.y2553 }) }
            else if (year == "y2554") { arrData2.push({ category: i.amp, four: i.y2554 }) }
            else if (year == "y2555") { arrData2.push({ category: i.amp, four: i.y2555 }) }
            else if (year == "y2556") { arrData2.push({ category: i.amp, four: i.y2556 }) }
            else if (year == "y2557") { arrData2.push({ category: i.amp, four: i.y2557 }) }
            else if (year == "y2558") { arrData2.push({ category: i.amp, four: i.y2558 }) }
            else if (year == "y2559") { arrData2.push({ category: i.amp, four: i.y2559 }) }
            else if (year == "y2560") { arrData2.push({ category: i.amp, four: i.y2560 }) }
            else if (year == "y2561") { arrData2.push({ category: i.amp, four: i.y2561 }) }
            else if (year == "y2565") { arrData2.push({ category: i.amp, four: i.y2565 }) }
            else if (year == "y2570") { arrData2.push({ category: i.amp, four: i.y2570 }) }
            else if (year == "y2575") { arrData2.push({ category: i.amp, four: i.y2575 }) }
            else if (year == "y2580") { arrData2.push({ category: i.amp, four: i.y2580 }) }

        })
        let a = year.split("y");
        let eec = `ภาพรวมทั้ง 3 จังหวัด ปี ${a[1]}`
        let eec24 = `จังหวัดฉะเชิงเทรา ปี ${a[1]}`
        let eec20 = `จังหวัดชลบุรี ปี ${a[1]}`
        let eec21 = `จังหวัดระยอง ปี ${a[1]}`

        if (pcode == "eec") { chart_UW_industry(arrData2, eec, 'ล้านลบ.ม./ปี', 'chartUW_industry', '#DEAD54', '#DEAD54') }
        else if (pcode == "24") { chart_UW_industry(arrData2, eec24, 'ล้านลบ.ม./ปี', 'chartUW_industry', '#D69929', '#D69929') }
        else if (pcode == "20") { chart_UW_industry(arrData2, eec20, 'ล้านลบ.ม./ปี', 'chartUW_industry', '#D69929', '#D69929') }
        else if (pcode == "21") { chart_UW_industry(arrData2, eec21, 'ล้านลบ.ม./ปี', 'chartUW_industry', '#D69929', '#D69929') }

    })
}
$('#P1_industry').on('change', function () {
    getyear_industry();
})
$('#Y_industry').on('change', function () {
    getyear_industry();
})
let getyear_industry = () => {
    var p_code = $('#P1_industry').val();
    UW_year(p_code)
}
let chart_UW_industry = (data, names, umit, divchart, color1, color2) => {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    var chart = am4core.create(divchart, am4charts.XYChart)
    chart.colors.step = 2;
    chart.numberFormatter.numberFormat = "#,###,###,###as" + ` ${umit}` + "'";
    chart.width = am4core.percent(100);
    chart.height = am4core.percent(100);

    chart.legend = new am4charts.Legend()
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95

    var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'category'
    xAxis.renderer.cellStartLocation = 0.1
    xAxis.renderer.cellEndLocation = 0.9
    xAxis.renderer.grid.template.location = 0;

    var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;
    // yAxis.renderer.minGridDistance = 100;
    yAxis.events.on("ready", function (ev) {
        // ev.target.min = ev.target.min;
        // ev.target.max = ev.target.max;
        // console.log(ev.target.max)
        yAxis.max = ev.target.max + 5
    })

    function createSeries(value, name, unit, color1, color2) {
        var series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'category'
        series.name = name
        series.columns.template.tooltipText = `{categoryX} : [bold]{valueY.formatNumber('###,###,###.##')} ${unit}[/]`;

        series.events.on("hidden", arrangeColumns);
        series.events.on("shown", arrangeColumns);

        series.stroke = am4core.color(color2);
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color(color2);
        series.columns.template.stroke = am4core.color(color1);
        series.columns.template.fill = am4core.color(color1);

        var bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.interactionsEnabled = false
        bullet.dy = -15;
        bullet.label.text = "{valueY.formatNumber('###,###,###.##')}"
        bullet.label.fill = am4core.color('#000000')

        return series;
    }
    chart.data = data
    createSeries('four', names, umit, color1, color2);


    function arrangeColumns() {

        var series = chart.series.getIndex(0);

        var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
        if (series.dataItems.length > 1) {
            var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
            var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
            var delta = ((x1 - x0) / chart.series.length) * w;
            if (am4core.isNumber(delta)) {
                var middle = chart.series.length / 2;

                var newIndex = 0;
                chart.series.each(function (series) {
                    if (!series.isHidden && !series.isHiding) {
                        series.dummyData = newIndex;
                        newIndex++;
                    }
                    else {
                        series.dummyData = chart.series.indexOf(series);
                    }
                })
                var visibleCount = newIndex;
                var newMiddle = visibleCount / 2;

                chart.series.each(function (series) {
                    var trueIndex = chart.series.indexOf(series);
                    var newIndex = series.dummyData;

                    var dx = (newIndex - trueIndex + middle - newMiddle) * delta

                    series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                    series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                })
            }
        }
    }
    chart.exporting.menu = new am4core.ExportMenu();
    // chart.exporting.adapter.add("data", function (data, target) {
    //     var data = [];
    //     chart.series.each(function (series) {
    //         for (var i = 0; i < series.data.length; i++) {
    //             series.data[i].name = series.name;
    //             data.push(series.data[i]);
    //         }
    //     });
    //     return { data: data };
    // });
}
let chart_UW_industrybyamp = (data, names, umit, divchart, color1, color2) => {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create(divchart, am4charts.XYChart);
    chart.numberFormatter.numberFormat = "#,###,###,###as" + ` ${umit}` + "'";

    chart.paddingRight = 20;
    chart.legend = new am4charts.Legend()
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95
    // Add data
    chart.data = data

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.minGridDistance = 50;
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.startLocation = 0.5;
    categoryAxis.endLocation = 0.5;

    // Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.baseValue = 0;

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "year";
    series.name = names
    series.strokeWidth = 2;
    // series.tensionX = 0.77;

    // bullet is added because we add tooltip to a bullet for it to change color
    var bullet = series.bullets.push(new am4charts.Bullet());
    bullet.tooltipText = "{valueY}";
    bullet.adapter.add("fill", function (fill, target) {
        if (target.dataItem.valueY < 0) {
            return am4core.color("#FF0000");
        }
        return fill;
    })

    var bullet2 = series.bullets.push(new am4charts.CircleBullet());
    bullet2.strokeWidth = 2;
    bullet2.stroke = am4core.color("#fff");
    bullet2.setStateOnChildren = true;
    bullet2.tooltipText = `ปี {year} : [bold font-size: 17px]{valueY}[/]`;
    bullet2.propertyFields.fillOpacity = "opacity";
    bullet2.propertyFields.strokeOpacity = "opacity";


    var range = valueAxis.createSeriesRange(series);
    range.value = 0;
    range.endValue = -1000;
    range.contents.stroke = am4core.color("#FF0000");
    range.contents.fill = range.contents.stroke;

    // Add scrollbar
    // var scrollbarX = new am4charts.XYChartScrollbar();
    // scrollbarX.series.push(series);
    // chart.scrollbarX = scrollbarX;

    chart.cursor = new am4charts.XYCursor();
    chart.exporting.menu = new am4core.ExportMenu();
    // chart.exporting.adapter.add("data", function (data, target) {
    //     var data = [];
    //     chart.series.each(function (series) {
    //         for (var i = 0; i < series.data.length; i++) {
    //             series.data[i].name = series.name;
    //             data.push(series.data[i]);
    //         }
    //     });
    //     return { data: data };
    // });
}
let UW_industrybyprov_all = () => {
    let url = "https://eec-onep.online:3700";
    axios.post(url + "/predict_UW_industry/data/prov").then(async (r) => {
        let arrData1 = []
        let arrData2 = []
        let arrData3 = []
        let data1 = r.data.data.filter(e => e.p_code == "eec24");
        let data2 = r.data.data.filter(e => e.p_code == "eec20");
        let data3 = r.data.data.filter(e => e.p_code == "eec21");
        await data1.map(i => {
            arrData1.push(
                { "category": "ปี 2550", "value": i.y2550 },
                { "category": "ปี 2551", "value": i.y2551 },
                { "category": "ปี 2552", "value": i.y2552 },
                { "category": "ปี 2553", "value": i.y2553 },
                { "category": "ปี 2554", "value": i.y2554 },
                { "category": "ปี 2555", "value": i.y2555 },
                { "category": "ปี 2556", "value": i.y2556 },
                { "category": "ปี 2557", "value": i.y2557 },
                { "category": "ปี 2558", "value": i.y2558 },
                { "category": "ปี 2559", "value": i.y2559 },
                { "category": "ปี 2560", "value": i.y2560 },
                { "category": "ปี 2561", "value": i.y2561 },
                { "category": "ปี 2565", "value": i.y2565 },
                { "category": "ปี 2570", "value": i.y2570 },
                { "category": "ปี 2575", "value": i.y2575 },
                { "category": "ปี 2580", "value": i.y2580 }
            )
        })
        await data2.map(i => {
            arrData2.push(
                { "category": "ปี 2550", "value": i.y2550 },
                { "category": "ปี 2551", "value": i.y2551 },
                { "category": "ปี 2552", "value": i.y2552 },
                { "category": "ปี 2553", "value": i.y2553 },
                { "category": "ปี 2554", "value": i.y2554 },
                { "category": "ปี 2555", "value": i.y2555 },
                { "category": "ปี 2556", "value": i.y2556 },
                { "category": "ปี 2557", "value": i.y2557 },
                { "category": "ปี 2558", "value": i.y2558 },
                { "category": "ปี 2559", "value": i.y2559 },
                { "category": "ปี 2560", "value": i.y2560 },
                { "category": "ปี 2561", "value": i.y2561 },
                { "category": "ปี 2565", "value": i.y2565 },
                { "category": "ปี 2570", "value": i.y2570 },
                { "category": "ปี 2575", "value": i.y2575 },
                { "category": "ปี 2580", "value": i.y2580 }
            )
        })
        await data3.map(i => {
            arrData3.push(
                { "category": "ปี 2550", "value": i.y2550 },
                { "category": "ปี 2551", "value": i.y2551 },
                { "category": "ปี 2552", "value": i.y2552 },
                { "category": "ปี 2553", "value": i.y2553 },
                { "category": "ปี 2554", "value": i.y2554 },
                { "category": "ปี 2555", "value": i.y2555 },
                { "category": "ปี 2556", "value": i.y2556 },
                { "category": "ปี 2557", "value": i.y2557 },
                { "category": "ปี 2558", "value": i.y2558 },
                { "category": "ปี 2559", "value": i.y2559 },
                { "category": "ปี 2560", "value": i.y2560 },
                { "category": "ปี 2561", "value": i.y2561 },
                { "category": "ปี 2565", "value": i.y2565 },
                { "category": "ปี 2570", "value": i.y2570 },
                { "category": "ปี 2575", "value": i.y2575 },
                { "category": "ปี 2580", "value": i.y2580 }
            )
        })
        var data = [{
            "category": "จังหวัดฉะเชิงเทรา",
            "value": 627.53,
            "color": am4core.color("#CB0000"),
            "breakdown": arrData1
        }, {
            "category": "จังหวัดชลบุรี",
            "value": 2531.09,
            "color": am4core.color("#F2C95F"),
            "breakdown": arrData2
        }, {
            "category": "จังหวัดระยอง",
            "value": 4657.41,
            "color": am4core.color("#000080"),
            "breakdown": arrData3
        }]
        change_UW_industrybyprov(data, 'ล้านลบ.ม./ปี')
        // chart_UW_industrybyamp(arrData3, data3[0].amp, 'ล้านลบ.ม./ปี', 'chartUW_industry', '#55AA69', '#55AA69')
    })
}

let change_UW_industrybyprov = (arrData, unit) => {
    am4core.useTheme(am4themes_animated);
    // Themes end

    /**
     * Source data
     */
    var data = arrData
    /**
     * Chart container
     */

    // Create chart instance
    var chart = am4core.create("chartUW_industry", am4core.Container);
    chart.width = am4core.percent(100);
    chart.height = am4core.percent(100);
    chart.layout = "horizontal";
    chart.numberFormatter.numberFormat = "#,###,###,###.##as" + ` ${unit}` + "'";


    /**
     * Column chart
     */

    // Create chart instance
    var columnChart = chart.createChild(am4charts.XYChart);

    // Create axes
    var categoryAxis = columnChart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;

    var valueAxis = columnChart.xAxes.push(new am4charts.ValueAxis());

    // Create series
    var columnSeries = columnChart.series.push(new am4charts.ColumnSeries());
    columnSeries.dataFields.valueX = "value";
    columnSeries.dataFields.categoryY = "category";
    columnSeries.columns.template.strokeWidth = 0;
    columnSeries.columns.template.tooltipText = `{categoryY} : [bold]{valueX.formatNumber('###,###,###.##')} ${unit}[/]`;

    /**
     * Pie chart
     */

    // Create chart instance
    var pieChart = chart.createChild(am4charts.PieChart);
    pieChart.data = data;
    pieChart.innerRadius = am4core.percent(50);

    // Add and configure Series
    var pieSeries = pieChart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "category";
    pieSeries.slices.template.propertyFields.fill = "color";
    pieSeries.labels.template.disabled = true;

    // Set up labels
    var label1 = pieChart.seriesContainer.createChild(am4core.Label);
    label1.text = "";
    label1.horizontalCenter = "middle";
    label1.fontSize = 35;
    label1.fontWeight = 600;
    label1.dy = -30;

    var label2 = pieChart.seriesContainer.createChild(am4core.Label);
    label2.text = "";
    label2.horizontalCenter = "middle";
    label2.fontSize = 18;
    label2.dy = 20;

    // Auto-select first slice on load
    pieChart.events.on("ready", function (ev) {
        pieSeries.slices.getIndex(0).isActive = true;
    });

    // Set up toggling events
    pieSeries.slices.template.events.on("toggled", function (ev) {
        if (ev.target.isActive) {

            // Untoggle other slices
            pieSeries.slices.each(function (slice) {
                if (slice != ev.target) {
                    slice.isActive = false;
                }
            });

            // Update column chart
            // columnSeries.appeared = false;
            columnChart.data = ev.target.dataItem.dataContext.breakdown;
            columnSeries.fill = ev.target.fill;
            columnSeries.reinit();

            // Update labels
            label1.text = pieChart.numberFormatter.format(ev.target.dataItem.values.value.percent, "#.'%'");
            label1.fill = ev.target.fill;
            label2.text = ev.target.dataItem.category;
        }
    });
}
let UW_industrybycate = (code) => {
    let url = "https://eec-onep.online:3700";
    axios.post(url + "/predict_UW_industry/data/cate").then(async (r) => {
        let arrData1 = []
        let data1 = r.data.data.filter(e => e.category_code == code)
        data1.map(i => {
            arrData1.push(
                { "category": "ปี 2561", "four": i.y2561 },
                { "category": "ปี 2565", "four": i.y2565 },
                { "category": "ปี 2570", "four": i.y2570 },
                { "category": "ปี 2575", "four": i.y2575 },
                { "category": "ปี 2580", "four": i.y2580 }
            )
        })
        if (code == "eec") {
            chart_UW_industry(arrData1, 'ภาพรวม', 'ล้านลบ.ม./ปี', 'chartUW_industry', '#DEAD54', '#DEAD54')
        } else {
            chart_UW_industry(arrData1, data1[0].category_tn, 'ล้านลบ.ม./ปี', 'chartUW_industry', '#CADE54', '#CADE54')
        }
    })
}
// UW_industrybycate("eec")
let change_UW_industrybycate = (data) => {
    $("#chartUW_industry").removeAttr("style").css({ "width": "auto", "height": "1200px" })
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartUW_industry", am4charts.XYChart);

    // Add data
    chart.data = data

    // Create axes
    var yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    yAxis.dataFields.category = "year";
    yAxis.renderer.grid.template.location = 0;
    yAxis.renderer.labels.template.fontSize = 10;
    yAxis.renderer.minGridDistance = 10;

    var xAxis = chart.xAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = "value";
    series.dataFields.categoryY = "year";
    series.columns.template.tooltipText = "{categoryY}: [bold]{valueX}[/]";
    series.columns.template.strokeWidth = 0;
    series.columns.template.adapter.add("fill", function (fill, target) {
        if (target.dataItem) {
            switch (target.dataItem.dataContext.region) {
                case "ผลิตภัณฑ์จากพืช":
                    return chart.colors.getIndex(0);
                    break;
                case "อุตสาหกรรมอาหาร และกิจการที่เกี่ยวข้อง":
                    return chart.colors.getIndex(1);
                    break;
                case "เครื่องดื่ม":
                    return chart.colors.getIndex(2);
                    break;
                case "สิ่งทอ":
                    return chart.colors.getIndex(3);
                    break;
            }
        }
        return fill;
    });

    var axisBreaks = {};
    var legendData = [];

    // Add ranges
    function addRange(label, start, end, color) {
        var range = yAxis.axisRanges.create();
        range.category = start;
        range.endCategory = end;
        range.label.text = label;
        range.label.disabled = false;
        range.label.fill = color;
        range.label.location = 0;
        range.label.dx = -130;
        range.label.dy = 12;
        range.label.fontWeight = "bold";
        range.label.fontSize = 12;
        range.label.horizontalCenter = "left"
        range.label.inside = true;

        range.grid.stroke = am4core.color("#396478");
        range.grid.strokeOpacity = 1;
        range.tick.length = 200;
        range.tick.disabled = false;
        range.tick.strokeOpacity = 0.6;
        range.tick.stroke = am4core.color("#396478");
        range.tick.location = 0;

        range.locations.category = 1;
        var axisBreak = yAxis.axisBreaks.create();
        axisBreak.startCategory = start;
        axisBreak.endCategory = end;
        axisBreak.breakSize = 1;
        axisBreak.fillShape.disabled = true;
        axisBreak.startLine.disabled = true;
        axisBreak.endLine.disabled = true;
        axisBreaks[label] = axisBreak;

        legendData.push({ name: label, fill: color });
    }

    addRange("ผลิตภัณฑ์จากพืช", "ปี 2560", "ปี 2561", chart.colors.getIndex(0));
    addRange("อุตสาหกรรมอาหาร และกิจการที่เกี่ยวข้อง", "ปี 2560", "ปี 2561", chart.colors.getIndex(1));
    addRange("เครื่องดื่ม", "ปี 2560", "ปี 2561", chart.colors.getIndex(2));
    addRange("สิ่งทอ", "ปี 2560", "ปี 2561", chart.colors.getIndex(3));

    chart.cursor = new am4charts.XYCursor();


    var legend = new am4charts.Legend();
    legend.position = "right";
    legend.scrollable = true;
    legend.valign = "top";
    legend.reverseOrder = true;

    chart.legend = legend;
    legend.data = legendData;

    legend.itemContainers.template.events.on("toggled", function (event) {
        var name = event.target.dataItem.dataContext.name;
        var axisBreak = axisBreaks[name];
        if (event.target.isActive) {
            axisBreak.animate({ property: "breakSize", to: 0 }, 1000, am4core.ease.cubicOut);
            yAxis.dataItems.each(function (dataItem) {
                if (dataItem.dataContext.region == name) {
                    dataItem.hide(1000, 500);
                }
            })
            series.dataItems.each(function (dataItem) {
                if (dataItem.dataContext.region == name) {
                    dataItem.hide(1000, 0, 0, ["valueX"]);
                }
            })
        }
        else {
            axisBreak.animate({ property: "breakSize", to: 1 }, 1000, am4core.ease.cubicOut);
            yAxis.dataItems.each(function (dataItem) {
                if (dataItem.dataContext.region == name) {
                    dataItem.show(1000);
                }
            })

            series.dataItems.each(function (dataItem) {
                if (dataItem.dataContext.region == name) {
                    dataItem.show(1000, 0, ["valueX"]);
                }
            })
        }
    })
}

$('#btn_uwindustry_down').hide();
$('#uwindustry').hide();
let op_preditct_indust = () => {
    $('#btn_uwindustry_down').show();
    $('#btn_uwindustry_up').hide();
    $('#uwindustry').slideDown();
    $('#T_industry').prop('selectedIndex', 0);
    UW_prov_all("eec")
}
let close_preditct_indust = () => {
    $('#btn_uwindustry_down').hide();
    $('#btn_uwindustry_up').show();
    $('#uwindustry').slideUp();
    $('#T_industry').prop('selectedIndex', 0);
}

$('#P2_industry_1').hide();
$('#P2_industry_2').hide();
$('#C_industry_1').hide();
$('#Y_industry_1').hide();
$('#Y_industry_2').hide();
$('#Y_industry_3').hide();
// UW_prov_all("eec")
$('#T_industry').on('change', function () {
    if (this.value == "eec") {
        $('#Y_industry_1').hide();
        $('#Y_industry_2').hide();
        $('#Y_industry_3').hide();
        $('#P2_industry_1').hide();
        $('#P2_industry_2').hide();
        $('#C_industry_1').hide();

        $('#P_industry1').show();
        UW_prov_all("eec")
    } else if (this.value == "year") {
        $('#Y_industry_1').show();
        $('#Y_industry_2').show();
        $('#Y_industry_3').show();

        $('#P2_industry_1').hide();
        $('#P2_industry_2').hide();
        $('#C_industry_1').hide();

        $('#P_industry1').show();
        getyear_industry()

    } else if (this.value == "prov") {
        $('#Y_industry_1').hide();
        $('#Y_industry_2').hide();
        $('#Y_industry_3').hide();

        $('#P2_industry_1').show();
        $('#P2_industry_2').show();

        $('#C_industry_1').hide();
        $('#P_industry1').show();

        UW_industrybyprov_all()
    } else if (this.value == "category") {
        $('#Y_industry_1').hide();
        $('#Y_industry_2').hide();
        $('#Y_industry_3').hide();

        $('#P2_industry_1').hide();
        $('#P2_industry_2').hide();

        $('#C_industry_1').show();
        $('#P_industry1').show();
        UW_industrybycate("eec")
    } else {
        $('#Y_industry_1').hide();
        $('#Y_industry_2').hide();
        $('#Y_industry_3').hide();

        $('#P2_industry_1').hide();
        $('#P2_industry_2').hide();
        $('#C_industry_1').hide();
    }
})

$("#P2_industry").on("change", function () {
    getPro(this.value)
});
$("#A_industry").on("change", function () {
    UW_prov(this.value)
});

let getPro = (procode) => {
    axios.get(url + `/eec-api/get-amp/${procode}`).then(r => {
        $("#A_industry").empty();
        if (procode == "eec") {
            $("#A_industry").empty().append(`<option value="eec">ทุกอำเภอ</option>`);
            UW_industrybyprov_all()
        } else {
            $("#A_industry").empty();
            let data = r.data.data
            UW_prov(data[0].amphoe_idn)
        }
        r.data.data.map(i => {
            $("#A_industry").append(`<option value="${i.amphoe_idn}">${i.amp_namt}</option>`)
        })
    })
}
let getCate = () => {
    $("#C_industry").empty().append(`<option value="eec">ภาพรวม</option>`);
    let url = "https://eec-onep.online:3700";
    axios.post(url + "/predict_UW_industry/data/cate").then(async (r) => {
        let data = r.data.data.filter(e => e.category_tn !== "รวม")
        data.map(i => {
            $("#C_industry").append(`<option value="${i.category_code}">${i.category_tn}</option>`)
        })
    })
}
getCate()
$("#C_industry").on("change", function () {
    UW_industrybycate(this.value)
})
