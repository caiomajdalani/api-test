'use strict'

module.exports = {

    hapi: require('hapi'),
    http: require('http'),
    https: require('https'),
    mongoose: require('mongoose'),
    bluebird: require('bluebird'),
    morgan: require('morgan'),
    jsonwebtoken: require('jsonwebtoken'),
    hapiJwt: require('hapi-auth-jwt2'),
    parser: require('body-parser'),
    cors: require('cors'),
    timeout: require('connect-timeout'),
    helmet: require('helmet'),
    errors: require('http-errors'),
    compression: require('compression'),
    spdy: require('spdy'),
    path: require('path'),
    fs: require('fs'),
    moment: require('moment-timezone'),
    joi: require('joi'),
    inert: require('inert'),
    hapiSwagger: require('hapi-swagger'),
    vision: require('vision'),
    schemas: require('../../models/index'),
    middlewares: require('../../middlewares/index'),
    services: require('../../services/index'),
    routes: require('../../routes/index'),
    controllers: require('../../controllers/index')

}