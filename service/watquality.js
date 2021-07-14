const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;
const qrcode = require('qrcode')

app.post("/wq-api/getone", (req, res) => {
    const { wq_id } = req.body;
    const sql = `SELECT * FROM v_watquality
                WHERE wq_id='${wq_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/wq-api/getdata", (req, res) => {
    const { usrid } = req.body;
    const sql = `SELECT *, TO_CHAR(bf_date, 'DD-MM-YYYY') as bf_date, 
            TO_CHAR(af_date, 'DD-MM-YYYY') as af_date 
        FROM v_watquality`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/wq-api/getownerdata", (req, res) => {
    const { usrid } = req.body;
    const sql = `SELECT *, TO_CHAR(bf_date, 'DD-MM-YYYY') as bf_date, 
            TO_CHAR(af_date, 'DD-MM-YYYY') as af_date 
        FROM v_watquality WHERE usrid='${usrid}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/wq-api/getdatabystation", (req, res) => {
    const { syst } = req.body;
    const sql = `SELECT v.* FROM v_watquality v WHERE syst='${syst}' ORDER BY v.bf_date`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/wq-api/createreport", async (req, res) => {
    const { data } = req.body;
    let wq_id = Date.now()
    await eec.query(`INSERT INTO watquality_bf(wq_id)VALUES('${wq_id}')`)
    await eec.query(`INSERT INTO watquality_af(wq_id)VALUES('${wq_id}')`)
    let d;
    for (d in data) {
        if (data[d] !== "") {
            let sql = `UPDATE watquality_bf SET ${d}='${data[d]}' WHERE wq_id='${wq_id}'`
            await eec.query(sql)
        }
    }

    qrcode.toDataURL(`https://eec-onep.online/form_water_qua/edit_bf/index.html?id=${wq_id}`, async (err, qr) => {
        await eec.query(`UPDATE watquality_bf SET qr='${qr}' WHERE wq_id='${wq_id}'`)
        res.status(200).json({
            data: "success",
            rid: wq_id,
            qr: qr
        })
    })
})

app.post("/wq-api/update", async (req, res) => {
    const { data, tb, wq_id } = req.body;

    for (let d in data) {
        if (data[d] !== '' && d !== 'geom') {
            let sql = `UPDATE ${tb} SET ${d}='${data[d]}' WHERE wq_id='${wq_id}'`
            // console.log(sql);
            await eec.query(sql)
        }
    }

    if (data.geom.features) {
        let sql = `UPDATE ${tb} 
                    SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom.features[0].geometry)}')
                    WHERE wq_id='${wq_id}'`
        await eec.query(sql)
    } else if (data.geom) {
        let sql = `UPDATE ${tb} 
                    SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}')
                    WHERE wq_id='${wq_id}'`
        await eec.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/wq-api/deletedata", (req, res) => {
    const { wq_id } = req.body;
    const sql = `DELETE FROM watquality_bf WHERE wq_id='${wq_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

module.exports = app;