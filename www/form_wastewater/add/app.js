let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let f_wastewater = sessionStorage.getItem('f_wastewater');

if (f_wastewater == 'false') {
    location.href = "./../../form_register/login/index.html";
}

$("#usrname").text(urname);

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

const tam = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__03_tambon_eec",
    format: "image/png",
    transparent: true,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const amp = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__02_amphoe_eec",
    format: "image/png",
    transparent: true,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const pro = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
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

$("#prov").on("change", () => {
    let p = document.getElementById("prov").value;
    axios.post(url + "/waste-api/selectbypro", { prov: p }).then(r => {
        $("#insti").empty();
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
        if (geom != "") {
            axios.post(url + "/waste-api/insert", obj).then((r) => {
                r.data.data == "success" ? $("#okmodal").modal("show") : null
            })
        } else {
            $("#modal").modal("show");
        }
        return false;
    }
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









