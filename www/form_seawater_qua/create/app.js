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

function insertData() {
    const obj = {
        data: {
            sq_spname: $('#sq_spname').val(),
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
            geom: gps == "" ? "" : gps.toGeoJSON()
        }
    }
    // console.log(obj.data);
    axios.post(url + "/sq-api/insert", obj).then((r) => {
        // console.log(r.data.data);
        $('#sq_spname').val("");
        $('#sq_date').val("");
        $('#sq_time').val("");
        $('#sq_order').val("");
        $('#sta_loc').val("");
        $('#sq_do').val("");
        $('#sq_tcb').val("");
        $('#sq_po43p').val("");
        $('#sq_no3n').val("");
        $('#sq_temp').val("");
        $('#sq_ss').val("");
        $('#sq_ph').val("");
        $('#sq_nh3').val("");
        $('#sq_mwqi').val("");
        $('#sq_pb').val("");
        refreshPage()
    })
    return false;
}

function deleteData() {
    const obj = {
        id: pos.id
    }
    $.post(url + '/anticov-api/pin-delete', obj, (res) => {
        getData();
        $('form :input').val('');
        $('#preview').attr('src', '');
        $("#status").empty().text("");
    })
}

function refreshPage() {
    window.open('./../report/index.html', '_blank');
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









