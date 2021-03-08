const url = "http://localhost:3700";
// const url = 'https://rti2dss.com:3200';

$(document).ready(function () {
    let table = $('#myTable').DataTable({
        ajax: {
            type: "POST",
            url: url + '/projmon-api/getdata',
            data: { userid: "sakda" },
            dataSrc: 'data'
        },
        columns: [
            { data: 'proj_name' },
            { data: 'budget' },
            { data: 'loan' },
            { data: 'year' },
            { data: 'proj_type' },
            { data: 'location' },
            {
                data: null, render: function (data, type, row, meta) {
                    // console.log(meta);
                    $("#total").text(meta.row)
                    return `<a type="button" class="btn btn-success" href="./../report/index.html?id=${row.proj_id}">รายงาน</a>
                            <button type="button" class="btn btn-info" onclick="getValue(${row.proj_id})">แก้ไข</button>
                            <button type="button" class="btn btn-danger" onclick="confirmDelete(${row.proj_id},'${row.proj_name}')">ลบ</button>`
                }
            }
        ],
    });
})

let latlng = {
    lat: 13.305567,
    lng: 101.383101
};

let map = L.map('map', {
    center: latlng,
    zoom: 9
});

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
    "ขอบจังหวัด": pro
}
L.control.layers(baseMap, overlayMap).addTo(map);

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

map.pm.addControls({
    position: 'topleft',
    drawCircle: false,
    drawMarker: false,
    drawPolygon: false,
    drawPolyline: false,
    drawRectangle: false,
    drawCircleMarker: false,
    cutPolygon: false,
    removalMode: false,
    edit: {
        featureGroup: drawnItems
    }
});

let geom = '-';
// map.on('pm:create', e => {
//     geom = e.layer.toGeoJSON();
//     console.log(e);
// });

drawnItems.on('pm:edit', e => {
    geom = e.layer.toGeoJSON();
    console.log(e);
});
let chk;
let getValue = (id) => {
    console.log(id);

    $("#editModal").modal("show")
    $('#editModal').on('shown.bs.modal', function () {
        map.invalidateSize();
    });

    map.eachLayer((lyr) => {
        if (lyr.options.name == 'geojson') {
            map.removeLayer(lyr);
        }
    });

    var style = {
        "color": "#ff7800",
        "weight": 2,
        "opacity": 0.65
    };
    $("#espect1").val("")
    $("#espect2").val("")
    axios.post(url + "/projmon-api/getone", { userid: "da", proj_id: id }).then((r) => {
        // console.log(r);
        $('#proj_id').val(r.data.data[0].proj_id)
        $('#proj_name').val(r.data.data[0].proj_name)
        $('#budget').val(r.data.data[0].budget)
        $('#loan').val(r.data.data[0].loan)
        $('#year').val(r.data.data[0].year)
        r.data.data[0].proj_type == "โครงการใหม่" ? $("#proj_type1").prop("checked", true) : $("#proj_type2").prop("checked", true);
        $('#location').val(r.data.data[0].location)
        $('#area').val(r.data.data[0].area)
        if (r.data.data[0].status === "อยู่ระหว่างดำเนินการก่อสร้าง") {
            $("#status1").prop("checked", true)
            $("#espect1").show()
            $("#espect2").hide()
            $("#feas_loan").hide()
            $('#espect1').val(r.data.data[0].espect)
            chk = 1
        }
        if (r.data.data[0].status === "อยู่ระหว่างการจัดซื้อจัดจ้าง") {
            $("#status2").prop("checked", true)
            $("#espect1").hide()
            $("#espect2").show()
            $("#feas_loan").hide()
            $('#espect2').val(r.data.data[0].espect)
            chk = 2
        }
        if (r.data.data[0].status === "อยู่ระหว่างการศึกษาความเหมาะสมและออกแบบรายละเอียด") {
            $("#status3").prop("checked", true)
            $("#espect1").hide()
            $("#espect2").hide()
            $("#feas_loan").hide()
        }
        if (r.data.data[0].status === "อยู่ระหว่างขอตั้งงบประมาณ") {
            $("#status4").prop("checked", true)
            $("#espect1").hide()
            $("#espect2").hide()
            $("#feas_loan").show()
        }
        // r.data.data[0].status === "อยู่ระหว่างดำเนินการก่อสร้าง" ? $("#status1").prop("checked", true) : $("#status2").prop("checked", true);
        $('#espect').val(r.data.data[0].espect)
        // r.data.data[0].feas === "อยู่ระหว่างการศึกษาความเหมาะสมและออกแบบรายละเอียด" ? $("#feas1").prop("checked", true) : $("#feas2").prop("checked", true);
        $('#feas_loan').val(r.data.data[0].feas_loan)
        $('#other').val(r.data.data[0].other)
        $('#proj_obj').val(r.data.data[0].proj_obj)
        $('#proj_mthod').val(r.data.data[0].proj_mthod)
        $('#proj_tech').val(r.data.data[0].proj_tech)
        $('#proj_area').val(r.data.data[0].proj_area)
        $('#output').val(r.data.data[0].output)
        $('#problem').val(r.data.data[0].problem)
        $('#quesion').val(r.data.data[0].quesion)
        $('#name').val(r.data.data[0].name)
        $('#pos').val(r.data.data[0].pos)
        $('#tele').val(r.data.data[0].tele)
        $('#fax').val(r.data.data[0].fax)
        $('#mob').val(r.data.data[0].mob)
        $('#mail').val(r.data.data[0].mail)

        if (r.data.data[0].geojson) {
            let geojson = L.geoJSON(JSON.parse(r.data.data[0].geojson), {
                style: style,
                name: "geojson",
                onEachFeature: function (feature, layer) {
                    drawnItems.addLayer(layer);
                }
            })
            geojson.addTo(map);
            map.setView(geojson.getBounds().getCenter())
        }
    })
}

