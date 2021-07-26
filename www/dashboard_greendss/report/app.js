
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

const tempanual = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:rain_anual.tif",
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
$("#gwLegend").attr("src", "./img/gw.png");
$("#radarLegend").attr("src", "./img/radar.png");
$("#villLegend").attr("src", eecUrl + "eec:a__05_village");


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
pro.addTo(map)

let lyr = {
    tam: tam,
    amp: amp,
    pro: pro,
    vill: vill,
    lu: lu,
    muni: muni,
    wbody: wbody,
    pcontrol: pcontrol
}

const getWeekNumber = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return [d.getUTCFullYear(), weekNo];
}

var yweek = getWeekNumber(new Date());

for (let i = 1; i <= yweek[1]; i++) {
    // add layer chkbox
    let chk = i == yweek[1] ? "checked" : null;
    $("#templist").append(`<option value="temp_w${i}">สัปดาห์ที่ ${i}</option>`)
    // add legend
    $("#temp_w" + i + "Legend").attr("src", `${eecUrl}eec:rain_w${i}.tif`);
    // add layer
    lyr[`temp_w${i}`] = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
        layers: `eec:temp_w${i}.tif`,
        name: "templyr",
        format: "image/png",
        transparent: true,
        opacity: 0.7,
        zIndex: 2
    })
    // i == yweek[1] ? lyr[`temp_w${i}`].addTo(map) : null;
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
                        ความเร็วลม : ${Number(i.windspeed).toFixed(1)} กิโลเมตร/ชั่วโมง`
        )
    })
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

$("#templist").on("change", async (e) => {
    await map.eachLayer(i => {
        if (i.options.name == "templyr") {
            map.removeLayer(i)
        }
    })
    lyr[`${e.target.value}`].addTo(map);
    // console.log();
})

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
    // console.log(chk);
    chk.map(i => {

        if (lyr[`${i}`]) {
            lyr[`${i}`].addTo(map);
        }

        if (i == "meteo") {
            loadMeteo();
        }

        if (i == "radar") {
            initialize(apiData, optionKind);
        }
    })
})

$("input[name='basemap']").change(async (r) => {
    await map.eachLayer(i => {
        // console.log(i);
        if (i.options.name == "base") {
            map.removeLayer(i)
        }
    })

    let basemap = $("input[name='basemap']:checked").val();
    base[`${basemap}`].addTo(map);
})

$("#hchart").html(`<div style="text-align: center;">คลิ๊กลงบนแผนที่เพื่อดูปริมาณน้ำฝนแต่ละสัปดาห์</div>`)
let hchart = (dat) => {
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("hchart", am4charts.XYChart);
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
    categoryAxis.title.text = "สัปดาห์ที่";
    categoryAxis.title.fontSize = 12;

    // Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.baseValue = 0;
    valueAxis.title.text = "อุณหภูมิ (°c)";
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
        if (target.dataItem.valueY < 0) {
            return am4core.color("#FF0000");
        }
        return fill;
    })
    var range = valueAxis.createSeriesRange(series);
    range.value = 0;
    range.endValue = -1000;
    range.contents.stroke = am4core.color("#FF0000");
    range.contents.fill = range.contents.stroke;

    // // Add scrollbar
    // var scrollbarX = new am4charts.XYChartScrollbar();
    // scrollbarX.series.push(series);
    // chart.scrollbarX = scrollbarX;

    chart.cursor = new am4charts.XYCursor();
}

let tempLyr = 'temp_w1.tif';
let lyrLen;
for (let i = 2; i <= yweek[1]; i++) {
    tempLyr += `,temp_w${i}.tif`;
    lyrLen = i;
}

$("#weeknow").html(`สัปดาห์ปัจจุบัน: ${yweek[1]}`);
map.on("click", async (e) => {
    var pnt = map.latLngToContainerPoint(e.latlng);
    var size = map.getSize()
    var bbox = map.getBounds().toBBoxString()
    let urlWeek = "https://eec-onep.online:8443/geoserver/wms?SERVICE=WMS" +
        "&VERSION=1.1.1&REQUEST=GetFeatureInfo" +
        "&QUERY_LAYERS=" + tempLyr +
        "&LAYERS=" + tempLyr +
        "&Feature_count=" + lyrLen +
        "&INFO_FORMAT=application/json" +
        "&X=" + pnt.x +
        "&Y=" + pnt.y +
        "&SRS=EPSG:4326" +
        "&WIDTH=" + size.x +
        "&HEIGHT=" + size.y +
        "&BBOX=" + bbox;

    await axios.get(urlWeek).then(r => {
        // console.log(r.data.features);
        let dat = [];
        let wk = 1;
        r.data.features.map(i => {
            dat.push({
                "week": wk,
                "value": i.properties.GRAY_INDEX
            })
            wk++;
        })
        hchart(dat)
    })

    let urlฺBound = "https://eec-onep.online:8443/geoserver/wms?SERVICE=WMS" +
        "&VERSION=1.1.1&REQUEST=GetFeatureInfo" +
        "&QUERY_LAYERS=eec:a__03_tambon_eec,eec:a__46_lu_eec_61" +
        "&LAYERS=eec:a__03_tambon_eec,eec:a__46_lu_eec_61" +
        "&Feature_count=3" +
        "&INFO_FORMAT=application/json" +
        "&X=" + pnt.x +
        "&Y=" + pnt.y +
        "&SRS=EPSG:4326" +
        "&WIDTH=" + size.x +
        "&HEIGHT=" + size.y +
        "&BBOX=" + bbox;

    await axios.get(urlฺBound).then(r => {
        // console.log(r.data.features.length);
        $("#latlon").html(`ตำแหน่ง lat: ${(e.latlng.lat).toFixed(2)} 
            lon: ${(e.latlng.lng).toFixed(2)}`);

        if (r.data.features.length > 0) {
            $("#hloc").html(`${r.data.features[0].properties.tam_nam_t} 
                ${r.data.features[0].properties.amphoe_t}
                ${r.data.features[0].properties.prov_nam_t}`);
            $("#landuse").html(`การใช้ประโยชน์ <span class="badge bg-success">${r.data.features[1].properties.lu_des_th}</span>`)
        } else {
            $("#hloc").html("");
            $("#landuse").html("");
        }
    });


})
