const express = require('express');
const app = express.Router();
const con = require("./db");
const ecc = con.ecc;
const dat = con.dat;


app.post("/eec-api/aqi-insert", (req, res) => {
    const { sname, saqi, img, geom } = req.body;

    const imgname = "img" + Date.now();
    const sql = "INSERT INTO ecc_aqi_4326 (sname, saqi, imgname, img, sdate, geom) " +
        "VALUES ($1,$2,$3,$4,now(),ST_SetSRID(st_geomfromgeojson($5), 4326))";
    const val = [sname, saqi, imgname, img, geom];
    // console.log(sql)
    // console.log(val);

    ecc.query(sql, val).then((r) => {
        res.status(200).json({
            status: "success",
            message: "insert data"
        });
    });
});

app.get("/eec-api/get-aqi", (req, res) => {
    const sql = `SELECT s.* 
        FROM
            (SELECT tt.sta_id, tt.sta_th, tt.sta_en, tt.area_th, tt.area_en, tt.sta_type, 
                tt.lat, tt.lon, TO_CHAR(tt.date_, 'YYYY-MM-DD') as date_, 
                TO_CHAR(time_, 'HH24:MM') as time_, CONCAT(tt.date_,' ',tt.time_)::timestamp as dt,
                tt.pm25, tt.pm10, tt.o3, tt.co, tt.no2, tt.so2, tt.aqi
                FROM aqi_hourly_pcd tt
                WHERE tt.sta_id = 'bkp80t' OR tt.sta_id = '19t' OR tt.sta_id = '77t'
                    OR tt.sta_id = '34t'OR tt.sta_id = '32t' OR tt.sta_id = '28t' 
                    OR tt.sta_id = '33t' OR tt.sta_id = '30t' OR tt.sta_id = '74t'
                    OR tt.sta_id = '29t' OR tt.sta_id = '31t' OR tt.sta_id = 'm9'
                GROUP BY tt.sta_id,tt.sta_th, tt.sta_en, tt.area_th, tt.area_en, tt.sta_type, 
                    tt.lat, tt.lon, tt.date_, tt.time_, tt.pm25, tt.pm10, tt.o3, tt.co, tt.no2, tt.so2, tt.aqi
            ) as s
        INNER JOIN 
            (SELECT sta_id, MAX(CONCAT(date_,' ',time_)::timestamp) AS dt
                FROM aqi_hourly_pcd
                GROUP BY sta_id) as m
        ON s.sta_id = m.sta_id
        WHERE s.dt = m.dt`

    dat.query(sql).then((r) => {
        res.status(200).json({
            data: r.rows
        });
    });
})

app.get("/eec-api/get-av-aqi", (req, res) => {
    const sql = `SELECT avg(s.pm25) as pm25, avg(s.pm10) as pm10, avg(s.o3) as o3, 
            avg(s.co) as co, avg(s.no2) as no2, avg(s.so2) as so2, avg(s.aqi) as aqi
        FROM
        (SELECT tt.sta_id, tt.sta_th, tt.sta_en, tt.area_th, tt.area_en, tt.sta_type, 
            tt.lat, tt.lon, TO_CHAR(tt.date_, 'YYYY-MM-DD') as date_, 
            TO_CHAR(time_, 'HH24:MM') as time_, CONCAT(tt.date_,' ',tt.time_)::timestamp as dt,
            tt.pm25, tt.pm10, tt.o3, tt.co, tt.no2, tt.so2, tt.aqi
            FROM aqi_hourly_pcd tt
            WHERE tt.sta_id = 'bkp80t' OR tt.sta_id = '19t' OR tt.sta_id = '77t'
                OR tt.sta_id = '34t'OR tt.sta_id = '32t' OR tt.sta_id = '28t' 
                OR tt.sta_id = '33t' OR tt.sta_id = '30t' OR tt.sta_id = '74t'
                OR tt.sta_id = '29t' OR tt.sta_id = '31t' OR tt.sta_id = 'm9'
            GROUP BY tt.sta_id,tt.sta_th, tt.sta_en, tt.area_th, tt.area_en, tt.sta_type, 
                tt.lat, tt.lon, tt.date_, tt.time_, tt.pm25, tt.pm10, tt.o3, tt.co, tt.no2, tt.so2, tt.aqi
        ) as s
        INNER JOIN 
        (SELECT sta_id, MAX(CONCAT(date_,' ',time_)::timestamp) AS dt
            FROM aqi_hourly_pcd
            GROUP BY sta_id) as m
        ON s.sta_id = m.sta_id
        WHERE s.dt = m.dt`;
    dat.query(sql).then((r) => {
        res.status(200).json({
            data: r.rows
        });
    });
})

app.post("/eec-api/get-hist", (req, res) => {
    const { sta_id } = req.body;
    const sql = `SELECT DISTINCT TO_CHAR(date_, 'YYYY-MM-DD') as date_, sta_id, sta_th, 
            avg(pm25) as pm25,
            avg(pm10) as pm10, 
            avg(o3) as o3, 
            avg(co) as co, 
            avg(no2) as no2, 
            avg(so2) as so2, 
            avg(aqi) as aqi
        FROM aqi_hourly_pcd
        WHERE sta_id = '${sta_id}'
        GROUP BY date_, sta_id, sta_th 
        ORDER BY date_`
    // console.log(sta_id)
    dat.query(sql).then((r) => {
        // console.log(r.rows)
        res.status(200).json({
            data: r.rows
        });
    });
})

module.exports = app;