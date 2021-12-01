let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');

if (urname) {
    $("#nav").append(`<li><a href="./../../form_register/profile/index.html"><i
        class="bi bi-person-square"></i>&nbsp;<span >${urname}</span>
      </a></li>
      <li><a href="./../../form_register/login/index.html"><i class="bi bi-box-arrow-right"></i>
      ออกจากระบบ</a></li>`);
} else {
    $("#nav").append(`
      <li><a href="./../../form_register/login/index.html"><i class="bi bi-box-arrow-right"></i>
      เข้าสู่ระบบ</a></li>`);
}
let Accept = sessionStorage.getItem('accept');
if (Accept || eecauth) {
    $('.toast').toast('hide')
}
else {
    $('.toast').toast('show')
}
$('#btnDeny').click(() => {
    // eraseCookie('allowCookies')
    $('.toast').toast('hide')
})
let setAccept
$('#btnAccept').click(() => {
    // setCookie('allowCookies','1',7)
    $('.toast').toast('hide')
    setAccept = sessionStorage.setItem('accept', 'Yes');
})

const url = "https://eec-onep.online:3700";
// const url = 'http://localhost:3700';

let latlng = {
    lat: 13.205567,
    lng: 101.783101
};

let map = L.map('map', {
    center: latlng,
    zoom: 8
});

const mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    name: "base",
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1
});

const esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    name: "base",
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 19
});

const ghyb = L.tileLayer('https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
    name: "base",
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

const grod = L.tileLayer("https://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}", {
    name: "base",
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"]
});

const gter = L.tileLayer('https://{s}.google.com/vt/lyrs=t,m&x={x}&y={y}&z={z}', {
    name: "base",
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

const ecobound = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__82_landscape",
    name: "lyr",
    format: "image/png",
    transparent: true,
    zIndex: 2
});

const lu = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__46_lu_eec_61",
    name: "lyr",
    format: "image/png",
    transparent: true,
    zIndex: 1
});

const muni = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__04_municiple",
    name: "lyr",
    format: "image/png",
    transparent: true,
    zIndex: 3
});

const tam = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__03_tambon_eec",
    name: "lyr",
    format: "image/png",
    transparent: true,
    zIndex: 3
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=22 OR pro_code=23 OR pro_code=24 OR pro_code=25 OR pro_code=26 OR pro_code=27'
});

const amp = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__02_amphoe_eec",
    name: "lyr",
    format: "image/png",
    transparent: true,
    zIndex: 3
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=22 OR pro_code=23 OR pro_code=24 OR pro_code=25 OR pro_code=26 OR pro_code=27'
});

const pro = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__01_prov_eec",
    name: "lyr",
    format: "image/png",
    transparent: true,
    zIndex: 4
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=22 OR pro_code=23 OR pro_code=24 OR pro_code=25 OR pro_code=26 OR pro_code=27'
});

const pcontrol = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__06_pollution_control",
    name: "lyr",
    format: "image/png",
    transparent: true,
    zIndex: 1
});

const vill = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__05_village",
    name: "lyr",
    format: "image/png",
    transparent: true,
    zIndex: 2
});
const pollu = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__81_pollution_eec",
    name: "lyr",
    iswms: "wms",
    format: "image/png",
    transparent: true
});



let lyrs = L.featureGroup().addTo(map)

let eecUrl = "https://eec-onep.online:8443/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&legend_options=fontName:Kanit&LAYER=";
// let rtiUrl = "https://rti2dss.com:8443/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=";


$("#luLegend").attr("src", eecUrl + "eec:a__46_lu_eec_61");
$("#munLegend").attr("src", eecUrl + "eec:a__04_municiple");
$("#proLegend").attr("src", eecUrl + "eec:a__01_prov_eec");
$("#ampLegend").attr("src", eecUrl + "eec:a__02_amphoe_eec");
$("#tamLegend").attr("src", eecUrl + "eec:a__03_tambon_eec");
$("#controlLegend").attr("src", eecUrl + "eec:a__06_pollution_control");
$("#meteoLegend").attr("src", "./marker-meteo/location-pin-green.svg");
$("#villLegend").attr("src", eecUrl + "eec:a__05_village");
$("#ecoboundLegend").attr("src", eecUrl + "eec:a__82_landscape");
$("#polluLegend").attr("src", eecUrl + "eec:a__81_pollution_eec");
$("#radarLegend").attr("src", "./img/radar.png");
$("#staaqiLegend").attr("src", "./marker/location-pin-blue.svg");
$("#aqiLegend").attr("src", eecUrl + "eec:aqi_v_pcd_aqi_d1.tif");
$("#pm25Legend").attr("src", eecUrl + "eec:pm25_v_pcd_aqi_d1.tif");
$("#pm10Legend").attr("src", eecUrl + "eec:pm10_v_pcd_aqi_d1.tif");
$("#coLegend").attr("src", eecUrl + "eec:co_v_pcd_aqi_d1.tif");
$("#o3Legend").attr("src", eecUrl + "eec:o3_v_pcd_aqi_d1.tif");
$("#no2Legend").attr("src", eecUrl + "eec:no2_v_pcd_aqi_d1.tif");
$("#so2Legend").attr("src", eecUrl + "eec:so2_v_pcd_aqi_d1.tif");

function onLocationFound(e) {
    // latLng = e.latlng;
    // nearData(e)
}

map.on("locationfound", onLocationFound);
// map.on("locationerror", onLocationError);
// map.locate({ setView: true, maxZoom: 19 });

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

let lyr = {
    tam: tam,
    amp: amp,
    pro: pro,
    vill: vill,
    lu: lu,
    muni: muni,
    pcontrol: pcontrol,
    ecobound: ecobound,
    pollu: pollu,
}

pro.addTo(map);
ecobound.addTo(map);

let formatDate = (a) => {
    let d = new Date();
    d.setDate(d.getDate() + a);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
}

const dd = 14;

for (let i = 1; i <= dd; i++) {
    let d = formatDate(i * (-1));
    $("#aqilist").append(`<option value="aqi_d${i}" >aqi วันที่ ${d}</option>`);
    lyr[`aqi_d${i}`] = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
        layers: `eec:aqi_v_pcd_aqi_d${i}.tif`,
        name: "aqilyr",
        format: "image/png",
        transparent: true,
        opacity: 0.7,
        zIndex: 2
    });

    $("#pm25list").append(`<option value="pm25_d${i}" >pm25 วันที่ ${d}</option>`);
    lyr[`pm25_d${i}`] = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
        layers: `eec:pm25_v_pcd_aqi_d${i}.tif`,
        name: "pm25lyr",
        format: "image/png",
        transparent: true,
        opacity: 0.7,
        zIndex: 2
    });

    $("#pm10list").append(`<option value="pm10_d${i}" >pm10 วันที่ ${d}</option>`);
    lyr[`pm10_d${i}`] = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
        layers: `eec:pm10_v_pcd_aqi_d${i}.tif`,
        name: "pm10lyr",
        format: "image/png",
        transparent: true,
        opacity: 0.7,
        zIndex: 2
    });
    $("#colist").append(`<option value="co_d${i}" >co วันที่ ${d}</option>`);
    lyr[`co_d${i}`] = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
        layers: `eec:co_v_pcd_aqi_d${i}.tif`,
        name: "colyr",
        format: "image/png",
        transparent: true,
        opacity: 0.7,
        zIndex: 2
    });

    $("#o3list").append(`<option value="o3_d${i}" >o3 วันที่ ${d}</option>`);
    lyr[`o3_d${i}`] = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
        layers: `eec:o3_v_pcd_aqi_d${i}.tif`,
        name: "o3lyr",
        format: "image/png",
        transparent: true,
        opacity: 0.7,
        zIndex: 2
    });

    $("#no2list").append(`<option value="no2_d${i}" >no2 วันที่ ${d}</option>`);
    lyr[`no2_d${i}`] = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
        layers: `eec:no2_v_pcd_aqi_d${i}.tif`,
        name: "no2lyr",
        format: "image/png",
        transparent: true,
        opacity: 0.7,
        zIndex: 2
    });

    $("#so2list").append(`<option value="so2_d${i}" >so2 วันที่ ${d}</option>`);
    lyr[`so2_d${i}`] = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
        layers: `eec:so2_v_pcd_aqi_d${i}.tif`,
        name: "so2lyr",
        format: "image/png",
        transparent: true,
        opacity: 0.7,
        zIndex: 2
    });
}

let base = {
    mapbox: mapbox.addTo(map),
    esri: esri,
    ghyb: ghyb,
    grod: grod,
    gter: gter
}

// L.control.layers(baseMap, overlayMap).addTo(map);
let refreshPage = () => {
    location.href = "./../report/index.html";
}

let getDetail = (e) => {
    sessionStorage.setItem('orgid', e);
    location.href = "./../detail/index.html";
}

