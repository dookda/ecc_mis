const url = 'https://eec-onep.online:3700';

let login = () => {
    sessionStorage.clear();
    location.href = "./../login/index.html";
}

let organize = "";
$("#org_new").hide();

$("#organize").on("change", function () {
    this.value == "อื่นๆ" ? $("#org_new").show() : $("#org_new").hide();
    // console.log();
})


let getData = () => {
    axios.get(url + "/login-api/getorg").then(r => {
        // console.log(r.data.data);
        // $("#organize").append(`<option ></option>`)
        r.data.data.map(i => {
            $("#organize").append(`<option value="${i.prj_operat}">${i.prj_operat}</option>`)
        })
        $("#organize").append(`<option value="อื่นๆ">อื่นๆ</option>`)
    })
}
getData();

$('#loginForm').submit(function (e) {
    e.preventDefault();
    let obj = {
        usrname: $("#usrname").val(),
        pass: $("#pass").val(),
        organize: $("#organize").val() == "อื่นๆ" ? $("#organize_new").val() : $("#organize").val(),
        // organize: $("#organize_new").val() != "",
        tel: $("#tel").val(),
        email: $("#email").val(),
        auth: "editor"
    }
    if ($("#usrname").val() && $("#pass").val()) {
        // console.log(obj);
        axios.post(url + "/login-api/insert", obj).then(r => {
            r.data.data == "success" ? login() : console.log(r);
        })
    } else {
        console.log("โปรดระบุชื่อผู้ใช้");
        $("#modal").modal('show');
    }
    return false
})