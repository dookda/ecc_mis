const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post('/api/report-post', function (req, res) {
    let { p_name, waterLv, lat, lng } = req.body
    let sql = `INSERT INTO water_Level (p_name,water_l,geom)VALUES(
        '${p_name}',${waterLv},ST_GeomFromText('POINT(${lng} ${lat})', 4326 ))`
    console.log(sql)
    eec.query(sql).then(r => {
        console.log(r)
        res.json({
            status: 'insert done!!'
        })
    })
})

app.post('/api/regis-post', function (req, res) {
    let { sname, tel, email, prov, occ, sex, gArea, Og_Ag, Fam_f, w_qul, w_lev, airQ, workshop } = req.body
    let sql = `INSERT INTO register (sname,tel,email,prov,occ,sex,gArea,Og_Ag,Fam_f,w_qul,w_lev,airQ,workshop)VALUES(
        '${sname}',${tel},${email},${prov},${occ},${sex},${gArea},${Og_Ag},${Fam_f},${w_qul},${w_lev},${airQ},${workshop}))`
    console.log(sql)
    eec.query(sql).then(r => {
        console.log(r)
        res.json({
            status: 'insert done!!'
        })
    })
})
app.get('/api/getLv', function (req, res) {
    let sql = `SELECT * FROM water_Level`
    eec.query(sql).then(r => {
        res.json({
            status: "getdata",
            data: r.rows


        })
    })

})






module.exports = app;