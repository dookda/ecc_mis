let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let f_green = sessionStorage.getItem('f_green');

if (f_green == 'false') {
    location.href = "./../../form_register/login/index.html";
}

$("#usrname").text(urname);

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

let onLocationFound = (e) => {
    // if (gps1) {
    //     map.removeLayer(gps1);
    // }
    // gps1 = L.marker(e.latlng, {
    //     draggable: false,
    //     name: 'p'
    // }).addTo(map);
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

// lc.start();

map.pm.addControls({
    position: 'topleft',
    drawMarker: false,
    drawCircle: false,
    drawPolyline: false,
    drawRectangle: true,
    drawCircleMarker: false,
    cutPolygon: false,
    editMode: true,
    dragMode: false,
    removalMode: true,
});

let geom = "";
let dataurl = "";
// $("#form").hide()

let onEachFeature = (fc, lyr) => {
    // console.log(fc)
    if (fc.properties) {
        // console.log(fc.properties)
        lyr.bindPopup(`<b>${fc.properties.gr_name}</b><br>
            ต.${fc.properties.tambon} อ.${fc.properties.amphoe} จ.${fc.properties.prov}<br>
            ${fc.properties.type} ${fc.properties.sup_type}<br>
            จำนวนต้นไม้ ${fc.properties.tree}<br>
        `)
    }
}

map.on('pm:create', e => {
    geom = e.layer.toGeoJSON();
});

$('#gr_name').on("input", function () {
    if (this.value == '') {
        $("#gr_name").addClass("is-invalid")
        console.log("false")
    } else {
        $("#gr_name").removeClass("is-invalid")
        console.log("true")
    }
})
$('#type').on("input", function () {
    if (this.value == '') {
        $("#type").addClass("is-invalid")
        console.log("false")
    } else {
        $("#type").removeClass("is-invalid")
        console.log("true")
    }
})
$('#agency').on("input", function () {
    if (this.value == '') {
        $("#agency").addClass("is-invalid")
        console.log("false")
    } else {
        $("#agency").removeClass("is-invalid")
        console.log("true")
    }
})
$('#pro').on("input", function () {
    if (this.value == '') {
        $("#pro").addClass("is-invalid")
        console.log("false")
    } else {
        $("#pro").removeClass("is-invalid")
        console.log("true")
    }
})

$('#amp').on("input", function () {
    if (this.value == '') {
        $("#amp").addClass("is-invalid")
        console.log("false")
    } else {
        $("#amp").removeClass("is-invalid")
        console.log("true")
    }
})

$('#tam').on("input", function () {
    if (this.value == '') {
        $("#tam").addClass("is-invalid")
        console.log("false")
    } else {
        $("#tam").removeClass("is-invalid")
        console.log("true")
    }
})


let sendData = () => {
    // console.log(geom[0]);
    if ($('#gr_name').val() == "" || $('#type').val() == "" || $('#agency').val() == "" || $('#pro').val() == "" || $('#amp').val() == "" || $('#tam').val() == "") {
        $("#NOdatamodal").modal("show")
        if ($('#gr_name').val() == "") {
            $("#gr_name").addClass("is-invalid")
        }
        if ($('#type').val() == "") {
            $("#type").addClass("is-invalid")
        }
        if ($('#agency').val() == "") {
            $("#agency").addClass("is-invalid")
        }
        if ($('#pro').val() == "") {
            $("#pro").addClass("is-invalid")
        }
        if ($('#amp').val() == "") {
            $("#amp").addClass("is-invalid")
        }
        if ($('#tam').val() == "") {
            $("#tam").addClass("is-invalid")
        }
    } else if ($('#gr_name').val() !== "" || $('#type').val() !== "" || $('#agency').val() == "" || $('#pro').val() == "" || $('#amp').val() == "" || $('#tam').val() == "") {
        const obj = {
            data: {
                usrid: urid,
                usrname: urname,
                gr_name: $('#gr_name').val(),
                prov_nam_t: $('#pro_name').val(),
                amphoe_t: $('#amp_name').val(),
                tam_nam_t: $('#tam_name').val(),
                prov_code: $('#pro').val(),
                amphoe_idn: $('#amp').val(),
                tambon_idn: $('#tam').val(),
                type: $('#type').val(),
                rai: $('#rai').val(),
                tree: $('#tree').val(),
                tree_name: $('#tree_name').val(),
                agency: $('#agency').val(),
                img: dataurl ? dataurl : dataurl = "",
                geom: geom == "" ? "" : geom
            }
        }

        if (geom != "") {
            axios.post(url + "/green-api/insert", obj).then((r) => {
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

let removeLayer = () => {
    map.eachLayer(i => {
        // console.log(i);
        i.options.name == "bnd" ? map.removeLayer(i) : null;
    })
}

var boundStyle = {
    "color": "#ff7800",
    "fillColor": "#fffcf5",
    "weight": 5,
    "opacity": 0.45,
    "fillOpacity": 0.25
};

let getAmp = (e) => {
    removeLayer();
    axios.get(`${url}/eec-api/get-bound/pro/${e}`).then(async (r) => {
        let geojson = await JSON.parse(r.data.data[0].geom);
        // console.log(geojson);
        let a = L.geoJSON(geojson, {
            style: boundStyle,
            name: "bnd"
        }).addTo(map);
        map.fitBounds(a.getBounds());
    })
    axios.get(url + "/eec-api/get-th-amp/" + e).then(r => {
        $("#amp").empty()
        $("#tam").empty()
        $("#amp").append(`<option value=""></option>`)
        r.data.data.map(i => {
            $("#amp").append(`<option value="${i.ap_idn}">${i.amp_name}</option>`)
        })
    })
}

let getTam = (e) => {
    removeLayer();
    axios.get(`${url}/eec-api/get-bound/amp/${e}`).then(async (r) => {
        let geojson = await JSON.parse(r.data.data[0].geom);
        // console.log(geojson);
        let a = L.geoJSON(geojson, {
            style: boundStyle,
            name: "bnd"
        }).addTo(map);
        map.fitBounds(a.getBounds());
    })

    axios.get(url + "/eec-api/get-th-tam/" + e).then(r => {
        // console.log(r);
        $("#tam").empty()
        $("#tam").append(`<option value=""></option>`)
        r.data.data.map(i => {
            $("#tam").append(`<option value="${i.tb_idn}">${i.tam_name}</option>`)
        })
    })
}

let getTamOne = (e) => {
    removeLayer();
    axios.get(`${url}/eec-api/get-bound/tam/${e}`).then(async (r) => {
        let geojson = await JSON.parse(r.data.data[0].geom);
        // console.log(geojson);
        let a = L.geoJSON(geojson, {
            style: boundStyle,
            name: "bnd"
        }).addTo(map);
        map.fitBounds(a.getBounds());
    })

    axios.get(url + "/eec-api/get-th-onetam/" + e).then(r => {
        r.data.data.map(i => {
            // console.log(i);
            $("#pro_name").val('จ.' + i.pro_name);
            $("#amp_name").val('อ.' + i.amp_name);
            $("#tam_name").val('ต.' + i.tam_name);
        })
    })
}


