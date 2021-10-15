let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let f_seawater_qua = sessionStorage.getItem('f_seawater_qua');

if (f_seawater_qua == 'false') {
    location.href = "./../../form_register/login/index.html";
}

$("#usrname").text(urname);

let sq_id = sessionStorage.getItem('sq_gid');
let fromAdmin = sessionStorage.getItem('sq_from_admin');

let link;
if (fromAdmin) {
    link = "./../report_admin/index.html"
    sessionStorage.removeItem('sq_from_admin');
} else {
    link = "./../report/index.html"
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
    // maxZoom: 18,
    // minZoom: 14,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const amp = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__02_amphoe_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 14,
    // minZoom: 10,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const pro = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__01_prov_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 10,
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

axios.post(url + "/sq-api/getone", { sq_id: sq_id }).then(r => {
    // console.log(sq_id);
    $('#sq_date').val(r.data.data[0].date);
    $('#sq_time').val(r.data.data[0].sq_time);
    $('#sq_order').val(r.data.data[0].sq_order);
    $('#sta_loc').val(r.data.data[0].sta_loc);
    // pro: $('#pro').val(),
    // amp: $('#amp').val(),
    // tam: $('#tam').val(),
    $('#sq_do').val(r.data.data[0].sq_do);
    $('#sq_tcb').val(r.data.data[0].sq_tcb);
    $('#sq_po43p').val(r.data.data[0].sq_po43p);
    $('#sq_no3n').val(r.data.data[0].sq_no3n);
    $('#sq_temp').val(r.data.data[0].sq_temp);
    $('#sq_ss').val(r.data.data[0].sq_ss);
    $('#sq_ph').val(r.data.data[0].sq_ph);
    $('#sq_nh3').val(r.data.data[0].sq_nh3);
    $('#sq_mwqi').val(r.data.data[0].sq_mwqi);
    $('#sq_pb').val(r.data.data[0].sq_pb);
    $("#preview").attr("src", r.data.data[0].img);
    $('#reporter').val(r.data.data[0].usrname);

    // console.log(r.data.data[0].geojson);

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

let sendData = () => {
    const obj = {
        sq_id: sq_id,
        data: {
            usrid: urid,
            usrname: urname,
            // sq_spname: $('#sq_spname').val(),
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
            // img: dataurl ? dataurl : dataurl = '',
            geom: geom ? geom.toGeoJSON().geometry : null
        }
    }
    // console.log(obj.data);
    axios.post(url + "/sq-api/update", obj).then((r) => {
        r.data.data == "success" ? $("#okmodal").modal("show") : null
        sessionStorage.removeItem('sq_id');
    })
    return false;
}

let gotoReport = () => {
    location.href = link;
    sessionStorage.removeItem('sq_id');
}

let refreshPage = () => {
    location.reload(true);
}







