let uid = sessionStorage.getItem('key');
let typ = sessionStorage.getItem('typ');
let org = sessionStorage.getItem('org');

let logout = () => {
    sessionStorage.clear();
    location.href = "./../login/index.html";
}
// uid && typ == "admin" ? null : logout();
uid && org ? null : logout();

if (typ == "admin") {
    $("#usermenu").append(`<li><a href=""><i class="bi bi-person-square"></i>&nbsp;<span >${org}</span></a></li>
        <li><a href="./../admin/index.html"><i class="bi bi-tools"></i>&nbsp;จัดการผู้ใช้</a></li>`)
} else {
    $("#usermenu").append(`<li><a href="" ><i class="bi bi-person-square"></i>&nbsp;<span >${org}</span>></a></li>`)
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
    window.open("./../p1_report/index.html", "_self");
}

// tinymce.init({
//     selector: 'textarea',
//     menubar: false,
//     statusbar: false,
//     toolbar: true
// })

$("#prj_cate").change(i => {
    console.log(i)
})

$("#div_proc_troub").hide()
$("#div_fund_troub").hide()
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
        // console.log(r);
        $("#list_measure").empty()
        r.data.data.map((i, k) => {
            // console.log(k);
            $("#list_measure").append(`<li>${i.prj_detail}</li>
                <b>การดำเนินงานที่สอดคล้องกับแนวทางการปฏิบัติ</b>
                <br><input type="text" class="form-control" id="act_${k + 1}">`)
        })
    })
}

let getData = () => {
    axios.get(url + "/login-api/getorg").then(r => {
        r.data.data.map(i => {
            $("#prj_operat").append(`<option value="${i.prj_operat}">${i.prj_operat}</option>`)
        })
    })
}
getData();

$("#fieldForm").submit(function (e) {
    e.preventDefault();
    // tinyMCE.triggerSave();

    const obj = {
        data: {
            // org: org,
            prj_cate: $('#prj_cate').val(),
            prj_name: $('#prj_name').val(),
            prj_measure: $('#prj_measure').val(),

            act_1: $('#act_1').val(),
            act_2: $('#act_2').val(),
            act_3: $('#act_3').val(),
            act_4: $('#act_4').val(),
            act_5: $('#act_5').val(),
            act_6: $('#act_6').val(),
            act_7: $('#act_7').val(),
            act_8: $('#act_8').val(),
            act_9: $('#act_9').val(),
            act_10: $('#act_10').val(),
            act_11: $('#act_11').val(),

            prj_detail: $('#prj_detail').val(),
            prj_obj: $('#prj_obj').val(),
            // prj_site: $('#prj_site').val(),
            prj_time: $('#prj_time').val(),
            budget: $('#budget').val(),
            budg_61: $('#budg_61').val(),
            budg_62: $('#budg_62').val(),
            budg_63: $('#budg_63').val(),
            budg_64: $('#budg_64').val(),
            budg_65: $('#budg_65').val(),
            budg_66: $('#budg_66').val(),
            budg_67: $('#budg_67').val(),
            budg_68: $('#budg_68').val(),
            budg_69: $('#budg_69').val(),
            budg_70: $('#budg_70').val(),
            // prj_operat: org,
            prj_operat: $('#prj_operat').val(),
            fund: $('#fund').val(),
            proc_stat: $('#proc_stat').val(),
            proc_troub: $('#proc_troub').val(),
            fund_troub: $('#fund_troub').val(),
            fund_accpt: $('#fund_accpt').val(),
            // fund_year: $('#fund_year').val(),
            opert_stat: $('#opert_stat').val(),
            opert_estm: $('#opert_estm').val(),
            budg_year: $('#budg_year').val(),
            prj_type: $('#prj_type').val(),
            prj_locate: $('#prj_locate').val(),
            prj_rai: $('#prj_rai').val(),
            prj_name_c: $('#prj_name_c').val(),
            prj_obj_c: $('#prj_obj_c').val(),
            // prj_method: $('#prj_method').val(),
            prj_tech: $('#prj_tech').val(),
            // prj_area: $('#prj_area').val(),
            prj_output: $('#prj_output').val(),
            prj_troub: $('#prj_troub').val(),
            prj_comnt: $('#prj_comnt').val(),
            // prj_info: $('#prj_info').val(),
            // filename: $('#filename').val(),
            coor_name: $('#coor_name').val(),
            coor_pos: $('#coor_pos').val(),
            coor_tel: $('#coor_tel').val(),
            coor_email: $('#coor_email').val(),
            geom: geom
        }
    }
    // console.log(obj);
    axios.post(url + "/projmon-api/insertdata", obj).then((r) => {
        r.data.data == "success" ? refreshPage() : null
    })
    return false;
});

