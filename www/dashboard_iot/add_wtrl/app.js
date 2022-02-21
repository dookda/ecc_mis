const url = "https://eec-onep.soc.cmu.ac.th/api/wtrl-add.php";
token = 'ZWVjSW9UYnlFbkdSSURzU3RhdGlvbjE=';


setInterval(async () => {
    let obj = {
        token: token,
        stname: "station_o4",
        deep: Math.floor(Math.random() * 90) + 100,
        temperature: Math.floor(Math.random() * 90) + 10,
        humidity: Math.floor(Math.random() * 90) + 10
    }
    axios.post(url, obj).then(r => {
        console.log(r);
    })
}, 2000)



