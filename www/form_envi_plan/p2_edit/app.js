let uid = sessionStorage.getItem('key');
let typ = sessionStorage.getItem('typ');
let org = sessionStorage.getItem('org');

let gid = sessionStorage.getItem('gid');

console.log(gid);

let logout = () => {
    sessionStorage.clear();
    location.href = "./../login/index.html";
}
// uid && typ == "admin" ? null : logout();
uid && org ? null : logout();

if (typ == "admin") {
    $("#usermenu").append(`<a class="dropdown-toggle" href="#" data-toggle="dropdown">
        <i class="bi bi-person-square"></i>&nbsp;<span >${org}</span></a>
        <div class="dropdown-menu">
            <a class="dropdown-item" href="./../admin/index.html">
            <i class="bi bi-tools"></i>&nbsp;จัดการผู้ใช้</a>
        </div>`)
} else {
    $("#usermenu").append(`<a href="" ><i class="bi bi-person-square"></i>&nbsp;<span >${org}</span>></a>`)
}

let latlng = {
    lat: 13.305567,
    lng: 101.383101
};

let map = L.map('map', {
    center: latlng,
    zoom: 9
});
map.scrollWheelZoom.disable();

const url = "https://eec-onep.online:3700";
// const url = 'http://localhost:3700'; 

const mapbox = L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    {
        maxZoom: 18,
        attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: "mapbox/light-v9",
        tileSize: 512,
        zoomOffset: -1
    }
);

const ghyb = L.tileLayer("https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}", {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"]
});

const tam = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__03_tambon_eec",
    format: "image/png",
    transparent: true,
});

const amp = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__02_amphoe_eec",
    format: "image/png",
    transparent: true,
});

const pro = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__01_prov_eec",
    format: "image/png",
    transparent: true,
});

var baseMap = {
    "Mapbox": mapbox.addTo(map),
    "google Hybrid": ghyb
}
var overlayMap = {
    "ขอบเขตจังหวัด": pro.addTo(map),
    "ขอบเขตอำเภอ": amp.addTo(map),
    "ขอบเขตตำบล": tam.addTo(map),
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
    window.open("./../p2_report/index.html", "_self");
}


$("#div_proc_troub").hide();
$("#div_fund_troub").hide();
// $("#div_fund_accpt").hide()
// $("#div_opert_stat").hide()

$("#proc_stat").change(i => {
    $("#div_proc_troub").hide()
    $("#div_fund_troub").hide()
    $("#div_fund_accpt").hide()
    $("#div_opert_stat").hide()
    $("#proc_troub").val("")
    $("#fund_troub").val("")
    $("#fund_accpt").val("")
    $("#fund_year").val("")

    if ($("#proc_stat").val() == "ได้รับงบประมาณแล้ว") {
        $("#div_fund_accpt").show()
        $("#div_opert_stat").show()
    } else if ($("#proc_stat").val() == "ไม่ได้รับงบประมาณ") {
        $("#div_fund_troub").show()
        $("#div_opert_stat").hide()
    } else if ($("#proc_stat").val() == "ยังไม่ยื่นของบประมาณ") {
        $("#div_proc_troub").show()
        $("#div_opert_stat").hide()
    }
})

$("#div_opert_estm").hide()
$("#div_budg_year").hide()

$("#opert_stat").change(i => {
    $("#div_opert_estm").hide()
    $("#div_budg_year").hide()
    $("#opert_estm").val("")
    $("#budg_year").val("")

    if ($("#opert_stat").val() == "อยู่ระหว่างตั้งของบประมาณ") {
        $("#div_budg_year").show()
    } else if ($("#opert_stat").val() == "อยู่ระหว่างดำเนินการ/ก่อสร้าง") {
        $("#div_opert_estm").show()
    }
})

$("#prj_measure").change(i => {
    let a = $("#prj_measure").val()
    // console.log(a);
    getActivity($("#prj_measure").val())
})

let getActivity = (prj_measure) => {
    axios.post(url + "/projmon-api/getmeasure", { prj_measure: prj_measure }).then(r => {
        $("#list_measure").empty()
        r.data.data.map((i, k) => {
            $("#list_measure").append(`<li>${i.prj_detail}</li>
                <b>การดำเนินงานที่สอดคล้องกับแนวทางการปฏิบัติ</b>
                <br><input type="text" class="form-control" id="act_${k + 1}">`)
        })
    })
}


