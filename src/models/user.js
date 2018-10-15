const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = {
    entity: schema,
    model: mongoose.model('user', schema)
}