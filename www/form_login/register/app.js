const url = 'http://localhost:3700';

let refreshPage = () => {
    console.log("sdfghj");
    window.open('./../login/index.html', '_self');
}

let getData = () => {
    axios.get(url + "/login-api/getorg").then(r => {
        console.log(r.data.data);
        r.data.data.map(i => {
            $("#organize").append(`<option value="${i.prj_operat}">${i.prj_operat}</option>`)
        })
    })
}
getData()

$('#loginForm').submit(function (e) {
    e.preventDefault();
    let obj = {
        usrname: $("#usrname").val(),
        pass: $("#pass").val(),
        organize: $("#organize").val(),
        tel: $("#tel").val(),
        email: $("#email").val(),
        auth: "editor"
    }
    if ($("#usrname").val() && $("#pass").val()) {
        axios.post(url + "/login-api/insert", obj).then(r => {
            r.data.data == "success" ? refreshPage() : console.log(r);
        })
    } else {
        console.log("โปรดระบุชื่อผู้ใช้");
        $("#modal").modal('show');
    }

    return false
})