let urid = sessionStorage.getItem('id');
let urname = sessionStorage.getItem('name');
$("#usrname").text(urname);
urid ? null : location.href = "./../../form_register/login/index.html";

const url = "https://eec-onep.online:3700";
// const url = 'http://localhost:3700';

let refreshPage = () => {
    // window.open("./../report/index.html", "_self");
    console.log("ok");
}

let insertData = () => {
    const obj = {
        data: {
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
            $("#report").html(`<a class="btn btn-info" href="./../report/index.html"><i class="bi bi-file-earmark-text-fill"></i>&nbsp;ไปหน้ารายงาน</a>`)
            $("#edit").html(`<a class="btn btn-success" href="./../edit_bf/index.html?id=${r.data.rid}"><i
            class="bi bi-plus-circle-fill"></i>&nbsp;เริ่มกรอกข้อมูล</a>`)
        }
    })
    return false;
}














