let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
$("#usrname").text(urname);

eecauth ? null : location.href = "./../../form_register/login/index.html";
if (urname) {
    $("#usrname").text(urname);
    // $("#usr1").hide();
}
if (eecauth !== "admin") {
    location.href = "./../../form_register/login/index.html";
}
$('#cardtable').hide();
$('#data').on('change', function () {
    $("#cardtable").fadeIn("slow");

    gettype(this.value)
    $("#myTable").dataTable().fnDestroy();
    loadTable(this.value, "All")

})
$("#typedata").on('change', function () {
    let title_n = $("#typedata option:selected").text();
    let type = $('#data').val();

    $("#myTable").dataTable().fnDestroy();
    loadTable(type, this.value)
    table.ajax.reload();
})
$('#year').on("change", function () {
    if (this.value !== 'eec') {
        table.search(this.value).draw();
    } else {
        table.search("").draw();
    }
})
let gettype = (type) => {
    $("#typedata").empty().append(`<option value="eec">เลือกประเภทข้อมูล</option>`);
    if (type !== 'eec') {
        axios.post(url + `/forecast_eec/${type}/Ttype`).then(r => {
            r.data.data.map(i => {
                $("#typedata").append(`<option value="${i.title_c}">${i.title_n}</option>`)
            })
        })
    } else { $("#typedata").prop("disabled", false); }
}
const unique = (value, index, self) => {
    return self.indexOf(value) === index
}
let getyear = (data) => {
    $("#year").empty().append(`<option value="eec">เลือกปี</option>`);
    let type = $("#typedata").val();
    if (type !== 'eec') {
        // let d = []
        // data.map(i => {
        //     d.push({ year: i.y_year })
        //     //     $("#year").append(`<option value="${i.y_year}">${i.y_year}</option>`)

        // })
        // console.log(d)
        const uniqueArr = [... new Set(data.map(i => i.y_year))]
        console.log(uniqueArr)
    } else { $("#year").prop("disabled", false); }
}
let table
let loadTable = (type, code) => {
    $.extend(true, $.fn.dataTable.defaults, {
        "language": {
            "sProcessing": "กำลังดำเนินการ...",
            "sLengthMenu": "แสดง_MENU_ แถว",
            "sZeroRecords": "ไม่พบข้อมูล",
            "sInfo": "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
            "sInfoEmpty": "แสดง 0 ถึง 0 จาก 0 แถว",
            "sInfoFiltered": "(กรองข้อมูล _MAX_ ทุกแถว)",
            "sInfoPostFix": "",
            "sSearch": "ค้นหา:",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "เริ่มต้น",
                "sPrevious": "ก่อนหน้า",
                "sNext": "ถัดไป",
                "sLast": "สุดท้าย"
            },
            "emptyTable": "ไม่พบข้อมูล..."
        }
    });
    let button = `<button type="button" class="btn btn-info" id="edit">แก้ไขข้อมูล</button>
    <button type="button" class="btn btn-danger" id="delete">ลบ!</button>`

    table = $('#myTable').DataTable({
        ajax: {
            type: "post",
            url: url + `/forecast_eec/${type}/Tdata`,
            data: { title_c: code },
            dataSrc: 'data'
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    // console.log(data);
                    return `
                <button type="button" class="btn btn-margin btn-warning" id="edit"><i class="bi bi-pencil-square"></i>&nbsp;แก้ไขข้อมูล</button>
                <button type="button" class="btn btn-margin btn-danger" id="delete"><i class="bi bi-trash"></i>&nbsp;ลบข้อมูล</button>`
                },
            },
            { data: 'title_n' },
            { data: 'prov_n' },
            { data: 'y_year' },
            { data: 'v_value' },
            { data: 'unit_n' },

        ],
        columnDefs: [
            { className: 'text-center', targets: [1, 2, 3, 4, 5] },
            { width: 200, targets: 0 }
        ],
        searching: true,
        scrollX: true,
        dom: 'Bfrtip',
        buttons: [
            'excel', 'print'
        ],
        // pageLength: 5
    });

    table.on('search.dt', function () {
        let data = table.rows({ search: 'applied' }).data()
        // console.log(data);
        // $("#siteCnt").text(data.length)
        // getyear(data)
        // console.log();
    });

    $('#myTable tbody').on('click', '#edit', function () {
        var data = table.row($(this).parents('tr')).data();
        editdata(data)
    });

    $('#myTable tbody').on('click', '#delete', function () {
        var data = table.row($(this).parents('tr')).data();
        confirmDelete(data)
    });

    $("#year").empty().append(`<option value="eec">เลือกปี</option>`);
    axios.post(url + `/forecast_eec/${type}/Tyear`, { title_c: code }).then(r => {
        // console.log(r.data.data)
        r.data.data.map(i => {
            $("#year").append(`<option value="${i.y_year}">${i.y_year}</option>`)
        })
    })
}

const url = "https://engrids.soc.cmu.ac.th/api";
// $("#editModal").modal("show")
let editdata = (data) => {
    $("#editModal").modal("show")
    // console.log(data)
    let E_data = $("#data option:selected").text();
    $("#E_data").text(`${E_data}`);
    $("#E_type").text(`ประเภทข้อมูล: ${data.title_n} ปี: ${data.y_year}`);
    $("#E_prov").text(data.prov_n);
    $("#E_value").val(data.v_value);
    $("#E_unit").text(data.unit_n);
    $("#Eid_data").val(data.id_data)
}

let closeModal = () => {
    $('#editModal').modal('hide')
    $('#deleteModal').modal('hide')
    $('#myTable').DataTable().ajax.reload();
}

let confirmDelete = (data) => {
    let E_data = $("#data option:selected").text();
    let D_type = $("#data").val()
    $("#projId").val(data.id_data)
    $("#D_type").val(D_type)
    $("#projName").text(`${E_data}`)
    $("#projType").text(`${data.title_n}`)
    $("#projYear").text(`${data.y_year}`)

    // if (date !== 'null') {
    //     $("#projTime").text(`วันที่ ${date}`)
    // }
    $("#deleteModal").modal("show")
}

let deleteValue = () => {
    // console.log($("#projId").val());
    let type = $("#D_type").val()
    let proj_id = $("#projId").val()
    // var url = "http://localhost:3000"
    axios.post(url + `/forecast_eec/${type}/delete`, { id_data: proj_id }).then(r => {
        r.data.data == "success" ? closeModal() : null;
        // window.location.reload();
        table.ajax.reload();
    })
}

function saveData() {
    let data = [{
        type: $("#data").val(),
        v_value: $("#E_value").val(),
        id_data: $("#Eid_data").val()
    }]
    // console.log(data)
    closeModal()
    sendData(data)
}

let sendData = (data) => {
    const obj = {
        data: data
    }
    // console.log(obj)
    console.log(url + `/forecast_eec/${obj.data[0].type}/update`)
    // var url = "http://localhost:3000"
    $.post(url + `/forecast_eec/${obj.data[0].type}/update`, obj).done((r) => {
        r.data.data == "success"

        // window.location.reload();
        table.ajax.reload();
    })
}
