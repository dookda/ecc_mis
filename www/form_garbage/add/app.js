let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let f_garbage = sessionStorage.getItem('f_garbage');

if (f_garbage == 'false') {
    location.href = "./../../form_register/login/index.html";
}

$("#usrname").text(urname);


// const url = 'http://localhost:3700';
const url = "https://eec-onep.online/api";

let marker;
let gps = "";

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

const tam = L.tileLayer.wms("https://eec-onep.online/geoserver/eec/wms?", {
    layers: "eec:a__03_tambon_eec",
    format: "image/png",
    transparent: true,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const amp = L.tileLayer.wms("https://eec-onep.online/geoserver/eec/wms?", {
    layers: "eec:a__02_amphoe_eec",
    format: "image/png",
    transparent: true,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const pro = L.tileLayer.wms("https://eec-onep.online/geoserver/eec/wms?", {
    layers: "eec:a__01_prov_eec",
    format: "image/png",
    transparent: true,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

let lyrs = L.featureGroup().addTo(map)

var baseMap = {
    "Mapbox": mapbox.addTo(map),
    "google Hybrid": ghyb
}

var overlayMap = {
    "ขอบเขตจังหวัด": pro.addTo(map),
    "ขอบเขตอำเภอ": amp,
    "ขอบเขตตำบล": tam,
}

L.control.layers(baseMap, overlayMap).addTo(map);

let geom = "";
let dataurl = "";

let onLocationFound = (e) => {
    // console.log(e);
    if (geom) {
        map.removeLayer(geom);
    }
    geom = L.marker(e.latlng, {
        draggable: false,
        name: 'p'
    }).addTo(map);

}

map.on("locationfound", onLocationFound);
map.locate({ setView: true, maxZoom: 16 });

map.on('click', (e) => {
    if (geom) {
        map.removeLayer(geom);
    }
    // lc.stop();
    geom = L.marker(e.latlng, {
        draggable: false,
        name: 'p'
    }).addTo(map);

});

$('#dla').on("input", function () {
    if (this.value == '') {
        $("#dla").addClass("is-invalid")
        console.log("false")
    } else {
        $("#dla").removeClass("is-invalid")
        console.log("true")
    }
})
$('#year').on("input", function () {
    if (this.value == '') {
        $("#year").addClass("is-invalid")
        console.log("false")
    } else {
        $("#year").removeClass("is-invalid")
        console.log("true")
    }
})
$('#prov').on("input", function () {
    if (this.value == '') {
        $("#prov").addClass("is-invalid")
        console.log("false")
    } else {
        $("#prov").removeClass("is-invalid")
        console.log("true")
    }
})

function insertData() {
    if ($('#dla').val() == "" || $('#year').val() == "" || $('#prov').val() == "") {
        $("#NOdatamodal").modal("show")
        if ($('#dla').val() == "") {
            $("#dla").addClass("is-invalid")
        }
        if ($('#year').val() == "") {
            $("#year").addClass("is-invalid")
        }
        if ($('#prov').val() == "") {
            $("#prov").addClass("is-invalid")
        }
    } else if ($('#dla').val() !== "" || $('#year').val() !== "" || $('#prov').val() !== "") {

        const obj = {
            data: {
                usrid: urid,
                usrname: urname,
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
                geom: geom ? geom.toGeoJSON() : null
            }
        }
        // console.log(obj.data);
        if (geom != "") {
            axios.post(url + "/gb-api/insert", obj).then((r) => {
                r.data.data == "success" ? $("#okmodal").modal("show") : null
            })
        } else {
            $("#modal").modal("show");
        }
        return false;
    }
}
function refreshPage() {
    // window.open('./../report/index.html', '_blank');
    $("#gform")[0].reset();
}

let gotoReport = () => {
    location.href = "./../report/index.html";
}







