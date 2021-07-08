let urid = sessionStorage.getItem('id');
let urname = sessionStorage.getItem('name');
$("#usrname").text(urname);
urid ? null : location.href = "./../../form_register/login/index.html";

const url = "https://eec-onep.online:3700";
// const url = 'http://localhost:3000';


$(document).ready(function () {
    let table = $('#myTable').DataTable({
        ajax: {
            type: "get",
            url: url + "/form_gw/get_geom",
            data: { userid: "sakda" },
            dataSrc: 'data'
        },
        columns: [
            { data: 'staid' },
            { data: 'staname' },
            { data: 'prov' },
            { data: 'senid' },
            { data: 'gwdate' },
            { data: 'gwyear' },
            {
                // targets: -1,
                data: null,
                defaultContent: `<button type="button" class="btn btn-success" id="getMap">ขยายแผนที่</button>
                                 <button type="button" class="btn btn-warning" id="edit">แก้ไขข้อมูล</button>
                                 <button type="button" class="btn btn-danger" id="delete">ลบ!</button>`
            }
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
        console.log(data);
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
        confirmDelete(data.staid, data.staname, data.id_date)
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
    x.map(i => {
        if (i.st_asgeojson) {
            // console.log(i.geojson);
            let geojson = L.geoJSON(JSON.parse(i.st_asgeojson), {
                style: style,
                name: "st_asgeojson",
                onEachFeature: function (feature, layer) {
                    drawnItems.addLayer(layer);
                }
            })
            geojson.addTo(map);
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
    poly.addTo(map)
    map.fitBounds(poly.getBounds());
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

let confirmDelete = (staid, staname, id_date) => {
    $("#proj_id").val(id_date)
    $("#proj_name").text(staname)
    $("#deleteModal").modal("show")
}

let deleteValue = () => {
    // console.log($("#projId").val());
    let proj_id = $("#proj_id").val()
    axios.post(url + "/form_gw/deletedata", { id_date: proj_id }).then(r => {
        r.data.data == "success" ? closeModal() : null
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
    })
}




