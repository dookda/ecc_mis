const express = require('express');
const app = express.Router();
const con = require("./db");
const eec = con.eec;

const nodemailer = require("nodemailer");

app.post("/profile-api/register", async (req, res) => {
    const { data } = req.body;
    let regid = Date.now()
    await eec.query(`INSERT INTO register(regid, auth, ndate, approved)VALUES('${regid}','user',now(),'ยังไม่ได้ตรวจสอบ')`)
    let d;
    for (d in data) {
        if (data[d] !== '') {
            let sql = `UPDATE register SET ${d}='${data[d]}' WHERE regid='${regid}'`;
            // console.log(sql);
            await eec.query(sql)
        }
    }
    res.status(200).json({
        data: "insert success"
    });
});

app.post("/profile-api/getuser", (req, res) => {
    const { regid } = req.body;
    const sql = `SELECT * FROM register`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })

})

app.post("/profile-api/getprofile", (req, res) => {
    const { regid } = req.body;
    // console.log(userid);
    const sql = `SELECT *, TO_CHAR(ndate, 'DD Mon YYYY') as dt FROM register WHERE regid = '${regid}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/profile-api/getocup", (req, res) => {
    const { regid } = req.body;
    // console.log(userid);
    const sql = `SELECT distinct ocup FROM register ORDER BY ocup`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/profile-api/updateprofile", async (req, res) => {
    const { regid, data } = req.body;

    let sql = `UPDATE register SET editdate=now() WHERE regid='${regid}'`;
    await eec.query(sql)

    for (d in data) {
        if (data[d] !== '') {
            let sql = `UPDATE register SET ${d}='${data[d]}' WHERE regid='${regid}'`;
            // console.log(sql);
            await eec.query(sql)
        }
    }

    res.status(200).json({
        data: "success"
    })
})

app.post("/profile-api/updateimgprofile", async (req, res) => {
    const { img, regid } = req.body;

    let sql = `UPDATE register SET img='${img}' WHERE regid='${regid}'`;
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        });
    });
})

app.post("/profile-api/userlogin", (req, res) => {
    const { usrname, pass } = req.body;
    const sql = "SELECT usrname,regid,auth,approved,f_water_lev,f_wastewater,f_water_surface,f_water_qua,f_seawater_qua,f_gw,f_air,f_green,f_biodiversity,f_familyforest,f_organic,f_garbage FROM register WHERE tel=$1 and pass=$2";
    const val = [usrname, pass];

    eec.query(sql, val).then(r => {
        res.status(200).json({
            data: r.rows
        });
    });
})

app.post("/profile-api/delete", (req, res) => {
    const { regid, usrname } = req.body;
    const sql = `DELETE FROM register WHERE usrname='${usrname}' AND regid='${regid}'`
    eec.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

app.post("/profile-api/resetmail", async (req, res) => {
    const { email } = req.body;

    let sql = `SELECT email from register WHERE email='${email}'`;
    await eec.query(sql).then(async (r) => {
        // console.log(r.rows.length);

        if (r.rows.length > 0) {
            let newpass = Date.now()
            await eec.query(`UPDATE register SET pass='${newpass}' WHERE email='${email}'`);

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'eec.onep@gmail.com',
                    pass: 'eec090164'
                }
            });

            var mailOptions = {
                from: 'eec.onep@gmail.com',
                to: email,
                subject: 'รหัสผ่านใหม่',
                // text: 'รหัสผ่านใหม่ของท่านคือ ' + newpass,
                html: `รหัสผ่านใหม่ของท่านคือ  <b>${newpass}</b> 
                <br>เข้าสู่ระบบอีกครั้งที่ https://eec-onep.online/form_register/login/index.html 
                <br>เมื่อเข้าสู้ระบบได้แล้วกรุณาเปลี่ยนรหัสผ่านใหม่`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    // console.log('Email sent: ' + info.response);
                    res.status(200).json({
                        data: `ส่งรหัสผ่านใหม่ไปยัง ${email} เรียบร้อยแล้ว`
                    })
                }
            });
        } else {
            res.status(200).json({
                data: `${email} ยังไม่ได้ลงทะเบียน <br>กรุณาลงทะเบียนก่อนใช้งาน`
            })
        }
    })

})

app.post("/profile-api/approvedmail", async (req, res) => {
    const { email, name } = req.body;
    // console.log(name, email)
    let sql = `SELECT email FROM register WHERE email='${email}'`;
    await eec.query(sql).then(async (r) => {
        if (r.rows.length > 0) {
            console.log(r.rows);
            // let newpass = Date.now()
            // await eec.query(`UPDATE register SET pass='${newpass}' WHERE email='${email}'`);

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'eec.onep@gmail.com',
                    pass: 'eec090164'
                }
            });

            var mailOptions = {
                from: 'eec.onep@gmail.com',
                to: email,
                subject: 'การสมัครเข้าใช้งานผ่านการตรวจสอบข้อมูลแล้ว',
                // text: 'รหัสผ่านใหม่ของท่านคือ ' + newpass,
                html: `เรียน คุณ ${name} <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ตามที่ท่านได้การสมัครสมาชิกเพื่อเข้าใช้งานระบบสารสนเทศเพื่อการจัดการสิ่งแวดล้อม ในพื้นที่เขตพัฒนาพิเศษภาคตะวันออก บัดนี้ทางผู้ดูแลระบบได้กำหนดสิทธิ์การเข้าถึงให้แก่ท่านเรียบร้อยแล้ว <b>(ผ่านการตรวจสอบข้อมูลแล้ว)</b>
                <br>ท่านสามารถเข้าตรวจสอบสิทธิ์การใช้งานได้ที่ https://eec-onep.online/form_register/login/index.html
                <br>
                <br>
                 ด้วยความนับถือ 
                <br> ผู้ดูแลระบบ`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    // console.log('Email sent: ' + info.response);
                    res.status(200).json({
                        data: `ส่งไปยัง ${email} เรียบร้อยแล้ว`
                    })
                }
            });
        } else {
            res.status(200).json({
                data: `${email} ยังไม่ได้ลงทะเบียน <br>กรุณาลงทะเบียนก่อนใช้งาน`
            })
        }
    })

})

// let i = 101;
// setInterval(() => {
//     let sql = `insert into register (regid, usrname, pass, ndate, tel, auth, approved)values(
//             '111${i}','guest${i}','guest${i}',now(), 'guest${i}','admin','ตรวจสอบแล้ว'
//         )`
//     eec.query(sql).then(r => console.log(sql))
//     i++
// }, 3000);



module.exports = app;