$("#aqidiv").hide()
$("#t1-aqi").html(`AQI`)
let aqichk = false;
$("#aqilist").on("change", async (e) => {
    if (e.target.value) {
        aqichk = true;
        $("#t1-aqi").html(`<div style="text-align: center;">${e.target.selectedOptions[0].text}</div>`)
        $("#t2-aqi").html(`<div style="text-align: center;">${e.target.selectedOptions[0].text}</div>`)
        $("#t3-aqi").html(`<div style="text-align: center;">${e.target.selectedOptions[0].text}</div>`)
        $("#aqidiv").show()
        // $("#aqidiv").append(`
        //     <div class="card">
        //         <div class="card-body">
        //             <div class="hchart" id="aqichart"></div>
        //         </div>
        //     </div>`);
        $("#cardAQI").show()
        $("#cardAQI-2").show()
        $("#cardAQI-3").show()
        if (map.hasLayer(marker1) == true && map.hasLayer(marker2) == false && map.hasLayer(marker3) == false) {
            getM1()
        } else if (map.hasLayer(marker1) == true && map.hasLayer(marker2) == true && map.hasLayer(marker3) == false) {
            getM1()
            getM2()
        } else if (map.hasLayer(marker1) == true && map.hasLayer(marker2) == true && map.hasLayer(marker3) == true) {
            getM1()
            getM2()
            getM3()
        }
    } else {
        aqichk = false;
        $("#aqidiv").hide()
        $("#cardAQI").hide()
        $("#cardAQI-2").hide()
        $("#cardAQI-3").hide()
    }

    await map.eachLayer(i => {
        if (i.options.name == "aqilyr") {
            map.removeLayer(i)
        }
    })
    // console.log(e);
    e.target.value ? lyr[`${e.target.value}`].addTo(map) : null;
});

$("#pm25div").hide()
let pm25chk = false;
$("#pm25list").on("change", async (e) => {
    if (e.target.value) {
        pm25chk = true;
        $("#t1-pm25").html(`<div style="text-align: center;">${e.target.selectedOptions[0].text}</div>`)
        $("#t2-pm25").html(`<div style="text-align: center;">${e.target.selectedOptions[0].text}</div>`)
        $("#t3-pm25").html(`<div style="text-align: center;">${e.target.selectedOptions[0].text}</div>`)

        $("#pm25div").show();
        $("#cardPM25").show()
        $("#cardPM25-2").show()
        $("#cardPM25-3").show()
        if (map.hasLayer(marker1) == true && map.hasLayer(marker2) == false && map.hasLayer(marker3) == false) {
            getM1()
        } else if (map.hasLayer(marker1) == true && map.hasLayer(marker2) == true && map.hasLayer(marker3) == false) {
            getM1()
            getM2()
        } else if (map.hasLayer(marker1) == true && map.hasLayer(marker2) == true && map.hasLayer(marker3) == true) {
            getM1()
            getM2()
            getM3()
        }
    } else {
        pm25chk = false;
        $("#pm25div").hide()
        $("#cardPM25").hide()
        $("#cardPM25-2").hide()
        $("#cardPM25-3").hide()
    }
    await map.eachLayer(i => {
        if (i.options.name == "pm25lyr") {
            map.removeLayer(i)
        }
    })
    e.target.value ? lyr[`${e.target.value}`].addTo(map) : null;

});

$("#pm10div").hide()
let pm10chk = false;
$("#pm10list").on("change", async (e) => {
    if (e.target.value) {
        pm10chk = true;
        $("#t1-pm10").html(`<div style="text-align: center;">${e.target.selectedOptions[0].text}</div>`)
        $("#t2-pm10").html(`<div style="text-align: center;">${e.target.selectedOptions[0].text}</div>`)
        $("#t3-pm10").html(`<div style="text-align: center;">${e.target.selectedOptions[0].text}</div>`)

        $("#pm10div").show();
        $("#cardPM10").show()
        $("#cardPM10-2").show()
        $("#cardPM10-3").show()

        if (map.hasLayer(marker1) == true && map.hasLayer(marker2) == false && map.hasLayer(marker3) == false) {
            getM1()
        } else if (map.hasLayer(marker1) == true && map.hasLayer(marker2) == true && map.hasLayer(marker3) == false) {
            getM1()
            getM2()
        } else if (map.hasLayer(marker1) == true && map.hasLayer(marker2) == true && map.hasLayer(marker3) == true) {
            getM1()
            getM2()
            getM3()
        }
    } else {
        pm10chk = false;
        $("#pm10div").hide()
        $("#cardPM10").hide()
        $("#cardPM10-2").hide()
        $("#cardPM10-3").hide()
    }
    await map.eachLayer(i => {
        if (i.options.name == "pm10lyr") {
            map.removeLayer(i)
        }
    })
    e.target.value ? lyr[`${e.target.value}`].addTo(map) : null;
});
$("#codiv").hide()
let cochk = false;
$("#colist").on("change", async (e) => {
    if (e.target.value) {
        cochk = true;
        $("#t1-co").html(`<div style="text-align: center;">${e.target.selectedOptions[0].text}</div>`)
        $("#t2-co").html(`<div style="text-align: center;">${e.target.selectedOptions[0].text}</div>`)
        $("#t3-co").html(`<div style="text-align: center;">${e.target.selectedOptions[0].text}</div>`)

        $("#codiv").show();
        $("#cardCO").show()
        $("#cardCO-2").show()
        $("#cardCO-3").show()

        if (map.hasLayer(marker1) == true && map.hasLayer(marker2) == false && map.hasLayer(marker3) == false) {
            getM1()
        } else if (map.hasLayer(marker1) == true && map.hasLayer(marker2) == true && map.hasLayer(marker3) == false) {
            getM1()
            getM2()
        } else if (map.hasLayer(marker1) == true && map.hasLayer(marker2) == true && map.hasLayer(marker3) == true) {
            getM1()
            getM2()
            getM3()
        }
    } else {
        cochk = false;
        $("#codiv").hide()
        $("#cardCO").hide()
        $("#cardCO-2").hide()
        $("#cardCO-3").hide()
    }
    await map.eachLayer(i => {
        if (i.options.name == "colyr") {
            map.removeLayer(i)
        }
    })
    e.target.value ? lyr[`${e.target.value}`].addTo(map) : null;
});

$("#o3div").hide()
let o3chk = false;
$("#o3list").on("change", async (e) => {
    if (e.target.value) {
        o3chk = true;
        $("#t1-o3").html(`<div style="text-align: center;">${e.target.selectedOptions[0].text}</div>`)
        $("#t2-o3").html(`<div style="text-align: center;">${e.target.selectedOptions[0].text}</div>`)
        $("#t3-o3").html(`<div style="text-align: center;">${e.target.selectedOptions[0].text}</div>`)

        $("#o3div").show();
        $("#cardO3").show()
        $("#cardO3-2").show()
        $("#cardO3-3").show()

        if (map.hasLayer(marker1) == true && map.hasLayer(marker2) == false && map.hasLayer(marker3) == false) {
            getM1()
        } else if (map.hasLayer(marker1) == true && map.hasLayer(marker2) == true && map.hasLayer(marker3) == false) {
            getM1()
            getM2()
        } else if (map.hasLayer(marker1) == true && map.hasLayer(marker2) == true && map.hasLayer(marker3) == true) {
            getM1()
            getM2()
            getM3()
        }
    } else {
        o3chk = false;
        $("#o3div").hide()
        $("#cardO3").hide()
        $("#cardO3-2").hide()
        $("#cardO3-3").hide()
    }
    await map.eachLayer(i => {
        if (i.options.name == "o3lyr") {
            map.removeLayer(i)
        }
    })
    e.target.value ? lyr[`${e.target.value}`].addTo(map) : null;
});

$("#so2div").hide()
let so2chk = false;
$("#so2list").on("change", async (e) => {
    if (e.target.value) {
        so2chk = true;
        $("#t1-so2").html(`<div style="text-align: center;">${e.target.selectedOptions[0].text}</div>`)
        $("#t2-so2").html(`<div style="text-align: center;">${e.target.selectedOptions[0].text}</div>`)
        $("#t3-so2").html(`<div style="text-align: center;">${e.target.selectedOptions[0].text}</div>`)

        $("#so2div").show();
        $("#cardSO2").show()
        $("#cardSO2-2").show()
        $("#cardSO2-3").show()

        if (map.hasLayer(marker1) == true && map.hasLayer(marker2) == false && map.hasLayer(marker3) == false) {
            getM1()
        } else if (map.hasLayer(marker1) == true && map.hasLayer(marker2) == true && map.hasLayer(marker3) == false) {
            getM1()
            getM2()
        } else if (map.hasLayer(marker1) == true && map.hasLayer(marker2) == true && map.hasLayer(marker3) == true) {
            getM1()
            getM2()
            getM3()
        }
    } else {
        so2chk = false;
        $("#so2div").hide()
        $("#cardSO2").hide()
        $("#cardSO2-2").hide()
        $("#cardSO2-3").hide()
    }
    await map.eachLayer(i => {
        if (i.options.name == "so2lyr") {
            map.removeLayer(i)
        }
    })
    e.target.value ? lyr[`${e.target.value}`].addTo(map) : null;
});

