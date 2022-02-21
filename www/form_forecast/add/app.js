let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
if (urname) {
    $("#usrname").text(urname);
    // $("#usr1").hide();
}
urid ? null : location.href = "./../../form_register/login/index.html";

if (eecauth !== "admin") {
    location.href = "./../../form_register/login/index.html";
}
let gotoreport = () => {
    location.href = "./../dashboard/index.html";
}
// if (eecauth !== "admin" && eecauth !== "user") {
//     location.href = "./../../form_register/login/index.html";
// }

let main = async () => {
    await liff.init({ liffId: "1655648770-JLXzogag" })
    if (liff.isLoggedIn()) {
        getUserProfile()
    } else {
        liff.login()
    }
}

// main()

let getUserProfile = async () => {
    const profile = await liff.getProfile();
    $('#profile').attr('src', await profile.pictureUrl);
    $('#userId').text(profile.userId);
    $('#statusMessage').text(await profile.statusMessage);
    $('#displayName').text(await profile.displayName);
    userid = profile.userId;
}

const url = "https://engrids.soc.cmu.ac.th/api";

// $('#cs').attr("placeholder", "หน่วย");
// $('#cb').attr("placeholder", "หน่วย");
// $('#ry').attr("placeholder", "หน่วย");
// $('#eec').attr("placeholder", "หน่วย");


