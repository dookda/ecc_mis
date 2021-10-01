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
const geourl = "https://eec-onep.online:8443/geoserver/eec/wms?";
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

const rainanual = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:rain_anual.tif",
    name: "lyr",
    format: "image/png",
    transparent: true,
    zIndex: 2
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

const wbody = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__14_w2_eec",
    name: "lyr",
    format: "image/png",
    transparent: true,
    opacity: 0.7,
    zIndex: 1
});

const vill = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__05_village",
    name: "lyr",
    format: "image/png",
    transparent: true,
    zIndex: 2
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
$("#wbodyLegend").attr("src", eecUrl + "eec:a__14_w2_eec");
$("#meteoLegend").attr("src", "./marker-meteo/location-pin-green.svg");
$("#wtrlLegend").attr("src", "./marker-meteo/gas-station.png");
$("#WquaLegend").attr("src", "./marker/sta_qu.png");
$("#gwLegend").attr("src", "./img/gw.png");
$("#radarLegend").attr("src", "./img/radar.png");
$("#villLegend").attr("src", eecUrl + "eec:a__05_village");
$("#rainanualLegend").attr("src", eecUrl + "eec:rain_anual.tif");
$("#ecoboundLegend").attr("src", eecUrl + "eec:a__82_landscape");
$("#zrainWkLegend").attr("src", `${eecUrl}eec:rain_w1.tif`);

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
    wbody: wbody,
    pcontrol: pcontrol,
    rainanual: rainanual,
    ecobound: ecobound
}

pro.addTo(map);
// ecobound.addTo(map);

const getWeekNumber = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return [d.getUTCFullYear(), weekNo];
}

let getDateText = (a) => {
    let d = new Date();
    d.setDate(d.getDate() + a);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
}

var yweek = getWeekNumber(new Date());
// console.log(yweek);
var dforecast = 14;
var dtLabel = [];
for (let i = 1; i <= dforecast; i++) {
    let d = getDateText(i);
    dtLabel.push(d);
    $("#forecast_rain").append(`<option value="forecast_d${i}" >ฝนวันที่ ${d}</option>`);
    lyr[`forecast_d${i}`] = L.tileLayer.wms(geourl, {
        layers: `eec:tmd_nextday${i}.tif`,
        name: "forecastLyr",
        format: "image/png",
        transparent: true,
        opacity: 0.7,
        zIndex: 2
    });
}
let forecastChk = false;
$("#forecast_rain").on("change", async (e) => {
    await map.eachLayer(i => {
        if (i.options.name == "forecastLyr") {
            map.removeLayer(i)
        }
    })
    !e.target.value ? forecastChk = false : forecastChk = true;
    !e.target.value ? $("#chart-f").hide() : null;
    e.target.value ? lyr[`${e.target.value}`].addTo(map) : null;
})

for (let i = 1; i <= yweek[1]; i++) {
    // let d = getDateText(i);
    $("#week_rain").append(`<option value="rain_w${i}" >ฝนสัปดาห์ที่ ${i}</option>`);
    lyr[`rain_w${i}`] = L.tileLayer.wms(geourl, {
        layers: `eec:rain_w${i}.tif`,
        name: "rainweekLyr",
        format: "image/png",
        transparent: true,
        opacity: 0.7,
        zIndex: 2
    });
}

let weekrainChk = false;
$("#week_rain").on("change", async (e) => {
    await map.eachLayer(i => {
        if (i.options.name == "rainweekLyr") {
            map.removeLayer(i)
        }
    });
    !e.target.value ? weekrainChk = false : weekrainChk = true;
    !e.target.value ? $("#chart-w").hide() : null;
    e.target.value ? lyr[`${e.target.value}`].addTo(map) : null;
})


// for (let i = 1; i <= yweek[1]; i++) {
//     let chk = i == yweek[1] ? "checked" : null;
//     $("#rain").append(
//         `<div class="form-check">
//             <input class="form-check-input" type="checkbox" value="zrain_w${i}"
//                 id="zrain_w${i}" ${chk}>
//                 <label class="form-check-label">
//                     ปริมาณน้ำฝนสัปดาห์ที่ ${i}
//                 </label>
//                 <br>
//             <img id="zrainW${i}Legend">
//         </div>`
//     )

