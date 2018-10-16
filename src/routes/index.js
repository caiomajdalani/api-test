'use strict'

const path = require('path')

const _paths = [
    `./user`,
    `./companies`
]

module.exports = (dependencies) => {

    const routes = []

    const path = _paths.map(path => {
        routes.push(...require(path)(dependencies))
    })

    return routes
}

