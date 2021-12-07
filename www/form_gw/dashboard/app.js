let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
$("#usrname").text(urname);
// eecauth  ? null : location.href = "./../../form_register/login/index.html";

// if (eecauth !== "admin" && eecauth !== "office") {
//     location.href = "./../../form_register/login/index.html";
// }

const url = "https://eec-onep.online/api";
// const url = 'http://localhost:3000';
let dataurl, button
if (eecauth == "admin") {
    dataurl = url + "/form_gw/get_geom";
    $('#login').hide();
    button = `<button type="button" class="btn btn-warning" id="getMap"><i class="bi bi-zoom-in"></i>&nbsp;ซูม</button>
    <button type="button" class="btn btn-danger" id="delete">ลบ!</button>`
} else if (eecauth == "office") {
    dataurl = url + "/form_gw/get_geom/" + urid;
    checkdata(dataurl);
    $('#login').hide();
    $('#cardselect').hide();
    button = `<button type="button" class="btn btn-warning" id="getMap"><i class="bi bi-zoom-in"></i>&nbsp;ซูม</button>
    <button type="button" class="btn btn-info" id="edit">แก้ไขข้อมูล</button>
    <button type="button" class="btn btn-danger" id="delete">ลบ!</button>`
} else {
    dataurl = url + "/form_gw/get_geom";
    $('#cardtable').hide();
    $('#usr1').hide();
    $('#usr2').hide();
    button = `<button type="button" class="btn btn-warning" id="getMap"><i class="bi bi-zoom-in"></i>&nbsp;ซูม</button>`
}
$("#pro").on("change", function () {
    getPro(this.value);
    seclectdata(eecauth, "prov", this.value);
    map.removeLayer(markers)
    seclectmap("pro", this.value);
    zoomSec("pro", this.value);

});
$("#amp").on("change", function () {
    getAmp(this.value);
    seclectdata(eecauth, "amp", this.value);
    map.removeLayer(markers)
    seclectmap("amp", this.value);
    zoomSec("amp", this.value);
});
$("#tam").on("change", function () {
    getTam(this.value);
    seclectdata(eecauth, "tam", this.value);
    map.removeLayer(markers)
    seclectmap("tam", this.value);
    zoomSec("tam", this.value);
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
            dataurl = url + '/form_gw/getgeom/pro/' + code;
            table.ajax.url(dataurl).load();
        } else if (type == "prov" && code == 'eec') {
            dataurl = url + "/form_gw/get_geom";
            table.ajax.url(dataurl).load();
        }
        else if (type == "amp") {
            dataurl = url + '/form_gw/getgeom/amp/' + code
            table.ajax.url(dataurl).load();
        } else if (type == "tam") {
            dataurl = url + '/form_gw/getgeom/tam/' + code
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
            },
            "emptyTable": "ไม่พบข้อมูล..."
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
            {
                // targets: -1,
                data: null,
                defaultContent: button
            },
            { data: 'staid' },
            { data: 'staname' },
            { data: 'prov' },
            { data: 'senid' },
            { data: 'repor_date' },
            { data: 'gwyear' },

        ],
        columnDefs: [
            { className: 'text-center', targets: [0, 1, 3, 4, 5, 6] },
        ],
        searching: true,
        scrollX: true,
        dom: 'Bfrtip',
        buttons: [
            'excel', 'print'
        ],
        // pageLength: 5
    });

    table.on('search.dt', function () {
        let data = table.rows({ search: 'applied' }).data()
        // console.log(data);
        $("#siteCnt").text(data.length)
        // getMap(data)
        // console.log();
    });

    $('#myTable tbody').on('click', '#getMap', function () {
        var data = table.row($(this).parents('tr')).data();
        zoomExtent(data)
    });

    $('#myTable tbody').on('click', '#edit', function () {
        var data = table.row($(this).parents('tr')).data();
        editdata(data)
    });

    $('#myTable tbody').on('click', '#delete', function () {
        var data = table.row($(this).parents('tr')).data();
        confirmDelete(data.staid, data.staname, data.id_date, data.prov, data.repor_date)
    });

    axios.get(url + "/form_gw/getintro").then((r) => {
        var data = r.data.data;
        getMap(data)
    })
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

