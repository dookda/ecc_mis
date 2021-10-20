const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/sq-api/getone", (req, res) => {
    const { sq_id } = req.body;
    const sql = `SELECT *, ST_AsGeojson(geom) as geojson,
                    TO_CHAR(sq_date, 'YYYY-MM-DD') as date 
                FROM seaquality
                WHERE sq_id='${sq_id}'`;
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/sq-api/getdata", (req, res) => {
    const { type, dat } = req.body;
    let sql;
    if (type == "ทุกจังหวัด") {
        sql = `SELECT *, ST_AsGeojson(geom) as geojson, 
        TO_CHAR(sq_date, 'DD-MM-YYYY') as date 
        FROM seaquality ORDER BY sq_date DESC`
    } else {
        sql = `SELECT *, ST_AsGeojson(geom) as geojson, 
        TO_CHAR(sq_date, 'DD-MM-YYYY') as date 
        FROM seaquality WHERE pro='${dat}'ORDER BY sq_date DESC`
    }

    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/sq-api/getdatabyprov", (req, res) => {
    const { prov } = req.body;
    const sql = `SELECT *, ST_AsGeojson(geom) as geojson, 
                TO_CHAR(sq_date, 'DD-MM-YYYY') as date 
                FROM seaquality WHERE sq_pro='${prov}' ORDER BY sq_date DESC`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/sq-api/getdatabysta", (req, res) => {
    const { sta } = req.body;
    const sql = `SELECT *, ST_AsGeojson(geom) as geojson, 
                TO_CHAR(sq_date, 'DD-MM-YYYY') as date 
                FROM seaquality WHERE sta_loc='${sta}' ORDER BY sq_date DESC`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/sq-api/getstation", (req, res) => {
    const { prov } = req.body;
    const sql = `SELECT DISTINCT sta_loc FROM seaquality  where pro='${prov}' ORDER BY sta_loc ASC `
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/sq-api/getstation/uid", (req, res) => {
    const { usrid } = req.body;
    const sql = `SELECT DISTINCT sta_loc FROM seaquality  where usrid='${usrid}' ORDER BY sta_loc ASC `
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/sq-api/getownerdata", (req, res) => {
    const { usrid } = req.body;
    let sql;
    if (type == "ทุกจังหวัด") {
        sql = `SELECT *, ST_AsGeojson(geom) as geojson, 
                TO_CHAR(sq_date, 'DD-MM-YYYY') as date 
                FROM seaquality ORDER BY sq_date DESC
                WHERE usrid='${usrid}'`
    } else {
        sql = `SELECT *, ST_AsGeojson(geom) as geojson, 
                TO_CHAR(sq_date, 'DD-MM-YYYY') as date 
                FROM seaquality 
                WHERE pro='${dat}' & usrid='${usrid}'
                ORDER BY sq_date DESC`
    }
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.get('/sq-api/getownerdata/:urid', (req, res) => {
    const usrid = req.params.urid;
    const sql = `SELECT *, ST_AsGeojson(geom) as geojson, 
                TO_CHAR(sq_date, 'DD-MM-YYYY') as date 
            FROM seaquality 
            WHERE usrid='${usrid}'
            ORDER BY sq_date DESC`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.get("/sq-api/getdata/admin", (req, res) => {
    const { userid } = req.body;
    const sql = `SELECT *, ST_AsGeojson(geom) as geojson, 
                TO_CHAR(sq_date, 'DD-MM-YYYY') as date 
            FROM seaquality ORDER BY sq_date DESC`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/sq-api/getsummarize", (req, res) => {
    const { sq_pro } = req.body;
    const sql = `SELECT sq_date, avg(sq_po43p) as sq_po43p, avg(sq_no3n) as sq_no3n, avg(sq_ph) as sq_ph, avg(sq_mwqi) as sq_mwqi
        FROM seaquality WHERE sq_pro = '${sq_pro}' and sq_date > '2016/01/01' GROUP BY 1 ORDER BY 1`;
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
    const { data, sq_id } = req.body;
    for (let d in data) {
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE seaquality SET ${d}='${data[d]}' WHERE sq_id='${sq_id}'`
            console.log(sql);
            await eec.query(sql)
        }
    }
    // console.log(data.geom);
    if (data.geom) {

        let sql = `UPDATE seaquality
                    SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom)}')
                    WHERE sq_id='${sq_id}'`
        // console.log(sql);
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