const express = require('express');
const app = express.Router();
// const con = require("./db");
// const th = con.th;
// const ac = con.ac;


// app.get('/acc-api/get', (req, res, next) => {
//     const sql = `SELECT *, to_char(acc_date, 'DD TMMonth YYYY') as accdate FROM accident ORDER BY gid desc`;
//     ac.query(sql).then((data) => {
//         res.send(JSON.stringify({
//             data: data.rows
//         }));
//     }).catch((err) => {
//         return next(err);
//     })
// });

module.exports = app;