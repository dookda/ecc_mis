let uid = sessionStorage.getItem('key');
let typ = sessionStorage.getItem('typ');
let org = sessionStorage.getItem('org');

let pid = sessionStorage.getItem('pid');
// pid = '1638227976981'

let usrname = sessionStorage.getItem('usrname');

let logout = () => {
    sessionStorage.clear();
    location.href = "./../login/index.html";
}
// uid && typ == "admin" ? null : logout();
uid && org ? null : logout();

if (typ == "admin") {
    $("#usermenu").append(`<li><a onclick='goprofile()'><i class="bi bi-person-square"></i>&nbsp;<span >${usrname}</span></a></li>
        <li><a href="./../admin/index.html"><i class="bi bi-tools"></i>&nbsp;จัดการผู้ใช้</a></li>`)
} else {
    $("#usermenu").append(`<li><a href="" ><i class="bi bi-person-square"></i>&nbsp;<span >${usrname}</span></a></li>`)
}
let goprofile = () => {
    sessionStorage.setItem('pfuid', uid);
    location.href = "./../profile/index.html";
}

let latlng = {
    lat: 13.305567,
    lng: 101.383101
};

let map = L.map('map', {
    center: latlng,
    zoom: 9
});
const url = "https://engrids.soc.cmu.ac.th/api";

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

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

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
drawnItems.on('pm:edit', e => {
    geom = e.layer.toGeoJSON();
    console.log(e);
});

let refreshPage = () => {
    // location.reload(true);
    window.open("./../p2_report/index.html", "_self");
}


let getData = (pid) => {
    map.eachLayer((lyr) => {
        if (lyr.options.name == 'geojson') {
            map.removeLayer(lyr);
        }
    });

    var style = {
        "color": "#ff7800",
        "weight": 2,
        "opacity": 0.65
    };
    axios.post(url + "/projmon2-api/getdetail_new", { pid }).then(r => {
        console.log(r.data.data);
        document.getElementById("p_order").value = r.data.data[0].p_order;
        document.getElementById("p_strategy").value = r.data.data[0].p_strategy;
        document.getElementById("p_tact").value = r.data.data[0].p_tact;
        document.getElementById("p_plan").value = r.data.data[0].p_plan;
        document.getElementById("p_way").value = r.data.data[0].p_way;
        document.getElementById("p_name").value = r.data.data[0].p_name;

        document.getElementById("budget").value = r.data.data[0].budget;
        document.getElementById("budg_65").value = r.data.data[0].budg_65;
        document.getElementById("budg_66").value = r.data.data[0].budg_66;
        document.getElementById("budg_67").value = r.data.data[0].budg_67;
        document.getElementById("budg_68").value = r.data.data[0].budg_68;
        document.getElementById("budg_69").value = r.data.data[0].budg_69;
        document.getElementById("budg_70").value = r.data.data[0].budg_70;

        r.data.data[0].plan_65 == 'TRUE' ? $("#plan_65").prop("checked", true) : $("#plan_65").prop("checked", false);
        r.data.data[0].plan_66 == 'TRUE' ? $("#plan_66").prop("checked", true) : $("#plan_66").prop("checked", false);
        r.data.data[0].plan_67 == 'TRUE' ? $("#plan_67").prop("checked", true) : $("#plan_67").prop("checked", false);
        r.data.data[0].plan_68 == 'TRUE' ? $("#plan_68").prop("checked", true) : $("#plan_68").prop("checked", false);
        r.data.data[0].plan_69 == 'TRUE' ? $("#plan_69").prop("checked", true) : $("#plan_69").prop("checked", false);
        r.data.data[0].plan_70 == 'TRUE' ? $("#plan_70").prop("checked", true) : $("#plan_70").prop("checked", false);


        document.getElementById("prj_operat").value = r.data.data[0].prj_operat;
        document.getElementById("prj_suboperat").value = r.data.data[0].prj_suboperat;

        document.getElementById("proc_stat").value = r.data.data[0].proc_stat;
        document.getElementById("proc_troub").value = r.data.data[0].proc_troub;
        document.getElementById("fund_troub").value = r.data.data[0].fund_troub;
        document.getElementById("fund_accpt").value = r.data.data[0].fund_accpt;
        document.getElementById("opert_stat").value = r.data.data[0].opert_stat;
        document.getElementById("opert_estm").value = r.data.data[0].opert_estm;
        document.getElementById("budg_year").value = r.data.data[0].budg_year;
        document.getElementById("prj_locate").value = r.data.data[0].prj_locate;
        document.getElementById("prj_name_c").value = r.data.data[0].prj_name_c;
        document.getElementById("prj_obj_c").value = r.data.data[0].prj_obj_c;
        document.getElementById("prj_tech").value = r.data.data[0].prj_tech;
        document.getElementById("prj_output").value = r.data.data[0].prj_output;
        document.getElementById("prj_troub").value = r.data.data[0].prj_troub;
        document.getElementById("prj_comnt").value = r.data.data[0].prj_comnt;
        document.getElementById("coor_name").value = r.data.data[0].coor_name;
        document.getElementById("coor_pos").value = r.data.data[0].coor_pos;
        document.getElementById("coor_tel").value = r.data.data[0].coor_tel;
        document.getElementById("coor_email").value = r.data.data[0].coor_email;

        if (r.data.data[0].geojson) {
            let geojson = L.geoJSON(JSON.parse(r.data.data[0].geojson), {
                style: style,
                name: "geojson",
                onEachFeature: function (feature, layer) {
                    drawnItems.addLayer(layer);
                }
            })
            geojson.addTo(map);
            map.setView(geojson.getBounds().getCenter())
        }
    })
}
getData(pid);

$("#fieldForm").submit(function (e) {
    e.preventDefault();
    const obj = {
        data: {
            pid: pid,
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
    // console.log(obj);
    axios.post(url + "/projmon2-api/updatedata_new", obj).then((r) => {
        // r.data.data == "success" ? refreshPage() : null
    })
    return false;
});

