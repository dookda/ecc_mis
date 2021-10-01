let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
$("#usrname").text(urname);
// urid ? null : location.href = "./../../form_register/login/index.html";

// if (eecauth !== "admin" && eecauth !== "user") {
//     location.href = "./../../form_register/login/index.html";
// }

const url = "https://eec-onep.online:3700";
// const url = 'http://localhost:3000';
let dataurl
if (eecauth == "admin") {
    dataurl = url + "/form_ap/get_geom";
    $('#login').hide()
} else if (eecauth == "user" || eecauth == "office") {
    dataurl = url + "/form_ap/get_geom/" + urid;
    $('#cardselect').hide()
    $('#login').hide()

} else {
    dataurl = url + "/form_ap/get_geom";
    $('#cardtable').hide()
    $('#usr1').hide()
    $('#usr2').hide()
}
$("#pro").on("change", function () {
    getPro(this.value)
    seclectdata(eecauth, "prov", this.value)
    zoomSec("pro", this.value)
});
$("#amp").on("change", function () {
    getAmp(this.value)
    seclectdata(eecauth, "amp", this.value)
    zoomSec("amp", this.value)
});
$("#tam").on("change", function () {
    getTam(this.value)
    seclectdata(eecauth, "tam", this.value)
    zoomSec("tam", this.value)
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
    } else if (procode == 21) {
        prov_name = "ระยอง"
    } else if (procode == 24) {
        prov_name = "ฉะเชิงเทรา"
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
    })
}
let getTam = (tamcode) => {
    axios.get(url + `/eec-api/get-tam/${amp_code}`).then(r => {
        let data = r.data.data.filter(e => e.tambon_idn == tamcode)
        tam_name = data[0].tam_namt
        tam_code = tamcode
    })
}
let seclectdata = (auth, type, code) => {
    if (auth !== "user") {
        if (type == "prov" && code !== "eec") {
            dataurl = url + '/form_ap/getgeom/pro/' + code;
            table.ajax.url(dataurl).load();
        } else if (type == "prov" && code == 'eec') {
            dataurl = url + "/form_ap/get_geom";
            table.ajax.url(dataurl).load();
        }
        else if (type == "amp") {
            dataurl = url + '/form_ap/getgeom/amp/' + code
            table.ajax.url(dataurl).load();
        } else if (type == "tam") {
            dataurl = url + '/form_ap/getgeom/tam/' + code
            table.ajax.url(dataurl).load();
        }
    }
}
let zoomSec = (lyr, code) => {
    axios.get(url + `/eec-api/get-extent/${lyr}/${code}`).then(r => {
        let geom = JSON.parse(r.data.data[0].geom)
        // console.log(geom);
        map.fitBounds([
            geom.coordinates[0][0],
            geom.coordinates[0][2],
        ]);
    })
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
            { data: 'dattime' },
            { data: 'tambon' },
            { data: 'amphoe' },
            { data: 'province' },
            {
                data: 'feeling',
                render: function (data, type, row) {
                    var a = data;
                    if (a == 'ดีมาก') {
                        return '<img src="./img/F01.png" class="center h" height="30px">';
                    } else if (a == 'ดี') {
                        return '<img src="./img/F02.png" class="center h" height="30px">';
                    } else if (a == 'ปานกลาง') {
                        return '<img src="./img/F03.png" class="center h"height="30px">';
                    } else if (a == 'แย่') {
                        return '<img src="./img/F04.png" class="center h"height="30px">';
                    } else if (a == 'แย่มาก') {
                        return '<img src="./img/F05.png" class="center h"height="30px">';
                    } else {
                        return '<img src="./img/F06.png" class="center h"height="30px">';
                        // return data;
                    }

                }
            },
            { data: 'aqi' },
            { data: 'pm25' },
            { data: 'pm10' },
            { data: 'staair' },
            {
                // targets: -1,
                data: null,
                defaultContent: `<button type="button" class="btn btn-success" id="getMap">ขยายแผนที่</button>
                                 <button type="button" class="btn btn-danger" id="delete">ลบ!</button>`
            }
        ],
        columnDefs: [
            { className: 'text-center', targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
        ],
        dom: 'Bfrtip',
        buttons: [
            'excel', 'print'
        ],
        searching: true,
        scrollX: true
        // pageLength: 5
    });

    table.on('search.dt', function () {
        let data = table.rows({ search: 'applied' }).data()
        $("#siteCnt").text(data.length)
        getMap(data)
        // console.log();
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
        confirmDelete(data.repor_date, data.dattime, data.id_date)
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
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const amp = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
    layers: "eec:a__02_amphoe_eec",
    format: "image/png",
    transparent: true,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const pro = L.tileLayer.wms("https://eec-onep.online:8443/geoserver/eec/wms?", {
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
const lyrControl = L.control.layers(baseMap, overlayMap).addTo(map);

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
        div.innerHTML += '<i style="background: #FFFFFF; border-style: solid; border-width: 1.5px;"></i><span>ขอบเขตอำเภอ</span><br>';
        div.innerHTML += '<i style="background: #FFFFFF; border-style: dotted; border-width: 1.5px;"></i><span>ขอบเขตตำบล</span><br>';
        div.innerHTML += '<img src="./marker/location-pin-blue.svg" width="25px"><span>ตำแหน่งนำเข้าข้อมูล</span><br>';
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
    // x.map(i => {
    //     if (i.st_asgeojson) {
    //         // console.log(i.geojson);
    //         let geojson = L.geoJSON(JSON.parse(i.st_asgeojson), {
    //             style: style,
    //             name: "st_asgeojson",
    //             onEachFeature: function (feature, layer) {
    //                 drawnItems.addLayer(layer);
    //             }
    //         })
    //         geojson.addTo(map);
    //     }
    // })
    x.map(i => {
        let dat = {
            aqi: i.aqi,
            pm10: i.pm10,
            pm25: i.pm25,
            so2: i.so2
        }
        let marker
        if (i.feeling == "ดีมาก") {
            marker = L.marker([Number(i.lat), Number(i.lng)], {
                icon: iconblue,
                name: 'lyr',
                data: dat
            });
        } else if (i.feeling == "ดี") {
            marker = L.marker([Number(i.lat), Number(i.lng)], {
                icon: icongreen,
                name: 'lyr',
                data: dat
            });
        } else if (i.feeling == "ปานกลาง") {
            marker = L.marker([Number(i.lat), Number(i.lng)], {
                icon: iconyellow,
                name: 'lyr',
                data: dat
            });
        } else if (i.feeling == "แย่") {
            marker = L.marker([Number(i.lat), Number(i.lng)], {
                icon: iconorange,
                name: 'lyr',
                data: dat
            });
        } else {
            marker = L.marker([Number(i.lat), Number(i.lng)], {
                icon: iconred,
                name: 'lyr',
                data: dat
            });
        }
        if (i.img) {
            marker
                .bindPopup(`<h6><b>ที่ตั้ง :</b> ต.${i.tambon}  อ.${i.amphoe} จ.${i.province}</h6><br><img class="border-10" src="${i.img}" width="100%">`)
                .addTo(map)
        } else {
            marker
                .bindPopup(`<h6><b>ที่ตั้ง :</b> ต.${i.tambon}  อ.${i.amphoe} จ.${i.province}</h6>`)
                .addTo(map)
        }
    })
}


let zoomExtent = (geojson, i) => {
    // console.log(geom);
    // map.eachLayer((lyr) => {
    //     if (lyr.options.name == 'point') {
    //         map.removeLayer(lyr);
    //     }
    // });
    point = L.geoJSON(JSON.parse(geojson), {
        name: 'st_asgeojson'
    })
    map.fitBounds(point.getBounds());
}

let closeModal = () => {
    $('#editModal').modal('hide')
    $('#deleteModal').modal('hide')
    $('#myTable').DataTable().ajax.reload();
}

let confirmDelete = (datreport, dattime, id_date) => {
    $("#projId").val(id_date)
    if (datreport !== null) { $("#projName").text(`วันที่ ${datreport}`) }
    if (dattime !== null) {
        $("#projTime").text(`เวลา ${dattime}`)
    }
    $("#deleteModal").modal("show")
}

let deleteValue = () => {
    let proj_id = $("#projId").val();
    axios.post(url + "/form_ap/deletedata", { id_date: proj_id }).then(r => {
        r.data.data == "success" ? closeModal() : null
        $('#myTable').DataTable().ajax.reload();
        window.location.reload();
    })
}



