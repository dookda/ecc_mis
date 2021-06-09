const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/profile-api/register", async (req, res) => {
    const { data } = req.body;
    let reg_id = Date.now()
    await eec.query(`INSERT INTO register(reg_id, ndate)VALUES('${reg_id}', now())`)
    let d;
    for (d in data) {
        if (data[d] !== '') {
            let sql = `UPDATE register SET ${d}='${data[d]}' WHERE reg_id='${reg_id}'`;
            console.log(sql);
            await eec.query(sql)
        }
    }
    res.status(200).json({
        data: "insert success"
    });
});

app.post("/profile-api/getprofile", (req, res) => {
    const { userid } = req.body;
    console.log(userid);
    const sql = `SELECT * FROM regis WHERE userid = '${userid}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/profile-api/updateprofile", (req, res) => {
    const { userid, usrname, tele, email, prov, ocup, sex, workshop, biodiversity, greenArea, hforest, organic, airQua, watQua, watLev, notice } = req.body;
    const sql = "UPDATE regis SET usrname=$2, tele=$3, email=$4, prov=$5, ocup=$6, sex=$7, workshop=$8, biodiversity=$9, greenArea=$10, hforest=$11, organic=$12, airQua=$13, watQua=$14, watLev=$15, notice=$16, dreg=now() WHERE userid=$1";
    const val = [userid, usrname, tele, email, prov, ocup, sex, workshop, biodiversity, greenArea, hforest, organic, airQua, watQua, watLev, notice];

    eec.query(sql, val).then((r) => {
        res.status(200).json({
            message: "insert success"
        });
    });
})


module.exports = app;