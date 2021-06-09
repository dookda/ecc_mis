const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/projmon-api/getdata", (req, res) => {
    const { org, typ } = req.body;
    console.log(org, typ);
    if (typ == 'admin') {
        const sql = `SELECT *, ST_AsGeojson(geom) as geojson 
        FROM eecprj_mon ORDER BY prj_cate ASC`
        eec.query(sql).then(r => {
            res.status(200).json({
                data: r.rows
            })
        })
    } else if (typ == 'editor') {
        const sql = `SELECT *, ST_AsGeojson(geom) as geojson 
        FROM eecprj_mon WHERE prj_operat='${org}' ORDER BY prj_cate ASC`
        eec.query(sql).then(r => {
            res.status(200).json({
                data: r.rows
            })
        })
    }
})

app.post("/projmon-api/getone", (req, res) => {
    const { prj_id } = req.body;
    // console.log(proj_id);
    const sql = `SELECT *, 
        to_char(dt, 'DD Month YYYY') as editdate,
        ST_AsGeojson(geom) as geojson
        FROM eecprj_mon WHERE prj_id='${prj_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon-api/getmeasurebyact", (req, res) => {
    const { prj_id } = req.body;
    // console.log(proj_id);
    const sql = `SELECT  prj_measure,act_1,act_2,act_3,act_4,
                act_5,act_6,act_7,act_8,act_9,act_10,act_11
                FROM eecprj_mon WHERE prj_id='${prj_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon-api/getmeasure", (req, res) => {
    const { prj_measure } = req.body;
    const sql = `SELECT * FROM eecprj_mon_measure
                WHERE prj_measure='${prj_measure}' ORDER BY id`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon-api/insertdata", async (req, res) => {
    const { data } = req.body;
    let prj_id = Date.now()

    await eec.query(`INSERT INTO eecprj_mon(prj_id, dt)VALUES('${prj_id}', now())`)
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE eecprj_mon SET ${d}='${data[d]}' WHERE prj_id='${prj_id}'`
            await eec.query(sql)
        }
    }
    if (data.geom !== "") {
        let sql = `UPDATE eecprj_mon 
                    SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}')
                    WHERE prj_id='${prj_id}'`
        await eec.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/projmon-api/updatedata", async (req, res) => {
    const { data } = req.body;
    for (let d in data) {
        if (data[d] !== '' && d !== 'geom' && d !== "prj_id") {
            let sql = `UPDATE eecprj_mon SET ${d}='${data[d]}' WHERE prj_id='${data.prj_id}'`
            await eec.query(sql)
        }
    }
    if (data.geom !== "") {
        let sql = `UPDATE eecprj_mon 
                    SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}')
                    WHERE prj_id='${data.prj_id}'`
        await eec.query(sql)
    } else {
        let sql = `UPDATE eecprj_mon 
                    SET geom=NULL
                    WHERE prj_id='${data.prj_id}'`
        await eec.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/projmon-api/deletedata", (req, res) => {
    const { prj_id } = req.body;
    const sql = `DELETE FROM eecprj_mon WHERE prj_id='${prj_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

app.post("/projmon-api/getdata", (req, res) => {
    const { org, typ } = req.body;
    // console.log(org, typ);
    if (typ == 'admin') {
        const sql = `SELECT *, ST_AsGeojson(geom) as geojson 
        FROM eecprj_mon ORDER BY prj_cate ASC`
        eec.query(sql).then(r => {
            res.status(200).json({
                data: r.rows
            })
        })
    } else if (typ == 'editor') {
        const sql = `SELECT *, ST_AsGeojson(geom) as geojson 
        FROM eecprj_mon WHERE prj_operat='${org}' ORDER BY prj_cate ASC`
        eec.query(sql).then(r => {
            res.status(200).json({
                data: r.rows
            })
        })
    }
})

app.post("/projmon-api/insertnonprojdata", async (req, res) => {
    const { data } = req.body;
    let prj_id = Date.now()

    await eec.query(`INSERT INTO eecprj_monnonprj(prj_id, dt)VALUES('${prj_id}', now())`)
    let d;
    for (d in data) {
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE eecprj_monnonprj SET ${d}='${data[d]}' WHERE prj_id='${prj_id}'`
            await eec.query(sql)
        }
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/projmon-api/updatenonprojdata", async (req, res) => {
    const { data, prj_id } = req.body;
    for (let d in data) {
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE eecprj_monnonprj SET ${d}='${data[d]}' WHERE prj_id='${prj_id}'`
            await eec.query(sql)
        }
    }
    res.status(200).json({
        data: "success"
    })
})


app.post("/projmon-api/getnonprojdata", (req, res) => {
    const { org, typ } = req.body;
    // console.log(org, typ);
    if (typ == 'admin') {
        const sql = `SELECT * FROM eecprj_monnonprj ORDER BY dt DESC`
        eec.query(sql).then(r => {
            res.status(200).json({
                data: r.rows
            })
        })
    } else if (typ == 'editor') {
        const sql = `SELECT * FROM eecprj_monnonprj WHERE prj_operat='${org}' ORDER BY dt ASC`
        eec.query(sql).then(r => {
            res.status(200).json({
                data: r.rows
            })
        })
    }
})

app.post("/projmon-api/getonenonproj", (req, res) => {
    const { prj_id } = req.body;
    // console.log(proj_id);
    const sql = `SELECT * FROM eecprj_monnonprj WHERE prj_id='${prj_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon-api/getmeasurebyactnonprj", (req, res) => {
    const { prj_id } = req.body;
    // console.log(proj_id);
    const sql = `SELECT  prj_measure,act_1,act_2,act_3,act_4,
                act_5,act_6,act_7,act_8,act_9,act_10,act_11
                FROM eecprj_monnonprj WHERE prj_id='${prj_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon-api/deletedatanonprj", (req, res) => {
    const { prj_id } = req.body;
    const sql = `DELETE FROM eecprj_monnonprj WHERE prj_id='${prj_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

app.get("/projmon-api/export", (req, res) => {

    const sql = `SELECT * FROM projmon`;
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

module.exports = app;