const express           = require('express');
let appRoot             = require('app-root-path');
let todoRoutes          = require(appRoot + '/server/routes/todo');
const listEndpoints     = require('express-list-endpoints');
var cors                = require('cors')
let bodyParser              = require('body-parser');

require('dotenv').config();

const app  = express();
const port = process.env.EXPRESS_PORT;
app.listen(port);

app.use(bodyParser.json());
app.use(cors())
app.use(express.static(appRoot + '/dist/'));
app.use('/todo', todoRoutes);


console.log(listEndpoints(app));

