let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
$("#usrname").text(urname);
$('#typeuser').val(eecauth)
// urid ? null : location.href = "./system_decide.html.html";
// console.log("ok")

$("#manual-c").css({
    "opacity": "0.3", "filter": "grayscale(100%)"
})
$("#manual").mouseleave(function () {
    $("#manual-c").css({
        "opacity": "0.3", "filter": "grayscale(100%)"
    })
})
$("#manual").mouseover(function () {
    $("#manual-c").removeAttr("style").css({ "opacity": "1", "fill": "none" })
})

let Accept = sessionStorage.getItem('accept');
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

$("#usr1").hide()
$("#usr2").hide()
if (urname) {
    $("#usr1").show();
    $("#usr2").show();
    $("#login").hide();
    $("#usrname").text(urname);
}