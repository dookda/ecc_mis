// const url = 'https://eec-onep.online:3700';
const url = 'http://localhost:3700';

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
        r.data.data.map(i => {
            $("#organize").append(`<option value="${i.prj_operat}">${i.prj_operat}</option>`)
        })
        $("#organize").append(`<option value="อื่นๆ">อื่นๆ</option>`)
    })
}
getData();

let getProject = () => {
    axios.get(url + "/login-api/getplan2_project").then(r => {
        r.data.data.map(i => {
            // console.log(i.assign);
            $("#assign").append(`<hr><input type="checkbox" name="${i.pid}" id="${i.pid}" onchange="getSelect()">
                <span class="label">${i.p_order}. ${i.p_name}</span>`)
        })
        // $("#organize").append(`<option value="อื่นๆ">อื่นๆ</option>`)
    })
}
getProject()

let projArr = [];
let getSelect = async () => {
    projArr = [];
    await $('input:checked').each(function () {
        projArr.push(Number(this.name))
    });
    console.log(projArr);
}

$('#loginForm').submit(function (e) {
    e.preventDefault();
    let obj = {
        data: {
            usrname: $("#usrname").val(),
            pass: $("#pass").val(),
            organize: $("#organize").val() == "อื่นๆ" ? $("#organize_new").val() : $("#organize").val(),
            tel: $("#tel").val(),
            email: $("#email").val(),
            auth: "editor",
            assign: projArr
        }
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