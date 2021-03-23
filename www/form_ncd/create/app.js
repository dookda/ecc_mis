$(document).ready(() => {
    loadMap();
});

let latlng = {
    lat: 16.820378,
    lng: 100.265787
}
let map = L.map('map', {
    center: latlng,
    zoom: 13
});
let marker;
let gps = "";

const url = 'http://localhost:3700';
// const url = "https://eec-onep.online:3700";

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

let onLocationFound = (e) => {
    // latLng = e.latlng;
    if (gps) {
        map.removeLayer(gps);
    }

    gps = L.marker(e.latlng, {
        draggable: true,
        name: 'p'
    });
    gps.addTo(map);
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

let rmLyr = () => {
    map.eachLayer(lyr => {
        if (lyr.options.name == 'marker') {
            map.removeLayer(lyr)
        }
    })
}

map.on('click', (e) => {
    console.log(e)
    if (gps) {
        map.removeLayer(gps);
    }

    gps = L.marker(e.latlng, {
        draggable: true,
        name: 'p'
    });
    gps.addTo(map);
    gps.on('dragend', (e) => {
    })
});

$("#other_div").hide()
$("#occu").change(() => {
    $("#occu").val() == "อื่นๆ" ? $("#other_div").show() : $("#other_div").hide();
})

$("#ncd25_div").hide()
$("#ncd25").change(() => {
    $("#ncd25").is(':checked') ? $("#ncd25_div").show() : $("#ncd25_div").hide();
})

let insertData = () => {
    const obj = {
        data: {
            sex: $("#sex").val(),
            edu: $("#edu").val(),
            occu: $("#occu_other").val() ? $("#occu_other").val() : $("#occu").val(),
            member: $("#member").val(),
            income: $("#income").val(),
            outcome: $("#outcome").val(),
            weight: $("#weight").val(),
            heigth: $("#heigth").val(),
            ncd1: $('input[name="ncd1"]:checked').val(),
            ncd2: $('input[name="ncd2"]:checked').val(),
            ncd3: $('input[name="ncd3"]:checked').val(),
            ncd4: $('input[name="ncd4"]:checked').val(),
            ncd5: $('input[name="ncd5"]:checked').val(),
            ncd6: $('input[name="ncd6"]:checked').val(),
            ncd7: $('input[name="ncd7"]:checked').val(),
            ncd8: $('input[name="ncd8"]:checked').val(),
            ncd9: $('input[name="ncd9"]:checked').val(),
            ncd10: $('#ncd10').is(':checked') ? "ใช่" : "ไม่ใช่",
            ncd11: $("#ncd11").is(':checked') ? "ใช่" : "ไม่ใช่",
            ncd12: $("#ncd12").is(':checked') ? "ใช่" : "ไม่ใช่",
            ncd13: $("#ncd13").is(':checked') ? "ใช่" : "ไม่ใช่",
            ncd14: $("#ncd14").is(':checked') ? "ใช่" : "ไม่ใช่",
            ncd15: $("#ncd15").is(':checked') ? "ใช่" : "ไม่ใช่",
            ncd16: $("#ncd16").is(':checked') ? "ใช่" : "ไม่ใช่",
            ncd17: $("#ncd17").is(':checked') ? "ใช่" : "ไม่ใช่",
            ncd18: $("#ncd18").is(':checked') ? "ใช่" : "ไม่ใช่",
            ncd19: $("#ncd19").is(':checked') ? "ใช่" : "ไม่ใช่",
            ncd20: $("#ncd20").is(':checked') ? "ใช่" : "ไม่ใช่",
            ncd21: $("#ncd21").is(':checked') ? "ใช่" : "ไม่ใช่",
            ncd22: $("#ncd22").is(':checked') ? "ใช่" : "ไม่ใช่",
            ncd23: $("#ncd23").is(':checked') ? "ใช่" : "ไม่ใช่",
            ncd24: $("#ncd24").is(':checked') ? "ใช่" : "ไม่ใช่",
            ncd25: $("#ncd25").is(':checked') ? $("#ncd25_other").val() ? $("#ncd25_other").val() : "ไม่มี" : "ไม่มี",
            geom: gps == "" ? "" : gps.toGeoJSON()
        }
    }
    console.log(obj.data);
    axios.post(url + "/ncd-api/insert", obj).then((r) => {
        $('#myform')[0].reset();
        $("#myModal").modal("show")
        // refreshPage()
    })
    return false;
}

let refreshPage = () => {
    location.href = "./../report/index.html";
}










