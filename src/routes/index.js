'use strict'

const path = require('path')

const _paths = [
    `./user`,
    `./enterprise`
]

module.exports = (dependencies) => _paths.map(path => require(path)(dependencies)).map(endpoint => endpoint[0])

