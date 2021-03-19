const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/login-api/insert", (req, res) => {
    const { usrname, pass, organize, tel, email, auth } = req.body;
    const uid = Date.now()
    console.log(usrname, pass, organize, tel, email, auth);

    const sql = `INSERT INTO eecprj_user(uid,usrname,pass,organize,tel,email,auth)
                    VALUES($1,$2,$3,$4,$5,$6,$7)`
    const val = [uid, usrname, pass, organize, tel, email, auth]
    eec.query(sql, val).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

app.get("/login-api/getorg", (req, res) => {
    const sql = `SELECT DISTINCT prj_operat FROM eecprj_mon ORDER BY prj_operat`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/login-api/validate", (req, res) => {
    const { usrname, pass } = req.body;
    const sql = `SELECT uid, auth FROM eecprj_user WHERE usrname='${usrname}' AND pass='${pass}'`
    // console.log(sql);
    eec.query(sql).then(r => {
        res.status(200).json({
            status: "success",
            data: r.rows
        })
    })
})

module.exports = app;