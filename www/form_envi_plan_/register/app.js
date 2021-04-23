let uid = sessionStorage.getItem('key');
let typ = sessionStorage.getItem('typ');
let org = sessionStorage.getItem('org');

let logout = () => {
    sessionStorage.clear();
    location.href = "./../login/index.html";
}
uid && typ == "admin" ? null : logout();
$("#aut").html(`${org}`)
// const url = 'http://localhost:3700';
const url = 'https://eec-onep.online:3700';


let login = () => {
    sessionStorage.clear();
    location.href = "./../login/index.html";
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
            r.data.data == "success" ? login() : console.log(r);
        })
    } else {
        console.log("โปรดระบุชื่อผู้ใช้");
        $("#modal").modal('show');
    }

    return false
})