$('#data').on('change', function () {
    gettype(this.value)
})
$("#typedata").on('change', function () {
    let dtype = $('#data').val();
    if (dtype == 'pop') {
        this.value == 'T01' ? input_all() : null
        this.value == 'T02' ? input_all() : null
        this.value == 'T03' ? input_all() : null
        this.value == 'T04' ? input_all() : null

    }
    else if (dtype == 'pop_covid') {
        this.value == 'T01' ? input_all() : null
        this.value == 'T02' ? input_all() : null
        this.value == 'T03' ? input_all() : null
    }
    else if (dtype == 'wastewater') {
        this.value == 'T01' ? input_all() : null
    }
    else if (dtype == 'garbage') {
        this.value == 'T01' ? input_all() : null
    }
    else if (dtype == 'water_demand') {
        this.value == 'T01' ? input_all() : null
        this.value == 'T02' ? input_all() : null
        this.value == 'T03' ? input_all() : null
        this.value == 'T04' ? input_all() : null
    }
    else if (dtype == 'untreated_water') {
        this.value == 'T01' ? input_eec() : null
        this.value == 'T02' ? input_eec() : null
        this.value == 'T03' ? input_eec() : null
    }
    else if (dtype == 'elec_demand') {
        this.value == 'T01' ? input_all() : null
        this.value == 'T02' ? input_eec() : null
        this.value == 'T03' ? input_eec() : null
    }
    else if (dtype == 'econ') {
        this.value == 'T01' ? input_all() : null
        this.value == 'T02' ? input_eec() : null
        this.value == 'T03' ? input_eec() : null
        this.value == 'T04' ? input_eec() : null
    }
    else if (dtype == 'labor') {
        this.value == 'T01' ? input_prov() : null
        this.value == 'T02' ? input_all() : null
        this.value == 'T03' ? input_all() : null
    }
    else if (dtype == 'labor_edulevel') {
        this.value == 'T01' ? input_eec() : null
        this.value == 'T02' ? input_eec() : null
        this.value == 'T03' ? input_eec() : null
        this.value == 'T04' ? input_eec() : null
        this.value == 'T05' ? input_eec() : null
    }
    else if (dtype == 'waste_raffle') {
        this.value == 'T01' ? input_eec() : null
        this.value == 'T02' ? input_eec() : null
        this.value == 'T03' ? input_eec() : null
    }
    else if (dtype == 'greenhouse_gas') {
        this.value == 'T01' ? input_eec() : null
        this.value == 'T02' ? input_eec() : null
        this.value == 'T03' ? input_eec() : null
        this.value == 'T04' ? input_eec() : null
        this.value == 'T05' ? input_eec() : null
    }
    else if (dtype == 'landuse') {
        this.value == 'T01' ? input_prov() : null
        this.value == 'T02' ? input_prov() : null
        this.value == 'T03' ? input_prov() : null
        this.value == 'T04' ? input_prov() : null
    } else if (dtype == 'uw_industrybycate') {
        input_eec()
    }
    getunit(this.value)
    $('#year').val("")
})
let gettype = (type) => {
    $("#typedata").empty().append(`<option value="eec">เลือกประเภทข้อมูล</option>`);
    if (type !== 'eec') {
        axios.post(url + `/forecast_eec/${type}/type`).then(r => {
            if (type !== 'water_demand') {
                r.data.data.map(i => {
                    $("#typedata").append(`<option value="${i.title_c}">${i.title_n}</option>`)

                })
            } else {
                let d = r.data.data.filter(e => e.title_c !== 'T04_2' && e.title_c !== 'T04_3')
                d.map(i => {
                    $("#typedata").append(`<option value="${i.title_c}">${i.title_n}</option>`)
                })
            }
        })
    } else { $("#typedata").prop("disabled", false); }
    // title_n, title_c, unit_n,
    // if (type == 'pop') { }
    // else if (type == 'pop_covid') { }
    // else if (type == 'wastewater') { }
    // else if (type == 'garbage') { }
    // else if (type == 'water_demand') { }
    // else if (type == 'untreated_water') { }
    // else if (type == 'elec_demand') { }
    // else if (type == 'econ') { }
    // else if (type == 'labor') { }
    // else if (type == 'labor_edulevel') { }
    // else if (type == 'waste_raffle') { }
    // else if (type == 'greenhouse_gas') { }
    // else if (type == 'landuse') { }
    // else { }
}
let unit
let getunit = (type) => {
    let dtype = $('#data').val();
    // $('#unit_cs').text(dtype)
    // $('#unit_cb').text(dtype)
    // $('#unit_ry').text(dtype)
    // $('#unit_eec').text(dtype)
    if (dtype !== 'eec') {
        axios.post(url + `/forecast_eec/${dtype}/unit`, { code: type }).then(r => {
            let d = r.data.data
            unit = d[0].unit_n
            r.data.data.map(i => {
                $('#unit_cs').text(i.unit_n)
                $('#unit_cb').text(i.unit_n)
                $('#unit_ry').text(i.unit_n)
                $('#unit_eec').text(i.unit_n)
            })
        })
    } else { $("#typadata").prop("disabled", false); }

}

$('#cs').attr('disabled', 'disabled');
$('#cb').attr('disabled', 'disabled');
$('#ry').attr('disabled', 'disabled');
$('#eec').attr('disabled', 'disabled');
let input_prov = () => {
    $("#cs").removeAttr('disabled');
    $("#cb").removeAttr('disabled');
    $("#ry").removeAttr('disabled');

    $("#eec").attr('disabled', 'disabled');

    $("#cs").val("");
    $("#cb").val("");
    $("#ry").val("");
    $("#eec").val("");
}
let input_eec = () => {
    $("#cs").attr('disabled', 'disabled');
    $("#cb").attr('disabled', 'disabled');
    $("#ry").attr('disabled', 'disabled');

    $("#eec").removeAttr('disabled');

    $("#cs").val("");
    $("#cb").val("");
    $("#ry").val("");
    $("#eec").val("");
}
let input_all = () => {
    $("#cs").removeAttr('disabled');
    $("#cb").removeAttr('disabled');
    $("#ry").removeAttr('disabled');

    $("#eec").removeAttr('disabled');

    $("#cs").val("");
    $("#cb").val("");
    $("#ry").val("");
    $("#eec").val("");
}

let refreshPage = () => {
    location.reload(true);
}

