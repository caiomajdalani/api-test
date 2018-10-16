'use strict'

module.exports = ({ services, schemas, controllers, hapiJwt, moment, joi }) => {

    return [
        {
            method: 'GET',
            path: '/companies',
            config: {
                tags: ['api'],
                description: 'Search companies',
                notes: 'Page and PageSize must be informed',
                validate: {
                    headers: joi.object({
                        authorization: joi.string().required()
                    }).unknown(),
                    query: {
                        name: joi.string().max(100),
                        pageSize: joi.number().required().max(100),
                        page: joi.number().required()
                    }
                }
            },
            handler: (request, reply) => { return reply('aaaa') }
        },
        {
            method: 'GET',
            path: '/companies/{id}',
            config: {
                tags: ['api'],
                description: 'Find a company',
                notes: 'Must inform CompanyId as a mongodb ObjectId',
                validate: {
                    headers: joi.object({
                        authorization: joi.string().required()
                    }).unknown(),
                    params: {
                        id: joi.string().regex(/^[a-f\d]{24}$/).required()
                    }
                }
            },
            handler: (request, reply) => { return reply('aaaa') }
        },
        {
            method: 'GET',
            path: '/companies/{id}/users',
            config: {
                tags: ['api'],
                description: 'Find all employees on a company with a especified job',
                notes: 'Must inform CompanyId as a mongodb ObjectId',
                validate: {
                    headers: joi.object({
                        authorization: joi.string().required()
                    }).unknown(),
                    params: {
                        id: joi.string().regex(/^[a-f\d]{24}$/).required()
                    },
                    query: {
                        job: joi.string().valid(`DIRECTOR`, `DEVELOPER`, `ANALYST`).required()
                    }
                }
            },
            handler: (request, reply) => { return reply('aaaa') }
        },
        {
            method: 'POST',
            path: '/companies',
            config: {
                tags: ['api'],
                description: 'Create a Company',
                notes: 'Must inform CompanyId as a mongodb ObjectId',
                validate: {
                    headers: joi.object({
                        authorization: joi.string().required()
                    }).unknown(),
                    payload: {
                        name: joi.string().required().min(5).max(50),
                        cnpj: joi.string().length(14).required(),
                        employees: joi.array().items(
                            joi.object({
                                name: joi.string().required().min(5).max(50),
                                birthdate: joi.date().required(),
                                job: joi.string().valid(`DIRECTOR`, `DEVELOPER`, `ANALYST`).required(),
                                email: joi.string().email().required()
                            })
                        )
                    }
                }
            },
            handler: (request, reply) => { return reply('aaaa') }
        },
        {
            method: 'PUT',
            path: '/companies/{id}',
            config: {
                tags: ['api'],
                description: 'Update a Company',
                notes: 'Must inform CompanyId as a mongodb ObjectId',
                validate: {
                    headers: joi.object({
                        authorization: joi.string().required()
                    }).unknown(),
                    params: {
                        id: joi.string().regex(/^[a-f\d]{24}$/).required()
                    },
                    payload: {
                        name: joi.string().required().min(5).max(50),
                        cnpj: joi.string().length(14).required(),
                        employees: joi.array().items(
                            joi.object({
                                name: joi.string().required().min(5).max(50),
                                birthdate: joi.date().required(),
                                job: joi.string().valid(`DIRECTOR`, `DEVELOPER`, `ANALYST`).required(),
                                email: joi.string().email().required()
                            })
                        )
                    }
                }
            },
            handler: (request, reply) => { return reply('aaaa') }
        },
        {
            method: 'DELETE',
            path: '/companies/{id}',
            config: {
                tags: ['api'],
                description: 'Delete a Company',
                notes: 'Must inform CompanyId as a mongodb ObjectId',
                validate: {
                    headers: joi.object({
                        authorization: joi.string().required()
                    }).unknown(),
                    params: {
                        id: joi.string().regex(/^[a-f\d]{24}$/).required()
                    }
                }
            },
            handler: (request, reply) => { return reply('aaaa') }
        },
    ]

};