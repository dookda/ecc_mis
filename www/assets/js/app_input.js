let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
$("#usrname").text(urname);
$('#typeuser').val(eecauth)
urid ? null : location.href = "./../../form_register/login/index.html";

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

var type = $('#typeuser').val();
// console.log(type)
if (type == "user") {
    //โมดูลปริมาณน้ำ
    $('#cardwc2').css("pointer-events", "none");
    //โมดูลคุณภาพน้ำ
    $('#cardqc').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3"," margin-top":"10px" });
    //โมดูลชีวภาพ 
    $('#cardbio1').css("pointer-events", "none");
    //โมดูลอื่นๆ
    $('#cardother1').css("pointer-events", "none");

} else if (type == "office") {
    //โมดูลปริมาณน้ำ
    $('#cardwc1').css("pointer-events", "none");
    //โมดูลคุณภาพน้ำ
    //โมดูลชีวภาพ 
    // $('#cardbio').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3" });
    $('#cardbio2').css("pointer-events", "none");
    $('#cardbio3').css("pointer-events", "none");
    $('#cardbio4').css("pointer-events", "none");
    //โมดูลอื่นๆ 
    $('#cardother2').css("pointer-events", "none");
} else if (type == null) {
    $('#cardwc').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3" });
    $('#cardqc').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3" });
    $('#cardqcair').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3" });
    $('#cardbio').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3" });
    $('#cardother').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3" });
}




