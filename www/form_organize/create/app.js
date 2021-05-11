

let latlng = {
    lat: 16.820378,
    lng: 100.265787
}

const url = 'http://localhost:3700';
// const url = "https://eec-onep.online:3700";
let userid;
let dataurl;
let geom;
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

var lc = L.control.locate({
    position: 'topleft',
    strings: {
        title: ""
    },
    locateOptions: {
        enableHighAccuracy: true,
    }
}).addTo(map);

lc.start();

map.on('click', (e) => {
    if (geom) {
        map.removeLayer(geom);
    }
    lc.stop();
    geom = L.marker(e.latlng, {
        draggable: false,
        name: 'p'
    }).addTo(map);

    $("#lat").val(e.latlng.lat)
    $("#lon").val(e.latlng.lng)
});


let sendData = () => {
    console.log(geom.toGeoJSON());
    const obj = {
        data: {
            userid: userid,
            orgname: $('#orgname').val(),
            orgcontact: $('#orgcontact').val(),
            orgtel: $('#orgtel').val(),
            orgemail: $('#orgemail').val(),
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
    console.log(obj);
    axios.post(url + "/org-api/insert", obj).then((r) => {
        r.data.data == "success" ? $("#okmodal").modal("show") : null
    })
    // if (geom.length > 0) {
    //     axios.post(url + "/org-api/insert", obj).then((r) => {
    //         console.log(r);
    //         r.data.data == "success" ? $("#okmodal").modal("show") : null
    //     })
    // } else {
    //     $("#modal").modal("show");
    // }
    return false;
}

let gotoList = () => {
    location.href = "./../report/index.html";
}

let refreshPage = () => {
    location.reload(true);
}

$('#imgfile').change(function (evt) {
    console.log(evt);
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

let selAmp = (e) => {
    console.log(e)
    axios.get(url + "/")
}

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
                var MAX_WIDTH = 600;
                var MAX_HEIGHT = 600;
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











