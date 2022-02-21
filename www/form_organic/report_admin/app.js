let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
$("#usrname").text(urname);
urid ? null : $("#noauth").modal("show");

// urid ? null : location.href = "./../../form_register/login/index.html";
let Accept = sessionStorage.getItem('accept');
if (Accept) {
    $('.toast').toast('hide')
}
else {
    $('.toast').toast('show')
}
$('#btnDeny').click(() => {
    // eraseCookie('allowCookies')
    $('.toast').toast('hide')
})
let setAccept
$('#btnAccept').click(() => {
    // setCookie('allowCookies','1',7)
    $('.toast').toast('hide')
    setAccept = sessionStorage.setItem('accept', 'Yes');
})
// urid ? null : location.href = "./../../form_register/login/index.html";

let gotoLogin = () => {
    location.href = "./../../form_register/login/index.html";
}
if (eecauth !== "admin" && eecauth !== "user") {
    $("#noauth").modal("show")
}
//     location.href = "./../../form_register/login/index.html";}
const url = "https://engrids.soc.cmu.ac.th/api";

let userid;

let main = async () => {
    await liff.init({ liffId: "1655648770-JLXzogag" })
    if (liff.isLoggedIn()) {
        getUserProfile()
    } else {
        liff.login()
    }
}

// main()

