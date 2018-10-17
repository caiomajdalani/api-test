'use strict'

const _formatUser = (services, user) => {
    return {
        email: user.email,
        password: services.cryptography.toSHA256(user.password)
    }
}

module.exports = {
    // login: ({ services, schemas, moment }) => async (request, response) => {
    //     try {
    //         const { user, password } = request.payload

    //     } catch (error) {
    //         return services.replies.internalServerError(response)
    //     }
    // },

    create: ({ services, schemas, moment }) => async (request, h) => {
        try {
            const { data: dataFindUser, error: errorFindUser } = await services.repositories.findOne(schemas.user, { email: request.payload.email })
            if (dataFindUser) {
                return services.replies.conflict(h)({ resource: services.constants.user.FOUND, message: `Email ${request.payload.email} already exists.` })
            } else {
                const user = _formatUser(services, request.payload)
                const { data: dataCreateUser, error: errorCreateUser } = await services.repositories.save(schemas.user, user)
                if (dataCreateUser) {
                    return services.replies.created(h)(dataCreateUser)
                } else {
                    return services.replies.unprocessableEntity(h)({ resource: services.constants.user.ERROR, message: `Error creating user.` })
                }
            }

        } catch (error) {
            return services.replies.test(h)(`Error`)
        }
    }
}