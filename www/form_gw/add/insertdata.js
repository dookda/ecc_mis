$(document).ready(() => {

    // getData();
});
console.log("ggggg");
function add() {
    console.log("ttttttt");
    var staid = $("#staid").val()
    var locate = $("#locate").val()
    var record = $("#record").val()
    var pro = $("#pro").val()
    var gwyear = $("#gwyear").val()
    var gwdate = $("#gwdate").val()
    var wc = $("#wc").val()
    var td = $("#td").val()
    var ph = $("#ph").val()
    var fe = $("#fe").val()
    var mnn = $("#mnn").val()
    var cu = $("#cu").val()
    var zn = $("#zn").val()
    var so = $("#so").val()
    var ci = $("#ci").val()
    var fluor = $("#fluor").val()
    var no3 = $("#no3").val()
    var thcc = $("#thcc").val()
    var nchcc = $("#nchcc").val()
    var ts = $("#ts").val()
    var ars = $("#ars").val()
    var cn = $("#cn").val()
    var pb = $("#pb").val()
    var hg = $("#hg").val()
    var cd = $("#cd").val()
    var se = $("#se").val()
    var spc = $("#spc").val()
    var mpn = $("#mpn").val()
    var ecl = $("#ecl").val()
    var url = "http://localhost:3000/api/add/"
    $.get(url + staid + "/" + locate + "/" + record + "/" + pro + "/" + gwyear + "/" + gwdate + "/" + wc + "/" + td + "/" + ph + "/" + fe + "/" + mnn + "/" + cu + "/" + zn + "/" + so + "/" + ci + "/" + fluor + "/" + no3 + "/" + thcc + "/" + nchcc + "/" + ts + "/" + ars + "/" + cn + "/" + pb + "/" + hg + "/" + cd + "/" + se + "/" + spc + "/" + mpn + "/" + ecl).done(r => {
        console.log("ok");
        // $("#usr").val("")
    })

}
let dataurl = "-";
let gps = "";

$("#aa").on('click', function () {
    console.log("fff");
})

function insertGw() {
    const obj = {
        staid: $("#staid").val(),
        locate: $("#locate").val(),
        record: $("#record").val(),
        pro: $("#pro").val(),
        gwyear: $("#gwyear").val(),
        gwdate: $("#gwdate").val(),
        wc: $("#wc").val(),
        td: $("#td").val(),
        ph: $("#ph").val(),
        fe: $("#fe").val(),
        mnn: $("#mnn").val(),
        cu: $("#cu").val(),
        zn: $("#zn").val(),
        so: $("#so").val(),
        ci: $("#ci").val(),
        fluor: $("#fluor").val(),
        no3: $("#no3").val(),
        thcc: $("#thcc").val(),
        nchcc: $("#nchcc").val(),
        ts: $("#ts").val(),
        ars: $("#ars").val(),
        cn: $("#cn").val(),
        pb: $("#pb").val(),
        hg: $("#hg").val(),
        cd: $("#cd").val(),
        se: $("#se").val(),
        spc: $("#spc").val(),
        mpn: $("#mpn").val(),
        ecl: $("#ecl").val(),
        // img: dataurl,
        geom: JSON.stringify(gps.toGeoJSON().geometry)
    }
    console.log(obj)
    var url = "http://localhost:3000/gw-api/add"

    $.post(url, obj).done(r => {
        console.log("ok");
    })

}

