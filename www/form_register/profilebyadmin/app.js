let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let fromadmin = sessionStorage.getItem('fromadmin');
$("#usrname").text(urname);

urid ? null : location.href = "./../../form_register/login/index.html";
eecauth == "admin" ? null : location.href = "./../../form_register/login/index.html";

if (eecauth == 'admin') {
    $("#btnid").append(` <button type="button" class="btn btn-light" id="refresh" onclick="gotoAdmin()">
        <span><i class="bi bi-arrow-clockwise"></i>&nbsp;จัดการผู้ใช้</span>
    </button>`);
}

let pfid = sessionStorage.getItem('pfid');
let pfname = sessionStorage.getItem('pfname');

// console.log(fromadmin);
// if (fromadmin) {
//     pfid = sessionStorage.getItem('pfid');
//     pfname = sessionStorage.getItem('pfname');

//     $("#btnid").append(` <button type="button" class="btn btn-secondary" id="refresh" onclick="gotoAdmin()">
//         <span><i class="bi bi-arrow-clockwise"></i>&nbsp;กลับหน้าจัดการผู้ใช้</span>
//     </button>`);
//     sessionStorage.removeItem('fromadmin');
// } else {
//     pfid = urid;
//     pfname = urname;
//     $('#autharea').hide();
//     $('#approvedarea').hide();
//     eecauth == 'admin' ? $("#btnid").append(` <button type="button" class="btn btn-secondary" id="refresh" onclick="gotoAdmin()">
//         <span><i class="bi bi-arrow-clockwise"></i>&nbsp;กลับหน้าจัดการผู้ใช้</span>
//         </button>`) : null;
// }

var url = 'http://localhost:3700';
// var url = "https://72dd718b2b77.ngrok.io";
// var url = 'https://eec-onep.online:3700';

function onLocationError(e) {
    console.log(e.message);
}

function refreshPage() {
    location.reload(true);
}

let getOcup = () => {
    $("#ocup").empty()
    axios.post(url + "/profile-api/getocup").then(r => {
        $("#ocup").append(`<option ></option>`)
        r.data.data.map(i => {
            $("#ocup").append(`<option value="${i.ocup}">${i.ocup}</option>`)
        })
        $("#ocup").append(`<option value="อื่นๆ">อื่นๆ (โปรดระบุ)</option>`)
    })
}
getOcup()

let isApproved;
let getData = async () => {
    // console.log(pfid, pfname);
    let obj = { regid: await pfid }
    axios.post(url + "/profile-api/getprofile", obj).then(async (r) => {
        // console.log(r);
        getAmp(await r.data.data[0].pro);
        getTam(await r.data.data[0].amp);

        setTimeout(() => {
            $('#pro').val(r.data.data[0].pro);
            $('#amp').val(r.data.data[0].amp);
            $('#tam').val(r.data.data[0].tam);
        }, 1000)

        $('#user_name').val(r.data.data[0].usrname);
        $('#tele').val(r.data.data[0].tel);
        $('#password').val(r.data.data[0].pass);
        $('#email').val(r.data.data[0].email);
        $('#pro_name').val(r.data.data[0].pro_name);
        $('#amp_name').val(r.data.data[0].amp_name);
        $('#tam_name').val(r.data.data[0].tam_name);
        $('#ocup').val(r.data.data[0].ocup);
        $('#sex').val(r.data.data[0].sex);
        $('#address').val(r.data.data[0].address);
        $('#auth').val(r.data.data[0].auth);
        $('#dt').val(r.data.data[0].dt);

        $("#preview").attr("src", r.data.data[0].img);
        $("#imgfile").val("");
        r.data.data[0].approved == 'ตรวจสอบแล้ว' ? $("#approved").prop("checked", true) : $("#approved").prop("checked", false);
        isApproved = r.data.data[0].approved;
        r.data.data[0].f_water_lev == 'true' ? $("#f_water_lev").prop("checked", true) : $("#f_water_lev").prop("checked", false);
        r.data.data[0].f_wastewater == 'true' ? $("#f_wastewater").prop("checked", true) : $("#f_wastewater").prop("checked", false);
        r.data.data[0].f_water_surface == 'true' ? $("#f_water_surface").prop("checked", true) : $("#f_water_surface").prop("checked", false);
        r.data.data[0].f_water_qua == 'true' ? $("#f_water_qua").prop("checked", true) : $("#f_water_qua").prop("checked", false);
        r.data.data[0].f_seawater_qua == 'true' ? $("#f_seawater_qua").prop("checked", true) : $("#f_seawater_qua").prop("checked", false);
        r.data.data[0].f_gw == 'true' ? $("#f_gw").prop("checked", true) : $("#f_gw").prop("checked", false);
        r.data.data[0].f_air == 'true' ? $("#f_air").prop("checked", true) : $("#f_air").prop("checked", false);
        r.data.data[0].f_green == 'true' ? $("#f_green").prop("checked", true) : $("#f_green").prop("checked", false);
        r.data.data[0].f_biodiversity == 'true' ? $("#f_biodiversity").prop("checked", true) : $("#f_biodiversity").prop("checked", false);
        r.data.data[0].f_familyforest == 'true' ? $("#f_familyforest").prop("checked", true) : $("#f_familyforest").prop("checked", false);
        r.data.data[0].f_organic == 'true' ? $("#f_organic").prop("checked", true) : $("#f_organic").prop("checked", false);
        r.data.data[0].f_garbage == 'true' ? $("#f_garbage").prop("checked", true) : $("#f_garbage").prop("checked", false);
    })
}

