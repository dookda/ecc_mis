const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

// server form_airpollution
app.post("/form_ap/insert", async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    data.map(async (x) => {
        let y = `INSERT INTO form_airpollution (id_date) VALUES ('${x.id_date}');`
        // console.log(y)
        await eec.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (x[d] !== '' && d !== 'id_date' && d !== 'geom' && d !== 'symptom' && d !== 'sickcheck') {
                let sql = `UPDATE form_airpollution SET ${d} ='${x[d]}' WHERE id_date ='${x.id_date}';`
                // console.log(sql);
                eec.query(sql)
            }
        }
        if (x.geom !== "") {
            let sql = `UPDATE form_airpollution SET geom = ST_GeomfromGeoJSON('${JSON.stringify(x.geom.geometry)}')
                                WHERE id_date ='${x.id_date}';`
            // console.log(sql);
            eec.query(sql)
        }

        if (x.symptom !== "") {
            let K;
            for (K in x.symptom) {
                let L
                for (L in x.symptom[K]) {
                    let sql = `UPDATE form_airpollution SET ${L} ='${x.symptom[K][L]}' WHERE id_date ='${x.id_date}';`
                    // console.log(sql);
                    eec.query(sql)
                }
            }
        }
        if (x.sickcheck !== "") {
            let K;
            for (K in x.sickcheck) {
                let L
                for (L in x.sickcheck[K]) {
                    let sql = `UPDATE form_airpollution SET ${L} ='${x.sickcheck[K][L]}' WHERE id_date ='${x.id_date}';`
                    // console.log(sql);
                    eec.query(sql)
                }
            }
        }
    })
    res.status(200).json({
        data: "success"
    })
})
app.get('/form_ap/get-api', (req, res) => {
    eec.query('select * from form_airpollution ORDER by gid', (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.get('/form_ap/get_geom', (req, res) => {
    eec.query(`SELECT *,ST_AsGeoJSON(geom),TO_CHAR(datreport,'DD-MM-YYYY')repor_date FROM form_airpollution ORDER by datreport desc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.get('/form_ap/get_geom/:urid', (req, res) => {
    const a = req.params.urid;
    eec.query(`SELECT *,ST_AsGeoJSON(geom),TO_CHAR(datreport,'DD-MM-YYYY')repor_date FROM form_airpollution  where id_userid = '${a}' ORDER by datreport desc;`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.get('/form_ap/getgeom/pro/:prov', (req, res) => {
    const a = req.params.prov;
    eec.query(`SELECT *,ST_AsGeoJSON(geom),TO_CHAR(datreport,'DD-MM-YYYY')repor_date FROM form_airpollution where p_code = '${a}' ORDER by gid desc;`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.get('/form_ap/getgeom/amp/:amp', (req, res) => {
    const a = req.params.amp;
    eec.query(`SELECT *,ST_AsGeoJSON(geom),TO_CHAR(datreport,'DD-MM-YYYY')repor_date FROM form_airpollution where a_code = '${a}' ORDER by gid desc;`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.get('/form_ap/getgeom/tam/:tam', (req, res) => {
    const a = req.params.tam;
    eec.query(`SELECT *,ST_AsGeoJSON(geom),TO_CHAR(datreport,'DD-MM-YYYY')repor_date FROM form_airpollution where t_code = '${a}' ORDER by gid desc;`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/form_ap/deletedata", (req, res) => {
    const data = req.body;
    let id_date = data.id_date;
    let sql = `DELETE FROM form_airpollution WHERE id_date = '${id_date}'`;
    // console.log(sql)
    eec.query(sql).then(r => {
        // console.log(r.rows)
        res.status(200).json({
            data: r.rows
        })
    })
})
module.exports = app;