$("#no2div").hide()
let no2chk = false;
$("#no2list").on("change", async (e) => {
    if (e.target.value) {
        no2chk = true;
        $("#t1-no2").html(`<div style="text-align: center;">${e.target.selectedOptions[0].text}</div>`)
        $("#t2-no2").html(`<div style="text-align: center;">${e.target.selectedOptions[0].text}</div>`)
        $("#t3-no2").html(`<div style="text-align: center;">${e.target.selectedOptions[0].text}</div>`)

        $("#no2div").show();
        $("#cardNO2").show()
        $("#cardNO2-2").show()
        $("#cardNO2-3").show()

        if (map.hasLayer(marker1) == true && map.hasLayer(marker2) == false && map.hasLayer(marker3) == false) {
            getM1()
        } else if (map.hasLayer(marker1) == true && map.hasLayer(marker2) == true && map.hasLayer(marker3) == false) {
            getM1()
            getM2()
        } else if (map.hasLayer(marker1) == true && map.hasLayer(marker2) == true && map.hasLayer(marker3) == true) {
            getM1()
            getM2()
            getM3()
        }
    } else {
        no2chk = false;
        $("#no2div").hide()
        $("#cardNO2").hide()
        $("#cardNO2-2").hide()
        $("#cardNO2-3").hide()
    }
    await map.eachLayer(i => {
        if (i.options.name == "no2lyr") {
            map.removeLayer(i)
        }
    })
    e.target.value ? lyr[`${e.target.value}`].addTo(map) : null;
});

$("input[type=checkbox]").change(async () => {
    await map.eachLayer(i => {
        if (i.options.name == "lyr") {
            map.removeLayer(i)
        }
    })

    let chk = [];
    await $('input[type=checkbox]:checked').each(function () {
        chk.push($(this).val());
    });

    chk.map(i => {
        if (lyr[`${i}`]) {
            lyr[`${i}`].addTo(map);
        }
        if (i == "radar") {
            initialize(apiData, optionKind);
        }

    })
})

$("input[name='basemap']").change(async (r) => {
    await map.eachLayer(i => {
        if (i.options.name == "base") {
            map.removeLayer(i)
        }
    })

    let basemap = $("input[name='basemap']:checked").val();
    base[`${basemap}`].addTo(map);
})

$("#hchart").html(`<div style="text-align: center;">คลิกลงบนแผนที่เพื่อดูอุณหภูมิแต่ละสัปดาห์</div>`)
let hchart = (dat, div, param, std) => {
    var a = dat
    var data = [];
    data.push(
        { "week": 1, "value": a[0].value },
        { "week": 2, "value": a[1].value },
        { "week": 3, "value": a[2].value },
        { "week": 4, "value": a[3].value },
        { "week": 5, "value": a[4].value },
        { "week": 6, "value": a[5].value },
        { "week": 7, "value": a[6].value },
        { "week": 8, "value": a[7].value },
        { "week": 9, "value": a[8].value },
        { "week": 10, "value": a[9].value },
        { "week": 11, "value": a[10].value },
        { "week": 12, "value": a[11].value },
        { "week": 13, "value": a[12].value },
        { "week": 14, "value": a[13].value })

    am4core.useTheme(am4themes_animated);
    var chart = am4core.create(div, am4charts.XYChart);
    chart.paddingRight = 20;
    chart.numberFormatter.numberFormat = "##.##";
    chart.legend = new am4charts.Legend();
    // chart.legend.useDefaultMarker = true;
    // var marker = chart.legend.markers.template.children.getIndex(0);
    // marker.cornerRadius(12, 12, 12, 12);
    // marker.strokeWidth = 2;
    // marker.strokeOpacity = 1;
    // marker.stroke = am4core.color("#ccc");

    // Add data
    chart.data = data;

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "week";
    categoryAxis.renderer.minGridDistance = 50;
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.startLocation = 0.5;
    categoryAxis.endLocation = 0.5;
    categoryAxis.title.text = "วันย้อนหลัง";
    categoryAxis.title.fontSize = 12;

    let label = categoryAxis.renderer.labels.template;
    label.truncate = true;
    label.maxWidth = 150;
    label.tooltipText = "วันที่ {categoryX}";

    // Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.baseValue = 0;
    valueAxis.title.text = param;
    valueAxis.title.fontSize = 12;

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "week";
    series.strokeWidth = 3;
    series.tensionX = 0.77;
    series.name = "จุดที่ 1";
    series.stroke = am4core.color("#DB6400");
    series.tooltip.getFillFromObject = false;
    series.tooltip.background.fill = am4core.color("#DB6400");
    // series.tooltipText = "week {categoryX}: {valueY}[/]";
    // bullet is added because we add tooltip to a bullet for it to change color
    var bullet = series.bullets.push(new am4charts.Bullet());
    bullet.tooltipText = "{valueY}";

    bullet.adapter.add("fill", function (fill, target) {
        if (target.dataItem.valueY > std) {
            return am4core.color("#FF0000");
        }
        return fill;
    })

    var range = valueAxis.createSeriesRange(series);
    range.value = std;
    range.endValue = 1000;
    range.contents.stroke = am4core.color("#FF0000");
    range.contents.fill = range.contents.stroke;

    // // Add scrollbar
    // var scrollbarX = new am4charts.XYChartScrollbar();
    // scrollbarX.series.push(series);
    // chart.scrollbarX = scrollbarX;

    chart.cursor = new am4charts.XYCursor();
}

let aqiLyr = 'aqi_v_pcd_aqi_d1.tif';
let pm25Lyr = 'pm25_v_pcd_aqi_d1.tif';
let pm10Lyr = 'pm10_v_pcd_aqi_d1.tif';
let coLyr = 'co_v_pcd_aqi_d1.tif';
let o3Lyr = 'o3_v_pcd_aqi_d1.tif';
let so2Lyr = 'so2_v_pcd_aqi_d1.tif';
let no2Lyr = 'no2_v_pcd_aqi_d1.tif';
let lyrLen;

for (let i = 2; i <= dd; i++) {
    aqiLyr += `,aqi_v_pcd_aqi_d${i}.tif`;
    pm25Lyr += `,pm25_v_pcd_aqi_d${i}.tif`;
    pm10Lyr += `,pm10_v_pcd_aqi_d${i}.tif`;
    coLyr += `,co_v_pcd_aqi_d${i}.tif`;
    o3Lyr += `,o3_v_pcd_aqi_d${i}.tif`;
    so2Lyr += `,so2_v_pcd_aqi_d${i}.tif`;
    no2Lyr += `,no2_v_pcd_aqi_d${i}.tif`;
    lyrLen = i;
}
var dataqi1, dataqi2, dataqi3,
    datpm251, datpm252, datpm253,
    datpm101, datpm102, datpm103,
    datco1, datco2, datco3,
    dato31, dato32, dato33,
    datno1, datno2, datno3,
    datso1, datso2, datso3