let getData = () => {
    axios.post(url + "/projmon2-api/getdetail", { gid }).then(r => {
        console.log(r.data.data);
        document.getElementById("prj_cate").value = r.data.data[0].prj_cate;
        document.getElementById("prj_mac").value = r.data.data[0].prj_mac;
        document.getElementById("prj_plan").value = r.data.data[0].prj_plan;
        document.getElementById("prj_name").value = r.data.data[0].prj_name;
        document.getElementById("prj_detail").value = r.data.data[0].prj_detail;
        r.data.data[0].plan_65 == 'TRUE' ? $("#plan_65").prop("checked", true) : $("#plan_65").prop("checked", false);
        r.data.data[0].plan_66 == 'TRUE' ? $("#plan_66").prop("checked", true) : $("#plan_66").prop("checked", false);
        r.data.data[0].plan_67 == 'TRUE' ? $("#plan_67").prop("checked", true) : $("#plan_67").prop("checked", false);
        r.data.data[0].plan_68 == 'TRUE' ? $("#plan_68").prop("checked", true) : $("#plan_68").prop("checked", false);
        r.data.data[0].plan_69 == 'TRUE' ? $("#plan_69").prop("checked", true) : $("#plan_69").prop("checked", false);
        r.data.data[0].plan_70 == 'TRUE' ? $("#plan_70").prop("checked", true) : $("#plan_70").prop("checked", false);
        document.getElementById("budget").value = r.data.data[0].budget;
        document.getElementById("budg_65").value = r.data.data[0].budg_65;
        document.getElementById("budg_66").value = r.data.data[0].budg_66;
        document.getElementById("budg_67").value = r.data.data[0].budg_67;
        document.getElementById("budg_68").value = r.data.data[0].budg_68;
        document.getElementById("budg_69").value = r.data.data[0].budg_69;
        document.getElementById("budg_70").value = r.data.data[0].budg_70;
        document.getElementById("prj_operat").value = r.data.data[0].prj_operat;
        document.getElementById("fund").value = r.data.data[0].fund;
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
    })
}
getData();

$("#fieldForm").submit(function (e) {
    e.preventDefault();
    const obj = {
        data: {
            gid,
            prj_cate: document.getElementById("prj_cate").value,
            prj_mac: document.getElementById("prj_mac").value,
            prj_plan: document.getElementById("prj_plan").value,
            prj_name: document.getElementById("prj_name").value,
            prj_detail: document.getElementById("prj_detail").value,

            plan_65: $("#plan_65").prop("checked") == true ? 'TRUE' : 'FALSE',
            plan_66: $("#plan_66").prop("checked") == true ? 'TRUE' : 'FALSE',
            plan_67: $("#plan_67").prop("checked") == true ? 'TRUE' : 'FALSE',
            plan_68: $("#plan_68").prop("checked") == true ? 'TRUE' : 'FALSE',
            plan_69: $("#plan_69").prop("checked") == true ? 'TRUE' : 'FALSE',
            plan_70: $("#plan_70").prop("checked") == true ? 'TRUE' : 'FALSE',

            budget: document.getElementById("budget").value,
            budg_65: document.getElementById("budg_65").value,
            budg_66: document.getElementById("budg_66").value,
            budg_67: document.getElementById("budg_67").value,
            budg_68: document.getElementById("budg_68").value,
            budg_69: document.getElementById("budg_69").value,
            budg_70: document.getElementById("budg_70").value,
            prj_operat: document.getElementById("prj_operat").value,
            fund: document.getElementById("fund").value,
            proc_stat: document.getElementById("proc_stat").value,
            proc_troub: document.getElementById("proc_troub").value,
            fund_troub: document.getElementById("fund_troub").value,
            fund_accpt: document.getElementById("fund_accpt").value,
            opert_stat: document.getElementById("opert_stat").value,
            opert_estm: document.getElementById("opert_estm").value,
            budg_year: document.getElementById("budg_year").value,
            prj_locate: document.getElementById("prj_locate").value,
            prj_name_c: document.getElementById("prj_name_c").value,
            prj_obj_c: document.getElementById("prj_obj_c").value,
            prj_tech: document.getElementById("prj_tech").value,
            prj_output: document.getElementById("prj_output").value,
            prj_troub: document.getElementById("prj_troub").value,
            prj_comnt: document.getElementById("prj_comnt").value,
            coor_name: document.getElementById("coor_name").value,
            coor_pos: document.getElementById("coor_pos").value,
            coor_tel: document.getElementById("coor_tel").value,
            coor_email: document.getElementById("coor_email").value,
            geom: geom
        }
    }
    // console.log(obj);
    axios.post(url + "/projmon2-api/updatedata", obj).then((r) => {
        r.data.data == "success" ? refreshPage() : null
    })
    return false;
});

