const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/profile-api/register", async (req, res) => {
    const { data } = req.body;
    let regid = Date.now()
    await eec.query(`INSERT INTO register(regid, auth, ndate, approved)VALUES('${regid}','user',now(),'ยังไม่ได้ตรวจสอบ')`)
    let d;
    for (d in data) {
        if (data[d] !== '') {
            let sql = `UPDATE register SET ${d}='${data[d]}' WHERE regid='${regid}'`;
            // console.log(sql);
            await eec.query(sql)
        }
    }
    res.status(200).json({
        data: "insert success"
    });
});

app.post("/profile-api/getuser", (req, res) => {
    const { regid } = req.body;
    const sql = `SELECT * FROM register`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })

})

app.post("/profile-api/getprofile", (req, res) => {
    const { regid } = req.body;
    // console.log(userid);
    const sql = `SELECT *, TO_CHAR(ndate, 'DD Mon YYYY') as dt FROM register WHERE regid = '${regid}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/profile-api/updateprofile", async (req, res) => {
    const { regid, data } = req.body;

    let sql = `UPDATE register SET editdate=now() WHERE regid='${regid}'`;
    await eec.query(sql)

    for (d in data) {
        if (data[d] !== '') {
            let sql = `UPDATE register SET ${d}='${data[d]}' WHERE regid='${regid}'`;
            // console.log(sql);
            await eec.query(sql)
        }
    }

    res.status(200).json({
        data: "success"
    })
})

app.post("/profile-api/updateimgprofile", async (req, res) => {
    const { img, regid } = req.body;

    let sql = `UPDATE register SET img='${img}' WHERE regid='${regid}'`;
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        });
    });
})

app.post("/profile-api/userlogin", (req, res) => {
    const { usrname, pass } = req.body;
    const sql = "SELECT usrname, regid, auth, approved FROM register WHERE tel=$1 and pass=$2";
    const val = [usrname, pass];

    eec.query(sql, val).then(r => {
        res.status(200).json({
            data: r.rows
        });
    });
})

app.post("/profile-api/delete", (req, res) => {
    const { regid, usrname } = req.body;
    const sql = `DELETE FROM register WHERE usrname='${usrname}' AND regid='${regid}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

module.exports = app;