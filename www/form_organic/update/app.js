let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
$("#usrname").text(urname);
urid ? null : location.href = "./../../form_register/login/index.html";

if (eecauth !== "admin" && eecauth !== "user") {
    location.href = "./../../form_register/login/index.html";
}

const url = "https://eec-onep.online:3700";
// const url = 'http://localhost:3000';
let dataurl, button
if (eecauth == "admin") {
    dataurl = url + "/insee-api/getgeom";
    button = `<button type="button" class="btn btn-success" id="getMap">ที่ตั้งแปลง</button>
     <button type="button" class="btn btn-danger" id="delete">ลบ!</button>`

} else if (eecauth == "user") {
    dataurl = url + "/insee-api/getgeom/" + urid;
    $('#cardselect').hide()
    button = `<button type="button" class="btn btn-success" id="getMap">ที่ตั้งแปลง</button>
    <button type="button" class="btn btn-warning" id="edit">แก้ไขข้อมูล</button>
    <button type="button" class="btn btn-danger" id="delete">ลบ!</button>`

} else if (eecauth == "office") {
    dataurl = url + "/insee-api/getgeom";
    button = `<button type="button" class="btn btn-success" id="getMap">ที่ตั้งแปลง</button>`
}

$("#pro").on("change", function () {
    getPro(this.value)
    zoommap("pro", this.value)
    seclectdata(eecauth, "prov", this.value)
});
$("#amp").on("change", function () {
    getAmp(this.value)
    zoommap("amp", this.value)
    seclectdata(eecauth, "amp", this.value)
});
$("#tam").on("change", function () {
    getTam(this.value)
    zoommap("tam", this.value)
    seclectdata(eecauth, "tam", this.value)
});
let prov_name, prov_code, amp_name, amp_code, tam_name, tam_code;
let getPro = (procode) => {
    axios.get(url + `/eec-api/get-amp/${procode}`).then(r => {
        // console.log(r.data.data);
        $("#amp").empty();
        $("#tam").empty();
        r.data.data.map(i => {
            $("#amp").append(`<option value="${i.amphoe_idn}">${i.amp_namt}</option>`)
        })
    })
    prov_code = procode
    if (procode == 20) {
        prov_name = "ชลบุรี"
        $('#area').text('พื้นที่จังหวัดชลบุรี');
    } else if (procode == 21) {
        prov_name = "ระยอง"
        $('#area').text('พื้นที่จังหวัดระยอง');
    } else if (procode == 24) {
        prov_name = "ฉะเชิงเทรา"
        $('#area').text('พื้นที่จังหวัดฉะเชิงเทรา');
    }
}
let getAmp = (ampcode) => {
    axios.get(url + `/eec-api/get-tam/${ampcode}`).then(r => {
        $("#tam").empty();
        r.data.data.map(i => {
            $("#tam").append(`<option value="${i.tambon_idn}">${i.tam_namt}</option>`)
        })
    })

    axios.get(url + `/eec-api/get-amp/${prov_code}`).then(r => {
        let data = r.data.data.filter(e => e.amphoe_idn == ampcode)
        amp_name = data[0].amp_namt
        amp_code = ampcode
        $('#area').text(`พื้นที่จังหวัด${prov_name} อำเภอ${amp_name}`);
    })
}
let getTam = (tamcode) => {
    axios.get(url + `/eec-api/get-tam/${amp_code}`).then(r => {
        let data = r.data.data.filter(e => e.tambon_idn == tamcode)
        tam_name = data[0].tam_namt
        tam_code = tamcode
        $('#area').text(`พื้นที่จังหวัด${prov_name} อำเภอ${amp_name} ตำบล${tam_name}`);
    })
}

