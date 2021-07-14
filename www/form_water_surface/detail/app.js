let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
$("#usrname").text(urname);
urid ? null : location.href = "./../../form_register/login/index.html";

if (eecauth !== "admin" && eecauth !== "office") {
    location.href = "./../../form_register/login/index.html";
}

let ws_id = sessionStorage.getItem('ws_id');
let fromAdmin = sessionStorage.getItem('ws_from_admin');

let link;
if (fromAdmin) {
    link = "./../report_admin/index.html"
    sessionStorage.removeItem('ws_from_admin');
} else {
    link = "./../report/index.html"
}

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
    "ขอบเขตตำบล": tam.addTo(map),
    "ขอบเขตอำเภอ": amp.addTo(map),
    "ขอบเขตจังหวัด": pro.addTo(map)
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



axios.post(url + "/ws-api/getone", { ws_id: ws_id }).then(r => {
    $("#ws_station").val(r.data.data[0].ws_station)
    $("#ws_location").val(r.data.data[0].ws_location)
    $("#ws_river").val(r.data.data[0].ws_river)
    $("#ws_recorder").val(r.data.data[0].ws_recorder)
    $("#ws_date").val(r.data.data[0].ws_date)
    $("#ws_time").val(r.data.data[0].ws_time)
    $("#ws_round").val(r.data.data[0].ws_round)
    $("#ws_do").val(r.data.data[0].ws_do)
    $("#ws_bod").val(r.data.data[0].ws_bod)
    $("#ws_tcb").val(r.data.data[0].ws_tcb)
    $("#ws_fcb").val(r.data.data[0].ws_fcb)
    $("#ws_nh3n").val(r.data.data[0].ws_nh3n)
    $("#ws_wqi").val(r.data.data[0].ws_wqi)
    $("#ws_tp").val(r.data.data[0].ws_tp)
    $("#ws_ts").val(r.data.data[0].ws_ts)
    $("#ws_ss").val(r.data.data[0].ws_ss)
    $("#ws_temp").val(r.data.data[0].ws_temp)
    $("#ws_ph").val(r.data.data[0].ws_ph)
    $("#ws_no3").val(r.data.data[0].ws_no3)
    $("#ws_phenols").val(r.data.data[0].ws_phenols)
    $("#ws_cu").val(r.data.data[0].ws_cu)
    $("#ws_ni").val(r.data.data[0].ws_ni)
    $("#ws_mn").val(r.data.data[0].ws_mn)
    $("#ws_zn").val(r.data.data[0].ws_zn)
    $("#ws_cd").val(r.data.data[0].ws_cd)
    $("#ws_crhex").val(r.data.data[0].ws_crhex)
    $("#ws_pb").val(r.data.data[0].ws_pb)
    $("#ws_totalhg").val(r.data.data[0].ws_totalhg)
    $("#ws_as").val(r.data.data[0].ws_as)
    $("#ws_cyanide").val(r.data.data[0].ws_cyanide)
    $("#ws_radioa").val(r.data.data[0].ws_radioa)
    $("#ws_top").val(r.data.data[0].ws_top)
    $("#ws_ddt").val(r.data.data[0].ws_ddt)
    $("#ws_alphsb").val(r.data.data[0].ws_alphsb)
    $("#ws_dield").val(r.data.data[0].ws_dield)
    $("#ws_aldrin").val(r.data.data[0].ws_aldrin)
    $("#ws_hepta").val(r.data.data[0].ws_hepta)
    $("#ws_endrin").val(r.data.data[0].ws_endrin)

    $("#preview").attr("src", r.data.data[0].img);

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

$("#ws_recorder").val(urname);
let sendData = () => {
    const obj = {
        ws_id: ws_id,
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
            geom: geom ? geom.toGeoJSON() : null
        }
    }
    // console.log(obj.data);
    axios.post(url + "/ws-api/update", obj).then((r) => {
        r.data.data == "success" ? $("#okmodal").modal("show") : null
        sessionStorage.removeItem('ws_id');
    })
    return false;
}

let gotoReport = () => {
    location.href = link;
    sessionStorage.removeItem('ws_id');
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








