let urid = sessionStorage.getItem('id');
let urname = sessionStorage.getItem('name');
$("#usrname").text(urname);
urid ? null : location.href = "./../../form_register/login/index.html";

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

let v = {
    ws_do: ['DO', '(mg/l)'],
    ws_bod: ['BOD', '(mg/l)'],
    ws_tcb: ['Total Coliform Bacteria', '(MPN/100ml)'],
    ws_fcb: ['Fecal Coliform Bacteria', '(MPN/100ml)'],
    ws_nh3n: ['แอมโมเนีย', '(mg/l)'],
    ws_wqi: ['ค่ามาตรฐานคุณภาพน้ำ', ''],
    ws_tp: ['ฟอสฟอรัสทั้งหมด', ''],
    ws_ts: ['ของแข็งทั้งหมด', ''],
    ws_ss: ['ของแข็งแขวนลอย', ''],
    ws_temp: ['อุณหภูมิ', 'c'],
    ws_ph: ['pH', 'pH'],
    ws_no3: ['ไนเตรด', '(mg/l)'],
    ws_phenols: ['ฟีนอล', '(mg/l)'],
    ws_cu: ['ทองแดง', '(mg/l)'],
    ws_ni: ['มิคเกิล', '(mg/l)'],
    ws_mn: ['แมงกานีส', '(mg/l)'],
    ws_zn: ['สังกะสี', '(mg/l)'],
    ws_cd: ['แคดเมียม', ''],
    ws_crhex: ['โครเมียมชนิดเฮ็กซาวาเล้นท์ (Cr Hexavalent)', ''],
    ws_pb: ['ตะกั่ว (mg/l)'],
    ws_totalhg: ['ปรอททั้งหมด', '(mg/l)'],
    ws_as: ['สารหนู'],
    ws_cyanide: ['ไซยาไนด์', '(mg/l)'],
    ws_radioa: ['กัมมันตภาพรังสี (Radioactivity)', ''],
    ws_top: ['สารฆ่าศัตรูพืชและสัตว์ชนิดที่มีคลอรีนทั้งหมด', '(mg/l)'],
    ws_ddt: ['ดีดีที (µg/l)'],
    ws_alphsb: ['บีเอชซีชนิดแอลฟา (Alpha-BHC)', '(µg/l)'],
    ws_dield: ['ดิลดริน (Dieldrin)', '(µg/l)'],
    ws_aldrin: ['อัลดริน (Aldrin)', '(µg/l)'],
    ws_hepta: ['เฮปตาคอร์ และเฮปตาคลอร์อีปอกไซด์', '(µg/l)'],
    ws_endrin: ['เอนดริน (Endrin)', ''],
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
        $("#staname").text(r.data.data[0].ws_station);
        $("#date").text(r.data.data[0].date)
        $("#charttitle").show();
        for (const [key, value] of Object.entries(r.data.data[0])) {

            if (v[key] && value) {
                // console.log(key, value);
                if (Number(value) < 9999999) {
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
        }
    });
}


let loadTable = () => {
    let table = $('#myTable').DataTable({
        ajax: {
            type: "POST",
            url: url + '/ws-api/getdata',
            data: { userid: "sakda" },
            dataSrc: 'data'
        },
        columns: [
            {
                data: '',
                render: (data, type, row) => {
                    return `${row.ws_station}`
                }
            },
            { data: 'ws_location' },
            { data: 'ws_river' },
            { data: 'date' },

            { data: 'ws_do' },
            { data: 'ws_bod' },
            { data: 'ws_tcb' },
            { data: 'ws_fcb' },
            { data: 'ws_nh3n' },
            { data: 'ws_wqi' },
            { data: 'ws_tp' },
            {
                data: null,
                render: function (data, type, row, meta) {
                    // console.log(data);
                    return `
                       <button class="btn btn-margin btn-outline-danger" onclick="confirmDelete(${row.ws_id},'${row.ws_station}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>
                       <a class="btn btn-margin btn-outline-success" href="#charttitle" onclick="getChart(${row.ws_id})"><i class="bi bi-bar-chart-fill"></i>&nbsp;ดูค่าที่ตรวจวัด</a>`
                },
                // width: '30%'
            }
        ],
        searching: true,
        scrollX: true,
        dom: 'Bfrtip',
        buttons: [
            'excel', 'print'
        ],
    });

    // table.on('search.dt', function () {
    //     let data = table.rows({ search: 'applied' }).data();
    //     filterSta(data);
    // });
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


let getStation = () => {
    axios.get(url + "/ws-api/getstation").then(r => {
        // console.log(r);
        r.data.data.map(i => $("#sta").append(`<option value="${i.ws_station}">${i.ws_river} (${i.ws_station})</option>`))
    })
}
getStation();

let getSeries = (sta) => {
    let ws_wqi = [];
    let ws_bod = [];
    let ws_do = [];
    let ws_fcb = [];
    let ws_nh3n = [];
    let ws_tcb = [];
    axios.post(url + "/ws-api/getstationone", { ws_station: sta }).then(async r => {
        console.log(r);
        await r.data.data.map(i => {
            ws_wqi.push({ "date": i.ws_date, "value": Number(i.ws_wqi) });
            ws_bod.push({ "date": i.ws_date, "value": Number(i.ws_bod) });
            ws_do.push({ "date": i.ws_date, "value": Number(i.ws_do) });
            ws_fcb.push({ "date": i.ws_date, "value": Number(i.ws_fcb) });
            ws_nh3n.push({ "date": i.ws_date, "value": Number(i.ws_nh3n) });
            ws_tcb.push({ "date": i.ws_date, "value": Number(i.ws_tcb) });
        });

        lineChart("_ws_wqi", "WQI", "WQI", ws_wqi);
        lineChart("_ws_bod", "DO", "(mg/l)", ws_bod);
        lineChart("_ws_do", "BOD", "(mg/l)", ws_do);
        lineChart("_ws_fcb", "FCB", "(MPN/100ml)", ws_fcb);
        lineChart("_ws_nh3n", "แอมโมเนีย", "(mg/l)", ws_nh3n);
        lineChart("_ws_tcb", "TCB", "(MPN/100ml)", ws_tcb);
    })
}
getSeries("BK01");
$("#sta").change(function () {
    getSeries(this.value);
})

let lineChart = (div, label, unit, series) => {

    am4core.useTheme(am4themes_animated);

    // Create chart instance
    var chart = am4core.create(div, am4charts.XYChart);

    // Add data
    chart.data = series;

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = label + " " + unit;

    // Create series
    function createSeries(field, name) {
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.dateX = "date";
        series.name = name;
        series.tooltipText = "{dateX}: [b]{valueY}[/]";
        series.strokeWidth = 2;

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color("#fff");

        var bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;

        return series;
    }

    var series1 = createSeries("value", label);

    chart.legend = new am4charts.Legend();
    chart.cursor = new am4charts.XYCursor();
}

lineChart()