let getUserProfile = async () => {
    const profile = await liff.getProfile();
    $('#profile').attr('src', await profile.pictureUrl);
    $('#userId').text(profile.userId);
    $('#statusMessage').text(await profile.statusMessage);
    $('#displayName').text(await profile.displayName);
    userid = profile.userId;
}
let dataurl
// console.log(eecauth)
if (eecauth == "admin") {
    dataurl = url + "/insee-api/getgeom";
    $('#login').hide();
} else if (eecauth == "user") {
    dataurl = url + "/insee-api/getgeom/" + urid;
    $('#login').hide();
    $('#cardselect').hide();
} else {
    dataurl = url + "/insee-api/getgeom";
    $('#usr1').hide();
    $('#usr2').hide();
    $('#cardselect').hide();
    $('#cardtable').hide()
}
$("#pro").on("change", function () {
    if (this.value !== "eec") {
        getPro(this.value)
    } else if (this.value == "eec") {
        $("#amp").val("");
        $("#tam").val("");
    }
    seclectdata(eecauth, "prov", this.value)
    zoommap("pro", this.value)
});
$("#amp").on("change", function () {
    getAmp(this.value)
    seclectdata(eecauth, "amp", this.value)
    zoommap("amp", this.value)
});
$("#tam").on("change", function () {
    getTam(this.value)
    seclectdata(eecauth, "tam", this.value)
    zoommap("tam", this.value)
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
        $('#area1').text('ข้อมูลของจังหวัดชลบุรี');
        $('#area2').text('ข้อมูลของจังหวัดชลบุรี');
    } else if (procode == 21) {
        prov_name = "ระยอง"
        $('#area1').text('ข้อมูลของจังหวัดระยอง');
        $('#area2').text('ข้อมูลของจังหวัดระยอง');
    } else if (procode == 24) {
        prov_name = "ฉะเชิงเทรา"
        $('#area1').text('ข้อมูลของจังหวัดฉะเชิงเทรา');
        $('#area2').text('ข้อมูลของจังหวัดฉะเชิงเทรา');
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
        $('#area1').text(`ข้อมูลของจังหวัด${prov_name} อำเภอ${amp_name}`);
        $('#area2').text(`ข้อมูลของจังหวัด${prov_name} อำเภอ${amp_name}`);

    })
}
let getTam = (tamcode) => {
    axios.get(url + `/eec-api/get-tam/${amp_code}`).then(r => {
        let data = r.data.data.filter(e => e.tambon_idn == tamcode)
        tam_name = data[0].tam_namt
        tam_code = tamcode
        $('#area1').text(`ข้อมูลของจังหวัด${prov_name} อำเภอ${amp_name} ตำบล${tam_name}`);
        $('#area2').text(`ข้อมูลของจังหวัด${prov_name} อำเภอ${amp_name} ตำบล${tam_name}`);
    })
}
let seclectdata = (auth, type, code) => {
    if (auth !== "user") {
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
            },
            "emptyTable": "ไม่พบข้อมูล..."
        },
    });
    table = $('#myTable').DataTable({
        ajax: {
            type: "get",
            url: dataurl,
            data: { userid: urid },
            dataSrc: 'data'
        },
        columns: [
            {
                // targets: -1,
                // data: null,
                // defaultContent: `<button type="button" class="btn btn-success" id="getMap">ขยายแผนที่</button>
                //                     <button type="button" class="btn btn-danger" id="delete">ลบ!</button>`
                data: null,
                render: function (data, type, row, meta) {
                    // console.log(row);
                    // <button class="btn btn-margin btn-outline-success" onclick="zoomExtent('${row.typeag}','${row.t1sdateout}','${row.t2amount}','${row.lat}','${row.lon}')"><i class="bi bi-bar-chart-fill"></i>&nbsp;รายละเอียด</button>

                    return `<button class="btn btn-margin btn btn-primary" id="getvalue">ที่ตั้งแปลง</button>`
                    // <button type="button" class="btn btn-warning" id="getdata">ข้อมูล</button>
                    // <button class="btn btn-margin btn-danger" onclick="confirmDelete('${row.intoname}','${row.typeag}','${row.id_date}','${row.id_user}')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>
                },
            },
            { data: 'intoname' },
            { data: 'typeag' },
            { data: 'tcate' },
        ],
        columnDefs: [
            { className: 'text-center', targets: [0] },
        ],
        dom: 'Bfrtip',
        buttons: [
            'excel', 'print'
        ],
        searching: true,
        scrollX: true,
        pageLength: 9
    });
    // console.log(data)
    table.on('search.dt', function () {
        let data = table.rows({ search: 'applied' }).data()
        $("#siteCnt").text(data.length)
        // $("#allvalue").text(data.length)
        // $("#agri").text(data.length)
        // $("#animal").text(data.length)
        // $("#fisher").text(data.length)
        // $("#buysell").text(data.length)
        // $("#keep").text(data.length)
        // $("#transform").text(data.length)
        getMap(data)
        // console.log();
    });

    $('#myTable tbody').on('click', '#getvalue', function () {
        var data = table.row($(this).parents('tr')).data();
        zoomExtent(data)
    });
    $('#myTable tbody').on('click', '#getdata', function () {
        var data = table.row($(this).parents('tr')).data();
        getdata(data)
    });
    $('#myTable tbody').on('click', '#delete', function () {
        var data = table.row($(this).parents('tr')).data();
        confirmDelete(data.intono, data.typeag)
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

const tam = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
    layers: "eec:a__03_tambon_eec",
    format: "image/png",
    transparent: true,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const amp = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
    layers: "eec:a__02_amphoe_eec",
    format: "image/png",
    transparent: true,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const pro = L.tileLayer.wms("https://engrids.soc.cmu.ac.th/geoserver/eec/wms?", {
    layers: "eec:a__01_prov_eec",
    format: "image/png",
    transparent: true,
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

var legend = L.control({ position: "bottomright" });
function showLegend() {
    legend.onAdd = function (map) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += `<button class="btn btn-sm" onClick="hideLegend()">
      <span class="kanit">ซ่อนสัญลักษณ์</span><i class="fa fa-angle-double-down" aria-hidden="true"></i>
    </button><br>`;
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
        if (i.st_asgeojson && i.typeag == 'เกษตรกรรม') {
            let geojson = L.geoJSON(JSON.parse(i.st_asgeojson), {
                style: style_agri,
                name: "st_asgeojson",
                onEachFeature: function (feature, layer) {
                    drawnItems.addLayer(layer);
                }
            })
            geojson
                .bindPopup(`<h6><b>ประภทของแปลง :</b> ${i.typeag}</h6><h6><b>ชื่อแปลง :</b> ${i.intoname}</h6><h6><b>ชนิด :</b> ${i.tcate}</h6><h6><b>วันที่รายงาน :</b> ${i.repor_date}</h6>`)
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
                .bindPopup(`<h6><b>ประภทของแปลง :</b> ${i.typeag}</h6><h6><b>ชื่อแปลง :</b> ${i.intoname}</h6><h6><b>ชนิด :</b> ${i.tcate}</h6><h6><b>วันที่รายงาน :</b> ${i.repor_date}</h6>`)
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
                .bindPopup(`<h6><b>ประภทของแปลง :</b> ${i.typeag}</h6><h6><b>ชื่อแปลง :</b> ${i.intoname}</h6><h6><b>ชนิด :</b> ${i.tcate}</h6><h6><b>วันที่รายงาน :</b> ${i.repor_date}</h6>`)
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
                .bindPopup(`<h6><b>ประภทของแปลง :</b> ${i.typeag}</h6><h6><b>ชื่อแปลง :</b> ${i.intoname}</h6><h6><b>ชนิด :</b> ${i.tcate}</h6><h6><b>วันที่รายงาน :</b> ${i.repor_date}</h6>`)
                .addTo(map);
        }
    })
}

let zoomExtent = (data) => {
    var a = [data];
    // console.log(a)
    a.map(i => {
        var pop
        if (i.typeag == "เกษตรกรรม" && i.t1sdateout !== null) {
            pop = L.popup({ minWidth: 250 });
            let content = `<h5>วันที่เก็บผลผลิต</h5><h6><span id="countdown"></span></h6><h6><span id="D1"></span></h6><h6><span id="A1"></span></h6>`;
            let setlocation = [];
            setlocation.push({
                "lat": i.lat,
                "lng": i.lon,
            })
            pop.setContent(content);
            pop.setLatLng(setlocation[0]);
            pop.openOn(map);
            var zoom = 15
            map.flyTo([i.lat, i.lon], zoom)

            let countDownDate = new Date(i.t1sdateout).getTime();
            let x = setInterval(function () {
                let now = Date.now();
                let distance = countDownDate - now;
                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);
                if (distance > 0) {
                    clearInterval(x);
                    $("#countdown").text(days + " วัน " + hours + " ชั่วโมง "
                        + minutes + " นาที " + seconds + " วินาที ");
                    // console.log(i.tarea, i.tarunit)
                    if (i.tarea !== null && i.tarunit !== null) {
                        document.getElementById("A1").innerHTML = `ขนาดพื้นที่ ${i.tarea} ${i.tarunit}`;
                    }
                } else if (distance < 0) {
                    clearInterval(x);
                    document.getElementById("countdown").innerHTML = "ปัจจุบันไม่มีการเพาะปลูก";
                    if (i.tarea !== null && i.tarunit !== null) {
                        document.getElementById("A1").innerHTML = `ขนาดพื้นที่ ${i.tarea} ${i.tarunit}`;
                    }
                } else {
                    clearInterval(x);
                    document.getElementById("countdown").innerHTML = "NO Data"
                    document.getElementById("A1").innerHTML = ""
                }
                document.getElementById("D1").innerHTML = `แปลง${i.typeag} ${i.tcate}`
            }, 1000);
        } else if (i.typeag == "เกษตรกรรม" && i.t1sdateout == null) {
            pop = L.popup({ minWidth: 250 });
            var content = `<h5>วันที่เก็บผลผลิต</h5><h6 id="countdown2"></h6><h6><span id="D1"></span></h6><h6><span id="A1"></span></h6>`;
            var setlocation = [];
            setlocation.push({
                "lat": i.lat,
                "lng": i.lon,
            })
            pop.setContent(content);
            pop.setLatLng(setlocation[0]);
            pop.openOn(map);
            var zoom = 15
            map.flyTo([i.lat, i.lon], zoom)
            let x = setInterval(function () {
                if (i.t1sdateout == null) {
                    clearInterval(x)
                    document.getElementById("countdown2").innerHTML = "EXPIRED"
                    document.getElementById("D1").innerHTML = `แปลง${i.typeag} ${i.tcate}`
                    // console.log(i.tarea, i.tarunit)
                    if (i.tarea !== null && i.tarunit !== null) {
                        document.getElementById("A1").innerHTML = `ขนาดพื้นที่ ${i.tarea} ${i.tarunit}`;
                    }
                } else {
                    clearInterval(x)
                    document.getElementById("countdown2").innerHTML = "No Data"
                    document.getElementById("A1").innerHTML = ""
                }
            }, 1000);
            //    map.closePopup(); 
        } else if (i.typeag == "ปศุสัตว์" && i.t2amount !== null) {
            pop = L.popup({ minWidth: 200 });
            var content = `<h6><span id="D1"></span></h6><h6>จำนวนสัตว์ที่เลี้ยง<span id="animalval"></span></h6><h6><span id="A1"></span></h6>`;
            var setlocation = [];
            setlocation.push({
                "lat": i.lat,
                "lng": i.lon,
            })
            pop.setContent(content);
            pop.setLatLng(setlocation[0]);
            pop.openOn(map);
            var zoom = 15
            map.flyTo([i.lat, i.lon], zoom)
            let x = setInterval(function () {
                if (i.t2amount !== null) {
                    clearInterval(x)
                    document.getElementById("D1").innerHTML = `แปลง${i.typeag} ${i.tcate}`
                    document.getElementById("animalval").innerHTML = ` ${i.t2amount} ตัว`;
                    // console.log(i.tarea, i.tarunit)
                    if (i.tarea !== null && i.tarunit !== null) {
                        document.getElementById("A1").innerHTML = `ขนาดพื้นที่ ${i.tarea} ${i.tarunit} `;
                    }
                } else {
                    clearInterval(x)
                    document.getElementById("D1").innerHTML = ""
                    document.getElementById("animalval").innerHTML = "";
                    document.getElementById("A1").innerHTML = ""
                }
            }, 1000);
        } else if (i.typeag == "ปศุสัตว์" && i.t2amount == null) {
            pop = L.popup({ minWidth: 200 });
            var content = `<h6>จำนวนสัตว์ที่เลี้ยง<span id="animalval"></span></h6><h6><span id="A1"></span></h6>`;
            var setlocation = [];
            setlocation.push({
                "lat": i.lat,
                "lng": i.lon,
            })
            pop.setContent(content);
            pop.setLatLng(setlocation[0]);
            pop.openOn(map);
            var zoom = 15
            map.flyTo([i.lat, i.lon], zoom)
            let x = setInterval(function () {
                if (i.t2amount == null) {
                    clearInterval(x)
                    document.getElementById("animalval").innerHTML = ` (ไม่ทราบจำนวน)`;
                    // console.log(i.tarea, i.tarunit)
                    if (i.tarea !== null && i.tarunit !== null) {
                        document.getElementById("A1").innerHTML = `ขนาดพื้นที่ ${i.tarea} ${i.tarunit} `;
                    } else {
                        document.getElementById("A1").innerHTML = ""
                    }
                }
            }, 1000)
        } else if (i.typeag == "การประมง" && i.t3wc == "น้ำจืด" || i.t3wc == "น้ำเค็ม" || i.t3wc == "น้ำกร่อย") {
            // console.log(i.typeag, i.t3wc)
            pop = L.popup({ minWidth: 200 });
            var content = `<h5>การทำประมง</h5><h6 id="fish1"></h6><h6>ประกอบด้วย</h6><h6 id="val1"></h6><h6 id="val2"></h6><h6 id="val3"></h6><h6 id="val4"></h6><h6 id="val5"></h6>`;
            var setlocation = [];
            setlocation.push({
                "lat": i.lat,
                "lng": i.lon,
            })
            pop.setContent(content);
            pop.setLatLng(setlocation[0]);
            pop.openOn(map);
            var zoom = 15
            map.flyTo([i.lat, i.lon], zoom)
            let x = setInterval(function () {
                if (i.t3wc == "น้ำจืด") {
                    clearInterval(x)
                    document.getElementById("fish1").innerHTML = "ประเภท น้ำจืด";
                    if (i.t3f1na !== null && i.t3f2na == null && i.t3f3na == null && i.t3f4na == null && i.t3f5na == null) {
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                    } else if (i.t3f1na !== null && i.t3f2na !== null && i.t3f3na == null && i.t3f4na == null && i.t3f5na == null) {
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                        document.getElementById("val2").innerHTML = `${i.t3f2na} ${i.t3f2num} ${i.t3f2unit} `
                    } else if (i.t3f1num !== null && i.t3f2na !== null && i.t3f3na !== null && i.t3f4na == null && i.t3f5na == null) {
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                        document.getElementById("val2").innerHTML = `${i.t3f2na} ${i.t3f2num} ${i.t3f2unit} `
                        document.getElementById("val3").innerHTML = `${i.t3f3na} ${i.t3f3num} ${i.t3f3unit} `
                    } else if (i.t3f1num !== null && i.t3f2na !== null && i.t3f3na !== null && i.t3f4na !== null && i.t3f5na == null) {
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                        document.getElementById("val2").innerHTML = `${i.t3f2na} ${i.t3f2num} ${i.t3f2unit} `
                        document.getElementById("val3").innerHTML = `${i.t3f3na} ${i.t3f3num} ${i.t3f3unit} `
                        document.getElementById("val4").innerHTML = `${i.t3f4na} ${i.t3f4num} ${i.t3f4unit} `
                    } else if (i.t3f1num !== null && i.t3f2na !== null && i.t3f3na !== null && i.t3f4na !== null && i.t3f5na !== null) {
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                        document.getElementById("val2").innerHTML = `${i.t3f2na} ${i.t3f2num} ${i.t3f2unit} `
                        document.getElementById("val3").innerHTML = `${i.t3f3na} ${i.t3f3num} ${i.t3f3unit} `
                        document.getElementById("val4").innerHTML = `${i.t3f4na} ${i.t3f4num} ${i.t3f4unit} `
                        document.getElementById("val5").innerHTML = `${i.t3f5na} ${i.t3f5num} ${i.t3f5unit} `
                    }
                } else if (i.t3wc == "น้ำเค็ม") {
                    clearInterval(x)
                    document.getElementById("fish1").innerHTML = "ประเภท น้ำเค็ม";
                    if (i.t3f1na !== null && i.t3f2na == null && i.t3f3na == null && i.t3f4na == null && i.t3f5na == null) {
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                    } else if (i.t3f1na !== null && i.t3f2na !== null && i.t3f3na == null && i.t3f4na == null && i.t3f5na == null) {
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                        document.getElementById("val2").innerHTML = `${i.t3f2na} ${i.t3f2num} ${i.t3f2unit} `
                    } else if (i.t3f1num !== null && i.t3f2na !== null && i.t3f3na !== null && i.t3f4na == null && i.t3f5na == null) {
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                        document.getElementById("val2").innerHTML = `${i.t3f2na} ${i.t3f2num} ${i.t3f2unit} `
                        document.getElementById("val3").innerHTML = `${i.t3f3na} ${i.t3f3num} ${i.t3f3unit} `
                    } else if (i.t3f1num !== null && i.t3f2na !== null && i.t3f3na !== null && i.t3f4na !== null && i.t3f5na == null) {
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                        document.getElementById("val2").innerHTML = `${i.t3f2na} ${i.t3f2num} ${i.t3f2unit} `
                        document.getElementById("val3").innerHTML = `${i.t3f3na} ${i.t3f3num} ${i.t3f3unit} `
                        document.getElementById("val4").innerHTML = `${i.t3f4na} ${i.t3f4num} ${i.t3f4unit} `
                    } else if (i.t3f1num !== null && i.t3f2na !== null && i.t3f3na !== null && i.t3f4na !== null && i.t3f5na !== null) {
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                        document.getElementById("val2").innerHTML = `${i.t3f2na} ${i.t3f2num} ${i.t3f2unit} `
                        document.getElementById("val3").innerHTML = `${i.t3f3na} ${i.t3f3num} ${i.t3f3unit} `
                        document.getElementById("val4").innerHTML = `${i.t3f4na} ${i.t3f4num} ${i.t3f4unit} `
                        document.getElementById("val5").innerHTML = `${i.t3f5na} ${i.t3f5num} ${i.t3f5unit} `
                    }
                } else if (i.t3wc == "น้ำกร่อย") {
                    clearInterval(x)
                    document.getElementById("fish1").innerHTML = "ประเภท น้ำกร่อย";
                    if (i.t3f1na !== null && i.t3f2na == null && i.t3f3na == null && i.t3f4na == null && i.t3f5na == null) {
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                    } else if (i.t3f1na !== null && i.t3f2na !== null && i.t3f3na == null && i.t3f4na == null && i.t3f5na == null) {
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                        document.getElementById("val2").innerHTML = `${i.t3f2na} ${i.t3f2num} ${i.t3f2unit} `
                    } else if (i.t3f1num !== null && i.t3f2na !== null && i.t3f3na !== null && i.t3f4na == null && i.t3f5na == null) {
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                        document.getElementById("val2").innerHTML = `${i.t3f2na} ${i.t3f2num} ${i.t3f2unit} `
                        document.getElementById("val3").innerHTML = `${i.t3f3na} ${i.t3f3num} ${i.t3f3unit} `
                    } else if (i.t3f1num !== null && i.t3f2na !== null && i.t3f3na !== null && i.t3f4na !== null && i.t3f5na == null) {
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                        document.getElementById("val2").innerHTML = `${i.t3f2na} ${i.t3f2num} ${i.t3f2unit} `
                        document.getElementById("val3").innerHTML = `${i.t3f3na} ${i.t3f3num} ${i.t3f3unit} `
                        document.getElementById("val4").innerHTML = `${i.t3f4na} ${i.t3f4num} ${i.t3f4unit} `
                    } else if (i.t3f1num !== null && i.t3f2na !== null && i.t3f3na !== null && i.t3f4na !== null && i.t3f5na !== null) {
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                        document.getElementById("val2").innerHTML = `${i.t3f2na} ${i.t3f2num} ${i.t3f2unit} `
                        document.getElementById("val3").innerHTML = `${i.t3f3na} ${i.t3f3num} ${i.t3f3unit} `
                        document.getElementById("val4").innerHTML = `${i.t3f4na} ${i.t3f4num} ${i.t3f4unit} `
                        document.getElementById("val5").innerHTML = `${i.t3f5na} ${i.t3f5num} ${i.t3f5unit} `
                    }
                } else {
                    pop = L.popup({ minWidth: 200 });
                    var content = `<h5> No Data</h5> <h6 id=""></h6>`;
                    var setlocation = [];
                    setlocation.push({
                        "lat": i.lat,
                        "lng": i.lon,
                    })
                    pop.setContent(content);
                    pop.setLatLng(setlocation[0]);
                    pop.openOn(map);
                    var zoom = 20
                    map.flyTo([i.lat, i.lon], zoom)
                }
            }, 1000)
        } else {
            pop = L.popup();
            var content = `<h5> No Data</h5><h6 id=""></h6>`;
            var setlocation = [];
            setlocation.push({
                "lat": i.lat,
                "lng": i.lon,
            })
            pop.setContent(content);
            pop.setLatLng(setlocation[0]);
            pop.openOn(map);
            var zoom = 15
            map.flyTo([i.lat, i.lon], zoom)
        }
    })

}
let getdata = (data) => {
    var a = [data];
    a.map(i => {
        if (i.typeag == "เกษตรกรรม" && i.t1sdateout !== null) {
            $('#agriModal').modal('show')
            $("#proj_name").text(`${i.intoname} ${i.typeag}`)
            let countDownDate = new Date(i.t1sdateout).getTime();
            let x = setInterval(function () {
                let now = Date.now();
                let distance = countDownDate - now;
                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);
                if (distance > 0) {
                    clearInterval(x);
                    $("#countdown").text(days + " วัน " + hours + " ชั่วโมง "
                        + minutes + " นาที " + seconds + " วินาที ");
                    // console.log(i.tarea, i.tarunit)
                    if (i.tarea !== null && i.tarunit !== null) {
                        document.getElementById("A1").innerHTML = `ขนาดพื้นที่ ${i.tarea} ${i.tarunit}`;
                    }
                } else if (distance < 0) {
                    clearInterval(x);
                    document.getElementById("countdown").innerHTML = "หมดเวลา";
                    if (i.tarea !== null && i.tarunit !== null) {
                        document.getElementById("A1").innerHTML = `ขนาดพื้นที่ ${i.tarea} ${i.tarunit}`;
                    }
                } else {
                    clearInterval(x);
                    document.getElementById("countdown").innerHTML = "NO Data"
                    document.getElementById("A1").innerHTML = ""
                }
            }, 1000);
        } else if (i.typeag == "เกษตรกรรม" && i.t1sdateout == null) {
            $('#agriModal').modal('show')
            $("#proj_name").text(`${i.intoname} ${i.typeag}`)
            let x = setInterval(function () {
                if (i.t1sdateout == null) {
                    clearInterval(x)
                    document.getElementById("countdown").innerHTML = "EXPIRED"
                    if (i.tarea !== null && i.tarunit !== null) {
                        document.getElementById("A1").innerHTML = `ขนาดพื้นที่ ${i.tarea} ${i.tarunit}`;
                    }
                } else {
                    clearInterval(x)
                    document.getElementById("countdown").innerHTML = "No Data"
                    document.getElementById("A1").innerHTML = ""
                }
            }, 1000);
            //    map.closePopup(); 
        } else if (i.typeag == "ปศุสัตว์" && i.t2amount !== null) {
            $('#animalModal').modal('show')
            let x = setInterval(function () {
                if (i.t2amount !== null) {
                    clearInterval(x)
                    document.getElementById("D1").innerHTML = ` ${i.intoname} ${i.typeag} ${i.tcate}`
                    document.getElementById("animalval").innerHTML = ` ${i.t2amount} ตัว`;
                    // console.log(i.tarea, i.tarunit)
                    if (i.tarea !== null && i.tarunit !== null) {
                        document.getElementById("A1").innerHTML = `ขนาดพื้นที่ ${i.tarea} ${i.tarunit} `;
                    }
                } else {
                    clearInterval(x)
                    document.getElementById("D1").innerHTML = ""
                    document.getElementById("animalval").innerHTML = "";
                    document.getElementById("A1").innerHTML = ""
                }
            }, 1000);
        } else if (i.typeag == "ปศุสัตว์" && i.t2amount == null) {
            $('#animalModal').modal('show')
            let x = setInterval(function () {
                if (i.t2amount == null) {
                    clearInterval(x)
                    document.getElementById("D1").innerHTML = ` ${i.intoname} ${i.typeag} ${i.tcate}`
                    document.getElementById("animalval").innerHTML = `(ไม่ทราบจำนวน)`;
                    // console.log(i.tarea, i.tarunit)
                    if (i.tarea !== null && i.tarunit !== null) {
                        document.getElementById("A1").innerHTML = `ขนาดพื้นที่ ${i.tarea} ${i.tarunit} `;
                    } else {
                        document.getElementById("A1").innerHTML = ""
                    }
                }
            }, 1000)
        } else if (i.typeag == "การประมง" && i.t3wc == "น้ำจืด" || i.t3wc == "น้ำเค็ม" || i.t3wc == "น้ำกร่อย") {
            $('#fisherModal').modal('show')
            let x = setInterval(function () {
                if (i.t3wc == "น้ำจืด") {
                    clearInterval(x)
                    document.getElementById("F1").innerHTML = `ประเภทน้ำจืด ${i.intoname}`
                    if (i.t3f1na !== null && i.t3f2na == null && i.t3f3na == null && i.t3f4na == null && i.t3f5na == null) {
                        document.getElementById("val0").innerHTML = "ประกอบด้วย"
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                    } else if (i.t3f1na !== null && i.t3f2na !== null && i.t3f3na == null && i.t3f4na == null && i.t3f5na == null) {
                        document.getElementById("val0").innerHTML = "ประกอบด้วย"
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                        document.getElementById("val2").innerHTML = `${i.t3f2na} ${i.t3f2num} ${i.t3f2unit} `
                    } else if (i.t3f1num !== null && i.t3f2na !== null && i.t3f3na !== null && i.t3f4na == null && i.t3f5na == null) {
                        document.getElementById("val0").innerHTML = "ประกอบด้วย"
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                        document.getElementById("val2").innerHTML = `${i.t3f2na} ${i.t3f2num} ${i.t3f2unit} `
                        document.getElementById("val3").innerHTML = `${i.t3f3na} ${i.t3f3num} ${i.t3f3unit} `
                    } else if (i.t3f1num !== null && i.t3f2na !== null && i.t3f3na !== null && i.t3f4na !== null && i.t3f5na == null) {
                        document.getElementById("val0").innerHTML = "ประกอบด้วย"
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                        document.getElementById("val2").innerHTML = `${i.t3f2na} ${i.t3f2num} ${i.t3f2unit} `
                        document.getElementById("val3").innerHTML = `${i.t3f3na} ${i.t3f3num} ${i.t3f3unit} `
                        document.getElementById("val4").innerHTML = `${i.t3f4na} ${i.t3f4num} ${i.t3f4unit} `
                    } else if (i.t3f1num !== null && i.t3f2na !== null && i.t3f3na !== null && i.t3f4na !== null && i.t3f5na !== null) {
                        document.getElementById("val0").innerHTML = "ประกอบด้วย"
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                        document.getElementById("val2").innerHTML = `${i.t3f2na} ${i.t3f2num} ${i.t3f2unit} `
                        document.getElementById("val3").innerHTML = `${i.t3f3na} ${i.t3f3num} ${i.t3f3unit} `
                        document.getElementById("val4").innerHTML = `${i.t3f4na} ${i.t3f4num} ${i.t3f4unit} `
                        document.getElementById("val5").innerHTML = `${i.t3f5na} ${i.t3f5num} ${i.t3f5unit} `
                    }
                } else if (i.t3wc == "น้ำเค็ม") {
                    clearInterval(x)
                    document.getElementById("F1").innerHTML = `ประเภทน้ำเค็ม ${i.intoname}`
                    if (i.t3f1na !== null && i.t3f2na == null && i.t3f3na == null && i.t3f4na == null && i.t3f5na == null) {
                        document.getElementById("val0").innerHTML = "ประกอบด้วย"
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                    } else if (i.t3f1na !== null && i.t3f2na !== null && i.t3f3na == null && i.t3f4na == null && i.t3f5na == null) {
                        document.getElementById("val0").innerHTML = "ประกอบด้วย"
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                        document.getElementById("val2").innerHTML = `${i.t3f2na} ${i.t3f2num} ${i.t3f2unit} `
                    } else if (i.t3f1num !== null && i.t3f2na !== null && i.t3f3na !== null && i.t3f4na == null && i.t3f5na == null) {
                        document.getElementById("val0").innerHTML = "ประกอบด้วย"
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                        document.getElementById("val2").innerHTML = `${i.t3f2na} ${i.t3f2num} ${i.t3f2unit} `
                        document.getElementById("val3").innerHTML = `${i.t3f3na} ${i.t3f3num} ${i.t3f3unit} `
                    } else if (i.t3f1num !== null && i.t3f2na !== null && i.t3f3na !== null && i.t3f4na !== null && i.t3f5na == null) {
                        document.getElementById("val0").innerHTML = "ประกอบด้วย"
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                        document.getElementById("val2").innerHTML = `${i.t3f2na} ${i.t3f2num} ${i.t3f2unit} `
                        document.getElementById("val3").innerHTML = `${i.t3f3na} ${i.t3f3num} ${i.t3f3unit} `
                        document.getElementById("val4").innerHTML = `${i.t3f4na} ${i.t3f4num} ${i.t3f4unit} `
                    } else if (i.t3f1num !== null && i.t3f2na !== null && i.t3f3na !== null && i.t3f4na !== null && i.t3f5na !== null) {
                        document.getElementById("val0").innerHTML = "ประกอบด้วย"
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                        document.getElementById("val2").innerHTML = `${i.t3f2na} ${i.t3f2num} ${i.t3f2unit} `
                        document.getElementById("val3").innerHTML = `${i.t3f3na} ${i.t3f3num} ${i.t3f3unit} `
                        document.getElementById("val4").innerHTML = `${i.t3f4na} ${i.t3f4num} ${i.t3f4unit} `
                        document.getElementById("val5").innerHTML = `${i.t3f5na} ${i.t3f5num} ${i.t3f5unit} `
                    }
                } else if (i.t3wc == "น้ำกร่อย") {
                    clearInterval(x)
                    document.getElementById("F1").innerHTML = `ประเภทน้ำกร่อย ${i.intoname}`
                    if (i.t3f1na !== null && i.t3f2na == null && i.t3f3na == null && i.t3f4na == null && i.t3f5na == null) {
                        document.getElementById("val0").innerHTML = "ประกอบด้วย"
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                    } else if (i.t3f1na !== null && i.t3f2na !== null && i.t3f3na == null && i.t3f4na == null && i.t3f5na == null) {
                        document.getElementById("val0").innerHTML = "ประกอบด้วย"
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                        document.getElementById("val2").innerHTML = `${i.t3f2na} ${i.t3f2num} ${i.t3f2unit} `
                    } else if (i.t3f1num !== null && i.t3f2na !== null && i.t3f3na !== null && i.t3f4na == null && i.t3f5na == null) {
                        document.getElementById("val0").innerHTML = "ประกอบด้วย"
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                        document.getElementById("val2").innerHTML = `${i.t3f2na} ${i.t3f2num} ${i.t3f2unit} `
                        document.getElementById("val3").innerHTML = `${i.t3f3na} ${i.t3f3num} ${i.t3f3unit} `
                    } else if (i.t3f1num !== null && i.t3f2na !== null && i.t3f3na !== null && i.t3f4na !== null && i.t3f5na == null) {
                        document.getElementById("val0").innerHTML = "ประกอบด้วย"
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                        document.getElementById("val2").innerHTML = `${i.t3f2na} ${i.t3f2num} ${i.t3f2unit} `
                        document.getElementById("val3").innerHTML = `${i.t3f3na} ${i.t3f3num} ${i.t3f3unit} `
                        document.getElementById("val4").innerHTML = `${i.t3f4na} ${i.t3f4num} ${i.t3f4unit} `
                    } else if (i.t3f1num !== null && i.t3f2na !== null && i.t3f3na !== null && i.t3f4na !== null && i.t3f5na !== null) {
                        document.getElementById("val0").innerHTML = "ประกอบด้วย"
                        document.getElementById("val1").innerHTML = `${i.t3f1na} ${i.t3f1num} ${i.t3f1unit} `
                        document.getElementById("val2").innerHTML = `${i.t3f2na} ${i.t3f2num} ${i.t3f2unit} `
                        document.getElementById("val3").innerHTML = `${i.t3f3na} ${i.t3f3num} ${i.t3f3unit} `
                        document.getElementById("val4").innerHTML = `${i.t3f4na} ${i.t3f4num} ${i.t3f4unit} `
                        document.getElementById("val5").innerHTML = `${i.t3f5na} ${i.t3f5num} ${i.t3f5unit} `
                    }
                }
            }, 1000)
        }
    });
}

