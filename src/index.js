'use strict'

const middlewares = require('./middlewares/index')
    , configurations = require('./configurations/index')

middlewares.databases.mongodb.connect(configurations.databases.mongodb)(configurations.dependencies)

async function start() {
    await middlewares.servers.hapi.start(configurations.servers.hapi)(configurations.dependencies)
}
start()