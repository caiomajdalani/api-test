const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cnpj: {
        type: String,
        required: true
    },
    employees: [
        {
            name: {
                type: String,
                required: true
            },
            idade: {
                type: Number,
                required: true
            },
            birthdate: {
                type: Date,
                required: true
            },
            job: {
                type: String,
                required: true,
                enum: [
                    `DIRECTOR`,
                    `DEVELOPER`,
                    `ANALYST`
                ]
            },
            email: {
                type: String,
                required: true,
                ref: `user`
            }
        }
    ]
})

module.exports = {
    entity: schema,
    model: mongoose.model('enterprise', schema)
}