let closeModal = () => {
    $('#agriModal').modal('hide')
    $('#animalModal').modal('hide')
    $('#fisherModal').modal('hide')
    $('#deleteModal').modal('hide')
    $('#myTable').DataTable().ajax.reload();
}

let confirmDelete = (intoname, typeag, id_date, id_user) => {
    // console.log(intoname, typeag, id_date, id_user)
    $("#proj_id").val(id_date)
    $("#projName").text(`${intoname}`)
    $("#projTime").text(`ประเภทแปลง ${typeag}`)
    $("#deleteModal").modal("show")
}

let deleteValue = () => {
    // console.log($("#proj_id").val());
    let proj_id = $("#proj_id").val()
    axios.post(url + "/insee-api/deletedata", { id_date: proj_id }).then(r => {
        r.data.data == "success" ? closeModal() : null
    })
}

let getScore = () => {
    axios.get(url + "/insee-api/get").then(r => {
        var a = r.data.data
        var agri = a.filter(e => e.typeag === "เกษตรกรรม" && e.t1types !== "" && e.t1types !== null && r.tcate !== "" && e.tcate !== null)
        var animal = a.filter(e => e.typeag === "ปศุสัตว์" && e.t2sel !== "" && e.t2sel !== null && r.tcate !== "" && e.tcate !== null)
        var fish = a.filter(e => e.typeag === "การประมง" && r.tcate !== "" && e.tcate !== null)
        var buysell = a.filter(e => e.use1 !== "" && e.use1 !== null && e.typeag !== null)
        var keep = a.filter(e => e.use2 !== "" && e.use2 !== null && e.typeag !== null)
        var trans = a.filter(e => e.use3 !== "" && e.use3 !== null && e.typeag !== null)
        // console.log(animal)
        //         // var b = r.data.data[0].geom
        //         // let c = L.geoJSON(b)
        //         console.log(a)
        //         var myStyle = {
        //             "color": "#ff7800",
        //             "weight": 5,
        //             "opacity": 0.65
        //         };
        //         for (let i = 0; i < a.length; i++) {
        //             var site = L.geoJSON(JSON.parse(a[i].st_asgeojson), {
        //                 style: myStyle
        //             }).addTo(map);
        //             getMap(a[i].st_asgeojson)
        // table.on('search.dt', function () {
        //     let data = table.rows({ search: 'applied' }).data()
        // $("#siteCnt").text(a.length)
        // $("#numall").text(a.length)
        // $("#numagri").text(agri.length)
        // $("#numani").text(animal.length)
        // $("#numfisher").text(fish.length)
        $("#buysell").text(buysell.length)
        $("#keep").text(keep.length)
        $("#transform").text(trans.length)


    })

}
getScore()

