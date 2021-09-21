// let urid = sessionStorage.getItem('eecid');
// let urname = sessionStorage.getItem('eecname');
// let eecauth = sessionStorage.getItem('eecauth');
// $("#usrname").text(urname);
// $('#typeuser').val(eecauth)
// urid ? null : location.href = "./../../form_register/login/index.html";

sessionStorage.clear();

// var url = 'http://localhost:3700';
// var url = "https://72dd718b2b77.ngrok.io";
var url = 'https://eec-onep.online:3700';

function onLocationError(e) {
    console.log(e.message);
}

function refreshPage() {
    location.reload(true);
}

let getProv = () => {
    axios.get(url + "/eec-api/get-th-prov").then(r => {
        console.log(r)
        $("#pro").empty()
        $("#amp").empty()
        $("#tam").empty()
        $("#pro").append(`<option value=""></option>`)
        r.data.data.map(i => {
            $("#pro").append(`<option value="${i.pv_idn}">${i.pro_name}</option>`)
        })
    })
}
getProv()

let getAmp = (e) => {
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
            // workshop: $('input[name="workshop"]:checked').val()
        }
    }

    $.post(url + '/profile-api/register', obj).done(async (res) => {
        $('#okmodal').modal('show');
    })
    return false;
};

let gotoLogin = () => {
    location.href = "./../login/index.html";
}

$("#passcheck").hide()
$("#password2").on("change", function () {
    $("#password2").val() == $("#password").val() ? $("#passcheck").hide() : $("#passcheck").show();
})

