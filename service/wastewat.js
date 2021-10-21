const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/waste-api/getone", (req, res) => {
    const { w_id } = req.body;
    const sql = `SELECT *, ST_AsGeojson(geom) as geojson,
                    TO_CHAR(wdate, 'YYYY-MM-DD') as date  
                FROM wastewat
                WHERE w_id='${w_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.get("/waste-api/getmun/:prov", (req, res) => {
    const prov = req.params.prov;
    let sql;
    if (prov == "ทุกจังหวัด") {
        sql = `SELECT DISTINCT insti FROM wastewat`
    } else {
        sql = `SELECT DISTINCT insti FROM wastewat WHERE prov='${prov}'`
    }
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/waste-api/getdata", (req, res) => {
    const { prov } = req.body;
    let sql;
    // console.log(prov);
    if (prov == 'ทุกจังหวัด') {
        sql = `SELECT *, ST_AsGeojson(geom) as geojson, TO_CHAR(wdate, 'DD-MM-YYYY') as date FROM wastewat`
    } else {
        sql = `SELECT *, ST_AsGeojson(geom) as geojson, TO_CHAR(wdate, 'DD-MM-YYYY') as date FROM wastewat WHERE prov='${prov}'`
    }

    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/waste-api/getdatabymun", (req, res) => {
    const { insti } = req.body;
    let sql = `SELECT *, ST_AsGeojson(geom) as geojson, TO_CHAR(wdate, 'DD-MM-YYYY') as date 
                FROM wastewat WHERE insti='${insti}' ORDER BY wdate DESC`

    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/waste-api/getownerdata", (req, res) => {
    const { prov, usrid } = req.body;
    // console.log(prov, usrid);
    let sql;
    if (prov == 'ทุกจังหวัด') {
        sql = `SELECT *, ST_AsGeojson(geom) as geojson, TO_CHAR(wdate, 'DD-MM-YYYY') as date FROM wastewat WHERE usrid='${usrid}'`
    } else {
        sql = `SELECT *, ST_AsGeojson(geom) as geojson, TO_CHAR(wdate, 'DD-MM-YYYY') as date FROM wastewat WHERE usrid='${usrid}' AND prov='${prov}'`
    }

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
        let sql = `UPDATE wastewat SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom)}')
                    WHERE w_id='${w_id}'`
        // console.log(sql);
        await eec.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/waste-api/update", async (req, res) => {
    const { data, w_id } = req.body;
    for (let d in data) {
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE wastewat SET ${d}='${data[d]}' WHERE w_id='${w_id}'`
            // console.log(sql);
            await eec.query(sql)
        }
    }

    if (data.geom.features) {
        // console.log("fes", data.geom.features[0].geometry);
        let sql = `UPDATE wastewat 
                    SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom.features[0].geometry)}')
                    WHERE w_id='${w_id}'`
        await eec.query(sql)
    } else if (data.geom) {
        // console.log("no", data.geom);
        let sql = `UPDATE wastewat 
                    SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}')
                    WHERE w_id='${w_id}'`
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

app.post("/waste-api/selectbypro", (req, res) => {
    const { prov } = req.body;
    const sql = `SELECT distinct insti, prov FROM wastewat WHERE prov='${prov}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

module.exports = app;