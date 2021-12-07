const express = require('express')
const app = express()
const port = 3000
// add เข้า database
const { Pool, Client } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'eec',
    password: '0864761542',
    port: 5432,
})
//เรียกดูข้อมูลของ api database
app.get('/api/get', (req, res) => {
    // คำสั่งเรียกดูข้อมูลจาก SQL 
    pool.query('select * from water ORDER', (e, r) => {
        res.status(200).json({
            data: r.rows
        })
    })
})
// add ข้อมูลเข้า or บันทึกข้อมูล ใน SQL
app.get('/api/add/:staid/:locate/:record/:pro/:gwyear/:gwdate/:wc/:td/:ph/:fe/:mnn/:cu/:zn/:so/:ci/:fluor/:no3/:thcc/:nchcc/:ts/:ars/:cn/:pb/:hg/:cd/:se/:spc/:mpn/:ecl', (req, res) => {
    var staid = req.params.staid
    var locate = req.params.locate
    var record = req.params.record
    var pro = req.params.pro
    var gwyear = req.params.gwyear
    var gwdate = req.params.gwdate
    var wc = req.params.wc
    var td = req.params.td
    var ph = req.params.ph
    var fe = req.params.fe
    var mnn = req.params.mnn
    var cu = req.params.cu
    var zn = req.params.zn
    var so = req.params.so
    var ci = req.params.ci
    var fluor = req.params.fluor
    var no3 = req.params.no3
    var thcc = req.params.thcc
    var nchcc = req.params.nchcc
    var ts = req.params.ts
    var ars = req.params.ars
    var cn = req.params.cn
    var pb = req.params.pb
    var hg = req.params.hg
    var cd = req.params.cd
    var se = req.params.se
    var spc = req.params.spc
    var mpn = req.params.mpn
    var ecl = req.params.ecl
    var sql = "INSERT INTO public.water (staid,locate,record,pro,gwyear,gwdate,wc,td,ph,fe,mnn,cu,zn,so,ci,flour,no3,thcc,nchcc,ts,ars,cn,pb,hg,cd,se,spc,mpn,ecl) VALUES ('" + staid + "', '" + locate + "','" + record + "','" + pro + "','" + gwyear + "','" + gwdate + "','" + wc + "','" + td + "','" + ph + "','" + fe + "','" + mnn + "','" + cu + "','" + zn + "','" + so + "','" + ci + "','" + fluor + "','" + no3 + "','" + thcc + "','" + nchcc + "','" + ts + "','" + ars + "','" + cn + "','" + pb + "','" + hg + "','" + cd + "','" + se + "','" + spc + "','" + mpn + "','" + ecl + "');"
    // console.log(sql);
    pool.query(sql, (e, r) => {
        res.status(200).json({
            data: "insert success"
        })
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.use('/', express.static('www'))
