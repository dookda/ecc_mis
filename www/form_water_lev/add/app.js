let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let f_water_lev = sessionStorage.getItem('f_water_lev');

if (f_water_lev == 'false') {
    location.href = "./../../form_register/login/index.html";
}

$("#usrname").text(urname);

// let userid;
// let main = async () => {
//     await liff.init({ liffId: "1655648770-JLXzogag" })
//     if (liff.isLoggedIn()) {
//         getUserProfile()
//     } else {
//         liff.login()
//     }
// }
// main()
// let getUserProfile = async () => {
//     const profile = await liff.getProfile();
//     $('#profile').attr('src', await profile.pictureUrl);
//     $('#userId').text(profile.userId);
//     $('#statusMessage').text(await profile.statusMessage);
//     $('#displayName').text(await profile.displayName);
//     userid = profile.userId;
// }

const url = "https://eec-onep.online:3700";
// const url = 'http://localhost:3700';

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

let waterlevel;
function getLv(a) {
    waterlevel = a;
    $(".place").addClass("white");
    a == 1 ? $("#a1").addClass("green") : $("#a1").removeClass("green");
    a == 2 ? $("#a2").addClass("green") : $("#a2").removeClass("green");
    a == 3 ? $("#a3").addClass("green") : $("#a3").removeClass("green");
    a == 4 ? $("#a4").addClass("green") : $("#a4").removeClass("green");
}

$('#watername').on("input", function () {
    if (this.value == '') {
        $("#watername").addClass("is-invalid")
        console.log("false")
    } else {
        $("#watername").removeClass("is-invalid")
        console.log("true")
    }
})
$('#placename').on("input", function () {
    if (this.value == '') {
        $("#placename").addClass("is-invalid")
        console.log("false")
    } else {
        $("#placename").removeClass("is-invalid")
        console.log("true")
    }
})

let sendData = () => {
    // console.log(geom[0]);
    if ($('#watername').val() == "" || $('#placename').val() == "") {
        $("#NOdatamodal").modal("show")
        if ($('#watername').val() == "") {
            $("#watername").addClass("is-invalid")
        }
        if ($('#placename').val() == "") {
            $("#placename").addClass("is-invalid")
        }
    } else if ($('#watername').val() !== "" || $('#placename').val() !== "") {
        const obj = {
            data: {
                usrid: urid,
                usrname: urname,
                placename: $('#placename').val(),
                watername: $('#watername').val(),
                waterlevel: waterlevel,
                img: dataurl ? dataurl : dataurl = "",
                geom: geom == "" ? "" : geom.toGeoJSON()
            }
        }

        // console.log(obj);
        if (geom != "") {
            axios.post(url + "/waterlevel-api/insert", obj).then((r) => {
                r.data.data == "success" ? $("#okmodal").modal("show") : null
            })
        } else {
            $("#modal").modal("show");
        }
        return false;
    }
}
let gotoList = () => {
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


