const express = require('express');
const app = express.Router();
const fs = require('fs')
const axios = require('axios')

const con = require("./db");
const eec = con.eec;
const dat = con.dat;

const line = require('@line/bot-sdk');
const middleware = require('@line/bot-sdk').middleware

const config = {
    channelAccessToken: "tZxd8TS/zl6o51UGHaNAS/mz5CFcEF8ffD813DLnYvOkJui5wVTifSCgnhTdklyNvVjH/9sbuF/eVSmWU/6imPRmNTvgY1Mnu0Nr4J+PN2YCU8xmkmSGkpiQz0PpwUC19WY09NrSmNkZ3qULGCn4eAdB04t89/1O/w1cDnyilFU=",
    channelSecret: "4d227a7a07491222c192bf364cad1bc3"
}

const client = new line.Client(config);

app.post('/webhook', middleware(config), async (req, res) => {
    res.sendStatus(200)
    const e = req.body.events[0];
    console.log(e)
    if (e.type === 'message' && e.message.type === 'text') {
        handleMessageEvent(e);
    } else {
        return Promise.resolve(null);
    }
})

const handleMessageEvent = async (e) => {

    let greenArea = {
        "thumbnailImageUrl": "https://eec-onep.online/img/green.jpg",
        "title": "พื้นที่สีเขียว",
        "text": "description",
        "actions": [
            {
                "type": "uri",
                "label": "เพิ่มข้อมูล",
                "uri": "https://liff.line.me/1655648770-ep2aX464"
            }
        ]
    }
    let organicFarm = {
        "thumbnailImageUrl": "https://eec-onep.online/img/green2.jpg",
        "title": "เกษตรอินทรีย์",
        "text": "description",
        "actions": [
            {
                "type": "uri",
                "label": "เพิ่มข้อมูล",
                "uri": "https://liff.line.me/1655648770-JLXzogag"
            }
        ]
    }
    let familyForest = {
        "thumbnailImageUrl": "https://eec-onep.online/img/green.jpg",
        "title": "ป่าครอบครัว",
        "text": "description",
        "actions": [
            {
                "type": "uri",
                "label": "เพิ่มข้อมูล",
                "uri": "https://liff.line.me/1655648770-AVvzZ7n7"
            }
        ]
    }
    let biodiversity = {
        "thumbnailImageUrl": "https://eec-onep.online/img/green.jpg",
        "title": "ความหลากหลายทางชีวภาพ",
        "text": "description",
        "actions": [
            {
                "type": "uri",
                "label": "เพิ่มข้อมูล",
                "uri": "https://liff.line.me/1655648770-n1DKeyZy"
            }
        ]
    }

    let waterQuality = {
        "thumbnailImageUrl": "https://eec-onep.online/img/watqua.jpg",
        "title": "คุณภาพน้ำ",
        "text": "description",
        "actions": [
            {
                "type": "uri",
                "label": "เพิ่มข้อมูล",
                "uri": "https://liff.line.me/1655648770-weBqo060"
            }
        ]
    }
    let waterLevel = {
        "thumbnailImageUrl": "https://eec-onep.online/img/watlev.jpg",
        "title": "ปริมาณน้ำ",
        "text": "description",
        "actions": [
            {
                "type": "uri",
                "label": "เพิ่มข้อมูล",
                "uri": "https://liff.line.me/1655648770-l9Dxrawa"
            }
        ]
    }

    let profile = {
        "thumbnailImageUrl": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_5_carousel.png",
        "title": "ปริมาณน้ำ",
        "text": "description",
        "actions": [
            {
                "type": "uri",
                "label": "เพิ่มข้อมูล",
                "uri": "https://liff.line.me/1655648770-l9Dxrawa"
            }
        ]
    }

    let userId = e.source.userId

    if (e.message.text === 'ขอบคุณที่เป็นสามาชิกกับเรา') {
        await client.linkRichMenuToUser(userId, 'richmenu-7a7fce5c33fb0cf351ecbc5cbd06fb24')

        var msg = {
            type: 'text',
            text: 'yy'
        };
        return client.replyMessage(e.replyToken, msg);
    } else if (e.message.text === 'select menu') {
        let b = []
        const sql = `SELECT * FROM regis WHERE userid = '${userId}'`;
        await eec.query(sql).then(r => {
            console.log(r.rows)
            r.rows[0].greenarea === "yes" ? b.push(greenArea) : null;
            r.rows[0].organic === "yes" ? b.push(organicFarm) : null;
            r.rows[0].hforest === "yes" ? b.push(familyForest) : null;
            r.rows[0].watqua === "yes" ? b.push(waterQuality) : null;
            r.rows[0].watlev === "yes" ? b.push(waterLevel) : null;
            r.rows[0].airqua === "yes" ? b.push(biodiversity) : null;
            b.push(profile)
        })

        var msg = {
            "type": "template",
            "altText": "this is a carousel template",
            "template": {
                "type": "carousel",
                "columns": b
            }
        };
        return client.replyMessage(e.replyToken, msg);
    } else {
        var msg = {
            type: 'text',
            text: 'สวัสดีครัช'
        };
        return client.replyMessage(e.replyToken, msg);
    }
}

