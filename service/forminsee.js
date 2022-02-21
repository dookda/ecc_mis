const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

// server Form Agri Food
app.post("/form_insee/insert", async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    data.map(async (x) => {
        let y = `INSERT INTO form_insee (id_date) VALUES ('${x.id_date}');`
        // console.log(y)
        await eec.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (x[d] !== '' && d !== 'id_date' && d !== 'geom') {
                let sql = `UPDATE form_insee SET ${d} ='${x[d]}' WHERE id_date ='${x.id_date}';`
                // console.log(sql);
                eec.query(sql)
            }
        }
        if (x.geom !== "") {
            let sql = `UPDATE form_insee SET geom = ST_GeomfromGeoJSON('${JSON.stringify(x.geom.geometry)}')
                                WHERE id_date ='${x.id_date}';`
            // console.log(sql);
            eec.query(sql)
        }
    })
    res.status(200).json({
        data: "success"
    })
})
// get all data Form_insee
app.get('/insee-api/get', (req, res) => {
    eec.query('select * from form_insee ORDER by gid', (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
// get geom form_insee
app.get('/insee-api/getgeom', (req, res) => {
    eec.query(`SELECT *,ST_AsGeoJSON(geom),ST_x(ST_Centroid(geom)) as lon,ST_y(ST_Centroid(geom)) as lat ,TO_CHAR(repordat,'DD-MM-YYYY')repor_date FROM form_insee ORDER by datreport DESC`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.get('/insee-api/getgeom/:urid', (req, res) => {
    const a = req.params.urid;
    eec.query(`SELECT *,ST_AsGeoJSON(geom),ST_x(ST_Centroid(geom)) as lon,ST_y(ST_Centroid(geom)) as lat,TO_CHAR(repordat,'DD-MM-YYYY')repor_date FROM form_insee  where id_userid = '${a}' ORDER by datreport DESC`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.get('/insee-api/getgeom/prov/:pro', (req, res) => {
    const a = req.params.pro;
    eec.query(`SELECT *,ST_AsGeoJSON(geom),ST_x(ST_Centroid(geom)) as lon,ST_y(ST_Centroid(geom)) as lat,TO_CHAR(repordat,'DD-MM-YYYY')repor_date FROM form_insee where p_code = '${a}' ORDER by datreport DESC`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.get('/insee-api/getgeom/amp/:amp', (req, res) => {
    const a = req.params.amp;
    eec.query(`SELECT *,ST_AsGeoJSON(geom),ST_x(ST_Centroid(geom)) as lon,ST_y(ST_Centroid(geom)) as lat,TO_CHAR(repordat,'DD-MM-YYYY')repor_date FROM form_insee where a_code = '${a}' ORDER by datreport DESC`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.get('/insee-api/getgeom/tam/:tam', (req, res) => {
    const a = req.params.tam;
    eec.query(`SELECT *,ST_AsGeoJSON(geom),ST_x(ST_Centroid(geom)) as lon,ST_y(ST_Centroid(geom)) as lat,TO_CHAR(repordat,'DD-MM-YYYY')repor_date FROM form_insee where t_code = '${a}' ORDER by datreport DESC`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/insee-api/deletedata", (req, res) => {
    const data = req.body;
    let id_date = data.id_date
    let sql = `DELETE FROM form_insee WHERE id_date = '${id_date}'`;
    eec.query(sql)
})
app.post("/form_insee/update", async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    data.map(async (x) => {
        let d;
        for (d in x) {
            // console.log(d)
            if (x[d] !== '' && d !== 'id_date' && d !== 'geom') {
                let sql = `UPDATE form_insee SET ${d} ='${x[d]}' WHERE id_date ='${x.id_date}';`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })
})

module.exports = app;