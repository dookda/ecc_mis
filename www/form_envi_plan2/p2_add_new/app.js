let uid = sessionStorage.getItem('key');
let typ = sessionStorage.getItem('typ');
let org = sessionStorage.getItem('org');

let usrname = sessionStorage.getItem('usrname');

let logout = () => {
    sessionStorage.clear();
    location.href = "./../login/index.html";
}
// uid && typ == "admin" ? null : logout();
uid && org ? null : logout();

if (typ == "admin") {
    $("#usermenu").append(`<li><a href=""><i class="bi bi-person-square"></i>&nbsp;<span >${usrname}</span></a></li>
        <li><a href="./../admin/index.html"><i class="bi bi-tools"></i>&nbsp;จัดการผู้ใช้</a></li>`)
} else {
    $("#usermenu").append(`<li><a href="" ><i class="bi bi-person-square"></i>&nbsp;<span >${usrname}</span></a></li>`)
}

let latlng = {
    lat: 13.305567,
    lng: 101.383101
};

let map = L.map('map', {
    center: latlng,
    zoom: 9
});

const url = "https://eec-onep.online:3700";
// const url = 'http://localhost:3700';

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
    "Mapbox": mapbox.addTo(map),
    "google Hybrid": ghyb
}
var overlayMap = {
    "ขอบจังหวัด": pro
}
L.control.layers(baseMap, overlayMap).addTo(map);

map.pm.addControls({
    position: 'topleft',
    drawCircle: false,
    drawPolyline: false,
    drawRectangle: false,
    drawCircleMarker: false,
    cutPolygon: false
});

let geom = "";
map.on('pm:create', e => {
    geom = e.layer.toGeoJSON();
});

let refreshPage = () => {
    // location.reload(true);
    window.open("./../p2_report_new/index.html", "_self");
}


$("#fieldForm").submit(function (e) {
    e.preventDefault();
    // tinyMCE.triggerSave();

    const obj = {
        data: {
            // org: org,
            p_order: $('#p_order').val(),
            p_strategy: $('#p_strategy').val(),
            p_tact: $('#p_tact').val(),
            p_plan: $('#p_plan').val(),
            p_way: $('#p_way').val(),
            p_name: $('#p_name').val(),
            budget: $('#budget').val(),
            budg_65: $('#budg_65').val(),
            budg_66: $('#budg_66').val(),
            budg_67: $('#budg_67').val(),
            budg_68: $('#budg_68').val(),
            budg_69: $('#budg_69').val(),
            budg_70: $('#budg_70').val(),

            plan_65: $("#plan_65").prop("checked") == true ? 'TRUE' : 'FALSE',
            plan_66: $("#plan_66").prop("checked") == true ? 'TRUE' : 'FALSE',
            plan_67: $("#plan_67").prop("checked") == true ? 'TRUE' : 'FALSE',
            plan_68: $("#plan_68").prop("checked") == true ? 'TRUE' : 'FALSE',
            plan_69: $("#plan_69").prop("checked") == true ? 'TRUE' : 'FALSE',
            plan_70: $("#plan_70").prop("checked") == true ? 'TRUE' : 'FALSE',
            // prj_operat: org,
            prj_operat: $('#prj_operat').val(),
            prj_suboperat: $('#prj_suboperat').val(),

            proc_stat: $('#proc_stat').val(),
            proc_troub: $('#proc_troub').val(),
            fund_troub: $('#fund_troub').val(),
            fund_accpt: $('#fund_accpt').val(),
            opert_stat: $('#opert_stat').val(),
            opert_estm: $('#opert_estm').val(),
            budg_year: $('#budg_year').val(),
            prj_locate: $('#prj_locate').val(),
            prj_name_c: $('#prj_name_c').val(),
            prj_obj_c: $('#prj_obj_c').val(),
            prj_tech: $('#prj_tech').val(),
            prj_output: $('#prj_output').val(),
            prj_troub: $('#prj_troub').val(),
            prj_comnt: $('#prj_comnt').val(),
            coor_name: $('#coor_name').val(),
            coor_pos: $('#coor_pos').val(),
            coor_tel: $('#coor_tel').val(),
            coor_email: $('#coor_email').val(),
            geom: geom
        }
    }
    console.log(obj);
    axios.post(url + "/projmon2-api/insertdata_new", obj).then((r) => {
        r.data.data == "success" ? refreshPage() : null
    })
    return false;
});