let getFeatureInfo = async (aqiLyr, lyrLen, pnt, size, bbox, div, param, std, dataid, Mark) => {
    // $("#aqidiv").show();
    let aqiUrl = "https://eec-onep.online:8443/geoserver/wms?SERVICE=WMS" +
        "&VERSION=1.1.1&REQUEST=GetFeatureInfo" +
        "&QUERY_LAYERS=" + aqiLyr +
        "&LAYERS=" + aqiLyr +
        "&Feature_count=" + lyrLen +
        "&INFO_FORMAT=application/json" +
        "&X=" + Math.round(pnt.x) +
        "&Y=" + Math.round(pnt.y) +
        "&SRS=EPSG:4326" +
        "&WIDTH=" + size.x +
        "&HEIGHT=" + size.y +
        "&BBOX=" + bbox;
    var M1 = map.hasLayer(marker1)
    var M2 = map.hasLayer(marker2)
    var M3 = map.hasLayer(marker3)
    // console.log(M1, M2, M3)
    if (div == "aqichart" && dataid == "data1") {
        await axios.get(aqiUrl).then(r => {
            let wk = 0;
            let dat = []
            r.data.features.map(i => {
                // let d = new Date();
                // d.setDate(d.getDate() - wk);
                // console.log(d);
                dat.push({
                    "week": wk,
                    "value": i.properties.GRAY_INDEX
                })
                wk++;
            })
            dataqi1 = dat
            math(dataqi1, div)
            if (M2 == true && M3 == false) {
                hchart2(dataqi1, dataqi2, div, param, std)
            } else if (M2 == true && M3 == true) {
                hchart3(dataqi1, dataqi2, dataqi3, div, param, std)
            } else {
                hchart(dataqi1, div, param, std)
            }
        })
    } else if (div == "pm25chart" && dataid == "data1") {
        await axios.get(aqiUrl).then(r => {
            let wk = 0;
            let dat = []
            r.data.features.map(i => {
                // let d = new Date();
                // d.setDate(d.getDate() - wk);
                // console.log(d);
                dat.push({
                    "week": wk,
                    "value": i.properties.GRAY_INDEX
                })
                wk++;
            })
            datpm251 = dat
            hchart(datpm251, div, param, std)
            math(datpm251, div)
            if (M2 == true && M3 == false) {
                hchart2(datpm251, datpm252, div, param, std)
            } else if (M2 == true && M3 == true) {
                hchart3(datpm251, datpm252, datpm253, div, param, std)
            } else {
                hchart(datpm251, div, param, std)
            }
        })
    } else if (div == "pm10chart" && dataid == "data1") {
        await axios.get(aqiUrl).then(r => {
            let wk = 0;
            let dat = []
            r.data.features.map(i => {
                // let d = new Date();
                // d.setDate(d.getDate() - wk);
                // console.log(d);
                dat.push({
                    "week": wk,
                    "value": i.properties.GRAY_INDEX
                })
                wk++;
            })
            datpm101 = dat
            math(datpm101, div)
            if (M2 == true && M3 == false) {
                hchart2(datpm101, datpm102, div, param, std)
            } else if (M2 == true && M3 == true) {
                hchart3(datpm101, datpm102, datpm103, div, param, std)
            } else {
                hchart(datpm101, div, param, std)
            }
        })
    } else if (div == "cochart" && dataid == "data1") {
        await axios.get(aqiUrl).then(r => {
            let wk = 0;
            let dat = []
            r.data.features.map(i => {
                // let d = new Date();
                // d.setDate(d.getDate() - wk);
                // console.log(d);
                dat.push({
                    "week": wk,
                    "value": i.properties.GRAY_INDEX
                })
                wk++;
            })
            datco1 = dat
            math(datco1, div)
            if (M2 == true && M3 == false) {
                hchart2(datco1, datco2, div, param, std)
            } else if (M2 == true && M3 == true) {
                hchart3(datco1, datco2, datco3, div, param, std)
            } else {
                hchart(datco1, div, param, std)
            }
        })
    } else if (div == "o3chart" && dataid == "data1") {
        await axios.get(aqiUrl).then(r => {
            let wk = 0;
            let dat = []
            r.data.features.map(i => {
                // let d = new Date();
                // d.setDate(d.getDate() - wk);
                // console.log(d);
                dat.push({
                    "week": wk,
                    "value": i.properties.GRAY_INDEX
                })
                wk++;
            })
            dato31 = dat
            math(dato31, div)
            if (M2 == true && M3 == false) {
                hchart2(dato31, dato32, div, param, std)
            } else if (M2 == true && M3 == true) {
                hchart3(dato31, dato32, dato33, div, param, std)
            } else {
                hchart(dato31, div, param, std)
            }
        })
    } else if (div == "so2chart" && dataid == "data1") {
        await axios.get(aqiUrl).then(r => {
            let wk = 0;
            let dat = []
            r.data.features.map(i => {
                // let d = new Date();
                // d.setDate(d.getDate() - wk);
                // console.log(d);
                dat.push({
                    "week": wk,
                    "value": i.properties.GRAY_INDEX
                })
                wk++;
            })
            datso1 = dat
            math(datso1, div)
            if (M2 == true && M3 == false) {
                hchart2(datso1, datso2, div, param, std)
            } else if (M2 == true && M3 == true) {
                hchart3(datso1, datso2, datso3, div, param, std)
            } else {
                hchart(datso1, div, param, std)
            }
        })
    } else if (div == "no2chart" && dataid == "data1") {
        await axios.get(aqiUrl).then(r => {
            let wk = 0;
            let dat = []
            r.data.features.map(i => {
                // let d = new Date();
                // d.setDate(d.getDate() - wk);
                // console.log(d);
                dat.push({
                    "week": wk,
                    "value": i.properties.GRAY_INDEX
                })
                wk++;
            })
            datno1 = dat
            math(datno1, div)
            if (M2 == true && M3 == false) {
                hchart2(datno1, datno2, div, param, std)
            } else if (M2 == true && M3 == true) {
                hchart3(datno1, datno2, datno3, div, param, std)
            } else {
                hchart(datno1, div, param, std)
            }
        })
    } else if (div == "aqichart" && dataid == "data2") {
        await axios.get(aqiUrl).then(r => {
            let wk = 0;
            let dat = []
            r.data.features.map(i => {
                // let d = new Date();
                // d.setDate(d.getDate() - wk);
                // console.log(d);
                dat.push({
                    "week": wk,
                    "value": i.properties.GRAY_INDEX
                })
                wk++;
            })
            dataqi2 = dat
            math2(dataqi2, div)
            if (M1 == true && M3 == false) {
                hchart2(dataqi1, dataqi2, div, param, std)
            } else if (M1 == true && M3 == true) {
                hchart3(dataqi1, dataqi2, dataqi3, div, param, std)
            } else {
                hchart2(dataqi1, dataqi2, div, param, std)
            }

        })
    } else if (div == "pm25chart" && dataid == "data2") {
        await axios.get(aqiUrl).then(r => {
            let wk = 0;
            let dat = []
            r.data.features.map(i => {
                // let d = new Date();
                // d.setDate(d.getDate() - wk);
                // console.log(d);
                dat.push({
                    "week": wk,
                    "value": i.properties.GRAY_INDEX
                })
                wk++;
            })
            datpm252 = dat
            math2(datpm252, div)
            if (M1 == true && M3 == false) {
                hchart2(datpm251, datpm252, div, param, std)
            } else if (M1 == true && M3 == true) {
                hchart3(datpm251, datpm252, datpm253, div, param, std)
            } else {
                hchart2(datpm251, datpm252, div, param, std)
            }

        })
    } else if (div == "pm10chart" && dataid == "data2") {
        await axios.get(aqiUrl).then(r => {
            let wk = 0;
            let dat = []
            r.data.features.map(i => {
                // let d = new Date();
                // d.setDate(d.getDate() - wk);
                // console.log(d);
                dat.push({
                    "week": wk,
                    "value": i.properties.GRAY_INDEX
                })
                wk++;
            })
            datpm102 = dat
            math2(datpm102, div)
            if (M1 == true && M3 == false) {
                hchart2(datpm101, datpm102, div, param, std)
            } else if (M1 == true && M3 == true) {
                hchart3(datpm101, datpm102, datpm103, div, param, std)
            } else {
                hchart2(datpm101, datpm102, div, param, std)
            }
        })
    } else if (div == "cochart" && dataid == "data2") {
        await axios.get(aqiUrl).then(r => {
            let wk = 0;
            let dat = []
            r.data.features.map(i => {
                // let d = new Date();
                // d.setDate(d.getDate() - wk);
                // console.log(d);
                dat.push({
                    "week": wk,
                    "value": i.properties.GRAY_INDEX
                })
                wk++;
            })
            datco2 = dat
            math2(datco2, div)
            if (M1 == true && M3 == false) {
                hchart2(datco1, datco2, div, param, std)
            } else if (M1 == true && M3 == true) {
                hchart3(datco1, datco2, datco3, div, param, std)
            } else {
                hchart2(datco1, datco2, div, param, std)
            }
        })
    } else if (div == "o3chart" && dataid == "data2") {
        await axios.get(aqiUrl).then(r => {
            let wk = 0;
            let dat = []
            r.data.features.map(i => {
                // let d = new Date();
                // d.setDate(d.getDate() - wk);
                // console.log(d);
                dat.push({
                    "week": wk,
                    "value": i.properties.GRAY_INDEX
                })
                wk++;
            })
            dato32 = dat
            math2(dato32, div)
            if (M1 == true && M3 == false) {
                hchart2(dato31, dato32, div, param, std)
            } else if (M1 == true && M3 == true) {
                hchart3(dato31, dato32, dato33, div, param, std)
            } else {
                hchart2(dato31, dato32, div, param, std)
            }
        })
    } else if (div == "so2chart" && dataid == "data2") {
        await axios.get(aqiUrl).then(r => {
            let wk = 0;
            let dat = []
            r.data.features.map(i => {
                // let d = new Date();
                // d.setDate(d.getDate() - wk);
                // console.log(d);
                dat.push({
                    "week": wk,
                    "value": i.properties.GRAY_INDEX
                })
                wk++;
            })
            datso2 = dat
            math2(datso2, div)
            if (M1 == true && M3 == false) {
                hchart2(datso1, datso2, div, param, std)
            } else if (M1 == true && M3 == true) {
                hchart3(datso1, datso2, datso3, div, param, std)
            } else {
                hchart2(datso1, datso2, div, param, std)
            }
        })
    } else if (div == "no2chart" && dataid == "data2") {
        await axios.get(aqiUrl).then(r => {
            let wk = 0;
            let dat = []
            r.data.features.map(i => {
                // let d = new Date();
                // d.setDate(d.getDate() - wk);
                // console.log(d);
                dat.push({
                    "week": wk,
                    "value": i.properties.GRAY_INDEX
                })
                wk++;
            })
            datno2 = dat
            math2(datno2, div)
            if (M1 == true && M3 == false) {
                hchart2(datno1, datno2, div, param, std)
            } else if (M1 == true && M3 == true) {
                hchart3(datno1, datno2, datno3, div, param, std)
            } else {
                hchart2(datno1, datno2, div, param, std)
            }
        })
    } else if (div == "aqichart" && dataid == "data3") {
        await axios.get(aqiUrl).then(r => {
            let wk = 0;
            let dat = []
            r.data.features.map(i => {
                // let d = new Date();
                // d.setDate(d.getDate() - wk);
                // console.log(d);
                dat.push({
                    "week": wk,
                    "value": i.properties.GRAY_INDEX
                })
                wk++;
            })
            dataqi3 = dat
            hchart3(dataqi1, dataqi2, dataqi3, div, param, std)
            math3(dataqi3, div)
        })
    } else if (div == "pm25chart" && dataid == "data3") {
        await axios.get(aqiUrl).then(r => {
            let wk = 0;
            let dat = []
            r.data.features.map(i => {
                // let d = new Date();
                // d.setDate(d.getDate() - wk);
                // console.log(d);
                dat.push({
                    "week": wk,
                    "value": i.properties.GRAY_INDEX
                })
                wk++;
            })
            datpm253 = dat
            hchart3(datpm251, datpm252, datpm253, div, param, std)
            math3(datpm253, div)
        })
    } else if (div == "pm10chart" && dataid == "data3") {
        await axios.get(aqiUrl).then(r => {
            let wk = 0;
            let dat = []
            r.data.features.map(i => {
                // let d = new Date();
                // d.setDate(d.getDate() - wk);
                // console.log(d);
                dat.push({
                    "week": wk,
                    "value": i.properties.GRAY_INDEX
                })
                wk++;
            })
            datpm103 = dat
            hchart3(datpm101, datpm102, datpm103, div, param, std)
            math3(datpm103, div)
        })
    } else if (div == "cochart" && dataid == "data3") {
        await axios.get(aqiUrl).then(r => {
            let wk = 0;
            let dat = []
            r.data.features.map(i => {
                // let d = new Date();
                // d.setDate(d.getDate() - wk);
                // console.log(d);
                dat.push({
                    "week": wk,
                    "value": i.properties.GRAY_INDEX
                })
                wk++;
            })
            datco3 = dat
            hchart3(datco1, datco2, datco3, div, param, std)
            math3(datco3, div)
        })
    } else if (div == "o3chart" && dataid == "data3") {
        await axios.get(aqiUrl).then(r => {
            let wk = 0;
            let dat = []
            r.data.features.map(i => {
                // let d = new Date();
                // d.setDate(d.getDate() - wk);
                // console.log(d);
                dat.push({
                    "week": wk,
                    "value": i.properties.GRAY_INDEX
                })
                wk++;
            })
            dato33 = dat
            hchart3(dato31, dato32, dato33, div, param, std)
            math3(dato33, div)
        })
    } else if (div == "so2chart" && dataid == "data3") {
        await axios.get(aqiUrl).then(r => {
            let wk = 0;
            let dat = []
            r.data.features.map(i => {
                // let d = new Date();
                // d.setDate(d.getDate() - wk);
                // console.log(d);
                dat.push({
                    "week": wk,
                    "value": i.properties.GRAY_INDEX
                })
                wk++;
            })
            datso3 = dat
            hchart3(datso1, datso2, datso3, div, param, std)
            math3(datso3, div)
        })
    } else if (div == "no2chart" && dataid == "data3") {
        await axios.get(aqiUrl).then(r => {
            let wk = 0;
            let dat = []
            r.data.features.map(i => {
                // let d = new Date();
                // d.setDate(d.getDate() - wk);
                // console.log(d);
                dat.push({
                    "week": wk,
                    "value": i.properties.GRAY_INDEX
                })
                wk++;
            })
            datno3 = dat
            hchart3(datno1, datno2, datno3, div, param, std)
            math3(datno3, div)
        })
    }
}
var valuearea = 1
var dataarea1, dataarea2, dataarea3
var marker1, marker2, marker3
var latlngM1, latlngM2, latlngM3
map.on("click", async (e) => {
    var MIcon1 = L.icon({
        iconUrl: './marker/Mark1.png',
        iconSize: [50, 50],
        iconAnchor: [25, 55],
        popupAnchor: [5, -30]
    });
    var MIcon2 = L.icon({
        iconUrl: './marker/Mark2.png',
        iconSize: [50, 50],
        iconAnchor: [25, 55],
        popupAnchor: [5, -30]
    });
    var MIcon3 = L.icon({
        iconUrl: './marker/Mark3.png',
        iconSize: [50, 50],
        iconAnchor: [25, 55],
        popupAnchor: [5, -30]
    });

    if (valuearea == 1) {
        if (map.hasLayer(marker2) == false) {
            $("#compare2").show()
            $("#sub1").show()
        } else if (map.hasLayer(marker2) == true) {
            $("#compare2").hide()
            $("#sub1").hide()
        }

        if (marker1) {
            map.removeLayer(marker1);
        }
        marker1 = new L.Marker(new L.LatLng(e.latlng.lat, e.latlng.lng), { icon: MIcon1 });
        map.addLayer(marker1);
        latlngM1 = e.latlng
        var pnt = map.latLngToContainerPoint(e.latlng);
        var size = map.getSize();
        var bbox = map.getBounds().toBBoxString();

        aqichk ? getFeatureInfo(aqiLyr, lyrLen, pnt, size, bbox, "aqichart", "AQI", 50, "data1") : null;
        pm25chk ? getFeatureInfo(pm25Lyr, lyrLen, pnt, size, bbox, "pm25chart", "pm25 (µg./m3)", 37, "data1") : null;
        pm10chk ? getFeatureInfo(pm10Lyr, lyrLen, pnt, size, bbox, "pm10chart", "pm10 (µg./m3)", 80, "data1") : null;
        cochk ? getFeatureInfo(coLyr, lyrLen, pnt, size, bbox, "cochart", "CO (ppm)", 50, "data1") : null;
        o3chk ? getFeatureInfo(o3Lyr, lyrLen, pnt, size, bbox, "o3chart", "O3 (ppb)", 6.4, "data1") : null;
        so2chk ? getFeatureInfo(so2Lyr, lyrLen, pnt, size, bbox, "so2chart", "SO2 (ppb)", 106, "data1") : null;
        no2chk ? getFeatureInfo(no2Lyr, lyrLen, pnt, size, bbox, "no2chart", "NO2 (ppb)", 200, "data1") : null;
        // console.log(e.latlng);
        await axios.post(url + "/eec-api/get-landuse-info", { lat: e.latlng.lat, lon: e.latlng.lng }).then(r => {
            // console.log(r.data.data);
            if (r.data.data.length > 0) {
                $("#landuse").html(`การใช้ประโยชน์: <span class="badge bg-warning" style="font-size:14px;">${r.data.data[0].lu_des_th}</span> จำนวน: <span class="badge bg-warning" style="font-size:14px;">${(r.data.data[0].area / 1600).toFixed(2)} </span> ไร่`)
                $("#landuse").show();
            } else {
                $("#landuse").html("");
                $("#landuse").hide();
            }
        })

        await axios.post(url + "/eec-api/get-tam-info", { lat: e.latlng.lat, lon: e.latlng.lng }).then(r => {
            // console.log(r.data.data);
            if (r.data.data.length > 0) {
                $("#hloc").html(`${r.data.data[0].tam_nam_t} 
                        ${r.data.data[0].amphoe_t}
                        ${r.data.data[0].prov_nam_t}`);
                $("#hloc").show();
            } else {
                $("#hloc").html("");
                $("#hloc").hide();
            }
        })

        $("#Mark1").show()
        $("#announce").hide()
        $("#latlon").html(`พิกัด ${(e.latlng.lat).toFixed(2)}, ${(e.latlng.lng).toFixed(2)} &nbsp;`);
        $("#latlon").show();
        $("#d1").show();

    } else if (valuearea == 2) {
        if (map.hasLayer(marker3) == false) {
            $("#compare2").hide()
            $("#compare3").show()
        } else if (map.hasLayer(marker3) == true) {
            $("#compare2").hide()
            $("#compare3").hide()
        }
        if (marker2) {
            map.removeLayer(marker2);
        }
        marker2 = new L.Marker(new L.LatLng(e.latlng.lat, e.latlng.lng), { icon: MIcon2 });
        map.addLayer(marker2);
        latlngM2 = e.latlng
        var pnt = map.latLngToContainerPoint(e.latlng);
        var size = map.getSize();
        var bbox = map.getBounds().toBBoxString();

        aqichk ? getFeatureInfo(aqiLyr, lyrLen, pnt, size, bbox, "aqichart", "AQI", 50, "data2") : null;
        pm25chk ? getFeatureInfo(pm25Lyr, lyrLen, pnt, size, bbox, "pm25chart", "pm25 (µg./m3)", 37, "data2") : null;
        pm10chk ? getFeatureInfo(pm10Lyr, lyrLen, pnt, size, bbox, "pm10chart", "pm10 (µg./m3)", 80, "data2") : null;
        cochk ? getFeatureInfo(coLyr, lyrLen, pnt, size, bbox, "cochart", "CO (ppm)", 50, "data2") : null;
        o3chk ? getFeatureInfo(o3Lyr, lyrLen, pnt, size, bbox, "o3chart", "O3 (ppb)", 6.4, "data2") : null;
        so2chk ? getFeatureInfo(so2Lyr, lyrLen, pnt, size, bbox, "so2chart", "SO2 (ppb)", 106, "data2") : null;
        no2chk ? getFeatureInfo(no2Lyr, lyrLen, pnt, size, bbox, "no2chart", "NO2 (ppb)", 200, "data2") : null;
        // console.log(e.latlng);
        await axios.post(url + "/eec-api/get-landuse-info", { lat: e.latlng.lat, lon: e.latlng.lng }).then(r => {
            // console.log(r.data.data);
            if (r.data.data.length > 0) {
                $("#landuse2").html(`การใช้ประโยชน์: <span class="badge bg-warning" style="font-size:14px;">${r.data.data[0].lu_des_th}</span> จำนวน: <span class="badge bg-warning" style="font-size:14px;">${(r.data.data[0].area / 1600).toFixed(2)} </span> ไร่`)
                $("#landuse2").show();
            } else {
                $("#landuse2").html("");
                $("#landuse2").hide();
            }
        })
        await axios.post(url + "/eec-api/get-tam-info", { lat: e.latlng.lat, lon: e.latlng.lng }).then(r => {
            // console.log(r.data.data);
            if (r.data.data.length > 0) {
                $("#hloc2").html(`${r.data.data[0].tam_nam_t} 
                        ${r.data.data[0].amphoe_t}
                        ${r.data.data[0].prov_nam_t}`);
                $("#hloc2").show();
            } else {
                $("#hloc2").html("");
                $("#hloc2").hide();
            }
        })
        $("#announce2").hide()
        $("#latlon2").html(`พิกัด ${(e.latlng.lat).toFixed(2)}, ${(e.latlng.lng).toFixed(2)} &nbsp;`);
        $("#latlon2").show();
        $("#d2").show();
    } else if (valuearea == 3) {
        if (map.hasLayer(marker3) == false) {
            $("#compare2").hide()
            $("#compare3").hide()
        } else if (map.hasLayer(marker3) == true) {
            $("#compare2").hide()
            $("#compare3").hide()
        }
        if (marker3) {
            map.removeLayer(marker3);
        }
        marker3 = new L.Marker(new L.LatLng(e.latlng.lat, e.latlng.lng), { icon: MIcon3 });
        map.addLayer(marker3);
        latlngM3 = e.latlng
        var pnt = map.latLngToContainerPoint(e.latlng);
        var size = map.getSize();
        var bbox = map.getBounds().toBBoxString();

        aqichk ? getFeatureInfo(aqiLyr, lyrLen, pnt, size, bbox, "aqichart", "AQI", 50, "data3") : null;
        pm25chk ? getFeatureInfo(pm25Lyr, lyrLen, pnt, size, bbox, "pm25chart", "pm25 (µg./m3)", 37, "data3") : null;
        pm10chk ? getFeatureInfo(pm10Lyr, lyrLen, pnt, size, bbox, "pm10chart", "pm10 (µg./m3)", 80, "data3") : null;
        cochk ? getFeatureInfo(coLyr, lyrLen, pnt, size, bbox, "cochart", "CO (ppm)", 50, "data3") : null;
        o3chk ? getFeatureInfo(o3Lyr, lyrLen, pnt, size, bbox, "o3chart", "O3 (ppb)", 6.4, "data3") : null;
        so2chk ? getFeatureInfo(so2Lyr, lyrLen, pnt, size, bbox, "so2chart", "SO2 (ppb)", 106, "data3") : null;
        no2chk ? getFeatureInfo(no2Lyr, lyrLen, pnt, size, bbox, "no2chart", "NO2 (ppb)", 200, "data3") : null;
        // console.log(e.latlng);
        await axios.post(url + "/eec-api/get-landuse-info", { lat: e.latlng.lat, lon: e.latlng.lng }).then(r => {
            // console.log(r.data.data);
            if (r.data.data.length > 0) {
                $("#landuse3").html(`การใช้ประโยชน์: <span class="badge bg-warning" style="font-size:14px;">${r.data.data[0].lu_des_th}</span> จำนวน: <span class="badge bg-warning" style="font-size:14px;">${(r.data.data[0].area / 1600).toFixed(2)} </span> ไร่`)
                $("#landuse3").show();
            } else {
                $("#landuse3").html("");
                $("#landuse3").hide();
            }
        })

        await axios.post(url + "/eec-api/get-tam-info", { lat: e.latlng.lat, lon: e.latlng.lng }).then(r => {
            // console.log(r.data.data);
            if (r.data.data.length > 0) {
                $("#hloc3").html(`${r.data.data[0].tam_nam_t} 
                        ${r.data.data[0].amphoe_t}
                        ${r.data.data[0].prov_nam_t}`);
                $("#hloc3").show();
            } else {
                $("#hloc3").html("");
                $("#hloc3").hide();
            }
        })
        $("#announce3").hide()
        $("#latlon3").html(`พิกัด ${(e.latlng.lat).toFixed(2)}, ${(e.latlng.lng).toFixed(2)} &nbsp;`);
        $("#latlon3").show();
        $("#d3").show();
    }
});
function getM1() {
    // console.log(latlngM1)
    var pnt = map.latLngToContainerPoint(latlngM1);
    var size = map.getSize();
    var bbox = map.getBounds().toBBoxString();

    aqichk ? getFeatureInfo(aqiLyr, lyrLen, pnt, size, bbox, "aqichart", "AQI", 50, "data1") : null;
    pm25chk ? getFeatureInfo(pm25Lyr, lyrLen, pnt, size, bbox, "pm25chart", "pm25 (µg./m3)", 37, "data1") : null;
    pm10chk ? getFeatureInfo(pm10Lyr, lyrLen, pnt, size, bbox, "pm10chart", "pm10 (µg./m3)", 80, "data1") : null;
    cochk ? getFeatureInfo(coLyr, lyrLen, pnt, size, bbox, "cochart", "CO (ppm)", 50, "data1") : null;
    o3chk ? getFeatureInfo(o3Lyr, lyrLen, pnt, size, bbox, "o3chart", "O3 (ppb)", 6.4, "data1") : null;
    so2chk ? getFeatureInfo(so2Lyr, lyrLen, pnt, size, bbox, "so2chart", "SO2 (ppb)", 106, "data1") : null;
    no2chk ? getFeatureInfo(no2Lyr, lyrLen, pnt, size, bbox, "no2chart", "NO2 (ppb)", 200, "data1") : null;
}
function getM2() {
    var pnt = map.latLngToContainerPoint(latlngM2);
    var size = map.getSize();
    var bbox = map.getBounds().toBBoxString();

    aqichk ? getFeatureInfo(aqiLyr, lyrLen, pnt, size, bbox, "aqichart", "AQI", 50, "data2") : null;
    pm25chk ? getFeatureInfo(pm25Lyr, lyrLen, pnt, size, bbox, "pm25chart", "pm25 (µg./m3)", 37, "data2") : null;
    pm10chk ? getFeatureInfo(pm10Lyr, lyrLen, pnt, size, bbox, "pm10chart", "pm10 (µg./m3)", 80, "data2") : null;
    cochk ? getFeatureInfo(coLyr, lyrLen, pnt, size, bbox, "cochart", "CO (ppm)", 50, "data2") : null;
    o3chk ? getFeatureInfo(o3Lyr, lyrLen, pnt, size, bbox, "o3chart", "O3 (ppb)", 6.4, "data2") : null;
    so2chk ? getFeatureInfo(so2Lyr, lyrLen, pnt, size, bbox, "so2chart", "SO2 (ppb)", 106, "data2") : null;
    no2chk ? getFeatureInfo(no2Lyr, lyrLen, pnt, size, bbox, "no2chart", "NO2 (ppb)", 200, "data2") : null;
    // console.log(e.latlng);
}
function getM3() {
    var pnt = map.latLngToContainerPoint(latlngM3);
    var size = map.getSize();
    var bbox = map.getBounds().toBBoxString();

    aqichk ? getFeatureInfo(aqiLyr, lyrLen, pnt, size, bbox, "aqichart", "AQI", 50, "data3") : null;
    pm25chk ? getFeatureInfo(pm25Lyr, lyrLen, pnt, size, bbox, "pm25chart", "pm25 (µg./m3)", 37, "data3") : null;
    pm10chk ? getFeatureInfo(pm10Lyr, lyrLen, pnt, size, bbox, "pm10chart", "pm10 (µg./m3)", 80, "data3") : null;
    cochk ? getFeatureInfo(coLyr, lyrLen, pnt, size, bbox, "cochart", "CO (ppm)", 50, "data3") : null;
    o3chk ? getFeatureInfo(o3Lyr, lyrLen, pnt, size, bbox, "o3chart", "O3 (ppb)", 6.4, "data3") : null;
    so2chk ? getFeatureInfo(so2Lyr, lyrLen, pnt, size, bbox, "so2chart", "SO2 (ppb)", 106, "data3") : null;
    no2chk ? getFeatureInfo(no2Lyr, lyrLen, pnt, size, bbox, "no2chart", "NO2 (ppb)", 200, "data3") : null;
    // console.log(e.latlng);
}

