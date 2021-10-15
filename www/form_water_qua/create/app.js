let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let f_water_qua = sessionStorage.getItem('f_water_qua');

if (f_water_qua == 'false') {
    location.href = "./../../form_register/login/index.html";
}

$("#usrname").text(urname);

const url = "https://eec-onep.online:3700";
// const url = 'http://localhost:3700';

let refreshPage = () => {
    // window.open("./../report/index.html", "_self");
    // console.log("ok");
}

let gotoReport = () => {
    location.href = "./../report/index.html";
}

let insertData = () => {
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














