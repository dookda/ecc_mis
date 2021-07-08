let urid = sessionStorage.getItem('id');
let urname = sessionStorage.getItem('name');
let eecauth = sessionStorage.getItem('eecauth');

console.log(eecauth);

$("#usrname").text(urname);
urid ? null : location.href = "./../../form_register/login/index.html";
eecauth == "admin" ? null : location.href = "./../../form_register/login/index.html";

// remove profile
sessionStorage.removeItem('pfid');
sessionStorage.removeItem('pfname');

const url = "https://eec-onep.online:3700";
// const url = 'http://localhost:3700';

$(document).ready(function () {
    let table = $('#myTable').DataTable({
        ajax: {
            type: "POST",
            url: url + '/profile-api/getuser',
            data: { reg_id: urid },
            dataSrc: 'data'
        },
        columns: [
            { data: 'usrname' },
            { data: 'ocup' },
            { data: 'tel' },
            { data: 'email' },
            { data: 'auth' },
            {
                data: null,
                render: (data) => {
                    if (data.approved == 'ตรวจสอบแล้ว') {
                        return `<span class="badge badge-success">ตรวจสอบแล้ว</span>`
                    } {
                        return `<span class="badge badge-warning">ยังไม่ได้ตรวจสอบ</span>`
                    }
                }
            },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return `<button type="button" class="btn btn-margin btn-danger" 
                                onclick="confirmDelete('${row.regid}','${row.usrname}')">
                                <i class="bi bi-trash"></i>&nbsp;ลบผู้ใช้</button>
                                <br>
                                <button type="button" class="btn btn-margin btn-success" 
                                onclick="manageUser('${row.regid}','${row.usrname}')">
                                <i class="bi bi-file-earmark-person"></i>&nbsp;จัดการผู้ใช้</button>`
                },
                // width: "10%"
            }
        ],
        searching: true,
    });
})

let confirmDelete = (uid, usrname) => {
    $("#uid").val(uid)
    $("#name").text(usrname)
    $("#usrname").val(usrname)
    $("#deleteModal").modal("show")
}

let closeModal = () => {
    $('#deleteModal').modal('hide')
    $('#myTable').DataTable().ajax.reload();
}

let deleteValue = () => {
    let uid = $("#uid").val()
    let usrname = $("#usrname").val()
    axios.post(url + "/profile-api/delete", { regid: uid, usrname: usrname }).then(r => {
        r.data.data == "success" ? closeModal() : null
    })
}

let manageUser = (uid, usrname) => {
    sessionStorage.setItem('pfid', uid);
    sessionStorage.setItem('pfname', usrname);
    sessionStorage.setItem('fromadmin', 'yes');
    location.href = "./../profile/index.html";
}