let getdata = (value) => {
    if (value == 1) {
        getM1()
    } else if (value == 2) {
        getM1()
        getM2()
    } else if (value == 3) {
        getM1()
        getM2()
        getM3()
    }
}
$("#Mark1").hide()
$("#announce").html(`เลือกชั้นข้อมูลคุณภาพอากาศแล้วคลิกลงบนแผนที่เพื่อแสดงข้อมูลคุณภาพอากาศย้อนหลัง 14 วัน`)
$("#announce2").html(`เลือกชั้นข้อมูลคุณภาพอากาศแล้วคลิกลงบนแผนที่เพื่อแสดงข้อมูลคุณภาพอากาศย้อนหลัง 14 วัน`)
$("#announce3").html(`เลือกชั้นข้อมูลคุณภาพอากาศแล้วคลิกลงบนแผนที่เพื่อแสดงข้อมูลคุณภาพอากาศย้อนหลัง 14 วัน`)
//area1
$("#cardAQI").hide()
$("#cardPM25").hide()
$("#cardPM10").hide()
$("#cardCO").hide()
$("#cardO3").hide()
$("#cardNO2").hide()
$("#cardSO2").hide()
$("#d1").hide();
//area2
$("#cardAQI-2").hide()
$("#cardPM25-2").hide()
$("#cardPM10-2").hide()
$("#cardCO-2").hide()
$("#cardO3-2").hide()
$("#cardNO2-2").hide()
$("#cardSO2-2").hide()
$("#d2").hide();

