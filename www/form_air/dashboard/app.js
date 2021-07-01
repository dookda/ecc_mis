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
            url: url + "/form_ap/get_geom",
            data: { userid: "sakda" },
            dataSrc: 'data'
        },
        columns: [
            { data: 'datreport' },
            { data: 'dattime' },
            { data: 'tambon' },
            { data: 'amphoe' },
            { data: 'province' },
            { data: 'feeling' },
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
        zoomExtent(data.st_asgeojson)
    });

    $('#myTable tbody').on('click', '#edit', function () {
        var data = table.row($(this).parents('tr')).data();
        editdata(data)
    });

    $('#myTable tbody').on('click', '#delete', function () {
        var data = table.row($(this).parents('tr')).data();
        confirmDelete(data.datreport, data.dattime, data.id_date)
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

        marker.addTo(map)
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
    $("#proj_id").val(id_date)
    $("#proj_name").text(`วันที่ : ${datreport} เวลา : ${dattime}`)
    $("#deleteModal").modal("show")
}

let deleteValue = () => {
    // console.log($("#projId").val());
    let proj_id = $("#proj_id").val()
    axios.post("http://localhost:3000/form_ap/deletedata", { id_date: proj_id }).then(r => {
        r.data.data == "success" ? closeModal() : null
    })
}



