const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/login-api/insert", (req, res) => {
    const { usrname, pass, organize, tel, email, auth } = req.body;
    const uid = Date.now()
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
    const sql = `SELECT uid, auth, organize FROM eecprj_user WHERE usrname='${usrname}' AND pass='${pass}'`
    // console.log(sql);
    eec.query(sql).then(r => {
        res.status(200).json({
            status: "success",
            data: r.rows
        })
    })
})

app.post("/login-api/getuser", (req, res) => {
    const { uid } = req.body;
    let uidql = `SELECT uid FROM eecprj_user WHERE uid='${uid}'`;
    let sql = `SELECT uid, usrname, organize, tel, email FROM eecprj_user WHERE auth<>'admin'`;
    eec.query(uidql).then(x => {
        if (x.rows[0].uid == uid) {
            eec.query(sql).then(r => {
                res.status(200).json({
                    data: r.rows
                })
            })
        }
    })
})

app.post("/login-api/delete", (req, res) => {
    const { uid, usrname } = req.body;
    const sql = `DELETE FROM eecprj_user WHERE usrname='${usrname}' AND uid='${uid}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

module.exports = app;