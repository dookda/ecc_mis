const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;
const geo = con.geo;

app.post("/green-api/insert", async (req, res) => {
    const { data } = req.body;
    let proj_id = Date.now()
    await geo.query(`INSERT INTO _52_gr_park(proj_id)VALUES('${proj_id}')`)
    let d;
    for (d in data) {
        // console.log(data[d]);
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE _52_gr_park SET ${d}='${data[d]}' WHERE proj_id='${proj_id}'`;
            await geo.query(sql)
        }
    }

    if (data.geom !== 0) {
        let sql = `UPDATE _52_gr_park SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
            WHERE proj_id='${proj_id}'`;
        await geo.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/green-api/update", async (req, res) => {
    const { gid, data } = req.body;
    let d;
    for (d in data) {
        // console.log(data[d]);
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE _52_gr_park SET ${d}='${data[d]}' WHERE gid='${gid}'`;
            await geo.query(sql)
        }
    }

    if (data.geom !== "") {
        let sql = `UPDATE _52_gr_park SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
            WHERE gid='${gid}'`;
        await geo.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/green-api/getownerdata", (req, res) => {
    const { usrid } = req.body;
    const sql = `SELECT gid, gr_name,tree_name,tambon_idn,amphoe_idn,prov_code,
    tam_nam_t, amphoe_t, prov_nam_t,type,sup_type,rai,agency,tree,   
    ST_AsGeojson(geom) as geojson, usrname  
    FROM _52_gr_park WHERE usrid='${usrid}'`;

    geo.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/green-api/getdata", (req, res) => {
    const { userid } = req.body;
    const sql = `SELECT gid, gr_name,tree_name,tambon_idn,amphoe_idn,prov_code,
    tam_nam_t, amphoe_t, prov_nam_t,type,sup_type,rai,agency,tree,   
    ST_AsGeojson(geom) as geojson, usrname  
    FROM _52_gr_park`;

    geo.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/green-api/getgeojson", async (req, res) => {
    const { gid } = req.body;
    const sql = `SELECT gid, gr_name,tambon_idn,amphoe_idn,prov_code,
            tam_nam_t, amphoe_t, prov_nam_t,type,sup_type,rai,agency,tree,   
            ST_AsGeojson(geom) as geojson  
            FROM _52_gr_park WHERE gid=${gid}`
    let jsonFeatures = [];
    await geo.query(sql).then(r => {
        var rows = r.rows;
        // console.log(rows);
        rows.forEach((e) => {
            let feature = {
                type: 'Feature',
                properties: e,
                geometry: JSON.parse(e.geojson)
            };
            jsonFeatures.push(feature);
        });
        let geoJson = {
            type: 'FeatureCollection',
            features: jsonFeatures
        };

        res.status(200).json({
            data: geoJson
        })
    })
    // console.log(jsonFeatures);
})

app.post("/green-api/delete", (req, res) => {
    const { orgid } = req.body;
    const sql = `DELETE FROM _52_gr_park WHERE gid='${orgid}'`
    console.log(sql);
    geo.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})


module.exports = app;