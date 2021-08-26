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

const lu61 = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__46_lu_eec_61",
    name: "lyr",
    format: "image/png",
    transparent: true,
});

const muni = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__04_municiple",
    name: "lyr",
    format: "image/png",
    transparent: true,
});

const pro = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__01_prov_eec",
    name: "lyr",
    format: "image/png",
    transparent: true,
    maxZoom: 10
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=22 OR pro_code=23 OR pro_code=24 OR pro_code=25 OR pro_code=26 OR pro_code=27'
});

const amp = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__02_amphoe_eec",
    name: "lyr",
    format: "image/png",
    transparent: true,
    maxZoom: 12
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=22 OR pro_code=23 OR pro_code=24 OR pro_code=25 OR pro_code=26 OR pro_code=27'
});

const tam = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__03_tambon_eec",
    name: "lyr",
    format: "image/png",
    transparent: true,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=22 OR pro_code=23 OR pro_code=24 OR pro_code=25 OR pro_code=26 OR pro_code=27'
});

const wbody = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__14_w2_eec",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const vill = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__05_village",
    name: "lyr",
    format: "image/png",
    transparent: true
});
// cherry
const maintran = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__49_maintran",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const tran = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__49_tran",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const highway = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__49_highway",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const train = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__37_train",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const munilandmark = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__50_muni_lm_eec",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const landmark = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__38_landmark",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const artsource = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__36_artsource",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const countour = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__11_countour",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const waterpath = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__13_water_path",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const basinquality = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__16_basinquality",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const mainbasin = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__12_main_basin_eec",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const subbasin = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__12_sub_basin",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const hydrogeology = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__18_hydrogeology",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const waterlevel_sa = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__15_waterlevel_sa",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const wsup_pipe = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__53_wsup_pipe_wa_3p",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const wdiv_pipe = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__53_wdiv_pipe_3p",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const locarid9 = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__53_loca_rid9",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const dambpk = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__53_dam_bpk",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const mainriver9 = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__53_main_riv_3p",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const pjarea_rid9 = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__53_pj_area_rid9_3p",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const pjloca_rid9 = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__53_pj_loca_rid9_3p",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const soundpoint = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__08_soundpoint",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const waterstation = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__10_water_station",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const wastewater = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__57_wastewater",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const garbage = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__55_garbage",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const flood = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__41_flood",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const earthquake = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__42_earthquake",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const landslide = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__43_landslide",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const hole = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__44_hole",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const drought = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__45_drought",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const grpark = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__52_gr_park",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const f_reserved = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__26_f_reserved_eec",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const nationalpark = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__28_nationalparkboi",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const park = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__29_park_dnp",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const wildlife = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__30_wildlife_boi",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const non_hunting = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__31_non_huntingboi",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const f_type63 = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__27_f_type63_eec",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const afforesta = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__33_afforestation",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const alroarea = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__35_alroarea",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const commu_forest = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__56_commu_forest",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const geology = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__19_geology",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const mineral = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__40_mineral",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const geoconser = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__22_geologi_conser",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const minerdev = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__20_mineral_develop",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const geominer = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__20_geology_miner",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const oremine = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__21_ore mine",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const soil = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__25_soil_eec",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const mang_forest = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__51_mang_forest_cabinet",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const lu56 = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__46_lu_eec_56",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const lu59 = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__46_lu_eec_59",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const lucbi63 = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__47_lu_cbi_2563",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const luryg63 = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__47_lu_ryg_2563",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const a9 = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__48_a9_eec",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const MangLU = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__39_mangrovelu",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const Coastal = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__34_coastal",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const ProtecPollu = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__67_protec_pollu_cb_area_eec",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const ancient = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__72_ancient_eec",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const oldcommu = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__73_old_community_eec_point",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const oldtown_cco = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__74_oldtown_cco",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const oldtown_ryg = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__75_oldtown_ryg",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const pollu = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__81_pollution_eec",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const landscape = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__82_landscape",
    name: "lyr",
    format: "image/png",
    transparent: true
});

const coastalradar = L.tileLayer.wms("https://ocean.gistda.or.th/geoserver/coastalradar/wms?", {
    layers: "coastalradar:recent_gulf,coastalradar:v_recent_gul5",
    name: "lyr",
    format: "image/png",
    transparent: true
});


