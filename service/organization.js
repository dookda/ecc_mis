const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/org-api/getone", (req, res) => {
    const { orgid } = req.body;
    const sql = `SELECT *,ST_AsGeojson(geom) as geojson 
                FROM organization
                WHERE orgid='${orgid}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/org-api/getdata", (req, res) => {
    const { userid } = req.body;
    const sql = `SELECT gid,orgname,headname,orgtype,orgstatus,orgid 
        FROM organization`;

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

app.post("/org-api/update", async (req, res) => {
    const { data, orgid } = req.body;

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

app.post("/org-api/delete", (req, res) => {
    const { orgid } = req.body;
    const sql = `DELETE FROM organization WHERE orgid='${orgid}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

module.exports = app;