function showTable(data) {
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
            },
            "emptyTable": "ไม่พบข้อมูล..."
        }
    });
    let table = $('#tab').DataTable({
        paging: false,
        language: {
            processing: true,
        },
        data: data,
        columns: [
            { data: 'intono' },
            { data: 'intoname' },
            { data: 'typeag' },
        ],
        select: true,
        pageLength: 8,
        responsive: {
            details: false
        },
    });
}
let ALL = () => {
    showALL(dataurl)
    $('#dash_dall').show()
    $('#detailchart').show()
}
showALL(dataurl)
function showALL(urldata) {
    axios.get(urldata).then((r) => {
        let datArr = [];
        let datval = [];
        let selDat = r.data.data

        //เกษตรกรรม
        let dataA = [];
        let dataA1 = [];
        let dataA2 = [];
        let dataA3 = [];
        let dataA4 = [];
        let dataA5 = [];

        let selDatA = r.data.data.filter(e => e.typeag === "เกษตรกรรม")
        let selDatA1 = selDatA.filter(r => r.t1types === "ข้าว")
        let selDatA2 = selDatA.filter(r => r.t1types === "พืชไร่")
        let selDatA3 = selDatA.filter(r => r.t1types === "ผัก")
        let selDatA4 = selDatA.filter(r => r.t1types === "ผลไม้")
        let selDatA5 = selDatA.filter(r => r.t1types === "สมุนไพร่")

        var t1 = selDatA.filter(e => e.t1types === "ข้าว");
        var t2 = selDatA.filter(e => e.t1types === "พืชไร่");
        var t3 = selDatA.filter(e => e.t1types === "ผัก");
        var t4 = selDatA.filter(e => e.t1types === "ผลไม้");
        var t5 = selDatA.filter(e => e.t1types === "สมุนไพร่");

        var v1 = t1.length
        var v2 = t2.length
        var v3 = t3.length
        var v4 = t4.length
        var v5 = t5.length

        selDatA1.map(e => {
            if (e.tcate !== null) {
                dataA1.push({ name: e.tcate, value: 5 })
            }
        })
        selDatA2.map(e => {
            if (e.tcate !== null) {
                dataA2.push({ name: e.tcate, value: 5 })
            }
        })
        selDatA3.map(e => {
            if (e.tcate !== null) {
                dataA3.push({ name: e.tcate, value: 5 })
            }
        })
        selDatA4.map(e => {
            if (e.tcate !== null) {
                dataA4.push({ name: e.tcate, value: 5 })
            }
        })
        selDatA5.map(e => {
            if (e.tcate !== null) {
                dataA5.push({ name: e.tcate, value: 5 })
            }
        })
        dataA = [
            { name: "ข้าว", value: dataA1.length },
            { name: "พืชไร่", value: dataA2.length },
            { name: "ผัก", value: dataA3.length },
            { name: "ผลไม้", value: dataA4.length },
            { name: "สมุนไพร", value: dataA5.length }
        ]

        //ปศุสัตว์
        let dataB = [];
        let dataB1 = [];
        let dataB2 = [];
        let dataB3 = [];
        let dataB4 = [];
        let dataB5 = [];
        let dataB6 = [];
        let selDatB = r.data.data.filter(e => e.typeag === "ปศุสัตว์" && e.tcate !== "" && e.tcate !== null)
        let selDatB1 = selDatB.filter(e => e.t2sel == "ไก่" && e.t2sel !== "" && e.t2sel !== null)
        let selDatB2 = selDatB.filter(e => e.t2sel == "เป็ด" && e.t2sel !== "" && e.t2sel !== null)
        let selDatB3 = selDatB.filter(e => e.t2sel == "หมู" && e.t2sel !== "" && e.t2sel !== null)
        let selDatB4 = selDatB.filter(e => e.t2sel == "วัว" && e.t2sel !== "" && e.t2sel !== null)
        let selDatB5 = selDatB.filter(e => e.t2sel == "ควาย" && e.t2sel !== "" && e.t2sel !== null)
        let selDatB6 = selDatB.filter(e => e.t2sel == "อื่นๆ" && e.t2sel !== "" && e.t2sel !== null)
        selDatB1.map(e => {
            dataB1.push({ name: e.tcate, value: 5 })
        });
        selDatB2.map(e => {
            dataB2.push({ name: e.tcate, value: 5 })
        });
        selDatB3.map(e => {
            dataB3.push({ name: e.tcate, value: 5 })
        });
        selDatB4.map(e => {
            dataB4.push({ name: e.tcate, value: 5 })
        });
        selDatB5.map(e => {
            dataB5.push({ name: e.tcate, value: 5 })
        });
        selDatB6.map(e => {
            dataB6.push({ name: e.tcate, value: 5 })
        });
        dataB = [
            { name: "ไก่", value: dataB1.length },
            { name: "เป็ด", value: dataB2.length },
            { name: "หมู", value: dataB3.length },
            { name: "วัว", value: dataB4.length },
            { name: "ควาย", value: dataB5.length },
            { name: "อื่นๆ", value: dataB6.length }

        ]

        //ประมง
        let dataC = [];
        let dataC1 = [];
        let dataC2 = [];
        let dataC3 = [];
        let selDatC = r.data.data.filter(e => e.typeag === "การประมง")
        let selDatC1 = selDatC.filter(e => e.tcate === "น้ำจืด" && r.tcate !== "" && r.tcate !== null)
        let selDatC2 = selDatC.filter(e => e.tcate === "น้ำเค็ม" && r.tcate !== "" && r.tcate !== null)
        let selDatC3 = selDatC.filter(e => e.tcate === "น้ำกร่อย" && r.tcate !== "" && r.tcate !== null)
        selDatC1.map(e => {
            if (e.t3f1na !== null && e.t3f2na !== null && e.t3f3na !== null && e.t3f4na !== null && e.t3f5na !== null) {
                dataC1.push({ name: e.t3f1na, value: 5 },
                    { name: e.t3f2na, value: 5 },
                    { name: e.t3f3na, value: 5 },
                    { name: e.t3f4na, value: 5 },
                    { name: e.t3f5na, value: 5 }
                )
            } else if (e.t3f1na !== null && e.t3f2na !== null && e.t3f3na !== null && e.t3f4na !== null && e.t3f5na == null) {
                dataC1.push({ name: e.t3f1na, value: 5 },
                    { name: e.t3f2na, value: 5 },
                    { name: e.t3f3na, value: 5 },
                    { name: e.t3f4na, value: 5 }
                )
            } else if (e.t3f1na !== null && e.t3f2na !== null && e.t3f3na !== null && e.t3f4na == null && e.t3f5na == null) {
                dataC1.push({ name: e.t3f1na, value: 5 },
                    { name: e.t3f2na, value: 5 },
                    { name: e.t3f3na, value: 5 }
                )
            } else if (e.t3f1na !== null && e.t3f2na !== null && e.t3f3na == null && e.t3f4na == null && e.t3f5na == null) {
                dataC1.push({ name: e.t3f1na, value: 5 },
                    { name: e.t3f2na, value: 5 }
                )
            } else if (e.t3f1na !== null && e.t3f2na == null && e.t3f3na == null && e.t3f4na == null && e.t3f5na == null) {
                dataC1.push({ name: e.t3f1na, value: 5 }
                )
            }
        })
        selDatC2.map(e => {
            if (e.t3f1na !== null && e.t3f2na !== null && e.t3f3na !== null && e.t3f4na !== null && e.t3f5na !== null) {
                dataC2.push({ name: e.t3f1na, value: 5 },
                    { name: e.t3f2na, value: 5 },
                    { name: e.t3f3na, value: 5 },
                    { name: e.t3f4na, value: 5 },
                    { name: e.t3f5na, value: 5 }
                )
            } else if (e.t3f1na !== null && e.t3f2na !== null && e.t3f3na !== null && e.t3f4na !== null && e.t3f5na == null) {
                dataC2.push({ name: e.t3f1na, value: 5 },
                    { name: e.t3f2na, value: 5 },
                    { name: e.t3f3na, value: 5 },
                    { name: e.t3f4na, value: 5 }
                )
            } else if (e.t3f1na !== null && e.t3f2na !== null && e.t3f3na !== null && e.t3f4na == null && e.t3f5na == null) {
                dataC2.push({ name: e.t3f1na, value: 5 },
                    { name: e.t3f2na, value: 5 },
                    { name: e.t3f3na, value: 5 }
                )
            } else if (e.t3f1na !== null && e.t3f2na !== null && e.t3f3na == null && e.t3f4na == null && e.t3f5na == null) {
                dataC2.push({ name: e.t3f1na, value: 5 },
                    { name: e.t3f2na, value: 5 }
                )
            } else if (e.t3f1na !== null && e.t3f2na == null && e.t3f3na == null && e.t3f4na == null && e.t3f5na == null) {
                dataC2.push({ name: e.t3f1na, value: 5 }
                )
            }
        })
        selDatC3.map(e => {
            if (e.t3f1na !== null && e.t3f2na !== null && e.t3f3na !== null && e.t3f4na !== null && e.t3f5na !== null) {
                dataC3.push({ name: e.t3f1na, value: 5 },
                    { name: e.t3f2na, value: 5 },
                    { name: e.t3f3na, value: 5 },
                    { name: e.t3f4na, value: 5 },
                    { name: e.t3f5na, value: 5 }
                )
            } else if (e.t3f1na !== null && e.t3f2na !== null && e.t3f3na !== null && e.t3f4na !== null && e.t3f5na == null) {
                dataC3.push({ name: e.t3f1na, value: 5 },
                    { name: e.t3f2na, value: 5 },
                    { name: e.t3f3na, value: 5 },
                    { name: e.t3f4na, value: 5 }
                )
            } else if (e.t3f1na !== null && e.t3f2na !== null && e.t3f3na !== null && e.t3f4na == null && e.t3f5na == null) {
                dataC3.push({ name: e.t3f1na, value: 5 },
                    { name: e.t3f2na, value: 5 },
                    { name: e.t3f3na, value: 5 }
                )
            } else if (e.t3f1na !== null && e.t3f2na !== null && e.t3f3na == null && e.t3f4na == null && e.t3f5na == null) {
                dataC3.push({ name: e.t3f1na, value: 5 },
                    { name: e.t3f2na, value: 5 }
                )
            } else if (e.t3f1na !== null && e.t3f2na == null && e.t3f3na == null && e.t3f4na == null && e.t3f5na == null) {
                dataC3.push({ name: e.t3f1na, value: 5 }
                )
            }
        })
        dataC = [
            { name: "น้ำจืด", value: dataC1.length },
            { name: "น้ำเค็ม", value: dataC2.length },
            { name: "น้ำกร่อย", value: dataC3.length }
        ]
        //////////////////
        datval = [
            {
                name: "เกษตรอินทรีย์",
                value: selDat.length,
                children: [
                    {
                        name: "การเพาะปลูก",
                        value: selDatA.length,
                        children: dataA
                    },
                    {
                        name: "ปศุสัตว์",
                        value: selDatB.length,
                        children: dataB
                    }, {
                        name: "การประมง",
                        value: selDatC.length,
                        children: dataC
                    }
                ]
            }]
        // console.log(datval)
        chartAll(datval)
        $("#legend").hide()

        var calculator1 = []
        selDat.map(i => {
            if (i.tarunit == "ไร่" || i.tarunit == null) {
                var a = i.tarea
                var b = a * 0.0016
                calculator1.push(b)
            } else if (i.tarunit == "งาน") {
                var a = i.tarea
                var b = a * 0.25 * 0.0016
                calculator1.push(b)
            } else if (i.tarunit == "ตารางวา") {
                var a = i.tarea
                var b = (a / 100) * 0.25 * 0.0016
                calculator1.push(b)
            } else if (i.tarunit == "ตารางเมตร") {
                var a = i.tarea
                var b = (a / 1000000)
                calculator1.push(b)
            } else if (i.tarunit == "ตารางกิโลเมตร") {
                var a = i.tarea
                calculator1.push(Number(a))
            }
        })
        let sum1 = 0;
        for (let i = 0; i < calculator1.length; i++) {
            sum1 += calculator1[i];
        }
        $("#numall").text(selDat.length)
        $('#numall_km2').text(sum1.toFixed(2))

        var calculator2 = []
        selDatA.map(i => {
            if (i.tarunit == "ไร่" || i.tarunit == null) {
                var a = i.tarea
                var b = a * 0.0016
                calculator2.push(b)
            } else if (i.tarunit == "งาน") {
                var a = i.tarea
                var b = a * 0.25 * 0.0016
                calculator2.push(b)
            } else if (i.tarunit == "ตารางวา") {
                var a = i.tarea
                var b = (a / 100) * 0.25 * 0.0016
                calculator2.push(b)
            } else if (i.tarunit == "ตารางเมตร") {
                var a = i.tarea
                var b = (a / 1000000)
                calculator2.push(b)
            } else if (i.tarunit == "ตารางกิโลเมตร") {
                var a = i.tarea
                calculator2.push(Number(a))
            }
        })
        let sum2 = 0;
        for (let i = 0; i < calculator2.length; i++) {
            sum2 += calculator2[i];
        }
        $("#numagri").text(selDatA.length)
        $("#numagri_km2").text(sum2.toFixed(2))


        var calculator3 = []
        selDatB.map(i => {
            if (i.tarunit == "ไร่" || i.tarunit == null) {
                var a = i.tarea
                var b = a * 0.0016
                calculator3.push(b)
            } else if (i.tarunit == "งาน") {
                var a = i.tarea
                var b = a * 0.25 * 0.0016
                calculator3.push(b)
            } else if (i.tarunit == "ตารางวา") {
                var a = i.tarea
                var b = (a / 100) * 0.25 * 0.0016
                calculator3.push(b)
            } else if (i.tarunit == "ตารางเมตร") {
                var a = i.tarea
                var b = (a / 1000000)
                calculator3.push(b)
            } else if (i.tarunit == "ตารางกิโลเมตร") {
                var a = i.tarea
                calculator3.push(Number(a))
            }
        })
        let sum3 = 0;
        for (let i = 0; i < calculator3.length; i++) {
            sum3 += calculator3[i];
        }
        $("#numani").text(selDatB.length)
        $("#numani_km2").text(sum3)

        var calculator4 = []
        selDatC.map(i => {
            if (i.tarunit == "ไร่" || i.tarunit == null) {
                var a = i.tarea
                var b = a * 0.0016
                calculator4.push(b)
            } else if (i.tarunit == "งาน") {
                var a = i.tarea
                var b = a * 0.25 * 0.0016
                calculator4.push(b)
            } else if (i.tarunit == "ตารางวา") {
                var a = i.tarea
                var b = (a / 100) * 0.25 * 0.0016
                calculator4.push(b)
            } else if (i.tarunit == "ตารางเมตร") {
                var a = i.tarea
                var b = (a / 1000000)
                calculator4.push(b)
            } else if (i.tarunit == "ตารางกิโลเมตร") {
                var a = i.tarea
                calculator4.push(Number(a))
            }
        })
        let sum4 = 0;
        for (let i = 0; i < calculator4.length; i++) {
            sum4 += calculator4[i];
        }
        $("#numfisher").text(selDatC.length)
        $("#numfisher_km2").text(sum4)

    })
}
chartAll = async (data, unti, title, chart) => {

    // function am4themes_myTheme(target) {
    //     if (target instanceof am4core.ColorSet) {
    //         target.list = [
    //             am4core.color("#7FC8A9"),
    //             am4core.color("#D5EEBB"),
    //             am4core.color("#5F7A61"),
    //             am4core.color("#093824"),
    //         ];
    //     }
    // }
    // am4core.useTheme(am4themes_myTheme)
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("chart", am4plugins_forceDirected.ForceDirectedTree);
    chart.legend = new am4charts.Legend();
    var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
    chart.data = data;
    chart.svgContainer.autoResize = false;


    networkSeries.dataFields.value = "value";
    networkSeries.dataFields.name = "name";
    networkSeries.dataFields.children = "children";
    networkSeries.nodes.template.tooltipText = "{name}:{value}";
    networkSeries.nodes.template.fillOpacity = 1;

    networkSeries.nodes.template.label.text = "{name}"
    networkSeries.fontSize = 10;

    networkSeries.links.template.strokeWidth = 1;

    var hoverState = networkSeries.links.template.states.create("hover");
    hoverState.properties.strokeWidth = 3;
    hoverState.properties.strokeOpacity = 1;

    networkSeries.nodes.template.events.on("over", function (event) {
        event.target.dataItem.childLinks.each(function (link) {
            link.isHover = true;
        })
        if (event.target.dataItem.parentLink) {
            event.target.dataItem.parentLink.isHover = true;
        }

    })

    networkSeries.nodes.template.events.on("out", function (event) {
        event.target.dataItem.childLinks.each(function (link) {
            link.isHover = false;
        })
        if (event.target.dataItem.parentLink) {
            event.target.dataItem.parentLink.isHover = false;
        }
    })

    networkSeries.nodes.template.events.on('ready', function (event) {
        var fontSize = Math.max(14, Math.min(20, Math.ceil(event.target.measuredWidth * .5)));
        // console.log(event.target.dataItem.dataContext.name, ' width: ', event.target.measuredWidth, '; fontSize: ', fontSize);
        event.target.fontSize = fontSize;
        networkSeries.dataFields.linkWith = "linkWith";
        networkSeries.dataFields.name = "name";
        networkSeries.dataFields.id = "name";
        networkSeries.dataFields.value = "value";
        networkSeries.dataFields.children = "children";

        networkSeries.links.template.strength = 1;
        networkSeries.nodes.template.tooltipText = "{name}";
        networkSeries.nodes.template.fillOpacity = 1;

        networkSeries.nodes.template.label.text = "{name}"
        networkSeries.fontSize = 8;
        networkSeries.minRadius = 15;
        networkSeries.maxLevels = 10;
        networkSeries.nodes.template.label.hideOversized = true;
        networkSeries.nodes.template.label.truncate = true;
    })
    networkSeries.nodes.template.togglable = false;
    chart.zoomable = true;
    networkSeries.nodes.template.events.on("hit", function (event) {
        if (event.target.isActive) {
            chart.zoomToDataItem(event.target.dataItem, 3, true)
        }
        else {
            chart.zoomOut();
        }

    })
    // Responsive
    chart.responsive.enabled = true;
    chart.responsive.rules.push({
        relevant: function (target) {
            if (target.pixelWidth <= 600) {
                return true;
            }
            return false;
        },
        state: function (target, stateId) {
            if (target instanceof am4charts.PieSeries) {
                var state = target.states.create(stateId);

                var labelState = target.labels.template.states.create(stateId);
                labelState.properties.disabled = true;

                var tickState = target.ticks.template.states.create(stateId);
                tickState.properties.disabled = true;
                return state;
            }

            return null;
        }
    })
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.align = "left";
    chart.exporting.menu.verticalAlign = "top";
    chart.exporting.adapter.add("data", function (data, target) {
        var data = [];
        chart.series.each(function (series) {
            for (var i = 0; i < series.data.length; i++) {
                series.data[i].name = series.name;
                data.push(series.data[i]);
            }
        });
        return { data: data };
    });
}