let getProv = async () => {
    axios.get(url + "/eec-api/get-th-prov").then(r => {
        // console.log(r)
        $("#pro").empty()
        $("#amp").empty()
        $("#tam").empty()
        $("#pro").append(`<option value=""></option>`)
        r.data.data.map(i => {
            $("#pro").append(`<option value="${i.pv_idn}">${i.pro_name}</option>`)
        })
    })
    await getData();
}

let getAmp = (e) => {
    // console.log(e);
    axios.get(url + "/eec-api/get-th-amp/" + e).then(r => {
        // console.log(r);
        $("#amp").empty()
        $("#tam").empty()
        $("#amp").append(`<option value=""></option>`)
        r.data.data.map(i => {
            $("#amp").append(`<option value="${i.ap_idn}">${i.amp_name}</option>`)
        })
    })
}

let getTam = (e) => {
    axios.get(url + "/eec-api/get-th-tam/" + e).then(r => {
        // console.log(r);
        $("#tam").empty()
        $("#tam").append(`<option value=""></option>`)
        r.data.data.map(i => {
            $("#tam").append(`<option value="${i.tb_idn}">${i.tam_name}</option>`)
        })
    })
}

let getTamOne = (e) => {
    axios.get(url + "/eec-api/get-th-onetam/" + e).then(r => {
        r.data.data.map(i => {
            // console.log(i);
            $("#pro_name").val(i.pro_name);
            $("#amp_name").val(i.amp_name);
            $("#tam_name").val(i.tam_name);
        })
    })
}

let checkdata = async () => {
    var x = document.getElementById("user_name").value;
    // console.log(x);
    let a = 0;
    $("#detail").empty();
    if (!x) {
        // console.log(x);
        $("#detail").append(`<span> ชื่อ </span>`);
        a += 1
    }

    if (!$('#tam_name').val()) {
        $("#detail").append(`<span> ที่อยู่ ตำบล อำเภอ จังหวัด</span>`);
        a += 1
    }

    if (!$('#tele').val()) {
        $("#detail").append(`<span> เบอร์โทรศัพท์</span>`);
        a += 1
    }

    if (!$('#password').val()) {
        $("#detail").append(`<span> รหัสผ่าน</span>`);
        a += 1
    }


    if (!$('#email').val()) {
        $("#detail").append(`<span> email</span>`);
        a += 1
    }

    a > 0 ? $('#errormodal').modal('show') : sendData();
}

$("#ocupother").hide()
$("#ocup").on("change", () => {
    $("#ocup").val() !== "อื่นๆ" ? $("#ocupother").hide() : $("#ocupother").show();
})

