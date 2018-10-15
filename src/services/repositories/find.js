'use strict'

module.exports = (schemas, query = { }, skip = 0, take, populate = '', sort = { }) =>
    schemas.model
        .find(query)
        .sort(sort)
        .populate(populate)
        .lean()
        .skip(skip)
        .limit(take)
        .then(data => ({ data }))
        .catch(error => ({ error }))
