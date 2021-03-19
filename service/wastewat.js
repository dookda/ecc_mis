const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/waste-api/getone", (req, res) => {
    const { w_id } = req.body;
    const sql = `SELECT *, ST_AsGeojson(geom) as geojson 
                FROM wastewat
                WHERE w_id='${w_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/waste-api/getdata", (req, res) => {
    const { userid } = req.body;
    const sql = `SELECT *, ST_AsGeojson(geom) as geojson, TO_CHAR(wdate, 'DD-MM-YYYY') as date FROM wastewat`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/waste-api/insert", async (req, res) => {
    const { data } = req.body;
    let w_id = Date.now()
    // console.log(data);
    await eec.query(`INSERT INTO wastewat(w_id)VALUES('${w_id}')`)
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE wastewat SET ${d}='${data[d]}' WHERE w_id='${w_id}'`
            // console.log(sql);
            await eec.query(sql)
        }
    }
    if (data.geom !== "") {
        let sql = `UPDATE wastewat SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}')
                    WHERE w_id='${w_id}'`
        // console.log(sql);
        await eec.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/waste-api/update", async (req, res) => {
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

app.post("/waste-api/delete", (req, res) => {
    const { w_id } = req.body;
    const sql = `DELETE FROM wastewat WHERE w_id='${w_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

module.exports = app;