const coastalmon59 = L.tileLayer.wms("http://marinegiscenter.dmcr.go.th/cgi-bin/mapserv.exe?MAP=%2Fms4w%2Fapps%2Fgeomoose2%2Fmaps%2F%2Fdmcr%2Fgroup1%2Fshoreline_2559.map", {
    layers: "shoreline_2559",
    name: "lyr",
    format: "image/png",
    crs: L.CRS.EPSG3857,
    transparent: true
});
const coastalmon60 = L.tileLayer.wms("http://marinegiscenter.dmcr.go.th/cgi-bin/mapserv.exe?MAP=%2Fms4w%2Fapps%2Fgeomoose2%2Fmaps%2F%2Fdmcr%2Fgroup1%2Fshoreline2560.map", {
    layers: "shoreline2560",
    name: "lyr",
    format: "image/png",
    crs: L.CRS.EPSG3857,
    transparent: true
});
const coastalmon61 = L.tileLayer.wms("http://marinegiscenter.dmcr.go.th/cgi-bin/mapserv.exe?MAP=%2Fms4w%2Fapps%2Fgeomoose2%2Fmaps%2F%2Fdmcr%2Fgroup1%2Fshoreline2561_erosion_geo_status_erosion.map", {
    layers: "shoreline2561_erosion_geo_status_erosion",
    name: "lyr",
    format: "image/png",
    crs: L.CRS.EPSG3857,
    transparent: true
});
const coastalmon62 = L.tileLayer.wms("http://marinegiscenter.dmcr.go.th/cgi-bin/mapserv.exe?MAP=%2Fms4w%2Fapps%2Fgeomoose2%2Fmaps%2F%2Fdmcr%2Fgroup1%2Fstatuscoast2562.map", {
    layers: "statuscoast2562",
    name: "lyr",
    format: "image/png",
    crs: L.CRS.EPSG3857,
    transparent: true
});

let lyrs = L.featureGroup().addTo(map)


// var baseMap = {
//     "Mapbox": mapbox.addTo(map),
//     "google Hybrid": ghyb
// }

// var overlayMap = {
//     "ขอบเขตตำบล": tam.addTo(map),
//     "ขอบเขตอำเภอ": amp.addTo(map),
//     "ขอบเขตจังหวัด": pro.addTo(map)
// }

function onLocationFound(e) {
    // latLng = e.latlng;
    // nearData(e)
}

map.on("locationfound", onLocationFound);
// map.on("locationerror", onLocationError);
map.locate({ setView: true, maxZoom: 19 });

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

// cherry
let lyr = {
    tam: tam,
    amp: amp,
    pro: pro.addTo(map),
    vill: vill,
    lu61: lu61,
    muni: muni,
    wbody: wbody,
    maintran: maintran,
    tran: tran,
    highway: highway,
    train: train,
    munilandmark: munilandmark,
    landmark: landmark,
    artsource: artsource,
    countour: countour,
    waterpath: waterpath,
    basinquality: basinquality,
    mainbasin: mainbasin,
    subbasin: subbasin,
    hydrogeology: hydrogeology,
    waterlevel_sa: waterlevel_sa,
    wsup_pipe: wsup_pipe,
    wdiv_pipe: wdiv_pipe,
    locarid9: locarid9,
    dambpk: dambpk,
    mainriver9: mainriver9,
    pjarea_rid9: pjarea_rid9,
    pjloca_rid9: pjloca_rid9,
    soundpoint: soundpoint,
    waterstation: waterstation,
    wastewater: wastewater,
    garbage: garbage,
    flood: flood,
    earthquake: earthquake,
    landslide: landslide,
    hole: hole,
    drought: drought,
    grpark: grpark,
    f_reserved: f_reserved,
    nationalpark: nationalpark,
    park: park,
    wildlife: wildlife,
    non_hunting: non_hunting,
    f_type63: f_type63,
    afforesta: afforesta,
    alroarea: alroarea,
    commu_forest: commu_forest,
    geology: geology,
    mineral: mineral,
    geoconser: geoconser,
    minerdev: minerdev,
    geominer: geominer,
    oremine: oremine,
    soil: soil,
    mang_forest: mang_forest,
    lu56: lu56,
    lu59: lu59,
    lucbi63: lucbi63,
    luryg63: luryg63,
    a9: a9,
    MangLU: MangLU,
    Coastal: Coastal,
    ProtecPollu: ProtecPollu,
    ancient: ancient,
    oldcommu: oldcommu,
    oldtown_cco: oldtown_cco,
    oldtown_ryg: oldtown_ryg,
    pollu: pollu,
    landscape: landscape,
    coastalradar: coastalradar,
    coastalmon59: coastalmon59,
    coastalmon60: coastalmon60,
    coastalmon61: coastalmon61,
    coastalmon62: coastalmon62

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
    // console.log("ok");
}

