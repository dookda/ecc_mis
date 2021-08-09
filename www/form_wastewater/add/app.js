let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
$("#usrname").text(urname);
urid ? null : location.href = "./../../form_register/login/index.html";

if (eecauth !== "admin" && eecauth !== "office") {
    location.href = "./../../form_register/login/index.html";
}

let marker;

// const url = 'http://localhost:3700';
const url = "https://eec-onep.online:3700";

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
    // "ขอบเขตตำบล": tam.addTo(map),
    // "ขอบเขตอำเภอ": amp.addTo(map),
    // "ขอบเขตจังหวัด": pro.addTo(map)
}

L.control.layers(baseMap, overlayMap).addTo(map);

let geom = null;
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

$("#prov").on("change", () => {
    let prov = document.getElementById("prov").value;
    axios.post(url + "/waste-api/selectbypro", { prov: prov }).then(r => {
        // console.log(r);
        $("#insti").empty()
        r.data.data.map(i => {
            $("#insti").append(`<option value="${i.insti}">${i.insti}</option>`)
        })
    })
})

let quant;
let sum = () => {
    quant = 0;
    let a = $('#no_house').val() * 500;
    let b = $('#no_hotel').val() * 1000;
    let c = $('#no_dorm').val() * 80;
    let d = $('#no_serv').val() * 400;
    let e = $('#no_vhouse').val() * 180;
    let f = $('#no_hospi').val() * 800;
    let g = $('#no_restur').val() * 25;
    let h = $('#no_market').val() * 70;
    let i = $('#no_mall').val() * 5;
    let j = $('#no_office').val() * 3;
    let k = $('#no_school').val()
    let l = $('#no_gassta').val()
    let m = $('#no_temple').val()
    let n = $('#no_govcent').val()
    let o = $('#no_clinic').val()
    quant = Number(a) + Number(b) + Number(c) + Number(d) +
        Number(e) + Number(f) + Number(g) + Number(h) +
        Number(i) + Number(j) + Number(k) + Number(l) +
        Number(m) + Number(n) + Number(o);
    // console.log(quant);
    $("#quantity").val(quant)
}

function sendData() {
    const obj = {
        data: {
            usrid: urid,
            usrname: urname,
            insti: $('#insti').val(),
            prov: $('#prov').val(),
            wdate: $('#wdate').val(),
            no_house: $('#no_house').val(),
            no_hotel: $('#no_hotel').val(),
            no_dorm: $('#no_dorm').val(),
            no_serv: $('#no_serv').val(),
            no_vhouse: $('#no_vhouse').val(),
            no_hospi: $('#no_hospi').val(),
            no_restur: $('#no_restur').val(),
            no_market: $('#no_market').val(),
            no_mall: $('#no_mall').val(),
            no_office: $('#no_office').val(),
            no_school: $('#no_school').val(),
            no_gassta: $('#no_gassta').val(),
            no_temple: $('#no_temple').val(),
            no_govcent: $('#no_govcent').val(),
            no_clinic: $('#no_clinic').val(),
            quantity: $('#quantity').val(),
            wsystem: $('#wsystem').val(),
            qinput: $('#qinput').val(),
            qoutput: $('#qoutput').val(),

            img: dataurl ? dataurl : dataurl = '',
            geom: geom ? geom.toGeoJSON().geometry : null
        }
    }
    // console.log(obj);
    axios.post(url + "/waste-api/insert", obj).then((r) => {
        r.data.data == "success" ? $("#okmodal").modal("show") : null
    })
    return false;
}

let gotoReport = () => {
    location.href = "./../report/index.html";
}

function refreshPage() {
    // location.reload(true);
    window.open('./../report/index.html', '_self');
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









