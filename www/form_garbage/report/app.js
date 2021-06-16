$(document).ready(() => {
    loadTable()

});

const url = "https://eec-onep.online:3700";
// const url = 'http://localhost:3700';

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
        console.log(r.data.data[0]);
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

let loadTable = () => {
    let table = $('#myTable').DataTable({
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
            {
                data: null,
                render: function (data, type, row, meta) {
                    // console.log(data);
                    return `
                       <button class="btn btn-margin btn-outline-danger" onclick="confirmDelete(${row.gb_id},'${row.dla}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>
                       <button class="btn btn-margin btn-outline-success" onclick="getChart(${row.gb_id})"><i class="bi bi-bar-chart-fill"></i>&nbsp;ดูค่าที่ตรวจวัด</button>`
                }
            }
        ],
        searching: true,
    });
    getChart(1897)
}


let getProv = (prov) => {
    axios.post(url + "/gb-api/getsummarize", { prov: prov }).then(async (r) => {
        // console.log(r);
        let datArr = [];
        await r.data.data.map(i => {
            datArr.push({
                date: i.year,
                // value1: i.populace,
                value2: i.amt_was,
                value3: i.amt_coll,
                value4: i.amt_benf
            });
        });
        compareChart("summarize", datArr, "ปริมาณขยะ", "(ตัน/วัน)");
    })
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
    // var series = chart.series.push(new am4charts.LineSeries());
    // series.dataFields.valueY = "value1";
    // series.dataFields.dateX = "date";
    // series.strokeWidth = 2;
    // series.name = "ก่อนบำบัด";
    // series.minBulletDistance = 10;
    // series.tooltipText = "{valueY}";
    // series.showOnInit = true;

    // Create series
    var series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "value2";
    series2.dataFields.dateX = "date";
    series2.strokeWidth = 2;
    series2.name = "ปริมาณขยะที่เกิดขึ้น";
    series2.minBulletDistance = 10;
    // series2.strokeDasharray = "3,4";
    series2.tooltipText = "{valueY}";
    series2.showOnInit = true;

    // Create series
    var series3 = chart.series.push(new am4charts.LineSeries());
    series3.dataFields.valueY = "value3";
    series3.dataFields.dateX = "date";
    series3.strokeWidth = 2;
    series3.name = "ปริมาณขยะที่เก็บขนไปกำจัด";
    series3.strokeDasharray = "3,4";
    series3.tooltipText = "{valueY}";
    series3.showOnInit = true;

    // Create series
    var series4 = chart.series.push(new am4charts.LineSeries());
    series4.dataFields.valueY = "value4";
    series4.dataFields.dateX = "date";
    series4.strokeWidth = 2;
    series4.name = "ปริมาณขยะที่ถูกนำไปใช้ประโยชน์ ";
    series4.strokeDasharray = "6,7";
    series4.tooltipText = "{valueY}";
    series4.showOnInit = true;

    // var bullet = series.bullets.push(new am4charts.CircleBullet());
    // bullet.circle.strokeWidth = 2;
    // bullet.circle.radius = 4;
    // bullet.circle.fill = am4core.color("#fff");
    // var bullethover = bullet.states.create("hover");
    // bullethover.properties.scale = 1.3;

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
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series2);
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    dateAxis.start = 0.40;
    dateAxis.keepSelection = true;
}

$("#prov").on("change", function () {
    getProv(this.value)
});

getProv("ชลบุรี");










