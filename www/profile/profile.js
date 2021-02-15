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

var url = 'https://eec-onep.online:3700';
// var url = 'https://ac2ebb67f104.ngrok.io';

function onLocationError(e) {
    console.log(e.message);
}

let getAccount = async (id) => {
    axios.post(url + '/profile-api/profile', { userid: id })
        .then(r => {
            console.log(r);
            $('#usrname').val(r.data.data[0].usrname);
            $('#tele').val(r.data.data[0].tele);
            $('#email').val(r.data.data[0].email);
            $('#prov').val(r.data.data[0].prov);
            $('#ocup').val(r.data.data[0].ocup);
            $('#sex').val(r.data.data[0].sex);

            r.data.data[0].greenarea == "yes" ? $("#greenArea").prop("checked", true) : null;
            r.data.data[0].organic == "yes" ? $("#organic").prop("checked", true) : null;
            r.data.data[0].hforest == "yes" ? $("#hforest").prop("checked", true) : null;
            r.data.data[0].watqua == "yes" ? $("#watQua").prop("checked", true) : null;
            r.data.data[0].watlev == "yes" ? $("#watLev").prop("checked", true) : null;
            r.data.data[0].airqua == "yes" ? $("#airQua").prop("checked", true) : null;
            r.data.data[0].workshop == "yes" ? $("#workshop_true").prop("checked", true) : $("#workshop_false").prop("checked", true);
        }).catch(err => {
            console.log(err);
        })
}

let closeLiff = async () => {
    liff.closeWindow();
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