//area3
$("#cardAQI-3").hide()
$("#cardPM25-3").hide()
$("#cardPM10-3").hide()
$("#cardCO-3").hide()
$("#cardO3-3").hide()
$("#cardNO2-3").hide()
$("#cardSO2-3").hide()
$("#d3").hide();


$("#area2").hide()
$("#compare2").hide()
$("#area3").hide()
$("#compare3").hide()
$("#re1").hide()
$("#re2").hide()
$("#re3").hide()
$("#sub1").hide()
$("#sub2").hide()
$("#sub3").hide()
function ss(value) {
    valuearea = value
    if (valuearea == 1) {
        // var a = map.hasLayer(marker2)
        // var b = map.hasLayer(marker3)
        $("#re1").hide()
        $("#re2").show()
        $("#re3").show()

        $("#sub1").show()
        $("#sub2").hide()
        $("#sub3").hide()

    } else if (valuearea == 2) {
        $("#area2").show()
        $("#re1").show()
        $("#re2").hide()
        $("#re3").show()

        $("#sub1").hide()
        $("#sub2").show()
        $("#sub3").hide()
    } else if (valuearea == 3) {
        $("#area3").show()
        $("#re1").show()
        $("#re2").show()
        $("#re3").hide()

        $("#sub1").hide()
        $("#sub2").hide()
        $("#sub3").show()
    }
}
let hchart2 = (dat1, dat2, div, param, std) => {
    var a = dat1
    var b = dat2;
    // console.log(dat1)
    // console.log(dat2)
    var data = [];
    data.push({ "week": 1, "value1": a[0].value, "value2": b[0].value, },
        { "week": 2, "value1": a[1].value, "value2": b[1].value, },
        { "week": 3, "value1": a[2].value, "value2": b[2].value, },
        { "week": 4, "value1": a[3].value, "value2": b[3].value, },
        { "week": 5, "value1": a[4].value, "value2": b[4].value, },
        { "week": 6, "value1": a[5].value, "value2": b[5].value, },
        { "week": 7, "value1": a[6].value, "value2": b[6].value, },
        { "week": 8, "value1": a[7].value, "value2": b[7].value, },
        { "week": 9, "value1": a[8].value, "value2": b[8].value, },
        { "week": 10, "value1": a[9].value, "value2": b[9].value, },
        { "week": 11, "value1": a[10].value, "value2": b[10].value, },
        { "week": 12, "value1": a[11].value, "value2": b[11].value, },
        { "week": 13, "value1": a[12].value, "value2": b[12].value, },
        { "week": 14, "value1": a[13].value, "value2": b[13].value, })

    am4core.useTheme(am4themes_animated);
    var chart = am4core.create(div, am4charts.XYChart);
    chart.numberFormatter.numberFormat = "##.##";
    chart.paddingRight = 20;
    chart.legend = new am4charts.Legend();
    // chart.legend.useDefaultMarker = true;
    // var marker = chart.legend.markers.template.children.getIndex(0);
    // marker.cornerRadius(12, 12, 12, 12);
    // marker.strokeWidth = 2;
    // marker.strokeOpacity = 1;
    // marker.stroke = am4core.color("#ccc");

    // Add data
    chart.data = data;

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "week";
    categoryAxis.renderer.minGridDistance = 50;
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.startLocation = 0.5;
    categoryAxis.endLocation = 0.5;
    categoryAxis.title.text = "วันย้อนหลัง";
    categoryAxis.title.fontSize = 16;

    // Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.baseValue = 0;
    valueAxis.title.text = param;
    valueAxis.title.fontSize = 16;

    // Create series
    var series1 = chart.series.push(new am4charts.LineSeries());
    series1.dataFields.valueY = "value1";
    series1.dataFields.categoryX = "week";
    series1.strokeWidth = 3;
    series1.tensionX = 0.77;
    series1.name = "จุดที่ 1";
    series1.tooltipText = "วันที่ {categoryX}: {valueY}[/]";
    series1.stroke = am4core.color("#DB6400");
    series1.tooltip.getFillFromObject = false;
    series1.tooltip.background.fill = am4core.color("#DB6400");

    var series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "value2";
    series2.dataFields.categoryX = "week";
    series2.strokeWidth = 3;
    series2.tensionX = 0.77;
    series2.name = "จุดที่ 2";
    series2.tooltipText = "วันที่ {categoryX}: {valueY}[/]";
    series2.stroke = am4core.color("#FFA62B");
    series2.tooltip.getFillFromObject = false;
    series2.tooltip.background.fill = am4core.color("#FFA62B");

    // bullet is added because we add tooltip to a bullet for it to change color
    var bullet1 = series1.bullets.push(new am4charts.Bullet());
    bullet1.tooltipText = "{valueY}";

    bullet1.adapter.add("fill", function (fill, target) {
        if (target.dataItem.valueY > std) {
            return am4core.color("#FF0000");
        }
        return fill;
    })

    var bullet2 = series2.bullets.push(new am4charts.Bullet());
    bullet2.tooltipText = "{valueY}";

    bullet2.adapter.add("fill", function (fill, target) {
        if (target.dataItem.valueY > std) {
            return am4core.color("#FF0000");
        }
        return fill;
    })

    var range = valueAxis.createSeriesRange(series1);
    range.value = std;
    range.endValue = 1000;
    range.contents.stroke = am4core.color("#FF0000");
    // range.contents.fill = range.contents.stroke;
    // // Add scrollbar
    // var scrollbarX = new am4charts.XYChartScrollbar();
    // scrollbarX.series.push(series);
    // chart.scrollbarX = scrollbarX;


    chart.cursor = new am4charts.XYCursor();
}

