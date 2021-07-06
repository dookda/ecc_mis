let urid = sessionStorage.getItem('id');
let urname = sessionStorage.getItem('name');
$("#usrname").text(urname);
urid ? null : location.href = "./../../form_register/login/index.html";

let userid;

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

const url = "https://eec-onep.online:3700";
// const url = 'http://localhost:3000';
let latlng = {
    lat: 13.305567,
    lng: 101.383101
};

let map = L.map('map', {
    center: latlng,
    zoom: 9
});

let dataurl;

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
    drawPolyline: false,
    drawRectangle: false,
    drawCircleMarker: false,
    cutPolygon: false
});

var idIW
var datageom
let geom = [];
let datlatlon = [];
let datlatlon02
let latlon = []
map.on('pm:create', e => {
    $('#valModal').modal({ backdrop: 'static', keyboard: false })
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
    datlatlon02 = ({
        "lat": pd[1],
        "lng": pd[0],
    })
    nearData(datlatlon02)
    latlon.push(
        pd[1],
        pd[0]
    )
    geom.push({
        "geom": e.layer.toGeoJSON(),
    });
    datageom = e.layer.toGeoJSON();
});

let data03
function confirmvalue() {
    var a = datlatlon[0]
    $('#valModal').modal("hide")
    $('#lat').val(a.lat);
    $('#lon').val(a.lng);
    data03 = ({
        latlng: datlatlon,
        geom: datageom,
        tambon: $('#tambon').val(),
        amphoe: $('#amphor').val(),
        province: $('#province').val()
    })


}

let nearData = async (e) => {
    let url = "https://eec-onep.online:3700";
    let res = await axios.post(url + '/eec-api/get-aqi-near', { geom: e });
    console.log(res.data.data[0]);
    var a = res.data.data[0]
    // AQI
    if (Number(a.aqi) <= 25) {
        $('#cardaqi').toggleClass("BG01");
    } else if (Number(a.aqi) <= 50) {
        $('#cardaqi').toggleClass("BG02");
    } else if (Number(a.aqi) <= 100) {
        $('#cardaqi').toggleClass("BG03");
    } else if (Number(a.aqi) <= 100) {
        $('#cardaqi').toggleClass("BG04");
    } else {
        $('#cardaqi').toggleClass("BG05");
    }
    //PM10
    if (Number(a.pm10) <= 54) {
        $('#cardpm10').toggleClass("BG01");
    } else if (Number(a.pm10) <= 154) {
        $('#cardpm10').toggleClass("BG02");
    } else if (Number(a.pm10) <= 254) {
        $('#cardpm10').toggleClass("BG03");
    } else if (Number(a.pm10) <= 354) {
        $('#cardpm10').toggleClass("BG04");
    } else {
        $('#cardpm10').toggleClass("BG05");
    }
    //PM2.5
    if (Number(a.pm25) <= 12) {
        $('#cardpm25').toggleClass("BG01");
    } else if (Number(a.pm25) <= 35.4) {
        $('#cardpm25').toggleClass("BG02");
    } else if (Number(a.pm25) <= 55.4) {
        $('#cardpm25').toggleClass("BG03");
    } else if (Number(a.pm25) <= 150.45) {
        $('#cardpm25').toggleClass("BG04");
    } else {
        $('#cardpm25').toggleClass("BG05");
    }

    $("#aqi").val(Number(a.aqi))
    $("#pm10").val(Number(a.pm10))
    $("#pm25").val(Number(a.pm25))
    $("#datetime").val(a.dt)

    $("#aqi").text(Number(a.aqi))
    $("#pm10").text(Number(a.pm10))
    $("#pm25").text(Number(a.pm25))
    $("#datetime").text(`วันที่ ${res.data.data[0].dt_} เวลา ${res.data.data[0].time_} น.`)
}

let refreshPage = () => {
    location.reload(true);
}

