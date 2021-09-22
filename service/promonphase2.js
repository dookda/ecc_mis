const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/projmon2-api/prj_cate", (req, res) => {
    const sql = `SELECT DISTINCT prj_cate FROM eecprj_mon_phase2`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon2-api/prj_mac", (req, res) => {
    const { prj_cate } = req.body;
    const sql = `SELECT DISTINCT prj_mac FROM eecprj_mon_phase2 
                WHERE prj_cate='${prj_cate}' ORDER BY prj_mac ASC`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon2-api/prj_plan", (req, res) => {
    const { prj_mac } = req.body;
    const sql = `SELECT DISTINCT prj_plan FROM eecprj_mon_phase2 
                WHERE prj_mac='${prj_mac}' ORDER BY prj_plan ASC`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon2-api/prj_name", (req, res) => {
    const { prj_plan } = req.body;
    const sql = `SELECT prj_name FROM eecprj_mon_phase2 
                WHERE prj_plan='${prj_plan}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon2-api/prj_detail", (req, res) => {
    const { prj_name } = req.body;
    const sql = `SELECT plan_65,plan_66,plan_67,plan_68,plan_69,plan_70,budget,prj_operat,prj_suboperat 
                FROM eecprj_mon_phase2 
                WHERE prj_name='${prj_name}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon2-api/getallproj", (req, res) => {
    const { prj_operat } = req.body;
    sql = `SELECT * FROM eecprj_mon_phase2`;
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon2-api/getuserproj", (req, res) => {
    const { prj_operat } = req.body;
    let sql;

    if (prj_operat !== "admin") {
        sql = `SELECT r.*, u.prj_operat FROM eecprj_mon_phase2 r
                INNER JOIN (SELECT * FROM eecprj_mon_phase2_user WHERE prj_operat='${prj_operat}') u
                ON r.prj_id = u.prj_id`
    } else {
        sql = `SELECT r.*, u.prj_operat FROM eecprj_mon_phase2 r
                INNER JOIN (SELECT * FROM eecprj_mon_phase2_user WHERE prj_operat='${prj_operat}') u
                ON r.prj_id = u.prj_id`
    }
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})


app.post("/projmon2-api/getuserproj", (req, res) => {
    const { prj_operat } = req.body;
    let sql = `SELECT r.*, u.prj_operat FROM eecprj_mon_phase2 r
                INNER JOIN (SELECT * FROM eecprj_mon_phase2_user WHERE prj_operat='${prj_operat}') u
                ON r.prj_id = u.prj_id`

    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon2-api/getdetail", (req, res) => {
    const { gid } = req.body;
    let sql = `SELECT * FROM eecprj_mon_phase2 WHERE gid='${gid}'`

    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon2-api/updatedata", async (req, res) => {
    const { data } = req.body;
    for (let d in data) {
        if (data[d] !== '' && d !== 'geom' && d !== "gid") {
            let sql = `UPDATE eecprj_mon_phase2 SET ${d}='${data[d]}' WHERE gid='${data.gid}'`
            await eec.query(sql)
        }
    }
    if (data.geom !== "") {
        let sql = `UPDATE eecprj_mon_phase2 
                    SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}')
                    WHERE gid='${data.gid}'`
        await eec.query(sql)
    } else {
        let sql = `UPDATE eecprj_mon_phase2 
                    SET geom=NULL
                    WHERE gid='${data.gid}'`
        await eec.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})


module.exports = app;