function showA() {
    $('#dash_dall').hide()
    $('#detailchart').hide()
    axios.get(dataurl).then((r) => {
        let dataA = [];
        let dataA1 = [];
        let dataA2 = [];
        let dataA3 = [];
        let dataA4 = [];
        let dataA5 = [];

        let selDatA = r.data.data.filter(e => e.typeag === "เกษตรกรรม")
        let selDatA1 = selDatA.filter(r => r.t1types === "ข้าว" && r.tcate !== "" && r.tcate !== null)
        let selDatA2 = selDatA.filter(r => r.t1types === "พืชไร่" && r.tcate !== "" && r.tcate !== null)
        let selDatA3 = selDatA.filter(r => r.t1types === "ผัก" && r.tcate !== "" && r.tcate !== null)
        let selDatA4 = selDatA.filter(r => r.t1types === "ผลไม้" && r.tcate !== "" && r.tcate !== null)
        let selDatA5 = selDatA.filter(r => r.t1types === "สมุนไพร่" && r.tcate !== "" && r.tcate !== null)

        // console.log(selDatA3)

        selDatA1.map(e => {
            dataA1.push({ name: e.tcate, value: 10 })
        })
        selDatA2.map(e => {
            dataA2.push({ name: e.tcate, value: 10 })
        })
        selDatA3.map(e => {
            dataA3.push({ name: e.tcate, value: 10 })
        })
        selDatA4.map(e => {
            dataA4.push({ name: e.tcate, value: 10 })
        })
        selDatA5.map(e => {
            dataA5.push({ name: e.tcate, value: 10 })
        })
        dataA = [
            { "country": "ข้าว", "litres": dataA1.length, "subData": dataA1 },
            { "country": "พืชไร่", "litres": dataA2.length, "subData": dataA2 },
            { "country": "ผัก", "litres": dataA3.length, "subData": dataA3 },
            { "country": "ผลไม้", "litres": dataA4.length, "subData": dataA4 },
            { "country": "สมุนไพร", "litres": dataA5.length, "subData": dataA5 }
        ]
        // console.log(dataA)
        ChartC(dataA);
    })
    $("#legend").show()
}
chartA = async (data, unti, title, chart) => {

    am4core.useTheme(am4themes_animated);

    var container = am4core.create("chart", am4core.Container);
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);
    container.layout = "horizontal";


    var chart = container.createChild(am4charts.PieChart);

    // Add data
    chart.data = [{
        "country": "Lithuania",
        "litres": 500,
        "subData": [{ name: "A", value: 200 }, { name: "B", value: 150 }, { name: "C", value: 100 }, { name: "D", value: 50 }]
    }, {
        "country": "Czech Republic",
        "litres": 300,
        "subData": [{ name: "A", value: 150 }, { name: "B", value: 100 }, { name: "C", value: 50 }]
    }, {
        "country": "Ireland",
        "litres": 200,
        "subData": [{ name: "A", value: 110 }, { name: "B", value: 60 }, { name: "C", value: 30 }]
    }, {
        "country": "Germany",
        "litres": 150,
        "subData": [{ name: "A", value: 80 }, { name: "B", value: 40 }, { name: "C", value: 30 }]
    }, {
        "country": "Australia",
        "litres": 140,
        "subData": [{ name: "A", value: 90 }, { name: "B", value: 40 }, { name: "C", value: 10 }]
    }, {
        "country": "Austria",
        "litres": 120,
        "subData": [{ name: "A", value: 60 }, { name: "B", value: 30 }, { name: "C", value: 30 }]
    }];

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.states.getKey("active").properties.shiftRadius = 0;
    //pieSeries.labels.template.text = "{category}\n{value.percent.formatNumber('#.#')}%";

    pieSeries.slices.template.events.on("hit", function (event) {
        selectSlice(event.target.dataItem);
    })

    var chart2 = container.createChild(am4charts.PieChart);
    chart2.width = am4core.percent(30);
    chart2.radius = am4core.percent(80);

    // Add and configure Series
    var pieSeries2 = chart2.series.push(new am4charts.PieSeries());
    pieSeries2.dataFields.value = "value";
    pieSeries2.dataFields.category = "name";
    pieSeries2.slices.template.states.getKey("active").properties.shiftRadius = 0;
    //pieSeries2.labels.template.radius = am4core.percent(50);
    //pieSeries2.labels.template.inside = true;
    //pieSeries2.labels.template.fill = am4core.color("#ffffff");
    pieSeries2.labels.template.disabled = true;
    pieSeries2.ticks.template.disabled = true;
    pieSeries2.alignLabels = false;
    pieSeries2.events.on("positionchanged", updateLines);

    var interfaceColors = new am4core.InterfaceColorSet();

    var line1 = container.createChild(am4core.Line);
    line1.strokeDasharray = "2,2";
    line1.strokeOpacity = 0.5;
    line1.stroke = interfaceColors.getFor("alternativeBackground");
    line1.isMeasured = false;

    var line2 = container.createChild(am4core.Line);
    line2.strokeDasharray = "2,2";
    line2.strokeOpacity = 0.5;
    line2.stroke = interfaceColors.getFor("alternativeBackground");
    line2.isMeasured = false;

    var selectedSlice;

    function selectSlice(dataItem) {

        selectedSlice = dataItem.slice;

        var fill = selectedSlice.fill;

        var count = dataItem.dataContext.subData.length;
        pieSeries2.colors.list = [];
        for (var i = 0; i < count; i++) {
            pieSeries2.colors.list.push(fill.brighten(i * 2 / count));
        }

        chart2.data = dataItem.dataContext.subData;
        pieSeries2.appear();

        var middleAngle = selectedSlice.middleAngle;
        var firstAngle = pieSeries.slices.getIndex(0).startAngle;
        var animation = pieSeries.animate([{ property: "startAngle", to: firstAngle - middleAngle }, { property: "endAngle", to: firstAngle - middleAngle + 360 }], 600, am4core.ease.sinOut);
        animation.events.on("animationprogress", updateLines);

        selectedSlice.events.on("transformed", updateLines);

        //  var animation = chart2.animate({property:"dx", from:-container.pixelWidth / 2, to:0}, 2000, am4core.ease.elasticOut)
        //  animation.events.on("animationprogress", updateLines)
    }


    function updateLines() {
        if (selectedSlice) {
            var p11 = { x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle), y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle) };
            var p12 = { x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle + selectedSlice.arc), y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle + selectedSlice.arc) };

            p11 = am4core.utils.spritePointToSvg(p11, selectedSlice);
            p12 = am4core.utils.spritePointToSvg(p12, selectedSlice);

            var p21 = { x: 0, y: -pieSeries2.pixelRadius };
            var p22 = { x: 0, y: pieSeries2.pixelRadius };

            p21 = am4core.utils.spritePointToSvg(p21, pieSeries2);
            p22 = am4core.utils.spritePointToSvg(p22, pieSeries2);

            line1.x1 = p11.x;
            line1.x2 = p21.x;
            line1.y1 = p11.y;
            line1.y2 = p21.y;

            line2.x1 = p12.x;
            line2.x2 = p22.x;
            line2.y1 = p12.y;
            line2.y2 = p22.y;
        }
    }

    chart.events.on("datavalidated", function () {
        setTimeout(function () {
            selectSlice(pieSeries.dataItems.getIndex(0));
        }, 1000);
    });
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.adapter.add("data", function (data, target) {
        var data = [];
        chart.series.each(function (series) {
            for (var i = 0; i < series.data.length; i++) {
                series.data[i].name = series.name;
                data.push(series.data[i]);
            }
        });
        return { data: data };
    });

    // end am4core.ready()
}

