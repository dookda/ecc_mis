const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;
const dat = con.dat;

app.post("/ews-api/getdata", (req, res) => {
    const { ag_id } = req.body;
    const sql = `SELECT * FROM ews_3hr`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

module.exports = app;