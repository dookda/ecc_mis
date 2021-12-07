let val;

function inputdata() {
    const obj = {
        // data: val ? val : val = '99',

        netname: $("#netname").val() ? $("#netname").val() : 'NULL',
        stand: $("#stand").val() ? $("#stand").val() : 'NULL',
        namestand: $("#namestand").val() ? $("#namestand").val() : 'NULL',
        Valuestand: $("#Valuestand").val() ? $("#Valuestand").val() : 'NULL',
        NoVastand: $("#NoVastand").val() ? $("#NoVastand").val() : 'NULL',
        //ข้าว
        rice: $("#rice").val() ? $("#rice").val() : 'NULL',
        riceValue: $("#riceValue").val() ? $("#riceValue").val() : 'NULL',
        R1: $("#R1").val() ? $("#R1").val() : 'NULL',
        R1area: $("#R1area").val() ? $("#R1area").val() : 'NULL',
        R2: $("#R2").val() ? $("#R2").val() : 'NULL',
        R2area: $("#R2area").val() ? $("#R2area").val() : 'NULL',
        R3: $("#R3").val() ? $("#R3").val() : 'NULL',
        R3area: $("#R3area").val() ? $("#R3area").val() : 'NULL',
        R4: $("#R4").val() ? $("#R4").val() : 'NULL',
        R4area: $("#R4area").val() ? $("#R4area").val() : 'NULL',
        R5: $("#R5").val() ? $("#R5").val() : 'NULL',
        R5area: $("#R5area").val() ? $("#R5area").val() : 'NULL',
        RBScheck: $("#RBScheck").val() ? $("#RBScheck").val("Failed") : 'NULL',
        RBSselect: $("#RBSselect").val() ? $("#RBSselect").val() : 'NULL',
        RBV: $("#RBV").val() ? $("#RBV").val() : 'NULL',
        RBU: $("#RBU").val() ? $("#RBU").val() : 'NULL',
        RBM: $("#RBM").val() ? $("#RBM").val() : 'NULL',
        RBL: $("#RBL").val() ? $("#RBL").val() : 'NULL',
        RSV: $("#RSV").val() ? $("#RSV").val() : 'NULL',
        RSU: $("#RSU").val() ? $("#RSU").val() : 'NULL',
        RSM: $("#RSM").val() ? $("#RSM").val() : 'NULL',
        RSL: $("#RSL").val() ? $("#RSL").val() : 'NULL',
        RKcheck: $("#RKcheck").val() ? $("#RKcheck").val() : 'NULL',
        RKV: $("#RKV").val() ? $("#RKV").val() : 'NULL',
        RKU: $("#RKU").val() ? $("#RKU").val() : 'NULL',
        //พืชไร่
        Fieldcrop: $("#Fieldcrop").val() ? $("#Fieldcrop").val() : 'NULL',
        FCValue: $("#FCValue").val() ? $("#FCValue").val() : 'NULL',
        FC1: $("#FC1").val() ? $("#FC1").val() : 'NULL',
        FC1plot: $("#FC1plot").val() ? $("#FC1plot").val() : 'NULL',
        FC1area: $("#FC1area").val() ? $("#FC1area").val() : 'NULL',
        FC2: $("#FC2").val() ? $("#FC2").val() : 'NULL',
        FC2plot: $("#FC2plot").val() ? $("#FC2plot").val() : 'NULL',
        FC2area: $("#FC2area").val() ? $("#FC2area").val() : 'NULL',
        FC3: $("#FC3").val() ? $("#FC3").val() : 'NULL',
        FC3plot: $("#FC3plot").val() ? $("#FC3plot").val() : 'NULL',
        FC3area: $("#FC3area").val() ? $("#FC3area").val() : 'NULL',
        FC4: $("#FC4").val() ? $("#FC4").val() : 'NULL',
        FC4plot: $("#FC4plot").val() ? $("#FC4plot").val() : 'NULL',
        FC4area: $("#FC4area").val() ? $("#FC4area").val() : 'NULL',
        FC5: $("#FC5").val() ? $("#FC5").val() : 'NULL',
        FC5plot: $("#FC5plot").val() ? $("#FC5plot").val() : 'NULL',
        FC5area: $("#FC5area").val() ? $("#FC5area").val() : 'NULL',
        FCBScheck: $("#FCBScheck").val() ? $("#FCBScheck").val() : 'NULL',
        FCBSselect: $("#FCBSselect").val() ? $("#FCBSselect").val() : 'NULL',
        FCBV: $("#FCBV").val() ? $("#FCBV").val() : 'NULL',
        FCBU: $("#FCBU").val() ? $("#FCBU").val() : 'NULL',
        FCBM: $("#FCBM").val() ? $("#FCBM").val() : 'NULL',
        FCBL: $("#FCBL").val() ? $("#FCBL").val() : 'NULL',
        FCSV: $("#FCSV").val() ? $("#FCSV").val() : 'NULL',
        FCSU: $("#FCSU").val() ? $("#FCSU").val() : 'NULL',
        FCSM: $("#FCSM").val() ? $("#FCSM").val() : 'NULL',
        FCSL: $("#FCSL").val() ? $("#FCSL").val() : 'NULL',
        FCKcheck: $("#FCKcheck").val() ? $("#FCKcheck").val() : 'NULL',
        FCKV: $("#FCKV").val() ? $("#FCKV").val() : 'NULL',
        FCKU: $("#FCKU").val() ? $("#FCKU").val() : 'NULL',
        //ผัก
        olericulture: $("#olericulture").val() ? $("#olericulture").val() : 'NULL',
        olerValue: $("#olerValue").val() ? $("#olerValue").val() : 'NULL',
        O1: $("#O1").val() ? $("#O1").val() : 'NULL',
        O1plot: $("#O1plot").val() ? $("#O1plot").val() : 'NULL',
        O1area: $("#O1area").val() ? $("#O1area").val() : 'NULL',
        O2: $("#O2").val() ? $("#O2").val() : 'NULL',
        O2plot: $("#O2plot").val() ? $("#O2plot").val() : 'NULL',
        O2area: $("#O2area").val() ? $("#O2area").val() : 'NULL',
        O3: $("#O3").val() ? $("#O3").val() : 'NULL',
        O3plot: $("#O3plot").val() ? $("#O3plot").val() : 'NULL',
        O3area: $("#O3area").val() ? $("#O3area").val() : 'NULL',
        O4: $("#O4").val() ? $("#O4").val() : 'NULL',
        O4plot: $("#O4plot").val() ? $("#O4plot").val() : 'NULL',
        O4area: $("#O4area").val() ? $("#O4area").val() : 'NULL',
        O5: $("#O5").val() ? $("#O5").val() : 'NULL',
        O5plot: $("#O5plot").val() ? $("#O5plot").val() : 'NULL',
        O5area: $("#O5area").val() ? $("#O5area").val() : 'NULL',
        OBScheck: $("#OBScheck").val() ? $("#OBScheck").val() : 'NULL',
        OBSselect: $("#OBSselect").val() ? $("#OBSselect").val() : 'NULL',
        OBV: $("#OBV").val() ? $("#OBV").val() : 'NULL',
        OBU: $("#OBU").val() ? $("#OBU").val() : 'NULL',
        OBM: $("#OBM").val() ? $("#OBM").val() : 'NULL',
        OBL: $("#OBL").val() ? $("#OBL").val() : 'NULL',
        OSV: $("#OSV").val() ? $("#OSV").val() : 'NULL',
        OSU: $("#OSU").val() ? $("#OSU").val() : 'NULL',
        OSM: $("#OSM").val() ? $("#OSM").val() : 'NULL',
        OSL: $("#OSL").val() ? $("#OSL").val() : 'NULL',
        OKcheck: $("#OKcheck").val() ? $("#OKcheck").val() : 'NULL',
        OKV: $("#OKV").val() ? $("#OKV").val() : 'NULL',
        OKU: $("#OKU").val() ? $("#OKU").val() : 'NULL',
        //ผลไม้
        fruit: $("#fruit").val() ? $("#fruit").val() : 'NULL',
        fruitValue: $("#fruitValue").val() ? $("#fruitValue").val() : 'NULL',
        F1: $("#F1").val() ? $("#F1").val() : 'NULL',
        F1plot: $("#F1plot").val() ? $("#F1plot").val() : 'NULL',
        F1area: $("#F1area").val() ? $("#F1area").val() : 'NULL',
        F2: $("#F2").val() ? $("#F2").val() : 'NULL',
        F2plot: $("#F2plot").val() ? $("#F2plot").val() : 'NULL',
        F2area: $("#F2area").val() ? $("#F2area").val() : 'NULL',
        F3: $("#F3").val() ? $("#F3").val() : 'NULL',
        F3plot: $("#F3plot").val() ? $("#F3plot").val() : 'NULL',
        F3area: $("#F3area").val() ? $("#F3area").val() : 'NULL',
        F4: $("#F4").val() ? $("#F4").val() : 'NULL',
        F4plot: $("#F4plot").val() ? $("#F4plot").val() : 'NULL',
        F4area: $("#F4area").val() ? $("#F4area").val() : 'NULL',
        F5: $("#F5").val() ? $("#F5").val() : 'NULL',
        F5plot: $("#F5plot").val() ? $("#F5plot").val() : 'NULL',
        F5area: $("#F5area").val() ? $("#F5area").val() : 'NULL',
        FBScheck: $("#FBScheck").val() ? $("#FBScheck").val() : 'NULL',
        FBSselect: $("#FBSselect").val() ? $("#FBSselect").val() : 'NULL',
        FBV: $("#FBV").val() ? $("#FBV").val() : 'NULL',
        FBU: $("#FBU").val() ? $("#FBU").val() : 'NULL',
        FBM: $("#FBM").val() ? $("#FBM").val() : 'NULL',
        FBL: $("#FBL").val() ? $("#FBL").val() : 'NULL',
        FSV: $("#FSV").val() ? $("#FSV").val() : 'NULL',
        FSU: $("#FSU").val() ? $("#FSU").val() : 'NULL',
        FSM: $("#FSM").val() ? $("#FSM").val() : 'NULL',
        FSL: $("#FSL").val() ? $("#FSL").val() : 'NULL',
        FKcheck: $("#FKcheck").val() ? $("#FKcheck").val() : 'NULL',
        FKV: $("#FKV").val() ? $("#FKV").val() : 'NULL',
        FKU: $("#FKU").val() ? $("#FKU").val() : 'NULL',
        //ปศุสัตว์
        Animal: $("#Animal").val() ? $("#Animal").val() : 'NULL',
        animalValue: $("#animalValue").val() ? $("#animalValue").val() : 'NULL',
        A1: $("#A1").val() ? $("#A1").val() : 'NULL',
        A1plot: $("#A1plot").val() ? $("#A1plot").val() : 'NULL',
        A1area: $("#A1area").val() ? $("#A1area").val() : 'NULL',
        A2: $("#A2").val() ? $("#A2").val() : 'NULL',
        A2plot: $("#A2plot").val() ? $("#A2plot").val() : 'NULL',
        A2area: $("#A2area").val() ? $("#A2area").val() : 'NULL',
        A3: $("#A3").val() ? $("#A3").val() : 'NULL',
        A3plot: $("#A3plot").val() ? $("#A3plot").val() : 'NULL',
        A3area: $("#A3area").val() ? $("#A3area").val() : 'NULL',
        A4: $("#A4").val() ? $("#A4").val() : 'NULL',
        A4plot: $("#A4plot").val() ? $("#A4plot").val() : 'NULL',
        A4area: $("#A4area").val() ? $("#A4area").val() : 'NULL',
        A5: $("#A5").val() ? $("#A5").val() : 'NULL',
        A5plot: $("#A5plot").val() ? $("#A5plot").val() : 'NULL',
        A5area: $("#A5area").val() ? $("#A5area").val() : 'NULL',
        ABScheck: $("#ABScheck").val() ? $("#ABScheck").val() : 'NULL',
        ABSselect: $("#ABSselect").val() ? $("#ABSselect").val() : 'NULL',
        ABV: $("#ABV").val() ? $("#ABV").val() : 'NULL',
        ABU: $("#ABU").val() ? $("#ABU").val() : 'NULL',
        ABM: $("#ABM").val() ? $("#ABM").val() : 'NULL',
        ABL: $("#ABL").val() ? $("#ABL").val() : 'NULL',
        ASV: $("#ASV").val() ? $("#ASV").val() : 'NULL',
        ASU: $("#ASU").val() ? $("#ASU").val() : 'NULL',
        ASM: $("#ASM").val() ? $("#ASM").val() : 'NULL',
        ASL: $("#ASL").val() ? $("#ASL").val() : 'NULL',
        AKcheck: $("#AKcheck").val() ? $("#AKcheck").val() : 'NULL',
        AKV: $("#AKV").val() ? $("#AKV").val() : 'NULL',
        AKU: $("#AKU").val() ? $("#AKU").val() : 'NULL',

        datetime: document.getElementById('redate').valueAsDate = new Date(),
        datetext: $("#redate").val(),
        // geom: JSON.stringify(gps.toGeoJSON().geometry),
        geom: JSON.stringify(geom),
        img: $("#imgfile"),

    }
    console.log(obj)
    // var url = "http://localhost:3000/gw-api/add/"
    // $.post(url, obj).done(r => {
    //     console.log("ok");
    // })

}

