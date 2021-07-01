let val;
function insertGw() {
    const obj = {
        data: val ? val : val = '99',
        staid: $("#staid").val() ? $("#staid").val() : '999999',
        locate: $("#locate").val() ? $("#locate").val() : 'Noname',
        lat: lat,
        lng: lng,
        record: $("#record").val() ? $("#record").val() : 'Noname',
        pro: $("#pro").val() ? $("#pro").val() : 'Noname',
        gwyear: $("#gwyear").val() ? $("#gwyear").val() : "0000",
        gwdate: $("#gwdate").val() ? $("#gwdate").val() : "2021-01-01T00:00:00.000Z",
        wc: $("#wc").val() ? $("#wc").val() : 'Nocolor',
        td: $("#td").val() ? $("#td").val() : '0',
        ph: $("#ph").val() ? $("#ph").val() : '0',
        fe: $("#fe").val() ? $("#fe").val() : '0',
        mnn: $("#mnn").val() ? $("#mnn").val() : '0',
        cu: $("#cu").val() ? $("#cu").val() : '0',
        zn: $("#zn").val() ? $("#zn").val() : '0',
        so: $("#so").val() ? $("#so").val() : '0',
        ci: $("#ci").val() ? $("#ci").val() : '0',
        fluor: $("#fluor").val() ? $("#fluor").val() : '0',
        no3: $("#no3").val() ? $("#no3").val() : '0',
        thcc: $("#thcc").val() ? $("#thcc").val() : '0',
        nchcc: $("#nchcc").val() ? $("#nchcc").val() : '0',
        ts: $("#ts").val() ? $("#ts").val() : '0',
        ars: $("#ars").val() ? $("#ars").val() : '0',
        cn: $("#cn").val() ? $("#cn").val() : '0',
        pb: $("#pb").val() ? $("#pb").val() : '0',
        hg: $("#hg").val() ? $("#hg").val() : '0',
        cd: $("#cd").val() ? $("#cd").val() : '0',
        se: $("#se").val() ? $("#se").val() : '0',
        spc: $("#spc").val() ? $("#spc").val() : '0',
        mpn: $("#mpn").val() ? $("#mpn").val() : '0',
        ecl: $("#ecl").val() ? $("#ecl").val() : '0',
        // img: dataurl,
        geom: JSON.stringify(gps.toGeoJSON().geometry)
    }
    console.log(obj)
    var url = "http://localhost:3000/gw-api/add/"
    $.post(url, obj).done(r => {
        console.log("ok");
    })

}
function getGw() {
    $.get("http://localhost:3000/gw-api/get").done(res => {
        var gw = res.data
        // L.geoJSON(res)    
        console.log(gw)
    })
}