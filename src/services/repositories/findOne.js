'use strict'

module.exports = (schemas, query = {}, skip = 0, take = 100, populate = '', sort = {}) => {

    return schemas.model.findOne(query).sort(sort).populate(populate).lean().skip(parseInt(skip)).limit(parseInt(take)).then(data => { return { data } }).catch(error => { return { error } })

}