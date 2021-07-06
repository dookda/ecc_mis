// var url = 'http://localhost:3700';
// var url = "https://72dd718b2b77.ngrok.io";
var url = 'https://eec-onep.online:3700';

sessionStorage.clear();

function onLocationError(e) {
    console.log(e.message);
}

function refreshPage() {
    location.reload(true);
}

let gotoRegister = () => {
    location.href = "./../register/index.html";
}

let gotoInput = (id, name, auth) => {
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('eecauth', auth);
    location.href = "./../../input_eec.html";
}

let loginWithUsername = () => {
    let a = 0;
    if (!$("#usrname").val() || !$("#password").val()) {
        $("#detail").empty();
        $("#detail").append(`กรุณาระบุหมายเลขโทรศัพท์และรหัสผ่าน`);
        $('#errormodal').modal('show');
    } else {
        sendData()
    }
}

let sendData = () => {
    let obj = {
        usrname: $("#usrname").val(),
        pass: $("#password").val()
    }
    axios.post(url + "/profile-api/userlogin", obj).then(r => {
        if (r.data.data.length > 0) {
            gotoInput(r.data.data[0].regid, r.data.data[0].usrname, r.data.data[0].auth)
        } else {
            $("#detail").empty();
            $("#detail").append(`ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง`);
            $('#errormodal').modal('show');
        }
    })
}


