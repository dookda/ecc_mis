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
 $('#cardwc2').on('click',function(){
    if (eecauth == 'admin'){
        window.location.href='./form_wastewater/report_admin/index.html'
    }else if(eecauth == 'user'  || eecauth == "office"){
        window.location.href='./form_wastewater/report_user/index.html'
    } else{ window.location.href = "./../../form_register/login/index.html"}
})
//โมดูลคุณภาพน้ำ
$('#cardqc1').on('click',function(){
    if (eecauth == 'admin'){
        window.location.href='./form_water_surface/report_admin/index.html'
    }else if(eecauth == 'user'  || eecauth == "office"){
        window.location.href='./form_water_surface/report_user/index.html'
    }else{ window.location.href = "./../../form_register/login/index.html"}
})
$('#cardqc2').on('click',function(){
    if (eecauth == 'admin'){
        window.location.href='./form_water_qua/report_admin/index.html'
    }else if(eecauth == 'user'  || eecauth == "office"){
        window.location.href='./form_water_qua/report_user/index.html'
    }else{ window.location.href = "./../../form_register/login/index.html"}
})
$('#cardqc3').on('click',function(){
    if (eecauth == 'admin'){
        window.location.href='./form_seawater_qua/report_admin/index.html'
    }else if(eecauth == 'user'  || eecauth == "office"){
        window.location.href='./form_seawater_qua/report_user/index.html'
    }else{ window.location.href = "./../../form_register/login/index.html"}
})
 //โมดูลชีวภาพ 
$('#cardbio1').on('click',function(){
    if (eecauth == 'admin'){
        window.location.href='./form_green/report_admin/index.html'
    }else if(eecauth == 'user'   || eecauth == "office"){
        window.location.href='./form_green/report_user/index.html'
    }else{ window.location.href = "./../../form_register/login/index.html"}
})
$('#cardbio2').on('click',function(){
    if (eecauth == 'admin'){
        window.location.href='/form_biodiversity/report_admin/index.html'
    }else if(eecauth == 'user'  || eecauth == "office"){
        window.location.href='/form_biodiversity/report_user/index.html'
    }else{ window.location.href = "./../../form_register/login/index.html"}
})
$('#cardbio3').on('click',function(){
    if (eecauth == 'admin'){
        window.location.href='./form_familyforest/report_admin/index.html'
    }else if(eecauth == 'user'  || eecauth == "office"){
        window.location.href='./form_familyforest/report_user/index.html'
    }else{ window.location.href = "./../../form_register/login/index.html"}
})
//โมดูลอื่นๆ
$('#cardother1').on('click',function(){
    if (eecauth == 'admin'){
        window.location.href='./form_garbage/report_admin/index.html'
    }else if(eecauth == 'user' || eecauth == "office" ){
        window.location.href='./form_garbage/report_user/index.html'
    }else{ window.location.href = "./../../form_register/login/index.html"}
})
$('#cardother2').on('click',function(){
    if (eecauth == 'admin'){
        window.location.href='./form_notice/report_admin/index.html'
    }else if(eecauth == 'user' || eecauth == "office" ){
        window.location.href='./form_notice/report_user/index.html'
    }else{ window.location.href = "./../../form_register/login/index.html"}
})