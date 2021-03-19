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
        console.log(r.data.data[0]);
        geneChart([{ "cat": "ค่าดีโอ", "val": r.data.data[0].sq_do }], "sq_do", "ค่าดีโอ", "mg/L");
        geneChart([{ "cat": "ปริมาณแบคทีเรียกลุ่มโคลิฟอร์มทั้งหมด", "val": r.data.data[0].sq_tcb }], "sq_tcb", "ปริมาณแบคทีเรียกลุ่มโคลิฟอร์มทั้งหมด", "MPN/100ml");
        geneChart([{ "cat": "ฟอสเฟต-ฟอสฟอรัส", "val": r.data.data[0].sq_po43p }], "sq_po43p", "ฟอสเฟต-ฟอสฟอรัส", "μg-P/l");
        geneChart([{ "cat": "ไนเตรท-ไนโตรเจน", "val": r.data.data[0].sq_no3n }], "sq_no3n", "ไนเตรท-ไนโตรเจน", "μg-N/l");
        geneChart([{ "cat": "อุณหภูมิ", "val": r.data.data[0].sq_temp }], "sq_temp", "อุณหภูมิ", "ºC");
        geneChart([{ "cat": "สารแขวนลอย", "val": r.data.data[0].sq_ss }], "sq_ss", "สารแขวนลอย", "");
        geneChart([{ "cat": "ค่าความเป็นกรด ด่าง", "val": r.data.data[0].sq_ph }], "sq_ph", "ค่าความเป็นกรด ด่าง", "pH");
        geneChart([{ "cat": "ปริมาณแอมโมเนีย", "val": r.data.data[0].sq_nh3 }], "sq_nh3", "ปริมาณแอมโมเนีย", "μg-N/l");
        geneChart([{ "cat": "ค่ามาตรฐานคุณภาพน้ำทะเล", "val": r.data.data[0].sq_mwqi }], "sq_mwqi", "ค่ามาตรฐานคุณภาพน้ำทะเล", "");
        geneChart([{ "cat": "ปริมาณสารตะกั่ว", "val": r.data.data[0].sq_pb }], "sq_pb", "ปริมาณสารตะกั่ว", "μg/l");

    })
}

let loadTable = () => {
    let table = $('#myTable').DataTable({
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
                render: (data, type, row) => {
                    return `${row.sq_id} <span class="badge bg-info text-white">aa</span>`
                }
            },
            { data: 'sta_loc' },
            // { data: 'prov' },
            { data: 'date' },
            // { data: 'proc_stat' },
            // { data: 'opert_stat' },
            {
                data: null,
                render: function (data, type, row, meta) {
                    // console.log(data);
                    return `
                       <button class="btn btn-margin btn-outline-danger" onclick="confirmDelete(${row.sq_id},'${row.sta_loc}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>
                       <button class="btn btn-margin btn-outline-success" onclick="getChart(${row.sq_id})"><i class="bi bi-bar-chart-fill"></i>&nbsp;ดูค่าที่ตรวจวัด</button>`
                }
            }
        ],
        searching: true,
    });

    // table.on('search.dt', function () {
    //     let data = table.rows({ search: 'applied' }).data()
    //     getProc_stat(data)
    //     getOpert_stat(data);
    //     getPrj_cate(data);
    //     getBudget(data);
    //     getMap(data)
    // });
}

let geneChart = (arr, div, tt, unit) => {
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create(div, am4charts.XYChart);

    // Add data
    chart.data = arr

    var title = chart.titles.create();
    title.text = tt;
    title.fontSize = 18;
    title.marginBottom = 5;

    // Create axes
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