//     $("#zrainW" + i + "Legend").attr("src", `${eecUrl}eec:rain_w${i}.tif`);

//     lyr[`zrain_w${i}`] = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
//         layers: `eec:rain_w${i}.tif`,
//         name: "lyr",
//         format: "image/png",
//         transparent: true,
//         zIndex: 2
//     })
//     i == yweek[1] ? lyr[`zrain_w${i}`].addTo(map) : null;
// }



let rainLyr = 'rain_w1.tif';
let lyrLen;
for (let i = 2; i <= yweek[1]; i++) {
    rainLyr += `,rain_w${i}.tif`;
    lyrLen = i;
}

let rainforecastLyr = 'tmd_nextday1.tif';
let rainforecastLen;
for (let i = 2; i <= dforecast; i++) {
    rainforecastLyr += `,tmd_nextday${i}.tif`;
    rainforecastLen = i;
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

let loadWtrl = async () => {
    let iconblue = L.icon({
        iconUrl: './marker/gas-station.png',
        iconSize: [40, 45],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let sta = [
        {
            staname: "station_01",
            latlon: [12.8661616, 100.9989804]
        }, {
            staname: "station_02",
            latlon: [12.848099999999983, 100.95313000000002]
        }, {
            staname: "station_03",
            latlon: [12.846510200000028, 100.9376361]
        }, {
            staname: "station_04",
            latlon: [12.694406999999996, 101.44470699999997]
        }, {
            staname: "station_05",
            latlon: [12.703484000000008, 101.468717]
        }, {
            staname: "station_06",
            latlon: [12.70139960000001, 101.49543049999]
        }, {
            staname: "station_07",
            latlon: [12.985111299999994, 101.6776677]
        }, {
            staname: "station_08",
            latlon: [12.909515899999995, 101.71460159999998]
        }, {
            staname: "station_09",
            latlon: [12.836749900000017, 101.73254899999998]
        }]

    sta.map(async (i) => {
        let resSt01 = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrl-api-get2.php', { station: i.staname, limit: 1 });
        resSt01.then(r => {
            let d = r.data.data[0];
            let marker = L.marker(i.latlon, {
                icon: iconblue,
                name: 'lyr',
                // data: dat
            });

            marker.addTo(map)
            marker.bindPopup(`<div style="font-family:'Kanit'"> 
                        ชื่อสถานี : ${i.staname} <br>
                        ระดับน้ำ : ${Number(d.deep).toFixed(1)} mm.<br>
                        ความชื้นสัมพัทธ์ : ${Number(d.humidity).toFixed(1)} %.<br>
                        อุณหภูมิ : ${Number(d.temperature).toFixed(1)} องศาเซลเซียส<br>
                        ดูกราฟ <span style="font-size: 20px; color:#006fa2; cursor: pointer;" onclick="wtrlModal('${i.staname}')"><i class="bi bi-file-earmark-bar-graph"></i></span>
                        </div>`
            )
        })
    })
}

let wtrlModal = (stname) => {
    // console.log(stname);
    let arrDept = [];
    let arrTemp = [];
    let arrHumi = [];
    axios.post("https://eec-onep.soc.cmu.ac.th/api/wtrl-api-get-by-day.php", { stname }).then(r => {
        // console.log(r);
        r.data.data.map(i => {
            arrDept.push({
                "date": i.dt,
                "value": Math.round(i.dept)
            });
            arrTemp.push({
                "date": i.dt,
                "value": Math.round(i.temp)
            });
            arrHumi.push({
                "date": i.dt,
                "value": Math.round(i.humi)
            });
        })
    })

    setTimeout(() => {
        // console.log(arrDept, arrTemp, arrHumi);
        wtrlChart(arrDept, "depthChart", "ระดับน้ำ (cm.)");
        wtrlChart(arrTemp, "tempChart", "อุณหภูมิ (°C)");
        wtrlChart(arrHumi, "humiChart", "ความชื้น (%)");
    }, 500)


    $("#wtrlModal").modal("show");

}

let responseWeather = axios.get(url + '/eec-api/get-weather-3hr-all');
let loadMeteo = async () => {
    let iconblue = L.icon({
        iconUrl: './marker-meteo/location-pin-blue.svg',
        iconSize: [40, 45],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let icongreen = L.icon({
        iconUrl: './marker-meteo/location-pin-green.svg',
        iconSize: [40, 45],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let iconyellow = L.icon({
        iconUrl: './marker-meteo/location-pin-yellow.svg',
        iconSize: [40, 45],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let iconorange = L.icon({
        iconUrl: './marker-meteo/location-pin-orange.svg',
        iconSize: [40, 45],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let iconred = L.icon({
        iconUrl: './marker-meteo/location-pin-red.svg',
        iconSize: [40, 45],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });

    let x = await responseWeather;
    x.data.data.map(i => {
        // console.log(i);
        let dat = {
            sta_th: i.sta_th,
            rain24hr: i.rain24hr,
            air_temp: i.air_temp,
            rh: i.rh,
            msl_pressure: i.msl_pressure,
            windspeed: i.windspeed
        }
        let marker
        if (Number(i.rainfall) <= 25) {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: iconblue,
                name: 'lyr',
                id: i.sta_id,
                data: dat
            });
        } else if (Number(i.rainfall) <= 50) {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: icongreen,
                name: 'lyr',
                id: i.sta_id,
                data: dat
            });
        } else if (Number(i.rainfall) <= 100) {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: iconyellow,
                name: 'lyr',
                id: i.sta_id,
                data: dat
            });
        } else if (Number(i.rainfall) <= 200) {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: iconorange,
                name: 'lyr',
                id: i.sta_id,
                data: dat
            });
        } else {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: iconred,
                name: 'lyr',
                id: i.sta_id,
                data: dat
            });
        }
        marker.addTo(map)
        marker.bindPopup(`รหัส : ${i.sta_num}<br>
                        ชื่อสถานี : ${i.sta_th} <br>
                        ปริมาณน้ำฝนปัจจุบัน : ${Number(i.rainfall).toFixed(1)} mm.<br>
                        ปริมาณน้ำฝน 24 ชม. : ${Number(i.rain24hr).toFixed(1)} mm.<br>
                        ความชื้นสัมพัทธ์ : ${Number(i.rh).toFixed(1)} %.<br>
                        อุณหภูมิ : ${Number(i.air_temp).toFixed(1)} องศาเซลเซียส<br>
                        ความกดอากาศ : ${Number(i.msl_pressure).toFixed(1)} มิลลิบาร์<br>
                        ความเร็วลม : ${Number(i.windspeed).toFixed(1)} กิโลเมตร/ชั่วโมง<br>`
        )
    })
}

const responseGwater = axios.get(url + "/gwater-api/getdata");

let onEachFeatureGw = (feature, layer) => {
    axios.post(url + "/gwater-api/sensordetail", { station_id: feature.properties.station_id }).then(async (r) => {
        let txt = "";
        await r.data.data.map(i => {
            txt += `<br> <b>ความลึก ${i.depth} เมตร</b> <br>
                ข้อมูลล่าสุด ${i.wl_data_date}<br>
                - ระดับน้ำ: ${i.wl} เมตร<br>
                - การนำไฟฟ้า (ec):  ${i.ec} µs/cm<br>
                - pH: ${i.ph}<br>
                - ความเค็ม:  ${i.sal} ppm<br>
                - ของแข็งที่ละลายในน้ำ (tds):  ${i.tds} mg/L<br>
                - อุณหภูมิ:  ${i.temp} องศาเซลเซียส<br>
            `
        })
        layer.bindPopup(
            `<b>สถานี${feature.properties.station_name} (${feature.properties.station_code} ) </b> <br> 
            ${feature.properties.tambon} ${feature.properties.amphoe} ${feature.properties.province}<br> 
            ${txt}`
        );
    })
}

let loadGw = async () => {
    let x = await responseGwater;
    x.data.data.map(async (i) => {
        var geojsonMarkerOptions = {
            radius: 6,
            fillColor: "#b51ac9",
            color: "#651170",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.5
        };

        let json = {
            type: "Feature",
            properties: {
                station_id: i.station_id,
                station_code: i.station_code,
                station_name: i.station_name,
                tambon: i.tambon,
                amphoe: i.amphoe,
                province: i.province
            },
            geometry: JSON.parse(i.json)
        }

        // console.log(json);
        var marker = await L.geoJSON(json, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions);
            },
            name: "lyr",
            onEachFeature: onEachFeatureGw
        });
        marker.addTo(map);
    });
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

        if (i == "meteo") {
            loadMeteo();
        }

        if (i == "gwater") {
            loadGw();
        }

        if (i == "wtrl") {
            loadWtrl();
        }

        if (i == "Wqua") {
            loadWqua()
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

let wtrlChart = (arrData, div, unit) => {
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    var chart = am4core.create(div, am4charts.XYChart);

    // Add data
    chart.data = arrData;

    // Set input format for the dates
    // chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm:ss";
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.baseValue = 0;
    valueAxis.title.text = unit;

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}";
    // series.tensionX = 0.8;
    series.strokeWidth = 2;
    series.minBulletDistance = 15;
    series.stroke = am4core.color("#00b80f");

    // Drop-shaped tooltips
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";

    // var range = valueAxis.createSeriesRange(series);
    // range.value = index;
    // range.endValue = -1000;
    // range.contents.stroke = am4core.color("#ff0000");
    // range.contents.fill = range.contents.stroke;

    // Make bullets grow on hover
    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");

    // Make a panning cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panXY";
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

    // Create a horizontal scrollbar with previe and place it underneath the date axis
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    dateAxis.start = 0.59;
    dateAxis.keepSelection = true;
}

