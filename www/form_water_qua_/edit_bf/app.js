$(document).ready(() => {
    loadMap();
    loadData();
});

let searchParams = new URLSearchParams(window.location.search)
let wq_id = searchParams.get('id')
console.log(wq_id);

let latlng = {
    lat: 16.820378,
    lng: 100.265787
}
let map = L.map('map', {
    center: latlng,
    zoom: 13
});
let marker;
let dataurl;

// const url = 'http://localhost:3700';
const url = "https://eec-onep.online:3700";

let loadMap = () => {
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
        "Mapbox": mapbox,
        "google Hybrid": ghyb.addTo(map)
    }
    var overlayMap = {
        "ขอบจังหวัด": pro
    }
    L.control.layers(baseMap, overlayMap).addTo(map);

    // gps.addTo(map).bindPopup("คุณอยู่ที่นี่").openPopup();
    // gps.on('dragend', (e) => {
    //     console.log(e)
    //     $('#lat').val(e.target._latlng.lat);
    //     $('#lng').val(e.target._latlng.lng);
    // })
}

// let marker;
map.on('click', (e) => {
    map.eachLayer((lyr) => {
        if (lyr.options.name == 'mk') {
            map.removeLayer(lyr);
        }
    });

    marker = L.marker(e.latlng, {
        draggable: true,
        name: 'mk'
    });
    // console.log(marker.toGeoJSON());
    marker.addTo(map).bindPopup("คุณอยู่ที่นี่").openPopup();
    marker.on('dragend', (e) => {
        // console.log(e)
    })
});

let refreshPage = () => {
    window.open("./../report/index.html", "_self");
}

let loadData = () => {
    let obj = {
        wq_id: wq_id,
        tb: "watquality_af"
    }
    axios.post(url + "/wq-api/getone", obj).then(r => {
        // console.log(r.data.data[0]);
        $('#wq_turb').val(r.data.data[0].bf_wq_turb)
        $('#wq_cond').val(r.data.data[0].bf_wq_cond)
        $('#wq_sal').val(r.data.data[0].bf_wq_sal)
        $('#wq_tds').val(r.data.data[0].bf_wq_tds)
        $('#wq_ph').val(r.data.data[0].bf_wq_ph)
        $('#wq_bod').val(r.data.data[0].bf_wq_bod)
        $('#wq_cod').val(r.data.data[0].bf_wq_cod)
        $('#wq_ss').val(r.data.data[0].bf_wq_ss)
        $('#wq_ses').val(r.data.data[0].bf_wq_ses)
        $('#wq_do').val(r.data.data[0].bf_wq_do)
        $('#wq_temp').val(r.data.data[0].bf_wq_temp)
        $('#wq_og').val(r.data.data[0].bf_wq_og)
        $('#wq_tkn').val(r.data.data[0].bf_wq_tkn)
        $('#wq_tn').val(r.data.data[0].bf_wq_tn)
        $('#wq_tp').val(r.data.data[0].bf_wq_tp)
        $('#wq_fcb').val(r.data.data[0].bf_wq_fcb)
        $('#wq_tcb').val(r.data.data[0].bf_wq_tcb)
        $('#wq_spname').val(r.data.data[0].wq_spname)
        $('#wq_ipname').val(r.data.data[0].wq_ipname)

        if (r.data.data[0].geojson) {
            let json = JSON.parse(r.data.data[0].geojson);
            console.log(json);
            marker = L.marker([json.coordinates[1], json.coordinates[0]], {
                draggable: true,
                name: 'mk'
            }).addTo(map);
            marker.bindPopup("ตำแหน่งตรวจวัด").openPopup();
            map.panTo([json.coordinates[1], json.coordinates[0]])
        }
    })
}

let saveData = () => {
    console.log(marker);
    const obj = {
        data: {
            wq_turb: $('#wq_turb').val(),
            wq_cond: $('#wq_cond').val(),
            wq_sal: $('#wq_sal').val(),
            wq_tds: $('#wq_tds').val(),
            wq_ph: $('#wq_ph').val(),
            wq_bod: $('#wq_bod').val(),
            wq_cod: $('#wq_cod').val(),
            wq_ss: $('#wq_ss').val(),
            wq_ses: $('#wq_ses').val(),
            wq_do: $('#wq_do').val(),
            wq_temp: $('#wq_temp').val(),
            wq_og: $('#wq_og').val(),
            wq_tkn: $('#wq_tkn').val(),
            wq_tn: $('#wq_tn').val(),
            wq_tp: $('#wq_tp').val(),
            wq_fcb: $('#wq_fcb').val(),
            wq_tcb: $('#wq_tcb').val(),
            wq_spname: $('#wq_spname').val(),
            wq_ipname: $('#wq_ipname').val(),
            img: dataurl ? dataurl : dataurl = "",
            geom: marker == null ? "" : marker.toGeoJSON()
        },
        tb: "watquality_bf",
        wq_id: wq_id,
    }

    axios.post(url + "/wq-api/update", obj).then(r => {
        r.data.data == "success" ? refreshPage() : null
    })
}

$('#imgfile').change(function (evt) {
    var files = evt.target.files;
    var file = files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('preview').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    resize();
});

let resize = () => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var filesToUploads = document.getElementById('imgfile').files;
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
                dataurl = canvas.toDataURL(file.type);
                // console.log(dataurl)
                // document.getElementById('output').src = dataurl;
            }
            reader.readAsDataURL(file);
        }
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
}









