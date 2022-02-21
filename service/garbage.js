const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/gb-api/getone", (req, res) => {
    const { gb_id } = req.body;
    const sql = `SELECT *, ST_AsGeojson(geom) as geojson 
                FROM garbage WHERE gb_id='${gb_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/gb-api/getonebysta", (req, res) => {
    const { sta } = req.body;
    const sql = `SELECT *, ST_AsGeojson(geom) as geojson 
                FROM garbage WHERE dla='${sta}' ORDER BY year DESC`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/gb-api/getdata", (req, res) => {
    const { userid } = req.body;
    const sql = `SELECT *, ST_AsGeojson(geom) as geojson FROM garbage`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/gb-api/getstation", (req, res) => {
    const { prov } = req.body;
    let sql
    if (prov == "eec") {
        sql = `SELECT DISTINCT dla,prov FROM garbage ORDER BY dla ASC`
    } else {
        sql = `SELECT DISTINCT dla FROM garbage WHERE prov='${prov}'ORDER BY dla ASC`
    }
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/gb-api/getstation/user", (req, res) => {
    const { prov, userid } = req.body;
    let sql
    if (prov == "eec") {
        sql = `SELECT DISTINCT dla,prov FROM garbage  where usrid='${userid}' ORDER BY dla ASC`
    } else {
        sql = `SELECT DISTINCT dla FROM garbage WHERE prov='${prov}' and usrid='${userid}' ORDER BY dla ASC`
    }
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/gb-api/getownerdata", (req, res) => {
    const { usrid } = req.body;
    const sql = `SELECT *, ST_AsGeojson(geom) as geojson 
        FROM garbage WHERE usrid='${usrid}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/gb-api/getsummarize", (req, res) => {
    const { prov } = req.body;
    const sql = `SELECT year, SUM(populace) as populace, 
                SUM(amt_was) as amt_was, 
                SUM(amt_coll) as amt_coll, 
                SUM(amt_benf) as amt_benf
            FROM garbage WHERE prov='${prov}'
            GROUP BY year ORDER BY year ASC`;
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/gb-api/insert", async (req, res) => {
    const { data } = req.body;
    let gb_id = Date.now()
    // console.log(data);
    await eec.query(`INSERT INTO garbage(gb_id)VALUES('${gb_id}')`)
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE garbage SET ${d}='${data[d]}' WHERE gb_id='${gb_id}'`
            console.log(sql);
            await eec.query(sql)
        }
    }
    if (data.geom !== "") {
        let sql = `UPDATE garbage SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}')
                    WHERE gb_id='${gb_id}'`
        // console.log(sql);
        await eec.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/gb-api/update", async (req, res) => {
    const { data, gb_id } = req.body;
    for (let d in data) {
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE garbage SET ${d}='${data[d]}' WHERE gb_id='${gb_id}'`
            // console.log(sql);
            await eec.query(sql)
        }
    }

    if (data.geom !== "") {
        let sql = `UPDATE garbage
                    SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}')
                    WHERE gb_id='${gb_id}'`
        // console.log(data.geom);
        await eec.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/gb-api/delete", (req, res) => {
    const { gb_id } = req.body;
    const sql = `DELETE FROM garbage WHERE gb_id='${gb_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

module.exports = app;