let seclectdata = (auth, type, code) => {
    if (auth == "admin") {
        if (type == "prov" && code !== "eec") {
            dataurl = url + '/insee-api/getgeom/prov/' + code;
            table.ajax.url(dataurl).load();
            showALL(dataurl)
        } else if (type == "prov" && code == 'eec') {
            dataurl = url + "/insee-api/getgeom";
            table.ajax.url(dataurl).load();
            showALL(dataurl)
        }
        else if (type == "amp") {
            dataurl = url + '/insee-api/getgeom/amp/' + code
            table.ajax.url(dataurl).load();
            showALL(dataurl)
        } else if (type == "tam") {
            dataurl = url + '/insee-api/getgeom/tam/' + code
            table.ajax.url(dataurl).load();
            showALL(dataurl)
        }
    }
}

let table
$(document).ready(function () {
    $.extend(true, $.fn.dataTable.defaults, {
        "language": {
            "sProcessing": "กำลังดำเนินการ...",
            "sLengthMenu": "แสดง_MENU_ แถว",
            "sZeroRecords": "ไม่พบข้อมูล",
            "sInfo": "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
            "sInfoEmpty": "แสดง 0 ถึง 0 จาก 0 แถว",
            "sInfoFiltered": "(กรองข้อมูล _MAX_ ทุกแถว)",
            "sInfoPostFix": "",
            "sSearch": "ค้นหา:",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "เริ่มต้น",
                "sPrevious": "ก่อนหน้า",
                "sNext": "ถัดไป",
                "sLast": "สุดท้าย"
            }
        }
    });
    table = $('#myTable').DataTable({
        ajax: {
            type: "get",
            url: dataurl,
            data: { userid: urid },
            dataSrc: 'data'
        },
        columns: [
            { data: 'repor_date' },
            { data: 'intoname' },
            { data: 'typeag' },
            { data: 'tcate' },
            { data: 'tambon' },
            { data: 'amphoe' },
            { data: 'province' },
            {
                // targets: -1,
                data: null,
                defaultContent: button
            }
        ],
        columnDefs: [
            { className: 'text-center', targets: [0, 2, 3, 4, 5, 6, 7] },
        ],
        searching: true,
        scrollX: true
        // pageLength: 5
    });

    table.on('search.dt', function () {
        let data = table.rows({ search: 'applied' }).data()
        $("#siteCnt").text(data.length)
        getMap(data)
    });

    $('#myTable tbody').on('click', '#getMap', function () {
        var data = table.row($(this).parents('tr')).data();
        zoomExtent(data.st_asgeojson)
    });

    $('#myTable tbody').on('click', '#edit', function () {
        var data = table.row($(this).parents('tr')).data();
        editdata(data)
    });

    $('#myTable tbody').on('click', '#delete', function () {
        var data = table.row($(this).parents('tr')).data();
        confirmDelete(data.intoname, data.id_date, data.repor_date, data.typeag)
    });
})

let latlng = {
    lat: 13.305567,
    lng: 101.383101
};

let map = L.map('map', {
    center: latlng,
    zoom: 9
});

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

const tam = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__03_tambon_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 18,
    // minZoom: 14,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const amp = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__02_amphoe_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 14,
    // minZoom: 10,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const pro = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__01_prov_eec",
    format: "image/png",
    transparent: true,
    // maxZoom: 10,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

