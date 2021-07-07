let urid = sessionStorage.getItem('id');
let urname = sessionStorage.getItem('name');
$("#usrname").text(urname);
urid ? null : location.href = "./../form_register/login/index.html";

var map = L.map("map", {
    center: [18.802842, 98.950168],
    zoom: 15
})
//basemap
const ghyb = L.tileLayer('https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
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

var OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});

// var road = L.tileLayer.wms("http://54.179.87.33:8080/geoserver/project_031/wms?", {
//     layers: 'project_031:percent_4326',
//     format: 'image/png',
//     transparent: true,
// })

// var road1 = L.tileLayer.wms("http://localhost:8080/geoserver/cm_data/wms?", {
//     layers: 'cm_data:macus',
//     format: 'image/png',
//     transparent: true
// })

var baseMap = {
    "google Hybrid": ghyb.addTo(map),
    "Mapbox": mapbox

}

// var overLaymap = {
//     "ถนน": road.addTo(map),
//     // "ขอบเขต": road1.addTo(map)

// }

L.control.layers(baseMap).addTo(map);

var lat
var lng
map.locate({ setView: true, maxZoom: 16 })

map.on('locationfound', onLocationFound);


function onLocationFound(e) {
    // console.log(e)
    start = e.latlng;
    L.marker(e.latlng, { name: "start", draggable: true }).addTo(map).bindPopup("คุณอยู่ที่นี่").openPopup();


}

map.pm.addControls({
    position: 'topleft',
    drawCircleMarker: false,
    drawPolyline: false,
    drawRectangle: false,
    drawCircle: false,
    editMode: false,
    dragMode: false,
    cutPolygon: false,
    removalMode: false
})

var dist;
map.on('pm:create', e => {
    // let poly = e.layer.toGeoJSON().geometry
    // console.log(JSON.stringify(poly))
    console.log(e)

    if (e.shape == "Polygon") {
        findpercent(e)

    } else if (e.shape == "Marker") {
        getLo(e)
    }
})

function getLo(e) {
    rmLyr()
    console.log(e)
    e.layer.options.name = 'dist'
    // dist = e.latlng
    // var mk = L.marker(e._latlng, { name: 'dist' }).addTo(map)
    // mk.bindPopup('go!<p><button onclick="go()">click</button>').openPopup()
    lat = e.layer._latlng.lat
    lng = e.layer._latlng.lng

}

function rmLyr() {
    map.eachLayer(lyr => {
        if (lyr.options.name == "dist" || lyr.options.name == 'line') {
            map.removeLayer(lyr)
        }
        // console.log(lyr)
    });
}

let WLV = 0;


function getLv(a) {
    console.log(a);
    WLV = a;
    $(".place").addClass("white");
    a == 1 ? $("#a1").addClass("green") : $("#a1").removeClass("green");
    a == 2 ? $("#a2").addClass("green") : $("#a2").removeClass("green");
    a == 3 ? $("#a3").addClass("green") : $("#a3").removeClass("green");
    a == 4 ? $("#a4").addClass("green") : $("#a4").removeClass("green");
}

function sendData() {

    var p_name = $("#sname").val()
    // var waterLv = $("#Lv").val()
    // var number = $("#number").val()
    // var death = $("#death").val()
    // var date = $("#date").val()

    var data = {
        // place: place,
        p_name: p_name,
        waterLv: WLV,
        lat: lat,
        lng: lng,
        // death: death,
        // date: date
    }
    console.log(data)
    $.post('https://eec-onep.online:3700/api/report-post', data).done(r => {
        console.log(r)
    })


}
