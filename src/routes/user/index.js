'use strict'

module.exports = ({ services, schemas, controllers, hapiJwt, moment, joi }) => {

    return [
        {
            method: 'POST',
            path: '/login',
            config: {
                auth: false,
                tags: ['api'],
                description: 'Login',
                validate: {
                    payload: {
                        email: joi.string().email(),
                        password: joi.string().required(),
                    }
                }
            },
            handler: (request, reply) => { return reply('aaaa') }
        },
        {
            method: 'POST',
            path: '/users',
            config: {
                auth: false,
                tags: ['api'],
                description: 'Create a user',
                validate: {
                    payload: {
                        email: joi.string().email(),
                        password: joi.string().required(),
                    }
                }
            },
            handler: controllers.user.create({ services, schemas, moment })
        }
    ]
};