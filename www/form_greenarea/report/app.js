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
            // { data: 'response' },
            // { data: 'gtype' },
            { data: 'place' },
            // { data: 'area' },
            {
                data: null, render: function (data, type, row, meta) {
                    // console.log(row);
                    $("#total").text(meta.row)
                    return `<a type="button" class="btn btn-success" onclick="zoomExtent('${row.proj_id}')">ดูแผนที่</a>
                            <button type="button" class="btn btn-danger" onclick="confirmDelete('${row.proj_id}', '${row.proj_name}')">ลบ</button>`
                }
            }
        ],
        searching: true,
        // pageLength: 5
    });

    // table.rows({ search: 'applied' }).data()
    table.on('search.dt', function () {
        let data = table.rows({ search: 'applied' }).data()
        // getProc_stat(data)
        // getOpert_stat(data);
        // getPrj_cate(data);
        // getBudget(data);
        getMap(data)
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
    console.log(x);
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

let zoomExtent = (proj_id) => {
    console.log(proj_id);
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

