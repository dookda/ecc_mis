const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/projmon-api/getdata", (req, res) => {
    const { userid } = req.body;
    const sql = `SELECT *, ST_AsGeojson(geom) as geojson FROM eecprj_mon`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon-api/getone", (req, res) => {
    const { userid, prj_id } = req.body;
    // console.log(proj_id);
    const sql = `SELECT *, 
        to_char(dt, 'DD Month YYYY') as editdate,
        ST_AsGeojson(geom) as geojson
        FROM eecprj_mon WHERE prj_id='${prj_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon-api/insertdata", async (req, res) => {
    const { data } = req.body;
    let prj_id = Date.now()

    await eec.query(`INSERT INTO eecprj_mon(prj_id, dt)VALUES('${prj_id}', now())`)
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE eecprj_mon SET ${d}='${data[d]}' WHERE prj_id='${prj_id}'`
            await eec.query(sql)
        }
    }
    if (data.geom !== "") {
        let sql = `UPDATE eecprj_mon 
                    SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}')
                    WHERE prj_id='${prj_id}'`
        await eec.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/projmon-api/updatedata", async (req, res) => {
    const { data } = req.body;
    for (let d in data) {
        if (data[d] !== '' && d !== 'geom' && d !== "prj_id") {
            let sql = `UPDATE eecprj_mon SET ${d}='${data[d]}' WHERE prj_id='${data.prj_id}'`
            await eec.query(sql)
        }
    }
    if (data.geom !== "") {
        let sql = `UPDATE eecprj_mon 
                    SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}')
                    WHERE prj_id='${data.prj_id}'`
        await eec.query(sql)
    } else {
        let sql = `UPDATE eecprj_mon 
                    SET geom=NULL
                    WHERE prj_id='${data.prj_id}'`
        await eec.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/projmon-api/deletedata", (req, res) => {
    const { prj_id } = req.body;
    const sql = `DELETE FROM eecprj_mon WHERE prj_id='${prj_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

module.exports = app;