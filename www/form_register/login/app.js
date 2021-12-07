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

let gotoInput = (id, name, auth, f_water_lev, f_wastewater, f_water_surface, f_water_qua, f_seawater_qua, f_gw, f_air, f_green, f_biodiversity, f_familyforest, f_organic, f_garbage) => {
    sessionStorage.setItem('eecid', id);
    sessionStorage.setItem('eecname', name);
    sessionStorage.setItem('eecauth', auth);
    sessionStorage.setItem('eecviewuser', "view");

    sessionStorage.setItem('f_water_lev', f_water_lev);
    sessionStorage.setItem('f_wastewater', f_wastewater);
    sessionStorage.setItem('f_water_surface', f_water_surface);
    sessionStorage.setItem('f_water_qua', f_water_qua);
    sessionStorage.setItem('f_seawater_qua', f_seawater_qua);
    sessionStorage.setItem('f_gw', f_gw);
    sessionStorage.setItem('f_air', f_air);
    sessionStorage.setItem('f_green', f_green);
    sessionStorage.setItem('f_biodiversity', f_biodiversity);
    sessionStorage.setItem('f_familyforest', f_familyforest);
    sessionStorage.setItem('f_organic', f_organic);
    sessionStorage.setItem('f_garbage', f_garbage);

    location.href = "./../../index.html";
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

        console.log(r.data);
        if (r.data.data.length > 0) {
            if (r.data.data[0].approved == 'ตรวจสอบแล้ว') {
                let regid = r.data.data[0].regid;
                let usrname = r.data.data[0].usrname;
                let auth = r.data.data[0].auth;

                let f_water_lev = r.data.data[0].f_water_lev;
                let f_wastewater = r.data.data[0].f_wastewater;
                let f_water_surface = r.data.data[0].f_water_surface;
                let f_water_qua = r.data.data[0].f_water_qua;
                let f_seawater_qua = r.data.data[0].f_seawater_qua;
                let f_gw = r.data.data[0].f_gw;
                let f_air = r.data.data[0].f_air;
                let f_green = r.data.data[0].f_green;
                let f_biodiversity = r.data.data[0].f_biodiversity;
                let f_familyforest = r.data.data[0].f_familyforest;
                let f_organic = r.data.data[0].f_organic;
                let f_garbage = r.data.data[0].f_garbage;

                gotoInput(regid, usrname, auth, f_water_lev, f_wastewater, f_water_surface, f_water_qua, f_seawater_qua, f_gw, f_air, f_green, f_biodiversity, f_familyforest, f_organic, f_garbage);
                // console.log(regid, usrname, auth, f_water_lev, f_wastewater, f_water_surface, f_water_qua, f_seawater_qua, f_gw, f_air, f_green, f_biodiversity, f_familyforest, f_organic, f_garbage)
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

let resetEmail = () => {
    $("#resetemail").modal('show');
}

let gotoResetpass = () => {
    let obj = { email: $("#existemail").val() }
    axios.post(url + "/profile-api/resetmail", obj).then(r => {
        console.log(r);
        $("#resetemail").modal('hide');
        $("#responsemodal").modal('show');
        $("#res").html(r.data.data)
    })
}
