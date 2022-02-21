let uid = sessionStorage.getItem('key');
let typ = sessionStorage.getItem('typ');
let org = sessionStorage.getItem('org');

let logout = () => {
    sessionStorage.clear();
    location.href = "./../login/index.html";
}
// console.log(uid, org);
uid && org ? null : logout();
$("#aut").html(`${org}`)

if (typ == "admin") {
    $("#isadmin").show()
    $("#isadmin2").show()
} else {
    $("#isadmin").hide()
    $("#isadmin2").hide()
}
const url = "https://engrids.soc.cmu.ac.th/api";
// map.addLayer(drawnItems);

let confirmDelete = (prj_id, prj_name, tbType) => {
    $("#projId").val(prj_id)
    $("#projName").text(prj_name)
    $("#tbType").val(tbType)
    $("#deleteModal").modal("show")
}

let closeModal = () => {
    $('#editModal').modal('hide')
    $('#deleteModal').modal('hide')
    $('#myTable').DataTable().ajax.reload();
}

let deleteValue = () => {
    // console.log($("#projId").val());
    let prj_id = $("#projId").val()
    if ($("#tbType").val() == "prj") {
        axios.post(url + "/projmon-api/deletedata", { prj_id: prj_id }).then(r => {
            if (r.data.data == "success") {
                $('#editModal').modal('hide')
                $('#deleteModal').modal('hide')
                $('#myTable').DataTable().ajax.reload();
            }
        })
    }

    if ($("#tbType").val() == "nonprj") {
        axios.post(url + "/projmon-api/deletedatanonprj", { prj_id: prj_id }).then(r => {
            if (r.data.data == "success") {
                $('#editModal').modal('hide')
                $('#deleteModal').modal('hide')
                $('#mTable').DataTable().ajax.reload();
            }
        })
    }
}


let loadTable2 = () => {
    let table = $('#mTable').DataTable({
        ajax: {
            type: "POST",
            url: url + '/projmon-api/getnonprojdata',
            data: { org: org, typ: typ },
            dataSrc: 'data'
        },
        columns: [
            {
                data: '',
                render: (data, type, row, meta) => {
                    // console.log(row);
                    return `${meta.row + 1}`
                }
            },
            { data: 'prj_cate' },
            { data: 'prj_measure' },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return `
                       <a type="button" class="btn btn-margin btn-info" href="./../edit_nonprj/index.html?id=${row.prj_id}"><i class="bi bi-gear-fill"></i>&nbsp;รายละเอียด</a>
                       <button type="button" class="btn btn-margin btn-danger" onclick="confirmDelete(${row.prj_id},'${row.prj_name}', 'nonprj')"><i class="bi bi-trash"></i>&nbsp;ลบ</button>`
                },
                // width: "11%"
            }
        ],
        searching: true,
        scrollX: false,
        // order: [2, 'asc'],
    });
}
loadTable2()

let refreshPage = () => {
    // location.reload(true);
    window.open("./../report/index.html", "_self");
}







