let uid = sessionStorage.getItem('key');
let typ = sessionStorage.getItem('typ');
let org = sessionStorage.getItem('org');

let logout = () => {
    sessionStorage.clear();
    location.href = "./../login/index.html";
}
uid && typ == "admin" ? null : logout();
$("#aut").html(`${org}`)

const url = "https://engrids.soc.cmu.ac.th/api";

$(document).ready(function () {
    let table = $('#myTable').DataTable({
        ajax: {
            type: "POST",
            url: url + '/login-api/getuser',
            data: { uid: uid },
            dataSrc: 'data'
        },
        columns: [
            { data: 'usrname', width: "20%" },
            { data: 'organize', width: "30%" },
            { data: 'tel', width: "20%" },
            { data: 'email', width: "20%" },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return `<button type="button" class="btn btn-margin btn-danger" 
                                onclick="confirmDelete('${row.uid}','${row.usrname}')">
                                <i class="bi bi-trash"></i>&nbsp;ลบ</button>`
                },
                width: "10%"
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
    axios.post(url + "/login-api/delete", { uid: uid, usrname: usrname }).then(r => {
        r.data.data == "success" ? closeModal() : null
    })
}










