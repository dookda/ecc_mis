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