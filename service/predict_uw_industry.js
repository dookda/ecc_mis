const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/predict_UW_industry/data/prov", async (req, res) => {
    let sql = `select * from predict_UW_industry ORDER by gid`
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/predict_UW_industry/data/cate", async (req, res) => {
    let sql = `select * from predict_uw_industrybycate ORDER by gid`
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
module.exports = app;