const linkRichmenu = async (user_id, rich_menu_id) => {
    client.linkRichMenuToUser(user_id, rich_menu_id)
}

const unlinkRichmenu = async (user_id, rich_menu_id) => {
    await client.unlinkRichMenuFromUser(user_id, rich_menu_id)
}

app.get('/setrichmenu', async (req, res) => {
    const richmenu = {
        "size": {
            "width": 2500,
            "height": 1686
        },
        "selected": true,
        "name": "Rich Menu 3",
        "chatBarText": "กด",
        "areas": [
            {
                "bounds": {
                    "x": 1713,
                    "y": 88,
                    "width": 704,
                    "height": 712
                },
                "action": {
                    "type": "uri",
                    "uri": "https://liff.line.me/1655648770-GVq1eLaL"
                }
            }
        ]
    }

    await client.deleteDefaultRichMenu()
    // await client.unlinkRichMenuFromUser('Ub3fb16cc3a0edd24a934102863cda4c6',
    //     'richmenu-5647c46709295f7b818dec5c06135a22')
    // สรา้ง richmenu
    await client.createRichMenu(richmenu).then(async (richMenuId) => {
        console.log(richMenuId)
        await client.setRichMenuImage(richMenuId,
            fs.createReadStream('./service/img/IMG_4631.JPG'))
        await client.setDefaultRichMenu(richMenuId)
        console.log("ok");
    })
    res.sendStatus(200)
    // richmenu1
    // richmenu-acd495ac98414ca4e8a0850837756728
    // richmenu2
    // richmenu-7a7fce5c33fb0cf351ecbc5cbd06fb24
    // await client.deleteDefaultRichMenu()
    // await client.setDefaultRichMenu('richmenu-0796c4a6cdaac7974eec3ecd9977f37c')
})

app.post('/create_richmenu_default', async (req, res) => {
    const richmenu = {
        "size": {
            "width": 2500,
            "height": 1686
        },
        "selected": true,
        "name": "Rich Menu",
        "chatBarText": "กด",
        "areas": [
            {
                "bounds": {
                    "x": 1713,
                    "y": 88,
                    "width": 704,
                    "height": 712
                },
                "action": {
                    "type": "uri",
                    "uri": "https://liff.line.me/1655648770-GVq1eLaL"
                }
            }
        ]
    }

    await client.createRichMenu(richmenu).then(async (richMenuId) => {
        console.log(richMenuId)
        await client.setRichMenuImage(richMenuId,
            fs.createReadStream('./service/img/IMG_4631.JPG'))
        res.status(200).json({
            richmenuid: richMenuId
        });
    })
    res.sendStatus(200)
})

app.post('/create_richmenu_personal', async (req, res) => {
    const richmenu = {
        "size": {
            "width": 2500,
            "height": 1686
        },
        "selected": true,
        "name": "Rich Menu",
        "chatBarText": "กด",
        "areas": [
            {
                "bounds": {
                    "x": 1713,
                    "y": 88,
                    "width": 704,
                    "height": 712
                },
                "action": {
                    "type": "message",
                    "text": "select_menu"
                }
            }
        ]
    }

    await client.createRichMenu(richmenu).then(async (richMenuId) => {
        console.log(richMenuId)
        await client.setRichMenuImage(richMenuId,
            fs.createReadStream('./service/img/IMG_4631.JPG'))
        res.status(200).json({
            richmenuid: richMenuId
        });
    })
    res.sendStatus(200)
})

app.post('/link_user_richmenu', async (req, res) => {
    const { userId } = req.body;
    client.linkRichMenuToUser(userId, 'richmenu-7a7fce5c33fb0cf351ecbc5cbd06fb24')

})

app.post('/unlink_user_richmenu', async (req, res) => {
    const { userId } = req.body;
    client.unlinkRichMenuFromUser(userId, 'richmenu-7a7fce5c33fb0cf351ecbc5cbd06fb24')
})


module.exports = app;