const express         = require('express');
const appRoot         = require('app-root-path');
const log4js          = require(appRoot + '/logger');
const mongoose        = require(appRoot + '/db/connection');
const router          = express.Router();
const TODO            = require(appRoot + '/db/models/todo');

const logger = log4js.getLogger('cheese');


function errorHandler(err, response) {
    console.log(err);
    response.sendStatus(500);
    logger.error(err);
}

//Отдаем весь список
router.get("/list",  async function (request, response) {
    try {
        let results = await TODO.find();
        response.send(results);
    }catch (err) {
        errorHandler(err, response);
    }
});

router.post("/add",  async function (request, response) {
    try {
        let results = await TODO.create(request.body);
        response.send(results);
    }catch (err) {
        errorHandler(err, response);
    }
});


router.patch("/edit",  async function (request, response) {
    try {
        let results = await TODO.updateOne({id: request.body.id}, request.body);
      
        response.send(results);
    }catch (err) {
        errorHandler(err, response);
    }
});

router.delete("/delete",  async function (request, response) {
    try {
        let results = await TODO.deleteOne(request.body);
        response.send(results);
    }catch (err) {
        errorHandler(err, response);
    }
});


module.exports = router;
