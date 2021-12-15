const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/notice-eac/getdataone", (req, res) => {
    const { proj_id } = req.body;
    // console.log(proj_id);
    const sql = `SELECT gid,id_date, noticename, noticedetail, noticeplace, noticetype, lat,lng,
    prov_tn, amp_tn, tam_tn, TO_CHAR(datetimes, 'DD-MM-YYYY') as datetimes, record, dataimgurl,   
            ST_AsGeojson(geom) as geojson  
        FROM notice_eac WHERE id_date='${proj_id}'`;

    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/notice-eac/getownerdata", (req, res) => {
    const { usrid } = req.body;
    const sql = `SELECT gid, id_date, noticename, noticedetail, noticeplace, noticetype,lat,lng,
    prov_tn, amp_tn, tam_tn, TO_CHAR(datetimes, 'DD-MM-YYYY') as datetimes, record, dataimgurl,   
            ST_AsGeojson(geom) as geojson  
        FROM notice_eac WHERE usrid='${usrid}'`;

    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/notice-eac/getalldata", (req, res) => {
    const { usrid } = req.body;
    const sql = `SELECT gid, id_date, noticename, noticedetail, noticeplace, noticetype,lat,lng,
    prov_tn, amp_tn, tam_tn,TO_CHAR(datetimes, 'DD-MM-YYYY') as datetimes, record,    
            ST_AsGeojson(geom) as geojson  
        FROM notice_eac order by gid desc`;

    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/notice-eac/insert", async (req, res) => {
    const { data } = req.body;
    // let proj_id = Date.now()
    await eec.query(`INSERT INTO notice_eac (id_date) VALUES('${data.id_date}')`)
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'geom' && d !== 'id_date') {
            let sql = `UPDATE notice_eac SET ${d}='${data[d]}' WHERE id_date='${data.id_date}'`;
            await eec.query(sql)
        }
    }

    if (data.geom !== "") {
        let sql = `UPDATE notice_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
            WHERE id_date='${data.id_date}'`;
        await eec.query(sql)
    }

    res.status(200).json({
        data: "success"
    })
})
app.post("/notice-eac/save", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO notice_eac (id_date) VALUES ('${x.id_date}');`
        // console.log(y)
        await eec.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'geom') {
                let sql = `UPDATE notice_eac SET ${d} ='${x[d]}' WHERE id_date ='${x.id_date}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
        if (data.geom !== "") {
            let sql = `UPDATE notice_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
                WHERE id_date='${data.id_date}'`;
            await eec.query(sql)
        }
    })
    res.status(200).json({
        data: "success"
    })
})
app.post("/notice-eac/save2", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO notice_eac (id_date) VALUES ('${x.id_date}');`
        // console.log(y)
        await eec.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'geom') {
                let sql = `UPDATE notice_eac SET ${d} ='${x[d]}' WHERE id_date ='${x.id_date}' ;`
                // console.log(sql);
                eec.query(sql)
            } else {
                let sql = `UPDATE notice_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
                WHERE id_date='${data.id_date}'`;
                await eec.query(sql)
            }
        }
        // if (data.geom !== "") {
        //     let sql = `UPDATE notice_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
        //         WHERE id_date='${data.id_date}'`;
        //     await eec.query(sql)
        // }
    })
    res.status(200).json({
        data: "success"
    })
})

app.post("/notice-eac/update", async (req, res) => {
    const { proj_id, data } = req.body;
    // console.log(proj_id, data.geom);
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE notice_eac SET ${d}='${data[d]}', ndate=now() WHERE id_date='${proj_id}'`;
            await eec.query(sql)
        }
    }

    if (data.geom !== "" && data.geom.geometry) {
        let sql = `UPDATE notice_eac SET geom = ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}') 
            WHERE id_date='${proj_id}'`;
        await eec.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/notice-eac/delete", (req, res) => {
    const { proj_id } = req.body;
    const sql = `DELETE FROM notice_eac WHERE id_date='${proj_id}'`
    console.log(sql);
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})


module.exports = app;