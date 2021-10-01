
let chart_all = (data, umit, divchart, color1, color2) => {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    var chart = am4core.create(divchart, am4charts.XYChart)
    chart.colors.step = 2;
    chart.numberFormatter.numberFormat = "#,###,###,###as" + ` ${umit}` + "'";

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
        bullet.dy = 30;
        bullet.label.text = "{valueY.formatNumber('###,###,###.##')}"
        bullet.label.fill = am4core.color('#ffffff')

        return series;
    }

    chart.data = data

    createSeries('four', 'ภาพรวมทั้ง 3 จังหวัด', umit, color1, color2);

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
let chart_by_prov = (data, umit, divchart) => {
    // $("#chartdiv2").removeAttr("style").css({ "width": "1200px", "height": "800px" })
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    var chart = am4core.create(divchart, am4charts.XYChart)
    chart.colors.step = 2;
    chart.numberFormatter.numberFormat = "##,###,###,###as" + ` ${umit}` + "'";

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

    function createSeries(value, name, unit, color1, color2) {
        var series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'category'
        series.name = name
        series.columns.template.tooltipText = `${name} : [bold]{valueY.formatNumber('###,###,###.##')} ${unit}[/]`;

        series.events.on("hidden", arrangeColumns);
        series.events.on("shown", arrangeColumns);

        series.stroke = am4core.color(color2);
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color(color2);
        series.columns.template.stroke = am4core.color(color1);
        series.columns.template.fill = am4core.color(color1);

        // var bullet = series.bullets.push(new am4charts.LabelBullet())
        // bullet.interactionsEnabled = false
        // bullet.dy = 10;
        // bullet.label.text = "{valueY.formatNumber('###,###,###.##')}"
        // bullet.label.fill = am4core.color('#FFF')
        // bullet.label.hideOversized = false;
        // bullet.label.truncate = false;

        return series;
    }

    chart.data = data

    createSeries('first', 'จังหวัดฉะเชิงเทรา', umit, '#CB0000', '#CB0000');
    createSeries('second', 'จังหวัดชลบุรี', umit, '#F2C95F', '#F2C95F');
    createSeries('third', 'จังหวัดระยอง', umit, '#000080', '#000080');

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
//การคาดการณ์ปริมาณน้ำเสียชุมชนในกรณีที่มีการพัฒนาพื้นที่เขตพัฒนาพิเศษ ภาคตะวันออก ปี พ.ศ. ๒๕๖๔ – ๒๕๗๐
let datwaste = [
    {
        category: 'ปี 2564',
        first: 129832,
        second: 401727,
        third: 179416,
        four: 710975
    },
    {
        category: 'ปี 2565',
        first: 132700,
        second: 418802,
        third: 189952,
        four: 741454
    },
    {
        category: 'ปี 2566',
        first: 135700,
        second: 434595,
        third: 203047,
        four: 773342
    },
    {
        category: 'ปี 2567',
        first: 138813,
        second: 449089,
        third: 218183,
        four: 806085
    },
    {
        category: 'ปี 2568',
        first: 142035,
        second: 461059,
        third: 235216,
        four: 838310
    },
    {
        category: 'ปี 2569',
        first: 145444,
        second: 474128,
        third: 254519,
        four: 874091
    },
    {
        category: 'ปี 2570',
        first: 149064,
        second: 487566,
        third: 276993,
        four: 913623
    }
]
$('#wastetype').on('change', function () {
    var type = $('#wastetype').val()
    if (type == 'byprov') {
        let data = []
        datwaste.map(i => {
            data.push({ category: i.category, first: i.first, second: i.second, third: i.third })
        })
        chart_by_prov(data, 'ลบ.ม./วัน', 'chartdiv2')
        'การคาดการณ์ปริมาณน้ำเสียชุมชนในกรณีที่มีการพัฒนาพื้นที่เขตพัฒนาพิเศษ ภาคตะวันออก ปี พ.ศ. 2564 – 2570'
    } else {
        let data = []
        datwaste.map(i => {
            data.push({ category: i.category, four: i.four })
        })
        chart_all(data, 'ลบ.ม./วัน', 'chartdiv2', '#D5CA18', '#D5CA18')
    }
})
let calwaste = () => {
    var numpop = $('#numpopwaste').val();
    var cal = numpop * 150;
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    var string = formatNumber(cal);
    $('#valuewaste').html(string)
}
$('#cardwaste').hide();
$('#trendwaste').click(function () {
    if (this.checked) {
        $('#wastetype').prop('selectedIndex', 0);
        $('#cardwaste').slideDown();
        chart_all(datwaste, 'ลบ.ม./วัน', 'chartdiv2', '#D5CA18', '#D5CA18')
    } else {
        $('#cardwaste').slideUp();
    }
})
$('#offwaste').hide()
$('#calwaste').hide()
let onwaste = () => {
    $('#onwaste').hide()
    $('#offwaste').show()
    $('#calwaste').slideDown();
}
let offwaste = () => {
    $('#onwaste').show()
    $('#offwaste').hide()
    $('#calwaste').slideUp();
}

//การคาดการณ์ปริมาณขยะมูลฝอยในพื้นที่เขตเศรษฐกิจพิเศษภาคตะวันออก พ.ศ. ๒๕๖๔ - ๒๕๖๙
let datgarbage = [
    {
        category: 'ปี 2564',
        first: 1013,
        second: 3133,
        third: 1399,
        four: 5546
    },
    {
        category: 'ปี 2565',
        first: 1035,
        second: 3267,
        third: 1482,
        four: 5783
    },
    {
        category: 'ปี 2566',
        first: 1058,
        second: 3390,
        third: 1584,
        four: 6032
    },
    {
        category: 'ปี 2567',
        first: 1083,
        second: 3503,
        third: 1702,
        four: 6287
    },
    {
        category: 'ปี 2568',
        first: 1108,
        second: 3596,
        third: 1835,
        four: 6539
    },
    {
        category: 'ปี 2569',
        first: 1134,
        second: 3698,
        third: 1985,
        four: 6818
    },
    {
        category: 'ปี 2570',
        first: 1163,
        second: 3803,
        third: 2161,
        four: 7126
    }
]
$('#garbagetype').on('change', function () {
    var type = $('#garbagetype').val()
    if (type == 'byprov') {
        let data = []
        datgarbage.map(i => {
            data.push({ category: i.category, first: i.first, second: i.second, third: i.third })
        })
        chart_by_prov(data, 'ตัน/วัน', 'chartdiv3')
        'การคาดการณ์ปริมาณน้ำเสียชุมชนในกรณีที่มีการพัฒนาพื้นที่เขตพัฒนาพิเศษ ภาคตะวันออก ปี พ.ศ. 2564 – 2570'
    } else {
        let data = []
        datgarbage.map(i => {
            data.push({ category: i.category, four: i.four })
        })
        chart_all(data, 'ตัน/วัน', 'chartdiv3', '#E97537', '#E97537')
    }
})
let calgarbage = () => {
    var numpop = $('#numpopgarbage').val();
    var cal = numpop * 1.17;
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    var string = formatNumber(cal);
    $('#valuegarbage').html(string)
}
$('#cardgarbage').hide();
$('#trendgarbage').click(function () {
    if (this.checked) {
        $('#garbagetype').prop('selectedIndex', 0);
        $('#cardgarbage').slideDown();
        chart_all(datgarbage, 'ตัน/วัน', 'chartdiv3', '#E97537', '#E97537')
    } else {
        $('#cardgarbage').slideUp();
    }
})
$('#offgarbage').hide()
$('#calgarbage').hide()
let ongarbage = () => {
    $('#ongarbage').hide()
    $('#offgarbage').show()
    $('#calgarbage').slideDown();
}
let offgarbage = () => {
    $('#ongarbage').show()
    $('#offgarbage').hide()
    $('#calgarbage').slideUp();
}

let chartUW_by_prov = (data, umit, divchart) => {
    // $("#chartdiv2").removeAttr("style").css({ "width": "1200px", "height": "800px" })
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    var chart = am4core.create(divchart, am4charts.XYChart)
    chart.colors.step = 2;
    chart.numberFormatter.numberFormat = "##,###,###,###as" + ` ${umit}` + "'";

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

    function createSeries(value, name, unit, color1, color2) {
        var series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'category'
        series.name = name
        series.columns.template.tooltipText = `${name} : [bold]{valueY.formatNumber('###,###,###.##')} ${unit}[/]`;

        series.events.on("hidden", arrangeColumns);
        series.events.on("shown", arrangeColumns);

        series.stroke = am4core.color(color2);
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color(color2);
        series.columns.template.stroke = am4core.color(color1);
        series.columns.template.fill = am4core.color(color1);


        var bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.interactionsEnabled = false
        bullet.dy = 10;
        bullet.label.text = "{valueY.formatNumber('###,###,###.##')}"
        bullet.label.fill = am4core.color('#ffffff')

        return series;
    }

    chart.data = data
    createSeries('first', 'จังหวัดฉะเชิงเทรา', umit, '#CB0000', '#CB0000');
    createSeries('second', 'จังหวัดชลบุรี', umit, '#F2C95F', '#F2C95F');
    createSeries('third', 'จังหวัดระยอง', umit, '#000080', '#000080');

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
let chartUW_by_cat = (data, umit, divchart) => {
    // $("#chartdiv2").removeAttr("style").css({ "width": "1200px", "height": "800px" })
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    var chart = am4core.create(divchart, am4charts.XYChart)
    chart.colors.step = 2;
    chart.numberFormatter.numberFormat = "##,###,###,###as" + ` ${umit}` + "'";

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

    function createSeries(value, name, unit) {
        var series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'category'
        series.name = name
        series.columns.template.tooltipText = `${name} : [bold]{valueY.formatNumber('###,###,###.##')} ${unit}[/]`;

        series.events.on("hidden", arrangeColumns);
        series.events.on("shown", arrangeColumns);

        var bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.interactionsEnabled = false
        bullet.dy = 15;
        bullet.label.text = "{valueY.formatNumber('###,###,###.##')}"
        bullet.label.fill = am4core.color('#ffffff')

        return series;
    }

    chart.data = data

    createSeries('first', 'อุปโภคบริโภค', umit);
    createSeries('second', 'อุตสาหกรรม', umit);
    createSeries('third', 'เกษตรกรรม', umit);

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
let chartUW_by_year = (data, umit, divchart) => {
    // $("#chartdiv2").removeAttr("style").css({ "width": "1200px", "height": "800px" })
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    var chart = am4core.create(divchart, am4charts.XYChart)
    chart.colors.step = 2;
    chart.numberFormatter.numberFormat = "##,###,###,###as" + ` ${umit}` + "'";

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

    function createSeries(value, name, unit, color1, color2) {
        var series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'category'
        series.name = name
        series.columns.template.tooltipText = `${name} : [bold]{valueY.formatNumber('###,###,###.##')} ${unit}[/]`;

        series.events.on("hidden", arrangeColumns);
        series.events.on("shown", arrangeColumns);

        series.stroke = am4core.color(color2);
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color(color2);
        series.columns.template.stroke = am4core.color(color1);
        series.columns.template.fill = am4core.color(color1);


        var bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.interactionsEnabled = false
        bullet.dy = 10;
        bullet.label.text = "{valueY.formatNumber('###,###,###.##')}"
        bullet.label.fill = am4core.color('#ffffff')

        return series;
    }

    chart.data = data

    createSeries('first', 'ปี 2560', umit, '#F73E63', '#F50D3B');
    createSeries('second', 'ปี 2570', umit, '#EC486B', '#F17690');
    createSeries('third', 'ปี 2580', umit, '#35040C', '#640817');

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
let datuse_water_all = [
    {
        category: 'ปี 2560',
        first: 252,
        second: 606,
        third: 1562,
        four: 2420
    },
    {
        category: 'ปี 2570',
        first: 309,
        second: 748,
        third: 1831,
        four: 2888
    },
    {
        category: 'ปี 2580',
        first: 392,
        second: 865,
        third: 1832,
        four: 3089
    }
]
let datuse_water_prov60 = [
    {
        category: 'อุปโภค',
        first: 42,
        second: 148,
        third: 62,
        four: 252
    },
    {
        category: 'อุตสาหกรรม',
        first: 109,
        second: 204,
        third: 293,
        four: 606
    },
    {
        category: 'เกษตรกรรม',
        first: 1305,
        second: 118,
        third: 139,
        four: 1562
    }
]
let datuse_water_prov70 = [
    {
        category: 'อุปโภค',
        first: 52,
        second: 177,
        third: 80,
        four: 309
    },
    {
        category: 'อุตสาหกรรม',
        first: 134,
        second: 265,
        third: 349,
        four: 748
    },
    {
        category: 'เกษตรกรรม',
        first: 1397,
        second: 181,
        third: 253,
        four: 1831
    }
]
let datuse_water_prov80 = [
    {
        category: 'อุปโภค',
        first: 75,
        second: 208,
        third: 109,
        four: 392
    },
    {
        category: 'อุตสาหกรรม',
        first: 165,
        second: 314,
        third: 387,
        four: 865
    },
    {
        category: 'เกษตรกรรม',
        first: 1398,
        second: 181,
        third: 253,
        four: 1832
    }
]
let datuse_water_Yconsume = [
    {
        category: 'จังหวัดฉะเชิงเทรา',
        first: 42,
        second: 52,
        third: 75,
        four: 169
    },
    {
        category: 'จังหวัดชลบุรี',
        first: 148,
        second: 177,
        third: 208,
        four: 533
    },
    {
        category: 'จังหวัดระยอง',
        first: 252,
        second: 309,
        third: 392,
        four: 251
    }
]
let datuse_water_Yindustry = [
    {
        category: 'จังหวัดฉะเชิงเทรา',
        first: 109,
        second: 134,
        third: 165,
        four: 408
    },
    {
        category: 'จังหวัดชลบุรี',
        first: 204,
        second: 265,
        third: 314,
        four: 783
    },
    {
        category: 'จังหวัดระยอง',
        first: 293,
        second: 349,
        third: 387,
        four: 1029
    }
]
let datuse_water_Yagri = [
    {
        category: 'จังหวัดฉะเชิงเทรา',
        first: 1305,
        second: 1397,
        third: 1398,
        four: 4100
    },
    {
        category: 'จังหวัดชลบุรี',
        first: 118,
        second: 181,
        third: 181,
        four: 480
    },
    {
        category: 'จังหวัดระยอง',
        first: 139,
        second: 253,
        third: 253,
        four: 645
    }
]
$('#cardusewater').hide();
$('#trendusewater').click(function () {
    if (this.checked) {
        $('#usewatecat').prop('selectedIndex', 0);
        $('#usewateyear').prop('selectedIndex', 0);
        $('#usewatetype').prop('selectedIndex', 0);
        $('#cardusewater').slideDown();
        // chartUW_by_cat(datuse_water_all, 'ล้าน ลบ.ม./ปี', 'chartdiv4')
        chartUW_all()
    } else {
        $('#cardusewater').slideUp();
    }
})
$('#usewatetype').hide()
$('#usewateyear').hide()
$('#usewatecat').on('change', function () {
    var cat = $('#usewatecat').val()
    if (cat == 'all') {
        $('#usewatetype').hide()
        $('#usewateyear').hide()
        chartUW_all()
        // chartUW_by_cat(datuse_water_all, 'ล้าน ลบ.ม./ปี', 'chartdiv4')
    } else if (cat == 'byprov') {
        $('#usewatetype').hide()
        $('#usewateyear').show()
        $('#usewateyear').prop('selectedIndex', 0);
        chartUW_by_prov(datuse_water_prov60, 'ล้าน ลบ.ม./ปี', 'chartdiv4')
    } else {
        $('#usewatetype').show()
        $('#usewateyear').hide()
        $('#usewatetype').prop('selectedIndex', 0);
        chartUW_by_year(datuse_water_Yconsume, 'ล้าน ลบ.ม./ปี', 'chartdiv4')

    }
})
$('#usewatetype').on('change', function () {
    var type = $('#usewatetype').val()
    if (type == 'consume') {
        chartUW_by_year(datuse_water_Yconsume, 'ล้าน ลบ.ม./ปี', 'chartdiv4')
    } else if (type == 'industry') {
        chartUW_by_year(datuse_water_Yindustry, 'ล้าน ลบ.ม./ปี', 'chartdiv4')
    } else if (type == 'agri') {
        chartUW_by_year(datuse_water_Yagri, 'ล้าน ลบ.ม./ปี', 'chartdiv4')
    }
})
$('#usewateyear').on('change', function () {
    var year = $('#usewateyear').val()
    if (year == '2560') {
        chartUW_by_prov(datuse_water_prov60, 'ล้าน ลบ.ม./ปี', 'chartdiv4')
    } else if (year == '2570') {
        chartUW_by_prov(datuse_water_prov70, 'ล้าน ลบ.ม./ปี', 'chartdiv4')
    } else if (year == '2580') {
        chartUW_by_prov(datuse_water_prov80, 'ล้าน ลบ.ม./ปี', 'chartdiv4')
    }
})

let datall_pop = [
    {
        category: 'ปี 2559',
        first: 797109,
        second: 2187650,
        third: 954826,
        four: 3939585
    },
    {
        category: 'ปี 2560',
        first: 803442,
        second: 2297660,
        third: 981362,
        four: 4082463
    },
    {
        category: 'ปี 2561',
        first: 813805,
        second: 2373314,
        third: 1022255,
        four: 4209374
    }, {
        category: 'ปี 2562',
        first: 829202,
        second: 2467148,
        third: 1073324,
        four: 4369674
    },
    {
        category: 'ปี 2563',
        first: 846603,
        second: 2570650,
        third: 1131853,
        four: 4549106
    },
    {
        category: 'ปี 2564',
        first: 865545,
        second: 2678180,
        third: 1196104,
        four: 4739829
    },
    {
        category: 'ปี 2565',
        first: 884668,
        second: 2792016,
        third: 1266346,
        four: 4943029
    },
    {
        category: 'ปี 2566',
        first: 904666,
        second: 2897298,
        third: 1353644,
        four: 5155607
    },
    {
        category: 'ปี 2567',
        first: 925422,
        second: 2993926,
        third: 1454552,
        four: 5373900
    },
    {
        category: 'ปี 2568',
        first: 946898,
        second: 3073729,
        third: 1568104,
        four: 5588731
    },
    {
        category: 'ปี 2569',
        first: 969627,
        second: 3160855,
        third: 1696795,
        four: 5827276
    },
    {
        category: 'ปี 2570',
        first: 993762,
        second: 3250442,
        third: 1846620,
        four: 6090824
    }
]
let datregister_pop = [
    {
        category: 'ปี 2559',
        first: 704399,
        second: 1483049,
        third: 700223,
        four: 2887671
    },
    {
        category: 'ปี 2560',
        first: 709794,
        second: 1554682,
        third: 717358,
        four: 2981835
    },
    {
        category: 'ปี 2561',
        first: 716715,
        second: 1572894,
        third: 728603,
        four: 3018212
    },
    {
        category: 'ปี 2562',
        first: 727408,
        second: 1599299,
        third: 744190,
        four: 3070898
    },

    {
        category: 'ปี 2563',
        first: 739337,
        second: 1628023,
        third: 761703,
        four: 3129063
    },

    {
        category: 'ปี 2564',
        first: 751531,
        second: 1655469,
        third: 779617,
        four: 3186618
    },

    {
        category: 'ปี 2565',
        first: 763675,
        second: 1682721,
        third: 797596,
        four: 3243993
    },

    {
        category: 'ปี 2566',
        first: 775702,
        second: 1704591,
        third: 813047,
        four: 3293340
    },

    {
        category: 'ปี 2567',
        first: 787397,
        second: 1721924,
        third: 828127,
        four: 3337448
    },

    {
        category: 'ปี 2568',
        first: 798863,
        second: 1730425,
        third: 840380,
        four: 3369668
    },

    {
        category: 'ปี 2569',
        first: 810267,
        second: 1738640,
        third: 852574,
        four: 3401481
    },

    {
        category: 'ปี 2570',
        first: 821637,
        second: 1746620,
        third: 864739,
        four: 3432996
    },

]
let datdisguise_pop = [
    {
        category: 'ปี 2559',
        first: 92710,
        second: 704601,
        third: 254603,
        four: 1051914
    },

    {
        category: 'ปี 2560',
        first: 93647,
        second: 742977,
        third: 264004,
        four: 1100628
    },

    {
        category: 'ปี 2561',
        first: 97091,
        second: 800421,
        third: 293652,
        four: 1191163
    },

    {
        category: 'ปี 2562',
        first: 101794,
        second: 867849,
        third: 329133,
        four: 1298776
    },


    {
        category: 'ปี 2563',
        first: 107266,
        second: 942627,
        third: 370150,
        four: 1420043
    },


    {
        category: 'ปี 2564',
        first: 114014,
        second: 1022711,
        third: 416486,
        four: 1553211
    },


    {
        category: 'ปี 2565',
        first: 120992,
        second: 1109295,
        third: 468749,
        four: 1699037
    },

    {
        category: 'ปี 2566',
        first: 128964,
        second: 1192707,
        third: 540597,
        four: 1862268
    },

    {
        category: 'ปี 2567',
        first: 138025,
        second: 1272002,
        third: 626425,
        four: 2036452
    },

    {
        category: 'ปี 2568',
        first: 148035,
        second: 1343304,
        third: 727724,
        four: 2219063
    },

    {
        category: 'ปี 2569',
        first: 172125,
        second: 1503822,
        third: 981881,
        four: 2657828
    },

    {
        category: 'ปี 2570',
        first: 172125,
        second: 1503822,
        third: 981881,
        four: 2657828
    },

]
$('#cardpopnormal').hide()
$('#trendpopnormal').click(function () {
    if (this.checked) {
        $('#cardpopnormal').slideDown();
        $('#popnormaltype').prop('selectedIndex', 0);
        chart_by_prov(datall_pop, 'คน', 'chartdiv5')
    } else {
        $('#cardpopnormal').slideUp();
    }
})
$('#popnormaltype').on('change', function () {
    var type = $('#popnormaltype').val()
    if (type == 'all') {
        chart_by_prov(datall_pop, 'คน', 'chartdiv5')
    } else if (type == 'register') {
        chart_by_prov(datregister_pop, 'คน', 'chartdiv5')
    } else {
        chart_by_prov(datdisguise_pop, 'คน', 'chartdiv5')
    }
})
let datall_pop_covid = [
    {
        category: 'ปี 2562',
        first: 924399,
        second: 2096301,
        third: 1135132,
        four: 4155832
    },

    {
        category: 'ปี 2563',
        first: 949868,
        second: 2179085,
        third: 1187881,
        four: 4316835
    },

    {
        category: 'ปี 2564',
        first: 954945,
        second: 2208609,
        third: 1200812,
        four: 4364366
    },

    {
        category: 'ปี 2565',
        first: 937585,
        second: 2179502,
        third: 1169925,
        four: 4287012
    },

    {
        category: 'ปี 2566',
        first: 932620,
        second: 2183503,
        third: 1163489,
        four: 4279612
    },

    {
        category: 'ปี 2567',
        first: 937803,
        second: 2214704,
        third: 1177104,
        four: 4329611
    },

    {
        category: 'ปี 2568',
        first: 952630,
        second: 2271786,
        third: 1209781,
        four: 4434196
    },

    {
        category: 'ปี 2569',
        first: 973016,
        second: 2344006,
        third: 1253524,
        four: 4570546
    },

    {
        category: 'ปี 2570',
        first: 999996,
        second: 2434095,
        third: 1310360,
        four: 4744451
    },

]
let datregister_pop_covid = [
    {
        category: 'ปี 2562',
        first: 720113,
        second: 1558301,
        third: 734753,
        four: 3013167
    },

    {
        category: 'ปี 2563',
        first: 725154,
        second: 1587285,
        third: 747464,
        four: 3059903
    },


    {
        category: 'ปี 2564',
        first: 730230,
        second: 1616809,
        third: 760395,
        four: 3107434
    },

    {
        category: 'ปี 2565',
        first: 735341,
        second: 1646882,
        third: 773550,
        four: 3155773
    },


    {
        category: 'ปี 2566',
        first: 740489,
        second: 1677514,
        third: 786933,
        four: 3204935
    },

    {
        category: 'ปี 2567',
        first: 745672,
        second: 1708715,
        third: 800547,
        four: 3254934
    },

    {
        category: 'ปี 2568',
        first: 750892,
        second: 1740497,
        third: 814396,
        four: 3305785
    },

    {
        category: 'ปี 2569',
        first: 756148,
        second: 1772871,
        third: 828485,
        four: 3357504
    },

    {
        category: 'ปี 2570',
        first: 761441,
        second: 1805846,
        third: 842818,
        four: 3410105
    },


]
let datdisguise_pop_covid = [
    {
        category: 'ปี 2562',
        first: 204286,
        second: 538000,
        third: 400379,
        four: 1142665
    },

    {
        category: 'ปี 2563',
        first: 224715,
        second: 591800,
        third: 440417,
        four: 1256932
    },

    {
        category: 'ปี 2564',
        first: 224715,
        second: 591800,
        third: 440417,
        four: 1256932
    },

    {
        category: 'ปี 2565',
        first: 202244,
        second: 532620,
        third: 396375,
        four: 1131239
    },

    {
        category: 'ปี 2566',
        first: 192131,
        second: 505989,
        third: 376557,
        four: 1074677
    },

    {
        category: 'ปี 2567',
        first: 138025,
        second: 1272002,
        third: 626425,
        four: 2036452
    },

    {
        category: 'ปี 2568',
        first: 201738,
        second: 531288,
        third: 395385,
        four: 1128411
    },

    {
        category: 'ปี 2569',
        first: 216868,
        second: 571135,
        third: 425039,
        four: 1213042
    },

    {
        category: 'ปี 2570',
        first: 238555,
        second: 628249,
        third: 467543,
        four: 1334346
    },


]
$('#cardpopcovid').hide()
$('#trendpopcovid').click(function () {
    if (this.checked) {
        $('#cardpopcovid').slideDown();
        $('#popcovidtype').prop('selectedIndex', 0);
        chart_by_prov(datall_pop_covid, 'คน', 'chartdiv6')
    } else {
        $('#cardpopcovid').slideUp();
    }
})
$('#popcovidtype').on('change', function () {
    var type = $('#popcovidtype').val()
    if (type == 'all') {
        chart_by_prov(datall_pop_covid, 'คน', 'chartdiv6')
    } else if (type == 'register') {
        chart_by_prov(datregister_pop_covid, 'คน', 'chartdiv6')
    } else {
        chart_by_prov(datdisguise_pop_covid, 'คน', 'chartdiv6')
    }
})

// let chartUW_all = () => {
//     // Themes begin
//     am4core.useTheme(am4themes_animated);
//     // Themes end

//     var chart = am4core.create("chartdiv4", am4charts.XYChart);
//     chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

//     chart.data = [
//         {
//             category: 'ปี 2560',
//             value1: 252,
//             value2: 606,
//             value3: 1562,
//             value4: 2420
//         },
//         {
//             category: 'ปี 2570',
//             value1: 309,
//             value2: 748,
//             value3: 1831,
//             value4: 2888
//         },
//         {
//             category: 'ปี 2580',
//             value1: 392,
//             value2: 865,
//             value3: 1832,
//             value4: 3089
//         }
//     ];

//     chart.colors.step = 2;
//     chart.padding(30, 30, 10, 30);
//     chart.legend = new am4charts.Legend();
//     chart.legend.position = 'top'
//     chart.legend.paddingBottom = 20
//     chart.legend.labels.template.maxWidth = 95

//     var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
//     categoryAxis.dataFields.category = "category";
//     categoryAxis.renderer.grid.template.location = 0;

//     var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
//     valueAxis.min = 0;
//     valueAxis.max = 100;
//     valueAxis.strictMinMax = true;
//     valueAxis.calculateTotals = true;
//     valueAxis.renderer.minWidth = 50;

//     // #B9F65D #77E0F8 #F6E554 #F7D271
//     var series1 = chart.series.push(new am4charts.ColumnSeries());
//     series1.columns.template.width = am4core.percent(80);
//     series1.columns.template.tooltipText =
//         "{name}: [bold]{valueY.formatNumber('###,###,###.##')} ล้าน ลบ.ม./ปี[/]";
//     series1.name = "อุปโภคบริโภค";
//     series1.dataFields.categoryX = "category";
//     series1.dataFields.valueY = "value1";
//     series1.dataFields.valueYShow = "totalPercent";
//     series1.dataItems.template.locations.categoryX = 0.5;
//     series1.stacked = true;
//     series1.tooltip.pointerOrientation = "vertical";

//     var bullet1 = series1.bullets.push(new am4charts.LabelBullet());
//     bullet1.interactionsEnabled = false;
//     bullet1.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
//     bullet1.label.fill = am4core.color("#ffffff");
//     bullet1.locationY = 0.5;

//     var series2 = chart.series.push(new am4charts.ColumnSeries());
//     series2.columns.template.width = am4core.percent(80);
//     series2.columns.template.tooltipText =
//         "{name}: [bold]{valueY.formatNumber('###,###,###.##')} ล้าน ลบ.ม./ปี[/]";
//     series2.name = "อุสตสาหกรรม";
//     series2.dataFields.categoryX = "category";
//     series2.dataFields.valueY = "value2";
//     series2.dataFields.valueYShow = "totalPercent";
//     series2.dataItems.template.locations.categoryX = 0.5;
//     series2.stacked = true;
//     series2.tooltip.pointerOrientation = "vertical";

//     var bullet2 = series2.bullets.push(new am4charts.LabelBullet());
//     bullet2.interactionsEnabled = false;
//     bullet2.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
//     bullet2.locationY = 0.5;
//     bullet2.label.fill = am4core.color("#ffffff");

//     var series3 = chart.series.push(new am4charts.ColumnSeries());
//     series3.columns.template.width = am4core.percent(80);
//     series3.columns.template.tooltipText =
//         "{name}: [bold]{valueY.formatNumber('###,###,###.##')} ล้าน ลบ.ม./ปี[/]";
//     series3.name = "เกษตรกรรม";
//     series3.dataFields.categoryX = "category";
//     series3.dataFields.valueY = "value3";
//     series3.dataFields.valueYShow = "totalPercent";
//     series3.dataItems.template.locations.categoryX = 0.5;
//     series3.stacked = true;
//     series3.tooltip.pointerOrientation = "vertical";

//     var bullet3 = series3.bullets.push(new am4charts.LabelBullet());
//     bullet3.interactionsEnabled = false;
//     bullet3.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
//     bullet3.locationY = 0.5;
//     bullet3.label.fill = am4core.color("#ffffff");

//     // chart.scrollbarX = new am4core.Scrollbar();

// }

let chartUW_all = () => {
    // $("#chartdiv4").removeAttr("style").css({ "width": "1200px", "height": "520px" })
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdiv4", am4charts.XYChart);

    // Add data
    chart.data = [
        {
            category: 'ปี 2560',
            value1: 252,
            value2: 606,
            value3: 1562,
            value4: 2420
        },
        {
            category: 'ปี 2570',
            value1: 309,
            value2: 748,
            value3: 1831,
            value4: 2888
        },
        {
            category: 'ปี 2580',
            value1: 392,
            value2: 865,
            value3: 1832,
            value4: 3089
        }
    ]
    chart.legend = new am4charts.Legend();
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95
    // Create axes
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.numberFormatter.numberFormat = "#";
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    // valueAxis.renderer.opposite = true;
    // valueAxis.numberFormatter.numberFormat = "#.0as' " + "ล้าน ลบ.ม./ปี" + "'";
    // valueAxis.min = 10000000;
    // valueAxis.max = 3300;

    // Create series
    function createSeries(field, name, color1, color2) {
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueX = field;
        series.dataFields.categoryY = "category";
        series.stacked = true;
        series.name = name;
        series.columns.template.tooltipText = `{categoryY} : [bold]{valueX.formatNumber('###,###,###.##')} ล้าน ลบ.ม./ปี[/]`;
        series.columns.template.height = am4core.percent(100);
        series.sequencedInterpolation = true;
        series.stroke = am4core.color(color2);
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color(color2);
        series.columns.template.stroke = am4core.color(color1);
        series.columns.template.fill = am4core.color(color1);
        // series.columns.template.column.cornerRadiusTopRight = 10;
        // series.columns.template.column.cornerRadiusTopLeft = 10;
        series.calculatePercent = true;

        var labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.locationX = 0.5;
        labelBullet.label.text = "{valueX.percent.formatNumber('###.##')}%";
        labelBullet.label.fill = am4core.color("#fff");

        // var valueLabel = series.bullets.push(new am4charts.LabelBullet());
        // valueLabel.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
        // valueLabel.label.horizontalCenter = "left";
        // valueLabel.label.dx = 10;
        // valueLabel.label.hideOversized = false;
        // valueLabel.label.truncate = false;

        // var categoryLabel = series.bullets.push(new am4charts.LabelBullet());
        // categoryLabel.label.text = "{name}";
        // categoryLabel.label.horizontalCenter = "right";
        // categoryLabel.label.dx = -10;
        // categoryLabel.label.fill = am4core.color("#fff");
        // categoryLabel.label.hideOversized = false;
        // categoryLabel.label.truncate = false;
    }

    createSeries("value1", "อุปโภคบริโภค", "#85D5E8", "#3DB2FF");
    createSeries("value2", "อุตสาหกรรม", "#DEAD54", "#D69929");
    createSeries("value3", "เกษตรกรรม", "#54DEAD", "#29D699");
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