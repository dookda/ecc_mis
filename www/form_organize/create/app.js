

let latlng = {
    lat: 16.820378,
    lng: 100.265787
}

// const url = 'http://localhost:3700';
const url = "https://eec-onep.online:3700";
let userid;
let dataurl;
let geom = "";
// let gps1;

let map = L.map('map', {
    center: latlng,
    zoom: 13
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

var pro = L.tileLayer.wms("https://rti2dss.com:8443/geoserver/th/wms?", {
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

let onLocationFound = (e) => {
    console.log(e);
    if (geom) {
        map.removeLayer(geom);
    }
    geom = L.marker(e.latlng, {
        draggable: false,
        name: 'p'
    }).addTo(map);

    $("#lat").val(e.latlng.lat)
    $("#lon").val(e.latlng.lng)
}

map.on("locationfound", onLocationFound);
map.locate({ setView: true, maxZoom: 16 });
// var lc = L.control.locate({
//     position: 'topleft',
//     strings: {
//         title: ""
//     },
//     locateOptions: {
//         enableHighAccuracy: true,
//     }
// }).addTo(map);

// lc.start();

map.on('click', (e) => {
    if (geom) {
        map.removeLayer(geom);
    }
    // lc.stop();
    geom = L.marker(e.latlng, {
        draggable: false,
        name: 'p'
    }).addTo(map);

    $("#lat").val(e.latlng.lat)
    $("#lon").val(e.latlng.lng)
});

$("#dataform").on("submit", function (e) {
    e.preventDefault();
})


let sendData = () => {
    // console.log(geom.toGeoJSON());
    if (geom == "") {
        $("#warningmodal").modal("show")
    } else {
        const obj = {
            data: {
                userid: userid,
                orgname: $('#orgname').val(),
                orgcontact: $('#orgcontact').val(),
                orgtel: $('#orgtel').val(),
                orgemail: $('#orgemail').val(),
                orgline: $('#orgline').val(),
                orgfacebook: $('#orgfacebook').val(),
                website: $('#website').val(),
                headname: $('#headname').val(),
                headvno: $('#headvno').val(),
                headvmoo: $('#headvmoo').val(),
                headvname: $('#headvname').val(),
                headpro: $('#headpro').val(),
                headamp: $('#headamp').val(),
                headtam: $('#headtam').val(),
                orgvno: $('#orgvno').val(),
                orgvmoo: $('#orgvmoo').val(),
                orgvname: $('#orgvname').val(),
                orgpro: $('#orgpro').val(),
                orgamp: $('#orgamp').val(),
                orgtam: $('#orgtam').val(),
                lat: $('#lat').val(),
                lon: $('#lon').val(),
                orgtype: $('#orgtype').val(),
                typ_commutrav: $("#typ_commutrav").is(":checked") ? $("#typ_commutrav").val() : '',
                typ_commucomfort: $("#typ_commucomfort").is(":checked") ? $("#typ_commucomfort").val() : '',
                typ_commulearn: $("#typ_commulearn").is(":checked") ? $("#typ_commulearn").val() : '',
                typ_commuforest: $("#typ_commuforest").is(":checked") ? $("#typ_commuforest").val() : '',
                typ_houseforest: $("#typ_houseforest").is(":checked") ? $("#typ_houseforest").val() : '',
                typ_mangforest: $("#typ_mangforest").is(":checked") ? $("#typ_mangforest").val() : '',
                typ_watmanage: $("#typ_watmanage").is(":checked") ? $("#typ_watmanage").val() : '',
                typ_landmange: $("#typ_landmange").is(":checked") ? $("#typ_landmange").val() : '',
                typ_fishing: $("#typ_fishing").is(":checked") ? $("#typ_fishing").val() : '',
                typ_industwaste: $("#typ_industwaste").is(":checked") ? $("#typ_industwaste").val() : '',
                typ_housewaste: $("#typ_housewaste").is(":checked") ? $("#typ_housewaste").val() : '',
                typ_airpollution: $("#typ_airpollution").is(":checked") ? $("#typ_airpollution").val() : '',
                typ_noisepollution: $("#typ_noisepollution").is(":checked") ? $("#typ_noisepollution").val() : '',
                typ_other: $("#typ_other").is(":checked") ? $("#typ_other").val() : '',
                orgtypeother: $('#orgtypeother').val(),
                orgstatus: $('#orgstatus').val(),
                orgtarget: $('#orgtarget').val(),
                orgwork: $('#orgwork').val(),
                orgoutput: $('#orgoutput').val(),
                orgreportor: $('#orgreportor').val(),
                img: dataurl ? dataurl : dataurl = "",
                geom: geom == "" ? "" : geom.toGeoJSON()
            }
        }
        // console.log(obj);
        axios.post(url + "/org-api/insert", obj).then((r) => {
            r.data.data == "success" ? $("#okmodal").modal("show") : null
        })
    }


    return false;
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

$("#headpro").change(e => {
    // console.log(e.target.value);
    axios.get(url + "/eec-api/get-th-amp/" + e.target.value).then(r => {
        $("#headamp").empty()
        $("#headtam").empty()
        $("#headamp").append(`<option value=""></option>`)
        r.data.data.map(i => {
            $("#headamp").append(`<option value="${i.ap_idn}">${i.amp_name}</option>`)
        })
    })
})

$("#headamp").change(e => {
    axios.get(url + "/eec-api/get-th-tam/" + e.target.value).then(r => {

        console.log(r);
        $("#headtam").empty()
        $("#headtam").append(`<option value=""></option>`)
        r.data.data.map(i => {
            $("#headtam").append(`<option value="${i.tb_idn}">${i.tam_name}</option>`)
        })
    })
})

$("#orgpro").change(e => {
    // console.log(e.target.value);
    axios.get(url + "/eec-api/get-th-amp/" + e.target.value).then(r => {
        $("#orgamp").empty()
        $("#orgtam").empty()
        $("#orgamp").append(`<option value=""></option>`)
        r.data.data.map(i => {
            $("#orgamp").append(`<option value="${i.ap_idn}">${i.amp_name}</option>`)
        })
    })
})

$("#orgamp").change(e => {
    axios.get(url + "/eec-api/get-th-tam/" + e.target.value).then(r => {

        // console.log(r);
        $("#orgtam").empty()
        $("#orgtam").append(`<option value=""></option>`)
        r.data.data.map(i => {
            $("#orgtam").append(`<option value="${i.tb_idn}">${i.tam_name}</option>`)
        })
    })
})