let getDetail = (e) => {
    sessionStorage.setItem('orgid', e);
    location.href = "./../detail/index.html";
}

let hpData = axios.get("https://rti2dss.com:3600/hp_api/hp_viirs_th?fbclid=IwAR34tLi82t2GbsXPK8DmS30NJDWN93Q1skgP-eACKOucWs9pNYjHs24kHT4");
let onEachFeatureHotspot = (feature, layer) => {
    if (feature.properties) {
        const time = feature.properties.acq_time;
        const hr = Number(time.slice(0, 2));
        const mn = Number(time.slice(2, 4));
        layer.bindPopup(
            '<b>ตำแหน่งจุดความร้อน (hotspot)</b>' +
            '<br/>lat: ' + feature.properties.latitude +
            '<br/>lon: ' + feature.properties.longitude +
            // '<br/>satellite: ' + feature.properties.satellite +
            '<br/>วันที่: ' + feature.properties.acq_date +
            '<br/>เวลา: ' + hr + ':' + mn
        );
    }
}

let loadHotspot = async () => {
    let hp = await hpData;
    // console.log(hp);
    const fs = hp.data.data.features;

    var geojsonMarkerOptions = {
        radius: 6,
        fillColor: "#ff5100",
        color: "#a60b00",
        weight: 0,
        opacity: 1,
        fillOpacity: 0.8
    };

    await L.geoJSON(fs, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        name: "lyr",
        onEachFeature: onEachFeatureHotspot
    }).addTo(map);
}

let responseAll = axios.get(url + '/eec-api/get-aqi-all');
let loadAqi = async () => {
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

        let marker;
        if (Number(i.aqi) <= 25) {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: iconblue,
                name: 'lyr',
                data: dat
            });
        } else if (Number(i.aqi) <= 50) {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: icongreen,
                name: 'lyr',
                data: dat
            });
        } else if (Number(i.aqi) <= 100) {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: iconyellow,
                name: 'lyr',
                data: dat
            });
        } else if (Number(i.aqi) <= 200) {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: iconorange,
                name: 'lyr',
                data: dat
            });
        } else {
            marker = L.marker([Number(i.lat), Number(i.lon)], {
                icon: iconred,
                name: 'lyr',
                data: dat
            });
        }

        marker.addTo(map)
        marker.bindPopup(`รหัส : ${i.sta_id}<br> 
            ชื่อสถานี : ${i.sta_th} <br> 
            ค่า AQI : ${Number(i.aqi).toFixed(1)}<br> 
            ค่า PM10 : ${Number(i.pm10).toFixed(1)} µg./m<sup>3</sup><br> 
            ค่า PM2.5 : ${Number(i.pm25).toFixed(1)} µg./m<sup>3</sup><br> 
            ค่า CO : ${Number(i.co).toFixed(1)} ppm<br>
            ค่า NO<sub>2</sub> : ${Number(i.no2).toFixed(1)} ppm<br> 
            ค่า SO<sub>2</sub> : ${Number(i.so2).toFixed(1)} ppm<br> 
            ค่า O<sub>3</sub> : ${Number(i.o3).toFixed(1)} ppm<br> `
        )
    })
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

const responseGwater = axios.get(url + "/gwater-api/getdata");
// const api_3 = axios.get("https://eec-onep.online:3700/api/rankWater/");

