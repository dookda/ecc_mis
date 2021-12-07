let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let f_garbage = sessionStorage.getItem('f_garbage');

if (f_garbage == 'false') {
    location.href = "./../../form_register/login/index.html";
}

$("#usrname").text(urname);

let gb_id = sessionStorage.getItem('garbage_id');
let fromAdmin = sessionStorage.getItem('garbage_from_admin');

// console.log(gb_id);

let link;
if (fromAdmin) {
    link = "./../report_admin/index.html"
    sessionStorage.removeItem('garbage_from_admin');
} else {
    link = "./../report/index.html"
}

let latlng = {
    lat: 13.305567,
    lng: 101.383101
}
let map = L.map('map', {
    center: latlng,
    zoom: 13
});
let marker;
let gps = "";
let dataurl;

// const url = 'http://localhost:3700';
const url = "https://eec-onep.online/api";


var mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 8,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1,
    lyrname: "bmap"
});

const ghyb = L.tileLayer('https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    lyrname: "bmap"
});
const tam = L.tileLayer.wms("https://eec-onep.online/geoserver/eec/wms?", {
    layers: "eec:a__03_tambon_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 18,
    // minZoom: 14,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const amp = L.tileLayer.wms("https://eec-onep.online/geoserver/eec/wms?", {
    layers: "eec:a__02_amphoe_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 14,
    // minZoom: 10,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const pro = L.tileLayer.wms("https://eec-onep.online/geoserver/eec/wms?", {
    layers: "eec:a__01_prov_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 10,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

var baseMap = {
    "แผนที่ภาพจากดาวเทียม": ghyb.addTo(map),
    "แผนที่ถนน": mapbox
}
var overlayMap = {
    "ขอบเขตจังหวัด": pro.addTo(map),
    "ขอบเขตอำเภอ": amp,
    "ขอบเขตตำบล": tam,
}
L.control.layers(baseMap, overlayMap).addTo(map);

let geom = "";
// let dataurl = "";

map.on('click', (e) => {
    if (geom) {
        map.removeLayer(geom);
    }

    geom = L.marker(e.latlng, {
        draggable: false,
        name: 'p'
    }).addTo(map);

    // $("#lat").val(e.latlng.lat)
    // $("#lon").val(e.latlng.lng)
});

axios.post(url + "/gb-api/getone", { gb_id: gb_id }).then(r => {
    $('#dla').val(r.data.data[0].dla);
    $('#year').val(r.data.data[0].year);
    $('#prov').val(r.data.data[0].prov);
    $('#populace').val(r.data.data[0].populace);
    $('#amt_was').val(r.data.data[0].amt_was);
    $('#dla_ser').val(r.data.data[0].dla_ser);
    $('#was_dla').val(r.data.data[0].was_dla);
    $('#amt_coll').val(r.data.data[0].amt_coll);
    $('#amt_benf').val(r.data.data[0].amt_benf);
    $('#nwas_dla').val(r.data.data[0].nwas_dla);
    $('#was_ncor').val(r.data.data[0].was_ncor);
    $('#was_corr').val(r.data.data[0].was_corr);
    $('#use_benf').val(r.data.data[0].use_benf);
    $('#removal').val(r.data.data[0].removal);
    $('#landfill').val(r.data.data[0].landfill);
    $('#compost').val(r.data.data[0].compost);
    $('#incinrt').val(r.data.data[0].incinrt);
    $('#other').val(r.data.data[0].other);
    $('#dla_nser').val(r.data.data[0].dla_nser);
    $('#was_ndla').val(r.data.data[0].was_ndla);
    $('#was_benf').val(r.data.data[0].was_benf);
    $('#nwas_cor').val(r.data.data[0].nwas_cor);
    $('#all_benf').val(r.data.data[0].all_benf);
    $('#ge_was').val(r.data.data[0].ge_was);
    $('#orga_was').val(r.data.data[0].orga_was);
    $('#recy_was').val(r.data.data[0].recy_was);
    $('#dang_was').val(r.data.data[0].dang_was);
    $('#eat_food').val(r.data.data[0].eat_food);
    $('#was_prod').val(r.data.data[0].was_prod);

    // var myStyle = {
    //     "color": "#ff7800",
    //     "weight": 5,
    //     "opacity": 0.65
    // };

    // let site = L.geoJSON(r.data.data.features[0].geometry, {
    //     style: myStyle
    // });
    // site.addTo(lyrs)

    // console.log(r.data.data[0].geojson);

    if (r.data.data[0].geojson) {
        if (geom) {
            map.removeLayer(geom);
        }
        let g = r.data.data[0].geojson;
        geom = L.geoJSON(JSON.parse(g), {
            name: "p"
        }).addTo(map)
        // console.log(g);
        map.setView([JSON.parse(g).coordinates[1], JSON.parse(g).coordinates[0]], 16)
    }
    // map.fitBounds(site.getBounds());
});


function updateData() {
    const obj = {
        gb_id: gb_id,
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
    // console.log(obj.data);
    axios.post(url + "/gb-api/update", obj).then((r) => {
        // UserReport()
        $("#okmodal").modal("show")
    })
    return false;
}

function refreshPage() {
    // window.open('./../report/index.html', '_blank');
    $("#gform")[0].reset();
}

let UserReport = () => {
    location.href = link;
    sessionStorage.removeItem('garbage_from_admin');
}