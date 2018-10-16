'use strict'

const _authenticators = ({ API }) => ({ hapiJwt, jwt, middlewares, services, _api }) => middlewares.authenticators.hapiJwt({ API })({ hapiJwt, jwt, services, _api })

const _upWithoutSSL = ({ ENVIRONMENT, API, PORT }) => async (dependencies) => {

    const { hapi, inert, vision, hapiJwt, hapiSwagger, services, schemas } = dependencies
        , _api = new hapi.Server({ port: PORT.HTTP, host: 'localhost' })

    await _api.register([
        inert,
        vision,
        hapiJwt,
        {
            plugin: hapiSwagger,
            options: { info: { title: 'API Test', version: 'v1.0' } }
        }
    ])

    dependencies._api = _api

    await _authenticators({ API })(dependencies)

    await _api.route(require('../../../routes/index')(dependencies))

    await _api.start().then(
        () => console.info(`API ${API.VERSION} RUNNING ON PORT ${PORT.HTTP} IN ${ENVIRONMENT} MODE`)
    ).catch(err => { throw err })

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