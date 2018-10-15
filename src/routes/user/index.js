'use strict'

module.exports = ({ services, schemas, controllers, hapiJwt, moment, joi }) => {
    // router
    //     .method('POST')
    //     .path('/login')
    //     .config()
    //     .handler()

    // router
    //     .method('POST')
    //     .path('/users')
    //     .config()
    //     .handler()

    return [{
        method: 'GET',
        path: '/users',
        config: {
            tags: ['api'],
            description: 'Listar herois com paginação',
            notes: 'Deve enviar o ignore e limite para paginação',
            validate: {
                // headers: joi.object({
                //     authorization: joi.string().required()
                // }).unknown(),
                // query: {
                //     nome: joi.string().max(100),
                //     limite: joi.number().required().max(150),
                //     ignore: joi.number().required()
                // }
            }
        },
        handler: (request, reply) => { return reply('aaaa') }
    }]
};