const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/waterlevel-api/getownerdata", (req, res) => {
    const { usrid, bcode } = req.body;
    let sql
    // if (bcode == "ทุกจังหวัด") {
    //     sql = `SELECT gid, proj_id, watername, placename, waterlevel,
    //         ST_X(geom) as lon, ST_Y(geom) as lat, TO_CHAR(ndate, 'DD-MM-YYYY') as ndate, img,   
    //         ST_AsGeojson(geom) as geojson  
    //     FROM waterlevel WHERE usrid='${usrid}' ORDER BY ndate ASC`;
    // } else {
    //     sql = `SELECT gid, proj_id, watername, placename, waterlevel,
    //         ST_X(geom) as lon, ST_Y(geom) as lat, TO_CHAR(ndate, 'DD-MM-YYYY') as ndate, img,   
    //         ST_AsGeojson(geom) as geojson  
    //     FROM waterlevel WHERE usrid='${usrid}' AND ${btype}='${bcode}' ORDER BY ndate ASC`;
    // }

    sql = `SELECT w.gid, w.proj_id, w.watername, w.placename, w.waterlevel,
            ST_X(w.geom) as lon, ST_Y(w.geom) as lat, 
            TO_CHAR(w.ndate, 'DD-MM-YYYY') as ndate, img,   
            ST_AsGeojson(w.geom) as geojson,
            tb.prov_code, tb.amp_code, 
            tb.tam_code, tb.prov_namt, 
            tb.amp_namt, tb.tam_namt
        FROM waterlevel as w
        JOIN eec_tam_4326 as tb
        ON ST_Contains(tb.geom, w.geom)
        WHERE usrid='${usrid}'
        ORDER BY ndate ASC `;

    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/waterlevel-api/getalldata", (req, res) => {
    const { usrid, btype, bcode } = req.body;
    let sql
    if (bcode == "ทุกจังหวัด") {
        sql = `SELECT w.gid, w.proj_id, w.watername, w.placename, w.waterlevel,
            ST_X(w.geom) as lon, ST_Y(w.geom) as lat, 
            TO_CHAR(w.ndate, 'DD-MM-YYYY') as ndate, img,   
            ST_AsGeojson(w.geom) as geojson,
            tb.prov_code, tb.amp_code, 
            tb.tam_code, tb.prov_namt, 
            tb.amp_namt, tb.tam_namt
        FROM waterlevel as w
        JOIN eec_tam_4326 as tb
        ON ST_Contains(tb.geom, w.geom)
        ORDER BY ndate ASC`;
        // console.log(sql);
    } else {
        sql = `SELECT w.gid, w.proj_id, w.watername, w.placename, w.waterlevel,
            ST_X(w.geom) as lon, ST_Y(w.geom) as lat, 
            TO_CHAR(w.ndate, 'DD-MM-YYYY') as ndate, img,   
            ST_AsGeojson(w.geom) as geojson,
            tb.prov_code, tb.amp_code, 
            tb.tam_code, tb.prov_namt, 
            tb.amp_namt, tb.tam_namt
        FROM waterlevel as w
        JOIN eec_tam_4326 as tb
        ON ST_Contains(tb.geom, w.geom) WHERE ${btype}='${bcode}' 
        ORDER BY ndate ASC`;
    }


    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/waterlevel-api/insert", async (req, res) => {
    const { data } = req.body;
    let proj_id = Date.now()
    await eec.query(`INSERT INTO waterlevel(proj_id, ndate)VALUES('${proj_id}', now())`)
    let d;
    for (d in data) {
        // console.log(d, data[d]);
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE waterlevel SET ${d}='${data[d]}' WHERE proj_id='${proj_id}'`;
            await eec.query(sql)
        }
    }

    if (data.geom !== "") {
        let sql = `UPDATE waterlevel SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
            WHERE proj_id='${proj_id}'`;
        await eec.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/waterlevel-api/delete", (req, res) => {
    const { proj_id } = req.body;
    const sql = `DELETE FROM waterlevel WHERE proj_id='${proj_id}'`
    // console.log(sql);
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

module.exports = app;