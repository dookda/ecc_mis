const express = require('express');
const app = express.Router();
const con = require("./db");
const ecc = con.ecc;


app.post("/ecc-api/aqi-insert", (req, res) => {
    const { sname, saqi, img, geom } = req.body;

    const imgname = "img" + Date.now();
    const sql = "INSERT INTO ecc_aqi_4326 (sname, saqi, imgname, img, sdate, geom) " +
        "VALUES ($1,$2,$3,$4,now(),ST_SetSRID(st_geomfromgeojson($5), 4326))";
    const val = [sname, saqi, imgname, img, geom];
    // console.log(sql)
    // console.log(val);

    ecc.query(sql, val).then((r) => {
        res.status(200).json({
            status: "success",
            message: "insert data"
        });
    });
});

module.exports = app;