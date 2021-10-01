let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
// urid ? null : location.href = "./../../form_register/login/index.html";
$("#usr1").hide()
$("#usr2").hide()

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


if (eecauth !== "admin") {
    //โมดูลชีวภาพ 
    $('#cardbio').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3" });
    //โมดูลปริมาณน้ำ
    $('#cardwc2').css("pointer-events", "none");
    //โมดูลคุณภาพน้ำ
    $('#cardqc1').css("pointer-events", "none");
    $('#cardqc2').css("pointer-events", "none");
    $('#cardqc3').css("pointer-events", "none");
    //โมดูลอื่นๆ
    $('#cardother').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3" });
    $('#cardother2').css("pointer-events", "none");
}