let hchart3 = (dat1, dat2, dat3, div, param, std) => {
    var a = dat1;
    var b = dat2;
    var c = dat3;
    var data = [];
    data.push(
        { "week": 1, "value1": a[0].value, "value2": b[0].value, "value3": c[0].value, },
        { "week": 2, "value1": a[1].value, "value2": b[1].value, "value3": c[1].value, },
        { "week": 3, "value1": a[2].value, "value2": b[2].value, "value3": c[2].value, },
        { "week": 4, "value1": a[3].value, "value2": b[3].value, "value3": c[3].value, },
        { "week": 5, "value1": a[4].value, "value2": b[4].value, "value3": c[4].value, },
        { "week": 6, "value1": a[5].value, "value2": b[5].value, "value3": c[5].value, },
        { "week": 7, "value1": a[6].value, "value2": b[6].value, "value3": c[6].value, },
        { "week": 8, "value1": a[7].value, "value2": b[7].value, "value3": c[7].value, },
        { "week": 9, "value1": a[8].value, "value2": b[8].value, "value3": c[8].value, },
        { "week": 10, "value1": a[9].value, "value2": b[9].value, "value3": c[9].value, },
        { "week": 11, "value1": a[10].value, "value2": b[10].value, "value3": c[10].value, },
        { "week": 12, "value1": a[11].value, "value2": b[11].value, "value3": c[11].value, },
        { "week": 13, "value1": a[12].value, "value2": b[12].value, "value3": c[12].value, },
        { "week": 14, "value1": a[13].value, "value2": b[13].value, "value3": c[13].value, })

    am4core.useTheme(am4themes_animated);
    var chart = am4core.create(div, am4charts.XYChart);
    chart.numberFormatter.numberFormat = "##.##";
    chart.paddingRight = 20;

    chart.legend = new am4charts.Legend();
    // chart.legend.useDefaultMarker = true;

    // var marker = chart.legend.markers.template.children.getIndex(0);
    // marker.cornerRadius(12, 12, 12, 12);
    // marker.strokeWidth = 2;
    // marker.strokeOpacity = 1;
    // marker.stroke = am4core.color("#ccc");
    // Add data
    chart.data = data;

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "week";
    categoryAxis.renderer.minGridDistance = 50;
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.startLocation = 0.5;
    categoryAxis.endLocation = 0.5;
    categoryAxis.title.text = "วันย้อนหลัง";
    categoryAxis.title.fontSize = 16;

    // Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.baseValue = 0;
    valueAxis.title.text = param;
    valueAxis.title.fontSize = 16;

    // Create series
    var series1 = chart.series.push(new am4charts.LineSeries());
    series1.dataFields.valueY = "value1";
    series1.dataFields.categoryX = "week";
    series1.strokeWidth = 3;
    series1.tensionX = 0.77;
    series1.name = "จุดที่ 1";
    series1.tooltipText = "วันที่ {categoryX}: {valueY}[/]";
    series1.stroke = am4core.color("#DB6400");
    series1.tooltip.getFillFromObject = false;
    series1.tooltip.background.fill = am4core.color("#DB6400");

    var series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "value2";
    series2.dataFields.categoryX = "week";
    series2.strokeWidth = 3;
    series2.tensionX = 0.77;
    series2.name = "จุดที่ 2";
    series2.tooltipText = "วันที่ {categoryX}: {valueY}[/]";
    series2.stroke = am4core.color("#FFA62B");
    series2.tooltip.getFillFromObject = false;
    series2.tooltip.background.fill = am4core.color("#FFA62B");

    var series3 = chart.series.push(new am4charts.LineSeries());
    series3.dataFields.valueY = "value3";
    series3.dataFields.categoryX = "week";
    series3.strokeWidth = 3;
    series3.tensionX = 0.77;
    series3.name = "จุดที่ 3";
    series3.tooltipText = "วันที่ {categoryX}: {valueY}[/]";
    series3.stroke = am4core.color("#16697A");
    series3.tooltip.getFillFromObject = false;
    series3.tooltip.background.fill = am4core.color("#16697A");

    // bullet is added because we add tooltip to a bullet for it to change color
    var bullet1 = series1.bullets.push(new am4charts.Bullet());
    bullet1.tooltipText = "{valueY}";

    bullet1.adapter.add("fill", function (fill, target) {
        if (target.dataItem.valueY > std) {
            return am4core.color("#FF0000");
        }
        return fill;
    })

    var bullet2 = series2.bullets.push(new am4charts.Bullet());
    bullet2.tooltipText = "{valueY}";

    bullet2.adapter.add("fill", function (fill, target) {
        if (target.dataItem.valueY > std) {
            return am4core.color("#FF0000");
        }
        return fill;
    })

    var bullet3 = series3.bullets.push(new am4charts.Bullet());
    bullet3.tooltipText = "{valueY}";

    bullet3.adapter.add("fill", function (fill, target) {
        if (target.dataItem.valueY > std) {
            return am4core.color("#FF0000");
        }
        return fill;
    })

    var range = valueAxis.createSeriesRange(series1);
    range.value = std;
    range.endValue = 1000;
    range.contents.stroke = am4core.color("#FF0000");

    // // Add scrollbar
    // var scrollbarX = new am4charts.XYChartScrollbar();
    // scrollbarX.series.push(series);
    // chart.scrollbarX = scrollbarX;


    chart.cursor = new am4charts.XYCursor();


}