let sendData = () => {

    // e.preventDefault();
    let obj = {
        regid: pfid,
        data: {
            // userid: userid,
            usrname: $('#user_name').val(),
            tel: $('#tele').val(),
            pass: $('#password').val(),
            email: $('#email').val() ? $('#email').val() : '-',
            pro_name: $('#pro_name').val(),
            amp_name: $('#amp_name').val(),
            tam_name: $('#tam_name').val(),
            pro: $('#pro').val(),
            amp: $('#amp').val(),
            tam: $('#tam').val(),
            ocup: $("#ocup").val() !== "อื่นๆ" ? $("#ocup").val() : $("#ocupother").val(),
            sex: $('#sex').val(),
            address: $('#address').val(),
            auth: $('#auth').val(),
            approved: $("#approved").prop("checked") == true ? 'ตรวจสอบแล้ว' : 'ยังไม่ได้ตรวจสอบ',
            f_water_lev: $("#f_water_lev").prop("checked") == true ? 'true' : 'false',
            f_wastewater: $("#f_wastewater").prop("checked") == true ? 'true' : 'false',
            f_water_surface: $("#f_water_surface").prop("checked") == true ? 'true' : 'false',
            f_water_qua: $("#f_water_qua").prop("checked") == true ? 'true' : 'false',
            f_seawater_qua: $("#f_seawater_qua").prop("checked") == true ? 'true' : 'false',
            f_gw: $("#f_gw").prop("checked") == true ? 'true' : 'false',
            f_air: $("#f_air").prop("checked") == true ? 'true' : 'false',
            f_green: $("#f_green").prop("checked") == true ? 'true' : 'false',
            f_biodiversity: $("#f_biodiversity").prop("checked") == true ? 'true' : 'false',
            f_familyforest: $("#f_familyforest").prop("checked") == true ? 'true' : 'false',
            f_organic: $("#f_organic").prop("checked") == true ? 'true' : 'false',
            f_garbage: $("#f_garbage").prop("checked") == true ? 'true' : 'false'
        }
    }

    console.log(obj);
    $.post(url + '/profile-api/updateprofile', obj).done(async (res) => {
        $('#okmodal').modal('show');
        if (eecauth == 'admin') {
            sendAlertMail(document.getElementById("isApproved").value, obj.data.approved, obj.data.email, obj.data.usrname)
        }
    })

    return false;
};

let sendAlertMail = (oldVal, newVal, email, name) => {

    if (oldVal !== newVal && newVal == 'ตรวจสอบแล้ว') {
        // console.log(oldVal, newVal, email, name);
        $.post(url + '/profile-api/approvedmail', { email, name }).done(r => console.log(r))
    }
}

let dataurl;
$("#imgfile").change(async () => {
    var filesToUploads = document.getElementById('imgfile').files;
    var file = filesToUploads[0];
    var reader = new FileReader();

    reader.onloadend = (e) => {
        let imageOriginal = reader.result;
        resizeImage(file);
        // document.getElementById('preview').src = imageOriginal;
    }
    reader.readAsDataURL(file);

    setTimeout(() => {
        // console.log(dataurl);
        axios.post(url + "/profile-api/updateimgprofile", {
            regid: pfid,
            img: dataurl
        }).then(r => {
            getData();
        })
    }, 1000)

});

let resizeImage = (file) => {
    var maxW = 600;
    var maxH = 600;
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var img = document.createElement('img');
    var result = '';
    img.onload = function () {
        var iw = img.width;
        var ih = img.height;
        var scale = Math.min((maxW / iw), (maxH / ih));
        var iwScaled = iw * scale;
        var ihScaled = ih * scale;
        canvas.width = iwScaled;
        canvas.height = ihScaled;
        context.drawImage(img, 0, 0, iwScaled, ihScaled);
        result += canvas.toDataURL('image/jpeg', 0.5);
        dataurl = result;
        // document.getElementById('rez').src = that.imageResize;
    }
    img.src = URL.createObjectURL(file);
}

let gotoLogin = () => {
    location.href = "./../login/index.html";
}

let gotoAdmin = () => {
    eecauth == 'admin' ? location.href = "./../admin/index.html" : getProv();
}

//init
getProv()

