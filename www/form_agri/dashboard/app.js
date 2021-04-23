// const url = "https://eec-onep.online:3700";
const url = 'http://localhost:3700';


$(document).ready(function () {
    let table = $('#myTable').DataTable({
        ajax: {
            type: "POST",
            url: url + '/green-api/getdata',
            data: { userid: "sakda" },
            dataSrc: 'data'
        },
        columns: [
            { data: 'proj_name' },
            { data: 'place' },
            {
                // targets: -1,
                data: null,
                defaultContent: `<button type="button" class="btn btn-success" id="getMap">ขยายแผนที่</button>
                                    <button type="button" class="btn btn-danger" id="delete">ลบ!</button>`
            }
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
        zoomExtent(data.geojson)
    });

    $('#myTable tbody').on('click', '#delete', function () {
        var data = table.row($(this).parents('tr')).data();
        confirmDelete(data.proj_id, data.proj_name)
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
        if (lyr.options.name == 'geojson') {
            map.removeLayer(lyr);
        }
    });
    var style = {
        "color": "#ff7800",
        "weight": 2,
        "opacity": 0.65
    };
    x.map(i => {
        if (i.geojson) {
            // console.log(i.geojson);
            let geojson = L.geoJSON(JSON.parse(i.geojson), {
                style: style,
                name: "geojson",
                onEachFeature: function (feature, layer) {
                    drawnItems.addLayer(layer);
                }
            })
            geojson.addTo(map);
        }
    })
}

let zoomExtent = (geojson) => {
    // console.log(geojson);
    map.eachLayer((lyr) => {
        if (lyr.options.name == 'poly') {
            map.removeLayer(lyr);
        }
    });
    let poly = L.geoJSON(JSON.parse(geojson), {
        name: 'poly'
    })
    // poly.addTo(map)
    map.fitBounds(poly.getBounds());
};

let closeModal = () => {
    $('#editModal').modal('hide')
    $('#deleteModal').modal('hide')
    $('#myTable').DataTable().ajax.reload();
}

let confirmDelete = (proj_id, proj_name) => {
    $("#proj_id").val(proj_id)
    $("#proj_name").text(proj_name)
    $("#deleteModal").modal("show")
}

let deleteValue = () => {
    // console.log($("#projId").val());
    let proj_id = $("#proj_id").val()
    axios.post(url + "/green-api/deletedata", { proj_id: proj_id }).then(r => {
        r.data.data == "success" ? closeModal() : null
    })
}



