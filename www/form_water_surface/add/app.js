let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let f_water_surface = sessionStorage.getItem('f_water_surface');

if (f_water_surface == 'false') {
    location.href = "./../../form_register/login/index.html";
}

$("#usrname").text(urname);

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

$('#ws_station').on("input", function () {
    if (this.value == '') {
        $("#ws_station").addClass("is-invalid")
        console.log("false")
    } else {
        $("#ws_station").removeClass("is-invalid")
        console.log("true")
    }
})
$('#ws_location').on("input", function () {
    if (this.value == '') {
        $("#ws_location").addClass("is-invalid")
        console.log("false")
    } else {
        $("#ws_location").removeClass("is-invalid")
        console.log("true")
    }
})
$('#ws_river').on("input", function () {
    if (this.value == '') {
        $("#ws_river").addClass("is-invalid")
        console.log("false")
    } else {
        $("#ws_river").removeClass("is-invalid")
        console.log("true")
    }
})
$('#ws_recorder').on("input", function () {
    if (this.value == '') {
        $("#ws_recorder").addClass("is-invalid")
        console.log("false")
    } else {
        $("#ws_recorder").removeClass("is-invalid")
        console.log("true")
    }
})
$('#ws_date').on("input", function () {
    if (this.value == '') {
        $("#ws_date").addClass("is-invalid")
        console.log("false")
    } else {
        $("#ws_date").removeClass("is-invalid")
        console.log("true")
    }
})

$("#ws_recorder").val(urname);
let sendData = () => {
    if ($('#ws_station').val() == "" || $('#ws_location').val() == "" || $('#ws_river').val() == "" || $('#ws_recorder').val() == "" || $('#ws_date').val() == "") {
        $("#NOdatamodal").modal("show")
        if ($('#ws_station').val() == "") {
            $("#ws_station").addClass("is-invalid")
        }
        if ($('#ws_location').val() == "") {
            $("#ws_location").addClass("is-invalid")
        }
        if ($('#ws_river').val() == "") {
            $("#ws_river").addClass("is-invalid")
        }
        if ($('#ws_recorder').val() == "") {
            $("#ws_recorder").addClass("is-invalid")
        }
        if ($('#ws_date').val() == "") {
            $("#ws_date").addClass("is-invalid")
        }
    } else if ($('#ws_station').val() !== "" || $('#ws_location').val() !== "" || $('#ws_river').val() == "" || $('#ws_recorder').val() == "" || $('#ws_date').val() == "") {
        const obj = {
            data: {
                usrid: urid,
                usrname: urname,
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
                ws_province: $("#pro").val(),

                img: dataurl ? dataurl : dataurl = "",
                geom: geom ? geom.toGeoJSON() : null
            }
        }
        // console.log(obj.data);
        if (geom != "") {
            axios.post(url + "/ws-api/insert", obj).then((r) => {
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








