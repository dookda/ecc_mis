const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/ncd-api/getone", (req, res) => {
    const { ncd_id } = req.body;
    const sql = `SELECT *, ST_AsGeojson(geom) as geojson 
                FROM ncd
                WHERE ncd_id='${ncd_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/ncd-api/getdata", (req, res) => {
    const { userid } = req.body;
    const sql = `SELECT *, ST_AsGeojson(geom) as geojson FROM ncd`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/ncd-api/insert", async (req, res) => {
    const { data } = req.body;
    let ncd_id = Date.now()
    // console.log(data);
    await eec.query(`INSERT INTO ncd(ncd_id)VALUES('${ncd_id}')`)
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE ncd SET ${d}='${data[d]}' WHERE ncd_id='${ncd_id}'`
            // console.log(sql);
            await eec.query(sql)
        }
    }
    if (data.geom !== "") {
        let sql = `UPDATE ncd SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}')
                    WHERE ncd_id='${ncd_id}'`
        // console.log(sql);
        await eec.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/ncd-api/delete", (req, res) => {
    const { ncd_id } = req.body;
    const sql = `DELETE FROM ncd WHERE ncd_id='${ncd_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

module.exports = app;