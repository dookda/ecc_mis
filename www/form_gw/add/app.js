let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let f_gw = sessionStorage.getItem('f_gw');
$("#usrname").text(urname);
// urid ? null : location.href = "./../../form_register/login/index.html";
$(document).ready(() => {
    if (urid) {
        if (f_gw == 'false')
            $("#noauth").modal("show");
    } else {
        $("#noauth").modal("show");
    }
})

let gotoLogin = () => {
    location.href = "./../../form_register/login/index.html";
}

if (eecauth !== "admin" && eecauth !== "office") {
    $("#noauth").modal("show");

}
let gotoreport = () => {
    if (eecauth !== "admin") {
        location.href = "./../dashboard/index.html";
    } else {
        location.href = "./../report_admin/index.html";
    }
}
// if (eecauth !== "admin" && eecauth !== "user") {
//     location.href = "./../../form_register/login/index.html";
// }

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

const url = "https://engrids.soc.cmu.ac.th/api";
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
    // maxZoom: 20,
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
    "Mapbox": mapbox,
    "google Hybrid": ghyb.addTo(map),
}
var overlayMap = {
    "ขอบเขตจังหวัด": pro.addTo(map),
    "ขอบเขตอำเภอ": amp,
    "ขอบเขตตำบล": tam,
}
const Lycontrol = L.control.layers(baseMap, overlayMap).addTo(map);
var lat;
var lng;
let gps;
let onLocationFound = (e) => {
    // nearData(e)
    // latlng = e.latlng;
    // lat = e.latlng.lat;
    // lng = e.latlng.lng;
    // console.log(e.latlng)
    // $('#lat').val(e.latlng.lat);
    // $('#lng').val(e.latlng.lng);
    // changeLatlng(e.latlng);
}
function changeLatlng(latlng) {
    // console.log(latlng)
    // gps = L.marker(latlng, {
    //     draggable: true,
    //     name: 'p'
    // });
    // gps.addTo(map).bindPopup("คุณอยู่ที่นี่").openPopup();
    // gps.on('dragend', (e) => {
    //     console.log(e)
    //     $('#lat').val(e.target._latlng.lat);
    //     $('#lng').val(e.target._latlng.lng);
    // })

}
map.on("locationfound", onLocationFound);

var lc = L.control.locate({
    position: 'topleft',
    strings: {
        title: ""
    },
    locateOptions: {
        enableHighAccuracy: true,
    }
}).addTo(map);

lc.start();

