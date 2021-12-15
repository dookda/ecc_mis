const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

// server Form groudwater
app.post("/form_gw/insert", async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    data.map(async (x) => {
        let y = `INSERT INTO form_gw (id_date) VALUES ('${x.id_date}');`
        // console.log(y)
        await eec.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (x[d] !== '' && d !== 'id_date' && d !== 'geom') {
                let sql = `UPDATE form_gw SET ${d} ='${x[d]}' WHERE id_date ='${x.id_date}';`
                // console.log(sql);
                eec.query(sql)
            }
        }
        if (x.geom !== "") {
            let sql = `UPDATE form_gw SET geom = ST_GeomfromGeoJSON('${JSON.stringify(x.geom.geometry)}')
                                WHERE id_date ='${x.id_date}';`
            // console.log(sql);
            eec.query(sql)
        }
    })
    res.status(200).json({
        data: "success"
    })
})
app.get('/form_gw/get-api', (req, res) => {
    eec.query('select * from form_gw ORDER by gid', (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.get('/form_gw/get_geom', (req, res) => {
    eec.query(`SELECT *,ST_AsGeoJSON(geom), TO_CHAR(gwdate,'DD-MM-YYYY')repor_date  FROM form_gw ORDER by gwdate DESC`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.get('/form_gw/getgeom/:urid', (req, res) => {
    const a = req.params.urid;
    eec.query(`SELECT *,ST_AsGeoJSON(geom),TO_CHAR(gwdate,'DD-MM-YYYY')repor_date FROM form_gw where id_userid = '${a}' ORDER by gwdate desc;`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.get('/form_gw/getgeom/pro/:pro', (req, res) => {
    const a = req.params.pro;
    eec.query(`SELECT *,ST_AsGeoJSON(geom),TO_CHAR(gwdate,'DD-MM-YYYY')repor_date FROM form_gw where p_code= '${a}' ORDER by gid;`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.get('/form_gw/getgeom/amp/:amp', (req, res) => {
    const a = req.params.amp;
    eec.query(`SELECT *,ST_AsGeoJSON(geom),TO_CHAR(gwdate,'DD-MM-YYYY')repor_date FROM form_gw where a_code = '${a}' ORDER by gid;`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.get('/form_gw/getgeom/tam/:tam', (req, res) => {
    const a = req.params.tam;
    eec.query(`SELECT *,ST_AsGeoJSON(geom),TO_CHAR(gwdate,'DD-MM-YYYY')repor_date FROM form_gw where t_code = '${a}' ORDER by gid;`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/form_gw/deletedata", (req, res) => {
    const data = req.body;
    let id_date = data.id_date
    let sql = `DELETE FROM form_gw WHERE id_date = '${id_date}'`;
    // console.log(sql)
    eec.query(sql).then(r => {
        // console.log(r.rows)
        res.status(200).json({
            data: "success"
        })
    })
})
app.post("/form_gw/update", async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    data.map(async (x) => {
        let d;
        for (d in x) {
            // console.log(d)
            if (x[d] !== '' && d !== 'id_date' && d !== 'geom') {
                let sql = `UPDATE form_gw SET ${d} ='${x[d]}' WHERE id_date ='${x.id_date}';`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })
})

app.get('/form_gw/getintro', (req, res) => {
    eec.query('SELECT DISTINCT staid,staname,tambon,amphoe,prov,lat,lng FROM form_gw ORDER by staid', (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.get('/form_gw/getintro/pro/:pro', (req, res) => {
    const a = req.params.pro;
    eec.query(`SELECT DISTINCT staid,staname,tambon,amphoe,prov,lat,lng FROM form_gw where p_code ='${a}' ORDER by staid`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.get('/form_gw/getintro/amp/:amp', (req, res) => {
    const a = req.params.amp;
    eec.query(`SELECT DISTINCT staid,staname,tambon,amphoe,prov,lat,lng FROM form_gw where a_code ='${a}' ORDER by staid`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.get('/form_gw/getintro/tam/:tam', (req, res) => {
    const a = req.params.tam;
    eec.query(`SELECT DISTINCT staid,staname,tambon,amphoe,prov,lat,lng FROM form_gw where t_code ='${a}' ORDER by staid`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})

app.get('/form_gw/get/rank_ph', (req, res) => {
    eec.query('SELECT DISTINCT staid,staname,ph FROM form_gw where gwyear=2563 ORDER by ph', (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.get('/form_gw/get/rank_ec', (req, res) => {
    eec.query('SELECT DISTINCT staid,staname,ec FROM form_gw where gwyear=2563 ORDER by ec', (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})

app.get('/form_gw/get/rank_ph/:year', (req, res) => {
    const a = req.params.year;
    let sql = `SELECT DISTINCT staid,staname,ph FROM form_gw where gwyear='${a}' ORDER by ph`;
    eec.query(sql).then(r => {
        // console.log(r.rows)
        res.status(200).json({
            data: r.rows
        })
    })
})
app.get('/form_gw/get/rank_ec/:year/:station_id', (req, res) => {
    const a = req.params.year;
    const b = req.params.station_id;
    let sql = `SELECT DISTINCT staid,staname,ec FROM form_gw where gwyear='${a}' and staid='${b}' ORDER by ec`;
    eec.query(sql).then(r => {
        // console.log(r.rows)
        res.status(200).json({
            data: r.rows
        })
    })
})

app.get('/form_gw/get/rank_ec/:year', (req, res) => {
    const a = req.params.year;
    let sql = `SELECT DISTINCT staid,staname,ec FROM form_gw where gwyear='${a}' ORDER by ec`;
    eec.query(sql).then(r => {
        // console.log(r.rows)
        res.status(200).json({
            data: r.rows
        })
    })
})
app.get('/form_gw/get_geom/:urid', (req, res) => {
    const a = req.params.urid;
    eec.query(`SELECT *,ST_AsGeoJSON(geom) FROM form_gw where id_userid = ${a} ORDER by gid;`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})

module.exports = app;