let closeMark = (value) => {
    valuearea = value
    if (value = 1) {
        map.removeLayer(marker2);
        $("#compare2").show()
        $("#area2").hide()
    } else if (value = 2) {
        map.removeLayer(marker3);
        $("#compare3").show()
        $("#area3").hide()
    }
}

var apiData = {};
var mapFrames = [];
var lastPastFramePosition = -1;
var radarLayers = [];

var optionKind = 'radar'; // can be 'radar' or 'satellite'

var optionTileSize = 256; // can be 256 or 512.
var optionColorScheme = 2; // from 0 to 8. Check the https://rainviewer.com/api/color-schemes.html for additional information
var optionSmoothData = 1; // 0 - not smooth, 1 - smooth
var optionSnowColors = 1; // 0 - do not show snow colors, 1 - show snow colors

var animationPosition = 0;
var animationTimer = false;

var apiRequest = new XMLHttpRequest();
apiRequest.open("GET", "https://api.rainviewer.com/public/weather-maps.json", true);
apiRequest.onload = function (e) {
    // store the API response for re-use purposes in memory
    apiData = JSON.parse(apiRequest.response);
    initialize(apiData, optionKind);
};
apiRequest.send();

function initialize(api, kind) {
    // remove all already added tiled layers
    for (var i in radarLayers) {
        map.removeLayer(radarLayers[i]);
    }
    mapFrames = [];
    radarLayers = [];
    animationPosition = 0;

    if (!api) {
        return;
    }
    if (kind == 'satellite' && api.satellite && api.satellite.infrared) {
        mapFrames = api.satellite.infrared;

        lastPastFramePosition = api.satellite.infrared.length - 1;
        showFrame(lastPastFramePosition);
    }
    else if (api.radar && api.radar.past) {
        mapFrames = api.radar.past;
        if (api.radar.nowcast) {
            mapFrames = mapFrames.concat(api.radar.nowcast);
        }
        lastPastFramePosition = api.radar.past.length - 1;
        showFrame(lastPastFramePosition);
    }
}

function addLayer(frame) {
    if (!radarLayers[frame.path]) {
        var colorScheme = optionKind == 'satellite' ? 0 : optionColorScheme;
        var smooth = optionKind == 'satellite' ? 0 : optionSmoothData;
        var snow = optionKind == 'satellite' ? 0 : optionSnowColors;

        radarLayers[frame.path] = new L.TileLayer(apiData.host + frame.path + '/' + optionTileSize + '/{z}/{x}/{y}/' + colorScheme + '/' + smooth + '_' + snow + '.png', {
            tileSize: 256,
            opacity: 0.001,
            zIndex: frame.time,
            name: "lyr"
        });
    }

    if (!map.hasLayer(radarLayers[frame.path])) {
        map.addLayer(radarLayers[frame.path]);
    }
}

function changeRadarPosition(position, preloadOnly) {
    while (position >= mapFrames.length) {
        position -= mapFrames.length;
    }
    while (position < 0) {
        position += mapFrames.length;
    }

    var currentFrame = mapFrames[animationPosition];
    var nextFrame = mapFrames[position];

    addLayer(nextFrame);

    if (preloadOnly) {
        return;
    }

    animationPosition = position;

    if (radarLayers[currentFrame.path]) {
        radarLayers[currentFrame.path].setOpacity(0);
    }
    radarLayers[nextFrame.path].setOpacity(100);
}

function showFrame(nextPosition) {
    var preloadingDirection = nextPosition - animationPosition > 0 ? 1 : -1;

    changeRadarPosition(nextPosition);
    changeRadarPosition(nextPosition + preloadingDirection, true);
}

$('#imgaqi').hide()
$("#staaqi").click(function () {
    if (this.checked) {
        markerAQI.addTo(map)
        $('#imgaqi').fadeIn()
    } else {
        map.removeLayer(markerAQI)
        $('#imgaqi').fadeOut()
    }

})
let markerAQI = L.layerGroup();
let loadAQI = async () => {
    let response = axios.get(url + '/eec-api/get-aqi');
    let responseAll = axios.get(url + '/eec-api/get-aqi-all');

    let iconblue = L.icon({
        iconUrl: './marker/location-pin-blue.svg',
        iconSize: [50, 50],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let icongreen = L.icon({
        iconUrl: './marker/location-pin-green.svg',
        iconSize: [50, 50],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let iconyellow = L.icon({
        iconUrl: './marker/location-pin-yellow.svg',
        iconSize: [50, 50],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let iconorange = L.icon({
        iconUrl: './marker/location-pin-orange.svg',
        iconSize: [50, 50],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let iconred = L.icon({
        iconUrl: './marker/location-pin-red.svg',
        iconSize: [50, 50],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let d = await response;
    let datArr = [];
    d.data.data.map(i => {
        datArr.push({
            "station": i.sta_th,
            "data": Number(i.aqi)
        })
    })

    let x = await responseAll;
    x.data.data.map(i => {
        let dat = {
            sta_id: i.sta_id,
            sta_th: i.sta_th,
            area_th: i.area_th,
            aqi: i.aqi,
            co: i.co,
            no2: i.no2,
            o3: i.o3,
            pm10: i.pm10,
            pm25: i.pm25,
            so2: i.so2
        }
        let marker
        if (Number(i.aqi) <= 25) {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: iconblue,
                name: 'markerAQI',
                data: dat
            });
        } else if (Number(i.aqi) <= 50) {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: icongreen,
                name: 'markerAQI',
                data: dat
            });
        } else if (Number(i.aqi) <= 100) {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: iconyellow,
                name: 'markerAQI',
                data: dat
            });
        } else if (Number(i.aqi) <= 200) {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: iconorange,
                name: 'markerAQI',
                data: dat
            });
        } else {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: iconred,
                name: 'markerAQI',
                data: dat
            });

        }
        markerAQI.addLayer(marker)

        marker.bindPopup(`รหัส : ${i.sta_id}<br> 
      ชื่อสถานี : ${i.sta_th} <br> 
        ค่า AQI : ${Number(i.aqi).toFixed(1)}`
        )

    })
    // markerAQI.addTo(map)
}
loadAQI()

let hpData = axios.get("https://firms.modaps.eosdis.nasa.gov/mapserver/wfs/SouthEast_Asia/c56f7d70bc06160e3c443a592fd9c87e/?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAME=ms:fires_snpp_24hrs&STARTINDEX=0&COUNT=5000&SRSNAME=urn:ogc:def:crs:EPSG::4326&BBOX=-90,-180,90,180,urn:ogc:def:crs:EPSG::4326&outputformat=geojson");
let onEachFeature = (feature, layer) => {
    if (feature.properties) {
        layer.bindPopup(
            `<span class="kanit"><b>ตำแหน่งจุดความร้อน</b>
            <br/>ข้อมูลจาก VIRRS
            <br/>ตำแหน่งที่พบ : ${feature.properties.latitude}, ${feature.properties.longitude} 
            <br/>ค่า Brightness temperature: ${feature.properties.satellite} Kelvin
            <br/>วันที่: ${feature.properties.acq_datetime} UTC`
        );
    }
}

let markerHP = L.layerGroup();
let loadHotspot = async () => {
    let hp = await hpData;
    // console.log(hp);
    const fs = hp.data.features;

    var geojsonMarkerOptions = {
        radius: 6,
        fillColor: "#ff5100",
        color: "#a60b00",
        weight: 0,
        opacity: 1,
        fillOpacity: 0.8
    };

    let marker = await L.geoJSON(fs, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: onEachFeature
    })
    markerHP.addLayer(marker)

}
loadHotspot()
$("#hsport").click(function () {
    if (this.checked) {
        markerHP.addTo(map)
    } else {
        map.removeLayer(markerHP)
    }

})