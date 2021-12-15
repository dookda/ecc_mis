const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

app.post("/forecast_eec/getdata/", async (req, res) => {
    let sql = `select * from forecast_eec ORDER by gid`
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})

//1
app.post("/forecast_eec/pop/data", async (req, res) => {
    let sql = `select * from fc_pop  ORDER by gid`
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/pop/year', (req, res) => {
    const { code } = req.body;
    eec.query(`SELECT DISTINCT y_year FROM fc_pop where title_c='${code}' ORDER by y_year asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/pop/type', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_pop where title_c IS NOT NULL order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/pop/unit', (req, res) => {
    const { code } = req.body;
    eec.query(`select DISTINCT unit_n from fc_pop where title_c='${code}'`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/forecast_eec/pop/save", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO fc_pop (id_data) VALUES ('${x.id_data}');`
        // console.log(y)
        await eec.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'id_data') {
                let sql = `UPDATE fc_pop SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })
})
app.post("/forecast_eec/pop/Tdata", async (req, res) => {
    const { title_c } = req.body;
    console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select * from fc_pop where id_data IS NOT NULL order by gid desc`
    } else {
        sql = `select * from fc_pop where title_c ='${title_c}'and id_data IS NOT NULL order by gid desc`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post('/forecast_eec/pop/Ttype', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_pop where title_c IS NOT NULL and id_data IS NOT NULL order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/forecast_eec/pop/Tyear", async (req, res) => {
    const { title_c } = req.body;
    // console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select distinct y_year from fc_pop where title_c IS NOT NULL and id_data IS NOT NULL order by y_year ASC`
    } else {
        sql = `select distinct y_year from fc_pop where title_c ='${title_c}' and id_data IS NOT NULL order by y_year ASC`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post("/forecast_eec/pop/update", async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    data.map(async (x) => {
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'type' && d !== 'id_data') {
                let sql = `UPDATE fc_pop SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })

})
app.post("/forecast_eec/pop/delete", (req, res) => {
    const data = req.body;
    let id_data = data.id_data
    let sql = `DELETE FROM fc_pop WHERE id_data = '${id_data}'`;
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

//2
app.post("/forecast_eec/pop_covid/data", async (req, res) => {
    let sql = `select * from fc_pop_covid ORDER by gid`
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/pop_covid/year', (req, res) => {
    const { code } = req.body;
    eec.query(`SELECT DISTINCT y_year FROM fc_pop_covid where title_c='${code}' ORDER by y_year asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/pop_covid/type', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_pop_covid order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/pop_covid/unit', (req, res) => {
    const { code } = req.body;
    eec.query(`select DISTINCT unit_n from fc_pop_covid where title_c='${code}'`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/forecast_eec/pop_covid/save", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO fc_pop_covid (id_data) VALUES ('${x.id_data}');`
        // console.log(y)
        await eec.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'id_data') {
                let sql = `UPDATE fc_pop_covid SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })
})
app.post("/forecast_eec/pop_covid/Tdata", async (req, res) => {
    const { title_c } = req.body;
    console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select * from fc_pop_covid where id_data IS NOT NULL order by gid desc`
    } else {
        sql = `select * from fc_pop_covid where title_c ='${title_c}'and id_data IS NOT NULL order by gid desc`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post('/forecast_eec/pop_covid/Ttype', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_pop_covid where title_c IS NOT NULL and id_data IS NOT NULL order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/forecast_eec/pop_covid/Tyear", async (req, res) => {
    const { title_c } = req.body;
    // console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select distinct y_year from fc_pop_covid where title_c IS NOT NULL and id_data IS NOT NULL order by y_year ASC`
    } else {
        sql = `select distinct y_year from fc_pop_covid where title_c ='${title_c}' and id_data IS NOT NULL order by y_year ASC`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post("/forecast_eec/pop_covid/update", async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    data.map(async (x) => {
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'type' && d !== 'id_data') {
                let sql = `UPDATE fc_pop_covid SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })

})
app.post("/forecast_eec/pop_covid/delete", (req, res) => {
    const data = req.body;
    let id_data = data.id_data
    let sql = `DELETE FROM fc_pop_covid WHERE id_data = '${id_data}'`;
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})
//3
app.post("/forecast_eec/labor/data", async (req, res) => {
    let sql = `select * from fc_labor ORDER by gid`
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/labor/year', (req, res) => {
    const { code } = req.body;
    eec.query(`SELECT DISTINCT y_year FROM fc_labor where title_c='${code}' ORDER by y_year asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/labor/type', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_labor order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/labor/unit', (req, res) => {
    const { code } = req.body;
    eec.query(`select DISTINCT unit_n from fc_labor where title_c='${code}'`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/forecast_eec/labor/save", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO fc_labor (id_data) VALUES ('${x.id_data}');`
        // console.log(y)
        await eec.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'id_data') {
                let sql = `UPDATE fc_labor SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })
})
app.post("/forecast_eec/labor/Tdata", async (req, res) => {
    const { title_c } = req.body;
    console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select * from fc_labor where id_data IS NOT NULL order by gid desc`
    } else {
        sql = `select * from fc_labor where title_c ='${title_c}'and id_data IS NOT NULL order by gid desc`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post('/forecast_eec/labor/Ttype', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_labor where title_c IS NOT NULL and id_data IS NOT NULL order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/forecast_eec/labor/Tyear", async (req, res) => {
    const { title_c } = req.body;
    // console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select distinct y_year from fc_labor where title_c IS NOT NULL and id_data IS NOT NULL order by y_year ASC`
    } else {
        sql = `select distinct y_year from fc_labor where title_c ='${title_c}' and id_data IS NOT NULL order by y_year ASC`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post("/forecast_eec/labor/update", async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    data.map(async (x) => {
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'type' && d !== 'id_data') {
                let sql = `UPDATE fc_labor SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })

})
app.post("/forecast_eec/labor/delete", (req, res) => {
    const data = req.body;
    let id_data = data.id_data
    let sql = `DELETE FROM fc_labor WHERE id_data = '${id_data}'`;
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})
//4
app.post("/forecast_eec/labor_edulevel/data", async (req, res) => {
    let sql = `select * from fc_labor_edulevel ORDER by gid`
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/labor_edulevel/year', (req, res) => {
    const { code } = req.body;
    eec.query(`SELECT DISTINCT y_year FROM fc_labor_edulevel where title_c='${code}' ORDER by y_year asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/labor_edulevel/years', (req, res) => {
    const { code } = req.body;
    eec.query(`SELECT DISTINCT y_year FROM fc_labor_edulevel ORDER by y_year asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/labor_edulevel/type', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_labor_edulevel order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/labor_edulevel/unit', (req, res) => {
    const { code } = req.body;
    eec.query(`select DISTINCT unit_n from fc_labor_edulevel where title_c='${code}'`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/forecast_eec/labor_edulevel/save", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO fc_labor_edulevel (id_data) VALUES ('${x.id_data}');`
        // console.log(y)
        await eec.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'id_data') {
                let sql = `UPDATE fc_labor_edulevel SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })
})
app.post("/forecast_eec/labor_edulevel/Tdata", async (req, res) => {
    const { title_c } = req.body;
    console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select * from fc_labor_edulevel where id_data IS NOT NULL order by gid desc`
    } else {
        sql = `select * from fc_labor_edulevel where title_c ='${title_c}'and id_data IS NOT NULL order by gid desc`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post('/forecast_eec/labor_edulevel/Ttype', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_labor_edulevel where title_c IS NOT NULL and id_data IS NOT NULL order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/forecast_eec/labor_edulevel/Tyear", async (req, res) => {
    const { title_c } = req.body;
    // console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select distinct y_year from fc_labor_edulevel where title_c IS NOT NULL and id_data IS NOT NULL order by y_year ASC`
    } else {
        sql = `select distinct y_year from fc_labor_edulevel where title_c ='${title_c}' and id_data IS NOT NULL order by y_year ASC`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post("/forecast_eec/labor_edulevel/update", async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    data.map(async (x) => {
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'type' && d !== 'id_data') {
                let sql = `UPDATE fc_labor_edulevel SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })

})
app.post("/forecast_eec/labor_edulevel/delete", (req, res) => {
    const data = req.body;
    let id_data = data.id_data
    let sql = `DELETE FROM fc_labor_edulevel WHERE id_data = '${id_data}'`;
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

//5
app.post("/forecast_eec/econ/data", async (req, res) => {
    let sql = `select * from fc_econ ORDER by gid`
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/econ/year', (req, res) => {
    const { code } = req.body;
    eec.query(`SELECT DISTINCT y_year FROM fc_econ where title_c='${code}' ORDER by y_year asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/econ/type', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_econ order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/econ/unit', (req, res) => {
    const { code } = req.body;
    eec.query(`select DISTINCT unit_n from fc_econ where title_c='${code}'`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/forecast_eec/econ/save", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO fc_econ (id_data) VALUES ('${x.id_data}');`
        // console.log(y)
        await eec.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'id_data') {
                let sql = `UPDATE fc_econ SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })
})
app.post("/forecast_eec/econ/Tdata", async (req, res) => {
    const { title_c } = req.body;
    console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select * from fc_econ where id_data IS NOT NULL order by gid desc`
    } else {
        sql = `select * from fc_econ where title_c ='${title_c}'and id_data IS NOT NULL order by gid desc`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post('/forecast_eec/econ/Ttype', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_econ where title_c IS NOT NULL and id_data IS NOT NULL order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/forecast_eec/econ/Tyear", async (req, res) => {
    const { title_c } = req.body;
    // console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select distinct y_year from fc_econ where title_c IS NOT NULL and id_data IS NOT NULL order by y_year ASC`
    } else {
        sql = `select distinct y_year from fc_econ where title_c ='${title_c}' and id_data IS NOT NULL order by y_year ASC`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post("/forecast_eec/econ/update", async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    data.map(async (x) => {
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'type' && d !== 'id_data') {
                let sql = `UPDATE fc_econ SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })

})
app.post("/forecast_eec/econ/delete", (req, res) => {
    const data = req.body;
    let id_data = data.id_data
    let sql = `DELETE FROM fc_econ WHERE id_data = '${id_data}'`;
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})
//6
app.post("/forecast_eec/elec_demand/data", async (req, res) => {
    let sql = `select * from fc_elec_demand ORDER by gid`
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/elec_demand/year', (req, res) => {
    const { code } = req.body;
    eec.query(`SELECT DISTINCT y_year FROM fc_elec_demand where title_c='${code}' ORDER by y_year asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/elec_demand/type', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_elec_demand order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/elec_demand/unit', (req, res) => {
    const { code } = req.body;
    eec.query(`select DISTINCT unit_n from fc_elec_demand where title_c='${code}'`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/forecast_eec/elec_demand/save", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO fc_elec_demand (id_data) VALUES ('${x.id_data}');`
        // console.log(y)
        await eec.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'id_data') {
                let sql = `UPDATE fc_elec_demand SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })
})
app.post("/forecast_eec/elec_demand/Tdata", async (req, res) => {
    const { title_c } = req.body;
    console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select * from fc_elec_demand where id_data IS NOT NULL order by gid desc`
    } else {
        sql = `select * from fc_elec_demand where title_c ='${title_c}'and id_data IS NOT NULL order by gid desc`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post('/forecast_eec/elec_demand/Ttype', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_elec_demand where title_c IS NOT NULL and id_data IS NOT NULL order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/forecast_eec/elec_demand/Tyear", async (req, res) => {
    const { title_c } = req.body;
    // console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select distinct y_year from fc_elec_demand where title_c IS NOT NULL and id_data IS NOT NULL order by y_year ASC`
    } else {
        sql = `select distinct y_year from fc_elec_demand where title_c ='${title_c}' and id_data IS NOT NULL order by y_year ASC`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post("/forecast_eec/elec_demand/update", async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    data.map(async (x) => {
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'type' && d !== 'id_data') {
                let sql = `UPDATE fc_elec_demand SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })

})
app.post("/forecast_eec/elec_demand/delete", (req, res) => {
    const data = req.body;
    let id_data = data.id_data
    let sql = `DELETE FROM fc_elec_demand WHERE id_data = '${id_data}'`;
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})
//7
app.post("/forecast_eec/wastewater/data", async (req, res) => {
    let sql = `select * from fc_wastewater ORDER by gid`
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/wastewater/year', (req, res) => {
    const { code } = req.body;
    eec.query(`SELECT DISTINCT y_year FROM fc_wastewater where title_c='${code}' ORDER by y_year asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/wastewater/type', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_wastewater order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/wastewater/unit', (req, res) => {
    const { code } = req.body;
    eec.query(`select DISTINCT unit_n from fc_wastewater where title_c='${code}'`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/forecast_eec/wastewater/save", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO fc_wastewater (id_data) VALUES ('${x.id_data}');`
        // console.log(y)
        await eec.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'id_data') {
                let sql = `UPDATE fc_wastewater SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })
})
app.post("/forecast_eec/wastewater/Tdata", async (req, res) => {
    const { title_c } = req.body;
    console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select * from fc_wastewater where id_data IS NOT NULL order by gid desc`
    } else {
        sql = `select * from fc_wastewater where title_c ='${title_c}'and id_data IS NOT NULL order by gid desc`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post('/forecast_eec/wastewater/Ttype', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_wastewater where title_c IS NOT NULL and id_data IS NOT NULL order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/forecast_eec/wastewater/Tyear", async (req, res) => {
    const { title_c } = req.body;
    // console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select distinct y_year from fc_wastewater where title_c IS NOT NULL and id_data IS NOT NULL order by y_year ASC`
    } else {
        sql = `select distinct y_year from fc_wastewater where title_c ='${title_c}' and id_data IS NOT NULL order by y_year ASC`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post("/forecast_eec/wastewater/update", async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    data.map(async (x) => {
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'type' && d !== 'id_data') {
                let sql = `UPDATE fc_wastewater SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })

})
app.post("/forecast_eec/wastewater/delete", (req, res) => {
    const data = req.body;
    let id_data = data.id_data
    let sql = `DELETE FROM fc_wastewater WHERE id_data = '${id_data}'`;
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})
//8
app.post("/forecast_eec/garbage/data", async (req, res) => {
    let sql = `select * from fc_garbage ORDER by gid`
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/garbage/year', (req, res) => {
    const { code } = req.body;
    eec.query(`SELECT DISTINCT y_year FROM fc_garbage where title_c='${code}' ORDER by y_year asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/garbage/type', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_garbage order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/garbage/unit', (req, res) => {
    const { code } = req.body;
    eec.query(`select DISTINCT unit_n from fc_garbage where title_c='${code}'`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/forecast_eec/garbage/save", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO fc_garbage (id_data) VALUES ('${x.id_data}');`
        // console.log(y)
        await eec.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'id_data') {
                let sql = `UPDATE fc_garbage SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })
})
app.post("/forecast_eec/garbage/Tdata", async (req, res) => {
    const { title_c } = req.body;
    console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select * from fc_garbage where id_data IS NOT NULL order by gid desc`
    } else {
        sql = `select * from fc_garbage where title_c ='${title_c}'and id_data IS NOT NULL order by gid desc`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post('/forecast_eec/garbage/Ttype', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_garbage where title_c IS NOT NULL and id_data IS NOT NULL order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/forecast_eec/garbage/Tyear", async (req, res) => {
    const { title_c } = req.body;
    // console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select distinct y_year from fc_garbage where title_c IS NOT NULL and id_data IS NOT NULL order by y_year ASC`
    } else {
        sql = `select distinct y_year from fc_garbage where title_c ='${title_c}' and id_data IS NOT NULL order by y_year ASC`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post("/forecast_eec/garbage/update", async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    data.map(async (x) => {
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'type' && d !== 'id_data') {
                let sql = `UPDATE fc_garbage SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })

})
app.post("/forecast_eec/garbage/delete", (req, res) => {
    const data = req.body;
    let id_data = data.id_data
    let sql = `DELETE FROM fc_garbage WHERE id_data = '${id_data}'`;
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})
//9
app.post("/forecast_eec/water_demand/data", async (req, res) => {
    let sql = `select * from fc_water_demand ORDER by gid`
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/water_demand/year', (req, res) => {
    const { code } = req.body;
    eec.query(`SELECT DISTINCT y_year FROM fc_water_demand where title_c='${code}' ORDER by y_year asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/water_demand/type', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_water_demand order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/water_demand/unit', (req, res) => {
    const { code } = req.body;
    eec.query(`select DISTINCT unit_n from fc_water_demand where title_c='${code}'`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/forecast_eec/water_demand/save", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO fc_water_demand (id_data) VALUES ('${x.id_data}');`
        // console.log(y)
        await eec.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'id_data') {
                let sql = `UPDATE fc_water_demand SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })
})
app.post("/forecast_eec/water_demand/Tdata", async (req, res) => {
    const { title_c } = req.body;
    console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select * from fc_water_demand where id_data IS NOT NULL order by gid desc`
    } else {
        sql = `select * from fc_water_demand where title_c ='${title_c}'and id_data IS NOT NULL order by gid desc`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post('/forecast_eec/water_demand/Ttype', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_water_demand where title_c IS NOT NULL and id_data IS NOT NULL order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/forecast_eec/water_demand/Tyear", async (req, res) => {
    const { title_c } = req.body;
    // console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select distinct y_year from fc_water_demand where title_c IS NOT NULL and id_data IS NOT NULL order by y_year ASC`
    } else {
        sql = `select distinct y_year from fc_water_demand where title_c ='${title_c}' and id_data IS NOT NULL order by y_year ASC`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post("/forecast_eec/water_demand/update", async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    data.map(async (x) => {
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'type' && d !== 'id_data') {
                let sql = `UPDATE fc_water_demand SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })

})
app.post("/forecast_eec/water_demand/delete", (req, res) => {
    const data = req.body;
    let id_data = data.id_data
    let sql = `DELETE FROM fc_water_demand WHERE id_data = '${id_data}'`;
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})
//10
app.post("/forecast_eec/untreated_water/data", async (req, res) => {
    let sql = `select * from fc_untreated_water ORDER by gid`
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/untreated_water/year', (req, res) => {
    const { code } = req.body;
    eec.query(`SELECT DISTINCT y_year FROM fc_untreated_water where title_c='${code}' ORDER by y_year asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/untreated_water/type', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_untreated_water order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/untreated_water/unit', (req, res) => {
    const { code } = req.body;
    eec.query(`select DISTINCT unit_n from fc_untreated_water where title_c='${code}'`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/forecast_eec/untreated_water/save", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO fc_untreated_water (id_data) VALUES ('${x.id_data}');`
        // console.log(y)
        await eec.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'id_data') {
                let sql = `UPDATE fc_untreated_water SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })
})
app.post("/forecast_eec/untreated_water/Tdata", async (req, res) => {
    const { title_c } = req.body;
    console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select * from fc_untreated_water where id_data IS NOT NULL order by gid desc`
    } else {
        sql = `select * from fc_untreated_water where title_c ='${title_c}'and id_data IS NOT NULL order by gid desc`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post('/forecast_eec/untreated_water/Ttype', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_untreated_water where title_c IS NOT NULL and id_data IS NOT NULL order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/forecast_eec/untreated_water/Tyear", async (req, res) => {
    const { title_c } = req.body;
    // console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select distinct y_year from fc_untreated_water where title_c IS NOT NULL and id_data IS NOT NULL order by y_year ASC`
    } else {
        sql = `select distinct y_year from fc_untreated_water where title_c ='${title_c}' and id_data IS NOT NULL order by y_year ASC`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post("/forecast_eec/untreated_water/update", async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    data.map(async (x) => {
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'type' && d !== 'id_data') {
                let sql = `UPDATE fc_untreated_water SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })

})
app.post("/forecast_eec/untreated_water/delete", (req, res) => {
    const data = req.body;
    let id_data = data.id_data
    let sql = `DELETE FROM fc_untreated_water WHERE id_data = '${id_data}'`;
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})
//11
app.post("/forecast_eec/waste_raffle/data", async (req, res) => {
    let sql = `select * from fc_waste_raffle ORDER by gid`
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/waste_raffle/year', (req, res) => {
    const { code } = req.body;
    eec.query(`SELECT DISTINCT y_year FROM fc_waste_raffle where title_c='${code}' ORDER by y_year asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/waste_raffle/type', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_waste_raffle order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/waste_raffle/unit', (req, res) => {
    const { code } = req.body;
    eec.query(`select DISTINCT unit_n from fc_waste_raffle where title_c='${code}'`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/forecast_eec/waste_raffle/save", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO fc_waste_raffle (id_data) VALUES ('${x.id_data}');`
        // console.log(y)
        await eec.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'id_data') {
                let sql = `UPDATE fc_waste_raffle SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })
})
app.post("/forecast_eec/waste_raffle/Tdata", async (req, res) => {
    const { title_c } = req.body;
    console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select * from fc_waste_raffle where id_data IS NOT NULL order by gid desc`
    } else {
        sql = `select * from fc_waste_raffle where title_c ='${title_c}'and id_data IS NOT NULL order by gid desc`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post('/forecast_eec/waste_raffle/Ttype', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_waste_raffle where title_c IS NOT NULL and id_data IS NOT NULL order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/forecast_eec/waste_raffle/Tyear", async (req, res) => {
    const { title_c } = req.body;
    // console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select distinct y_year from fc_waste_raffle where title_c IS NOT NULL and id_data IS NOT NULL order by y_year ASC`
    } else {
        sql = `select distinct y_year from fc_waste_raffle where title_c ='${title_c}' and id_data IS NOT NULL order by y_year ASC`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post("/forecast_eec/waste_raffle/update", async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    data.map(async (x) => {
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'type' && d !== 'id_data') {
                let sql = `UPDATE fc_waste_raffle SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })

})
app.post("/forecast_eec/waste_raffle/delete", (req, res) => {
    const data = req.body;
    let id_data = data.id_data
    let sql = `DELETE FROM fc_waste_raffle WHERE id_data = '${id_data}'`;
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})
//12//////////////////////////////////////////////////////////////
app.post("/forecast_eec/greenhouse_gas/data", async (req, res) => {
    let sql = `select * from fc_greenhouse_gas ORDER by gid`
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/greenhouse_gas/year', (req, res) => {
    const { code } = req.body;
    eec.query(`SELECT DISTINCT y_year FROM fc_greenhouse_gas where title_c='${code}' ORDER by y_year asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/greenhouse_gas/type', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_greenhouse_gas order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/greenhouse_gas/unit', (req, res) => {
    const { code } = req.body;
    eec.query(`select DISTINCT unit_n from fc_greenhouse_gas where title_c='${code}'`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/forecast_eec/greenhouse_gas/save", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO fc_greenhouse_gas (id_data) VALUES ('${x.id_data}');`
        // console.log(y)
        await eec.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'id_data') {
                let sql = `UPDATE fc_greenhouse_gas SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })
})
app.post("/forecast_eec/greenhouse_gas/Tdata", async (req, res) => {
    const { title_c } = req.body;
    console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select * from fc_greenhouse_gas where id_data IS NOT NULL order by gid desc`
    } else {
        sql = `select * from fc_greenhouse_gas where title_c ='${title_c}'and id_data IS NOT NULL order by gid desc`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post('/forecast_eec/greenhouse_gas/Ttype', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_greenhouse_gas where title_c IS NOT NULL and id_data IS NOT NULL order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/forecast_eec/greenhouse_gas/Tyear", async (req, res) => {
    const { title_c } = req.body;
    // console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select distinct y_year from fc_greenhouse_gas where title_c IS NOT NULL and id_data IS NOT NULL order by y_year ASC`
    } else {
        sql = `select distinct y_year from fc_greenhouse_gas where title_c ='${title_c}' and id_data IS NOT NULL order by y_year ASC`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post("/forecast_eec/greenhouse_gas/update", async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    data.map(async (x) => {
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'type' && d !== 'id_data') {
                let sql = `UPDATE fc_greenhouse_gas SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })

})
app.post("/forecast_eec/greenhouse_gas/delete", (req, res) => {
    const data = req.body;
    let id_data = data.id_data
    let sql = `DELETE FROM fc_greenhouse_gas WHERE id_data = '${id_data}'`;
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})
//13///////////////////////////////////////////////////////////
app.post("/forecast_eec/landuse/data", async (req, res) => {
    let sql = `select * from fc_landuse ORDER by gid`
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/landuse/year', (req, res) => {
    const { code } = req.body;
    eec.query(`SELECT DISTINCT y_year FROM fc_landuse where title_c='${code}' ORDER by y_year asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/landuse/type', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_landuse order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/landuse/unit', (req, res) => {
    const { code } = req.body;
    eec.query(`select DISTINCT unit_n from fc_landuse where title_c='${code}'`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/forecast_eec/landuse/save", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO fc_landuse (id_data) VALUES ('${x.id_data}');`
        // console.log(y)
        await eec.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'id_data') {
                let sql = `UPDATE fc_landuse SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })
})
app.post("/forecast_eec/landuse/Tdata", async (req, res) => {
    const { title_c } = req.body;
    console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select * from fc_landuse where id_data IS NOT NULL order by gid desc`
    } else {
        sql = `select * from fc_landuse where title_c ='${title_c}'and id_data IS NOT NULL order by gid desc`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post('/forecast_eec/landuse/Ttype', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_landuse where title_c IS NOT NULL and id_data IS NOT NULL order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/forecast_eec/landuse/Tyear", async (req, res) => {
    const { title_c } = req.body;
    // console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select distinct y_year from fc_landuse where title_c IS NOT NULL and id_data IS NOT NULL order by y_year ASC`
    } else {
        sql = `select distinct y_year from fc_landuse where title_c ='${title_c}' and id_data IS NOT NULL order by y_year ASC`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post("/forecast_eec/landuse/update", async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    data.map(async (x) => {
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'type' && d !== 'id_data') {
                let sql = `UPDATE fc_landuse SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })

})
app.post("/forecast_eec/landuse/delete", (req, res) => {
    const data = req.body;
    let id_data = data.id_data
    let sql = `DELETE FROM fc_landuse WHERE id_data = '${id_data}'`;
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})
//14//////////////
app.post("/forecast_eec/uw_industrybycate/data", async (req, res) => {
    let sql = `select * from fc_uw_industrybycate ORDER by gid`
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/uw_industrybycate/year', (req, res) => {
    const { code } = req.body;
    eec.query(`SELECT DISTINCT y_year FROM fc_uw_industrybycate where title_c='${code}' ORDER by y_year asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/uw_industrybycate/type', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_uw_industrybycate order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post('/forecast_eec/uw_industrybycate/unit', (req, res) => {
    const { code } = req.body;
    eec.query(`select DISTINCT unit_n from fc_uw_industrybycate where title_c='${code}'`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/forecast_eec/uw_industrybycate/save", async (req, res) => {
    const { data } = req.body;
    data.map(async (x) => {
        let y = `INSERT INTO fc_uw_industrybycate (id_data) VALUES ('${x.id_data}');`
        // console.log(y)
        await eec.query(y)
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'id_data') {
                let sql = `UPDATE fc_uw_industrybycate SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })
})
app.post("/forecast_eec/uw_industrybycate/Tdata", async (req, res) => {
    const { title_c } = req.body;
    console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select * from fc_uw_industrybycate where id_data IS NOT NULL order by gid desc`
    } else {
        sql = `select * from fc_uw_industrybycate where title_c ='${title_c}'and id_data IS NOT NULL order by gid desc`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post('/forecast_eec/uw_industrybycate/Ttype', (req, res) => {
    eec.query(`select DISTINCT  title_c,title_n from fc_uw_industrybycate where title_c IS NOT NULL and id_data IS NOT NULL order by title_c asc`, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })
})
app.post("/forecast_eec/uw_industrybycate/Tyear", async (req, res) => {
    const { title_c } = req.body;
    // console.log(title_c)
    let sql
    if (title_c == "All") {
        sql = `select distinct y_year from fc_uw_industrybycate where title_c IS NOT NULL and id_data IS NOT NULL order by y_year ASC`
    } else {
        sql = `select distinct y_year from fc_uw_industrybycate where title_c ='${title_c}' and id_data IS NOT NULL order by y_year ASC`
    }
    // console.log(y)
    eec.query(sql, (e, r) => {
        // console.log(r.rows);
        res.status(200).json({
            data: r.rows
        })
    })

})
app.post("/forecast_eec/uw_industrybycate/update", async (req, res) => {
    const { data } = req.body;
    // console.log(data)
    data.map(async (x) => {
        let d;
        for (d in x) {
            // console.log(d)
            if (d !== 'type' && d !== 'id_data') {
                let sql = `UPDATE fc_uw_industrybycate SET ${d} ='${x[d]}' WHERE id_data ='${x.id_data}' ;`
                // console.log(sql);
                eec.query(sql)
            }
        }
    })
    res.status(200).json({
        data: "success"
    })

})
app.post("/forecast_eec/uw_industrybycate/delete", (req, res) => {
    const data = req.body;
    let id_data = data.id_data
    let sql = `DELETE FROM fc_uw_industrybycate WHERE id_data = '${id_data}'`;
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})
module.exports = app;