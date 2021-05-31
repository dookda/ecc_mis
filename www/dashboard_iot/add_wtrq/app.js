const url = "https://eec-onep.soc.cmu.ac.th/api/wtrq-add.php";
token = 'ZWVjSW9UYnlFbkdSSURzU3RhdGlvbjE=';

setInterval(async () => {
    let obj = {
        token: token,
        stname: "sta1",
        do: Math.floor(Math.random() * 90) + 10,
        ec: Math.floor(Math.random() * 90) + 100,
        ph: Math.floor(Math.random() * 90) + 10
    }
    axios.post(url, obj).then(r => {
        console.log(r);
    })
}, 4000)
