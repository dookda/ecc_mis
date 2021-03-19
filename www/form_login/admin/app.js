const url = 'http://localhost:3700';

let uid = sessionStorage.getItem('key');
let logout = () => {
    sessionStorage.clear();
    location.href = "./../login/index.html";
}

if (uid) {
    console.log(uid);
} else {
    logout()
}