let hchart = (dat, div, unit) => {
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create(div, am4charts.XYChart);
    chart.paddingRight = 20;

    // Add data
    chart.data = dat;

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "week";
    categoryAxis.renderer.minGridDistance = 50;
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.startLocation = 0.5;
    categoryAxis.endLocation = 0.5;
    categoryAxis.title.text = unit;
    categoryAxis.title.fontSize = 12;
    categoryAxis.renderer.labels.template.rotation = -90;
    categoryAxis.renderer.labels.template.fontSize = 12;


    // Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.baseValue = 0;
    valueAxis.title.text = "ปริมาณน้ำฝน มม.";
    valueAxis.title.fontSize = 12;

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "week";
    series.strokeWidth = 2;
    series.tensionX = 0.77;

    // bullet is added because we add tooltip to a bullet for it to change color
    var bullet = series.bullets.push(new am4charts.Bullet());
    bullet.tooltipText = "{valueY}";

    bullet.adapter.add("fill", function (fill, target) {
        // console.log(target.dataItem.valueY);
        if (target.dataItem.valueY > 100) {
            return am4core.color("#0033c9");
        }
        return fill;
    })
    var range = valueAxis.createSeriesRange(series);
    range.value = 100;
    range.endValue = 1000;
    range.contents.stroke = am4core.color("#0033c9");
    range.contents.fill = range.contents.stroke;

    // // Add scrollbar
    // var scrollbarX = new am4charts.XYChartScrollbar();
    // scrollbarX.series.push(series);
    // chart.scrollbarX = scrollbarX;

    chart.cursor = new am4charts.XYCursor();
}

