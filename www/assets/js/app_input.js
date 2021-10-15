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


let f_water_lev = sessionStorage.getItem('f_water_lev');
let f_wastewater = sessionStorage.getItem('f_wastewater');
let f_water_surface = sessionStorage.getItem('f_water_surface');
let f_water_qua = sessionStorage.getItem('f_water_qua');
let f_seawater_qua = sessionStorage.getItem('f_seawater_qua');
let f_gw = sessionStorage.getItem('f_gw');
let f_air = sessionStorage.getItem('f_air');
let f_green = sessionStorage.getItem('f_green');
let f_biodiversity = sessionStorage.getItem('f_biodiversity');
let f_familyforest = sessionStorage.getItem('f_familyforest');
let f_organic = sessionStorage.getItem('f_organic');
let f_garbage = sessionStorage.getItem('f_garbage');

// console.log(f_water_lev, f_wastewater)
// console.log(f_water_surface, f_water_qua)
// console.log(f_seawater_qua, f_gw)
// console.log(f_air, f_green)
// console.log(f_biodiversity, f_familyforest)
// console.log(f_organic, f_garbage)

f_biodiversity == 'false' ? $('#cardbio2').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3", " margin-top": "10px" }) : "none";
f_air == 'false' ? $('#cardair').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3", " margin-top": "10px" }) : "none";
f_water_lev == 'false' ? $('#cardwc1').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3", " margin-top": "10px" }) : "none";
f_wastewater == 'false' ? $('#cardwc2').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3", " margin-top": "10px" }) : "none";
f_water_surface == 'false' ? $('#cardqc1').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3", " margin-top": "10px" }) : "none";
f_water_qua == 'false' ? $('#cardqc2').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3", " margin-top": "10px" }) : "none";
f_seawater_qua == 'false' ? $('#cardqc3').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3", " margin-top": "10px" }) : "none";
f_gw == 'false' ? $('#cardqc4').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3", " margin-top": "10px" }) : "none";
f_green == 'false' ? $('#cardbio1').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3", " margin-top": "10px" }) : "none";
f_familyforest == 'false' ? $('#cardbio3').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3", " margin-top": "10px" }) : "none";
f_organic == 'false' ? $('#cardbio4').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3", " margin-top": "10px" }) : "none";
f_garbage == 'false' ? $('#cardother1').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3", " margin-top": "10px" }) : "none";

// var type = $('#typeuser').val();
// // console.log(type)
// if (type == "user") {
//     //โมดูลปริมาณน้ำ
//     $('#cardwc2').css("pointer-events", "none");
//     //โมดูลคุณภาพน้ำ
//     $('#cardqc').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3", " margin-top": "10px" });
//     //โมดูลชีวภาพ 
//     $('#cardbio1').css("pointer-events", "none");
//     //โมดูลอื่นๆ
//     $('#cardother1').css("pointer-events", "none");

// } else if (type == "office") {
//     //โมดูลปริมาณน้ำ
//     $('#cardwc1').css("pointer-events", "none");
//     //โมดูลคุณภาพน้ำ
//     //โมดูลชีวภาพ 
//     // $('#cardbio').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3" });
//     $('#cardbio2').css("pointer-events", "none");
//     $('#cardbio3').css("pointer-events", "none");
//     $('#cardbio4').css("pointer-events", "none");
//     //โมดูลอื่นๆ 
//     $('#cardother2').css("pointer-events", "none");
// } else if (type == null) {
//     $('#cardwc').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3" });
//     $('#cardqc').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3" });
//     $('#cardqcair').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3" });
//     $('#cardbio').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3" });
//     $('#cardother').css({ "pointer-events": "none", "filter": "grayscale(100%)", "opacity": "0.3" });
// }




