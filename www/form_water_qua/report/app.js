$(document).ready(() => {
    loadTable()

});

const url = "https://eec-onep.online:3700";
// const url = 'http://localhost:3700';

let refreshPage = () => {
    window.open("./../report/index.html", "_self");
    // console.log("ok");
}

let confirmDelete = (wq_id, prj_name) => {
    $("#projId").val(wq_id)
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
    let wq_id = $("#projId").val()
    axios.post(url + "/wq-api/deletedata", { wq_id: wq_id }).then(r => {
        r.data.data == "success" ? closeModal() : null
    })
}

$("#chartdiv").hide()
function getChart(wq_id) {
    let obj = {
        wq_id: wq_id
    }
    axios.post(url + "/wq-api/getone", obj).then((r) => {
        $("#chartdiv").show()
        $("#chartModal").modal("show");
        // console.log(r.data.data[0]);
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].af_wq_bod }, { "cat": "หลังบำบัด", "val": r.data.data[0].bf_wq_bod }], "wq_bod", "ค่าบีโอดี (BOD)", "mg/L")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].af_wq_cod }, { "cat": "หลังบำบัด", "val": r.data.data[0].bf_wq_cod }], "wq_cod", "ค่าซีโอดี (COD)", "mg/L")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].af_wq_cond }, { "cat": "หลังบำบัด", "val": r.data.data[0].bf_wq_cond }], "wq_cond", "ความนำไฟฟ้า (Conductivity)", "μs/cm")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].af_wq_do }, { "cat": "หลังบำบัด", "val": r.data.data[0].bf_wq_do }], "wq_do", "ออกซิเจนละลายในน้ำ (dissolved oxygen, DO)", "mg/L")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].af_wq_fcb }, { "cat": "หลังบำบัด", "val": r.data.data[0].bf_wq_fcb }], "wq_fcb", "แบคทีเรียกลุ่มฟีคอลโคลิฟอร์ม (Fecal Coliform Bacteria, FCB)", "MPN /100 ml")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].af_wq_og }, { "cat": "หลังบำบัด", "val": r.data.data[0].bf_wq_og }], "wq_og", "น้ำมันและไขมัน (Oil&Grease)", "mg/L")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].af_wq_ph }, { "cat": "หลังบำบัด", "val": r.data.data[0].bf_wq_ph }], "wq_ph", "ความเป็นกรด-ด่าง (pH)", "pH")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].af_wq_sal }, { "cat": "หลังบำบัด", "val": r.data.data[0].bf_wq_sal }], "wq_sal", "ความเค็ม (Salinity)", "PPT")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].af_wq_ses }, { "cat": "หลังบำบัด", "val": r.data.data[0].bf_wq_ses }], "wq_ses", "ค่าตะกอนหนัก (Settleable Solids: SeS)", "mg/L")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].af_wq_ss }, { "cat": "หลังบำบัด", "val": r.data.data[0].bf_wq_ss }], "wq_ss", "ของแข็งแขวนลอย (Suspended Solids: SS)", "mg/L")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].af_wq_tcb }, { "cat": "หลังบำบัด", "val": r.data.data[0].bf_wq_tcb }], "wq_tcb", "โคลิฟอร์มแบคทีเรียทั้งหมด (Total Coliform Bacteria, TCB)", "MPN /100 ml")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].af_wq_tds }, { "cat": "หลังบำบัด", "val": r.data.data[0].bf_wq_tds }], "wq_tds", "ของแข็งละลายน้ำ (Total Dissolved Solids, TDS)", "mg/L")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].af_wq_temp }, { "cat": "หลังบำบัด", "val": r.data.data[0].bf_wq_temp }], "wq_temp", "Temperature ", "Celsius")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].af_wq_tkn }, { "cat": "หลังบำบัด", "val": r.data.data[0].bf_wq_tkn }], "wq_tkn", "ไนโตรเจนในรูปทีเคเอ็น (TKN)", "mg/L")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].af_wq_tn }, { "cat": "หลังบำบัด", "val": r.data.data[0].bf_wq_tn }], "wq_tn", "ไนโตรเจนทั้งหมด (TN)", "mg–N/l")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].af_wq_tp }, { "cat": "หลังบำบัด", "val": r.data.data[0].bf_wq_tp }], "wq_tp", "ฟอสฟอรัสทั้งหมด (TP)", "mg–P/l")
        geneChart([{ "cat": "ก่อนบำบัด", "val": r.data.data[0].af_wq_turb }, { "cat": "หลังบำบัด", "val": r.data.data[0].bf_wq_turb }], "wq_turb", "ความขุ่น (Turbidity)", "NTU")
    })
}

let loadTable = () => {
    let table = $('#myTable').DataTable({
        ajax: {
            type: "POST",
            url: url + '/wq-api/getdata',
            data: { userid: "sakda" },
            dataSrc: 'data'
        },
        columns: [
            // { data: 'prj_name' },
            {
                data: '',
                render: (data, type, row) => {
                    return ` <span class="badge bg-info text-white">${row.id}</span>`
                }
            },
            // { data: 'report_n' },
            { data: 'prov' },
            { data: 'date' },
            // { data: 'proc_stat' },
            // { data: 'opert_stat' },
            {
                data: null,
                render: function (data, type, row, meta) {
                    // console.log(data);
                    return `
                       <a class="btn btn-margin btn-outline-info" href="./../edit_bf/index.html?id=${row.wq_id}"><i class="bi bi-gear-fill"></i>&nbsp;ก่อนบำบัด</a>
                       <a class="btn btn-margin btn-outline-info" href="./../edit_af/index.html?id=${row.wq_id}"><i class="bi bi-gear-fill"></i>&nbsp;หลังบำบัด</a>
                       <button class="btn btn-margin btn-outline-danger" onclick="confirmDelete(${row.wq_id},'${row.report_n}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>
                       <button class="btn btn-margin btn-outline-success" onclick="getChart(${row.wq_id})"><i class="bi bi-bar-chart-fill"></i>&nbsp;ดูค่าที่ตรวจวัด</button>`
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
    axis.title.dy = 20;

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