$('#year').on("input", function () {
    if (this.value == '') {
        $("#year").addClass("is-invalid")
        // console.log("false")
    } else {
        $("#year").removeClass("is-invalid")
        // console.log("true")
    }
})
$('#cs').on("input", function () {
    if (this.value == '') {
        $("#cs").addClass("is-invalid")
        // console.log("false")
    } else {
        $("#cs").removeClass("is-invalid")
        // console.log("true")
    }
})
$('#cb').on("input", function () {
    if (this.value == '') {
        $("#cb").addClass("is-invalid")
        // console.log("false")
    } else {
        $("#cb").removeClass("is-invalid")
        // console.log("true")
    }
})
$('#ry').on("input", function () {
    if (this.value == '') {
        $("#ry").addClass("is-invalid")
        // console.log("false")
    } else {
        $("#ry").removeClass("is-invalid")
        // console.log("true")
    }
})
$('#eec').on("input", function () {
    if (this.value == '') {
        $("#eec").addClass("is-invalid")
        // console.log("false")
    } else {
        $("#eec").removeClass("is-invalid")
        // console.log("true")
    }
})

async function saveData() {
    let year = $('#year').val();
    let cs = $('#cs').val();
    let cb = $('#cb').val();
    let ry = $('#ry').val();
    let eec = $('#eec').val();

    let data1 = [{
        title_n: $("#typedata option:selected").text(),
        title_c: $('#typedata').val(),
        unit_n: unit,
        prov_n: "ฉะเชิงเทรา",
        prov_c: "24",
        y_year: $('#year').val(),
        v_value: $('#cs').val(),
        id_data: Date.now()
    }]
    let data2 = [{
        title_n: $("#typedata option:selected").text(),
        title_c: $('#typedata').val(),
        unit_n: unit,
        prov_n: "ชลบุรี",
        prov_c: "20",
        y_year: $('#year').val(),
        v_value: $('#cb').val(),
        id_data: Date.now() + 1
    }]
    let data3 = [{
        title_n: $("#typedata option:selected").text(),
        title_c: $('#typedata').val(),
        unit_n: unit,
        prov_n: "ระยอง",
        prov_c: "21",
        y_year: $('#year').val(),
        v_value: $('#ry').val(),
        id_data: Date.now() + 2
    }]
    let data4 = [{
        title_n: $("#typedata option:selected").text(),
        title_c: $('#typedata').val(),
        unit_n: unit,
        prov_n: "รวม",
        prov_c: "eec",
        y_year: $('#year').val(),
        v_value: $('#eec').val(),
        id_data: Date.now() + 3
    }]

    let dtype = $('#data').val();
    if (dtype == 'pop') {
        if (year == "" || cs == "" || cb == "" || ry == "" || eec == "") {
            $("#errormodal").modal("show")
            if ($('#year').val() == "") {
                $("#year").addClass("is-invalid")
            }
            if ($('#cs').val() == "") {
                $("#cs").addClass("is-invalid")
            }
            if ($('#cb').val() == "") {
                $("#cb").addClass("is-invalid")
            }
            if ($('#ry').val() == "") {
                $("#ry").addClass("is-invalid")
            }
            if ($('#eec').val() == "") {
                $("#eec").addClass("is-invalid")
            }
        } else {
            await sendData(data1, dtype)
            await sendData(data2, dtype)
            await sendData(data3, dtype)
            await sendData(data4, dtype, "ok")
        }
    }
    else if (dtype == 'pop_covid') {
        if (year == "" || cs == "" || cb == "" || ry == "" || eec == "") {
            $("#errormodal").modal("show")
            if ($('#year').val() == "") {
                $("#year").addClass("is-invalid")
            }
            if ($('#cs').val() == "") {
                $("#cs").addClass("is-invalid")
            }
            if ($('#cb').val() == "") {
                $("#cb").addClass("is-invalid")
            }
            if ($('#ry').val() == "") {
                $("#ry").addClass("is-invalid")
            }
            if ($('#eec').val() == "") {
                $("#eec").addClass("is-invalid")
            }
        } else {
            await sendData(data1, dtype)
            await sendData(data2, dtype)
            await sendData(data3, dtype)
            await sendData(data4, dtype, "ok")
        }
    }
    else if (dtype == 'wastewater') {
        if (year == "" || cs == "" || cb == "" || ry == "" || eec == "") {
            $("#errormodal").modal("show")
            if ($('#year').val() == "") {
                $("#year").addClass("is-invalid")
            }
            if ($('#cs').val() == "") {
                $("#cs").addClass("is-invalid")
            }
            if ($('#cb').val() == "") {
                $("#cb").addClass("is-invalid")
            }
            if ($('#ry').val() == "") {
                $("#ry").addClass("is-invalid")
            }
            if ($('#eec').val() == "") {
                $("#eec").addClass("is-invalid")
            }
        } else if (year !== "" || cs !== "" || cb !== "" || ry !== "" || eec !== "") {
            await sendData(data1, dtype)
            await sendData(data2, dtype)
            await sendData(data3, dtype)
            await sendData(data4, dtype, "ok")
        }
    }
    else if (dtype == 'garbage') {
        if (year == "" || cs == "" || cb == "" || ry == "" || eec == "") {
            $("#errormodal").modal("show")
            if ($('#year').val() == "") {
                $("#year").addClass("is-invalid")
            }
            if ($('#cs').val() == "") {
                $("#cs").addClass("is-invalid")
            }
            if ($('#cb').val() == "") {
                $("#cb").addClass("is-invalid")
            }
            if ($('#ry').val() == "") {
                $("#ry").addClass("is-invalid")
            }
            if ($('#eec').val() == "") {
                $("#eec").addClass("is-invalid")
            }
        } else if (year !== "" || cs !== "" || cb !== "" || ry !== "" || eec !== "") {
            await sendData(data1, dtype)
            await sendData(data2, dtype)
            await sendData(data3, dtype)
            await sendData(data4, dtype, "ok")
        }
    }
    else if (dtype == 'water_demand') {
        if (year == "" || cs == "" || cb == "" || ry == "" || eec == "") {
            $("#errormodal").modal("show")
            if ($('#year').val() == "") {
                $("#year").addClass("is-invalid")
            }
            if ($('#cs').val() == "") {
                $("#cs").addClass("is-invalid")
            }
            if ($('#cb').val() == "") {
                $("#cb").addClass("is-invalid")
            }
            if ($('#ry').val() == "") {
                $("#ry").addClass("is-invalid")
            }
            if ($('#eec').val() == "") {
                $("#eec").addClass("is-invalid")
            }
        } else if (year !== "" || cs !== "" || cb !== "" || ry !== "" || eec !== "") {
            await sendData(data1, dtype)
            await sendData(data2, dtype)
            await sendData(data3, dtype)
            await sendData(data4, dtype, "ok")
        }
    }
    else if (dtype == 'untreated_water') {
        if (year == "" || eec == "") {
            $("#errormodal").modal("show")
            if ($('#eec').val() == "") {
                $("#year").addClass("is-invalid")
            }
            if ($('#year').val() == "") {
                $("#year").addClass("is-invalid")
            }

            $("#cs").removeClass("is-invalid")
            $("#cb").removeClass("is-invalid")
            $("#ry").removeClass("is-invalid")

        } else if (year !== "" || eec !== "") {
            await sendData(data4, dtype, "ok")
        }
    }
    else if (dtype == 'elec_demand') {
        let cate = $('#typedata').val();
        if (cate == 'T01') {
            if (year == "" || cs == "" || cb == "" || ry == "" || eec == "") {
                $("#errormodal").modal("show")
                if ($('#year').val() == "") {
                    $("#year").addClass("is-invalid")
                }
                if ($('#cs').val() == "") {
                    $("#cs").addClass("is-invalid")
                }
                if ($('#cb').val() == "") {
                    $("#cb").addClass("is-invalid")
                }
                if ($('#ry').val() == "") {
                    $("#ry").addClass("is-invalid")
                }
                if ($('#eec').val() == "") {
                    $("#eec").addClass("is-invalid")
                }
            } else if (year !== "" || cs !== "" || cb !== "" || ry !== "" || eec !== "") {
                await sendData(data1, dtype)
                await sendData(data2, dtype)
                await sendData(data3, dtype)
                await sendData(data4, dtype, "ok")
            }
        } else {
            if (year == "" || eec == "") {
                $("#errormodal").modal("show")
                if ($('#eec').val() == "") {
                    $("#year").addClass("is-invalid")
                }
                if ($('#year').val() == "") {
                    $("#year").addClass("is-invalid")
                }

                $("#cs").removeClass("is-invalid")
                $("#cb").removeClass("is-invalid")
                $("#ry").removeClass("is-invalid")

            } else if (year !== "" || eec !== "") {
                await sendData(data4, dtype, "ok")
            }
        }
    }
    else if (dtype == 'econ') {
        let cate = $('#typedata').val();
        if (cate == 'T01') {
            if (year == "" || cs == "" || cb == "" || ry == "" || eec == "") {
                $("#errormodal").modal("show")
                if ($('#year').val() == "") {
                    $("#year").addClass("is-invalid")
                }
                if ($('#cs').val() == "") {
                    $("#cs").addClass("is-invalid")
                }
                if ($('#cb').val() == "") {
                    $("#cb").addClass("is-invalid")
                }
                if ($('#ry').val() == "") {
                    $("#ry").addClass("is-invalid")
                }
                if ($('#eec').val() == "") {
                    $("#eec").addClass("is-invalid")
                }
            } else if (year !== "" || eec !== "") {
                await sendData(data1, dtype)
                await sendData(data2, dtype)
                await sendData(data3, dtype)
                await sendData(data4, dtype, "ok")
            }
        } else {
            if (year == "" || eec == "") {
                $("#errormodal").modal("show")
                if ($('#eec').val() == "") {
                    $("#year").addClass("is-invalid")
                }
                if ($('#year').val() == "") {
                    $("#year").addClass("is-invalid")
                }

                $("#cs").removeClass("is-invalid")
                $("#cb").removeClass("is-invalid")
                $("#ry").removeClass("is-invalid")

            } else if (year !== "" || eec !== "") {
                await sendData(data4, dtype, "ok")
            }
        }
    }
    else if (dtype == 'labor') {
        let cate = $('#typedata').val();
        if (cate == 'T01') {
            if (year == "" || cs == "" || cb == "" || ry == "") {
                $("#errormodal").modal("show")
                if ($('#year').val() == "") {
                    $("#year").addClass("is-invalid")
                }
                if ($('#cs').val() == "") {
                    $("#cs").addClass("is-invalid")
                }
                if ($('#cb').val() == "") {
                    $("#cb").addClass("is-invalid")
                }
                if ($('#ry').val() == "") {
                    $("#ry").addClass("is-invalid")
                }
                $("#eec").removeClass("is-invalid")

            } else if (year !== "" || cs !== "" || cb !== "" || ry !== "") {
                await sendData(data1, dtype)
                await sendData(data2, dtype)
                await sendData(data3, dtype, "ok")
            }
        } else {
            if (year == "" || cs == "" || cb == "" || ry == "" || eec == "") {
                $("#errormodal").modal("show")
                if ($('#year').val() == "") {
                    $("#year").addClass("is-invalid")
                }
                if ($('#cs').val() == "") {
                    $("#cs").addClass("is-invalid")
                }
                if ($('#cb').val() == "") {
                    $("#cb").addClass("is-invalid")
                }
                if ($('#ry').val() == "") {
                    $("#ry").addClass("is-invalid")
                }
                if ($('#eec').val() == "") {
                    $("#eec").addClass("is-invalid")
                }
            } else if (year !== "" || cs !== "" || cb !== "" || ry !== "" || eec !== "") {
                await sendData(data1, dtype)
                await sendData(data2, dtype)
                await sendData(data3, dtype)
                await sendData(data4, dtype, "ok")
            }
        }
    }
    else if (dtype == 'labor_edulevel') {
        if (year == "" || eec == "") {
            $("#errormodal").modal("show")
            if ($('#eec').val() == "") {
                $("#year").addClass("is-invalid")
            }
            if ($('#year').val() == "") {
                $("#year").addClass("is-invalid")
            }

            $("#cs").removeClass("is-invalid")
            $("#cb").removeClass("is-invalid")
            $("#ry").removeClass("is-invalid")

        } else if (year !== "" || eec !== "") {
            await sendData(data4, dtype, "ok")
        }
    }
    else if (dtype == 'waste_raffle') {
        if (year == "" || eec == "") {
            $("#errormodal").modal("show")
            if ($('#eec').val() == "") {
                $("#year").addClass("is-invalid")
            }
            if ($('#year').val() == "") {
                $("#year").addClass("is-invalid")
            }

            $("#cs").removeClass("is-invalid")
            $("#cb").removeClass("is-invalid")
            $("#ry").removeClass("is-invalid")

        } else if (year !== "" || eec !== "") {
            await sendData(data4, dtype, "ok")
        }
    }
    else if (dtype == 'greenhouse_gas') {
        if (year == "" || eec == "") {
            $("#errormodal").modal("show")
            if ($('#eec').val() == "") {
                $("#year").addClass("is-invalid")
            }
            if ($('#year').val() == "") {
                $("#year").addClass("is-invalid")
            }

            $("#cs").removeClass("is-invalid")
            $("#cb").removeClass("is-invalid")
            $("#ry").removeClass("is-invalid")

        } else if (year !== "" || eec !== "") {
            await sendData(data4, dtype, "ok")
        }
    }
    else if (dtype == 'landuse') {
        if (year == "" || cs == "" || cb == "" || ry == "") {
            $("#errormodal").modal("show")
            if ($('#year').val() == "") {
                $("#year").addClass("is-invalid")
            }
            if ($('#cs').val() == "") {
                $("#cs").addClass("is-invalid")
            }
            if ($('#cb').val() == "") {
                $("#cb").addClass("is-invalid")
            }
            if ($('#ry').val() == "") {
                $("#ry").addClass("is-invalid")
            }
            $("#eec").removeClass("is-invalid")

        } else if (year !== "" || cs !== "" || cb !== "" || ry !== "") {
            await sendData(data1, dtype)
            await sendData(data2, dtype)
            await sendData(data3, dtype, "ok")
        }
    } else if (dtype == 'uw_industrybycate') {
        if (year == "" || eec == "") {
            if ($('#year').val() == "") {
                $("#year").addClass("is-invalid")
            }
            if ($('#eec').val() == "") {
                $("#eec").addClass("is-invalid")
            }
        } else if (year !== "" || eec !== "") {
            await sendData(data4, dtype, "ok")
        }
    }

}
let sendData = async (data, type, text) => {
    const obj = {
        data: data,
    }
    $.post(url + `/forecast_eec/${type}/save`, obj).done((r) => {
        console.log(url + `/forecast_eec/${type}/save`)
        // r.data.data == "success" ? console.log("senddata") : null
        if (text && r.data == "success") {
            console.log(r.data)
            $("#Modalconfirm").modal("show")
        }
    })

    // $.post(url + `/form_forcast/savedata`, obj).done((r) => {
    //     console.log(r.data)
    //     if (text && r.data == "success") {
    //         $("#Modalconfirm").modal("show")
    //     }
    // })
}

