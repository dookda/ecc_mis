const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.get("/insee-api/get", async (req, res) => {
    eec.query('select * from form_af ORDER by gid', (e, r) => {
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/insee-api/insert", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO form_af (id_date) VALUES ('${x.id_date}');`
        console.log(y)
        await db.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (x[d] !== '' && d !== 'id_date' && d !== 'geom') {
                let sql = `UPDATE form_af SET ${d} ='${x[d]}' WHERE id_date ='${x.id_date}';`
                console.log(sql);
                // db.query(sql)
                eec.query(sql)
            }
        }
        if (x.geom !== "") {
            let sql = `UPDATE form_af SET geom = ST_GeomfromGeoJSON('${JSON.stringify(x.geom.geometry)}')
                                WHERE id_date ='${x.id_date}';`
            console.log(sql);
            // db.query(sql)
            eec.query(sql)
        }
    })
    res.status(200).json({
        data: "success"
    })
})

app.get('/insee-api/get_geom', (req, res) => {
    eec.query('SELECT id_date,intono, intoname,typeag, ST_AsGeoJSON(geom) FROM form_af  ORDER by id_date', (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})

app.get('/insee-api/get/iduser', (req, res) => {
    const data = req.body;
    let userid = data.userid
    // console.log(userid)
    let sql = `SELECT* FROM form_af where id_user ='${userid}' `
    // console.log(sql)
    eec.query(sql)

})
module.exports = app;