map.pm.addControls({
    position: 'topleft',
    drawMarker: true,
    drawCircle: false,
    drawPolygon: false,
    drawPolyline: false,
    drawRectangle: false,
    drawCircleMarker: false,
    cutPolygon: false

});
let dataurl;
$("#pro").on("change", function () {
    getPro(this.value)
});
$("#amp").on("change", function () {
    getAmp(this.value)
});
$("#tam").on("change", function () {
    getTam(this.value)
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
        tam_code = r.data.data[0].tambon_idn
        tam_name = r.data.data[0].tam_namt
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
var datageom
let geom = [];
let datlatlon = [];
let latlon = []
map.on('pm:create', e => {
    var data = e.layer.toGeoJSON()
    var pd = data.geometry.coordinates
    // var setlocation = [];
    // setlocation.push({
    //     "lat": pd[1],
    //     "lng": pd[0],
    // })
    datlatlon.push({
        "lat": pd[1],
        "lng": pd[0],
    })
    $('#lat').val(pd[1]);
    $('#lon').val(pd[0]);
    geom.push({
        "geom": e.layer.toGeoJSON(),
    });
    datageom = e.layer.toGeoJSON();
});

let refreshPage = () => {
    location.reload(true);
}

$('#imgfile').change(function (evt) {
    // console.log(evt);
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
                dataimgurl = canvas.toDataURL(file.type);
                // console.log(dataimgurl)
                // document.getElementById('output').src = dataimgurl;
            }
            reader.readAsDataURL(file);
        }
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
}

$('#lat').on("input", function () {
    if (this.value == '') {
        $("#lat").addClass("is-invalid")
        console.log("false")
    } else {
        $("#lat").removeClass("is-invalid")
        console.log("true")
    }
})
$('#lon').on("input", function () {
    if (this.value == '') {
        $("#lon").addClass("is-invalid")
        console.log("false")
    } else {
        $("#lon").removeClass("is-invalid")
        console.log("true")
    }
})
$('#staid').on("input", function () {
    if (this.value == '') {
        $("#staid").addClass("is-invalid")
        console.log("false")
    } else {
        $("#staid").removeClass("is-invalid")
        console.log("true")
    }
})
$('#staname').on("input", function () {
    if (this.value == '') {
        $("#staname").addClass("is-invalid")
        console.log("false")
    } else {
        $("#staname").removeClass("is-invalid")
        console.log("true")
    }
})
$('#pro').on("input", function () {
    if (this.value == '') {
        $("#pro").addClass("is-invalid")
        console.log("false")
    } else {
        $("#pro").removeClass("is-invalid")
        console.log("true")
    }
})
$('#amp').on("input", function () {
    if (this.value == '') {
        $("#amp").addClass("is-invalid")
        console.log("false")
    } else {
        $("#amp").removeClass("is-invalid")
        console.log("true")
    }
})
$('#tam').on("input", function () {
    if (this.value == '') {
        $("#tam").addClass("is-invalid")
        console.log("false")
    } else {
        $("#tam").removeClass("is-invalid")
        console.log("true")
    }
})
$('#senid').on("input", function () {
    if (this.value == '') {
        $("#senid").addClass("is-invalid")
        console.log("false")
    } else {
        $("#senid").removeClass("is-invalid")
        console.log("true")
    }
})
$('#senname').on("input", function () {
    if (this.value == '') {
        $("#senname").addClass("is-invalid")
        console.log("false")
    } else {
        $("#senname").removeClass("is-invalid")
        console.log("true")
    }
})
$('#gwdate').on("input", function () {
    if (this.value == '') {
        $("#gwdate").addClass("is-invalid")
        console.log("false")
    } else {
        $("#gwdate").removeClass("is-invalid")
        console.log("true")
    }
})
$('#gwyear').on("input", function () {
    if (this.value == '') {
        $("#gwyear").addClass("is-invalid")
        console.log("false")
    } else {
        $("#gwyear").removeClass("is-invalid")
        console.log("true")
    }
})
$('#record').on("input", function () {
    if (this.value == '') {
        $("#record").addClass("is-invalid")
        console.log("false")
    } else {
        $("#record").removeClass("is-invalid")
        console.log("true")
    }
})

function saveData() {
    if ($('#lat').val() == "" || $('#lon').val() == "" || $('#staid').val() == "" || $('#staname').val() == "" || $('#pro').val() == "" || $('#amp').val() == "" || $('#tam').val() == "" || $('#senid').val() == "" || $('#senname').val() == "" || $('#gwdate').val() == "" || $('#gwyear').val() == "" || $('#record').val() == "") {
        $("#errormodal").modal("show")
        if ($('#lat').val() == "") {
            $("#lat").addClass("is-invalid")
        }
        if ($('#lon').val() == "") {
            $("#lon").addClass("is-invalid")
        }
        if ($('#staid').val() == "") {
            $("#staid").addClass("is-invalid")
        }
        if ($('#staname').val() == "") {
            $("#staname").addClass("is-invalid")
        }
        if ($('#pro').val() == "") {
            $("#pro").addClass("is-invalid")
        }
        if ($('#amp').val() == "") {
            $("#amp").addClass("is-invalid")
        }
        if ($('#tam').val() == "") {
            $("#tam").addClass("is-invalid")
        }
        if ($('#senid').val() == "") {
            $("#senid").addClass("is-invalid")
        }
        if ($('#senname').val() == "") {
            $("#senname").addClass("is-invalid")
        }
        if ($('#gwdate').val() == "") {
            $("#gwdate").addClass("is-invalid")
        }
        if ($('#gwyear').val() == "") {
            $("#gwyear").addClass("is-invalid")
        }
        if ($('#record').val() == "") {
            $("#record").addClass("is-invalid")
        }
    } else if ($('#lat').val() !== "" || $('#lon').val() !== "" || $('#staid').val() == "" || $('#staname').val() == "" || $('#pro').val() == "" || $('#amp').val() == "" || $('#tam').val() == "" || $('#senid').val() == "" || $('#senname').val() == "" || $('#gwdate').val() == "" || $('#gwyear').val() == "" || $('#record').val() == "") {
        let data = [{
            // data: val ? val : val = '99',
            staid: $("#staid").val(),
            staname: $("#staname").val(),
            tambon: tam_name,
            amphoe: amp_name,
            prov: prov_name,
            p_code: prov_code,
            a_code: amp_code,
            t_code: tam_code,
            senid: $("#senid").val(),
            sencode: $("#senname").val(),
            gwyear: $("#gwyear").val() ? $("#gwyear").val() : "0000",
            gwdate: $("#gwdate").val() ? $("#gwdate").val() : "",
            lat: $('#lat').val(),
            lng: $('#lon').val(),
            record: $("#record").val() ? $("#record").val() : '',
            //1
            ph: $("#ph").val() ? $("#ph").val() : '0',
            ec: $("#ec").val() ? $("#ec").val() : '0',
            tb: $("#td").val() ? $("#td").val() : '0',
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
            geom: datageom ? datageom : '',
            id_date: Date.now(),
            id_user: urname,
            id_userid: urid,
        }]
        // console.log(obj)
        sendData(data)
    }
}
let sendData = (data) => {
    const obj = {
        data: data
    }
    // console.log(obj)
    $.post(url + "/form_gw/insert", obj).done((r) => {
        r.data.data == "success" ? $("#Modalconfirm").modal("show") : null
        $("#Modalconfirm").modal("show")
    })
}


function showForm(idform) {
    $(idform).show();
}
function hide(id) {
    $(id).hide()
}


//มาตรฐาน
$("#stand").on("change", function () {
    var a = $("#stand").val()
    if (a == "Have") {
        $("#Namestand").show();
        $("#Havestand").show();
        $("#Nostand").hide();
    } else if (a == "All") {
        $("#Namestand").show();
        $("#Havestand").show();
        $("#Nostand").show();
    } else {
        $("#Namestand").hide();
        $("#Havestand").hide();
        $("#Nostand").hide();
    }
    // console.log(a)
})
// ข้าว
$("#rice").on("change", function () {
    var t = this.checked
    if (t == true) {
        console.log("ข้าว")
        $("#riceselect").show();
        $("#riceuse").show();
        $("#riceValue").on("change", function () {
            var a = $("#riceValue").val();
            if (a == "1") {
                $("#rice1").show();
                $("#rice2").hide();
                $("#rice3").hide();
                $("#rice4").hide();
                $("#rice5").hide();
            } else if (a == "2") {
                $("#rice1").show();
                $("#rice2").show();
                $("#rice3").hide();
                $("#rice4").hide();
                $("#rice5").hide();
            }
            else if (a == "3") {
                $("#rice1").show();
                $("#rice2").show();
                $("#rice3").show();
                $("#rice4").hide();
                $("#rice5").hide();
            }
            else if (a == "4") {
                $("#rice1").show();
                $("#rice2").show();
                $("#rice3").show();
                $("#rice4").show();
                $("#rice5").hide();
            }
            else if (a == "5") {
                $("#rice1").show();
                $("#rice2").show();
                $("#rice3").show();
                $("#rice4").show();
                $("#rice5").show();
            }
            else if (a == "0") {
                $("#rice1").hide();
                $("#rice2").hide();
                $("#rice3").hide();
                $("#rice4").hide();
                $("#rice5").hide();
            }
        })
        //ซื้อขาย
        $("#RBScheck").on("change", function () {
            var t = this.checked
            // console.log(t)
            if (t == true) {
                $("#RBS").show();
                $("#buyrice").show();
                $("#sellrice").show();
                $("#RBSselect").on("change", function () {
                    var a = $("#RBSselect").val();
                    if (a == "buy") {
                        $("#buyrice").show();
                        $("#sellrice").hide();
                    } else if (a == "sell") {
                        $("#buyrice").hide();
                        $("#sellrice").show();
                    } else if (a == "buyandsell") {
                        $("#buyrice").show();
                        $("#sellrice").show();
                    } else {
                        $("#buyrice").hide();
                        $("#sellrice").hide();
                    }
                })
            } else {
                $("#RBS").hide();
            }
        })
        //เก็บไว้
        $("#RKcheck").on("change", function () {
            var t = this.checked
            if (t == true) {
                $("#ricekeep").show();
            } else {
                $("#ricekeep").hide();
            }
        })
    } else {
        console.log('NO')
        $("#riceselect").hide();
        $("#rice1").hide();
        $("#rice2").hide();
        $("#rice3").hide();
        $("#rice4").hide();
        $("#rice5").hide();
        $("#riceuse").hide();
    }
});
// พืชไร่
$("#Fieldcrop").on("change", function () {
    var t = this.checked
    if (t == true) {
        console.log("พืชไร่")
        $("#FCselect").show();
        $("#FCuse").show();
        $("#FCValue").on("change", function () {
            var a = $("#FCValue").val();
            console.log(a)
            if (a == "1") {
                $("#Fieldcrop1").show();
                $("#Fieldcrop2").hide();
                $("#Fieldcrop3").hide();
                $("#Fieldcrop4").hide();
                $("#Fieldcrop5").hide();
            } else if (a == "2") {
                $("#Fieldcrop1").show();
                $("#Fieldcrop2").show();
                $("#Fieldcrop3").hide();
                $("#Fieldcrop4").hide();
                $("#Fieldcrop5").hide();
            }
            else if (a == "3") {
                $("#Fieldcrop1").show();
                $("#Fieldcrop2").show();
                $("#Fieldcrop3").show();
                $("#Fieldcrop4").hide();
                $("#Fieldcrop5").hide();
            }
            else if (a == "4") {
                $("#Fieldcrop1").show();
                $("#Fieldcrop2").show();
                $("#Fieldcrop3").show();
                $("#Fieldcrop4").show();
                $("#Fieldcrop5").hide();
            }
            else if (a == "5") {
                $("#Fieldcrop1").show();
                $("#Fieldcrop2").show();
                $("#Fieldcrop3").show();
                $("#Fieldcrop4").show();
                $("#Fieldcrop5").show();
            }
            else if (a == "0") {
                $("#Fieldcrop1").hide();
                $("#Fieldcrop2").hide();
                $("#Fieldcrop3").hide();
                $("#Fieldcrop4").hide();
                $("#Fieldcrop5").hide();
            }
        })
        //ซื้อขาย
        $("#FCBScheck").on("change", function () {
            var t = this.checked
            console.log(t)
            if (t == true) {
                $("#FCBS").show();
                $("#buyFC").show();
                $("#sellFC").show();
                $("#FCBSselect").on("change", function () {
                    var a = $("#FCBSselect").val();
                    if (a == "buy") {
                        $("#buyFC").show();
                        $("#sellFC").hide();
                    } else if (a == "sell") {
                        $("#buyFC").hide();
                        $("#sellFC").show();
                    } else if (a == "buyandsell") {
                        $("#buyFC").show();
                        $("#sellFC").show();
                    } else {
                        $("#buyFC").hide();
                        $("#sellFC").hide();
                    }
                })
            } else {
                $("#FCBS").hide();
            }
        })
        //เก็บไว้
        $("#FCKcheck").on("change", function () {
            var t = this.checked
            if (t == true) {
                $("#FCkeep").show();
            } else {
                $("#FCkeep").hide();
            }
        })
    } else {
        console.log('NO')
        $("#FCselect").hide();
        $("#Fieldcrop1").hide();
        $("#Fieldcrop2").hide();
        $("#Fieldcrop3").hide();
        $("#Fieldcrop4").hide();
        $("#Fieldcrop5").hide();
        $("#FCuse").hide();
    }
});
//ปลูกผัก
$("#olericulture").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#olerselect").show();
        $("#oleruse").show();
        $("#olerValue").on("change", function () {
            var a = $("#olerValue").val();
            if (a == "1") {
                $("#oler1").show();
                $("#oler2").hide();
                $("#oler3").hide();
                $("#oler4").hide();
                $("#oler5").hide();
            } else if (a == "2") {
                $("#oler1").show();
                $("#oler2").show();
                $("#oler3").hide();
                $("#oler4").hide();
                $("#oler5").hide();
            }
            else if (a == "3") {
                $("#oler1").show();
                $("#oler2").show();
                $("#oler3").show();
                $("#oler4").hide();
                $("#oler5").hide();
            }
            else if (a == "4") {
                $("#oler1").show();
                $("#oler2").show();
                $("#oler3").show();
                $("#oler4").show();
                $("#oler5").hide();
            }
            else if (a == "5") {
                $("#oler1").show();
                $("#oler2").show();
                $("#oler3").show();
                $("#oler4").show();
                $("#oler5").show();
            }
            else if (a == "0") {
                $("#oler1").hide();
                $("#oler2").hide();
                $("#oler3").hide();
                $("#oler4").hide();
                $("#oler5").hide();
            }
            // console.log(a)
        });
        $("#OBScheck").on("change", function () {
            var t = this.checked
            // console.log(t)
            if (t == true) {
                $("#OBS").show();
                $("#buyoler").show();
                $("#selloler").show();
                $("#OBSselect").on("change", function () {
                    var a = $("#OBSselect").val();
                    if (a == "buy") {
                        $("#buyoler").show();
                        $("#selloler").hide();
                    } else if (a == "sell") {
                        $("#buyoler").hide();
                        $("#selloler").show();
                    } else if (a == "buyandsell") {
                        $("#buyoler").show();
                        $("#selloler").show();
                    } else {
                        $("#buyoler").hide();
                        $("#selloler").hide();
                    }
                })
            } else {
                $("#OBS").hide();
            }
        })
        //เก็บไว้
        $("#OKcheck").on("change", function () {
            var t = this.checked
            if (t == true) {
                $("#olerkeep").show();
            } else {
                $("#olerkeep").hide();
            }
        })
    } else {
        console.log('NO')
        $("#olerselect").hide();
        $("#oler1").hide();
        $("#oler2").hide();
        $("#oler3").hide();
        $("#oler4").hide();
        $("#oler5").hide();
        $("#oleruse").hide();
    }
});
// ผลไม้
$("#fruit").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#fruitselect").show();
        $("#fruituse").show();
        $("#fruitValue").on("change", function () {
            var a = $("#fruitValue").val();
            if (a == "1") {
                $("#fruit1").show();
                $("#fruit2").hide();
                $("#fruit3").hide();
                $("#fruit4").hide();
                $("#fruit5").hide();
            } else if (a == "2") {
                $("#fruit1").show();
                $("#fruit2").show();
                $("#fruit3").hide();
                $("#fruit4").hide();
                $("#fruit5").hide();
            }
            else if (a == "3") {
                $("#fruit1").show();
                $("#fruit2").show();
                $("#fruit3").show();
                $("#fruit4").hide();
                $("#fruit5").hide();
            }
            else if (a == "4") {
                $("#fruit1").show();
                $("#fruit2").show();
                $("#fruit3").show();
                $("#fruit4").show();
                $("#fruit5").hide();

            }
            else if (a == "5") {
                $("#fruit1").show();
                $("#fruit2").show();
                $("#fruit3").show();
                $("#fruit4").show();
                $("#fruit5").show();
            }
            else if (a == "0") {
                $("#fruit1").hide();
                $("#fruit2").hide();
                $("#fruit3").hide();
                $("#fruit4").hide();
                $("#fruit5").hide();
            }
        })
        //ซื้อขาย
        $("#FBScheck").on("change", function () {
            var t = this.checked
            if (t == true) {
                console.log("ok")
                $("#FBSselect").show();
                $("#buyfruit").show();
                $("#sellfruit").show();
                $("#FBSselect").on("change", function () {
                    var a = $("#FBSselect").val();
                    if (a == "buy") {
                        $("#buyfruit").show();
                        $("#sellfruit").hide();
                    } else if (a == "sell") {
                        $("#buyfruit").hide();
                        $("#sellfruit").show();
                    } else if (a == "buyandsell") {
                        $("#buyfruit").show();
                        $("#sellfruit").show();
                    } else {
                        $("#buyfruit").hide();
                        $("#sellfruit").hide();
                    }
                })
            } else {
                $("#FBSselect").hide();
                $("#buyfruit").hide();
                $("#sellfruit").hide();
            }
        })
        //เก็บไว้
        $("#FKcheck").on("change", function () {
            var t = this.checked
            if (t == true) {
                $("#fruitkeep").show();
            } else {
                $("#fruitkeep").hide();
            }
        })
    } else {
        $("#fruitselect").hide();
        $("#fruit1").hide();
        $("#fruit2").hide();
        $("#fruit3").hide();
        $("#fruit4").hide();
        $("#fruit5").hide();
        $("#fruituse").hide();
    }
});
//ปศุสัตว์
$("#Animal").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#animalselect").show();
        $("#animaluse").show();
        $("#animalValue").on("change", function () {
            var a = $("#animalValue").val();
            if (a == "1") {
                $("#animal1").show();
                $("#animal2").hide();
                $("#animal3").hide();
                $("#animal4").hide();
                $("#animal5").hide();
            } else if (a == "2") {
                $("#animal1").show();
                $("#animal2").show();
                $("#animal3").hide();
                $("#animal4").hide();
                $("#animal5").hide();
            }
            else if (a == "3") {
                $("#animal1").show();
                $("#animal2").show();
                $("#animal3").show();
                $("#animal4").hide();
                $("#animal5").hide();
            }
            else if (a == "4") {
                $("#animal1").show();
                $("#animal2").show();
                $("#animal3").show();
                $("#animal4").show();
                $("#animal5").hide();
            }
            else if (a == "5") {
                $("#animal1").show();
                $("#animal2").show();
                $("#animal3").show();
                $("#animal4").show();
                $("#animal5").show();
            }
            if (a == "0") {
                $("#animal1").hide();
                $("#animal2").hide();
                $("#animal3").hide();
                $("#animal4").hide();
                $("#animal5").hide();
                // console.log(a)
            }
        });
        //ซื้อขาย
        $("#ABScheck").on("change", function () {
            var t = this.checked
            console.log(t)
            if (t == true) {
                $("#ABS").show();
                $("#buyanimal").show();
                $("#sellanimal").show();
                $("#ABSselect").on("change", function () {
                    var a = $("#ABSselect").val();
                    if (a == "buy") {
                        $("#buyanimal").show();
                        $("#sellanimal").hide();
                    } else if (a == "sell") {
                        $("#buyanimal").hide();
                        $("#sellanimal").show();
                    } else if (a == "buyandsell") {
                        $("#buyanimal").show();
                        $("#sellanimal").show();
                    } else {
                        $("#buyanimal").hide();
                        $("#sellanimal").hide();
                    }
                })
            } else {
                $("#ABS").hide();
            }
        })
        //เก็บไว้
        $("#AKcheck").on("change", function () {
            var t = this.checked
            if (t == true) {
                $("#animalkeep").show();
            } else {
                $("#animalkeep").hide();
            }
        })
    } else {
        $("#liveselect").hide();
        $("#animal1").hide();
        $("#animal2").hide();
        $("#animal3").hide();
        $("#animal4").hide();
        $("#animal5").hide();
        $("#animaltuse").hide();
    }
});
//การซื้อขาย
$("#BScheck").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#BSselect").show();
        $("#bsValue").on("change", function () {
            var a = $("#bsValue").val();
            if (a == "buy") {
                $("#buy").show();
                $("#sell").hide();
            } else if (a == "sell") {
                $("#buy").hide();
                $("#sell").show();
            } else if (a == "buyandsell") {
                $("#buy").show();
                $("#sell").show();
            } else if (a == "") {
                $("#buy").hide();
                $("#sell").hide();
            }
            console.log(a)
        })
    } else {
        $("#BSselect").hide();
    }
})
//เก็บไว้
$("#keepcheck").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#keepselect").show();
    } else {
        $("#keepselect").hide();
    }
})

