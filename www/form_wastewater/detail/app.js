let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let f_wastewater = sessionStorage.getItem('f_wastewater');
$(document).ready(() => {
    if (urid) {
        if (f_wastewater == 'false') {
            $("#noauth").modal("show");
        }
    } else {
        $("#noauth").modal("show");
    }
})
let gotoLogin = () => {
    location.href = "./../../form_register/login/index.html";
}
$("#usrname").text(urname);

let w_id = sessionStorage.getItem('w_id');
let fromAdmin = sessionStorage.getItem('w_from_admin');

let link;
if (fromAdmin) {
    link = "./../report_admin/index.html"
    sessionStorage.removeItem('w_from_admin');
} else {
    link = "./../report/index.html"
}

const url = "https://engrids.soc.cmu.ac.th/api";
let marker;


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

const tam = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
    layers: "eec:a__03_tambon_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 18,
    // minZoom: 14,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const amp = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
    layers: "eec:a__02_amphoe_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 14,
    // minZoom: 10,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const pro = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
    layers: "eec:a__01_prov_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 10,
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

let geom = null;
let dataurl = "";

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

axios.post(url + "/waste-api/getone", { w_id: w_id }).then(async (r) => {
    // console.log(w_id)
    $('#insti').val(r.data.data[0].insti);
    $('#prov').val(r.data.data[0].prov);
    $('#wdate').val(r.data.data[0].date);
    $('#no_house').val(r.data.data[0].no_house);
    $('#no_hotel').val(r.data.data[0].no_hotel);
    $('#no_dorm').val(r.data.data[0].no_dorm);
    $('#no_serv').val(r.data.data[0].no_serv);
    $('#no_vhouse').val(r.data.data[0].no_vhouse);
    $('#no_hospi').val(r.data.data[0].no_hospi);
    $('#no_restur').val(r.data.data[0].no_restur);
    $('#no_market').val(r.data.data[0].no_market);
    $('#no_mall').val(r.data.data[0].no_mall);
    $('#no_office').val(r.data.data[0].no_office);
    $('#no_school').val(r.data.data[0].no_school);
    $('#no_gassta').val(r.data.data[0].no_gassta);
    $('#no_temple').val(r.data.data[0].no_temple);
    $('#no_govcent').val(r.data.data[0].no_govcent);
    $('#no_clinic').val(r.data.data[0].no_clinic);
    $('#quantity').val(r.data.data[0].quantity);
    $('#wsystem').val(r.data.data[0].wsystem);
    $('#qinput').val(r.data.data[0].qinput);
    $('#qoutput').val(r.data.data[0].qoutput);
    $("#preview").attr("src", r.data.data[0].img);
    $('#reporter').val(r.data.data[0].usrname);

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

$('#prov').on("input", function () {
    if (this.value == '') {
        $("#prov").addClass("is-invalid")
        console.log("false")
    } else {
        $("#prov").removeClass("is-invalid")
        console.log("true")
    }
})
$('#insti').on("input", function () {
    if (this.value == '') {
        $("#insti").addClass("is-invalid")
        console.log("false")
    } else {
        $("#insti").removeClass("is-invalid")
        console.log("true")
    }
})
$('#wdate').on("input", function () {
    if (this.value == '') {
        $("#wdate").addClass("is-invalid")
        console.log("false")
    } else {
        $("#wdate").removeClass("is-invalid")
        console.log("true")
    }
})

function sendData() {
    if ($('#prov').val() == "" || $('#insti').val() == "" || $('#wdate').val() == "") {
        $("#NOdatamodal").modal("show")
        if ($('#prov').val() == "") {
            $("#prov").addClass("is-invalid")
        }
        if ($('#insti').val() == "") {
            $("#insti").addClass("is-invalid")
        }
        if ($('#wdate').val() == "") {
            $("#wdate").addClass("is-invalid")
        }
    } else if ($('#prov').val() !== "" || $('#insti').val() !== "" || $('#wdate').val() == "") {
        const obj = {
            w_id: w_id,
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
                geom: geom ? geom.toGeoJSON() : null
            }
        }
        // console.log(obj);
        axios.post(url + "/waste-api/update", obj).then((r) => {
            r.data.data == "success" ? $("#okmodal").modal("show") : null;
            sessionStorage.removeItem('w_id');
        })
        return false;
    }
}

let gotoReport = () => {
    location.href = link;
    sessionStorage.removeItem('w_id');
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









