let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let Accept = sessionStorage.getItem('accept');
// urid ? null : location.href = "./../../form_register/login/index.html";
$("#usr1").hide()
$("#usr2").hide()

console.log(eecauth);

if (Accept || eecauth) {
    $('.toast').toast('hide')
} else {
    $('.toast').toast('show')
}
let setAccept
$('#btnAccept').click(() => {
    $('.toast').toast('hide')
    setAccept = sessionStorage.setItem('accept', 'Yes');
})

if (urname !== null) {
    $("#usr1").show();
    $("#usr2").show();
    $("#login").hide();
    $("#usrname").text(urname);
}
// console.log(eecauth);

$("#cardwc").on("click", function () {
    $("#cardwaterA").hide()
    $("#cardwaterB").show()
})
$("#cardwc").mouseleave(function () {
    $("#cardwaterA").show()
    $("#cardwaterB").hide()
})
$("#cardqc").on("click", function () {
    $("#cardqcA").hide()
    $("#cardqcB").show()
})
$("#cardqc").mouseleave(function () {
    $("#cardqcA").show()
    $("#cardqcB").hide()
})
$("#cardbio").on("click", function () {
    $("#cardbioA").hide()
    $("#cardbioB").show()
})
$("#cardbio").mouseleave(function () {
    $("#cardbioA").show()
    $("#cardbioB").hide()
})
$("#cardother").on("click", function () {
    $("#cardotherA").hide()
    $("#cardotherB").show()
})
$("#cardother").mouseleave(function () {
    $("#cardotherA").show()
    $("#cardotherB").hide()
})
$('#tabmenu').mouseleave(function () {
    $("#cardwaterB").hide()
    $("#cardqcB").hide()
    $("#cardbioB").hide()
    $("#cardotherB").hide()
})

// if (eecauth == null) {
//     //โมดูลชีวภาพ 
//     $('#cardbio').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3" });
//     // $('#cardbio1').css("pointer-events", "none");
//     // $('#cardbio2').css("pointer-events", "none");
//     // $('#cardbio3').css("pointer-events", "none");

//     //โมดูลปริมาณน้ำ
//     $('#cardwc2').css("pointer-events", "none");
//     //โมดูลคุณภาพน้ำ
//     $('#cardqc1').css("pointer-events", "none");
//     $('#cardqc2').css("pointer-events", "none");
//     $('#cardqc3').css("pointer-events", "none");
//     //โมดูลอื่นๆ
//     $('#cardother').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3" });
//     $('#cardother2').css("pointer-events", "none");
// }
//โมดูลปริมาณน้ำ
$('#cardwc2').on('click', function () {
    if (eecauth == 'admin') {
        window.location.href = './form_wastewater/report_admin/index.html'
    } else if (eecauth == 'user' || eecauth == "office") {

        let f_wastewater = sessionStorage.getItem('f_wastewater');
        f_wastewater == 'false' ? window.location.href = './form_wastewater/report_user/index.html' : window.location.href = './form_wastewater/report/index.html'
    } else {
        window.location.href = "./../../form_register/login/index.html"
    }

})
//โมดูลคุณภาพน้ำ
$('#cardqc1').on('click', function () {
    if (eecauth == 'admin') {
        window.location.href = './form_water_surface/report_admin/index.html'
    } else if (eecauth == 'user' || eecauth == "office") {
        let f_water_surface = sessionStorage.getItem('f_water_surface');
        f_water_surface == 'false' ? window.location.href = './form_water_surface/report_user/index.html' : window.location.href = './form_water_surface/report/index.html'
    } else {
        window.location.href = "./../../form_register/login/index.html"
    }
})
$('#cardqc2').on('click', function () {
    if (eecauth == 'admin') {
        window.location.href = './form_water_qua/report_admin/index.html'
    } else if (eecauth == 'user' || eecauth == "office") {
        let f_water_qua = sessionStorage.getItem('f_water_qua');
        f_water_qua == 'false' ? window.location.href = './form_water_qua/report_user/index.html' : window.location.href = './form_water_qua/report/index.html'
    } else {
        window.location.href = "./../../form_register/login/index.html"
    }
})
$('#cardqc3').on('click', function () {
    if (eecauth == 'admin') {
        window.location.href = './form_seawater_qua/report_admin/index.html'
    } else if (eecauth == 'user' || eecauth == "office") {
        let f_seawater_qua = sessionStorage.getItem('f_seawater_qua');
        f_seawater_qua == 'false' ? window.location.href = './form_seawater_qua/report_user/index.html' : window.location.href = './form_seawater_qua/report/index.html'
    } else {
        window.location.href = "./../../form_register/login/index.html"
    }
})
//โมดูลชีวภาพ 
$('#cardbio1').on('click', function () {
    if (eecauth == 'admin') {
        window.location.href = './form_green/report_admin/index.html'
    } else if (eecauth == 'user' || eecauth == "office") {
        let f_green = sessionStorage.getItem('f_green');
        f_green == 'false' ? window.location.href = './form_green/report_user/index.html' : window.location.href = './form_green/report/index.html'
    } else {
        window.location.href = "./../../form_register/login/index.html"
    }
})
$('#cardbio2').on('click', function () {
    if (eecauth == 'admin') {
        window.location.href = '/form_biodiversity/report_admin/index.html'
    } else if (eecauth == 'user' || eecauth == "office") {
        let f_biodiversity = sessionStorage.getItem('f_biodiversity');
        f_biodiversity == 'false' ? window.location.href = '/form_biodiversity/report_user/index.html' : window.location.href = '/form_biodiversity/report/index.html'
    } else {
        window.location.href = "./../../form_register/login/index.html"
    }
})
$('#cardbio3').on('click', function () {
    if (eecauth == 'admin') {
        window.location.href = './form_familyforest/report_admin/index.html'
    } else if (eecauth == 'user' || eecauth == "office") {
        let f_familyforest = sessionStorage.getItem('f_familyforest');
        f_familyforest == 'false' ? window.location.href = './form_familyforest/report_user/index.html' : window.location.href = './form_familyforest/report/index.html'
    } else {
        window.location.href = "./../../form_register/login/index.html"
    }
})
$('#cardbio4').on('click', function () {
    if (eecauth == 'admin') {
        window.location.href = './form_organic/report_admin/index.html'
    } else if (eecauth == 'user' || eecauth == "office") {
        let f_organic = sessionStorage.getItem('f_organic');
        f_organic == 'false' ? window.location.href = './form_organic/report_user/index.html' : window.location.href = './form_organic/dashboard/index.html'
    } else {
        window.location.href = "./../../form_register/login/index.html"
    }
})
//โมดูลอื่นๆ
$('#cardother1').on('click', function () {
    if (eecauth == 'admin') {
        window.location.href = './form_garbage/report_admin/index.html'
    } else if (eecauth == 'user' || eecauth == "office") {
        let f_garbage = sessionStorage.getItem('f_garbage');
        f_garbage == 'false' ? window.location.href = './form_garbage/report_user/index.html' : window.location.href = './form_garbage/report/index.html'
    } else {
        window.location.href = "./../../form_register/login/index.html"
    }
})
$('#cardother2').on('click', function () {
    if (eecauth == 'admin') {
        window.location.href = './form_notice/report_admin/index.html'
    } else if (eecauth == 'user' || eecauth == "office") {
        window.location.href = './form_notice/report/index.html'
    } else {
        window.location.href = "./../../form_register/login/index.html"
    }
})