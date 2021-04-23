$(document).ready(() => {
    loadMap1();
    loadMap2();
    loadMap3();
});

let latlng = {
    lat: 16.820378,
    lng: 100.265787
}

let gps1 = "";
let gps2 = "";
let gps3 = "";

// const url = 'http://localhost:3700';
const url = "https://eec-onep.online:3700";

let loadMap1 = () => {
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
        if (gps1) {
            map.removeLayer(gps1);
        }
        gps1 = L.marker(e.latlng, {
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
        if (gps1) {
            map.removeLayer(gps1);
        }
        lc.stop();
        gps1 = L.marker(e.latlng, {
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
        "Google Hybrid": ghyb.addTo(map)
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


let loadMap3 = () => {
    let map = L.map('map3', {
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
        "Google Hybrid": ghyb.addTo(map)
    }
    var overlayMap = {
        "ขอบเขตจังหวัด": pro
    }
    L.control.layers(baseMap, overlayMap, { collapsed: false, }).addTo(map);

    let onLocationFound = (e) => {
        if (gps3) {
            map.removeLayer(gps3);
        }
        gps3 = L.marker(e.latlng, {
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
        if (gps3) {
            map.removeLayer(gps3);
        }
        lc.stop();
        gps3 = L.marker(e.latlng, {
            draggable: false,
            name: 'p'
        }).addTo(map);
    });
}

$("#ncd25_div").hide()
$("#ncd25").change(() => {
    $("#ncd25").is(':checked') ? $("#ncd25_div").show() : $("#ncd25_div").hide();
})

$("#produce_div1").show()
$("#produce_div2").show()
$("#produce_div3").show()

$("#ricesource").change(() => {
    if ($("#ricesource").val() == "ผลิต/ปลูกเอง") {
        $("#produce_div1").show()
        $("#produce_div2").show()
        $("#produce_div3").hide()
    } else if ($("#ricesource").val() == "ซื้อ") {
        $("#produce_div1").hide()
        $("#produce_div2").hide()
        $("#produce_div3").show()
    } else {
        $("#produce_div1").show()
        $("#produce_div2").show()
        $("#produce_div3").show()
    }
})

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
            edu: $("#age").val(),
            edu: $("#edu").val(),
            occu: $("#occu_other").val() ? $("#occu_other").val() : $("#occu").val(),
            member: $("#member").val(),
            income: $("#income").val(),
            outcome: $("#outcome").val(),
            geom_m: gps3 == "" ? "" : gps3.toGeoJSON(),

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

            ricesource: $("#ricesource").val(),
            s_rice1: $('#s_rice1').is(':checked') ? "ใช่" : "",
            s_rice2: $("#s_rice2").is(':checked') ? "ใช่" : "",
            s_rice3: $("#s_rice3").is(':checked') ? $("#s_rice3_other").val() ? $("#s_rice3_other").val() : "" : "",

            prod1: $("#prod1").val(),
            prod2: $("#prod2").val(),
            s_store: $("#s_store").val(),
            s_moo: $("#s_moo").val(),
            s_tam: $("#s_tam").val(),
            s_amp: $("#s_amp").val(),
            s_pro: $("#s_pro").val(),
            geom_s: gps1 == "" ? "" : gps1.toGeoJSON(),

            b_rice1: $("#b_rice1").is(':checked') ? "ใช่" : "",
            b_rice2: $("#b_rice2").is(':checked') ? "ใช่" : "",
            b_rice3: $("#b_rice3").is(':checked') ? $("#b_rice3_other").val() ? $("#b_rice3_other").val() : "" : "",
            b_vol: $("#b_vol").val(),
            b_store: $("#b_store").val(),
            b_moo: $("#b_moo").val(),
            b_tam: $("#b_tam").val(),
            b_amp: $("#b_amp").val(),
            b_pro: $("#b_pro").val(),
            geom_b: gps2 == "" ? "" : gps2.toGeoJSON(),
            other: $("#other").val(),
        }
    }
    // console.log(obj.data);
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










