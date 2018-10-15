'use strict'

const _middlewares = ({ API }) => ({ parser: { json, urlencoded }, hapiJwt, morgan, requestId, cors, timeout, helmet, compression }) => {
    return [
        // json({ limit: API.REQUEST.LIMIT }),
        // urlencoded({ extended: API.REQUEST.EXTENDED, limit: API.REQUEST.LIMIT }),
        // urlencoded({ extended: API.REQUEST.EXTENDED }),
        helmet(),
        cors(),
        compression(),
        // hapiJwt.initialize(),
        morgan(API.REQUEST.LOG),
        //timeout(API.REQUEST.TIMEOUT),
        requestId
    ]
}

const _authenticators = ({ API }) => ({ hapiJwt, jwt, middlewares, services }) => middlewares.authenticators.hapiJwt({ API })({ hapiJwt, jwt, services })

const _upWithoutSSL = ({ ENVIRONMENT, API, PORT }) => async (dependencies) => {

    const { hapi, inert, vision, hapiJwt, hapiSwagger, services, schemas } = dependencies
        , _api = new hapi.Server()

    // console.log(_api)

    await _api.connection({ port: PORT.HTTP, host: 'localhost' })

    // services.loggers.create(0, `SERVER`, { status: `success`, at: services.calendar.milliseconds({ moment })(services.calendar.timezone.SP), description: `server started` })

    console.log(`Inert => `, inert)
    console.log(`vision => `, vision)
    console.log(`hapiJwt => `, hapiJwt)
    console.log(`hapiSwagger => `, hapiSwagger)

    await _api.register([
        inert,
        vision,
        hapiJwt,
        {
            plugin: hapiSwagger,
            options: { info: { title: 'API Test', version: 'v1.0' } }
        }
    ])

    await _api.route(require('../../../routes/index')(dependencies))

    await _api.start().then(
        () => console.info(`API ${API.VERSION} RUNNING ON PORT ${PORT.HTTP} IN ${ENVIRONMENT} MODE`)
    ).catch(err => { throw err })

    // const _utils = { schemas: schemas, services: services }

    // _authenticators({ API })(dependencies)

    // _api.register(_middlewares({ API })(dependencies))
    // _api.register(routes(_utils)(dependencies))

}

const _setup = ({ ENVIRONMENT, API, PORT }) => async (dependencies) => {

    switch (ENVIRONMENT) {
        case 'DEVELOPMENT':
            await _upWithoutSSL({ ENVIRONMENT, API, PORT })(dependencies)
            break;

        case 'PRODUCTION':
            _upWithoutSSL({ ENVIRONMENT, API, PORT })(dependencies)
            break;

        default:
            _upWithoutSSL({ ENVIRONMENT, API, PORT })(dependencies)
            break;
    }

}

module.exports = {

    start: ({ ENVIRONMENT, API, PORT }) => async (dependencies) => await _setup({ ENVIRONMENT, API, PORT })(dependencies)

}