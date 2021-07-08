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

let gotoInput = (id, name, auth, aproved) => {
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('eecauth', auth);
    location.href = "./../../input_eec.html";
}

let loginWithUsername = (e) => {
    e.preventDefault();
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
            console.log(r.data.data[0].approved);
            if (r.data.data[0].approved == 'ตรวจสอบแล้ว') {
                let regid = r.data.data[0].regid;
                let usrname = r.data.data[0].usrname;
                let auth = r.data.data[0].auth;
                gotoInput(regid, usrname, auth);
            } else {
                $("#detail").empty();
                $("#detail").append(`การลงทะเบียนของท่านอยู่ระหว่างตรวจสอบข้อมูล`);
                $('#errormodal').modal('show');
            }
        } else {
            $("#detail").empty();
            $("#detail").append(`ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง`);
            $('#errormodal').modal('show');
        }
    })
}


