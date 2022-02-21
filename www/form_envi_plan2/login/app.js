const url = "https://engrids.soc.cmu.ac.th/api";

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
        location.href = "./../dashboard/index.html";
        sessionStorage.setItem('key', id.uid);
        sessionStorage.setItem('typ', id.auth);
        sessionStorage.setItem('org', id.organize);
        sessionStorage.setItem('usrname', id.usrname);
    } else {
        // console.log(id);
        location.href = "./../dashboard/index.html";
        sessionStorage.setItem('key', id.uid);
        sessionStorage.setItem('typ', id.auth);
        sessionStorage.setItem('org', id.organize);
        sessionStorage.setItem('usrname', id.usrname);
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
            console.log(r.data.data);
            r.data.data.length > 0 ? gotoPage(r.data.data[0]) : $("#modal").modal('show');
        })
    } else {
        $("#modal").modal('show');
    }

    return false
})