// function getGw() {
//     $.get("http://localhost:3000/gw-api/get").done(res => {
//         var gw = res.data
//         // L.geoJSON(res)    
//         console.log(gw)
//     })
// }

// function getGw_staid() {
//     $.get("http://localhost:3000/gw-api/get/" + staid).done(res => {
//         var gw = res.data
//         // L.geoJSON(res)    
//         console.log(gw)
//     })
// }

function showForm(idform) {
    $(idform).show();
}
function hide(id) {
    $(id).hide()
}

// $("#First").on("click", function () {
//     showForm("#FormFirst")
//     $("#FormUpdate").hide();
// })
// $("#Update").on("click", function () {
//     showForm("#FormUpdate")
//     $("#FormFirst").hide();
// })

//มาตรฐาน
$("#stand").on("change", function () {
    var a = $("#stand").val()
    if (a == "Have") {
        $("#Namestand").show();
        $("#Havestand").show();
        $("#Nostand").hide();
    } else if (a == "All") {
        $("#Namestand").show();
        $("#Havestand").show();
        $("#Nostand").show();
    } else {
        $("#Namestand").hide();
        $("#Havestand").hide();
        $("#Nostand").hide();
    }
    // console.log(a)
})
// ข้าว
$("#rice").on("change", function () {
    var t = this.checked
    if (t == true) {
        console.log("ข้าว")
        $("#riceselect").show();
        $("#riceuse").show();
        $("#riceValue").on("change", function () {
            var a = $("#riceValue").val();
            if (a == "1") {
                $("#rice1").show();
                $("#rice2").hide();
                $("#rice3").hide();
                $("#rice4").hide();
                $("#rice5").hide();
            } else if (a == "2") {
                $("#rice1").show();
                $("#rice2").show();
                $("#rice3").hide();
                $("#rice4").hide();
                $("#rice5").hide();
            }
            else if (a == "3") {
                $("#rice1").show();
                $("#rice2").show();
                $("#rice3").show();
                $("#rice4").hide();
                $("#rice5").hide();
            }
            else if (a == "4") {
                $("#rice1").show();
                $("#rice2").show();
                $("#rice3").show();
                $("#rice4").show();
                $("#rice5").hide();
            }
            else if (a == "5") {
                $("#rice1").show();
                $("#rice2").show();
                $("#rice3").show();
                $("#rice4").show();
                $("#rice5").show();
            }
            else if (a == "0") {
                $("#rice1").hide();
                $("#rice2").hide();
                $("#rice3").hide();
                $("#rice4").hide();
                $("#rice5").hide();
            }
        })
        //ซื้อขาย
        $("#RBScheck").on("change", function () {
            var t = this.checked
            // console.log(t)
            if (t == true) {
                $("#RBS").show();
                $("#buyrice").show();
                $("#sellrice").show();
                $("#RBSselect").on("change", function () {
                    var a = $("#RBSselect").val();
                    if (a == "buy") {
                        $("#buyrice").show();
                        $("#sellrice").hide();
                    } else if (a == "sell") {
                        $("#buyrice").hide();
                        $("#sellrice").show();
                    } else if (a == "buyandsell") {
                        $("#buyrice").show();
                        $("#sellrice").show();
                    } else {
                        $("#buyrice").hide();
                        $("#sellrice").hide();
                    }
                })
            } else {
                $("#RBS").hide();
            }
        })
        //เก็บไว้
        $("#RKcheck").on("change", function () {
            var t = this.checked
            if (t == true) {
                $("#ricekeep").show();
            } else {
                $("#ricekeep").hide();
            }
        })
    } else {
        console.log('NO')
        $("#riceselect").hide();
        $("#rice1").hide();
        $("#rice2").hide();
        $("#rice3").hide();
        $("#rice4").hide();
        $("#rice5").hide();
        $("#riceuse").hide();
    }
});
// พืชไร่
$("#Fieldcrop").on("change", function () {
    var t = this.checked
    if (t == true) {
        console.log("พืชไร่")
        $("#FCselect").show();
        $("#FCuse").show();
        $("#FCValue").on("change", function () {
            var a = $("#FCValue").val();
            console.log(a)
            if (a == "1") {
                $("#Fieldcrop1").show();
                $("#Fieldcrop2").hide();
                $("#Fieldcrop3").hide();
                $("#Fieldcrop4").hide();
                $("#Fieldcrop5").hide();
            } else if (a == "2") {
                $("#Fieldcrop1").show();
                $("#Fieldcrop2").show();
                $("#Fieldcrop3").hide();
                $("#Fieldcrop4").hide();
                $("#Fieldcrop5").hide();
            }
            else if (a == "3") {
                $("#Fieldcrop1").show();
                $("#Fieldcrop2").show();
                $("#Fieldcrop3").show();
                $("#Fieldcrop4").hide();
                $("#Fieldcrop5").hide();
            }
            else if (a == "4") {
                $("#Fieldcrop1").show();
                $("#Fieldcrop2").show();
                $("#Fieldcrop3").show();
                $("#Fieldcrop4").show();
                $("#Fieldcrop5").hide();
            }
            else if (a == "5") {
                $("#Fieldcrop1").show();
                $("#Fieldcrop2").show();
                $("#Fieldcrop3").show();
                $("#Fieldcrop4").show();
                $("#Fieldcrop5").show();
            }
            else if (a == "0") {
                $("#Fieldcrop1").hide();
                $("#Fieldcrop2").hide();
                $("#Fieldcrop3").hide();
                $("#Fieldcrop4").hide();
                $("#Fieldcrop5").hide();
            }
        })
        //ซื้อขาย
        $("#FCBScheck").on("change", function () {
            var t = this.checked
            console.log(t)
            if (t == true) {
                $("#FCBS").show();
                $("#buyFC").show();
                $("#sellFC").show();
                $("#FCBSselect").on("change", function () {
                    var a = $("#FCBSselect").val();
                    if (a == "buy") {
                        $("#buyFC").show();
                        $("#sellFC").hide();
                    } else if (a == "sell") {
                        $("#buyFC").hide();
                        $("#sellFC").show();
                    } else if (a == "buyandsell") {
                        $("#buyFC").show();
                        $("#sellFC").show();
                    } else {
                        $("#buyFC").hide();
                        $("#sellFC").hide();
                    }
                })
            } else {
                $("#FCBS").hide();
            }
        })
        //เก็บไว้
        $("#FCKcheck").on("change", function () {
            var t = this.checked
            if (t == true) {
                $("#FCkeep").show();
            } else {
                $("#FCkeep").hide();
            }
        })
    } else {
        console.log('NO')
        $("#FCselect").hide();
        $("#Fieldcrop1").hide();
        $("#Fieldcrop2").hide();
        $("#Fieldcrop3").hide();
        $("#Fieldcrop4").hide();
        $("#Fieldcrop5").hide();
        $("#FCuse").hide();
    }
});
//ปลูกผัก
$("#olericulture").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#olerselect").show();
        $("#oleruse").show();
        $("#olerValue").on("change", function () {
            var a = $("#olerValue").val();
            if (a == "1") {
                $("#oler1").show();
                $("#oler2").hide();
                $("#oler3").hide();
                $("#oler4").hide();
                $("#oler5").hide();
            } else if (a == "2") {
                $("#oler1").show();
                $("#oler2").show();
                $("#oler3").hide();
                $("#oler4").hide();
                $("#oler5").hide();
            }
            else if (a == "3") {
                $("#oler1").show();
                $("#oler2").show();
                $("#oler3").show();
                $("#oler4").hide();
                $("#oler5").hide();
            }
            else if (a == "4") {
                $("#oler1").show();
                $("#oler2").show();
                $("#oler3").show();
                $("#oler4").show();
                $("#oler5").hide();
            }
            else if (a == "5") {
                $("#oler1").show();
                $("#oler2").show();
                $("#oler3").show();
                $("#oler4").show();
                $("#oler5").show();
            }
            else if (a == "0") {
                $("#oler1").hide();
                $("#oler2").hide();
                $("#oler3").hide();
                $("#oler4").hide();
                $("#oler5").hide();
            }
            // console.log(a)
        });
        $("#OBScheck").on("change", function () {
            var t = this.checked
            // console.log(t)
            if (t == true) {
                $("#OBS").show();
                $("#buyoler").show();
                $("#selloler").show();
                $("#OBSselect").on("change", function () {
                    var a = $("#OBSselect").val();
                    if (a == "buy") {
                        $("#buyoler").show();
                        $("#selloler").hide();
                    } else if (a == "sell") {
                        $("#buyoler").hide();
                        $("#selloler").show();
                    } else if (a == "buyandsell") {
                        $("#buyoler").show();
                        $("#selloler").show();
                    } else {
                        $("#buyoler").hide();
                        $("#selloler").hide();
                    }
                })
            } else {
                $("#OBS").hide();
            }
        })
        //เก็บไว้
        $("#OKcheck").on("change", function () {
            var t = this.checked
            if (t == true) {
                $("#olerkeep").show();
            } else {
                $("#olerkeep").hide();
            }
        })
    } else {
        console.log('NO')
        $("#olerselect").hide();
        $("#oler1").hide();
        $("#oler2").hide();
        $("#oler3").hide();
        $("#oler4").hide();
        $("#oler5").hide();
        $("#oleruse").hide();
    }
});
// ผลไม้
$("#fruit").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#fruitselect").show();
        $("#fruituse").show();
        $("#fruitValue").on("change", function () {
            var a = $("#fruitValue").val();
            if (a == "1") {
                $("#fruit1").show();
                $("#fruit2").hide();
                $("#fruit3").hide();
                $("#fruit4").hide();
                $("#fruit5").hide();
            } else if (a == "2") {
                $("#fruit1").show();
                $("#fruit2").show();
                $("#fruit3").hide();
                $("#fruit4").hide();
                $("#fruit5").hide();
            }
            else if (a == "3") {
                $("#fruit1").show();
                $("#fruit2").show();
                $("#fruit3").show();
                $("#fruit4").hide();
                $("#fruit5").hide();
            }
            else if (a == "4") {
                $("#fruit1").show();
                $("#fruit2").show();
                $("#fruit3").show();
                $("#fruit4").show();
                $("#fruit5").hide();

            }
            else if (a == "5") {
                $("#fruit1").show();
                $("#fruit2").show();
                $("#fruit3").show();
                $("#fruit4").show();
                $("#fruit5").show();
            }
            else if (a == "0") {
                $("#fruit1").hide();
                $("#fruit2").hide();
                $("#fruit3").hide();
                $("#fruit4").hide();
                $("#fruit5").hide();
            }
        })
        //ซื้อขาย
        $("#FBScheck").on("change", function () {
            var t = this.checked
            if (t == true) {
                console.log("ok")
                $("#FBSselect").show();
                $("#buyfruit").show();
                $("#sellfruit").show();
                $("#FBSselect").on("change", function () {
                    var a = $("#FBSselect").val();
                    if (a == "buy") {
                        $("#buyfruit").show();
                        $("#sellfruit").hide();
                    } else if (a == "sell") {
                        $("#buyfruit").hide();
                        $("#sellfruit").show();
                    } else if (a == "buyandsell") {
                        $("#buyfruit").show();
                        $("#sellfruit").show();
                    } else {
                        $("#buyfruit").hide();
                        $("#sellfruit").hide();
                    }
                })
            } else {
                $("#FBSselect").hide();
                $("#buyfruit").hide();
                $("#sellfruit").hide();
            }
        })
        //เก็บไว้
        $("#FKcheck").on("change", function () {
            var t = this.checked
            if (t == true) {
                $("#fruitkeep").show();
            } else {
                $("#fruitkeep").hide();
            }
        })
    } else {
        $("#fruitselect").hide();
        $("#fruit1").hide();
        $("#fruit2").hide();
        $("#fruit3").hide();
        $("#fruit4").hide();
        $("#fruit5").hide();
        $("#fruituse").hide();
    }
});
//ปศุสัตว์
$("#Animal").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#animalselect").show();
        $("#animaluse").show();
        $("#animalValue").on("change", function () {
            var a = $("#animalValue").val();
            if (a == "1") {
                $("#animal1").show();
                $("#animal2").hide();
                $("#animal3").hide();
                $("#animal4").hide();
                $("#animal5").hide();
            } else if (a == "2") {
                $("#animal1").show();
                $("#animal2").show();
                $("#animal3").hide();
                $("#animal4").hide();
                $("#animal5").hide();
            }
            else if (a == "3") {
                $("#animal1").show();
                $("#animal2").show();
                $("#animal3").show();
                $("#animal4").hide();
                $("#animal5").hide();
            }
            else if (a == "4") {
                $("#animal1").show();
                $("#animal2").show();
                $("#animal3").show();
                $("#animal4").show();
                $("#animal5").hide();
            }
            else if (a == "5") {
                $("#animal1").show();
                $("#animal2").show();
                $("#animal3").show();
                $("#animal4").show();
                $("#animal5").show();
            }
            if (a == "0") {
                $("#animal1").hide();
                $("#animal2").hide();
                $("#animal3").hide();
                $("#animal4").hide();
                $("#animal5").hide();
                // console.log(a)
            }
        });
        //ซื้อขาย
        $("#ABScheck").on("change", function () {
            var t = this.checked
            console.log(t)
            if (t == true) {
                $("#ABS").show();
                $("#buyanimal").show();
                $("#sellanimal").show();
                $("#ABSselect").on("change", function () {
                    var a = $("#ABSselect").val();
                    if (a == "buy") {
                        $("#buyanimal").show();
                        $("#sellanimal").hide();
                    } else if (a == "sell") {
                        $("#buyanimal").hide();
                        $("#sellanimal").show();
                    } else if (a == "buyandsell") {
                        $("#buyanimal").show();
                        $("#sellanimal").show();
                    } else {
                        $("#buyanimal").hide();
                        $("#sellanimal").hide();
                    }
                })
            } else {
                $("#ABS").hide();
            }
        })
        //เก็บไว้
        $("#AKcheck").on("change", function () {
            var t = this.checked
            if (t == true) {
                $("#animalkeep").show();
            } else {
                $("#animalkeep").hide();
            }
        })
    } else {
        $("#liveselect").hide();
        $("#animal1").hide();
        $("#animal2").hide();
        $("#animal3").hide();
        $("#animal4").hide();
        $("#animal5").hide();
        $("#animaltuse").hide();
    }
});
//การซื้อขาย
$("#BScheck").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#BSselect").show();
        $("#bsValue").on("change", function () {
            var a = $("#bsValue").val();
            if (a == "buy") {
                $("#buy").show();
                $("#sell").hide();
            } else if (a == "sell") {
                $("#buy").hide();
                $("#sell").show();
            } else if (a == "buyandsell") {
                $("#buy").show();
                $("#sell").show();
            } else if (a == "") {
                $("#buy").hide();
                $("#sell").hide();
            }
            console.log(a)
        })
    } else {
        $("#BSselect").hide();
    }
})
//เก็บไว้
$("#keepcheck").on("change", function () {
    var t = this.checked
    if (t == true) {
        $("#keepselect").show();
    } else {
        $("#keepselect").hide();
    }
})

