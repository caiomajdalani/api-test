'use strict'

module.exports = ({ services, schemas, controllers, hapiJwt, jwt, moment, joi }) => {

    return [
        {
            method: 'GET',
            path: '/companies',
            config: {
                tags: ['api'],
                description: 'Search companies',
                validate: {
                    headers: joi.object({
                        authorization: joi.string().required()
                    }).unknown(),
                    query: {
                        name: joi.string().max(100),
                        cnpj: joi.string()
                    }
                }
            },
            handler: controllers.company.findAll({ services, schemas, moment })
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
            handler: controllers.company.findOne({ services, schemas, moment })
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
                validate: {
                    headers: joi.object({
                        authorization: joi.string().required()
                    }).unknown(),
                    payload: {
                        name: joi.string().required().max(50),
                        cnpj: joi.string().length(14).required(),
                        employees: joi.array().items(
                            joi.object({
                                name: joi.string().required().max(50),
                                birthdate: joi.date().iso().required(),
                                job: joi.string().valid(`DIRECTOR`, `DEVELOPER`, `ANALYST`).required(),
                                email: joi.string().email().required()
                            })
                        )
                    }
                }
            },
            handler: controllers.company.create({ services, schemas, moment })
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