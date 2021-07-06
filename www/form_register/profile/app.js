let urid = sessionStorage.getItem('id');
let urname = sessionStorage.getItem('name');
let eecauth = sessionStorage.getItem('eecauth');
let fromadmin = sessionStorage.getItem('fromadmin');
$("#usrname").text(urname);

urid ? null : location.href = "./../../form_register/login/index.html";

let pfid;
let pfname;
// console.log(eecauth);
if (fromadmin) {
    pfid = sessionStorage.getItem('pfid');
    pfname = sessionStorage.getItem('pfname');

    $("#btnid").append(` <button type="button" class="btn btn-secondary" id="refresh" onclick="gotoAdmin()">
        <span><i class="bi bi-arrow-clockwise"></i>&nbsp;กลับหน้าจัดการผู้ใช้</span>
    </button>`);
    sessionStorage.removeItem('fromadmin');
} else {
    pfid = urid;
    pfname = urname;
    $('#autharea').hide();
    eecauth == 'admin' ? $("#btnid").append(` <button type="button" class="btn btn-secondary" id="refresh" onclick="gotoAdmin()">
        <span><i class="bi bi-arrow-clockwise"></i>&nbsp;กลับหน้าจัดการผู้ใช้</span>
        </button>`) : null;
}

// var url = 'http://localhost:3700';
// var url = "https://72dd718b2b77.ngrok.io";
var url = 'https://eec-onep.online:3700';

function onLocationError(e) {
    console.log(e.message);
}

function refreshPage() {
    location.reload(true);
}

let getData = async () => {
    console.log(pfid, pfname);
    let obj = { regid: await pfid }
    axios.post(url + "/profile-api/getprofile", obj).then(async (r) => {
        console.log(r);
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
    console.log(x);
    let a = 0;
    $("#detail").empty();
    if (!x) {
        console.log(x);
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

    a > 0 ? $('#errormodal').modal('show') : sendData();
}

let sendData = () => {
    // e.preventDefault();
    const obj = {
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
            ocup: $('#ocup').val(),
            sex: $('#sex').val(),
            address: $('#address').val(),
            auth: $('#auth').val()
        }
    }

    $.post(url + '/profile-api/updateprofile', obj).done(async (res) => {
        $('#okmodal').modal('show');
    })
    return false;
};

let gotoLogin = () => {
    location.href = "./../login/index.html";
}

let gotoAdmin = () => {
    eecauth == 'admin' ? location.href = "./../admin/index.html" : getProv();
}

//init
getProv()

