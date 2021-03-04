const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/profile-api/register", (req, res) => {
    const { userid, usrname, tele, email, prov, ocup, sex, workshop, biodiversity, greenArea, hforest, organic, airQua, watQua, watLev, notice } = req.body;
    const sql = "INSERT INTO regis (userid, usrname, tele, email, prov, ocup, sex, workshop, biodiversity, greenArea, hforest, organic, airQua, watQua, watLev, notice, dreg) " +
        "VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,now())";
    const val = [userid, usrname, tele, email, prov, ocup, sex, workshop, biodiversity, greenArea, hforest, organic, airQua, watQua, watLev, notice];

    eec.query(sql, val).then((r) => {
        res.status(200).json({
            message: "insert success"
        });
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