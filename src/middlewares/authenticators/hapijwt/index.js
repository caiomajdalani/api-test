`use strict`

module.exports = ({ API }) => ({ hapiJwt, jwt, services, _api }) => {

    _api.auth.strategy('jwt', 'jwt', {
        key: API.SECRET,
        validate: (decoded, request, callback) => {
            //  Caso queira negar uma requisição é só mandar o false
            callback(null, true)
        },
        verify: { algorithms: ['HS256'] }
    })
    _api.auth.default('jwt')

}