let onEachFeatureGw = (feature, layer) => {
    // console.log(lyr.properties);
    axios.post(url + "/gwater-api/sensordetail", { station_id: feature.properties.station_id }).then(async (r) => {
        let txt = "";
        await r.data.data.map(i => {
            // console.log(i);
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
    // console.log(x);
    x.data.data.map(async (i) => {
        // console.log(i);
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
        // console.log(i);
        if (i.options.name == "lyr") {
            map.removeLayer(i)
        }
    })

    let chk = [];
    await $('input[type=checkbox]:checked').each(function () {
        chk.push($(this).val());
    });

    chk.map(i => {
        // console.log(i);
        if (lyr[`${i}`]) {
            lyr[`${i}`].addTo(map);
        }
        if (i == "hotspot") {
            loadHotspot();
        }

        if (i == "aqi") {
            loadAqi();
        }

        if (i == "meteo") {
            loadMeteo();
        }

        if (i == "gwater") {
            loadGw();
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

let eecUrl = "https://eec-onep.online:8443/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&legend_options=fontName:Kanit&LAYER=";
let gistdaUrl = "http://ocean.gistda.or.th:80/geoserver/coastalradar/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=";
let costUrl = "http://marinegiscenter.dmcr.go.th/cgi-bin/mapserv.exe?MAP=%2Fms4w%2Fapps%2Fgeomoose2%2Fmaps%2F%2Fdmcr%2Fgroup1%2Fshoreline_2559.map?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=";
// let rtiUrl = "https://rti2dss.com:8443/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=";

//cherry
$("#lu61Legend").attr("src", eecUrl + "eec:a__46_lu_eec_61");
$("#munLegend").attr("src", eecUrl + "eec:a__04_municiple");
$("#proLegend").attr("src", eecUrl + "eec:a__01_prov_eec");
$("#ampLegend").attr("src", eecUrl + "eec:a__02_amphoe_eec");
$("#tamLegend").attr("src", eecUrl + "eec:a__03_tambon_eec");
$("#wbodyLegend").attr("src", eecUrl + "eec:a__14_w2_eec");
$("#maintranLegend").attr("src", eecUrl + "eec:a__49_maintran");
$("#tranLegend").attr("src", eecUrl + "eec:a__49_tran");
$("#highwayLegend").attr("src", eecUrl + "eec:a__49_highway");
$("#trainLegend").attr("src", eecUrl + "eec:a__37_train");
$("#munilandmarkLegend").attr("src", eecUrl + "eec:a__50_muni_lm_eec");
$("#landmarkLegend").attr("src", eecUrl + "	eec:a__38_landmark");
$("#artsourceLegend").attr("src", eecUrl + "eec:a__36_artsource");
$("#countourLegend").attr("src", eecUrl + "eec:a__11_countour");
$("#waterpathLegend").attr("src", eecUrl + "eec:a__13_water_path");
$("#basinqualityLegend").attr("src", eecUrl + "eec:a__16_basinquality");
$("#mainbasinLegend").attr("src", eecUrl + "eec:a__12_main_basin_eec");
$("#subbasinLegend").attr("src", eecUrl + "eec:a__12_sub_basin");
$("#hydrogeologyLegend").attr("src", eecUrl + "eec:a__18_hydrogeology");
$("#waterlevel_saLegend").attr("src", eecUrl + "eec:a__15_waterlevel_sa");
$("#wsup_pipeLegend").attr("src", eecUrl + "eec:a__53_wsup_pipe_wa_3p");
$("#wdiv_pipeLegend").attr("src", eecUrl + "eec:a__53_wdiv_pipe_3p");
$("#locarid9Legend").attr("src", eecUrl + "eec:a__53_loca_rid9");
$("#dambpkLegend").attr("src", eecUrl + "eec:a__53_dam_bpk");
$("#mainriver9Legend").attr("src", eecUrl + "eec:a__53_main_riv_3p");
$("#pjarea_rid9Legend").attr("src", eecUrl + "eec:a__53_pj_area_rid9_3p");
$("#pjloca_rid9Legend").attr("src", eecUrl + "eec:a__53_pj_loca_rid9_3p");
$("#soundpointLegend").attr("src", eecUrl + "eec:a__08_soundpoint");
$("#waterstationLegend").attr("src", eecUrl + "eec:a__10_water_station");
$("#wastewaterLegend").attr("src", eecUrl + "eec:a__57_wastewater");
$("#garbageLegend").attr("src", eecUrl + "eec:a__55_garbage");
$("#floodLegend").attr("src", eecUrl + "eec:a__41_flood");
$("#earthquakeLegend").attr("src", eecUrl + "eec:a__42_earthquake");
$("#landslideLegend").attr("src", eecUrl + "eec:a__43_landslide");
$("#holeLegend").attr("src", eecUrl + "eec:a__44_hole");
$("#droughtLegend").attr("src", eecUrl + "eec:a__45_drought");
$("#grparkLegend").attr("src", eecUrl + "eec:a__52_gr_park");
$("#f_reservedLegend").attr("src", eecUrl + "eec:a__26_f_reserved_eec");
$("#nationalparkLegend").attr("src", eecUrl + "eec:a__28_nationalparkboi");
$("#parkLegend").attr("src", eecUrl + "eec:a__29_park_dnp");
$("#wildlifeLegend").attr("src", eecUrl + "eec:a__30_wildlife_boi");
$("#non_huntingLegend").attr("src", eecUrl + "eec:a__31_non_huntingboi");
$("#f_type63Legend").attr("src", eecUrl + "eec:a__27_f_type63_eec");
$("#afforestaLegend").attr("src", eecUrl + "eec:a__33_afforestation");
$("#alroareaLegend").attr("src", eecUrl + "eec:a__35_alroarea");
$("#commu_forestLegend").attr("src", eecUrl + "eec:a__56_commu_forest");
$("#geologyLegend").attr("src", eecUrl + "eec:a__19_geology");
$("#mineralLegend").attr("src", eecUrl + "eec:a__40_mineral");
$("#geoconserLegend").attr("src", eecUrl + "eec:a__22_geologi_conser");
$("#minerdevLegend").attr("src", eecUrl + "eec:a__20_mineral_develop");
$("#geominerLegend").attr("src", eecUrl + "eec:a__20_geology_miner");
$("#oremineLegend").attr("src", eecUrl + "eec:a__21_ore mine");
$("#soilLegend").attr("src", eecUrl + "eec:a__25_soil_eec");
$("#mang_forestLegend").attr("src", eecUrl + "eec:a__51_mang_forest_cabinet");
$("#lu56Legend").attr("src", eecUrl + "eec:a__46_lu_eec_56");
$("#lu59Legend").attr("src", eecUrl + "eec:a__46_lu_eec_59");
$("#lucbi63Legend").attr("src", eecUrl + "eec:a__47_lu_cbi_2563");
$("#luryg63Legend").attr("src", eecUrl + "eec:a__47_lu_ryg_2563");
$("#a9Legend").attr("src", eecUrl + "eec:a__48_a9_eec");
$("#MangLULegend").attr("src", eecUrl + "eec:a__39_mangrovelu");
$("#CoastalLegend").attr("src", eecUrl + "eec:a__34_coastal");
$("#ProtecPolluLegend").attr("src", eecUrl + "eec:a__67_protec_pollu_cb_area_eec");
$("#ancientLegend").attr("src", eecUrl + "eec:a__72_ancient_eec");
$("#oldcommuLegend").attr("src", eecUrl + "eec:a__73_old_community_eec_point");
$("#oldtown_ccoLegend").attr("src", eecUrl + "eec:a__74_oldtown_cco");
$("#oldtown_rygLegend").attr("src", eecUrl + "eec:a__75_oldtown_ryg");
$("#polluLegend").attr("src", eecUrl + "eec:a__81_pollution_eec");
$("#landscapeLegend").attr("src", eecUrl + "eec:a__82_landscape");

$("#coastalmon59Legend").attr("src", "http://marinegiscenter.dmcr.go.th/cgi-bin/mapserv.exe?FORMAT=image/png&MAP=/ms4w/apps/geomoose2/maps//dmcr/group1/shoreline_2559.map&TRANSPARENT=TRUE&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&_OLSALT=0.4311615570908689&SRS=EPSG:3857&SCALE=27734017.04636604&WIDTH=250&STYLE=&LAYER=shoreline_2559");
$("#coastalmon60Legend").attr("src", "http://marinegiscenter.dmcr.go.th/cgi-bin/mapserv.exe?FORMAT=image/png&MAP=/ms4w/apps/geomoose2/maps//dmcr/group1/shoreline2560.map&TRANSPARENT=TRUE&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&_OLSALT=0.3282854129563051&SRS=EPSG:3857&SCALE=27734017.04636604&WIDTH=250&STYLE=&LAYER=shoreline2560");
$("#coastalmon61Legend").attr("src", "http://marinegiscenter.dmcr.go.th/cgi-bin/mapserv.exe?FORMAT=image/png&MAP=/ms4w/apps/geomoose2/maps//dmcr/group1/shoreline2561_erosion_geo_status_erosion.map&TRANSPARENT=TRUE&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&_OLSALT=0.6537560267000855&SRS=EPSG:3857&SCALE=27734017.04636604&WIDTH=250&STYLE=&LAYER=shoreline2561_erosion_geo_status_erosion")
$("#coastalmon62Legend").attr("src", "http://marinegiscenter.dmcr.go.th/cgi-bin/mapserv.exe?FORMAT=image/png&MAP=/ms4w/apps/geomoose2/maps//dmcr/group1/statuscoast2562.map&TRANSPARENT=TRUE&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&_OLSALT=0.9216863191450226&SRS=EPSG:3857&SCALE=27734017.04636604&WIDTH=250&STYLE=&LAYER=statuscoast2562")

$("#aqiLegend").attr("src", "./marker/location-pin-green.svg");
$("#meteoLegend").attr("src", "./marker-meteo/location-pin-green.svg");

$("#hpLegend").attr("src", "./img/hotspot.png");
$("#gwLegend").attr("src", "./img/gw.png");

$("#radarLegend").attr("src", "./img/radar.png");

$("#villLegend").attr("src", eecUrl + "eec:a__05_village");

let chartpop = (data) => {
    $("#chartdiv").removeAttr("style").css({ "width": "800px", "height": "400px" })
    am4core.useTheme(am4themes_animated);

    var chart = am4core.create('chartdiv', am4charts.XYChart)
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend()
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95

    var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'category'
    xAxis.renderer.cellStartLocation = 0.1
    xAxis.renderer.cellEndLocation = 0.9
    xAxis.renderer.grid.template.location = 0;

    var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name) {
        var series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'category'
        series.name = name

        series.events.on("hidden", arrangeColumns);
        series.events.on("shown", arrangeColumns);

        var bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.interactionsEnabled = false
        bullet.dy = 30;
        bullet.label.text = '{valueY}'
        bullet.label.fill = am4core.color('#ffffff')

        return series;
    }
    chart.data = data
    // [
    //     {
    //         category: 'Place #1',
    //         first: 400000,
    //         second: 550000,
    //         third: 60000
    //     },
    //     {
    //         category: 'Place #2',
    //         first: 30000,
    //         second: 78000,
    //         third: 69000
    //     },
    //     {
    //         category: 'Place #3',
    //         first: 27000,
    //         second: 40000,
    //         third: 4500
    //     },
    //     {
    //         category: 'Place #4',
    //         first: 5000,
    //         second: 3300,
    //         third: 2200
    //     }
    // ]

    createSeries('first', 'The First');
    createSeries('second', 'The Second');
    createSeries('third', 'The Third');

    function arrangeColumns() {

        var series = chart.series.getIndex(0);

        var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
        if (series.dataItems.length > 1) {
            var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
            var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
            var delta = ((x1 - x0) / chart.series.length) * w;
            if (am4core.isNumber(delta)) {
                var middle = chart.series.length / 2;

                var newIndex = 0;
                chart.series.each(function (series) {
                    if (!series.isHidden && !series.isHiding) {
                        series.dummyData = newIndex;
                        newIndex++;
                    }
                    else {
                        series.dummyData = chart.series.indexOf(series);
                    }
                })
                var visibleCount = newIndex;
                var newMiddle = visibleCount / 2;

                chart.series.each(function (series) {
                    var trueIndex = chart.series.indexOf(series);
                    var newIndex = series.dummyData;

                    var dx = (newIndex - trueIndex + middle - newMiddle) * delta

                    series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                    series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                })
            }
        }
    }
}
var data = []
axios.get(url + "/thpopulation/get/province/40").then(async (r) => {
    console.log(r.data.data)
    var a = r.data.data
    data.push(
        {

            "category": '2554',
            "first": a[0].y2554,
            "second": a[1].y2554,
            "third": a[2].y2554,
        }, {
        "category": '2555',
        "first": Number(a[0].y2555),
        "second": Number(a[1].y2555),
        "third": Number(a[2].y2555),
    }, {
        "category": '2556',
        "first": Number(a[0].y2556),
        "second": Number(a[1].y2556),
        "third": Number(a[2].y2556),
    }, {
        "category": '2557',
        "first": Number(a[0].y2557),
        "second": Number(a[1].y2557),
        "third": Number(a[2].y2557),
    }, {
        "category": '2558',
        "first": Number(a[0].y2558),
        "second": Number(a[1].y2558),
        "third": Number(a[2].y2558),
    }, {
        "category": '2559',
        "first": Number(a[0].y2559),
        "second": Number(a[1].y2559),
        "third": Number(a[2].y2559),
    }
    )

    console.log(data)
    chartpop(data)
})

