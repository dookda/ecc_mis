// function getform() {
//     $.get("http://localhost:3000/api/form_af/get").done(res => {
//         var formagri = res.data
//         // L.geoJSON(res)    
//         console.log(formagri)
//     })
// }

// function getGw_staid() {
//     $.get("http://localhost:3000/gw-api/get/" + staid).done(res => {
//         var gw = res.data
//         // L.geoJSON(res)    
//         console.log(gw)
//     })
// }

$("#Tagri").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#TypeA").show();
        $("#TypeB").hide();
        $("#TypeC").hide();
    } else {
        $("#TypeA").hide();
        $("#TypeB").hide();
        $("#TypeC").hide();
    }
})
$("#Tanimal").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#TypeA").hide();
        $("#TypeB").show();
        $("#TypeC").hide();
    } else {
        $("#TypeA").hide();
        $("#TypeB").hide();
        $("#TypeC").hide();
    }
})
$("#Tfishery").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#TypeA").hide();
        $("#TypeB").hide();
        $("#TypeC").show();
    } else {
        $("#TypeA").hide();
        $("#TypeB").hide();
        $("#TypeC").hide();
    }
})

$("#standAgri").on("change", function () {
    var a = $("#standAgri").val()
    if (a == "มีการรับรอง") {
        $("#Namestand").show();
    } else if (a == "ไม่มีการรับรอง") {
        $("#Namestand").hide();
    }
})

$("#fishselect").on("change", function () {
    var a = $("#fishselect").val()
    if (a == '1') {
        $("#fish1").show()
        $("#fish2").hide()
        $("#fish3").hide()
        $("#fish4").hide()
        $("#fish5").hide()
    } else if (a == '2') {
        $("#fish1").show()
        $("#fish2").show()
        $("#fish3").hide()
        $("#fish4").hide()
        $("#fish5").hide()
    } else if (a == '3') {
        $("#fish1").show()
        $("#fish2").show()
        $("#fish3").show()
        $("#fish4").hide()
        $("#fish5").hide()
    } else if (a == '4') {
        $("#fish1").show()
        $("#fish2").show()
        $("#fish3").show()
        $("#fish4").show()
        $("#fish5").hide()
    } else if (a == '5') {
        $("#fish1").show()
        $("#fish2").show()
        $("#fish3").show()
        $("#fish4").show()
        $("#fish5").show()
    } else {
        $("#fish1").hide()
        $("#fish2").hide()
        $("#fish3").hide()
        $("#fish4").hide()
        $("#fish5").hide()
    }
})
$("#BuySellUse").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#BSselect").show();
        $("#Buy").show();
        $("#Sell").show();
        $("#BSselect").on("change", function () {
            var a = $("#BSselect").val();
            console.log(a)
            if (a == "ซื้อขาย") {
                $("#Buy").show();
                $("#Sell").show();

            } else if (a == "ซื้อ") {
                $("#Buy").show();
                $("#Sell").hide();

            } else if (a == "ขาย") {
                $("#Buy").hide();
                $("#Sell").show();
            }
        })
    } else {
        $("#BSselect").hide();
        $("#Buy").hide();
        $("#Sell").hide();
    }
})
$("#KeepUse").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#Keep").show();
    } else {
        $("#Keep").hide();
    }
})
$("#TransUse").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#Transform").show();
    } else {
        $("#Transform").hide();
    }
})

$("#prodselect").on("change", function () {
    var a = $("#prodselect").val();
    if (a == "1") {
        $("#product1").show();
        $("#product2").hide();
        $("#product3").hide();
        $("#product4").hide();
        $("#product5").hide();
    } else if (a == "2") {
        $("#product1").show();
        $("#product2").show();
        $("#product3").hide();
        $("#product4").hide();
        $("#product5").hide();
    } else if (a == "3") {
        $("#product1").show();
        $("#product2").show();
        $("#product3").show();
        $("#product4").hide();
        $("#product5").hide();
    } else if (a == "4") {
        $("#product1").show();
        $("#product2").show();
        $("#product3").show();
        $("#product4").show();
        $("#product5").hide();
    } else if (a == "5") {
        $("#product1").show();
        $("#product2").show();
        $("#product3").show();
        $("#product4").show();
        $("#product5").show();
    } else {
        $("#product").hide();
        $("#product").hide();
        $("#product").hide();
        $("#product").hide();
        $("#product").hide();
    }
})

// $('#tab tbody').on('click', 'tr', function () {

//     $('#myModal').modal('show');
// })