const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;


app.post("/projmon2-api/getdata", (req, res) => {
    const { org, typ } = req.body;
    // console.log(org, typ);
    if (typ == 'admin') {
        const sql = `SELECT *, ST_AsGeojson(geom) as geojson 
        FROM eecprj_mon_phase2 ORDER BY prj_cate ASC`
        eec.query(sql).then(r => {
            res.status(200).json({
                data: r.rows
            })
        })
    } else if (typ == 'editor') {
        const sql = `SELECT *, ST_AsGeojson(geom) as geojson 
        FROM eecprj_mon_phase2 WHERE prj_operat='${org}' ORDER BY prj_cate ASC`
        eec.query(sql).then(r => {
            res.status(200).json({
                data: r.rows
            })
        })
    }
})

app.post("/projmon2-api/prj_cate", (req, res) => {
    const sql = `SELECT DISTINCT prj_cate FROM eecprj_mon_phase2`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon2-api/prj_mac", (req, res) => {
    const { prj_cate } = req.body;
    const sql = `SELECT DISTINCT prj_mac FROM eecprj_mon_phase2 
                WHERE prj_cate='${prj_cate}' ORDER BY prj_mac ASC`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon2-api/prj_plan", (req, res) => {
    const { prj_mac } = req.body;
    const sql = `SELECT DISTINCT prj_plan FROM eecprj_mon_phase2 
                WHERE prj_mac='${prj_mac}' ORDER BY prj_plan ASC`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon2-api/prj_name", (req, res) => {
    const { prj_plan } = req.body;
    const sql = `SELECT prj_name FROM eecprj_mon_phase2 
                WHERE prj_plan='${prj_plan}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon2-api/prj_detail", (req, res) => {
    const { prj_name } = req.body;
    const sql = `SELECT plan_65,plan_66,plan_67,plan_68,plan_69,plan_70,budget,prj_operat,prj_suboperat 
                FROM eecprj_mon_phase2 
                WHERE prj_name='${prj_name}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

// app.post("/projmon2-api/getallproj", (req, res) => {
//     const { uid, type } = req.body;
//     console.log(uid, type);
//     let sql = `SELECT * FROM eecprj_mon_phase2`;
//     eec.query(sql).then(r => {
//         res.status(200).json({
//             data: r.rows
//         })
//     })
// })

app.post("/projmon2-api/getuserproj", (req, res) => {
    const { prj_operat } = req.body;
    let sql;

    if (prj_operat !== "admin") {
        sql = `SELECT r.*, u.prj_operat FROM eecprj_mon_phase2 r
                INNER JOIN (SELECT * FROM eecprj_mon_phase2_user WHERE prj_operat='${prj_operat}') u
                ON r.prj_id = u.prj_id`
    } else {
        sql = `SELECT r.*, u.prj_operat FROM eecprj_mon_phase2 r
                INNER JOIN (SELECT * FROM eecprj_mon_phase2_user WHERE prj_operat='${prj_operat}') u
                ON r.prj_id = u.prj_id`
    }
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon2-api/getuserproj", (req, res) => {
    const { prj_operat } = req.body;
    let sql = `SELECT r.*, u.prj_operat FROM eecprj_mon_phase2 r
                INNER JOIN (SELECT * FROM eecprj_mon_phase2_user WHERE prj_operat='${prj_operat}') u
                ON r.prj_id = u.prj_id`

    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon2-api/getdetail", (req, res) => {
    const { gid } = req.body;
    let sql = `SELECT * FROM eecprj_mon_phase2 WHERE gid='${gid}'`

    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon2-api/updatedata", async (req, res) => {
    const { data } = req.body;
    for (let d in data) {
        if (data[d] !== '' && d !== 'geom' && d !== "gid") {
            let sql = `UPDATE eecprj_mon_phase2 SET ${d}='${data[d]}' WHERE gid='${data.gid}'`
            await eec.query(sql)
        }
    }
    if (data.geom !== "") {
        let sql = `UPDATE eecprj_mon_phase2 
                    SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}')
                    WHERE gid='${data.gid}'`
        await eec.query(sql)
    } else {
        let sql = `UPDATE eecprj_mon_phase2 
                    SET geom=NULL
                    WHERE gid='${data.gid}'`
        await eec.query(sql)
    }
    res.status(200).json({
        data: "success"
    })
})

app.get("/projmon2-api/getuser", async (req, res) => {
    let sql = "select distinct prj_operat from eecprj_mon_phase2_user"
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})


app.post("/projmon2-api/getallproj_new", (req, res) => {
    const { uid, typ } = req.body;
    if (typ == "admin") {
        sql = `SELECT * FROM eecprj_mon_phase2new`;
        eec.query(sql).then(r => {
            res.status(200).json({
                data: r.rows
            })
        })
    } else if (typ == "editor") {
        let sql = `SELECT assign FROM eecprj_user WHERE uid='${uid}'`;
        let selRow = ''
        eec.query(sql).then(r => {
            r.rows[0].assign.map((i, j) => {
                j < r.rows[0].assign.length - 1 ? selRow += `pid='${i}' OR ` : selRow += `pid='${i}'`
            })

            let sql2 = `SELECT * FROM eecprj_mon_phase2new WHERE ${selRow}`;
            eec.query(sql2).then(x => {
                res.status(200).json({
                    data: x.rows
                })
            })
        })
    }

})

app.post("/projmon2-api/getdetail_new", (req, res) => {
    const { pid } = req.body;
    let sql = `SELECT *, ST_AsGeojson(geom) as geojson FROM eecprj_mon_phase2new WHERE pid='${pid}'`

    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/projmon2-api/insertdata_new", async (req, res) => {
    const { data } = req.body;
    let pid = Date.now()
    await eec.query(`INSERT INTO eecprj_mon_phase2new (pid, dt)VALUES('${pid}',now())`)
    // console.log(sqlid);
    for (let d in data) {
        if (data[d] !== '' && d !== 'geom' && d !== "pid") {
            let sql = `UPDATE eecprj_mon_phase2new SET ${d}='${data[d]}' WHERE pid='${pid}'`
            await eec.query(sql);
        }
    }

    if (data.geom !== "") {
        let sql = `UPDATE eecprj_mon_phase2new 
                    SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}')
                    WHERE pid='${pid}'`;
        await eec.query(sql);
    } else {
        let sql = `UPDATE eecprj_mon_phase2new 
                    SET geom=NULL
                    WHERE pid='${pid}'`
        console.log(sql);
        await eec.query(sql)
    }

    res.status(200).json({
        data: "success"
    })
})

app.post("/projmon2-api/updatedata_new", async (req, res) => {
    const { data } = req.body;
    for (let d in data) {
        if (data[d] !== '' && d !== 'geom' && d !== "pid") {
            let sql = `UPDATE eecprj_mon_phase2new SET ${d}='${data[d]}' WHERE pid='${data.pid}'`
            await eec.query(sql);
            console.log(sql);
        }
    }
    if (data.geom !== "") {
        let sql = `UPDATE eecprj_mon_phase2new 
                    SET geom=ST_GeomfromGeoJSON('${JSON.stringify(data.geom.geometry)}')
                    WHERE pid='${data.pid}'`;
        await eec.query(sql);
    } else {
        let sql = `UPDATE eecprj_mon_phase2new 
                    SET geom=NULL
                    WHERE pid='${data.pid}'`;
        await eec.query(sql);
    }
    res.status(200).json({
        data: "success"
    })
})

app.post("/projmon2-api/delete_new", (req, res) => {
    const { pid } = req.body;
    // console.log(pid);
    const sql = `DELETE FROM eecprj_mon_phase2new WHERE pid='${pid}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})



module.exports = app;