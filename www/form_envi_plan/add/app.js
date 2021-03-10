
let latlng = {
    lat: 13.305567,
    lng: 101.383101
};

let map = L.map('map', {
    center: latlng,
    zoom: 9
});

const url = "https://eec-onep.online:3700";
// const url = 'https://rti2dss.com:3200';

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

map.pm.addControls({
    position: 'topleft',
    drawCircle: false,
    drawPolyline: false,
    drawRectangle: false,
    drawCircleMarker: false,
    cutPolygon: false
});

let geom = '-';
map.on('pm:create', e => {
    geom = e.layer.toGeoJSON();
});

function refreshPage() {
    location.reload(true);
}

let chk;
$("#espect1").hide()
$("#espect2").hide()
$("#feas_loan").hide()
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
        rname: $('#rname').val() ? $('#rname').val() : '-',
        pos: $('#pos').val() ? $('#pos').val() : '-',
        tele: $('#tele').val() ? $('#tele').val() : '-',
        fax: $('#fax').val() ? $('#fax').val() : '-',
        mob: $('#mob').val() ? $('#mob').val() : '-',
        mail: $('#mail').val() ? $('#mail').val() : '-',
        geom: geom
    }
    console.log(obj);
    axios.post(url + "/projmon-api/adddata", obj).then((r) => {
        r.data.data == "success" ? refreshPage() : null
    })
    return false;
});

