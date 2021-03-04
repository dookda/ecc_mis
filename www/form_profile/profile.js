let userId;

let main = async () => {
    await liff.init({ liffId: "1655648770-9WRXkGJG" })
    if (liff.isLoggedIn()) {
        getUserProfile()
    } else {
        liff.login()
    }
}

main()

let getUserProfile = async () => {
    const profile = await liff.getProfile();
    $('#profile').attr('src', await profile.pictureUrl);
    $('#userId').text(profile.userId);
    $('#statusMessage').text(await profile.statusMessage);
    $('#displayName').text(await profile.displayName);
    userId = await profile.userId;
    getAccount(userId)
}

// var url = 'http://localhost:3700';
var url = 'https://eec-onep.online:3700';

function onLocationError(e) {
    console.log(e.message);
}

function refreshPage() {
    location.reload(true);
}

let closeLiff = async () => {
    liff.sendMessages([
        {
            type: 'text',
            text: 'ขอบคุณที่เป็นสามาชิกกับเรา'
        }, {
            type: 'text',
            text: 'เลือกที่เมนูเพิ่มข้อมูล เพื่อสรา้งให้ข้อมูลร่วมกันครับ'
        }
    ]).then(() => {
        liff.closeWindow();
    }).catch((err) => {
        console.log('error', err);
    });
}


axios.post(url + '/profile-api/getprofile', { userid: userId }).then(res => {
    console.log(res.data.data[0]);
    $('#usrname').val(res.data.data[0].usrname);
    $('#tele').val(res.data.data[0].tele);
    $('#email').val(res.data.data[0].email);
    $('#prov').val(res.data.data[0].prov);
    $('#ocup').val(res.data.data[0].ocup);
    $('#sex').val(res.data.data[0].sex);

    res.data.data[0].biodiversity == "yes" ? $("#biodiversity").prop("checked", true) : $("#biodiversity").prop("checked", false);
    res.data.data[0].greenArea == "yes" ? $("#greenArea").prop("checked", true) : $("#greenArea").prop("checked", false);
    res.data.data[0].hforest == "yes" ? $("#hforest").prop("checked", true) : $("#hforest").prop("checked", false);
    res.data.data[0].organic == "yes" ? $("#organic").prop("checked", true) : $("#organic").prop("checked", false);
    res.data.data[0].airQua == "yes" ? $("#airQua").prop("checked", true) : $("#airQua").prop("checked", false);
    res.data.data[0].watQua == "yes" ? $("#watQua").prop("checked", true) : $("#watQua").prop("checked", false);
    res.data.data[0].watLev == "yes" ? $("#watLev").prop("checked", true) : $("#watLev").prop("checked", false);
    res.data.data[0].notice == "yes" ? $("#notice").prop("checked", true) : $("#notice").prop("checked", false);

    res.data.data[0].workshop == "yes" ? $("#ws1").prop("checked", true) : $("#ws2").prop("checked", true);

})

$('#fieldForm').submit(function (e) {
    e.preventDefault();
    const obj = {
        userid: userId,
        usrname: $('#usrname').val(),
        tele: $('#tele').val(),
        email: $('#email').val() ? $('#email').val() : '-',
        prov: $('#prov').val(),
        ocup: $('#ocup').val(),
        sex: $('#sex').val(),
        workshop: $('input[name="workshop"]:checked').val()
    }

    $('#biodiversity').is(":checked") ? obj.biodiversity = "yes" : obj.biodiversity = 'no';
    $('#greenArea').is(":checked") ? obj.greenArea = "yes" : obj.greenArea = 'no';
    $('#hforest').is(":checked") ? obj.hforest = "yes" : obj.hforest = 'no';
    $('#organic').is(":checked") ? obj.organic = "yes" : obj.organic = 'no';
    $('#airQua').is(":checked") ? obj.airQua = "yes" : obj.airQua = 'no';
    $('#watQua').is(":checked") ? obj.watQua = "yes" : obj.watQua = 'no';
    $('#watLev').is(":checked") ? obj.watLev = "yes" : obj.watLev = 'no';
    $('#notice').is(":checked") ? obj.notice = "yes" : obj.notice = 'no';

    $.post(url + '/profile-api/updateprofile', obj).done(async (res) => {
        $('#modal').modal('show');
    })
    return false;
});

