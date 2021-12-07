let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let f_wastewater = sessionStorage.getItem('f_wastewater');

if (f_wastewater == 'false') {
    location.href = "./../../form_register/login/index.html";
}

$("#usrname").text(urname);

$(document).ready(() => {
    loadMap();
});

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
    // console.log(e)
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

function insertData() {
    const obj = {
        data: {
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
            geom: gps == "" ? "" : gps.toGeoJSON()
        }
    }
    // console.log(obj.data);
    axios.post(url + "/waste-api/insert", obj).then((r) => {
        // console.log(r.data.data);
        $('#insti').val("");
        $('#prov').val("");
        $('#wdate').val("");
        $('#no_house').val(0);
        $('#no_hotel').val(0);
        $('#no_dorm').val(0);
        $('#no_serv').val(0);
        $('#no_vhouse').val(0);
        $('#no_hospi').val(0);
        $('#no_restur').val(0);
        $('#no_market').val(0);
        $('#no_mall').val(0);
        $('#no_office').val(0);
        $('#no_school').val(0);
        $('#no_gassta').val(0);
        $('#no_temple').val(0);
        $('#no_govcent').val(0);
        $('#no_clinic').val(0);
        $('#quantity').val(0);
        $('#wsystem').val("");
        $('#qinput').val(0);
        $('#qoutput').val(0);
        refreshPage()
    })
    return false;
}

function refreshPage() {
    // location.reload(true);
    window.open('./../report/index.html', '_self');
}

$('#imgfile').change(function (evt) {
    var files = evt.target.files;
    var file = files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('preview').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    resize();
});

function resize() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var filesToUploads = document.getElementById('imgfile').files;
        var file = filesToUploads[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var img = document.createElement("img");
                img.src = e.target.result;
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                var MAX_WIDTH = 800;
                var MAX_HEIGHT = 800;
                var width = img.width;
                var height = img.height;
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                dataurl = canvas.toDataURL(file.type);
                // console.log(dataurl)
                // document.getElementById('output').src = dataurl;
            }
            reader.readAsDataURL(file);
        }
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
}









