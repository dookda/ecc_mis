const express = require('express');
const axios = require('axios');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

// let url = 'http://tgms.dgr.go.th/entries/poi-stations?keyword=&fbclid=IwAR3Jn_aT1of7HowTDG3sje76ie5eGHbPQo_h8_FWXk3h24nMs1W37KnvXVE';

// let m = 0;
// let loadData = async () => {
//     await axios.get(url).then(res => {
//         res.data.data.map(async (i) => {
//             // console.log(m)
//             m++;
//             // await insertStation(m, i)
//             await insertSensor(i.station_id, i.province, i.station_name, i.stations[0].sensors)
//             // await Updatedata(i.station_id, i.stations[0].sensors)
//             // 
//         })
//     })
// }
// loadData()
// // .then(box => box.json())
// // .then(datas => {
// //     console.log(datas);
// //     let data = datas.data
// //     data.map(async (i) => {
// //         await insertStation(i)
// //     })
// // })

// let insertStation = async (m, i) => {
//     console.log(i.stations[0].station_code)
//     let sql = `INSERT INTO sta_detail (station_id,station_name,sta_isonline,status_alarm,muban_no,village_name,tambon,amphoe,province,utm_zone,url_image_station,well_monitor,station_code,geom)VALUES(
//         ${i.station_id},'${i.station_name}','${i.isOnline}',${i.stations[0].status_alarm},'${i.muban_no}','${i.village_name}','${i.tambon}','${i.amphoe}','${i.province}',${i.utm_zone},'${i.stations[0].url_image_station}','${i.stations[0].well_monitor}','${i.stations[0].station_code}',ST_GeomFromText('POINT(${i.lng} ${i.lat})', 4326 ))`

//     console.log(m, sql)
//     await eec.query(sql).then(r => {

//     })

//     // await axios.post('http://localhost:3000/api/staData', staData).then(res => {
//     //     console.log(k, res);
//     // })
// }
// o = 0;
// let insertSensor = (sid, province, station_name, se) => {
//     console.log(se.length);

//     se.map(async s => {
//         let sql = `INSERT INTO sensor_detail (station_id,sensor_id,status_alarm,sensor_code,sensor_name,
//             depth,has_recorder,well_monitor,pipe_phase,wl,wl_date,
//             ec,ec_date,ph,ph_date,temp,temp_date,
//             tds,tds_date,sal,sal_date,online,
//             wl_min,wl_max,wl_avg,wl_data_date,s_length,province,station_name)VALUES(
//             ${sid},${s.sensor_id},${s.status_alarm},'${s.sensor_code}','${s.sensor_name}',
//             ${isNaN(Number(s.depth)) == true ? 0 : Number(s.depth)},
//             '${s.has_recorder}','${s.well_monitor}','${s.pipe_phase}',
//             ${isNaN(Number(s.wl)) == true ? 0 : Number(s.wl)},
//             '${s.wl_date}',
//             ${isNaN(Number(s.ec)) == true ? 0 : Number(s.ec)},
//             '${s.ec_date}',
//             ${isNaN(Number(s.ph)) == true ? 0 : Number(s.ph)},
//             '${s.ph_date}',
//             ${isNaN(Number(s.temp)) == true ? 0 : Number(s.temp)},
//             '${s.temp_date}',
//             ${isNaN(Number(s.tds)) == true ? 0 : Number(s.tds)},
//             '${s.tds_date}',
//             ${isNaN(Number(s.sal)) == true ? 0 : Number(s.sal)},
//             '${s.sal_date}',
//             '${s.online}',
//             ${isNaN(Number(s.wl_min)) == true ? 0 : Number(s.wl_min)},
//             ${isNaN(Number(s.wl_max)) == true ? 0 : Number(s.wl_max)},
//             ${isNaN(Number(s.wl_avg)) == true ? 0 : Number(s.wl_avg)},
//             '${s.wl_data_date}',
//             ${se.length},
//             '${province}',
//             '${station_name}'
//             )`


//         // console.log(o, sql)
//         await eec.query(sql).then(e => {
//             o++
//             console.log("insert ok", o, sql)
//         })

//     })
//     console.log("ok")
// }


app.get('/api/underWater', (req, res) => {
    eec.query(`select *,st_x(geom) as x,st_y(geom)as y from sta_detail`).then(r => {
        res.json({
            status: 'select done!!',
            data: r.rows
        })
    })
})

app.get('/api/underWater/:id', function (req, res) {
    let { id } = req.params
    let sql = `select * from sensor_detail where station_id =${id}`
    eec.query(sql).then(r => {
        res.json({
            status: 'sensor founded!!',
            data: r.rows
        })
    })
})

app.get("/api/get-water-near/:lat/:lon", (req, res) => {
    let { lat, lon } = req.params
    console.log(lat, lon)
    // const { geom } = req.body;
    const sql = `
    SELECT *, ST_Distance(ST_Transform(geom, 3857), ST_Transform(ST_Geomfromtext('Point(${lon} ${lat})', 4326), 3857))  as dist
    FROM sta_detail
    ORDER BY dist ASC
    LIMIT 1
    `
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.get('/api/rankWater/:parameter', (req, res) => {
    let { parameter } = req.params
    let sql = `select station_name,station_id,${parameter} from sensor_detail where s_length = 1 and (province = 'ฉะเชิงเทรา' or province = 'ชลบุรี' or province ='ระยอง')
    order by   ${parameter} desc`
    // limit 10
    eec.query(sql).then(r => {
        res.json({
            status: "rank sucess",
            data: r.rows
        })
    })
})



module.exports = app;