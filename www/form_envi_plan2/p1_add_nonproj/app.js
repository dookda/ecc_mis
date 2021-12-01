let uid = sessionStorage.getItem('key');
let typ = sessionStorage.getItem('typ');
let org = sessionStorage.getItem('org');

let usrname = sessionStorage.getItem('usrname');

let logout = () => {
    sessionStorage.clear();
    location.href = "./../login/index.html";
}
// uid && typ == "admin" ? null : logout();

uid && org ? null : logout();

if (typ == "admin") {
    $("#usermenu").append(`<li><a href=""><i class="bi bi-person-square"></i>&nbsp;<span >${usrname}</span></a></li>
        <li><a href="./../admin/index.html"><i class="bi bi-tools"></i>&nbsp;จัดการผู้ใช้</a></li>`)
} else {
    $("#usermenu").append(`<li><a href="" ><i class="bi bi-person-square"></i>&nbsp;<span >${usrname}</span></a></li>`)
}

let refreshPage = () => {
    // location.reload(true);
    window.open("./../p1_report/index.html", "_self");
}

const url = "https://eec-onep.online:3700";
// const url = 'http://localhost:3700';

$("#prj_cate").change(i => {
    console.log(i)
})

$("#div_proc_troub").hide()
$("#div_fund_troub").hide()
// $("#div_fund_accpt").hide()
// $("#div_opert_stat").hide()

$("#div_opert_estm").hide()
$("#div_budg_year").hide()

$("#prj_measure").change(i => {
    let a = $("#prj_measure").val()
    // console.log(a);
    getActivity($("#prj_measure").val())
})

let getActivity = (prj_measure) => {
    axios.post(url + "/projmon-api/getmeasure", { prj_measure: prj_measure }).then(r => {
        // console.log(r);
        $("#list_measure").empty()
        r.data.data.map((i, k) => {
            // console.log(k);
            $("#list_measure").append(`<li>${i.prj_detail}</li>
                <b>การดำเนินงานที่สอดคล้องกับแนวทางการปฏิบัติ</b>
                <br><input type="text" class="form-control" id="act_${k + 1}">`)
        })
    })
}

$("#fieldForm").submit(function (e) {
    e.preventDefault();
    tinyMCE.triggerSave();

    const obj = {
        data: {
            prj_operat: org,
            prj_cate: $('#prj_cate').val(),
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
        }
    }
    console.log(obj);
    axios.post(url + "/projmon-api/insertnonprojdata", obj).then((r) => {
        r.data.data == "success" ? refreshPage() : null
    })
    return false;
});

