// const url = "https://eec-onep.online:3700";
const url = 'https://eec-onep.online:3700';

let uid = sessionStorage.getItem('key');
let typ = sessionStorage.getItem('typ');
let org = sessionStorage.getItem('org');

let gotoDashboard = () => {
    sessionStorage.clear();
    location.href = "./../dashboard/index.html";
}

let gotoPage = (id) => {
    if (id.auth == "admin") {
        // console.log(id);
        location.href = "./../report/index.html";
        sessionStorage.setItem('key', id.uid);
        sessionStorage.setItem('typ', id.auth);
        sessionStorage.setItem('org', id.organize);
    } else {
        // console.log(id);
        location.href = "./../report/index.html";
        sessionStorage.setItem('key', id.uid);
        sessionStorage.setItem('typ', id.auth);
        sessionStorage.setItem('org', id.organize);
    }
}

$('#loginForm').submit(function (e) {
    e.preventDefault();
    let obj = {
        usrname: $("#usrname").val(),
        pass: $("#pass").val()
    }
    if ($("#usrname").val() && $("#pass").val()) {
        axios.post(url + "/login-api/validate", obj).then(r => {
            // console.log(r.data.data);
            r.data.data.length > 0 ? gotoPage(r.data.data[0]) : $("#modal").modal('show');
        })
    } else {
        $("#modal").modal('show');
    }

    return false
})

$("#loginplan1").show();
$("#loginplan2").hide();
$("#planitem").on("change", () => {
    if ($("#planitem").val() == "plan2") {
        $("#loginplan1").hide();
        $("#loginplan2").show();
    } else {
        $("#loginplan1").show();
        $("#loginplan2").hide();
    }
})

let getuser = () => {
    axios.get(url + "/projmon2-api/getuser").then(r => {
        $("#usrname").append(`<option value="admin">admin</option>`)
        r.data.data.map(i => {
            $("#usrname").append(`<option value="${i.prj_operat}">${i.prj_operat}</option>`)
        })
    })
}
getuser()