let closeModal = () => {
    $('#editModal').modal('hide')
    $('#deleteModal').modal('hide')
    $('#myTable').DataTable().ajax.reload();
}

let confirmDelete = (proj_id, proj_name) => {
    $("#projId").val(proj_id)
    $("#projName").text(proj_name)
    $("#deleteModal").modal("show")
}

let deleteValue = () => {
    // console.log($("#projId").val());
    let proj_id = $("#projId").val()
    axios.post(url + "/projmon-api/deletedata", { proj_id: proj_id }).then(r => {
        r.data.data == "success" ? closeModal() : null
    })
}



$('input[name="status"]').change(r => {
    if ($('input[name="status"]:checked').val() == 'อยู่ระหว่างดำเนินการก่อสร้าง') {
        $("#espect1").show()
        $("#espect2").hide()
        $("#feas_loan").hide()
        chk = 1
    }
    if ($('input[name="status"]:checked').val() == 'อยู่ระหว่างการจัดซื้อจัดจ้าง') {
        $("#espect1").hide()
        $("#espect2").show()
        $("#feas_loan").hide()
        chk = 2
    }
    if ($('input[name="status"]:checked').val() == 'อยู่ระหว่างการศึกษาความเหมาะสมและออกแบบรายละเอียด') {
        $("#espect1").hide()
        $("#espect2").hide()
        $("#feas_loan").hide()
    }
    if ($('input[name="status"]:checked').val() == 'อยู่ระหว่างขอตั้งงบประมาณ') {
        $("#espect1").hide()
        $("#espect2").hide()
        $("#feas_loan").show()
    }
})

let espect = '-';
$('#fieldForm').submit(function (e) {
    e.preventDefault();
    chk == 1 ? espect = $('#espect1').val() : null;
    chk == 2 ? espect = $('#espect2').val() : null;
    const obj = {
        proj_id: $('#proj_id').val(),
        proj_name: $('#proj_name').val(),
        budget: $('#budget').val() ? $('#budget').val() : 0,
        loan: $('#loan').val() ? $('#loan').val() : '-',
        year: $('#year').val() ? $('#year').val() : 0,
        proj_type: $('input[name="proj_type"]:checked').val(),
        location: $('#location').val() ? $('#location').val() : '-',
        area: $('#area').val() ? $('#area').val() : 0,
        status: $('input[name="status"]:checked').val() ? $('input[name="status"]:checked').val() : '-',
        espect: espect,
        feas_loan: $('#feas_loan').val() ? $('#feas_loan').val() : '-',
        other: $('#other').val() ? $('#other').val() : '-',
        proj_obj: $('#proj_obj').val() ? $('#proj_obj').val() : '-',
        proj_mthod: $('#proj_mthod').val() ? $('#proj_mthod').val() : '-',
        proj_tech: $('#proj_tech').val() ? $('#proj_tech').val() : '-',
        proj_area: $('#proj_area').val() ? $('#proj_area').val() : '-',
        output: $('#output').val() ? $('#output').val() : '-',
        problem: $('#problem').val() ? $('#problem').val() : '-',
        quesion: $('#quesion').val() ? $('#quesion').val() : '-',
        name: $('#name').val() ? $('#name').val() : '-',
        pos: $('#pos').val() ? $('#pos').val() : '-',
        tele: $('#tele').val() ? $('#tele').val() : '-',
        fax: $('#fax').val() ? $('#fax').val() : '-',
        mob: $('#mob').val() ? $('#mob').val() : '-',
        mail: $('#mail').val() ? $('#mail').val() : '-',
        geom: geom
    }
    // console.log(obj);
    axios.post(url + "/projmon-api/updatedata", obj).then((r) => {
        r.data.data == "success" ? closeModal() : null;
    })
    return false;
});