var baseMap = {
    "Mapbox": mapbox.addTo(map),
    "google Hybrid": ghyb
}
var overlayMap = {
    "ขอบเขตจังหวัด": pro.addTo(map),
    "ขอบเขตอำเภอ": amp,
    "ขอบเขตตำบล": tam,
}
L.control.layers(baseMap, overlayMap).addTo(map);

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var legend = L.control({ position: "bottomleft" });
function showLegend() {
    legend.onAdd = function (map) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += `<button class="btn btn-sm" onClick="hideLegend()">
      <span class="kanit">ซ่อนสัญลักษณ์</span><i class="fa fa-angle-double-down" aria-hidden="true"></i>
    </button><br>`;
        div.innerHTML += '<i style="background: #FFFFFF; border-style: solid; border-width: 3px;"></i><span>ขอบเขตจังหวัด</span><br>';
        // div.innerHTML += '<i style="background: #FFFFFF; border-style: solid; border-width: 1.5px;"></i><span>ขอบเขตอำเภอ</span><br>';
        // div.innerHTML += '<i style="background: #FFFFFF; border-style: dotted; border-width: 1.5px;"></i><span>ขอบเขตตำบล</span><br>';
        div.innerHTML += '<i style="background: #A5B806"></i><span>พื้นที่เกษตรกรรม</span><br>';
        div.innerHTML += '<i style="background: #FA584B"></i><span>พื้นที่ปศุสัตว์</span><br>';
        div.innerHTML += '<i style="background: #4F9DE8"></i><span>พื้นที่การประมง</span><br>';
        div.innerHTML += '<i style="background: #ff7800"></i><span>พื้นที่อื่นๆ</span><br>';
        // div.innerHTML += '<i style="background: #FFFFFF"></i><span>Ice</span><br>';
        // div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';
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
    </button>`;
        return div;
    };
    legend.addTo(map);
}

hideLegend()
// map.pm.addControls({
//     position: 'topleft',
//     drawCircle: false,
//     drawMarker: false,
//     drawPolygon: false,
//     drawPolyline: false,
//     drawRectangle: false,
//     drawCircleMarker: false,
//     cutPolygon: false,
//     removalMode: false,
//     edit: {
//         featureGroup: drawnItems
//     }
// });

// let geom = '-';
// map.on('pm:create', e => {
//     geom = e.layer.toGeoJSON();
//     console.log(e);
// });

// drawnItems.on('pm:edit', e => {
//     geom = e.layer.toGeoJSON();
//     console.log(e);
// });

let getMap = (x) => {
    // console.log(x);
    map.eachLayer((lyr) => {
        if (lyr.options.name == 'st_asgeojson') {
            map.removeLayer(lyr);
        }
    });
    var style = {
        "color": "#ff7800",
        "weight": 2,
        "opacity": 0.65
    };
    var style_agri = {
        "color": "#A5B806",
        "weight": 2,
        "opacity": 0.65
    }
    var style_ani = {
        "color": "#FA584B",
        "weight": 2,
        "opacity": 0.65
    }
    var style_fish = {
        "color": "#4F9DE8",
        "weight": 2,
        "opacity": 0.65
    }

    x.map(i => {
        // console.log(i)
        if (eecauth == "user") {
            if (i.st_asgeojson && i.typeag == 'เกษตรกรรม') {
                let geojson = L.geoJSON(JSON.parse(i.st_asgeojson), {
                    style: style_agri,
                    name: "st_asgeojson",
                    onEachFeature: function (feature, layer) {
                        drawnItems.addLayer(layer);
                    }
                })
                geojson
                    .bindPopup(`<h6><b>เจ้าของแปลง :</b> ${i.id_user}</h6><h6><b>ประภทของแปลง :</b> ${i.typeag}</h6><h6><b>ชื่อแปลง :</b> ${i.intoname}</h6><h6><b>ชนิด :</b> ${i.tcate}</h6><h6><b>วันที่รายงาน :</b> ${i.repor_date}</h6><img class="border-10" src="${i.img}" width="100%">`)
                    .addTo(map);
            } else if (i.st_asgeojson && i.typeag == 'ปศุสัตว์') {
                let geojson = L.geoJSON(JSON.parse(i.st_asgeojson), {
                    style: style_ani,
                    name: "st_asgeojson",
                    onEachFeature: function (feature, layer) {
                        drawnItems.addLayer(layer);
                    }
                })
                geojson
                    .bindPopup(`<h6><b>เจ้าของแปลง :</b> ${i.id_user}</h6><h6><b>ประภทของแปลง :</b> ${i.typeag}</h6><h6><b>ชื่อแปลง :</b> ${i.intoname}</h6><h6><b>ชนิด :</b> ${i.tcate}</h6><h6><b>วันที่รายงาน :</b> ${i.repor_date}</h6><img class="border-10" src="${i.img}" width="100%">`)
                    .addTo(map);
            } else if (i.st_asgeojson && i.typeag == 'การประมง') {
                let geojson = L.geoJSON(JSON.parse(i.st_asgeojson), {
                    style: style_fish,
                    name: "st_asgeojson",
                    onEachFeature: function (feature, layer) {
                        drawnItems.addLayer(layer);
                    }
                })
                geojson
                    .bindPopup(`<h6><b>เจ้าของแปลง :</b> ${i.id_user}</h6><h6><b>ประภทของแปลง :</b> ${i.typeag}</h6><h6><b>ชื่อแปลง :</b> ${i.intoname}</h6><h6><b>ชนิด :</b> ${i.tcate}</h6><h6><b>วันที่รายงาน :</b> ${i.repor_date}</h6><img class="border-10" src="${i.img}" width="100%">`)
                    .addTo(map);
            } else { // console.log(i.geojson);
                let geojson = L.geoJSON(JSON.parse(i.st_asgeojson), {
                    style: style,
                    name: "st_asgeojson",
                    onEachFeature: function (feature, layer) {
                        drawnItems.addLayer(layer);
                    }
                })
                geojson
                    .bindPopup(`<h6><b>เจ้าของแปลง :</b> ${i.id_user}</h6><h6><b>ประภทของแปลง :</b> ${i.typeag}</h6><h6><b>ชื่อแปลง :</b> ${i.intoname}</h6><h6><b>ชนิด :</b> ${i.tcate}</h6><h6><b>วันที่รายงาน :</b> ${i.repor_date}</h6><img class="border-10" src="${i.img}" width="100%">`)
                    .addTo(map);
            }
        } else {
            if (i.st_asgeojson && i.typeag == 'เกษตรกรรม') {
                let geojson = L.geoJSON(JSON.parse(i.st_asgeojson), {
                    style: style_agri,
                    name: "st_asgeojson",
                    onEachFeature: function (feature, layer) {
                        drawnItems.addLayer(layer);
                    }
                })
                geojson
                    .bindPopup(`<h6><b>เจ้าของแปลง :</b> ${i.id_user}</h6><h6><b>ประภทของแปลง :</b> ${i.typeag}</h6><h6><b>ชื่อแปลง :</b> ${i.intoname}</h6><h6><b>ชนิด :</b> ${i.tcate}</h6><h6><b>วันที่รายงาน :</b> ${i.repor_date}</h6>`)
                    .addTo(map);
            } else if (i.st_asgeojson && i.typeag == 'ปศุสัตว์') {
                let geojson = L.geoJSON(JSON.parse(i.st_asgeojson), {
                    style: style_ani,
                    name: "st_asgeojson",
                    onEachFeature: function (feature, layer) {
                        drawnItems.addLayer(layer);
                    }
                })
                geojson
                    .bindPopup(`<h6><b>เจ้าของแปลง :</b> ${i.id_user}</h6><h6><b>ประภทของแปลง :</b> ${i.typeag}</h6><h6><b>ชื่อแปลง :</b> ${i.intoname}</h6><h6><b>ชนิด :</b> ${i.tcate}</h6><h6><b>วันที่รายงาน :</b> ${i.repor_date}</h6>`)
                    .addTo(map);
            } else if (i.st_asgeojson && i.typeag == 'การประมง') {
                let geojson = L.geoJSON(JSON.parse(i.st_asgeojson), {
                    style: style_fish,
                    name: "st_asgeojson",
                    onEachFeature: function (feature, layer) {
                        drawnItems.addLayer(layer);
                    }
                })
                geojson
                    .bindPopup(`<h6><b>เจ้าของแปลง :</b> ${i.id_user}</h6><h6><b>ประภทของแปลง :</b> ${i.typeag}</h6><h6><b>ชื่อแปลง :</b> ${i.intoname}</h6><h6><b>ชนิด :</b> ${i.tcate}</h6><h6><b>วันที่รายงาน :</b> ${i.repor_date}</h6>`)
                    .addTo(map);
            } else { // console.log(i.geojson);
                let geojson = L.geoJSON(JSON.parse(i.st_asgeojson), {
                    style: style,
                    name: "st_asgeojson",
                    onEachFeature: function (feature, layer) {
                        drawnItems.addLayer(layer);
                    }
                })
                geojson
                    .bindPopup(`<h6><b>เจ้าของแปลง :</b> ${i.id_user}</h6><h6><b>ประภทของแปลง :</b> ${i.typeag}</h6><h6><b>ชื่อแปลง :</b> ${i.intoname}</h6><h6><b>ชนิด :</b> ${i.tcate}</h6><h6><b>วันที่รายงาน :</b> ${i.repor_date}</h6>`)
                    .addTo(map);
            }

        }
    })
}

let zoomExtent = (geojson) => {
    // console.log(geom);
    map.eachLayer((lyr) => {
        if (lyr.options.name == 'poly') {
            map.removeLayer(lyr);
        }
    });
    let poly = L.geoJSON(JSON.parse(geojson), {
        name: 'st_asgeojson'
    })
    // poly.addTo(map)
    map.fitBounds(poly.getBounds());
};

let editdata = (data) => {
    if (data.typeag == "เกษตรกรรม") {
        $("#agriModal").modal("show")
        let time1 = new Date(data.t1sdate).getTime();
        let time2 = new Date(data.t1sdateout).getTime();
        let time3 = new Date(data.repordat).getTime();
        let dateAgri = moment(time1).format("YYYY-MM-DD");
        let dateAgout = moment(time2).format("YYYY-MM-DD");
        let rpdate = moment(time3).format("YYYY-MM-DD");
        // title.textContent = "Format example: " + time;

        $("#proj_name1").text(data.typeag);
        $("#typeA").val(data.typeag);
        $("#proj_id1").val(data.id_date)
        $("#into1").val(data.intono);
        $("#into2").val(data.intoname);
        $("#prov1").val(data.province);
        $("#amp1").val(data.amphoe);
        $("#tam1").val(data.tambon);
        $("#TypeA1").val(data.t1types);
        $("#cateAgri").val(data.tcate);
        $("#dateAgri").val(dateAgri);
        $("#dateAgout").val(dateAgout);
        $("#standAgri").val(data.t1stdard);
        $("#namestand").val(data.t1stdname);
        $("#areaAgri").val(data.tarea);
        $("#unitAgri").val(data.tarunit);
        $("#rpdate").val(rpdate);

    } else if (data.typeag == "ปศุสัตว์") {
        $("#animalModal").modal("show")
        let time3 = new Date(data.repordat).getTime();
        let rpdate = moment(time3).format("YYYY-MM-DD");
        // console.log(data)
        $("#proj_name2").text(data.typeag);
        $("#typeA").val(data.typeag);
        $("#proj_id2").val(data.id_date)
        $("#into12").val(data.intono);
        $("#into22").val(data.intoname);
        $("#prov2").val(data.province);
        $("#amp2").val(data.amphoe);
        $("#tam2").val(data.tambon);
        $("#selAni").val(data.t2sel);
        $("#cateAni").val(data.tcate);
        $("#quanAni").val(data.t2amount);
        $("#areaAni").val(data.tarea);
        $("#unitAni").val(data.tarunit);
        $("#rpdate2").val(rpdate);
    } else if (data.typeag == "การประมง") {
        $("#fisherModal").modal("show")
        let time3 = new Date(data.repordat).getTime();
        let rpdate = moment(time3).format("YYYY-MM-DD");
        // console.log(data)
        // console.log(data.t3select)
        $("#proj_name3").text(data.typeag);
        $("#typeA").val(data.typeag);
        $("#proj_id3").val(data.id_date)
        $("#into13").val(data.intono);
        $("#into23").val(data.intoname);
        $("#prov3").val(data.province);
        $("#amp3").val(data.amphoe);
        $("#tam3").val(data.tambon);
        $("#watercat").val(data.t3wc);
        $("#fishselect").val(data.t3select);
        //1
        $("#namefish1").val(data.t3f1na);
        $("#fishnum1").val(data.t3f1num);
        $("#fishunit1").val(data.t3f1unit);
        //2
        $("#namefish2").val(data.t3f2na);
        $("#fishnum2").val(data.t3f2num);
        $("#fishunit2").val(data.t3f2unit);
        //3
        $("#namefish3").val(data.t3f3na);
        $("#fishnum3").val(data.t3f3num);
        $("#fishunit3").val(data.t3f3unit);
        //4
        $("#namefish4").val(data.t3f4na);
        $("#fishnum4").val(data.t3f4num);
        $("#fishunit4").val(data.t3f4unit);
        //5
        $("#namefish5").val(data.t3f5na);
        $("#fishnum5").val(data.t3f5num);
        $("#fishunit5").val(data.t3f5unit);
        $("#rpdate3").val(rpdate);
    }
}
let closeModal = () => {
    $('#editModal').modal('hide')
    $("#agriModal").modal("hide")
    $("#animalModal").modal("hide")
    $("#fisherModal").modal("hide")
    $('#deleteModal').modal('hide')
    table.ajax.reload();
    window.location.reload();
}

let confirmDelete = (name, id_date, date, type) => {
    $("#projId").val(id_date)
    $("#projName").text(`${name} ประเภท${type}`)
    $('#projTime').text(`วันที่ ${date}`)
    $("#deleteModal").modal("show");

    axios.post(url + "/insee-api/deletedata", { id_date: id_date }).then(r => {
        r.data.data == "success" ? closeModal() : null
    })
}

let deleteValue = () => {
    // console.log($("#projId").val());
    // let projid = $("#projId").val();
    // axios.post(url + "/insee-api/deletedata", { id_date: projid }).then(r => {
    //     r.data.data == "success" ? closeModal() : null
    // })
    $('#deleteModal').modal('hide')
    table.ajax.reload();
    window.location.reload();
}

let refreshPage = () => {
    location.reload(true);
}
let dataimgurl1
$('#imgfile1').change(function (evt) {
    // console.log(evt);
    var files = evt.target.files;
    var file = files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('preview1').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    resize1();
});
let resize1 = () => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var filesToUploads = document.getElementById('imgfile1').files;
        var file = filesToUploads[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var img = document.createElement("img");
                img.src = e.target.result;
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                var MAX_WIDTH = 800;
                var MAX_HEIGHT = 800;
                var width = img.width;
                var height = img.height;
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                dataimgurl1 = canvas.toDataURL(file.type);
                // console.log(dataurl)
                // document.getElementById('output').src = dataurl;
            }
            reader.readAsDataURL(file);
        }
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
}
let dataimgurl2
$('#imgfile2').change(function (evt) {
    // console.log(evt);
    var files = evt.target.files;
    var file = files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('preview2').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    resize2();
});
let resize2 = () => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var filesToUploads = document.getElementById('imgfile2').files;
        var file = filesToUploads[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var img = document.createElement("img");
                img.src = e.target.result;
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                var MAX_WIDTH = 800;
                var MAX_HEIGHT = 800;
                var width = img.width;
                var height = img.height;
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                dataimgurl2 = canvas.toDataURL(file.type);
                // console.log(dataurl)
                // document.getElementById('output').src = dataurl;
            }
            reader.readAsDataURL(file);
        }
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
}
let dataimgurl3
$('#imgfile3').change(function (evt) {
    // console.log(evt);
    var files = evt.target.files;
    var file = files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('preview3').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    resize3();
});
let resize3 = () => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var filesToUploads = document.getElementById('imgfile3').files;
        var file = filesToUploads[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var img = document.createElement("img");
                img.src = e.target.result;
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                var MAX_WIDTH = 800;
                var MAX_HEIGHT = 800;
                var width = img.width;
                var height = img.height;
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                dataimgurl3 = canvas.toDataURL(file.type);
                // console.log(dataurl)
                // document.getElementById('output').src = dataurl;
            }
            reader.readAsDataURL(file);
        }
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
}

function saveData() {
    var a = $("#typeA").val()
    // console.log(a)
    if (a == "เกษตรกรรม") {
        let dataA = [{
            typeag: $("#typeA").val(),
            id_date: $("#proj_id1").val(),
            intono: $("#into1").val(),
            intoname: $("#into2").val(),
            province: $("#prov1").val(),
            tambon: $("#tam1").val(),
            amphoe: $("#amp1").val(),
            t1types: $("#TypeA1").val(),
            tcate: $("#cateAgri").val(),
            t1sdate: $("#dateAgri").val(),
            t1sdateout: $("#dateAgout").val(),
            t1stdard: $("#standAgri").val(),
            t1stdname: $("#namestand").val(),
            tarea: $("#areaAgri").val(),
            tarunit: $("#unitAgri").val(),
            img: dataimgurl1,
            repordat: $("#rpdate").val(),
            datreport: $("#rpdate").val(),
            id_user: urname,
            id_userid: urid,
        }]
        sendData(dataA)
        table.ajax.reload();
        closeModal()
    } else if (a == "ปศุสัตว์") {
        let dataB = [{
            typeag: $("#typeA").val(),
            id_date: $("#proj_id2").val(),
            intono: $("#into12").val(),
            intoname: $("#into22").val(),
            province: $("#prov2").val(),
            tambon: $("#tam2").val(),
            amphoe: $("#amp2").val(),
            t2sel: $("#selAni").val(),
            tcate: $("#cateAni").val(),
            t2amount: $("#quanAni").val(),
            tarea: $("#areaAni").val(),
            tarunit: $("#unitAni").val(),
            img: dataimgurl2,
            repordat: $("#rpdate2").val(),
            datreport: $("#rpdate2").val(),
            id_user: urname,
            id_userid: urid,
        }]
        sendData(dataB);
        closeModal()
        table.ajax.reload();
    } else if (a == "การประมง") {
        let dataC = [{
            typeag: $("#typeA").val(),
            id_date: $("#proj_id3").val(),
            intono: $("#into13").val(),
            intoname: $("#into23").val(),
            province: $("#prov3").val(),
            tambon: $("#tam3").val(),
            amphoe: $("#amp3").val(),
            tcate: $("#watercat").val(),
            t3wc: $("#watercat").val(),
            t3select: $("#fishselect").val(),
            //1
            t3f1na: $("#namefish1").val(),
            t3f1num: $("#fishnum1").val(),
            t3f1unit: $("#fishunit1").val(),
            //2
            t3f2na: $("#namefish2").val(),
            t3f2num: $("#fishnum2").val(),
            t3f2unit: $("#fishunit2").val(),
            //3
            t3f3na: $("#namefish3").val(),
            t3f3num: $("#fishnum3").val(),
            t3f3unit: $("#fishunit3").val(),
            //4
            t3f4na: $("#namefish4").val(),
            t3f4num: $("#fishnum4").val(),
            t3f4unit: $("#fishunit4").val(),
            //5
            t3f5na: $("#namefish5").val(),
            t3f5num: $("#fishnum5").val(),
            t3f5unit: $("#fishunit5").val(),
            img: dataimgurl3,
            repordat: $("#rpdate3").val(),
            datreport: $("#rpdate3").val(),
            id_user: urname,
            id_userid: urid,
        }]
        sendData(dataC)
        table.ajax.reload();
        closeModal()

    } else {
        table.ajax.reload();
        closeModal()

        // sendData(data)}

    }
}

let sendData = (data) => {
    const obj = {
        data: data
    }
    // console.log(obj)
    $.post(url + "/form_insee/update", obj).done((r) => {
        r.data.data == "success"
        window.location.href = '/form_organic/update/index.html'
    })
}

$("#Tagri").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#TypeA").show();
        $("#TypeB").hide();
        $("#TypeC").hide();
    } else {
        $("#TypeA").hide();
        $("#TypeB").hide();
        $("#TypeC").hide();
    }
})
$("#Tanimal").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#TypeA").hide();
        $("#TypeB").show();
        $("#TypeC").hide();
    } else {
        $("#TypeA").hide();
        $("#TypeB").hide();
        $("#TypeC").hide();
    }
})
$("#Tfishery").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#TypeA").hide();
        $("#TypeB").hide();
        $("#TypeC").show();
    } else {
        $("#TypeA").hide();
        $("#TypeB").hide();
        $("#TypeC").hide();
    }
})
$("#standAgri").on("change", function () {
    var a = $("#standAgri").val()
    if (a == "มีการรับรอง") {
        $("#Namestand").show();
    } else if (a == "ไม่มีการรับรอง") {
        $("#Namestand").hide();
    }
})
$("#fishselect").on("change", function () {
    var a = $("#fishselect").val()
    if (a == '1') {
        $("#fish1").show()
        $("#fish2").hide()
        $("#fish3").hide()
        $("#fish4").hide()
        $("#fish5").hide()
    } else if (a == '2') {
        $("#fish1").show()
        $("#fish2").show()
        $("#fish3").hide()
        $("#fish4").hide()
        $("#fish5").hide()
    } else if (a == '3') {
        $("#fish1").show()
        $("#fish2").show()
        $("#fish3").show()
        $("#fish4").hide()
        $("#fish5").hide()
    } else if (a == '4') {
        $("#fish1").show()
        $("#fish2").show()
        $("#fish3").show()
        $("#fish4").show()
        $("#fish5").hide()
    } else if (a == '5') {
        $("#fish1").show()
        $("#fish2").show()
        $("#fish3").show()
        $("#fish4").show()
        $("#fish5").show()
    } else {
        $("#fish1").hide()
        $("#fish2").hide()
        $("#fish3").hide()
        $("#fish4").hide()
        $("#fish5").hide()
    }
})
$("#BuySellUse").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#BSselect").show();
        $("#Buy").show();
        $("#Sell").show();
        $("#BSselect").on("change", function () {
            var a = $("#BSselect").val();
            // console.log(a)
            if (a == "ซื้อขาย") {
                $("#Buy").show();
                $("#Sell").show();

            } else if (a == "ซื้อ") {
                $("#Buy").show();
                $("#Sell").hide();

            } else if (a == "ขาย") {
                $("#Buy").hide();
                $("#Sell").show();
            }
        })
    } else {
        $("#BSselect").hide();
        $("#Buy").hide();
        $("#Sell").hide();
    }
})
$("#KeepUse").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#Keep").show();
    } else {
        $("#Keep").hide();
    }
})
$("#TransUse").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#Transform").show();
    } else {
        $("#Transform").hide();
    }
})
$("#prodselect").on("change", function () {
    var a = $("#prodselect").val();
    if (a == "1") {
        $("#product1").show();
        $("#product2").hide();
        $("#product3").hide();
        $("#product4").hide();
        $("#product5").hide();
    } else if (a == "2") {
        $("#product1").show();
        $("#product2").show();
        $("#product3").hide();
        $("#product4").hide();
        $("#product5").hide();
    } else if (a == "3") {
        $("#product1").show();
        $("#product2").show();
        $("#product3").show();
        $("#product4").hide();
        $("#product5").hide();
    } else if (a == "4") {
        $("#product1").show();
        $("#product2").show();
        $("#product3").show();
        $("#product4").show();
        $("#product5").hide();
    } else if (a == "5") {
        $("#product1").show();
        $("#product2").show();
        $("#product3").show();
        $("#product4").show();
        $("#product5").show();
    } else {
        $("#product").hide();
        $("#product").hide();
        $("#product").hide();
        $("#product").hide();
        $("#product").hide();
    }
})

let zoommap = (lyr, code) => {
    map.eachLayer(lyr => {
        if (lyr.options.name == 'bound') {
            map.removeLayer(lyr)
        }
    })

    axios.get(url + `/eec-api/get-bound-flip/${lyr}/${code}`).then(r => {
        let geom = JSON.parse(r.data.data[0].geom)
        var polygon = L.polygon(geom.coordinates, { color: "red", name: "bound", fillOpacity: 0.0 }).addTo(map);
        map.fitBounds(polygon.getBounds());
    })
    if (code == "eec") {
        map.closePopup();
    }
}