const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post('/api/eatplant', function (req, res) {
    let { name, plant } = req.body
    console.log(req.body);
    let sql = `INSERT INTO Eat_plant(name, plant_name)VALUES(
        '${name}', '${plant}'
        )`
    eec.query(sql).then(r => {
        res.json({
            status: 'insert done!!'
        })
    })
})

app.post('/api/useplant', function (req, res) {
    let { name, plant } = req.body
    console.log(req.body);
    let sql = `INSERT INTO Use_plant(name, plant_name)VALUES(
        '${name}', '${plant}'
        )`
    eec.query(sql).then(r => {
        res.json({
            status: 'insert done!!'
        })
    })
})

app.post('/api/econplant', function (req, res) {
    let { name, plant } = req.body
    console.log(req.body);
    let sql = `INSERT INTO Econ_plant(name, plant_name)VALUES(
        '${name}', '${plant}'
        )`
    eec.query(sql).then(r => {
        res.json({
            status: 'insert done!!'
        })
    })
})

app.post('/api/herbplant', function (req, res) {
    let { name, plant } = req.body
    console.log(req.body);
    let sql = `INSERT INTO Herb_plant(name, plant_name)VALUES(
        '${name}', '${plant}'
        )`
    eec.query(sql).then(r => {
        res.json({
            status: 'insert done!!'
        })
    })
})


app.post('/api/family', function (req, res) {
    let { number, name, size, doc, geom, img } = req.body
    console.log(req.body);
    let sql = `INSERT INTO fam_detail(number, name, size, doc_type, geom,image)VALUES(
        '${number}', '${name}','${size}','${doc}',ST_GeomFromGeoJSON('${JSON.stringify(geom.geometry)}'),'${img}'
        )`
    eec.query(sql).then(r => {
        res.json({
            status: 'insert done!!'
        })
    })
})

app.post('/api/daily', function (req, res) {
    let { name, benefit, type, plant, amount, unit, price, date } = req.body
    console.log(req.body);
    let sql = `INSERT INTO dailyData(name, benefit, type, plant_name, amount,unit,price,date)VALUES(
        '${name}', '${benefit}','${type}','${plant}',${amount},'${unit}',${price},'${date}')
        `
    eec.query(sql).then(r => {
        res.json({
            status: 'insert done!!'
        })
    })
})

app.post('/api/getUse/:id', function (req, res) {
    let { id } = req.params
    let sql = `SELECT plant_name FROM use_plant where name ='${id}'`
    eec.query(sql).then(r => {
        res.json({
            status: "getdata",
            data: r.rows


        })
    })

})
app.post('/api/getEat/:id', function (req, res) {
    let { id } = req.params
    let sql = `SELECT plant_name FROM eat_plant where name ='${id}'`
    eec.query(sql).then(r => {
        res.json({
            status: "getdata",
            data: r.rows


        })
    })

})
app.post('/api/getEcon/:id', function (req, res) {
    let { id } = req.params
    let sql = `SELECT plant_name FROM econ_plant where name ='${id}'`
    eec.query(sql).then(r => {
        res.json({
            status: "getdata",
            data: r.rows


        })
    })

})
app.post('/api/getHerb/:id', function (req, res) {
    let { id } = req.params
    let sql = `SELECT plant_name FROM herb_plant where name ='${id}'`
    eec.query(sql).then(r => {
        res.json({
            status: "getdata",
            data: r.rows


        })
    })

})

app.post('/api/getDaily/:id', function (req, res) {
    let { id } = req.params
    let sql = `SELECT * FROM dailydata where name ='${id}'`
    eec.query(sql).then(r => {
        res.json({
            status: "getdata",
            data: r.rows


        })
    })

})








module.exports = app;