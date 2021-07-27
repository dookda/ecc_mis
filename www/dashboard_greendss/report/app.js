
// const url = "https://eec-onep.online:3700";
const url = 'http://localhost:3700';

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

const green = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__52_gr_park",
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


let lyrs = L.featureGroup().addTo(map)

let eecUrl = "https://eec-onep.online:8443/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&legend_options=fontName:Kanit&LAYER=";
// let rtiUrl = "https://rti2dss.com:8443/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=";

$("#greenLegend").attr("src", eecUrl + "eec:a__52_gr_park");
$("#luLegend").attr("src", eecUrl + "eec:a__46_lu_eec_61");
$("#munLegend").attr("src", eecUrl + "eec:a__04_municiple");
$("#proLegend").attr("src", eecUrl + "eec:a__01_prov_eec");
$("#ampLegend").attr("src", eecUrl + "eec:a__02_amphoe_eec");
$("#tamLegend").attr("src", eecUrl + "eec:a__03_tambon_eec");
$("#controlLegend").attr("src", eecUrl + "eec:a__06_pollution_control");
$("#meteoLegend").attr("src", "./marker-meteo/location-pin-green.svg");
$("#villLegend").attr("src", eecUrl + "eec:a__05_village");
$("#ecoboundLegend").attr("src", eecUrl + "eec:a__82_landscape");


var toggle = true;
$("#stopEditBtn").attr('disabled', true);
map.pm.addControls({
    position: 'topright',
    drawPolyline: false,
    drawMarker: false,
    drawCircle: false,
    drawRectangle: true,
    drawCircleMarker: false,
    cutPolygon: false,
    rotateMode: false,
    dragMode: false,

    drawRectangle: true,
    drawPolygon: true,
    removalMode: true,
    editControls: true
});
map.pm.toggleControls()

let geom = [];
map.on('pm:create', e => {
    e.layer.options.name = "da";
    geom = e.layer.toGeoJSON();
    var polygon = turf.polygon(geom.geometry.coordinates);
    var area = turf.area(polygon);

    $("#arealist").append(` <li>${area}</li>`);

    e.layer.on('pm:edit', function (x) {
        e.layer.options.name2 = "da";
        console.log('edit', x)
    });
});

let calArea = () => {
    toggle = false;
    $("#hloc").html("");
    $("#landuse").html("");
    $("#latlon");
    $("#startEditBtn").attr('disabled', true);
    $("#stopEditBtn").attr('disabled', false);

    map.pm.toggleControls()
}

let stopEdit = () => {
    toggle = true;
    $("#startEditBtn").attr('disabled', false);
    $("#stopEditBtn").attr('disabled', true);
    map.pm.toggleControls()
    $("#arealist").empty();


    map.eachLayer((lyr) => {
        if (lyr.options.name == 'da') {
            console.log(lyr.options.name);
            map.removeLayer(lyr);
        }
    });
}


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
    green: green,
    lu: lu,
    muni: muni,
    pcontrol: pcontrol,
    ecobound: ecobound
}

pro.addTo(map);
ecobound.addTo(map);
green.addTo(map);

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
    i == yweek[1] ? $("#templist").append(`<option value="temp_w${i}" selected>สัปดาห์ที่ ${i}</option>`) : $("#templist").append(`<option value="temp_w${i}">สัปดาห์ที่ ${i}</option>`);
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
    i == yweek[1] ? lyr[`temp_w${i}`].addTo(map) : null;
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


$("#templist").on("change", async (e) => {
    await map.eachLayer(i => {
        if (i.options.name == "templyr") {
            map.removeLayer(i)
        }
    })
    e.target.value ? lyr[`${e.target.value}`].addTo(map) : null;
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

    chk.map(i => {

        if (lyr[`${i}`]) {
            lyr[`${i}`].addTo(map);
        }

        if (i == "meteo") {
            loadMeteo();
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

$("#hchart").html(`<div style="text-align: center;">คลิ๊กลงบนแผนที่เพื่อดูอุณหภูมิแต่ละสัปดาห์</div>`)
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
        if (target.dataItem.valueY > 37) {
            return am4core.color("#c94d00");
        }
        return fill;
    })
    var range = valueAxis.createSeriesRange(series);
    range.value = 37;
    range.endValue = 1000;
    range.contents.stroke = am4core.color("#c94d00");
    range.contents.fill = range.contents.stroke;

    // // Add scrollbar
    // var scrollbarX = new am4charts.XYChartScrollbar();
    // scrollbarX.series.push(series);
    // chart.scrollbarX = scrollbarX;

    chart.cursor = new am4charts.XYCursor();
    $("#remark").html(`* สีแดงหมายถึงอุณหภูมิเกิน 37 °C`);
}

let tempLyr = 'temp_w1.tif';
let lyrLen;
for (let i = 2; i <= yweek[1]; i++) {
    tempLyr += `,temp_w${i}.tif`;
    lyrLen = i;
}

$("#weeknow").html(`สัปดาห์ปัจจุบัน: ${yweek[1]}`);
$("#hloc").hide();
$("#landuse").hide();
$("#latlon").hide();
let getFeatureInfo = async (e) => {
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
                        ${r.data.data[0].prov_nam_t}<br>`);
            $("#hloc").show();
        } else {
            $("#hloc").html("");
            $("#hloc").hide();
        }
    })

    $("#announce").hide()
    $("#latlon").html(`ตำแหน่ง lat: ${(e.latlng.lat).toFixed(2)} 
            lon: ${(e.latlng.lng).toFixed(2)}<br>`);
    $("#latlon").show();
}

let selectAction = (e) => {
    toggle ? getFeatureInfo(e) : null;
}

map.on("click", (e) => selectAction(e));

$("#announce").html(`คลิ๊กลงบนแผนที่เพื่อแสดงข้อมูลอุณหภูมิรายสัปดาห์`)

var legend = L.control({ position: "bottomleft" });

function showLegend() {
    legend.onAdd = function (map) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += `<button class="btn btn-sm" onClick="hideLegend()">
      <span class="kanit">ซ่อนสัญลักษณ์</span><i class="fa fa-angle-double-down" aria-hidden="true"></i>
    </button><br>`;
        // div.innerHTML += "<h4>Tegnforklaring</h4>";
        div.innerHTML += '<i style="background: #feef42"></i><span class="kanit">0-25 °c</span><br>';
        div.innerHTML += '<i style="background: #fecd2e"></i><span class="kanit">25-30 °c</span><br>';
        div.innerHTML += '<i style="background: #fd9c00"></i><span class="kanit">30-33 °c</span><br>';
        div.innerHTML += '<i style="background: #fd7602"></i><span class="kanit">33-36 °c</span><br>';
        div.innerHTML += '<i style="background: #e24900"></i><span class="kanit">36-39 °c</span><br>';
        div.innerHTML += '<i style="background: #cc2301"></i><span class="kanit">39-42 °c</span><br>';
        div.innerHTML += '<i style="background: #860200"></i><span class="kanit">42 °c</span><br>';
        return div;
    };
    legend.addTo(map);
}

function hideLegend() {
    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend')
        div.innerHTML += `<button class="btn btn-sm" onClick="showLegend()">
        <small class="prompt"><span class="kanit">แสดงสัญลักษณ์</span></small> 
        <i class="fa fa-angle-double-up" aria-hidden="true"></i>
    </button><br> `;
        return div;
    };
    legend.addTo(map);
}

hideLegend()
