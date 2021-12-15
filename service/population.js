const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.get('/thpopulation/get/province/:p_code/:item', (req, res) => {
    const a = req.params.p_code;
    const b = req.params.item;
    let sql = `SELECT * from THpopulation where p_code='${a}'and dataitem_code ='${b}'`;
    eec.query(sql).then(r => {
        // console.log(r.rows)
        res.status(200).json({
            data: r.rows
        })
    })

})
app.get('/thpopulation/get/province/:p_code', (req, res) => {
    const a = req.params.p_code;
    const b = req.params.item;
    let sql = `SELECT * from THpopulation where p_code='${a}'`;
    eec.query(sql).then(r => {
        // console.log(r.rows)
        res.status(200).json({
            data: r.rows
        })
    })

})
app.get('/thpopulation/get/pcode', (req, res) => {
    eec.query(`SELECT DISTINCT p_code, p_name FROM thpopulation where not p_code='C'and not p_code='TH'and not p_code='NE'and not p_code='N'and not p_code='S' ORDER by p_name ASC`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})

app.get('/thpopulation/get/year/2563/:p_code', (req, res) => {
    let a = req.params.p_code;
    let sql = `SELECT P_code,P_name,dataitem_code,y2563,
    CASE WHEN dataitem_code = 'Pop_sum' THEN y2563 
    WHEN dataitem_code = 'Pop_men' THEN y2563
    WHEN dataitem_code = 'Pop_women' THEN y2563
    WHEN dataitem_code = 'area' THEN y2563
    WHEN dataitem_code = 'Pop_den' THEN y2563
    WHEN dataitem_code ='num_home' THEN y2563
    END Yvalue
    FROM THpopulation where p_code='${a}'`;
    eec.query(sql).then(r => {
        // console.log(r.rows)
        res.status(200).json({
            data: r.rows
        })
    })

})
app.get('/thpopulation/get/year/2562/:p_code', (req, res) => {
    let a = req.params.p_code;
    let sql = `SELECT P_code,P_name,dataitem_code,y2562,
    CASE WHEN dataitem_code = 'Pop_sum' THEN y2562 
    WHEN dataitem_code = 'Pop_men' THEN y2562
    WHEN dataitem_code = 'Pop_women' THEN y2562
    WHEN dataitem_code = 'area' THEN y2562
    WHEN dataitem_code = 'Pop_den' THEN y2562
    WHEN dataitem_code ='num_home' THEN y2562
    END Yvalue
    FROM THpopulation where p_code='${a}'`;
    eec.query(sql).then(r => {
        // console.log(r.rows)
        res.status(200).json({
            data: r.rows
        })
    })

})
app.get('/thpopulation/get/year/2561/:p_code', (req, res) => {
    let a = req.params.p_code;
    let sql = `SELECT P_code,P_name,dataitem_code,y2561,
    CASE WHEN dataitem_code = 'Pop_sum' THEN y2561 
    WHEN dataitem_code = 'Pop_men' THEN y2561
    WHEN dataitem_code = 'Pop_women' THEN y2561
    WHEN dataitem_code = 'area' THEN y2561
    WHEN dataitem_code = 'Pop_den' THEN y2561
    WHEN dataitem_code ='num_home' THEN y2561
    END Yvalue
    FROM THpopulation where p_code='${a}'`;
    eec.query(sql).then(r => {
        // console.log(r.rows)
        res.status(200).json({
            data: r.rows
        })
    })

})
app.get('/thpopulation/get/year/2560/:p_code', (req, res) => {
    let a = req.params.p_code;
    let sql = `SELECT P_code,P_name,dataitem_code,y2560,
    CASE WHEN dataitem_code = 'Pop_sum' THEN y2560 
    WHEN dataitem_code = 'Pop_men' THEN y2560
    WHEN dataitem_code = 'Pop_women' THEN y2560
    WHEN dataitem_code = 'area' THEN y2560
    WHEN dataitem_code = 'Pop_den' THEN y2560
    WHEN dataitem_code ='num_home' THEN y2560
    END Yvalue
    FROM THpopulation where p_code='${a}'`;
    eec.query(sql).then(r => {
        // console.log(r.rows)
        res.status(200).json({
            data: r.rows
        })
    })

})
app.get('/thpopulation/get/year/2559/:p_code', (req, res) => {
    let a = req.params.p_code;
    let sql = `SELECT P_code,P_name,dataitem_code,y2559,
    CASE WHEN dataitem_code = 'Pop_sum' THEN y2559 
    WHEN dataitem_code = 'Pop_men' THEN y2559
    WHEN dataitem_code = 'Pop_women' THEN y2559
    WHEN dataitem_code = 'area' THEN y2559
    WHEN dataitem_code = 'Pop_den' THEN y2559
    WHEN dataitem_code ='num_home' THEN y2559
    END Yvalue
    FROM THpopulation where p_code='${a}'`;
    eec.query(sql).then(r => {
        // console.log(r.rows)
        res.status(200).json({
            data: r.rows
        })
    })

})
app.get('/thpopulation/get/year/2558/:p_code', (req, res) => {
    let a = req.params.p_code;
    let sql = `SELECT P_code,P_name,dataitem_code,y2558,
    CASE WHEN dataitem_code = 'Pop_sum' THEN y2558 
    WHEN dataitem_code = 'Pop_men' THEN y2558
    WHEN dataitem_code = 'Pop_women' THEN y2558
    WHEN dataitem_code = 'area' THEN y2558
    WHEN dataitem_code = 'Pop_den' THEN y2558
    WHEN dataitem_code ='num_home' THEN y2558
    END Yvalue
    FROM THpopulation where p_code='${a}'`;
    eec.query(sql).then(r => {
        // console.log(r.rows)
        res.status(200).json({
            data: r.rows
        })
    })

})
app.get('/thpopulation/get/year/2557/:p_code', (req, res) => {
    let a = req.params.p_code;
    let sql = `SELECT P_code,P_name,dataitem_code,y2557,
    CASE WHEN dataitem_code = 'Pop_sum' THEN y2557 
    WHEN dataitem_code = 'Pop_men' THEN y2557
    WHEN dataitem_code = 'Pop_women' THEN y2557
    WHEN dataitem_code = 'area' THEN y2557
    WHEN dataitem_code = 'Pop_den' THEN y2557
    WHEN dataitem_code ='num_home' THEN y2557
    END Yvalue
    FROM THpopulation where p_code='${a}'`;
    eec.query(sql).then(r => {
        // console.log(r.rows)
        res.status(200).json({
            data: r.rows
        })
    })

})
app.get('/thpopulation/get/year/2556/:p_code', (req, res) => {
    let a = req.params.p_code;
    let sql = `SELECT P_code,P_name,dataitem_code,y2556,
    CASE WHEN dataitem_code = 'Pop_sum' THEN y2556 
    WHEN dataitem_code = 'Pop_men' THEN y2556
    WHEN dataitem_code = 'Pop_women' THEN y2556
    WHEN dataitem_code = 'area' THEN y2556
    WHEN dataitem_code = 'Pop_den' THEN y2556
    WHEN dataitem_code ='num_home' THEN y2556
    END Yvalue
    FROM THpopulation where p_code='${a}'`;
    eec.query(sql).then(r => {
        // console.log(r.rows)
        res.status(200).json({
            data: r.rows
        })
    })

})
app.get('/thpopulation/get/year/2555/:p_code', (req, res) => {
    let a = req.params.p_code;
    let sql = `SELECT P_code,P_name,dataitem_code,y2555,
    CASE WHEN dataitem_code = 'Pop_sum' THEN y2555 
    WHEN dataitem_code = 'Pop_men' THEN y2555
    WHEN dataitem_code = 'Pop_women' THEN y2555
    WHEN dataitem_code = 'area' THEN y2555
    WHEN dataitem_code = 'Pop_den' THEN y2555
    WHEN dataitem_code ='num_home' THEN y2555
    END Yvalue
    FROM THpopulation where p_code='${a}'`;
    eec.query(sql).then(r => {
        // console.log(r.rows)
        res.status(200).json({
            data: r.rows
        })
    })

})
app.get('/thpopulation/get/year/2554/:p_code', (req, res) => {
    let a = req.params.p_code;
    let sql = `SELECT P_code,P_name,dataitem_code,y2554,
    CASE WHEN dataitem_code = 'Pop_sum' THEN y2554 
    WHEN dataitem_code = 'Pop_men' THEN y2554
    WHEN dataitem_code = 'Pop_women' THEN y2554
    WHEN dataitem_code = 'area' THEN y2554
    WHEN dataitem_code = 'Pop_den' THEN y2554
    WHEN dataitem_code ='num_home' THEN y2554
    END Yvalue
    FROM THpopulation where p_code='${a}'`;
    eec.query(sql).then(r => {
        // console.log(r.rows)
        res.status(200).json({
            data: r.rows
        })
    })

})
module.exports = app;