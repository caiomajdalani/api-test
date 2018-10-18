'use strict'

const jwt = require('jsonwebtoken'),
    { API } = process.env,
    _api = JSON.parse(API)

const _formatUser = (services, user) => {
    return {
        email: user.email,
        password: services.cryptography.toSHA256(user.password)
    }
}

const _checkPassword = (services, payloadPassword, userPassword) => {
    return services.cryptography.toSHA256(payloadPassword) === userPassword ? true : false
}

module.exports = {
    login: ({ services, schemas, moment }) => async (request, response) => {
        try {
            const { email, password } = request.payload
            const { data: dataFindUser, error: errorFindUser } = await services.repositories.findOne(schemas.user, { email: email })
            if (dataFindUser) {
                const _check = _checkPassword(services, password, dataFindUser.password)
                if (_check) {
                    const _user = {
                        _id: dataFindUser._id,
                        email: dataFindUser.email,
                    }
                    const _token = jwt.sign(_user, _api.SECRET)
                    return services.replies.accepted(response)({ user: _user, token: _token })
                } else {
                    return services.replies.unauthorized(response)({ resource: services.constants.user.USER_INVALID, message: `User and/or password invalid.` })
                }
            } else {
                return services.replies.notFound(response)({ resource: services.constants.user.NOT_FOUND, message: `User ${email} not found.` })
            }
        } catch (error) {
            return services.replies.internalServerError(response)(`Error`)
        }
    },

    create: ({ services, schemas, moment }) => async (request, response) => {
        try {
            const { data: dataFindUser, error: errorFindUser } = await services.repositories.findOne(schemas.user, { email: request.payload.email })
            if (dataFindUser) {
                return services.replies.conflict(response)({ resource: services.constants.user.FOUND, message: `Email ${request.payload.email} already exists.` })
            } else {
                const user = _formatUser(services, request.payload)
                const { data: dataCreateUser, error: errorCreateUser } = await services.repositories.save(schemas.user, user)
                if (dataCreateUser) {
                    return services.replies.created(response)(dataCreateUser)
                } else {
                    return services.replies.unprocessableEntity(response)({ resource: services.constants.user.ERROR, message: `Error creating user.` })
                }
            }

        } catch (error) {
            return services.replies.internalServerError(response)(`Error`)
        }
    }
}