let showRainweek = async (pnt, size, bbox) => {
    let urlWeek = "https://eec-onep.online:8443/geoserver/wms?SERVICE=WMS" +
        "&VERSION=1.1.1&REQUEST=GetFeatureInfo" +
        "&QUERY_LAYERS=" + rainLyr +
        "&LAYERS=" + rainLyr +
        "&Feature_count=" + lyrLen +
        "&INFO_FORMAT=application/json" +
        "&X=" + Math.round(pnt.x) +
        "&Y=" + Math.round(pnt.y) +
        "&SRS=EPSG:4326" +
        "&WIDTH=" + size.x +
        "&HEIGHT=" + size.y +
        "&BBOX=" + bbox;

    await axios.get(urlWeek).then(r => {
        let dat = [];
        let wk = 1;
        // console.log(r.data.features);
        r.data.features.map(i => {
            dat.push({
                "week": wk,
                "value": i.properties.GRAY_INDEX
            })
            wk++;
        });
        hchart(dat, "hchart", "สัปดาห์ที่");
    });
}

let showrainForecast = async (pnt, size, bbox) => {
    let urlWeek = "https://eec-onep.online:8443/geoserver/wms?SERVICE=WMS" +
        "&VERSION=1.1.1&REQUEST=GetFeatureInfo" +
        "&QUERY_LAYERS=" + rainforecastLyr +
        "&LAYERS=" + rainforecastLyr +
        "&Feature_count=" + rainforecastLen +
        "&INFO_FORMAT=application/json" +
        "&X=" + Math.round(pnt.x) +
        "&Y=" + Math.round(pnt.y) +
        "&SRS=EPSG:4326" +
        "&WIDTH=" + size.x +
        "&HEIGHT=" + size.y +
        "&BBOX=" + bbox;



    await axios.get(urlWeek).then(r => {
        let dat = [];
        let wk = 1;
        r.data.features.map(async (i, j) => {
            // console.log(i);
            // console.log(dtLabel[j - 1]);
            dat.push({
                "week": dtLabel[j - 1],
                "value": i.properties.GRAY_INDEX
            })
            wk++;
        });
        hchart(dat, "forecastchart", "วันที่");
    });
}
$("#chart-w").hide();
$("#chart-f").hide();
map.on("click", async (e) => {
    var pnt = map.latLngToContainerPoint(e.latlng);
    var size = map.getSize();
    var bbox = map.getBounds().toBBoxString();
    // console.log(weekrainChk, forecastChk);
    if (weekrainChk) {
        // $("#chart-w").append(``);
        $("#chart-w").show();
        showRainweek(pnt, size, bbox);
    } else {
        $("#chart-w").hide();
    }

    if (forecastChk) {
        // $("#chart-f").append(``);
        $("#chart-f").show();
        showrainForecast(pnt, size, bbox);
    } else {
        $("#chart-f").hide();
    }

    let urlฺAnual = "https://eec-onep.online:8443/geoserver/wms?SERVICE=WMS" +
        "&VERSION=1.1.1&REQUEST=GetFeatureInfo" +
        "&QUERY_LAYERS=eec:rain_anual.tif" +
        "&LAYERS=eec:rain_anual.tif" +
        "&Feature_count=3" +
        "&INFO_FORMAT=application/json" +
        "&X=" + Math.round(pnt.x) +
        "&Y=" + Math.round(pnt.y) +
        "&SRS=EPSG:4326" +
        "&WIDTH=" + size.x +
        "&HEIGHT=" + size.y +
        "&BBOX=" + bbox;
    // console.log(urlฺAnual);
    await axios.get(urlฺAnual).then(r => {
        // console.log(r);
        if (r.data.features.length > 0) {
            document.getElementById("ranual").innerHTML = `ผลรวมน้ำฝนตั้งแต่สัปดาห์แรก: <span class="badge bg-info" style="font-size:14px;"> ${(r.data.features[0].properties.GRAY_INDEX).toFixed(2)} มม. </span>`
        } else {
            // $("#anual").html("");
            document.getElementById("ranual").innerHTML = ""
            // $("#current").html("");
        }
    });

    let urlฺWeeknow = "https://eec-onep.online:8443/geoserver/wms?SERVICE=WMS" +
        "&VERSION=1.1.1&REQUEST=GetFeatureInfo" +
        "&QUERY_LAYERS=eec:rain_w" + yweek[1] + ".tif" +
        "&LAYERS=eec:rain_w" + yweek[1] + ".tif" +
        "&Feature_count=3" +
        "&INFO_FORMAT=application/json" +
        "&X=" + Math.round(pnt.x) +
        "&Y=" + Math.round(pnt.y) +
        "&SRS=EPSG:4326" +
        "&WIDTH=" + size.x +
        "&HEIGHT=" + size.y +
        "&BBOX=" + bbox;
    // console.log(urlฺWeeknow);
    await axios.get(urlฺWeeknow).then(r => {
        if (r.data.features.length > 0) {
            document.getElementById("rcurrent").innerHTML = `น้ำฝนสัปดาห์นี้: <span class="badge bg-info" style="font-size:14px;">${(r.data.features[0].properties.GRAY_INDEX).toFixed(2)} มม.</span>`;
        } else {
            // $("#anual").html("");
            // $("#rcurrent").html("");
            document.getElementById("rcurrent").innerHTML = "";
        }

    })

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

    $("#announce").html(`สัปดาห์ปัจจุบัน: ${yweek[1]}`)
    // $("#weeknow").html(`สัปดาห์ปัจจุบัน: ${yweek[1]}`);
    // console.log(e);
    $("#latlon").html(`พิกัด ${(e.latlng.lat).toFixed(2)}, ${(e.latlng.lng).toFixed(2)} &nbsp;`);
    // $("#latlon").show();
});

