const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/agi-api/getone", (req, res) => {
    const { ag_id } = req.body;
    const sql = `SELECT ST_AsGeojson(geom) as geojson 
                FROM agri_mon
                WHERE ag_id='${ag_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/org-api/getdata", (req, res) => {
    const { userid } = req.body;
    const sql = `SELECT gid,orgname,headname,orgtype,orgstatus,orgid FROM organization`;

    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/org-api/insert", async (req, res) => {
    const { data } = req.body;
    let orgid = Date.now()
    // console.log(data);
    await eec.query(`INSERT INTO organization(orgid)VALUES('${orgid}')`)
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE organization SET ${d}='${data[d]}' WHERE orgid='${orgid}'`
            console.log(sql);
            await eec.query(sql)
        }
    }
    if (data.geom !== "") {
        let sql = `UPDATE organization SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}')
                    WHERE orgid='${orgid}'`
        await eec.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/agi-api/update", async (req, res) => {
    const { data, ag_id } = req.body;
    const tm_id = Date.now()
    console.log(data);
    await eec.query(`INSERT INTO agri_mon_detail (tm_id,ag_id,dt) VALUES ('${tm_id}','${ag_id}', now())`)
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE agri_mon_detail SET ${d}='${data[d]}' WHERE ag_id='${ag_id}'`
            console.log(sql);
            await eec.query(sql)
        }
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/agi-api/delete", (req, res) => {
    const { fm_id } = req.body;
    const sql = `DELETE FROM foodmile WHERE fm_id='${fm_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

module.exports = app;