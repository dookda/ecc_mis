const url = 'https://eec-onep.online/:3700';


let uid = sessionStorage.getItem('key');
console.log(uid);

let gotoPage = (id) => {
    if (id.auth == "admin") {
        console.log(id);
        location.href = "./../admin/index.html";
        sessionStorage.setItem('key', id.uid);
    } else {
        console.log(id);
        location.href = "./../logged/index.html";
        sessionStorage.setItem('key', id.uid);
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