
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
    ecobound: ecobound
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

let aqichk = false;
$("#aqilist").on("change", async (e) => {
    if (e.target.value) {
        aqichk = true;
        $("#aqidiv").append(`
            <div class="card">
                <div class="card-body">
                    <div class="hchart" id="aqichart"></div>
                </div>
            </div>`);
    } else {
        aqichk = false;
        $("#aqidiv").empty()
    }

    await map.eachLayer(i => {
        if (i.options.name == "aqilyr") {
            map.removeLayer(i)
        }
    })
    // console.log(e);
    e.target.value ? lyr[`${e.target.value}`].addTo(map) : null;
});

let pm25chk = false;
$("#pm25list").on("change", async (e) => {
    if (e.target.value) {
        pm25chk = true;
        $("#pm25div").append(`
            <div class="card">
                <div class="card-body">
                    <div class="hchart" id="pm25chart"></div>
                </div>
            </div>`);
    } else {
        pm25chk = false;
        $("#pm25div").empty()
    }
    await map.eachLayer(i => {
        if (i.options.name == "pm25lyr") {
            map.removeLayer(i)
        }
    })
    e.target.value ? lyr[`${e.target.value}`].addTo(map) : null;
});

let pm10chk = false;
$("#pm10list").on("change", async (e) => {
    if (e.target.value) {
        pm10chk = true;
        $("#pm10div").append(`
        <div class="card">
            <div class="card-body">
                <div class="hchart" id="pm10chart"></div>
            </div>
        </div>`);
    } else {
        pm10chk = false;
        $("#pm10div").empty()
    }
    await map.eachLayer(i => {
        if (i.options.name == "pm10lyr") {
            map.removeLayer(i)
        }
    })
    e.target.value ? lyr[`${e.target.value}`].addTo(map) : null;
});

let cochk = false;
$("#colist").on("change", async (e) => {
    if (e.target.value) {
        cochk = true;
        $("#codiv").append(`
            <div class="card">
                <div class="card-body">
                    <div class="hchart" id="cochart"></div>
                </div>
            </div>`);
    } else {
        cochk = false;
        $("#codiv").empty()
    }
    await map.eachLayer(i => {
        if (i.options.name == "colyr") {
            map.removeLayer(i)
        }
    })
    e.target.value ? lyr[`${e.target.value}`].addTo(map) : null;
});

let o3chk = false;
$("#o3list").on("change", async (e) => {
    if (e.target.value) {
        o3chk = true;
        $("#o3div").append(`
        <div class="card">
            <div class="card-body">
                <div class="hchart" id="o3chart"></div>
            </div>
        </div>`);
    } else {
        o3chk = false;
        $("#o3div").empty()
    }
    await map.eachLayer(i => {
        if (i.options.name == "o3lyr") {
            map.removeLayer(i)
        }
    })
    e.target.value ? lyr[`${e.target.value}`].addTo(map) : null;
});

let so2chk = false;
$("#so2list").on("change", async (e) => {
    if (e.target.value) {
        so2chk = true;
        $("#so2div").append(`
            <div class="card">
                <div class="card-body">
                    <div class="hchart" id="so2chart"></div>
                </div>
            </div>`);
    } else {
        so2chk = false;
        $("#so2div").empty()
    }
    await map.eachLayer(i => {
        if (i.options.name == "so2lyr") {
            map.removeLayer(i)
        }
    })
    e.target.value ? lyr[`${e.target.value}`].addTo(map) : null;
});

let no2chk = false;
$("#no2list").on("change", async (e) => {
    if (e.target.value) {
        no2chk = true;
        $("#no2div").append(`
            <div class="card">
                <div class="card-body">
                    <div class="hchart" id="no2chart"></div>
                </div>
            </div>`);
    } else {
        no2chk = false;
        $("#no2div").empty()
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
let hchart = (dat, div, param, std) => {
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
    categoryAxis.title.text = "วันย้อนหลัง";
    categoryAxis.title.fontSize = 12;

    // Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.baseValue = 0;
    valueAxis.title.text = param;
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

let getFeatureInfo = async (aqiLyr, lyrLen, pnt, size, bbox, div, param, std) => {
    // $("#aqidiv").show();
    let aqiUrl = "https://eec-onep.online:8443/geoserver/wms?SERVICE=WMS" +
        "&VERSION=1.1.1&REQUEST=GetFeatureInfo" +
        "&QUERY_LAYERS=" + aqiLyr +
        "&LAYERS=" + aqiLyr +
        "&Feature_count=" + lyrLen +
        "&INFO_FORMAT=application/json" +
        "&X=" + pnt.x +
        "&Y=" + pnt.y +
        "&SRS=EPSG:4326" +
        "&WIDTH=" + size.x +
        "&HEIGHT=" + size.y +
        "&BBOX=" + bbox;

    await axios.get(aqiUrl).then(r => {
        let dat = [];
        let wk = 0;
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
        hchart(dat, div, param, std)
    });
}


map.on("click", async (e) => {
    var pnt = map.latLngToContainerPoint(e.latlng);
    var size = map.getSize();
    var bbox = map.getBounds().toBBoxString();

    aqichk ? getFeatureInfo(aqiLyr, lyrLen, pnt, size, bbox, "aqichart", "AQI", 50) : null;
    pm25chk ? getFeatureInfo(pm25Lyr, lyrLen, pnt, size, bbox, "pm25chart", "pm25 (µg./m3)", 37) : null;
    pm10chk ? getFeatureInfo(pm10Lyr, lyrLen, pnt, size, bbox, "pm10chart", "pm10 (µg./m3)", 80) : null;
    cochk ? getFeatureInfo(coLyr, lyrLen, pnt, size, bbox, "cochart", "CO (ppm)", 50) : null;
    o3chk ? getFeatureInfo(o3Lyr, lyrLen, pnt, size, bbox, "o3chart", "O3 (ppb)", 6.4) : null;
    so2chk ? getFeatureInfo(so2Lyr, lyrLen, pnt, size, bbox, "so2chart", "SO2 (ppb)", 106) : null;
    no2chk ? getFeatureInfo(no2Lyr, lyrLen, pnt, size, bbox, "no2chart", "NO2 (ppb)", 200) : null;

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

    $("#announce").hide()
    $("#latlon").html(`พิกัด ${(e.latlng.lat).toFixed(2)}, ${(e.latlng.lng).toFixed(2)} &nbsp;`);
    $("#latlon").show();
});

$("#announce").html(`เลือกชั้นข้อมูลคุณภาพอากาศแล้วคลิ๊กลงบนแผนที่เพื่อแสดงข้อมูลคุณภาพอากาศย้อนหลัง 14 วัน`)
