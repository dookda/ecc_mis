let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
$("#usrname").text(urname);
urid ? null : location.href = "./../../form_register/login/index.html";

if (eecauth !== "admin" && eecauth !== "office") {
    location.href = "./../../form_register/login/index.html";
}

let userid;

let main = async () => {
    await liff.init({ liffId: "1655648770-JLXzogag" })
    if (liff.isLoggedIn()) {
        getUserProfile()
    } else {
        liff.login()
    }
}

// main()

let getUserProfile = async () => {
    const profile = await liff.getProfile();
    $('#profile').attr('src', await profile.pictureUrl);
    $('#userId').text(profile.userId);
    $('#statusMessage').text(await profile.statusMessage);
    $('#displayName').text(await profile.displayName);
    userid = profile.userId;
}

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

let dataurl;

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
    "ขอบจังหวัด": pro
}

L.control.layers(baseMap, overlayMap).addTo(map);
var lat;
var lng;
let gps;
let onLocationFound = (e) => {
    // nearData(e)
    // latlng = e.latlng;
    // lat = e.latlng.lat;
    // lng = e.latlng.lng;
    // console.log(e.latlng)
    // $('#lat').val(e.latlng.lat);
    // $('#lng').val(e.latlng.lng);
    // changeLatlng(e.latlng);
}
function changeLatlng(latlng) {
    // console.log(latlng)
    // gps = L.marker(latlng, {
    //     draggable: true,
    //     name: 'p'
    // });
    // gps.addTo(map).bindPopup("คุณอยู่ที่นี่").openPopup();
    // gps.on('dragend', (e) => {
    //     console.log(e)
    //     $('#lat').val(e.target._latlng.lat);
    //     $('#lng').val(e.target._latlng.lng);
    // })

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

map.pm.addControls({
    position: 'topleft',
    drawMarker: true,
    drawCircle: false,
    drawPolyline: false,
    drawRectangle: false,
    drawCircleMarker: false,
    cutPolygon: false
});

var datageom
let geom = [];
let datlatlon = [];
let latlon = []
map.on('pm:create', e => {
    var data = e.layer.toGeoJSON()
    var pd = data.geometry.coordinates
    // var setlocation = [];
    // setlocation.push({
    //     "lat": pd[1],
    //     "lng": pd[0],
    // })
    datlatlon.push({
        "lat": pd[1],
        "lng": pd[0],
    })
    $('#lat').val(pd[1]);
    $('#lon').val(pd[0]);
    geom.push({
        "geom": e.layer.toGeoJSON(),
    });
    datageom = e.layer.toGeoJSON();
});

let refreshPage = () => {
    location.reload(true);
}

$('#imgfile').change(function (evt) {
    // console.log(evt);
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


function saveData() {
    let data = [{
        // data: val ? val : val = '99',
        staid: $("#staid").val(),
        staname: $("#staname").val(),
        tambon: $("#tambon").val(),
        amphoe: $("#amphoe").val(),
        prov: $("#province").val(),
        senid: $("#senid").val(),
        sencode: $("#senname").val(),
        gwyear: $("#gwyear").val() ? $("#gwyear").val() : "0000",
        gwdate: $("#gwdate").val() ? $("#gwdate").val() : "",
        lat: $('#lat').val(),
        lng: $('#lon').val(),
        record: $("#record").val() ? $("#record").val() : '',
        //1
        ph: $("#ph").val() ? $("#ph").val() : '0',
        ec: $("#ec").val() ? $("#ec").val() : '0',
        tb: $("#td").val() ? $("#td").val() : '0',
        wc: $("#wc").val() ? $("#wc").val() : '0',
        cal: $("#cal").val() ? $("#cal").val() : '0',
        magne: $("#magne").val(),
        sodium: $("#sodium").val(),
        pota: $("#pota").val(),
        fe: $("#fe").val() ? $("#fe").val() : '0',
        mnn: $("#mnn").val() ? $("#mnn").val() : '0',
        so4: $("#so4").val() ? $("#so4").val() : '0',
        cl: $("#cl").val() ? $("#cl").val() : '0',
        fluor: $("#fluor").val() ? $("#fluor").val() : '0',
        no3: $("#no3").val() ? $("#no3").val() : '0',
        ts: $("#ts").val() ? $("#ts").val() : '0',
        //2
        cu: $("#cu").val() ? $("#cu").val() : '0',
        zn: $("#zn").val() ? $("#zn").val() : '0',
        ars: $("#ars").val() ? $("#ars").val() : '0',
        pb: $("#pb").val() ? $("#pb").val() : '0',
        cd: $("#cd").val() ? $("#cd").val() : '0',
        cm: $("#cm").val() ? $("#cm").val() : '0',
        hg: $("#hg").val() ? $("#hg").val() : '0',
        se: $("#se").val() ? $("#se").val() : '0',
        nc: $("#nc").val() ? $("#nc").val() : '0',
        sv: $("#sv").val() ? $("#sv").val() : '0',
        br: $("#br").val() ? $("#br").val() : '0',
        cn: $("#cn").val() ? $("#cn").val() : '0',
        geom: datageom ? datageom : '',
        id_date: Date.now(),
        id_user: urname,
        id_userid: urid,
    }]
    // console.log(obj)
    sendData(data)
}

let sendData = (data) => {
    const obj = {
        data: data
    }
    // console.log(obj)
    // var url = "http://localhost:3000"
    var url = "https://eec-onep.online:3700";
    $.post(url + "/form_gw/insert", obj).done((r) => {
        r.data.data == "success"
    })
}

