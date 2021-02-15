const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/profile-api/profile", (req, res) => {
    const { userid } = req.body;
    const sql = `SELECT * FROM regis WHERE userid = '${userid}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

module.exports = app;