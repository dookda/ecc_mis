$(document).ready(() => {
    loadTable()

});

const url = "https://eec-onep.online:3700";
// const url = 'http://localhost:3700';

let refreshPage = () => {
    location.href = "./../report/index.html";
    // console.log("ok");
}

let confirmDelete = (ws_id, ws_station) => {
    $("#projId").val(ws_id)
    $("#projName").text(ws_station)
    $("#deleteModal").modal("show")
}

let closeModal = () => {
    $('#editModal').modal('hide')
    $('#deleteModal').modal('hide')
    $('#myTable').DataTable().ajax.reload();
}

let deleteValue = () => {
    // console.log($("#projId").val());
    let ws_id = $("#projId").val()
    axios.post(url + "/ws-api/delete", { ws_id: ws_id }).then(r => {
        r.data.data == "success" ? closeModal() : null
    })
}


$("#charttitle").hide();
$("#spinner").hide();
let getChart = (ws_id) => {
    $("#spinner").show();
    $("#chartd").empty()
    let obj = {
        ws_id: ws_id
    }
    axios.post(url + "/ws-api/getone", obj).then((r) => {
        console.log(r);
        $("#staname").text(r.data.data[0].ws_station)
        $("#charttitle").show()
        for (const [key, value] of Object.entries(r.data.data[0])) {
            if (v[key] && value) {
                $("#chartd").append(
                    `<div class="col-sm-4">
                        <div class="card p-1">
                            <div class="card-body" id="${key}"></div>
                        </div>
                    </div>`
                )
                geneChart([{ "cat": v[key][0], "val": value }], key, v[key][0], v[key][1]);
            }
        }
    })
}

let loadTable = () => {
    let table = $('#myTable').DataTable({
        scrollX: true,
        ajax: {
            type: "POST",
            url: url + '/fm-api/getdata',
            data: { userid: "sakda" },
            dataSrc: 'data'
        },
        columns: [
            {
                data: '',
                render: (data, type, row) => {
                    return `${row.fm_id}`
                }
            },
            { data: 'sex' },
            { data: 'age' },
            { data: 'edu' },
            { data: 'occu' },
            { data: 'member' },
            { data: 'income' },
            { data: 'outcome' },
            { data: 'ricesource' },
            { data: 's_rice1' },
            { data: 's_rice2' },
            { data: 's_rice3' },
            { data: 'prod1' },
            { data: 'prod2' },
            { data: 's_store' },
            { data: 'b_rice1' },
            { data: 'b_rice2' },
            { data: 'b_rice3' },
            { data: 'b_vol' },
            { data: 'b_store' }
            // {
            //     data: null,
            //     render: function (data, type, row, meta) {
            //         return `
            //            <button class="btn btn-margin btn-outline-danger" onclick="confirmDelete(${row.ws_id},'${row.ws_station}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>
            //            <button class="btn btn-margin btn-outline-success" onclick="getChart(${row.ws_id})"><i class="bi bi-bar-chart-fill"></i>&nbsp;ดูค่าที่ตรวจวัด</button>`
            //     }
            // }
        ],
        // "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
        dom: 'Bfrtip',
        buttons: [
            'excel', 'print'
        ],
        searching: true
    });

    table.buttons().container()
        .appendTo('#myTable_wrapper .col-sm-6:eq(0)');
}

let geneChart = (arr, div, tt, unit) => {
    $("#spinner").hide();
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create(div, am4charts.XYChart);
    chart.data = arr

    var title = chart.titles.create();
    title.text = tt;
    title.fontSize = 14;
    title.marginBottom = 5;

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "cat";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.fontSize = 14;

    var axis = chart.yAxes.push(new am4charts.ValueAxis());
    axis.paddingLeft = 5;
    axis.paddingRight = 5;
    // axis.layout = "absolute";

    axis.title.text = unit;
    axis.title.rotation = 270;
    axis.title.align = "center";
    axis.title.valign = "top";
    axis.title.dy = 12;
    axis.title.fontSize = 14;

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












