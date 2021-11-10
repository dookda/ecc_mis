let uid = sessionStorage.getItem('key');
let typ = sessionStorage.getItem('typ');
let org = sessionStorage.getItem('org');

let logout = () => {
    sessionStorage.clear();
    location.href = "./../login/index.html";
}
// console.log(uid, org);
uid && org ? null : logout();

if (typ == "admin") {
    $("#usermenu").append(`<li><a href=""><i class="bi bi-person-square"></i>&nbsp;<span >${org}</span></a></li>
        <li><a href="./../admin/index.html"><i class="bi bi-tools"></i>&nbsp;จัดการผู้ใช้</a></li>`)
} else {
    $("#usermenu").append(`<li><a href="" ><i class="bi bi-person-square"></i>&nbsp;<span >${org}</span>></a></li>`)
}

let searchParams = new URLSearchParams(window.location.search)
let id = searchParams.get('id')

// console.log(id)

const url = "https://eec-onep.online:3700";
// const url = 'http://localhost:3700';

$("#prj_measure").change(i => {
    let a = $("#prj_measure").val()
    console.log(a);
    getActivity($("#prj_measure").val())
})

let refreshPage = () => {
    // location.reload(true);
    window.open("./../p1_report/index.html", "_self");
}

let getActivity = (prj_measure) => {
    axios.post(url + "/projmon-api/getmeasure", { prj_measure: prj_measure }).then(r => {
        $("#list_measure").empty()
        axios.post(url + "/projmon-api/getmeasurebyactnonprj", { prj_id: id }).then(x => {
            // console.log(x, prj_measure);
            if (x.data.data[0].prj_measure == prj_measure) {
                r.data.data.map((i, k) => {

                    // console.log(x);
                    if (k + 1 == 1) {
                        $("#list_measure").append(`<li>${i.prj_detail}</li>
                        <b>การดำเนินงานที่สอดคล้องกับแนวทางการปฏิบัติ</b>
                        <br><input type="text" class="form-control" id="act_${k + 1}" value="${x.data.data[0].act_1 == null ? "" : x.data.data[0].act_1}">`)
                    }
                    if (k + 1 == 2) {
                        $("#list_measure").append(`<li>${i.prj_detail}</li>
                        <b>การดำเนินงานที่สอดคล้องกับแนวทางการปฏิบัติ</b>
                        <br><input type="text" class="form-control" id="act_${k + 1}" value="${x.data.data[0].act_2 == null ? "" : x.data.data[0].act_2}">`)
                    }
                    if (k + 1 == 3) {
                        $("#list_measure").append(`<li>${i.prj_detail}</li>
                        <b>การดำเนินงานที่สอดคล้องกับแนวทางการปฏิบัติ</b>
                        <br><input type="text" class="form-control" id="act_${k + 1}" value="${x.data.data[0].act_3 == null ? "" : x.data.data[0].act_3}">`)
                    }
                    if (k + 1 == 4) {
                        $("#list_measure").append(`<li>${i.prj_detail}</li>
                        <b>การดำเนินงานที่สอดคล้องกับแนวทางการปฏิบัติ</b>
                        <br><input type="text" class="form-control" id="act_${k + 1}" value="${x.data.data[0].act_4 == null ? "" : x.data.data[0].act_4}">`)
                    }
                    if (k + 1 == 5) {
                        $("#list_measure").append(`<li>${i.prj_detail}</li>
                        <b>การดำเนินงานที่สอดคล้องกับแนวทางการปฏิบัติ</b>
                        <br><input type="text" class="form-control" id="act_${k + 1}" value="${x.data.data[0].act_5 == null ? "" : x.data.data[0].act_5}">`)
                    }
                    if (k + 1 == 6) {
                        $("#list_measure").append(`<li>${i.prj_detail}</li>
                        <b>การดำเนินงานที่สอดคล้องกับแนวทางการปฏิบัติ</b>
                        <br><input type="text" class="form-control" id="act_${k + 1}" value="${x.data.data[0].act_6 == null ? "" : x.data.data[0].act_6}">`)
                    }
                    if (k + 1 == 7) {
                        $("#list_measure").append(`<li>${i.prj_detail}</li>
                        <b>การดำเนินงานที่สอดคล้องกับแนวทางการปฏิบัติ</b>
                        <br><input type="text" class="form-control" id="act_${k + 1}" value="${x.data.data[0].act_7 == null ? "" : x.data.data[0].act_7}">`)
                    }
                    if (k + 1 == 8) {
                        $("#list_measure").append(`<li>${i.prj_detail}</li>
                        <b>การดำเนินงานที่สอดคล้องกับแนวทางการปฏิบัติ</b>
                        <br><input type="text" class="form-control" id="act_${k + 1}" value="${x.data.data[0].act_8 == null ? "" : x.data.data[0].act_8}">`)
                    }
                    if (k + 1 == 9) {
                        $("#list_measure").append(`<li>${i.prj_detail}</li>
                        <b>การดำเนินงานที่สอดคล้องกับแนวทางการปฏิบัติ</b>
                        <br><input type="text" class="form-control" id="act_${k + 1}" value="${x.data.data[0].act_9 == null ? "" : x.data.data[0].act_9}">`)
                    }
                    if (k + 1 == 10) {
                        $("#list_measure").append(`<li>${i.prj_detail}</li>
                        <b>การดำเนินงานที่สอดคล้องกับแนวทางการปฏิบัติ</b>
                        <br><input type="text" class="form-control" id="act_${k + 1}" value="${x.data.data[0].act_10 == null ? "" : x.data.data[0].act_10}">`)
                    }
                    if (k + 1 == 10) {
                        $("#list_measure").append(`<li>${i.prj_detail}</li>
                        <b>การดำเนินงานที่สอดคล้องกับแนวทางการปฏิบัติ</b>
                        <br><input type="text" class="form-control" id="act_${k + 1}" value="${x.data.data[0].act_11 == null ? "" : x.data.data[0].act_11}">`)
                    }
                })
            } else {
                r.data.data.map((i, k) => {
                    // console.log(k);
                    $("#list_measure").append(`<li>${i.prj_detail}</li>
                        <b>การดำเนินงานที่สอดคล้องกับแนวทางการปฏิบัติ</b>
                        <br><input type="text" class="form-control" id="act_${k + 1}">`)
                })
            }
        })
    })
}

