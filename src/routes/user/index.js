'use strict'

module.exports = ({ services, schemas, controllers, hapiJwt, moment, joi }) => {

    return [
        {
            method: 'POST',
            path: '/login',
            config: {
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
                tags: ['api'],
                description: 'Create a user',
                validate: {
                    headers: joi.object({
                        authorization: joi.string().required()
                    }).unknown(),
                    payload: {
                        email: joi.string().email(),
                        password: joi.string().required(),
                    }
                }
            },
            handler: (request, reply) => { return reply('aaaa') }
        }
    ]
};