const tam = L.tileLayer.wms("https://eec-onep.online/geoserver/eec/wms?", {
    layers: "eec:a__03_tambon_eec",
    format: "image/png",
    transparent: true,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const amp = L.tileLayer.wms("https://eec-onep.online/geoserver/eec/wms?", {
    layers: "eec:a__02_amphoe_eec",
    format: "image/png",
    transparent: true,
    // CQL_FILTER: 'pro_code=20 OR pro_code=21 OR pro_code=24'
});

const pro = L.tileLayer.wms("https://eec-onep.online/geoserver/eec/wms?", {
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
        div.innerHTML += '<i style="background: #FD7231; border-radius: 50%; border-style: solid; border-width: 1.5px;"></i><span>บ่อสังเกตการณ์</span><br>';
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
let seclectmap = (type, code) => {
    var api_1 = url + '/form_gw/getgeom/pro/' + code;
    var api_2 = url + '/form_gw/getgeom/amp/' + code
    var api_3 = url + '/form_gw/getgeom/tam/' + code;
    if (type = "pro") {
        axios.get(api_1).then((r) => {
            var data = r.data.data
            getMap(data)
        })
    } else if (type = "amp") {
        axios.get(api_2).then((r) => {
            var data = r.data.data
            getMap(data)
        })
    } else if (type = "tam") {
        axios.get(api_3).then((r) => {
            var data = r.data.data
            getMap(data)
        })
    }
}
let markers
let getMap = (data) => {
    // console.log(data)
    markers = L.markerClusterGroup(
        //     {
        //     spiderfyOnMaxZoom: false,
        //     showCoverageOnHover: false,
        //     zoomToBoundsOnClick: false
        // }
    );
    for (let i = 0; i < data.length; i++) {
        if (data[i].lat !== null && data[i].lng !== null) {
            var marker = L.circleMarker([data[i].lat, data[i].lng]
                , {
                    radius: 8,
                    fillColor: "#ff7800",
                    color: "#000",
                    weight: 1,
                    opacity: 0.5,
                    fillOpacity: 0.8,
                    data: data
                }
                , {
                    staname: data[i].staname
                })
            marker.bindPopup(`<h6><b>stationID :</b> ${data[i].staid} </h6><h6><b>สถานีตรวจวัดน้ำบาดาล :</b> ${data[i].staname} </h6><h6><b>ที่ตั้ง :</b> ต.${data[i].tambon}  อ.${data[i].amphoe} จ.${data[i].prov}</h6>`)
            // .addTo(map);
            markers.addLayer(marker);
        }
    }
    map.addLayer(markers);
    lyrControl.addOverlay(markers, "บ่อน้ำบาดาล")
}

let zoomExtent = (geojson) => {
    var data = geojson
    L.popup({ offset: [0, -27] })
        .setLatLng([data.lat, data.lng])
        .setContent(`<h6><b>รหัสบ่อ :</b> ${data.staid} </h6><h6><b>บ่อสังเกตการณ์ :</b> ${data.staname} </h6><h6><b> SenserID :</b> ${data.senid}</h6> <h6><b> วันที่เก็บข้อมูล :</b> ${data.repor_date}</h6>`)
        .openOn(map);
    map.panTo([data.lat, data.lng])
    map.setView([data.lat, data.lng], 24);
};

let editdata = (data) => {
    $("#editModal").modal("show")
    // console.log(data)
    $("#staid").text(data.staid);
    $("#staname").text(data.staname);
    $("#tambon").text(data.tambon);
    $("#amphoe").text(data.amphoe);
    $("#prov").text(data.prov);
    $("#senid").text(data.senid);
    $("#senname").text(data.sencode);
    $("#gwdate").text(data.gwdate);
    $("#gwyear").text(data.gwyear);
    $("#record").text(data.record);
    //1
    $("#wc").val(data.wc);
    $("#tb").val(data.tb);
    $("#ph").val(data.ph);
    $("#ec").val(data.ec);
    $("#cal").val(data.cal);
    $("#magne").val(data.magne);
    $("#sodium").val(data.sodium);
    $("#pota").val(data.pota);
    $("#fe").val(data.fe);
    $("#mnn").val(data.mnn);
    $("#so4").val(data.so4);
    $("#cl").val(data.cl);
    $("#fluor").val(data.fluor);
    $("#no3").val(data.no3);
    $("#ts").val(data.ts);
    //2
    $("#cu").val(data.cu);
    $("#zn").val(data.zn);
    $("#ars").val(data.ars);
    $("#pb").val(data.pb);
    $("#cd").val(data.cd);
    $("#cm").val(data.cm);
    $("#hg").val(data.hg);
    $("#se").val(data.se);
    $("#nc").val(data.nc);
    $("#sv").val(data.sv);
    $("#br").val(data.br);
    $("#cn").val(data.cn);

    $("#id_date").val(data.id_date)
}

let closeModal = () => {
    $('#editModal').modal('hide')
    $('#deleteModal').modal('hide')
    $('#myTable').DataTable().ajax.reload();
}

let confirmDelete = (staid, staname, id_date, porv, date) => {
    $("#projId").val(id_date)
    $("#projName").text(`${staname} จ.${porv}`)
    if (date !== 'null') {
        $("#projTime").text(`วันที่ ${date}`)
    }
    $("#deleteModal").modal("show")
}

let deleteValue = () => {
    // console.log($("#projId").val());
    let proj_id = $("#projId").val()
    axios.post(url + "/form_gw/deletedata", { id_date: proj_id }).then(r => {
        r.data.data == "success" ? closeModal() : null;
        window.location.reload();
    })
}

function saveData() {
    let data = [{
        // data: val ? val : val = '99',
        // staid: $("#staid").val(),
        // staname: $("#staname").val(),
        // tambon: $("#tambon").val(),
        // amphoe: $("#amphoe").val(),
        // prov: $("#province").val(),
        // senid: $("#senid").val(),
        // sencode: $("#senname").val(),
        // gwyear: $("#gwyear").val() ? $("#gwyear").val() : "0000",
        // gwdate: $("#gwdate").val() ? $("#gwdate").val() : "",
        // lat: $('#lat').val(),
        // lng: $('#lon').val(),
        // record: $("#record").val() ? $("#record").val() : '',
        //1
        ph: $("#ph").val() ? $("#ph").val() : '0',
        ec: $("#ec").val() ? $("#ec").val() : '0',
        tb: $("#tb").val() ? $("#tb").val() : '0',
        wc: $("#wc").val() ? $("#wc").val() : '0',
        cal: $("#cal").val() ? $("#cal").val() : '0',
        magne: $("#magne").val(),
        sodium: $("#sodium").val(),
        pota: $("#pota").val(),
        fe: $("#fe").val() ? $("#fe").val() : '0',
        mnn: $("#mnn").val() ? $("#mnn").val() : '0',
        so4: $("#so4").val() ? $("#so4").val() : '0',
        cl: $("#cl").val() ? $("#cl").val() : '0',
        fluor: $("#fluor").val() ? $("#fluor").val() : '0',
        no3: $("#no3").val() ? $("#no3").val() : '0',
        ts: $("#ts").val() ? $("#ts").val() : '0',
        //2
        cu: $("#cu").val() ? $("#cu").val() : '0',
        zn: $("#zn").val() ? $("#zn").val() : '0',
        ars: $("#ars").val() ? $("#ars").val() : '0',
        pb: $("#pb").val() ? $("#pb").val() : '0',
        cd: $("#cd").val() ? $("#cd").val() : '0',
        cm: $("#cm").val() ? $("#cm").val() : '0',
        hg: $("#hg").val() ? $("#hg").val() : '0',
        se: $("#se").val() ? $("#se").val() : '0',
        nc: $("#nc").val() ? $("#nc").val() : '0',
        sv: $("#sv").val() ? $("#sv").val() : '0',
        br: $("#br").val() ? $("#br").val() : '0',
        cn: $("#cn").val() ? $("#cn").val() : '0',
        id_date: $("#id_date").val()

    }]
    // console.log(data)
    closeModal()
    sendData(data)
}

let sendData = (data) => {
    const obj = {
        data: data
    }

    // console.log(obj)
    // var url = "http://localhost:3000"
    // var url = "https://eec-onep.online:3700";
    $.post(url + "/form_gw/update", obj).done((r) => {
        r.data.data == "success"
        window.location.reload();
    })
}

let checkdata = (dUrl) => {
    axios.get(dUrl).then(r => {
        let d = r.data.data;
        if (d.length == 0) {
            $('#warningModal').modal('show')
        } else {
            $('#warningModal').modal('hide')
        }
    })
}