let getValue = (id) => {
    axios.post(url + "/projmon-api/getonenonproj", { prj_id: id }).then(async (r) => {
        // console.log(r.data.data[0]);
        $('#prj_id').val(r.data.data[0].prj_id)
        $('#prj_measure').val(r.data.data[0].prj_measure)
        $('#prj_cate').val(r.data.data[0].prj_cate)
        if (r.data.data[0].prj_measure) {
            getActivity(r.data.data[0].prj_measure)
        }
    })
}

getValue(id)

$("#fieldForm").submit(function (e) {
    e.preventDefault();
    const obj = {
        prj_id: $('#prj_id').val(),
        data: {
            prj_measure: $('#prj_measure').val(),
            act_1: $('#act_1').val(),
            act_2: $('#act_2').val(),
            act_3: $('#act_3').val(),
            act_4: $('#act_4').val(),
            act_5: $('#act_5').val(),
            act_6: $('#act_6').val(),
            act_7: $('#act_7').val(),
            act_8: $('#act_8').val(),
            act_9: $('#act_9').val(),
            act_10: $('#act_10').val(),
            act_11: $('#act_11').val(),
            prj_cate: $('#prj_cate').val()
        }
    }
    console.log(obj);
    axios.post(url + "/projmon-api/updatenonprojdata", obj).then((r) => {
        r.data.data == "success" ? refreshPage() : null
    })
    return false;
});