function showB() {
    $('#dash_dall').hide();
    $('#detailchart').hide();
    axios.get(dataurl).then((r) => {
        let dataB = [];
        let dataB1 = [];
        let dataB2 = [];
        let dataB3 = [];
        let dataB4 = [];
        let dataB5 = [];
        let dataB6 = [];
        let selDatB = r.data.data.filter(e => e.typeag === "ปศุสัตว์" && e.tcate !== "" && e.tcate !== null)
        let selDatB1 = selDatB.filter(e => e.t2sel == "ไก่" && e.t2sel !== "" && e.t2sel !== null)
        let selDatB2 = selDatB.filter(e => e.t2sel == "เป็ด" && e.t2sel !== "" && e.t2sel !== null)
        let selDatB3 = selDatB.filter(e => e.t2sel == "หมู" && e.t2sel !== "" && e.t2sel !== null)
        let selDatB4 = selDatB.filter(e => e.t2sel == "วัว" && e.t2sel !== "" && e.t2sel !== null)
        let selDatB5 = selDatB.filter(e => e.t2sel == "ควาย" && e.t2sel !== "" && e.t2sel !== null)
        let selDatB6 = selDatB.filter(e => e.t2sel == "อื่นๆ" && e.t2sel !== "" && e.t2sel !== null)
        selDatB1.map(e => {
            dataB1.push({ name: e.tcate, value: e.t2amount })
        });
        selDatB2.map(e => {
            dataB2.push({ name: e.tcate, value: e.t2amount })
        });
        selDatB3.map(e => {
            dataB3.push({ name: e.tcate, value: e.t2amount })
        });
        selDatB4.map(e => {
            dataB4.push({ name: e.tcate, value: e.t2amount })
        });
        selDatB5.map(e => {
            dataB5.push({ name: e.tcate, value: e.t2amount })
        });
        selDatB6.map(e => {
            dataB6.push({ name: e.tcate, value: e.t2amount })
        });
        dataB = [
            { "type_name": "ไก่", "value": dataB1.length, "color": "#B86466" },
            { "type_name": "เป็ด", "value": dataB2.length, "color": "#FDD18A" },
            { "type_name": "หมู", "value": dataB3.length, "color": "#FFDEF2" },
            { "type_name": "วัว", "value": dataB4.length, "color": "#E8B1A6" },
            { "type_name": "ควาย", "value": dataB5.length, "color": "#B6BC84" },
            { "type_name": "อื่นๆ", "value": dataB6.length, "color": "#A699AA" }

        ]
        ChartB(dataB);
        // ChartC(datArr2);
        $("#legend").show()
        // ChartB(datArr2)
    })
}
ChartB = async (data, unti, title, chart) => {
    am4core.ready(function () {
        am4core.useTheme(am4themes_animated);
        var chart = am4core.create("chart", am4charts.PieChart);
        chart.legend = new am4charts.Legend();
        chart.data = data
        // chart.data =
        //     [{
        //         "type_name": "Lithuania",
        //         "value": 501.9,
        //         "color": "#B86466"
        //     }, {
        //         "type_name": "Czechia",
        //         "value": 301.9,
        //         "color": "#FDD18A"
        //     }, {
        //         "type_name": "Ireland",
        //         "value": 201.1,
        //         "color": "#FFDEF2"
        //     }, {
        //         "type_name": "Germany",
        //         "value": 165.8,
        //         "color": "#E8B1A6"
        //     }, {
        //         "type_name": "Australia",
        //         "value": 139.9,
        //         "color": "#B6BC84"
        //     }, {
        //         "type_name": "Austria",
        //         "value": 128.3,
        //         "color": "#A699AA"
        //     }];

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "type_name";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;
        pieSeries.slices.template.propertyFields.fill = "color";

        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;

        // chart.exporting.menu = new am4core.ExportMenu();
        // chart.exporting.adapter.add("data", function (data, target) {
        //     var data = [];
        //     chart.series.each(function (series) {
        //         for (var i = 0; i < series.data.length; i++) {
        //             series.data[i].name = series.name;
        //             data.push(series.data[i]);
        //         }
        //     });
        //     return { data: data };
        // });
        // pieSeries.labels.template.disabled = true;
        // pieSeries.ticks.template.disabled = true;

        pieSeries.ticks.template.disabled = true;
        pieSeries.alignLabels = false;
        pieSeries.labels.template.text = "{category}: {value.percent.formatNumber('#.')}%";
        pieSeries.labels.template.radius = am4core.percent(-40);
        pieSeries.labels.template.fill = am4core.color("white");

        pieSeries.labels.template.adapter.add("radius", function (radius, target) {
            if (target.dataItem && (target.dataItem.values.value.percent < 10)) {
                return 0;
            }
            return radius;
        });

        pieSeries.labels.template.adapter.add("fill", function (color, target) {
            if (target.dataItem && (target.dataItem.values.value.percent < 10)) {
                return am4core.color("#000");
            }
            return color;
        });
        pieSeries.labels.template.adapter.add("textOutput", function (text, target) {
            // Hide labels with 0 value
            if (target.dataItem && target.dataItem.values.value.percent == 0) {
                return "";
            }
            return text;
        });

        var legendContainer = am4core.create("legend", am4core.Container);
        legendContainer.width = am4core.percent(100);
        legendContainer.height = am4core.percent(100);
        chart.legend.parent = legendContainer;

        chart.events.on("datavalidated", resizeLegend);
        chart.events.on("maxsizechanged", resizeLegend);

        function resizeLegend(ev) {
            document.getElementById("legend").style.height = chart.legend.contentHeight + "px";
        }
        chart.legend.scrollable = true;
        // Responsive
        chart.responsive.enabled = true;
        chart.responsive.rules.push({
            relevant: function (target) {
                if (target.pixelWidth <= 600) {
                    return true;
                }
                return false;
            },
            state: function (target, stateId) {
                if (target instanceof am4charts.PieSeries) {
                    var state = target.states.create(stateId);

                    var labelState = target.labels.template.states.create(stateId);
                    labelState.properties.disabled = true;

                    var tickState = target.ticks.template.states.create(stateId);
                    tickState.properties.disabled = true;
                    return state;
                }

                return null;
            }
        });
        chart.exporting.menu = new am4core.ExportMenu();
        chart.exporting.adapter.add("data", function (data, target) {
            var data = [];
            chart.series.each(function (series) {
                for (var i = 0; i < series.data.length; i++) {
                    series.data[i].name = series.name;
                    data.push(series.data[i]);
                }
            });
            return { data: data };
        });
        var indicator;
        function showIndicator() {
            if (indicator) {
                indicator.show();
            }
            else {
                indicator = chart.tooltipContainer.createChild(am4core.Container);
                indicator.background.fill = am4core.color("#fff");
                indicator.background.fillOpacity = 0.8;
                indicator.width = am4core.percent(100);
                indicator.height = am4core.percent(100);

                var indicatorLabel = indicator.createChild(am4core.Label);
                indicatorLabel.text = "ไม่พบข้อมูล...";
                indicatorLabel.align = "center";
                indicatorLabel.valign = "middle";
                indicatorLabel.fontSize = 20;
            }
        }

        chart.events.on("beforedatavalidated", function (ev) {
            // console.log(ev.target.data)
            let d = ev.target.data;
            let T1 = d[0].value;
            let T2 = d[1].value;
            let T3 = d[2].value;
            let T4 = d[3].value;
            let T5 = d[4].value;
            let T6 = d[5].value;
            if (T1 == 0 && T2 == 0 && T3 == 0 && T4 == 0 && T5 == 0 && T6 == 0) {
                showIndicator();

            }
        });
    });
}

