const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/projmon-api/getdata", (req, res) => {
    const { userid } = req.body;
    // console.log(userid);
    const sql = `SELECT * FROM project_monitor`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon-api/getone", (req, res) => {
    const { userid, proj_id } = req.body;
    // console.log(proj_id);
    const sql = `SELECT *, to_char("espect", 'YYYY-MM-DD') as espect, 
        to_char("editdate", 'DD Month YYYY') as editdate,
        ST_AsGeojson(geom) as geojson
        FROM project_monitor WHERE proj_id='${proj_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon-api/adddata", (req, res) => {
    const { proj_name, budget, loan, year, proj_type, location,
        area, status, espect, feas_loan, other, proj_obj,
        proj_mthod, proj_tech, proj_area, output, problem,
        quesion, rname, pos, tele, fax, mob, mail, geom } = req.body;
    let proj_id = Date.now()
    console.log(espect);
    let sql = `INSERT INTO project_monitor(
                proj_id,proj_name,budget,loan,year,proj_type,location,
                area,status,feas_loan,other,proj_obj,
                proj_mthod,proj_tech,proj_area,output,problem,
                quesion,rname,pos,tele,fax,mob,mail,editdate
            )VALUES(
                '${proj_id}','${proj_name}',${budget},'${loan}','${year}','${proj_type}','${location}',
                ${area},'${status}','${feas_loan}','${other}','${proj_obj}',
                '${proj_mthod}','${proj_tech}','${proj_area}','${output}','${problem}',
                '${quesion}','${rname}','${pos}','${tele}','${fax}','${mob}','${mail}',now()
            )`

    eec.query(sql).then(r => {
        if (geom !== "-") {
            eec.query(`UPDATE project_monitor
                    SET geom=ST_GeomfromGeoJSON('${JSON.stringify(geom.geometry)}')
                    WHERE proj_id='${proj_id}'`)
        }

        if (espect !== "-") {
            eec.query(`UPDATE project_monitor 
                    SET espect='${espect}' 
                    WHERE proj_id='${proj_id}'`)
        }

        res.status(200).json({
            data: "success"
        })
    })
})

app.post("/projmon-api/updatedata", (req, res) => {
    const { proj_id, proj_name, budget, loan, year, proj_type, location,
        area, status, espect, feas_loan, other, proj_obj,
        proj_mthod, proj_tech, proj_area, output, problem,
        quesion, rname, pos, tele, fax, mob, mail, geom } = req.body;
    let sql = `UPDATE project_monitor SET 
            proj_name='${proj_name}',budget=${budget},loan='${loan}',year='${year}',proj_type='${proj_type}',location='${location}',
            area=${area},status='${status}',feas_loan='${feas_loan}',other='${other}',proj_obj='${proj_obj}',
            proj_mthod='${proj_mthod}',proj_tech='${proj_tech}',proj_area='${proj_area}',output='${output}',problem='${problem}',
            quesion='${quesion}',rname='${rname}',pos='${pos}',tele='${tele}',fax='${fax}',mob='${mob}',mail='${mail}',
            editdate=now() WHERE proj_id='${proj_id}'`

    eec.query(sql).then(r => {
        if (geom !== "-") {
            eec.query(`UPDATE project_monitor
                    SET geom=ST_GeomfromGeoJSON('${JSON.stringify(geom.geometry)}')
                    WHERE proj_id='${proj_id}'`)
        }

        if (espect !== "-") {
            eec.query(`UPDATE project_monitor 
                    SET espect='${espect}' 
                    WHERE proj_id='${proj_id}'`)
        }
        res.status(200).json({
            data: "success"
        })
    })
})

app.post("/projmon-api/deletedata", (req, res) => {
    const { proj_id } = req.body;
    const sql = `DELETE FROM project_monitor WHERE proj_id='${proj_id}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

module.exports = app;