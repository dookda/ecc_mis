const url = "https://eec-onep.online:3700";

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
map.pm.addControls({
    position: 'topleft',
    drawCircle: false,
    drawMarker: false,
    drawPolygon: false,
    drawPolyline: false,
    drawRectangle: false,
    drawCircleMarker: false,
    cutPolygon: false,
    removalMode: false,
    edit: {
        featureGroup: drawnItems
    }
});

let geom = '';
// map.on('pm:create', e => {
//     geom = e.layer.toGeoJSON();
//     console.log(e);
// });

drawnItems.on('pm:edit', e => {
    geom = e.layer.toGeoJSON();
    console.log(e);
});

let getValue = (id) => {
    console.log(id);

    // $("#editModal").modal("show")
    // $('#editModal').on('shown.bs.modal', function () {
    //     map.invalidateSize();
    // });

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

    axios.post(url + "/projmon-api/getone", { userid: "da", proj_id: id }).then((r) => {
        console.log(r);
        $('#proj_id').val(r.data.data[0].proj_id)
        $('#proj_name').text(r.data.data[0].proj_name)
        $('#budget').text(r.data.data[0].budget)
        $('#loan').text(r.data.data[0].loan)
        $('#year').text(r.data.data[0].year)
        $('#proj_type').text(r.data.data[0].proj_type)
        // r.data.data[0].proj_type == "โครงการใหม่" ? $("#proj_type1").prop("checked", true) : $("#proj_type2").prop("checked", true);
        $('#location').text(r.data.data[0].location)
        $('#area').text(r.data.data[0].area)

        r.data.data[0].status === "อยู่ระหว่างดำเนินการก่อสร้าง" ? $("#status1").prop("checked", true) : $("#status2").prop("checked", true);
        $('#espect').val(r.data.data[0].espect)
        r.data.data[0].feas === "อยู่ระหว่างการศึกษาความเหมาะสมและออกแบบรายละเอียด" ? $("#feas1").prop("checked", true) : $("#feas2").prop("checked", true);
        $('#feas_loan').val(r.data.data[0].feas_loan)
        $('#other').val(r.data.data[0].other)

        $('#proj_obj').text(r.data.data[0].proj_obj)
        $('#proj_mthod').text(r.data.data[0].proj_mthod)
        $('#proj_tech').text(r.data.data[0].proj_tech)
        $('#proj_area').text(r.data.data[0].proj_area)
        $('#output').text(r.data.data[0].output)
        $('#problem').text(r.data.data[0].problem)
        $('#quesion').text(r.data.data[0].quesion)
        $('#rname').text(r.data.data[0].rname)
        $('#pos').text(r.data.data[0].pos)
        $('#tele').text(r.data.data[0].tele)
        $('#fax').text(r.data.data[0].fax)
        $('#mob').text(r.data.data[0].mob)
        $('#mail').text(r.data.data[0].mail)

        $('#editdate').text(r.data.data[0].editdate)

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

let closeModal = () => {
    $('#editModal').modal('hide')
    $('#deleteModal').modal('hide')
    $('#myTable').DataTable().ajax.reload();
}

let confirmDelete = (proj_id, proj_name) => {
    $("#projId").val(proj_id)
    $("#projName").text(proj_name)
    $("#deleteModal").modal("show")
}

let deleteValue = () => {
    // console.log($("#projId").val());
    let proj_id = $("#projId").val()
    axios.post(url + "/projmon-api/deletedata", { proj_id: proj_id }).then(r => {
        r.data.data == "success" ? closeModal() : null
    })
}

let searchParams = new URLSearchParams(window.location.search)
let id = searchParams.get('id')
getValue(id)

