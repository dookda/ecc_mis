let uid = sessionStorage.getItem('key');
let typ = sessionStorage.getItem('typ');
let org = sessionStorage.getItem('org');

let logout = () => {
    sessionStorage.clear();
    location.href = "./../login/index.html";
}
// console.log(uid, org);
uid && org ? null : logout();
$("#aut").html(`${org}`)

if (typ == "admin") {
    $("#isadmin").show()
    $("#isadmin2").show()
} else {
    $("#isadmin").hide()
    $("#isadmin2").hide()
}
// const url = "https://eec-onep.online:3700";
const url = "http://localhost:3700";
// const url = 

let drawnItems = new L.FeatureGroup();

let loadTable = () => {
    axios.post(url + '/projmon-api/getdata', { org: org, typ: typ }).then(r => {
        let dat = r.data.data
        getProc_stat(dat, "chart1");
        getOpert_stat(dat, "chart2");
        getPrj_cate(dat, "chart3");
        getBudget(dat, "chart5");
    });
}

let loadTable2 = () => {
    axios.post(url + '/projmon2-api/getallproj', { org: org, typ: typ }).then(r => {
        let dat = r.data.data
        getProc_stat(dat, "chart21");
        getOpert_stat(dat, "chart22");
        getPrj_cate(dat, "chart23");
        getBudget(dat, "chart25");
    });
}

loadTable();
loadTable2();

let getPrj_cate = async (x, div) => {
    let a = "Flagship"
    let b = "ยุทธศาสตร์ที่ 1"
    let c = "ยุทธศาสตร์ที่ 2"
    let d = "ยุทธศาสตร์ที่ 3"
    let e = "ยุทธศาสตร์ที่ 4"
    let av = 0, bv = 0, cv = 0, dv = 0, ev = 0;

    await x.map(i => {
        // console.log(i);
        if (i.prj_cate == a) {
            av++
        } else if (i.prj_cate == b) {
            bv++
        } else if (i.prj_cate == c) {
            cv++
        } else if (i.prj_cate == d) {
            dv++
        } else if (i.prj_cate == e) {
            ev++
        }
    })
    let dat = [{
        cat: a,
        val: av
    }, {
        cat: b,
        val: bv
    }, {
        cat: c,
        val: cv
    }, {
        cat: d,
        val: dv
    }, {
        cat: e,
        val: ev
    }]
    barChart(dat, div, "จำนวนโครงการ")
}

let getBudget = async (x, div) => {
    let a = "งบประมาณประจำปี 2561";
    let b = "งบประมาณประจำปี 2562";
    let c = "งบประมาณประจำปี 2563";
    let d = "งบประมาณประจำปี 2564";
    let e = "งบประมาณประจำปี 2565";
    let av = 0, bv = 0, cv = 0, dv = 0, ev = 0;

    await x.map(i => {

        if (i.budg_61) {
            av += Number(i.budg_61)
        } else if (i.budg_62) {
            bv += Number(i.budg_62)
        } else if (i.budg_63) {
            cv += Number(i.budg_63)
        } else if (i.budg_64) {
            dv += Number(i.budg_64)
        } else if (i.budg_65) {
            ev += Number(i.budg_65)
        }
    })
    let dat = [{
        cat: a,
        val: av
    }, {
        cat: b,
        val: bv
    }, {
        cat: c,
        val: cv
    }, {
        cat: d,
        val: dv
    }, {
        cat: e,
        val: ev
    }]
    // console.log(dat);
    barChart(dat, div, "ล้านบาท")
}

let getProc_stat = async (x, div) => {
    let a = "ได้รับงบประมาณแล้ว";
    let b = "ไม่ได้รับงบประมาณ";
    let c = "ยังไม่ยื่นของบประมาณ";
    let av = 0, bv = 0, cv = 0;

    await x.map(i => {
        // console.log(i);
        if (i.proc_stat == a) {
            av++
        } else if (i.proc_stat == b) {
            bv++
        } else if (i.proc_stat == c) {
            cv++
        }
    })
    let dat = [{
        cat: a,
        val: av
    }, {
        cat: b,
        val: bv
    }, {
        cat: c,
        val: cv
    }]
    barChart(dat, div, "จำนวนโครงการ")
}

let getOpert_stat = async (x, div) => {
    let a = "อยู่ระหว่างการศึกษาความเหมาะสมและออกแบบรายละเอียด"
    let b = "อยู่ระหว่างตั้งของบประมาณ"
    let c = "อยู่ระหว่างดำเนินการ/ก่อสร้าง"
    let d = "ยังไม่ได้ดำเนินการ"
    let e = "ดำเนินการเรียบร้อยแล้ว"
    let av = 0, bv = 0, cv = 0, dv = 0, ev = 0;

    await x.map((i, k) => {
        // console.log(i);
        if (i.opert_stat == a) {
            av++
        } else if (i.opert_stat == b) {
            bv++
        } else if (i.opert_stat == c) {
            cv++
        } else if (i.opert_stat == d) {
            dv++
        } else if (i.opert_stat == e) {
            ev++
        }
        $("#projtotal").text(k + 1)
    })
    let dat = [{
        cat: "อยู่ระหว่างการศึกษาความเหมาะสมฯ",
        val: av
    }, {
        cat: b,
        val: bv
    }, {
        cat: c,
        val: cv
    }, {
        cat: d,
        val: dv
    }, {
        cat: e,
        val: ev
    }]
    // barChart(dat, "chart4", "จำนวนโครงการ");
    ratioChart(dat, div, "จำนวนโครงการ");
}

let ratioChart = (dat, div, label) => {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create(div, am4charts.PieChart);

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "val";
    pieSeries.dataFields.category = "cat";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template.cursorOverStyle = [
        {
            "property": "cursor",
            "value": "pointer"
        }
    ];

    pieSeries.alignLabels = false;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
    shadow.opacity = 0;

    // Create hover state
    var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // Add a legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
    chart.legend.fontSize = "12px";
    // chart.legend.valueLabels.template.align = "left"
    // chart.legend.valueLabels.template.textAlign = "start"

    chart.data = dat;
}

let barChart = (datarr, chartdiv, unit) => {
    am4core.useTheme(am4themes_animated);
    // Themes end
    var chart = am4core.create(chartdiv, am4charts.XYChart);
    chart.padding(40, 40, 40, 40);
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "cat";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.title.text = unit;

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "cat";
    series.dataFields.valueX = "val";
    series.tooltipText = "{valueX.value}"
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;

    var labelBullet = series.bullets.push(new am4charts.LabelBullet())
    labelBullet.label.horizontalCenter = "left";
    labelBullet.label.dx = 10;
    labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
    labelBullet.locationX = 1;

    series.columns.template.adapter.add("fill", function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
    });

    // categoryAxis.sortBySeries = series;
    chart.data = datarr
}








