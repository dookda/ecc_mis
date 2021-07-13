let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
$("#usrname").text(urname);
urid ? null : location.href = "./../../form_register/login/index.html";

if (eecauth !== "admin" && eecauth !== "office") {
    location.href = "./../../form_register/login/index.html";
}

if (eecauth !== "admin" && eecauth !== "user") {
    location.href = "./../../form_register/login/index.html";
}

// const url = "https://eec-onep.online:3700";
const url = 'http://localhost:3700';
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

const tam = L.tileLayer.wms("https://rti2dss.com:8443/geoserver/th/wms?", {
    layers: "th:tambon_4326",
    format: "image/png",
    transparent: true,
    CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=22 OR pro_code=23 OR pro_code=24 OR pro_code=25 OR pro_code=26 OR pro_code=27'
});

const amp = L.tileLayer.wms("https://rti2dss.com:8443/geoserver/th/wms?", {
    layers: "th:amphoe_4326",
    format: "image/png",
    transparent: true,
    CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=22 OR pro_code=23 OR pro_code=24 OR pro_code=25 OR pro_code=26 OR pro_code=27'
});

const pro = L.tileLayer.wms("https://rti2dss.com:8443/geoserver/th/wms?", {
    layers: "th:province_4326",
    format: "image/png",
    transparent: true,
    CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=22 OR pro_code=23 OR pro_code=24 OR pro_code=25 OR pro_code=26 OR pro_code=27'
});

let lyrs = L.featureGroup().addTo(map)

var baseMap = {
    "Mapbox": mapbox.addTo(map),
    "google Hybrid": ghyb
}

var overlayMap = {
    "ขอบเขตตำบล": tam.addTo(map),
    "ขอบเขตอำเภอ": amp.addTo(map),
    "ขอบเขตจังหวัด": pro.addTo(map)
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

    $("#lat").val(e.latlng.lat);
    $("#lon").val(e.latlng.lng);
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

    $("#lat").val(e.latlng.lat);
    $("#lon").val(e.latlng.lng);
});

let sendData = () => {
    const obj = {
        data: {
            usrid: urid,
            usrname: urname,
            // sq_spname: $('#sq_spname').val(),
            sq_date: $('#sq_date').val(),
            sq_time: $('#sq_time').val(),
            sq_order: $('#sq_order').val(),
            sta_loc: $('#sta_loc').val(),
            // pro: $('#pro').val(),
            // amp: $('#amp').val(),
            // tam: $('#tam').val(),
            sq_do: $('#sq_do').val(),
            sq_tcb: $('#sq_tcb').val(),
            sq_po43p: $('#sq_po43p').val(),
            sq_no3n: $('#sq_no3n').val(),
            sq_temp: $('#sq_temp').val(),
            sq_ss: $('#sq_ss').val(),
            sq_ph: $('#sq_ph').val(),
            sq_nh3: $('#sq_nh3').val(),
            sq_mwqi: $('#sq_mwqi').val(),
            sq_pb: $('#sq_pb').val(),
            img: dataurl ? dataurl : dataurl = '',
            geom: geom == "" ? "" : geom.toGeoJSON()
        }
    }
    // console.log(obj.data);
    axios.post(url + "/sq-api/insert", obj).then((r) => {
        r.data.data == "success" ? $("#okmodal").modal("show") : null
    })
    return false;
}

let gotoReport = () => {
    location.href = "./../report/index.html";
}

let refreshPage = () => {
    location.reload(true);
}

$("#imgfile").change(function (evt) {
    var filesToUploads = document.getElementById('imgfile').files;
    var file = filesToUploads[0];
    var reader = new FileReader();

    reader.onloadend = (e) => {
        let imageOriginal = reader.result;
        resizeImage(file);
        document.getElementById('preview').src = imageOriginal;
    }
    reader.readAsDataURL(file);
});

let resizeImage = (file) => {
    var maxW = 600;
    var maxH = 600;
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var img = document.createElement('img');
    var result = '';
    img.onload = function () {
        var iw = img.width;
        var ih = img.height;
        var scale = Math.min((maxW / iw), (maxH / ih));
        var iwScaled = iw * scale;
        var ihScaled = ih * scale;
        canvas.width = iwScaled;
        canvas.height = ihScaled;
        context.drawImage(img, 0, 0, iwScaled, ihScaled);
        result += canvas.toDataURL('image/jpeg', 0.5);
        dataurl = result;
        // document.getElementById('rez').src = that.imageResize;
    }
    img.src = URL.createObjectURL(file);
}









