const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/sq-api/getone", (req, res) => {
    const { sq_id } = req.body;
    const sql = `SELECT *, ST_AsGeojson(geom) as geojson 
                FROM seaquality
                WHERE sq_id='${sq_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/sq-api/getdata", (req, res) => {
    const { userid } = req.body;
    const sql = `SELECT *, ST_AsGeojson(geom) as geojson, TO_CHAR(sq_date, 'DD-MM-YYYY') as date FROM seaquality`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/sq-api/insert", async (req, res) => {
    const { data } = req.body;
    let sq_id = Date.now()
    // console.log(data);
    await eec.query(`INSERT INTO seaquality(sq_id)VALUES('${sq_id}')`)
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE seaquality SET ${d}='${data[d]}' WHERE sq_id='${sq_id}'`
            // console.log(sql);
            await eec.query(sql)
        }
    }
    if (data.geom !== "") {
        let sql = `UPDATE seaquality SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}')
                    WHERE sq_id='${sq_id}'`
        // console.log(sql);
        await eec.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/sq-api/update", async (req, res) => {
    const { data, tb, wq_id } = req.body;
    for (let d in data) {
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE ${tb} SET ${d}='${data[d]}' WHERE wq_id='${wq_id}'`
            // console.log(sql);
            await eec.query(sql)
        }
    }

    if (data.geom !== "") {
        let sql = `UPDATE ${tb}  
                    SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}')
                    WHERE wq_id='${wq_id}'`
        // console.log(data.geom);
        await eec.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/sq-api/delete", (req, res) => {
    const { sq_id } = req.body;
    const sql = `DELETE FROM seaquality WHERE sq_id='${sq_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

module.exports = app;