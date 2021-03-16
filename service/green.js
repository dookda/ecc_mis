const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/green-api/adddata", async (req, res) => {
    const { proj_name, response, gtype, place, area, geom } = req.body;
    const proj_id = Date.now()
    const sql = `INSERT INTO green_area(
                    proj_id,proj_name,response,gtype,place,area,dt
                )VALUES(
                    '${proj_id}','${proj_name}','${response}','${gtype}','${place}',${area},now()
                )`
    const sqlGeom = `INSERT INTO green_area_geom(
                    proj_id, geom
                )VALUES(
                    '${proj_id}', ST_GeomfromGeoJSON('${JSON.stringify(geom.geometry)}')
                )`
    // console.log(sql,);
    await eec.query(sqlGeom)
    await eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

app.post("/green-api/getdata", (req, res) => {
    const { userId } = req.body;
    const sql = `SELECT a.*, ST_AsGeojson(geom) as geojson  
            FROM green_area a
            LEFT JOIN green_area_geom b
            ON a.proj_id = b.proj_id`

    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/green-api/deletedata", (req, res) => {
    const { proj_id } = req.body;
    const sql = `DELETE FROM green_area WHERE proj_id='${proj_id}'`

    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})


module.exports = app;