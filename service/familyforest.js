const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/ff-api/geteatlist", (req, res) => {
    const { ftype } = req.body;
    const sql = `SELECT DISTINCT fplant FROM familyforest_regis 
                    WHERE ftype='${ftype}' ORDER BY fplant`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/ff-api/getpacellist", (req, res) => {
    const { usrid } = req.body;
    const sql = `SELECT *, ST_AsGeoJson(geom) as geom FROM familyforest_user WHERE usrid='${usrid}'`;
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/ff-api/getpacelone", (req, res) => {
    const { ffid } = req.body;
    const sql = `SELECT * FROM familyforest_regis WHERE ffid='${ffid}'`;
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/ff-api/getpacelgid", (req, res) => {
    const { gid } = req.body;
    const sql = `SELECT * FROM familyforest_regis WHERE gid='${gid}'`;
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/ff-api/insertdaily", async (req, res) => {
    const { data } = req.body;
    const pid = Date.now();
    await eec.query(`INSERT INTO familyforest_daily(pid)VALUES('${pid}')`);

    for (let d in data) {
        if (data[d]) {
            let sql = `UPDATE familyforest_daily SET ${d}='${data[d]}' WHERE pid='${pid}'`;
            // console.log(sql);
            await eec.query(sql);
        }
    }
    res.status(200).json({
        data: "success"
    });
})

app.post("/ff-api/getdaily", (req, res) => {

    const { usrid } = req.body;
    const sql = `SELECT *, TO_CHAR(dt, 'DD-MM-YYYY') as date 
        FROM familyforest_daily WHERE usrid='${usrid}' ORDER BY dt DESC`;
    // console.log(sql);
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/ff-api/getalldaily", (req, res) => {
    const { pro, userid } = req.body;
    let sql;
    if (pro == 'ทุกจังหวัด') {
        sql = `SELECT a.*, TO_CHAR(a.dt, 'DD-MM-YYYY') as date ,
            ST_AsGeoJson(b.geom) as geom, b.pro
            FROM familyforest_daily a
            LEFT JOIN familyforest_user b
            ON a.ffid = b.ffid
            ORDER BY a.dt DESC`;
    } else {
        sql = `SELECT a.*, TO_CHAR(a.dt, 'DD-MM-YYYY') as date ,
            ST_AsGeoJson(b.geom) as geom, b.pro
            FROM familyforest_daily a
            LEFT JOIN familyforest_user b
            ON a.ffid = b.ffid
            WHERE b.pro = '${pro}'
            ORDER BY a.dt DESC`;
    }
    // console.log(sql);
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/ff-api/getparcelall", (req, res) => {
    const { ffid } = req.body;
    const sql = `SELECT *, ST_AsGeoJson(geom) as geom FROM familyforest_user`;
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/ff-api/insert", async (req, res) => {
    const { ffid, ftype, fplant } = req.body;
    if (ftype && fplant) {
        let sql = `INSERT INTO familyforest_regis(ffid, ftype, fplant)VALUES('${ffid}', '${ftype}', '${fplant}')`;
        await eec.query(sql);
    }

    res.status(200).json({
        data: "success"
    });
})

app.post("/ff-api/deleteplant", async (req, res) => {
    const { ffid, ftype, fplant } = req.body;
    if (ftype && fplant) {
        let sql = `DELETE FROM familyforest_regis WHERE ftype = '${ftype}' AND fplant = '${fplant}'`;
        await eec.query(sql);
    }

    res.status(200).json({
        data: "success"
    });
})

app.post("/ff-api/insert-regis", async (req, res) => {
    const { ffid, data } = req.body;
    await eec.query(`INSERT INTO familyforest_user(ffid)VALUES('${ffid}')`);

    for (let d in data) {
        if (data[d] && d !== 'geom') {
            let sql = `UPDATE familyforest_user SET ${d}='${data[d]}' WHERE ffid='${ffid}'`;
            await eec.query(sql);
        }
    }

    if (data.geom) {
        let sql = `UPDATE familyforest_user SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}')
                    WHERE ffid='${ffid}'`;
        await eec.query(sql);
    }

    res.status(200).json({
        data: "success"
    });
})

app.post("/ws-api/update", async (req, res) => {
    const { data, tb, ws_id } = req.body;
    for (let d in data) {
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE ${tb} SET ${d}='${data[d]}' WHERE ws_id='${ws_id}'`
            // console.log(sql);
            await eec.query(sql)
        }
    }

    if (data.geom !== "") {
        let sql = `UPDATE ${tb}  
                    SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}')
                    WHERE ws_id='${ws_id}'`
        await eec.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/ff-api/delete", (req, res) => {
    const { gid } = req.body;
    const sql = `DELETE FROM familyforest_daily WHERE gid='${gid}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

module.exports = app;