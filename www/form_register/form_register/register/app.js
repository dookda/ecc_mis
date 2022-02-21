// let urid = sessionStorage.getItem('eecid');
// let urname = sessionStorage.getItem('eecname');
// let eecauth = sessionStorage.getItem('eecauth');
// $("#usrname").text(urname);
// $('#typeuser').val(eecauth)
// urid ? null : location.href = "./../../form_register/login/index.html";

sessionStorage.clear();

const url = "https://engrids.soc.cmu.ac.th/api";

function onLocationError(e) {
    console.log(e.message);
}

function refreshPage() {
    location.reload(true);
}

let getProv = () => {
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

$("#accountcheck").hide()
$('#tele').on("keyup", function () {
    let user = $("#tele").val()
    axios.post(url + "/profile-api/chkuser", { user }).then(r => {
        console.log(r);
        r.data.data[0].count !== '0' ? $("#accountcheck").show() : $("#accountcheck").hide()
    })
})

$('#user_name').on("input", function () {
    if (this.value == '') {
        $("#user_name").addClass("is-invalid")
        // console.log("false")
    } else {
        $("#user_name").removeClass("is-invalid")
        // console.log("true")
    }
})

$('#tele').on("input", function () {
    if (this.value == '') {
        $("#tele").addClass("is-invalid")
        console.log("false")
    } else {
        $("#tele").removeClass("is-invalid")
        console.log("true")
    }
})
$('#password').on("input", function () {
    if (this.value == '') {
        $("#password").addClass("is-invalid")
        // console.log("false")
    } else {
        $("#password").removeClass("is-invalid")
        // console.log("true")
    }
})
$('#password2').on("input", function () {
    if (this.value == '') {
        $("#password2").addClass("is-invalid")
        console.log("false")
    } else {
        $("#password2").removeClass("is-invalid")
        console.log("true")
    }
})
$('#email').on("input", function () {
    if (this.value == '') {
        $("#email").addClass("is-invalid")
        console.log("false")
    } else {
        $("#email").removeClass("is-invalid")
        console.log("true")
    }
})
$('#address').on("input", function () {
    if (this.value == '') {
        $("#address").addClass("is-invalid")
        console.log("false")
    } else {
        $("#address").removeClass("is-invalid")
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
$('#ocup').on("input", function () {
    if (this.value == '') {
        $("#ocup").addClass("is-invalid")
        console.log("false")
    } else {
        $("#ocup").removeClass("is-invalid")
        console.log("true")
    }
})
$('#sex').on("input", function () {
    if (this.value == '') {
        $("#sex").addClass("is-invalid")
        console.log("false")
    } else {
        $("#sex").removeClass("is-invalid")
        console.log("true")
    }
})
let sendData = () => {
    // e.preventDefault();
    if ($('#user_name').val() == "" || $('#tele').val() == "" || $('#password').val() == "" || $('#password2').val() == "" || $('#email').val() == "" || $('#address').val() == "" || $('#pro').val() == "" || $('#amp').val() == "" || $('#tam').val() == "" || $('#ocup').val() == "" || $('#sex').val() == "") {
        $("#errormodal").modal("show")
        if ($('#user_name').val() == "") {
            $("#user_name").addClass("is-invalid")
        }
        if ($('#tele').val() == "") {
            $("#tele").addClass("is-invalid")
        }
        if ($('#password').val() == "") {
            $("#password").addClass("is-invalid")
        }
        if ($('#password2').val() == "") {
            $("#password2").addClass("is-invalid")
        }
        if ($('#email').val() == "") {
            $("#email").addClass("is-invalid")
        }
        if ($('#address').val() == "") {
            $("#address").addClass("is-invalid")
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
        if ($('#ocup').val() == "") {
            $("#ocup").addClass("is-invalid")
        }
        if ($('#sex').val() == "") {
            $("#sex").addClass("is-invalid")
        }
    } else if ($('#user_name').val() !== "" || $('#tele').val() !== "" || $('#password').val() !== "" || $('#password2').val() !== "" || $('#email').val() !== "" || $('#address').val() !== "" || $('#pro').val() == "" || $('#amp').val() == "" || $('#tam').val() == "" || $('#ocup').val() == "" || $('#sex').val() == "") {

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
    }
};

let gotoLogin = () => {
    location.href = "./../login/index.html";
}

$("#passcheck").hide()
$("#password2").on("change", function () {
    $("#password2").val() == $("#password").val() ? $("#passcheck").hide() : $("#passcheck").show();
})

