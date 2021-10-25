let urid = sessionStorage.getItem('eecid');
let urname = sessionStorage.getItem('eecname');
let eecauth = sessionStorage.getItem('eecauth');
let f_familyforest = sessionStorage.getItem('f_familyforest');

if (f_familyforest == 'false') {
    location.href = "./../../form_register/login/index.html";
}

$("#usrname").text(urname);

if (eecauth !== "admin" && eecauth !== "user") {
    location.href = "./../add/index.html";
}

// const url = 'http://localhost:3700';
const url = "https://eec-onep.online:3700";

let usr = urid;

let get_eat_plant_list = () => {
    $("#eat_plant_list").empty()
    axios.post(url + "/ff-api/geteatlist", { ftype: "พืชกินได้" }).then(r => {
        r.data.data.map(i => $("#eat_plant_list").append(`<option value="${i.fplant}" >${i.fplant}</option>`))
    })
}

let get_use_plant_list = () => {
    $("#use_plant_list").empty()
    axios.post(url + "/ff-api/geteatlist", { ftype: "พืชใช้สอย" }).then(r => {
        r.data.data.map(i => $("#use_plant_list").append(`<option value="${i.fplant}" >${i.fplant}</option>`))
    })
}

let get_econ_plant_list = () => {
    $("#econ_plant_list").empty()
    axios.post(url + "/ff-api/geteatlist", { ftype: "พืชเศรษฐกิจ" }).then(r => {
        r.data.data.map(i => $("#econ_plant_list").append(`<option value="${i.fplant}" >${i.fplant}</option>`))
    })
}

let get_herb_plant_list = () => {
    $("#herb_plant_list").empty()
    axios.post(url + "/ff-api/geteatlist", { ftype: "พืชสมุนไพร" }).then(r => {
        r.data.data.map(i => $("#herb_plant_list").append(`<option value="${i.fplant}" >${i.fplant}</option>`))
    })
}

get_eat_plant_list()
get_use_plant_list()
get_econ_plant_list()
get_herb_plant_list()

$("#fname").val(urname);
let chkData = () => {
    if (!geom) {
        $("#chkgeommodal").modal("show")
    } else {
        // postData() 
        console.log('sss');
    }
}

let postEat = async () => {
    let eat_plant_list = $("#eat_plant_list").val();
    await eat_plant_list.map(i => {
        let obj = {
            ftype: "พืชกินได้",
            fplant: i
        }
        axios.post(url + "/ff-api/deleteplant", obj).then(
            // () => console.log("พืชกินได้ ok")
        );
    })

    setTimeout(() => {
        get_eat_plant_list()
    }, 2000)
}

let postUse = async () => {
    let use_plant_list = $("#use_plant_list").val();
    await use_plant_list.map(i => {
        let obj = {
            ftype: "พืชใช้สอย",
            fplant: i
        }
        axios.post(url + "/ff-api/deleteplant", obj).then(
            // () => console.log("พืชใช้สอย ok")
        );
    })
    setTimeout(() => {
        get_use_plant_list()
    }, 2000)
}

let postEcon = async () => {
    let econ_plant_list = $("#econ_plant_list").val();
    await econ_plant_list.map(i => {
        let obj = {
            ftype: "พืชเศรษฐกิจ",
            fplant: i
        }
        axios.post(url + "/ff-api/deleteplant", obj).then(
            // () => console.log("พืชเศรษฐกิจ ok")
        );
    })
    setTimeout(() => {
        get_econ_plant_list()
    }, 2000)
}

let postHerb = async () => {
    let herb_plant_list = $("#herb_plant_list").val();
    await herb_plant_list.map(i => {
        let obj = {
            ftype: "พืชสมุนไพร",
            fplant: i
        }
        axios.post(url + "/ff-api/deleteplant", obj).then(
            // () => console.log("พืชสมุนไพร ok")
        );
    })
    setTimeout(() => {
        get_herb_plant_list()
    }, 2000)
}




let gotoDaily = () => {
    // console.log("ok");
    location.href = "./../daily/index.html";
    sessionStorage.setItem('usr', usr);
}






