const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;
const iot = con.iot;

app.get("/eec-api/iot-get", (req, res) => {
    const { val } = req.params
    const sql = `SELECT * FROM iot`;
    iot.query(sql).then((r) => {
        res.status(200).json({
            data: r.rows
        });
    });
})

app.post("/eec-api/iot-insert", (req, res) => {
    const { val } = req.body
    const sql = `INSERT INTO iot(val, ts)VALUES('${val}', now())`;
    iot.query(sql).then((r) => {
        res.status(200).json({
            status: "insert ok"
        });
    });
})

module.exports = app;