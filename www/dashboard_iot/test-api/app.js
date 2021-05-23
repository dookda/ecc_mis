const url = "http://localhost/wtrl/wrtl-add.php";
token = 'ZWVjSW9UYnlFbkdSSURzU3RhdGlvbjE=';
let obj = {
    token: token,
    stname: "sta1",
    rangd: 246
}
axios.post(url, obj).then(r => {
    console.log(r);
})