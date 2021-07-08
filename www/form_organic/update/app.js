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

let table
$(document).ready(function () {
    table = $('#myTable').DataTable({
        ajax: {
            type: "get",
            url: url + "/insee-api/get_geom",
            data: { userid: "" },
            dataSrc: 'data'
        },
        columns: [
            { data: 'dateD' },
            { data: 'intoname' },
            { data: 'typeag' },
            { data: 'tcate' },
            {
                // targets: -1,
                data: null,
                defaultContent: `<button type="button" class="btn btn-success" id="getMap">ขยายแผนที่</button>
                                 <button type="button" class="btn btn-warning" id="edit">แก้ไขข้อมูล</button>
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
            geojson.addTo(map);
        } else if (i.st_asgeojson && i.typeag == 'ปศุสัตว์') {
            let geojson = L.geoJSON(JSON.parse(i.st_asgeojson), {
                style: style_ani,
                name: "st_asgeojson",
                onEachFeature: function (feature, layer) {
                    drawnItems.addLayer(layer);
                }
            })
            geojson.addTo(map);
        } else if (i.st_asgeojson && i.typeag == 'การประมง') {
            let geojson = L.geoJSON(JSON.parse(i.st_asgeojson), {
                style: style_fish,
                name: "st_asgeojson",
                onEachFeature: function (feature, layer) {
                    drawnItems.addLayer(layer);
                }
            })
            geojson.addTo(map);
        } else { // console.log(i.geojson);
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
        console.log(data)
        $("#proj_name1").text(data.typeag);
        $("#typeA").val(data.typeag);
        $("#proj_id1").val(data.id_date)
        $("#into1").val(data.intono);
        $("#into2").val(data.intoname);
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
        console.log(data)
        $("#proj_name2").text(data.typeag);
        $("#typeA").val(data.typeag);
        $("#proj_id2").val(data.id_date)
        $("#into12").val(data.intono);
        $("#into22").val(data.intoname);
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
        console.log(data)
        console.log(data.t3select)
        $("#proj_name3").text(data.typeag);
        $("#typeA").val(data.typeag);
        $("#proj_id3").val(data.id_date)
        $("#into13").val(data.intono);
        $("#into23").val(data.intoname);
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
}

let confirmDelete = (staid, staname, id_date) => {
    $("#proj_id").val(id_date)
    $("#proj_name").text(staname)
    $("#deleteModal").modal("show");
}

let deleteValue = () => {
    // console.log($("#projId").val());
    let proj_id = $("#proj_id").val()
    axios.post("http://localhost:3000/form_gw/deletedata", { id_date: proj_id }).then(r => {
        r.data.data == "success" ? closeModal() : null
    })
}
let refreshPage = () => {
    location.reload(true);
}
let dataurl1
$('#imgfile1').change(function (evt) {
    console.log(evt);
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
                dataurl1 = canvas.toDataURL(file.type);
                // console.log(dataurl)
                // document.getElementById('output').src = dataurl;
            }
            reader.readAsDataURL(file);
        }
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
}
let dataurl2
$('#imgfile2').change(function (evt) {
    console.log(evt);
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
                dataurl2 = canvas.toDataURL(file.type);
                // console.log(dataurl)
                // document.getElementById('output').src = dataurl;
            }
            reader.readAsDataURL(file);
        }
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
}
let dataurl3
$('#imgfile3').change(function (evt) {
    console.log(evt);
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
                dataurl3 = canvas.toDataURL(file.type);
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
    console.log(a)
    if (a == "เกษตรกรรม") {
        let dataA = [{
            typeag: $("#typeA").val(),
            id_date: $("#proj_id1").val(),
            intono: $("#into1").val(),
            intoname: $("#into2").val(),
            t1types: $("#TypeA1").val(),
            tcate: $("#cateAgri").val(),
            t1sdate: $("#dateAgri").val(),
            t1sdateout: $("#dateAgout").val(),
            t1stdard: $("#standAgri").val(),
            t1stdname: $("#namestand").val(),
            tarea: $("#areaAgri").val(),
            tarunit: $("#unitAgri").val(),
            img: dataurl1 ? dataurl1 : dataurl1 = "",
            repordat: $("#rpdate").val(),
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
            t2sel: $("#selAni").val(),
            tcate: $("#cateAni").val(),
            t2amount: $("#quanAni").val(),
            tarea: $("#areaAni").val(),
            tarunit: $("#unitAni").val(),
            img: dataurl2 ? dataurl2 : dataurl2 = "",
            repordat: $("#rpdate2").val(),
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
            img: dataurl3 ? dataurl3 : dataurl3 = "",
            repordat: $("#rpdate3").val(),
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
    console.log(obj)
    $.post(url + "/form_insee/update", obj).done((r) => {
        r.data.data == "success"
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
            console.log(a)
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
