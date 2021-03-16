
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
    window.open("./../report/index.html", "_self");
}

tinymce.init({
    selector: 'textarea',
    menubar: false,
    statusbar: false,
    toolbar: true,
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

let getValue = (id) => {
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

    axios.post(url + "/projmon-api/getone", { prj_id: id }).then(async (r) => {
        console.log(r.data.data[0]);
        $('#prj_id').val(r.data.data[0].prj_id)
        $('#prj_cate').val(r.data.data[0].prj_cate)
        $('#prj_name').val(r.data.data[0].prj_name)
        $('#prj_detail').val(await r.data.data[0].prj_detail)
        // await tinymce.get("prj_detail").setContent(r.data.data[0].prj_detail);
        $('#prj_obj').val(await r.data.data[0].prj_obj)
        // await tinymce.get("prj_obj").setContent(r.data.data[0].prj_obj);
        $('#prj_site').val(r.data.data[0].prj_site)
        $('#prj_time').val(r.data.data[0].prj_time)
        $('#budget').val(r.data.data[0].budget)
        $('#budg_61').val(r.data.data[0].budg_61)
        $('#budg_62').val(r.data.data[0].budg_62)
        $('#budg_63').val(r.data.data[0].budg_63)
        $('#budg_64').val(r.data.data[0].budg_64)
        $('#budg_65').val(r.data.data[0].budg_65)
        $('#budg_66').val(r.data.data[0].budg_66)
        $('#budg_67').val(r.data.data[0].budg_67)
        $('#budg_68').val(r.data.data[0].budg_68)
        $('#budg_69').val(r.data.data[0].budg_69)
        $('#budg_70').val(r.data.data[0].budg_70)
        $('#prj_operat').val(r.data.data[0].prj_operat)
        $('#fund').val(r.data.data[0].fund)
        $('#proc_stat').val(r.data.data[0].proc_stat)
        $('#proc_troub').val(await r.data.data[0].proc_troub)
        // await tinymce.get("proc_troub").setContent(r.data.data[0].proc_troub);
        $('#fund_troub').val(await r.data.data[0].fund_troub)
        // await tinymce.get("fund_troub").setContent(r.data.data[0].fund_troub);
        $('#fund_accpt').val(r.data.data[0].fund_accpt)
        $('#fund_year').val(r.data.data[0].fund_year)
        $('#opert_stat').val(r.data.data[0].opert_stat)
        $('#opert_estm').val(r.data.data[0].opert_estm)
        $('#budg_year').val(r.data.data[0].budg_year)
        $('#prj_type').val(r.data.data[0].prj_type)
        $('#prj_locate').val(r.data.data[0].prj_locate)
        $('#prj_rai').val(r.data.data[0].prj_rai)
        $('#prj_name_c').val(r.data.data[0].prj_name_c)
        await $('#prj_obj_c').val(r.data.data[0].prj_obj_c)
        // await tinymce.get("prj_obj_c").setContent(r.data.data[0].prj_obj_c);
        await $('#prj_method').val(r.data.data[0].prj_method)
        // await tinymce.get("prj_method").setContent(r.data.data[0].prj_method);
        await $('#prj_tech').val(r.data.data[0].prj_tech)
        // await tinymce.get("prj_tech").setContent(r.data.data[0].prj_tech);
        $('#prj_area').val(r.data.data[0].prj_area)
        await $('#prj_output').val(r.data.data[0].prj_output)
        // await tinymce.get("prj_output").setContent(r.data.data[0].prj_output);
        await $('#prj_troub').val(r.data.data[0].prj_troub)
        // await tinymce.get("prj_troub").setContent(r.data.data[0].prj_troub);
        await $('#prj_comnt').val(r.data.data[0].prj_comnt)
        // await tinymce.get("prj_comnt").setContent(r.data.data[0].prj_comnt);
        await $('#prj_info').val(r.data.data[0].prj_info)
        // await tinymce.get("prj_info").setContent(r.data.data[0].prj_info);
        // filename: $('#filename').val(),
        $('#coor_name').val(r.data.data[0].coor_name)
        $('#coor_pos').val(r.data.data[0].coor_pos)
        $('#coor_tel').val(r.data.data[0].coor_tel)
        $('#coor_email').val(r.data.data[0].coor_email)

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

$("#fieldForm").submit(function (e) {
    e.preventDefault();
    tinyMCE.triggerSave();

    const obj = {
        data: {
            prj_id: $('#prj_id').val(),
            prj_cate: $('#prj_cate').val(),
            prj_name: $('#prj_name').val(),
            prj_detail: $('#prj_detail').val(),
            prj_obj: $('#prj_obj').val(),
            prj_site: $('#prj_site').val(),
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
            prj_operat: $('#prj_operat').val(),
            fund: $('#fund').val(),
            proc_stat: $('#proc_stat').val(),
            proc_troub: $('#proc_troub').val(),
            fund_troub: $('#fund_troub').val(),
            fund_accpt: $('#fund_accpt').val(),
            fund_year: $('#fund_year').val(),
            opert_stat: $('#opert_stat').val(),
            opert_estm: $('#opert_estm').val(),
            budg_year: $('#budg_year').val(),
            prj_type: $('#prj_type').val(),
            prj_locate: $('#prj_locate').val(),
            prj_rai: $('#prj_rai').val(),
            prj_name_c: $('#prj_name_c').val(),
            prj_obj_c: $('#prj_obj_c').val(),
            prj_method: $('#prj_method').val(),
            prj_tech: $('#prj_tech').val(),
            prj_area: $('#prj_area').val(),
            prj_output: $('#prj_output').val(),
            prj_troub: $('#prj_troub').val(),
            prj_comnt: $('#prj_comnt').val(),
            prj_info: $('#prj_info').val(),
            // filename: $('#filename').val(),
            coor_name: $('#coor_name').val(),
            coor_pos: $('#coor_pos').val(),
            coor_tel: $('#coor_tel').val(),
            coor_email: $('#coor_email').val(),
            geom: geom
        }
    }
    console.log(obj);
    axios.post(url + "/projmon-api/updatedata", obj).then((r) => {
        r.data.data == "success" ? refreshPage() : null
    })
    return false;
});


let searchParams = new URLSearchParams(window.location.search)
let id = searchParams.get('id')
getValue(id)


