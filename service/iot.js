const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;
const iot = con.iot;

app.get("/eec-api/iot-get", (req, res) => {
    const { val } = req.params
    const sql = `SELECT * FROM iotwatlev ORDER BY ts DESC limit 10`;
    iot.query(sql).then((r) => {
        res.status(200).json({
            data: r.rows
        });
    });
})

app.post("/eec-api/iot-get-iotdata", (req, res) => {
    const { limit } = req.body
    console.log(limit);
    const sql = `SELECT * FROM iotdata ORDER BY gid DESC limit ${limit}`;
    iot.query(sql).then((r) => {
        res.status(200).json({
            data: r.rows
        });
    });
})

app.post("/eec-api/iot-insert", (req, res) => {
    const { val1, stname, token } = req.body
    console.log(val1, stname, token)
    const tokenServer = 'ZWVjSW9UYnlFbkdSSURzU3RhdGlvbjE='
    if (token == tokenServer) {
        const sql = `INSERT INTO iotwatlev(val1, sta, ts)VALUES('${val1}','${stname}',now())`;
        iot.query(sql).then((r) => {
            res.status(200).json({
                status: "insert ok"
            });
        });
    }
})

app.post("/eec-api/iot-data", (req, res) => {
    const { sta, val, param, val1, param1, val2, param2, token } = req.body
    console.log(sta, val, param, val1, param1, val2, param2, token)
    const tokenServer = 'ZWVjSW9UYnlFbkdSSURzU3RhdGlvbjE='
    if (token == tokenServer) {
        const sql = `INSERT INTO iotdata(sta, val, param, val1, param1, val2, param2, ts)VALUES('${sta}', '${val}', '${param}', '${val1}', '${param1}', '${val2}', '${param2}',now())`;
        iot.query(sql).then((r) => {
            res.status(200).json({
                status: "insert ok"
            });
        });
    }
})

app.get("/eec-api/iot-data-bytype/:type", (req, res) => {
    const type = req.params.type
    // console.log(type);
    const sql = `SELECT ${type} as val, extract(epoch from ts) as ts FROM iotwatlev ORDER BY ts DESC limit 1`;
    iot.query(sql).then((r) => {
        res.status(200).json({
            data: r.rows
        });
    });
})

app.get("/eec-api/iot-data-bytype-last20/:type", (req, res) => {
    const type = req.params.type
    // console.log(type);
    const sql = `SELECT ${type} as val, extract(epoch from ts) as ts FROM iotwatlev ORDER BY ts DESC limit 10`;
    iot.query(sql).then((r) => {
        res.status(200).json({
            data: r.rows
        });
    });
})

app.post("/eec-api/test", (req, res) => {
    const { stname, deep, humidity, temperature, token } = req.body
    console.log(stname, deep, humidity, temperature, token, "daa")
    const tokenServer = 'ZWVjSW9UYnlFbkdSSURzU3RhdGlvbjE=';



    // if (token == tokenServer) {
    //     const sql = `INSERT INTO iotdata(sta, val, param, val1, param1, val2, param2, ts)VALUES('${sta}', '${val}', '${param}', '${val1}', '${param1}', '${val2}', '${param2}',now())`;
    //     iot.query(sql).then((r) => {
    //         res.status(200).json({
    //             status: "insert ok"
    //         });
    //     });
    // }
})

// token generate
// console.log(Buffer.from("eecIoTbyEnGRIDsStation1").toString('base64'))
// console.log(Buffer.from("c2FrZGFob21odWFu", 'base64').toString())
module.exports = app;