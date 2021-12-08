let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let fromadmin = sessionStorage.getItem('fromadmin');
// $("#usrname").text(urname);

urid ? null : location.href = "./../../form_register/login/index.html";

// if (eecauth == 'admin') {
//     $("#usrname").append(`<a class="dropdown-toggle" href="#" data-toggle="dropdown">
//     <i class="bi bi-person-square"></i>&nbsp;<span >${urname}</span></a>
//     <div class="dropdown-menu">
//         <a class="dropdown-item" href="./../admin/index.html">
//         <i class="bi bi-tools"></i>&nbsp;จัดการผู้ใช้</a>
//     </div>`)
// } else {
//     $("#usrname").append(`<a href="./../../form_register/profile/index.html">
//         <i class="bi bi-person-square"></i>&nbsp;<span id="usrname"></span>
//     </a>`)
// }

if (eecauth == "admin") {
    $("#usermenu").append(`
        <li> <a class="dropdown-toggle" href="#" data-toggle="dropdown">
            <i class="bi bi-tools"></i>&nbsp;<span >จัดการข้อมูล</span></a>
            <div class="dropdown-menu">
                <a class="dropdown-item" href="./../admin/index.html">
                <i class="bi bi-pencil-square"></i>&nbsp;จัดการข้อมูลผู้ใช้</a>
                <a class="dropdown-item" href="./../../form_forecast/add/index.html">
                <i class="bi bi-pencil-square"></i>&nbsp;นำเข้าข้อมูลการคาดสถานณ์สิ่งแวดล้อม</a>
            </div></li>
        <li><a href=""><i class="bi bi-person-square"></i>&nbsp;<span>${urname}</span></a></li>
        <li><a href="./../../form_register/login/index.html"><i class="bi bi-box-arrow-right"></i>
                            ออกจากระบบ</a></li>
        `)
} else {
    $("#usermenu").append(`<li><a href="" ><i class="bi bi-person-square"></i>&nbsp;<span >${urname}</span>></a></li>
    <li><a href="./../../form_register/login/index.html"><i class="bi bi-box-arrow-right"></i>ออกจากระบบ</a></li>`)
}

// var url = 'http://localhost:3700';
// var url = "https://72dd718b2b77.ngrok.io";
var url = 'https://eec-onep.online/api';

function onLocationError(e) {
    console.log(e.message);
}

function refreshPage() {
    location.reload(true);
}

let isApproved;

let getData = async () => {
    let obj = { regid: urid }
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
        // $('#auth').val(r.data.data[0].auth);
        $('#dt').val(r.data.data[0].dt);

        $("#preview").attr("src", r.data.data[0].img);
        $("#imgfile").val("");
    })
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
    axios.get(url + "/eec-api/get-th-amp/" + e).then(r => {
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
        $("#detail").append(`<span> ชื่อผู้ใช้ (Account) </span>`);
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
        regid: urid,
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
            address: $('#address').val()
        }
    }

    // console.log(obj);
    $.post(url + '/profile-api/updateprofile', obj).done(async (res) => {
        $('#okmodal').modal('show');
    })

    return false;
};

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