$("#announce").html(`คลิกลงบนแผนที่เพื่อแสดงข้อมูลปริมาณน้ำฝนรายสัปดาห์`);

let loadWqua = async () => {
    let sta = [
        {
            staname: "station_01",
            latlon: [13.691624, 101.442835]
        }, {
            staname: "station_02",
            latlon: [13.0465397, 100.9197114]
        }, {
            staname: "station_03",
            latlon: [12.8291659, 101.3244348]
        }]

    let sum_data = []
    sta.map(async (i) => {
        let dat_ec = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrq-api-cherry.php', { param: "ec", sort: "DESC", stname: i.staname, limit: 1 });
        dat_ec.then(r => {
            let A1 = r.data.data;

            let dat_ph = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrq-api-cherry.php', { param: "ph", sort: "DESC", stname: i.staname, limit: 1 });
            dat_ph.then(r => {
                let B1 = r.data.data;

                let dat_do = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrq-api-cherry.php', { param: "do", sort: "DESC", stname: i.staname, limit: 1 });
                dat_do.then(r => {
                    let C1 = r.data.data;

                    let dat_tmp = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrq-api-cherry.php', { param: "tmp", sort: "DESC", stname: i.staname, limit: 1 });
                    dat_tmp.then(r => {
                        let D1 = r.data.data;
                        sum_data.push({ staname: i.staname, latlon: i.latlon, ec: Number(A1[0].val), ec_time: A1[0].t, ph: Number(B1[0].val), ph_time: B1[0].t, do: Number(C1[0].val), do_time: C1[0].t, tmp: Number(D1[0].val), tmp_time: D1[0].t, tmp: Number(D1[0].val), tmp_time: D1[0].t });

                        if (sum_data.length == '3') {
                            marker_Wqua(sum_data)
                        }
                    })
                })
            })
        })
    })
}

