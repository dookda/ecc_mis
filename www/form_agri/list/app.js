let userid;

let main = async () => {
    await liff.init({ liffId: "1655648770-JLXzogag" })
    if (liff.isLoggedIn()) {
        getUserProfile()
    } else {
        liff.login()
    }
}

// main()

let getUserProfile = async () => {
    const profile = await liff.getProfile();
    $('#profile').attr('src', await profile.pictureUrl);
    $('#userId').text(profile.userId);
    $('#statusMessage').text(await profile.statusMessage);
    $('#displayName').text(await profile.displayName);
    userid = profile.userId;
}


const url = "https://eec-onep.online:3700";
// const url = 'http://localhost:3700';

let refreshPage = () => {
    location.reload(true);
}

let obj = {
    userid: userid
}

axios.post(url + "/agi-api/getdata", obj).then((r) => {
    console.log(r);
    r.data.data.map(i => {
        $("#cList").append(`
            <div class="card dtile mt-2">
                <div class="card-body" >
                    <div class="row" onclick="goto(${i.ag_id})">
                        <div class="col-4">
                            <img src="./img/a.png" class="center">
                        </div>
                        <div class="col-8">
                            <h5>${i.agname}</h5>
                            ${i.agdetail}<br>
                            ${i.agdate}
                        </div>
                    </div>
                </div>
            </div>`)
    })
})

let goto = (ag_id) => {
    location.href = "./../update/index.html";
    sessionStorage.setItem('ag_id', ag_id);
    // window.open("./../update/index.html?id=" + ag_id, "_self");
}

let gotoAdd = () => {
    location.href = "./../add/index.html";
}

