let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
$("#usrname").text(urname);
urid ? null : location.href = "./../../form_register/login/index.html";

if (eecauth !== "admin" && eecauth !== "office") {
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

let loadMap = () => {
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
        "Mapbox": mapbox,
        "google Hybrid": ghyb.addTo(map)
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

let insertData = () => {
    const obj = {
        data: {
            ws_station: $("#ws_station").val(),
            ws_location: $("#ws_location").val(),
            ws_river: $("#ws_river").val(),
            ws_recorder: $("#ws_recorder").val(),
            ws_date: $("#ws_date").val(),
            ws_time: $("#ws_time").val(),
            ws_round: $("#ws_round").val(),
            ws_do: $("#ws_do").val(),
            ws_bod: $("#ws_bod").val(),
            ws_tcb: $("#ws_tcb").val(),
            ws_fcb: $("#ws_fcb").val(),
            ws_nh3n: $("#ws_nh3n").val(),
            ws_wqi: $("#ws_wqi").val(),
            ws_tp: $("#ws_tp").val(),
            ws_ts: $("#ws_ts").val(),
            ws_ss: $("#ws_ss").val(),
            ws_temp: $("#ws_temp").val(),
            ws_ph: $("#ws_ph").val(),
            ws_no3: $("#ws_no3").val(),
            ws_phenols: $("#ws_phenols").val(),
            ws_cu: $("#ws_cu").val(),
            ws_ni: $("#ws_ni").val(),
            ws_mn: $("#ws_mn").val(),
            ws_zn: $("#ws_zn").val(),
            ws_cd: $("#ws_cd").val(),
            ws_crhex: $("#ws_crhex").val(),
            ws_pb: $("#ws_pb").val(),
            ws_totalhg: $("#ws_totalhg").val(),
            ws_as: $("#ws_as").val(),
            ws_cyanide: $("#ws_cyanide").val(),
            ws_radioa: $("#ws_radioa").val(),
            ws_top: $("#ws_top").val(),
            ws_ddt: $("#ws_ddt").val(),
            ws_alphsb: $("#ws_alphsb").val(),
            ws_dield: $("#ws_dield").val(),
            ws_aldrin: $("#ws_aldrin").val(),
            ws_hepta: $("#ws_hepta").val(),
            ws_endrin: $("#ws_endrin").val(),

            img: dataurl ? dataurl : dataurl = "",
            geom: gps == "" ? "" : gps.toGeoJSON()
        }
    }
    // console.log(obj.data);
    axios.post(url + "/ws-api/insert", obj).then((r) => {
        // console.log(r.data.data);
        $("#ws_station").val("");
        $("#ws_location").val("");
        $("#ws_river").val("");
        $("#ws_recorder").val("");
        $("#ws_date").val("");
        $("#ws_time").val("");
        $("#ws_round").val("");
        $("#ws_do").val("");
        $("#ws_bod").val("");
        $("#ws_tcb").val("");
        $("#ws_fcb").val("");
        $("#ws_nh3n").val("");
        $("#ws_wqi").val("");
        $("#ws_tp").val("");
        $("#ws_ts").val("");
        $("#ws_ss").val("");
        $("#ws_temp").val("");
        $("#ws_ph").val("");
        $("#ws_no3").val("");
        $("#ws_phenols").val("");
        $("#ws_cu").val("");
        $("#ws_ni").val("");
        $("#ws_mn").val("");
        $("#ws_zn").val("");
        $("#ws_cd").val("");
        $("#ws_crhex").val("");
        $("#ws_pb").val("");
        $("#ws_totalhg").val("");
        $("#ws_as").val("");
        $("#ws_cyanide").val("");
        $("#ws_radioa").val("");
        $("#ws_top").val("");
        $("#ws_ddt").val("");
        $("#ws_alphsb").val("");
        $("#ws_dield").val("");
        $("#ws_aldrin").val("");
        $("#ws_hepta").val("");
        $("#ws_endrin").val("");
        refreshPage()
    })
    return false;
}

let refreshPage = () => {
    // window.open('./../report/index.html', '_blank');
    location.href = "./../report/index.html";
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

let resize = () => {
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









