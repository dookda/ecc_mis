let userid;

let main = async () => {
    await liff.init({ liffId: "1655648770-GVq1eLaL" })
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
    userid = profile.userId;
}

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


$('#fieldForm').submit(function (e) {
    e.preventDefault();
    const obj = {
        userid: userid,
        usrname: $('#usrname').val(),
        tele: $('#tele').val(),
        email: $('#email').val() ? $('#email').val() : '-',
        prov: $('#prov').val(),
        ocup: $('#ocup').val(),
        sex: $('#sex').val(),
        workshop: $('input[name="workshop"]:checked').val()
    }

    $('#greenArea').is(":checked") ? obj.greenArea = "yes" : obj.greenArea = 'no';
    $('#organic').is(":checked") ? obj.organic = "yes" : obj.organic = 'no';
    $('#hforest').is(":checked") ? obj.hforest = "yes" : obj.hforest = 'no';
    $('#watQua').is(":checked") ? obj.watQua = "yes" : obj.watQua = 'no';
    $('#watLev').is(":checked") ? obj.watLev = "yes" : obj.watLev = 'no';
    $('#airQua').is(":checked") ? obj.airQua = "yes" : obj.airQua = 'no';

    $.post(url + '/eec-api/register', obj).done(async (res) => {
        $('#modal').modal('show');
    })
    return false;
});

