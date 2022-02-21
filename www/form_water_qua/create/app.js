let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let f_water_qua = sessionStorage.getItem('f_water_qua');
$(document).ready(() => {
    if (urid) {
        if (f_water_qua == 'false') {
            $("#noauth").modal("show");
        }
    } else {
        $("#noauth").modal("show");
    }
})
let gotoLogin = () => {
    location.href = "./../../form_register/login/index.html";
}

$("#usrname").text(urname);

const url = "https://engrids.soc.cmu.ac.th/api";

let refreshPage = () => {
    // window.open("./../report/index.html", "_self");
    // console.log("ok");
}

let gotoReport = () => {
    location.href = "./../report/index.html";
}

$('#report_n').on("input", function () {
    if (this.value == '') {
        $("#report_n").addClass("is-invalid")
        console.log("false")
    } else {
        $("#report_n").removeClass("is-invalid")
        console.log("true")
    }
})
$('#syst').on("input", function () {
    if (this.value == '') {
        $("#syst").addClass("is-invalid")
        console.log("false")
    } else {
        $("#syst").removeClass("is-invalid")
        console.log("true")
    }
})
$('#systype').on("input", function () {
    if (this.value == '') {
        $("#systype").addClass("is-invalid")
        console.log("false")
    } else {
        $("#systype").removeClass("is-invalid")
        console.log("true")
    }
})
$('#insti').on("input", function () {
    if (this.value == '') {
        $("#insti").addClass("is-invalid")
        console.log("false")
    } else {
        $("#insti").removeClass("is-invalid")
        console.log("true")
    }
})
$('#prov').on("input", function () {
    if (this.value == '') {
        $("#prov").addClass("is-invalid")
        console.log("false")
    } else {
        $("#prov").removeClass("is-invalid")
        console.log("true")
    }
})
$('#date').on("input", function () {
    if (this.value == '') {
        $("#date").addClass("is-invalid")
        console.log("false")
    } else {
        $("#date").removeClass("is-invalid")
        console.log("true")
    }
})

let insertData = () => {
    if ($('#report_n').val() == "" || $('#syst').val() == "" || $('#insti').val() == "" || $('#prov').val() == "" || $('#date').val() == "") {
        $("#NOdatamodal").modal("show")
        if ($('#report_n').val() == "") {
            $("#report_n").addClass("is-invalid")
        }
        if ($('#syst').val() == "") {
            $("#syst").addClass("is-invalid")
        }
        if ($('#insti').val() == "") {
            $("#insti").addClass("is-invalid")
        }
        if ($('#prov').val() == "") {
            $("#prov").addClass("is-invalid")
        }
        if ($('#date').val() == "") {
            $("#date").addClass("is-invalid")
        }
    } else if ($('#report_n').val() !== "" || $('#syst').val() !== "" || $('#insti').val() == "" || $('#prov').val() == "" || $('#date').val() == "") {
        const obj = {
            data: {
                usrid: urid,
                usrname: urname,
                report_n: $('#report_n').val(),
                systype: $('#systype').val(),
                capacity: $('#capacity').val(),
                insti: $('#insti').val(),
                prov: $('#prov').val(),
                syst: $('#syst').val(),
                date: $('#date').val()
            }
        }

        axios.post(url + "/wq-api/createreport", obj).then(r => {
            // console.log(obj);
            if (r.data.data == "success") {
                $('#report_n').val("")
                $('#systype').val("")
                $('#capacity').val("")
                $('#insti').val("")
                $('#prov').val("")
                $('#syst').val("")
                $('#date').val("")

                $("#rid").text("หมายเลขอ้างอิง: " + r.data.rid)
                $("#qr").attr("src", r.data.qr);
                $("#edit").html(`<a class="btn btn-success" href="./../edit_bf/index.html?id=${r.data.rid}"><i
            class="bi bi-plus-circle-fill"></i>&nbsp;เริ่มกรอกข้อมูล</a>`)
            }
        })
        return false;
    }
}














