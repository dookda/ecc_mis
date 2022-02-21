const url = "https://engrids.soc.cmu.ac.th/api";

let uid = sessionStorage.getItem("pfuid");

let login = () => {
    // sessionStorage.clear();
    location.href = "./../dashboard/index.html";
}

let organize = "";
$("#org_new").hide();

$("#organize").on("change", function () {
    this.value == "อื่นๆ" ? $("#org_new").show() : $("#org_new").hide();
    // console.log();
})

let getData = (uid) => {
    axios.post(url + "/login-api/getprofile", { uid }).then(r => {
        console.log(r.data.data);
        document.getElementById("usrname").value = r.data.data[0].usrname;
        document.getElementById("pass").value = r.data.data[0].pass;
        document.getElementById("organize").value = r.data.data[0].organize;
        document.getElementById("tel").value = r.data.data[0].tel;
        document.getElementById("email").value = r.data.data[0].email;
        document.getElementById("auth").value = r.data.data[0].auth;
    })
}
getData(uid);

let update = () => {
    let obj = {
        uid: uid,
        data: {
            usrname: document.getElementById("usrname").value,
            pass: document.getElementById("pass").value,
            organize: document.getElementById("organize").value,
            // organize: $("#organize_new").val() != "",
            tel: document.getElementById("tel").value,
            email: document.getElementById("email").value,
            auth: document.getElementById("auth").value
        }
    }
    console.log(obj);

    axios.post(url + "/login-api/updateprofile", obj).then(r => {
        r.data.data == "success" ? getData(uid) : console.log(r);
        $("#modal").modal('show');
    })
}

sessionStorage.removeItem("pfuid");
// let uid = sessionStorage.getItem("uid");
// console.log(uid)