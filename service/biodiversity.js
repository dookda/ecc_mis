const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/biodiversity-api/getdataone", (req, res) => {
    const { proj_id } = req.body;
    // console.log(proj_id);
    const sql = `SELECT gid, proj_id, bioname, biodetail, bioplace, biotype, lat,lon,
            pro, amp, tam, pro_name, amp_name, tam_name, 
            TO_CHAR(ndate, 'DD-MM-YYYY') as ndate, reporter, img,   
            ST_AsGeojson(geom) as geojson  
        FROM biodiversity WHERE proj_id='${proj_id}'`;

    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/biodiversity-api/getdata", (req, res) => {
    const { userid } = req.body;
    const sql = `SELECT gid, proj_id, bioname, biodetail, bioplace, biotype,
            pro, amp, tam, pro_name, amp_name, tam_name, lat, lon,
            TO_CHAR(ndate, 'DD-MM-YYYY') as ndate, reporter, img,   
            ST_AsGeojson(geom) as geojson  
        FROM biodiversity`;

    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/biodiversity-api/insert", async (req, res) => {
    const { data } = req.body;
    let proj_id = Date.now()
    await eec.query(`INSERT INTO biodiversity(proj_id, ndate)VALUES('${proj_id}', now())`)
    let d;
    for (d in data) {
        // console.log(d, data[d]);
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE biodiversity SET ${d}='${data[d]}' WHERE proj_id='${proj_id}'`;
            await eec.query(sql)
        }
    }

    if (data.geom !== "") {
        let sql = `UPDATE biodiversity SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
            WHERE proj_id='${proj_id}'`;
        await eec.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/biodiversity-api/update", async (req, res) => {
    const { proj_id, data } = req.body;
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE biodiversity SET ${d}='${data[d]}', ndate=now() WHERE proj_id='${proj_id}'`;
            await eec.query(sql)
        }
    }

    if (data.geom !== "" && data.geom.geometry) {
        let sql = `UPDATE biodiversity SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
            WHERE proj_id='${proj_id}'`;
        await eec.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/biodiversity-api/delete", (req, res) => {
    const { proj_id } = req.body;
    const sql = `DELETE FROM biodiversity WHERE proj_id='${proj_id}'`
    console.log(sql);
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

module.exports = app;