function showC() {
    $('#dash_dall').hide();
    $('#detailchart').hide();
    axios.get(dataurl).then((r) => {
        let dataC = [];
        let dataC1 = [];
        let dataC2 = [];
        let dataC3 = [];

        let selDatC = r.data.data.filter(e => e.typeag === "การประมง")
        let selDatC1 = selDatC.filter(e => e.tcate === "น้ำจืด" && r.tcate !== "" && r.tcate !== null)
        let selDatC2 = selDatC.filter(e => e.tcate === "น้ำเค็ม" && r.tcate !== "" && r.tcate !== null)
        let selDatC3 = selDatC.filter(e => e.tcate === "น้ำกร่อย" && r.tcate !== "" && r.tcate !== null)

        selDatC1.map(e => {
            if (e.t3f1na !== null && e.t3f2na !== null && e.t3f3na !== null && e.t3f4na !== null && e.t3f5na !== null) {
                dataC1.push({ name: e.t3f1na, value: e.t3f1num },
                    { name: e.t3f2na, value: e.t3f2num },
                    { name: e.t3f3na, value: e.t3f3num },
                    { name: e.t3f4na, value: e.t3f4num },
                    { name: e.t3f5na, value: e.t3f5num }
                )
            } else if (e.t3f1na !== null && e.t3f2na !== null && e.t3f3na !== null && e.t3f4na !== null && e.t3f5na == null) {
                dataC1.push({ name: e.t3f1na, value: e.t3f1num },
                    { name: e.t3f2na, value: e.t3f2num },
                    { name: e.t3f3na, value: e.t3f3num },
                    { name: e.t3f4na, value: e.t3f4num }
                )
            } else if (e.t3f1na !== null && e.t3f2na !== null && e.t3f3na !== null && e.t3f4na == null && e.t3f5na == null) {
                dataC1.push({ name: e.t3f1na, value: e.t3f1num },
                    { name: e.t3f2na, value: e.t3f2num },
                    { name: e.t3f3na, value: e.t3f3num }
                )
            } else if (e.t3f1na !== null && e.t3f2na !== null && e.t3f3na == null && e.t3f4na == null && e.t3f5na == null) {
                dataC1.push({ name: e.t3f1na, value: e.t3f1num },
                    { name: e.t3f2na, value: e.t3f2num }
                )
            } else if (e.t3f1na !== null && e.t3f2na == null && e.t3f3na == null && e.t3f4na == null && e.t3f5na == null) {
                dataC1.push({ name: e.t3f1na, value: e.t3f1num }
                )
            }
        })
        selDatC2.map(e => {
            if (e.t3f1na !== null && e.t3f2na !== null && e.t3f3na !== null && e.t3f4na !== null && e.t3f5na !== null) {
                dataC2.push({ name: e.t3f1na, value: e.t3f1num },
                    { name: e.t3f2na, value: e.t3f2num },
                    { name: e.t3f3na, value: e.t3f3num },
                    { name: e.t3f4na, value: e.t3f4num },
                    { name: e.t3f5na, value: e.t3f5num }
                )
            } else if (e.t3f1na !== null && e.t3f2na !== null && e.t3f3na !== null && e.t3f4na !== null && e.t3f5na == null) {
                dataC2.push({ name: e.t3f1na, value: e.t3f1num },
                    { name: e.t3f2na, value: e.t3f2num },
                    { name: e.t3f3na, value: e.t3f3num },
                    { name: e.t3f4na, value: e.t3f4num }
                )
            } else if (e.t3f1na !== null && e.t3f2na !== null && e.t3f3na !== null && e.t3f4na == null && e.t3f5na == null) {
                dataC2.push({ name: e.t3f1na, value: e.t3f1num },
                    { name: e.t3f2na, value: e.t3f2num },
                    { name: e.t3f3na, value: e.t3f3num }
                )
            } else if (e.t3f1na !== null && e.t3f2na !== null && e.t3f3na == null && e.t3f4na == null && e.t3f5na == null) {
                dataC2.push({ name: e.t3f1na, value: e.t3f1num },
                    { name: e.t3f2na, value: e.t3f2num }
                )
            } else if (e.t3f1na !== null && e.t3f2na == null && e.t3f3na == null && e.t3f4na == null && e.t3f5na == null) {
                dataC2.push({ name: e.t3f1na, value: e.t3f1num }
                )
            }
        })
        selDatC3.map(e => {
            if (e.t3f1na !== null && e.t3f2na !== null && e.t3f3na !== null && e.t3f4na !== null && e.t3f5na !== null) {
                dataC3.push({ name: e.t3f1na, value: e.t3f1num },
                    { name: e.t3f2na, value: e.t3f2num },
                    { name: e.t3f3na, value: e.t3f3num },
                    { name: e.t3f4na, value: e.t3f4num },
                    { name: e.t3f5na, value: e.t3f5num }
                )
            } else if (e.t3f1na !== null && e.t3f2na !== null && e.t3f3na !== null && e.t3f4na !== null && e.t3f5na == null) {
                dataC3.push({ name: e.t3f1na, value: e.t3f1num },
                    { name: e.t3f2na, value: e.t3f2num },
                    { name: e.t3f3na, value: e.t3f3num },
                    { name: e.t3f4na, value: e.t3f4num }
                )
            } else if (e.t3f1na !== null && e.t3f2na !== null && e.t3f3na !== null && e.t3f4na == null && e.t3f5na == null) {
                dataC3.push({ name: e.t3f1na, value: e.t3f1num },
                    { name: e.t3f2na, value: e.t3f2num },
                    { name: e.t3f3na, value: e.t3f3num }
                )
            } else if (e.t3f1na !== null && e.t3f2na !== null && e.t3f3na == null && e.t3f4na == null && e.t3f5na == null) {
                dataC3.push({ name: e.t3f1na, value: e.t3f1num },
                    { name: e.t3f2na, value: e.t3f2num }
                )
            } else if (e.t3f1na !== null && e.t3f2na == null && e.t3f3na == null && e.t3f4na == null && e.t3f5na == null) {
                dataC3.push({ name: e.t3f1na, value: e.t3f1num }
                )
            }
        })
        dataC = [
            { "country": "น้ำจืด", "litres": dataC1.length, "subData": dataC1, },
            { "country": "น้ำเค็ม", "litres": dataC2.length, "subData": dataC2 },
            { "country": "น้ำกร่อย", "litres": dataC3.length, "subData": dataC3 }
        ]
        ChartC(dataC)
    })
}
ChartC = async (data, unti, title, chart) => {
    am4core.ready(function () {
        am4core.useTheme(am4themes_animated);
        var container = am4core.create("chart", am4core.Container);
        container.width = am4core.percent(100);
        container.height = am4core.percent(100);
        container.layout = "horizontal";
        var chart = container.createChild(am4charts.PieChart);
        chart.data = data
        // [{
        //     "country": "Lithuania",
        //     "litres": 500,
        //     "subData": [{ name: "A", value: 200 }, { name: "B", value: 150 }, { name: "C", value: 100 }, { name: "D", value: 50 }]
        // }, {
        //     "country": "Czech Republic",
        //     "litres": 300,
        //     "subData": [{ name: "A", value: 150 }, { name: "B", value: 100 }, { name: "C", value: 50 }]
        // }, {
        //     "country": "Ireland",
        //     "litres": 200,
        //     "subData": [{ name: "A", value: 110 }, { name: "B", value: 60 }, { name: "C", value: 30 }]
        // }, {
        //     "country": "Germany",
        //     "litres": 150,
        //     "subData": [{ name: "A", value: 80 }, { name: "B", value: 40 }, { name: "C", value: 30 }]
        // }, {
        //     "country": "Australia",
        //     "litres": 140,
        //     "subData": [{ name: "A", value: 90 }, { name: "B", value: 40 }, { name: "C", value: 10 }]
        // }, {
        //     "country": "Austria",
        //     "litres": 120,
        //     "subData": [{ name: "A", value: 60 }, { name: "B", value: 30 }, { name: "C", value: 30 }]
        // }];

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";
        pieSeries.slices.template.states.getKey("active").properties.shiftRadius = 0;
        // pieSeries.slices.template.propertyFields.fill = "color";
        //pieSeries.labels.template.text = "{category}\n{value.percent.formatNumber('#.#')}%";

        pieSeries.slices.template.events.on("hit", function (event) {
            selectSlice(event.target.dataItem);
        })

        pieSeries.ticks.template.disabled = true;
        pieSeries.alignLabels = false;
        pieSeries.labels.template.text = "{category}: {value.percent.formatNumber('#.')}%";
        pieSeries.labels.template.radius = am4core.percent(-40);
        pieSeries.labels.template.fill = am4core.color("white");

        pieSeries.labels.template.adapter.add("radius", function (radius, target) {
            if (target.dataItem && (target.dataItem.values.value.percent < 10)) {
                return 0;
            }
            return radius;
        });

        pieSeries.labels.template.adapter.add("fill", function (color, target) {
            if (target.dataItem && (target.dataItem.values.value.percent < 10)) {
                return am4core.color("#000");
            }
            return color;
        });
        pieSeries.labels.template.adapter.add("textOutput", function (text, target) {
            // Hide labels with 0 value
            if (target.dataItem && target.dataItem.values.value.percent == 0) {
                return "";
            }
            return text;
        });

        var chart2 = container.createChild(am4charts.PieChart);
        chart2.width = am4core.percent(30);
        chart2.radius = am4core.percent(80);

        // Add and configure Series
        var pieSeries2 = chart2.series.push(new am4charts.PieSeries());
        pieSeries2.dataFields.value = "value";
        pieSeries2.dataFields.category = "name";
        pieSeries2.slices.template.states.getKey("active").properties.shiftRadius = 0;
        //pieSeries2.labels.template.radius = am4core.percent(50);
        //pieSeries2.labels.template.inside = true;
        //pieSeries2.labels.template.fill = am4core.color("#ffffff");
        // pieSeries2.labels.template.disabled = true;
        // pieSeries2.ticks.template.disabled = true;
        // pieSeries2.alignLabels = false;
        pieSeries2.events.on("positionchanged", updateLines);

        pieSeries2.ticks.template.disabled = true;
        pieSeries2.alignLabels = false;
        pieSeries2.labels.template.text = "{category}: {value.percent.formatNumber('#.')}%";
        pieSeries2.labels.template.radius = am4core.percent(-40);
        pieSeries2.labels.template.fill = am4core.color("white");

        pieSeries2.labels.template.adapter.add("radius", function (radius, target) {
            if (target.dataItem && (target.dataItem.values.value.percent < 10)) {
                return 0;
            }
            return radius;
        });

        pieSeries2.labels.template.adapter.add("fill", function (color, target) {
            if (target.dataItem && (target.dataItem.values.value.percent < 10)) {
                return am4core.color("#000");
            }
            return color;
        });

        pieSeries2.labels.template.adapter.add("textOutput", function (text, target) {
            // Hide labels with 0 value
            if (target.dataItem && target.dataItem.values.value.percent == 0) {
                return "";
            }
            return text;
        });

        var interfaceColors = new am4core.InterfaceColorSet();

        var line1 = container.createChild(am4core.Line);
        line1.strokeDasharray = "2,2";
        line1.strokeOpacity = 0.5;
        line1.stroke = interfaceColors.getFor("alternativeBackground");
        line1.isMeasured = false;

        var line2 = container.createChild(am4core.Line);
        line2.strokeDasharray = "2,2";
        line2.strokeOpacity = 0.5;
        line2.stroke = interfaceColors.getFor("alternativeBackground");
        line2.isMeasured = false;

        var selectedSlice;

        function selectSlice(dataItem) {

            selectedSlice = dataItem.slice;

            var fill = selectedSlice.fill;

            var count = dataItem.dataContext.subData.length;
            pieSeries2.colors.list = [];
            for (var i = 0; i < count; i++) {
                pieSeries2.colors.list.push(fill.brighten(i * 2 / count));
            }

            chart2.data = dataItem.dataContext.subData;
            pieSeries2.appear();

            var middleAngle = selectedSlice.middleAngle;
            var firstAngle = pieSeries.slices.getIndex(0).startAngle;
            var animation = pieSeries.animate([{ property: "startAngle", to: firstAngle - middleAngle }, { property: "endAngle", to: firstAngle - middleAngle + 360 }], 600, am4core.ease.sinOut);
            animation.events.on("animationprogress", updateLines);

            selectedSlice.events.on("transformed", updateLines);

            //  var animation = chart2.animate({property:"dx", from:-container.pixelWidth / 2, to:0}, 2000, am4core.ease.elasticOut)
            //  animation.events.on("animationprogress", updateLines)
        }

        function updateLines() {
            if (selectedSlice) {
                var p11 = { x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle), y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle) };
                var p12 = { x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle + selectedSlice.arc), y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle + selectedSlice.arc) };

                p11 = am4core.utils.spritePointToSvg(p11, selectedSlice);
                p12 = am4core.utils.spritePointToSvg(p12, selectedSlice);

                var p21 = { x: 0, y: -pieSeries2.pixelRadius };
                var p22 = { x: 0, y: pieSeries2.pixelRadius };

                p21 = am4core.utils.spritePointToSvg(p21, pieSeries2);
                p22 = am4core.utils.spritePointToSvg(p22, pieSeries2);

                line1.x1 = p11.x;
                line1.x2 = p21.x;
                line1.y1 = p11.y;
                line1.y2 = p21.y;

                line2.x1 = p12.x;
                line2.x2 = p22.x;
                line2.y1 = p12.y;
                line2.y2 = p22.y;
            }
        }

        chart.events.on("datavalidated", function () {
            setTimeout(function () {
                selectSlice(pieSeries.dataItems.getIndex(0));
            }, 1000);
        });

        chart.legend = new am4charts.Legend();
        // var legendContainer = am4core.create("legend", am4core.Container);
        // legendContainer.width = am4core.percent(100);
        // legendContainer.height = am4core.percent(100);
        // chart.legend.parent = legendContainer;

        var legendContainer = am4core.create("legend", am4core.Container);
        legendContainer.width = am4core.percent(100);
        legendContainer.height = am4core.percent(100);
        chart.legend.parent = legendContainer;

        chart.events.on("datavalidated", resizeLegend);
        chart.events.on("maxsizechanged", resizeLegend);

        function resizeLegend(ev) {
            document.getElementById("legend").style.height = chart.legend.contentHeight + "px";
        }
        chart.legend.scrollable = true;
        chart.legend.valueLabels.template.textAlign = "start";
        // Responsive
        chart.responsive.enabled = true;
        chart.responsive.rules.push({
            relevant: function (target) {
                if (target.pixelWidth <= 600) {
                    return true;
                }
                return false;
            },
            state: function (target, stateId) {
                if (target instanceof am4charts.PieSeries) {
                    var state = target.states.create(stateId);

                    var labelState = target.labels.template.states.create(stateId);
                    labelState.properties.disabled = true;

                    var tickState = target.ticks.template.states.create(stateId);
                    tickState.properties.disabled = true;
                    return state;
                }

                return null;
            }
        })
        chart.exporting.menu = new am4core.ExportMenu();
        chart.exporting.adapter.add("data", function (data, target) {
            var data = [];
            chart.series.each(function (series) {
                for (var i = 0; i < series.data.length; i++) {
                    series.data[i].name = series.name;
                    data.push(series.data[i]);
                }
            });
            return { data: data };
        });
        var indicator;
        function showIndicator() {
            if (indicator) {
                indicator.show();
            }
            else {
                indicator = chart.tooltipContainer.createChild(am4core.Container);
                indicator.background.fill = am4core.color("#fff");
                indicator.background.fillOpacity = 0.8;
                indicator.width = am4core.percent(100);
                indicator.height = am4core.percent(100);

                var indicatorLabel = indicator.createChild(am4core.Label);
                indicatorLabel.text = "ไม่พบข้อมูล...";
                indicatorLabel.align = "center";
                indicatorLabel.valign = "middle";
                indicatorLabel.fontSize = 20;
            }
        }

        chart.events.on("beforedatavalidated", function (ev) {
            // console.log(ev.target.data)
            let d = ev.target.data;
            let T0 = d[0].country;
            let T1 = d[0].litres;
            let T2 = d[1].litres;
            let T3 = d[2].litres;
            if (T0 == 'ข้าว') {
                let T4 = d[3].litres;
                let T5 = d[4].litres;
                if (T1 == 0 && T2 == 0 && T3 == 0 && T4 == 0 && T5 == 0) {
                    showIndicator();
                }
            }
            else if (T0 == 'น้ำจืด') {
                if (T1 == 0 && T2 == 0 && T3 == 0) {
                    showIndicator();
                }
            }
            else if (T0 == 'ซื้อขาย') {
                if (T1 == 0 && T2 == 0 && T3 == 0) {
                    showIndicator();
                }
            }
        });

    }); // end am4core.ready()
}

