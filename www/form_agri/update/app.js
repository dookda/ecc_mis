let userid;

let main = async () => {
    await liff.init({ liffId: "1655648770-JLXzogag" })
    if (liff.isLoggedIn()) {
        getUserProfile()
    } else {
        liff.login()
    }
}

main()

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

let ag_id = sessionStorage.getItem('ag_id');

console.log(ag_id);

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

let getSite = () => {
    axios.post(url + "/agi-api/getone", { ag_id: ag_id }).then(r => {
        console.log(r);
        var myStyle = {
            "color": "#ff7800",
            "weight": 5,
            "opacity": 0.65
        };

        let site = L.geoJSON(JSON.parse(r.data.data[0].geojson), {
            style: myStyle
        }).addTo(map);

        map.fitBounds(site.getBounds());
    })
}

getSite()

let dataurl;
let wat = 0;
let fer = 0;
let pes = 0;

let getWat = (x) => {
    wat = x
    if (x == 0) {
        $("#wat0").addClass("_border")
        $("#wat1").removeClass("_border")
    }
    if (x == 1) {
        $("#wat0").removeClass("_border")
        $("#wat1").addClass("_border")
    }
}

let getFer = (x) => {
    fer = x
    if (x == 0) {
        $("#fer0").addClass("_border")
        $("#fer1").removeClass("_border")
    }
    if (x == 1) {
        $("#fer0").removeClass("_border")
        $("#fer1").addClass("_border")
    }
}

let getPes = (x) => {
    pes = x
    if (x == 0) {
        $("#pes0").addClass("_border")
        $("#pes1").removeClass("_border")
    } else {
        $("#pes0").removeClass("_border")
        $("#pes1").addClass("_border")
    }
}

let gotoList = () => {
    // location.reload(true);
    location.href = "./../list/index.html";
}

let sendData = () => {
    const obj = {
        ag_id: ag_id,
        data: {
            userid: userid,
            wat: wat,
            fer: fer,
            pes: pes,
            img: dataurl ? dataurl : dataurl = "",
        }
    }

    axios.post(url + "/agi-api/update", obj).then((r) => {
        r.data.data == "success" ? $("#okmodal").modal("show") : null
    })
    return false;
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




