const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.options('*', cors());


const whk = require('./service/webhook');
app.use(whk);

app.use(bodyParser.json({
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

// var https_options = {
//     key: fs.readFileSync("/etc/apache2/ssl/private.key"),
//     cert: fs.readFileSync("/etc/apache2/ssl/public.crt"),
//     ca: fs.readFileSync('/etc/apache2/ssl/intermediate.crt')
// };

// var https_options = {
//     key: fs.readFileSync("/etc/apache2/ssl/private.key"),
//     cert: fs.readFileSync("/etc/apache2/ssl/public.crt"),
//     ca: fs.readFileSync('/etc/apache2/ssl/intermediate.crt')
// };

// var server = https.createServer(https_options, app);
// var port = process.env.PORT || 3700;
// server.listen(port, function () {
//     console.log('listening on port ' + server.address().port);
// });

app.use(express.static(__dirname + '/www'));

app.listen(3700, () => {
    console.log('running on http://localhost:3700')
});

const api = require('./service/api');
app.use(api);

const pf = require('./service/profile');
app.use(pf);

const projmon = require('./service/projmon');
app.use(projmon);

const green = require('./service/green');
app.use(green);

const watquality = require('./service/watquality');
app.use(watquality);

const seaquality = require('./service/seaquality');
app.use(seaquality);

const wastewat = require('./service/wastewat');
app.use(wastewat);

const login = require('./service/login');
app.use(login);

const watsurface = require('./service/watsurface');
app.use(watsurface);

const ncd = require('./service/ncd');
app.use(ncd);

const foodmile = require('./service/foodmile');
app.use(foodmile);

const agrimon = require('./service/agrimon');
app.use(agrimon);

const org = require('./service/organization');
app.use(org);

const iot = require('./service/iot');
app.use(iot);

const notice = require('./service/notice');
app.use(notice);

const biodiversity = require('./service/biodiversity');
app.use(biodiversity);

const gwater = require('./service/gwater');
app.use(gwater);

const garbage = require('./service/garbage');
app.use(garbage);