function showD() {
    $('#dash_dall').hide();
    $('#detailchart').hide();
    axios.get(dataurl).then((r) => {
        let datArr = [];
        let datArr2 = [];
        let datArr3 = [];

        let datt1 = [];
        let datt2 = [];
        let datt3 = [];
        // let datval = [];
        let selDatu1 = r.data.data.filter(e => e.use1 !== "" && e.use1 !== null)
        let selDatu2 = r.data.data.filter(e => e.use2 !== "" && e.use2 !== null)
        let selDatu3 = r.data.data.filter(e => e.use3 !== "" && e.use3 !== null)

        selDatu1.map(e => {
            if (e.typeag === "เกษตรกรรม" || e.typeag == "ปศุสัตว์" || e.typeag === "การประมง") {
                datArr.push({
                    name: e.typeag
                })
            }

        })
        let a11 = datArr.filter(e => e.name == "เกษตรกรรม")
        datt1.push({ name: "เกษตรกรรม", value: a11.length })
        let a12 = datArr.filter(e => e.name == "ปศุสัตว์")
        datt1.push({ name: "ปศุสัตว์", value: a12.length })
        let a13 = datArr.filter(e => e.name == "การประมง")
        datt1.push({ name: "การประมง", value: a13.length })

        selDatu2.map(e => {
            if (e.typeag === "เกษตรกรรม" || e.typeag == "ปศุสัตว์" || e.typeag === "การประมง") {
                var a = length;
                datArr2.push({
                    name: e.typeag
                })
            }

        })
        let a21 = datArr2.filter(e => e.name == "เกษตรกรรม")
        datt2.push({ name: "เกษตรกรรม", value: a21.length })
        let a22 = datArr2.filter(e => e.name == "ปศุสัตว์")
        datt2.push({ name: "ปศุสัตว์", value: a22.length })
        let a23 = datArr2.filter(e => e.name == "การประมง")
        datt2.push({ name: "การประมง", value: a23.length })


        selDatu3.map(e => {
            if (e.typeag === "เกษตรกรรม" || e.typeag == "ปศุสัตว์" || e.typeag === "การประมง") {
                datArr3.push({
                    name: e.typeag
                })
            }
        })
        let a31 = datArr3.filter(e => e.name == "เกษตรกรรม")
        datt3.push({ name: "เกษตรกรรม", value: a31.length })
        let a32 = datArr3.filter(e => e.name == "ปศุสัตว์")
        datt3.push({ name: "ปศุสัตว์", value: a32.length })
        let a33 = datArr3.filter(e => e.name == "การประมง")
        datt3.push({ name: "การประมง", value: a33.length })

        // console.log(datt3)
        let dataD = [
            { "country": "ซื้อขาย", "litres": datArr.length, "subData": datt1 },
            { "country": "กักเก็บ", "litres": datArr2.length, "subData": datt2 },
            { "country": "แปรรูป", "litres": datArr3.length, "subData": datt3 }
        ]
        ChartC(dataD)
        // console.log(selDatu1)
        // console.log(selDatu2)
        // console.log(selDatu3)
        // let selDat2 = selDat.filter(e => e.t2sel !== "" && e.t2sel !== null)
        // // console.log(selDat)

        // selDat2.map(e => {
        //     datArr.push({
        //         "type_name": e.t2sel,
        //         "value": e.t2amount
        //     })
        // });
        // // })
        // ChartB(datArr);
        // // ChartC(datArr2);
        // $("#legend").show()
        // ChartB(datArr2)
    })

}
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

let setReport = () => {
    // sessionStorage.setItem('ws_id', e);
    sessionStorage.setItem('organic_from_admin', 'yes');
    location.href = "./../update/index.html";
}

let setAdd = () => {
    // sessionStorage.setItem('ws_id', e);
    sessionStorage.setItem('organic_from_admin', 'yes');
    location.href = "./../add/index.html";
}