$('#imgfile').change(function (evt) {
    console.log(evt);
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
let feel1
let getfeel = (x, y, z) => {
    if (z == 1) {
        feel1 = y
        $("#verygood").removeAttr("style").toggleClass("BG01");
        $("#good").css("border", "none").removeClass("BG02");
        $("#medium").css("border", "none").removeClass("BG03");
        $("#bad").css("border", "none").removeClass("BG04");
        $("#badend").css("border", "none").removeClass("BG05");
    }
    if (z == 2) {
        feel1 = y
        $("#verygood").css("border", "none").removeClass("BG01");
        $("#good").removeAttr("style").toggleClass("BG02");
        $("#medium").css("border", "none").removeClass("BG03");
        $("#bad").css("border", "none").removeClass("BG04");
        $("#badend").css("border", "none").removeClass("BG05");
    }
    if (z == 3) {
        feel1 = y
        $("#verygood").css("border", "none").removeClass("BG01");
        $("#good").css("border", "none").removeClass("BG02");
        $("#medium").removeAttr("style").toggleClass("BG03");
        $("#bad").css("border", "none").removeClass("BG04");
        $("#badend").css("border", "none").removeClass("BG05");
    }
    if (z == 4) {
        feel1 = y
        $("#verygood").css("border", "none").removeClass("BG01");
        $("#good").css("border", "none").removeClass("BG02");
        $("#medium").css("border", "none").removeClass("BG03");
        $("#bad").removeAttr("style").toggleClass("BG04");
        $("#badend").css("border", "none").removeClass("BG05");
    }
    if (z == 5) {
        console.log(y)
        feel1 = y
        $("#verygood").css("border", "none").removeClass("BG01");
        $("#good").css("border", "none").removeClass("BG02");
        $("#medium").css("border", "none").removeClass("BG03");
        $("#bad").css("border", "none").removeClass("BG04");
        $("#badend").removeAttr("style").toggleClass("BG05");
    }
}


let datasick = [];
let data02 = [];
let getsick = (x, y, z) => {
    if (z == 1) {
        datasick.push({
            no: x,
            val: y
        })
        $("#no01").removeAttr("style").toggleClass("BG03");
        $("#no00").css("border", "none").removeClass("BG02");
    }
    else if (z == 2) {
        datasick.push({
            no: x,
            val: y
        })
        $("#no02").removeAttr("style").toggleClass("BG03");
        $("#no00").css("border", "none").removeClass("BG02");
    }
    else if (z == 3) {
        datasick.push({
            no: x,
            val: y
        })
        $("#no03").removeAttr("style").toggleClass("BG03");
        $("#no00").css("border", "none").removeClass("BG02");
    }
    else if (z == 4) {
        datasick.push({
            no: x,
            val: y
        })
        $("#no04").removeAttr("style").toggleClass("BG03");
        $("#no00").css("border", "none").removeClass("BG02");
    }
    else if (z == 5) {
        datasick.push({
            no: x,
            val: y
        })
        $("#no05").removeAttr("style").toggleClass("BG03");
        $("#no00").css("border", "none").removeClass("BG02");
    }
    else if (z == 6) {
        datasick.push({
            no: x,
            val: y
        })
        $("#no06").removeAttr("style").toggleClass("BG03");
        $("#no00").css("border", "none").removeClass("BG02");
    }
    else if (z == 7) {
        datasick.push({
            no: x,
            val: y
        })
        $("#no07").removeAttr("style").toggleClass("BG03");
        $("#no00").css("border", "none").removeClass("BG02");
    }
    else if (z == 8) {
        datasick.push({
            no: x,
            val: y
        })
        $("#no08").removeAttr("style").toggleClass("BG03");
        $("#no00").css("border", "none").removeClass("BG02");
    }
    else if (z == 9) {
        datasick.push({
            no: x,
            val: y
        })
        $("#no09").removeAttr("style").toggleClass("BG03");
        $("#no00").css("border", "none").removeClass("BG02");
    }
    else if (z == 10) {
        datasick.push({
            no: x,
            val: y
        })
        $("#no10").removeAttr("style").toggleClass("BG03");
        $("#no00").css("border", "none").removeClass("BG02");
    }
    else if (z == 11) {
        datasick.push({
            no: x,
            val: y
        })
        $("#no11").removeAttr("style").toggleClass("BG03");
        $("#no00").css("border", "none").removeClass("BG02");
    }
    else if (z == 12) {
        datasick.push({
            no: x,
            val: y
        })
        $("#no12").removeAttr("style").toggleClass("BG03");
        $("#no00").css("border", "none").removeClass("BG02");
    }
    else if (z == 13) {
        datasick.push({
            no: x,
            val: y
        })
        $("#no13").removeAttr("style").toggleClass("BG03");
        $("#no00").css("border", "none").removeClass("BG02");
    }
    else if (z == 14) {
        datasick.push({
            no: x,
            val: y
        })
        $("#no14").removeAttr("style").toggleClass("BG03");
        $("#no00").css("border", "none").removeClass("BG02");
    }
    else if (z == 15) {
        datasick.push({
            no: x,
            val: y
        })
        $("#no15").removeAttr("style").toggleClass("BG03");
        $("#no00").css("border", "none").removeClass("BG02");
    }
    else if (z == 16) {
        datasick.push({
            no: x,
            val: y
        })
        $("#no16").removeAttr("style").toggleClass("BG03");
        $("#no00").css("border", "none").removeClass("BG02");
    }
    else if (z == 17) {
        datasick.push({
            no: x,
            val: y
        })
        $("#no17").removeAttr("style").toggleClass("BG03");
        $("#no00").css("border", "none").removeClass("BG02");
    }
    else if (z == 18) {
        datasick.push({
            no: x,
            val: y
        })
        $("#no18").removeAttr("style").toggleClass("BG03");
        $("#no00").css("border", "none").removeClass("BG02");
    }
    else if (z == 19) {
        datasick.push({
            no: x,
            val: y
        })
        $("#no19").removeAttr("style").toggleClass("BG03");
        $("#no00").css("border", "none").removeClass("BG02");
    }
    else if (z == 20) {
        datasick.push({
            no: x,
            val: y
        })
        $("#no20").removeAttr("style").toggleClass("BG03");
        $("#no00").css("border", "none").removeClass("BG02");
    }
    else if (z == 21) {
        datasick.push({
            no: x,
            val: y
        })
        $("#no21").removeAttr("style").toggleClass("BG03");
        $("#no00").css("border", "none").removeClass("BG02");
    }
    else if (z == 22) {
        datasick.push({
            no: x,
            val: y
        })
        $("#no22").removeAttr("style").toggleClass("BG03");
        $("#no00").css("border", "none").removeClass("BG02");
    } else if (z == 0) {
        datasick.push({
            no: x,
            val: y
        })
        // console.log(z)
        $("#no00").removeAttr("style").toggleClass("BG02");
        $("#no01").css("border", "none").removeClass("BG03");
        $("#no02").css("border", "none").removeClass("BG03");
        $("#no03").css("border", "none").removeClass("BG03");
        $("#no04").css("border", "none").removeClass("BG03");
        $("#no05").css("border", "none").removeClass("BG03");
        $("#no06").css("border", "none").removeClass("BG03");
        $("#no07").css("border", "none").removeClass("BG03");
        $("#no08").css("border", "none").removeClass("BG03");
        $("#no09").css("border", "none").removeClass("BG03");
        $("#no10").css("border", "none").removeClass("BG03");
        $("#no11").css("border", "none").removeClass("BG03");
        $("#no12").css("border", "none").removeClass("BG03");
        $("#no13").css("border", "none").removeClass("BG03");
        $("#no14").css("border", "none").removeClass("BG03");
        $("#no15").css("border", "none").removeClass("BG03");
        $("#no16").css("border", "none").removeClass("BG03");
        $("#no17").css("border", "none").removeClass("BG03");
        $("#no18").css("border", "none").removeClass("BG03");
        $("#no19").css("border", "none").removeClass("BG03");
        $("#no20").css("border", "none").removeClass("BG03");
        $("#no21").css("border", "none").removeClass("BG03");
        $("#no22").css("border", "none").removeClass("BG03");
    }
}

function saveData() {
    let data01
    let sick1, sick2, sick3, sick4, sick5, sick6, sick7, sick8
    var sn1 = document.getElementById('sickness01');
    if (sn1.checked == true) {
        sick1 = $('#sickness01').val()
    } else { sick1 = "Have" }

    var sn2 = document.getElementById('sickness02');
    if (sn2.checked == true) {
        sick2 = $('#sickness02').val()
    } else { sick2 = "Havenot" }

    var sn3 = document.getElementById('sickness03');
    if (sn3.checked == true) {
        sick3 = $('#sickness03').val()
    } else { sick3 = "Havenot" }

    var sn4 = document.getElementById('sickness04');
    if (sn4.checked == true) {
        sick4 = $('#sickness04').val()
    } else { sick4 = "Havenot" }

    var sn5 = document.getElementById('sickness05');
    if (sn5.checked == true) {
        sick5 = $('#sickness05').val()
    } else { sick5 = "Havenot" }

    var sn6 = document.getElementById('sickness06');
    if (sn6.checked == true) {
        sick6 = $('#sickness06').val()
    } else { sick6 = "Havenot" }

    var sn7 = document.getElementById('sickness07');
    if (sn7.checked == true) {
        sick7 = $('#sickness07').val()
    } else { sick7 = "Havenot" }

    var sn8 = document.getElementById('sickness00');
    if (sn8.checked == true) {
        sick8 = $('#sickness08').val()
    } else { sick8 = "Havenot" }

    datasick.map(async (x) => {
        if (x.no == 01) {
            data02.push({ no01: x.val })
        }
        if (x.no == 02) {
            data02.push({ no02: x.val })
        }
        if (x.no == 03) {
            data02.push({ no03: x.val })
        }
        if (x.no == 04) {
            data02.push({ no04: x.val })
        }
        if (x.no == 05) {
            data02.push({ no05: x.val })
        }
        if (x.no == 06) {
            data02.push({ no06: x.val })
        }
        if (x.no == 07) {
            data02.push({ no07: x.val })
        }
        if (x.no == 08) {
            data02.push({ no08: x.val })
        }
        if (x.no == 09) {
            data02.push({ no09: x.val })
        }
        if (x.no == 10) {
            data02.push({ no10: x.val })
        }
        if (x.no == 11) {
            data02.push({ no11: x.val })
        }
        if (x.no == 12) {
            data02.push({ no12: x.val })
        }
        if (x.no == 13) {
            data02.push({ no13: x.val })
        }
        if (x.no == 14) {
            data02.push({ no14: x.val })
        }
        if (x.no == 15) {
            data02.push({ no15: x.val })
        }
        if (x.no == 16) {
            data02.push({ no16: x.val })
        }
        if (x.no == 17) {
            data02.push({ no17: x.val })
        }
        if (x.no == 18) {
            data02.push({ no18: x.val })
        }
        if (x.no == 19) {
            data02.push({ no19: x.val })
        }
        if (x.no == 20) {
            data02.push({ no20: x.val })
        }
        if (x.no == 21) {
            data02.push({ no21: x.val })
        }
        if (x.no == 22) {
            data02.push({ no22: x.val })
        }
        if (x.no == 00) {
            data02.push({
                no01: "Havenot",
                no02: "Havenot",
                no03: "Havenot",
                no04: "Havenot",
                no05: "Havenot",
                no06: "Havenot",
                no07: "Havenot",
                no08: "Havenot",
                no09: "Havenot",
                no10: "Havenot",
                no12: "Havenot",
                no13: "Havenot",
                no14: "Havenot",
                no15: "Havenot",
                no16: "Havenot",
                no17: "Havenot",
                no18: "Havenot",
                no19: "Havenot",
                no20: "Havenot",
                no21: "Havenot",
                no22: "Havenot"
            })
        }
    })

    data01 = [{
        id_date: Date.now(),
        id_user: $('#userId').val(),

        // gender: $('#gender').val(),
        // age: $('#age').val(),
        // working: $('#working').val(),
        // timearea: $('#timearea').val(),
        feeling: feel1,
        symptom: [
            { sym01: sick1 },
            { sym02: sick2 },
            { sym03: sick3 },
            { sym04: sick4 },
            { sym05: sick5 },
            { sym06: sick6 },
            { sym07: sick7 },
            { sym08: sick8 }
        ],

        sickcheck: data02,

        lat: latlon[0],
        lng: latlon[1],
        geom: datageom,

        tambon: $('#tambon').val(),
        amphoe: $('#amphor').val(),
        province: $('#province').val(),
        aqi: $('#aqi').val(),
        pm10: $('#pm10').val(),
        pm25: $('#pm25').val(),
        datepm: $("#datetime").val(),
        details: $('#detail').val(),
        datreport: $('#redate').val(),
        dattime: $('#retime').val(),
        img: dataurl ? dataurl : dataurl = "",
    }]
    // console.log(data02)
    // console.log(feel1)
    sendData(data01)
}

let sendData = (data) => {
    const obj = {
        data: data
    }
    console.log(obj)
    // var url = "http://localhost:3000"
    // var url = "https://eec-onep.online:3700";
    $.post(url + "/form_ap/insert", obj).done((r) => {
        r.data.data == "success"
    })
}

