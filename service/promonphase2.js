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

module.exports = app;