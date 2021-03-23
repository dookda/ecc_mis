$(document).ready(() => {
    loadMap();
    loadMap2();
});

let latlng = {
    lat: 16.820378,
    lng: 100.265787
}

let gps = "";
let gps2 = "";

const url = 'http://localhost:3700';
// const url = "https://eec-onep.online:3700";

let loadMap = () => {
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

    let onLocationFound = (e) => {
        if (gps) {
            map.removeLayer(gps);
        }
        gps = L.marker(e.latlng, {
            draggable: false,
            name: 'p'
        }).addTo(map);
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
        if (gps) {
            map.removeLayer(gps);
        }
        lc.stop();
        gps = L.marker(e.latlng, {
            draggable: false,
            name: 'p'
        }).addTo(map);
    });
}


let loadMap2 = () => {
    let map = L.map('map2', {
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

    let onLocationFound = (e) => {
        if (gps2) {
            map.removeLayer(gps2);
        }
        gps2 = L.marker(e.latlng, {
            draggable: false,
            name: 'p'
        }).addTo(map);
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
        if (gps2) {
            map.removeLayer(gps2);
        }
        lc.stop();
        gps2 = L.marker(e.latlng, {
            draggable: false,
            name: 'p'
        }).addTo(map);
    });
}

$("#other_div").hide()
$("#occu").change(() => {
    $("#occu").val() == "อื่นๆ" ? $("#other_div").show() : $("#other_div").hide();
})

$("#s_rice3_div").hide()
$("#s_rice3").change(() => {
    $("#s_rice3").is(':checked') ? $("#s_rice3_div").show() : $("#s_rice3_div").hide();
})

$("#b_rice3_div").hide()
$("#b_rice3").change(() => {
    $("#b_rice3").is(':checked') ? $("#b_rice3_div").show() : $("#b_rice3_div").hide();
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

            ricesource: $("#ricesource").val(),
            s_rice1: $('#s_rice1').is(':checked') ? "ใช่" : "",
            s_rice2: $("#s_rice2").is(':checked') ? "ใช่" : "",
            s_rice3: $("#s_rice3").is(':checked') ? $("#s_rice3_other").val() ? $("#s_rice3_other").val() : "" : "",
            geom_s: gps == "" ? "" : gps.toGeoJSON(),

            prod1: $("#prod1").val(),
            prod2: $("#prod2").val(),
            s_store: $("#s_store").val(),
            b_rice1: $("#b_rice1").is(':checked') ? "ใช่" : "",
            b_rice2: $("#b_rice2").is(':checked') ? "ใช่" : "",
            b_rice3: $("#b_rice3").is(':checked') ? $("#b_rice3_other").val() ? $("#b_rice3_other").val() : "" : "",
            b_vol: $("#b_vol").val(),
            b_store: $("#b_store").val(),
            geom_b: gps2 == "" ? "" : gps2.toGeoJSON()
        }
    }
    console.log(obj.data);
    axios.post(url + "/fm-api/insert", obj).then((r) => {
        $('#myform')[0].reset();
        $("#myModal").modal("show")
        // refreshPage()
    })
    return false;
}

let refreshPage = () => {
    location.href = "./../report/index.html";
}










