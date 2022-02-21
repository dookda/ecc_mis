const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/fm-api/getone", (req, res) => {
    const { fm_id } = req.body;
    const sql = `SELECT *, ST_AsGeojson(geom) as geojson 
                FROM foodmile
                WHERE fm_id='${fm_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/fm-api/getdata", (req, res) => {
    const { userid } = req.body;
    const sql = `SELECT *, 
            CONCAT(st_y(geom_s), ', ', st_x(geom_s)) AS loc_buy,
            CONCAT(st_y(geom_b), ', ', st_x(geom_b)) AS loc_sale,
            CONCAT(st_y(geom_m), ', ', st_x(geom_m)) AS loc_man,
            st_distance(st_transform(geom_s, 3857), st_transform(geom_b, 3857)) as dist
        FROM foodmile`

    // const sql = `SELECT  * FROM v_foodmile`

    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/fm-api/insert", async (req, res) => {
    const { data } = req.body;
    let fm_id = Date.now()
    // console.log(data);
    await eec.query(`INSERT INTO foodmile(fm_id)VALUES('${fm_id}')`)
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'geom_s' && d !== 'geom_b' && d !== 'geom_m') {
            let sql = `UPDATE foodmile SET ${d}='${data[d]}' WHERE fm_id='${fm_id}'`
            console.log(sql);
            await eec.query(sql)
        }
    }
    if (data.geom_s !== "") {
        let sql = `UPDATE foodmile SET geom_s=ST_GeomfromGeoJSON('${JSON.stringify(data.geom_s.geometry)}')
                    WHERE fm_id='${fm_id}'`
        await eec.query(sql)
    }
    if (data.geom_b !== "") {
        let sql = `UPDATE foodmile SET geom_b=ST_GeomfromGeoJSON('${JSON.stringify(data.geom_b.geometry)}')
                    WHERE fm_id='${fm_id}'`
        // console.log(sql);
        await eec.query(sql)
    }
    if (data.geom_m !== "") {
        let sql = `UPDATE foodmile SET geom_m=ST_GeomfromGeoJSON('${JSON.stringify(data.geom_m.geometry)}')
                    WHERE fm_id='${fm_id}'`
        // console.log(sql);
        await eec.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/fm-api/delete", (req, res) => {
    const { fm_id } = req.body;
    const sql = `DELETE FROM foodmile WHERE fm_id='${fm_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

module.exports = app;