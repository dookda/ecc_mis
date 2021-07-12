let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
$("#usrname").text(urname);
urid ? null : location.href = "./../../form_register/login/index.html";

if (eecauth !== "admin" && eecauth !== "user") {
    location.href = "./../../form_register/login/index.html";
}

$(document).ready(() => {
    loadMap();
});

let latlng = {
    lat: 16.820378,
    lng: 100.265787
}
let map = L.map('map', {
    center: latlng,
    zoom: 13
});

let marker, gps, dataurl;

// const url = 'http://localhost:3700';
const url = "https://eec-onep.online:3700";

function loadMap() {
    var mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/light-v9',
        tileSize: 512,
        zoomOffset: -1
    });

    const ghyb = L.tileLayer('https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    var pro = L.tileLayer.wms("http://rti2dss.com:8080/geoserver/th/wms?", {
        layers: 'th:province_4326',
        format: 'image/png',
        transparent: true
    });
    var baseMap = {
        "Mapbox": mapbox.addTo(map),
        "google Hybrid": ghyb
    }
    var overlayMap = {
        "ขอบเขตจังหวัด": pro
    }
    L.control.layers(baseMap, overlayMap).addTo(map);
}

let fc = L.featureGroup().addTo(map);

let datArr = [];

var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear() + "-" + (month) + "-" + (day);

axios.post(url + "/ff-api/getparcelall", { usrid: urid }).then(r => {
    r.data.data.map(i => {
        if (i.geom) {
            let dat = {
                "type": "Feature",
                "geometry": JSON.parse(i.geom),
                "properties": {
                    "name": i.ffid
                }
            }

            let json = L.geoJSON(dat);
            json.addTo(fc);
            // $("#listItem").append(`<a class="list-group-item list-group-item-action" onclick="getParcel(${i.ffid})">${i.ffid}</a>`);
        }
        // console.log(i);
    })
    map.fitBounds(fc.getBounds());
    // console.log(fc);
});

fc.on("click", (e) => {
    console.log(e.layer.toGeoJSON());
});

let getData = async (data) => {
    let eat = 0;
    let use = 0;
    let herb = 0;
    let econ = 0;
    await data.map(i => {
        console.log(i);
        eat += Number(i.eat);
        use += Number(i.use);
        econ += Number(i.econ);
        herb += Number(i.herb);
        // i.ftype == "พืชกินได้" ? eat += Number(i.eat) : null;
        // i.ftype == "พืชใช้สอย" ? use += Number(i.use) : null;
        // i.ftype == "พืชเศรษฐกิจ" ? econ += Number(i.econ) : null;
        // i.ftype == "พืชสมุนไพร" ? herb += Number(i.herb) : null;
    });

    let dataArr = [
        {
            cat: "พืชกินได้",
            val: eat
        }, {
            cat: "พืชใช้สอย",
            val: use
        }, {
            cat: "พืชเศรษฐกิจ",
            val: herb
        }, {
            cat: "พืชสมุนไพร",
            val: econ
        }
    ];
    console.log(dataArr);
    showChart(dataArr);
}

let showChart = (dataArr) => {
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("chartType", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = dataArr;

    var series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "val";
    series.dataFields.radiusValue = "val";
    series.dataFields.category = "cat";
    series.slices.template.cornerRadius = 6;
    series.colors.step = 3;

    series.hiddenState.properties.endAngle = -90;
    chart.legend = new am4charts.Legend();
}

let table = $('#myTable').DataTable({
    ajax: {
        type: "POST",
        url: url + '/ff-api/getalldaily',
        data: { usrid: urid },
        dataSrc: 'data'
    },
    columns: [
        {
            data: '',
            render: (data, type, row, meta) => {
                return `${meta.row + 1}`
            }
        },
        { data: 'fplant' },
        // { data: 'ftype' },
        { data: 'date' },
        {
            data: '',
            render: (data, type, row, meta) => {
                return `${row.eat} ${row.eat_unit} `
            }
        }, {
            data: '',
            render: (data, type, row, meta) => {
                return `${row.herb} ${row.herb_unit}`
            }
        }, {
            data: '',
            render: (data, type, row, meta) => {
                return `${row.use} ${row.use_unit}`
            }
        }, {
            data: '',
            render: (data, type, row, meta) => {
                return `${row.econ}  ${row.econ_unit}`
            }
        }, {
            data: null,
            render: function (data, type, row, meta) {
                return `<button type="button" class="btn btn-margin btn-danger" onclick="confirmDelete(${row.gid},'${row.fplant}', '${row.date}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>`
            },
            // width: "15%"
        }
    ],
    searching: true,
    scrollX: true,
    dom: 'Bfrtip',
    buttons: [
        'excel', 'print'
    ],
    // order: [2, 'asc'],
});

table.on('search.dt', function () {
    let data = table.rows({ search: 'applied' }).data();
    getData(data);
});

let confirmDelete = (prj_id, prj_name, tbType) => {
    $("#projId").val(prj_id);
    $("#projName").text(prj_name);
    $("#tbType").val(tbType);
    $("#deleteModal").modal("show");
}

let closeModal = () => {
    $('#editModal').modal('hide');
    $('#deleteModal').modal('hide');
    $('#myTable').DataTable().ajax.reload();
}

let confirmAdd = () => {
    $('#okModal').modal('hide');
    $('#myTable').DataTable().ajax.reload();
}

let deleteValue = () => {
    // console.log($("#projId").val());
    let gid = $("#projId").val()
    axios.post(url + "/ff-api/delete", { gid: gid }).then(r => {
        if (r.data.data == "success") {
            $('#deleteModal').modal('hide')
            $('#myTable').DataTable().ajax.reload();
        }
    })
}

