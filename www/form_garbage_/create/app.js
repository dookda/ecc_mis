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
let marker;
let gps = "";
let dataurl;

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
    L.control.layers(baseMap, overlayMap, { collapsed: false, }).addTo(map);
}

map.on('click', (e) => {
    console.log(e)
    if (gps) {
        map.removeLayer(gps);
    }

    latlng = {
        lat: $('#lat').val(),
        lng: $('#lng').val()
    }

    gps = L.marker(e.latlng, {
        draggable: true,
        name: 'p'
    });
    gps.addTo(map);
    gps.on('dragend', (e) => {
    })
});

function insertData() {
    const obj = {
        data: {
            dla: $('#dla').val(),
            year: $('#year').val(),
            prov: $('#prov').val(),
            populace: $('#populace').val(),
            amt_was: $('#amt_was').val(),
            dla_ser: $('#dla_ser').val(),
            was_dla: $('#was_dla').val(),
            amt_coll: $('#amt_coll').val(),
            amt_benf: $('#amt_benf').val(),
            nwas_dla: $('#nwas_dla').val(),
            was_ncor: $('#was_ncor').val(),
            was_corr: $('#was_corr').val(),
            use_benf: $('#use_benf').val(),
            removal: $('#removal').val(),
            landfill: $('#landfill').val(),
            compost: $('#compost').val(),
            incinrt: $('#incinrt').val(),
            other: $('#other').val(),
            dla_nser: $('#dla_nser').val(),
            was_ndla: $('#was_ndla').val(),
            was_benf: $('#was_benf').val(),
            nwas_cor: $('#nwas_cor').val(),
            all_benf: $('#all_benf').val(),
            ge_was: $('#ge_was').val(),
            orga_was: $('#orga_was').val(),
            recy_was: $('#recy_was').val(),
            dang_was: $('#dang_was').val(),
            eat_food: $('#eat_food').val(),
            was_prod: $('#was_prod').val(),
            geom: gps == "" ? "" : gps.toGeoJSON()
        }
    }
    console.log(obj.data);
    axios.post(url + "/gb-api/insert", obj).then((r) => {
        refreshPage()
    })
    return false;
}

function refreshPage() {
    // window.open('./../report/index.html', '_blank');
    $("#gform")[0].reset();
}







