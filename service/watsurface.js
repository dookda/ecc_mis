const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/ws-api/getone", (req, res) => {
    const { ws_id } = req.body;
    const sql = `SELECT *, ST_AsGeojson(geom) as geojson 
                FROM surwater
                WHERE ws_id='${ws_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/ws-api/getdata", (req, res) => {
    const { userid } = req.body;
    const sql = `SELECT *, ST_AsGeojson(geom) as geojson, 
            TO_CHAR(ws_date, 'DD-MM-YYYY') as date FROM surwater`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/ws-api/insert", async (req, res) => {
    const { data } = req.body;
    let ws_id = Date.now()
    // console.log(data);
    await eec.query(`INSERT INTO surwater(ws_id)VALUES('${ws_id}')`)
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE surwater SET ${d}='${data[d]}' WHERE ws_id='${ws_id}'`
            // console.log(sql);
            await eec.query(sql)
        }
    }
    if (data.geom !== "") {
        let sql = `UPDATE surwater SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}')
                    WHERE ws_id='${ws_id}'`
        // console.log(sql);
        await eec.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/ws-api/update", async (req, res) => {
    const { data, tb, ws_id } = req.body;
    for (let d in data) {
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE ${tb} SET ${d}='${data[d]}' WHERE ws_id='${ws_id}'`
            // console.log(sql);
            await eec.query(sql)
        }
    }

    if (data.geom !== "") {
        let sql = `UPDATE ${tb}  
                    SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}')
                    WHERE ws_id='${ws_id}'`
        // console.log(data.geom);
        await eec.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/ws-api/delete", (req, res) => {
    const { ws_id } = req.body;
    const sql = `DELETE FROM surwater WHERE ws_id='${ws_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

module.exports = app;