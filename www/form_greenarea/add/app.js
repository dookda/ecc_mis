
let latlng = {
    lat: 13.305567,
    lng: 101.383101
};

let map = L.map('map', {
    center: latlng,
    zoom: 9
});

const url = "https://eec-onep.online:3700";
// const url = 'http://localhost:3700';

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
    drawMarker: false,
    drawCircle: false,
    drawPolyline: false,
    drawRectangle: true,
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

$('#fieldForm').submit(function (e) {
    e.preventDefault();
    const obj = {
        proj_name: $('#proj_name').val(),
        response: $('#response').val() ? $('#response').val() : '-',
        gtype: $('#gtype').val() ? $('#gtype').val() : '-',
        place: $('#place').val() ? $('#place').val() : '-',
        area: $('#area').val() ? $('#area').val() : 0,
        geom: geom
    }
    console.log(obj);
    if (geom !== "-") {
        axios.post(url + "/green-api/adddata", obj).then((r) => {
            console.log(r);
            // r.data.data == "success" ? refreshPage() : null
            $("#notify").text("อัพเดทข้อมูลแล้ว");
            $("#proj_name").val("");
            $("#response").val("");
            $("#gtype").val("");
            $("#place").val("");
            $("#area").val("");
        })
    } else {
        $("#modal").modal("show");
        $("#notify").text("กรุณาวาดพื้นที่สีเขียวลงบนแผนที่");
    }
    return false;
});