let staW_qua
let marker_Wqua = (d) => {
    let iconblue = L.icon({
        iconUrl: './marker/sta_qu.png',
        iconSize: [50, 50],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });
    staW_qua = L.layerGroup()
    let data = d;
    console.log(data)
    data.map(i => {
        let marker = L.marker(i.latlon, {
            icon: iconblue,
            name: 'lyr',
            // data: dat
        });
        marker.addTo(map)
        marker.bindPopup(`<div style="font-family:'Kanit'; font-size: 15px;"> 
                        ชื่อสถานี : ${i.staname} <br>
                        ค่า pH : ${Number(i.ph).toFixed(1)}<br>
                        ค่าการนำไฟฟ้า : ${Number(i.ec).toFixed(1)} µS/cm<br>
                        ค่า DO : ${Number(i.do).toFixed(1)} ppm<br>
                        อุณหภูมิ : ${Number(i.tmp).toFixed(1)} องศาเซลเซียส<br>
                        ดูกราฟ <span style="font-size: 20px; color:#006fa2; cursor: pointer;" onclick="WquaModal('${i.staname}')"><i class="bi bi-file-earmark-bar-graph"></i></span>
                        </div>`)
        staW_qua.addLayer(marker);
    })
}

let WquaModal = (stname) => {
    // console.log(stname);
    let arrPh = [];
    let arrTemp = [];
    let arrEC = [];
    let arrDO = [];

    let dat_ec = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrq-api-cherry.php', { param: "ec", sort: "DESC", stname: stname, limit: 100 });
    dat_ec.then(r => {
        let A1 = r.data.data;
        // console.log(A1)
        A1.map(i => {
            arrEC.push({
                "date": i.t,
                "value": Number(i.val)
            });
        })
    })

    let dat_ph = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrq-api-cherry.php', { param: "ph", sort: "DESC", stname: stname, limit: 100 });
    dat_ph.then(r => {
        let B1 = r.data.data;
        // console.log(B1)
        B1.map(i => {
            arrPh.push({
                "date": i.t,
                "value": Number(i.val)
            });
        })
    })

    let dat_do = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrq-api-cherry.php', { param: "do", sort: "DESC", stname: stname, limit: 100 });
    dat_do.then(r => {
        let C1 = r.data.data;
        // console.log(C1)
        C1.map(i => {
            arrDO.push({
                "date": i.t,
                "value": Number(i.val)
            });
        })
    })

    let dat_tmp = axios.post('https://eec-onep.soc.cmu.ac.th/api/wtrq-api-cherry.php', { param: "tmp", sort: "DESC", stname: stname, limit: 100 });
    dat_tmp.then(r => {
        let D1 = r.data.data;
        // console.log(D1)
        D1.map(i => {
            arrTemp.push({
                "date": i.t,
                "value": Number(i.val)
            });
        })
    })

    setTimeout(() => {
        // console.log(arrDept, arrTemp, arrHumi);
        Wquachart(arrPh, "pHChart", "ค่า pH");
        Wquachart(arrEC, "ECChart", "ค่าการนำไฟฟ้า (µS/cm)");
        Wquachart(arrTemp, "TempChart", "อุณหภูมิ (°C)");
        Wquachart(arrDO, "DOChart", "ค่า DO (ppm)");
    }, 500)


    $("#WquaModal").modal("show");

}

let Wquachart = function (data, div, title) {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create(div, am4charts.XYChart);
    chart.paddingRight = 60;
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm:ss";

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.baseInterval = {
        "timeUnit": "minute",
        "count": 1
    };

    dateAxis.dateFormats.setKey("dd MMMM yyyy");
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 60;
    dateAxis.tooltipDateFormat = "yyyy-MM-dd HH:mm:ss";

    chart.data = data;

    // Create axes
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.title.text = title;


    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.strokeWidth = 2;
    // series.tensionX = 0.8;
    series.stroke = am4core.color("#00BFFF");
    series.minBulletDistance = 10;
    series.tooltipText = "{valueY}";
    series.tooltip.pointerOrientation = "value";
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.fillOpacity = 0.5;
    series.tooltip.label.padding(12, 12, 12, 12)

    // var range = valueAxis.createSeriesRange(series);
    // range.value = 35;
    // range.endValue = 100;
    // range.contents.stroke = am4core.color("#ff0000");
    // range.contents.fill = range.contents.stroke;

    // chart.cursor = new am4charts.XYCursor();
    // chart.cursor.snapToSeries = series;
    // chart.cursor.xAxis = dateAxis;

    // chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarX = new am4core.Scrollbar();

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

};