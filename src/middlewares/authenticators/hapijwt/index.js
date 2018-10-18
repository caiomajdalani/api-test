`use strict`

module.exports = ({ API }) => ({ services, schemas, controllers, hapiJwt, jwt, moment, joi, _api }) => {
    _api.auth.strategy('jwt', 'jwt', {
        key: API.SECRET,
        validate: async (decoded, request) => {
            const { data, error } = await services.repositories.findOne(schemas.user, { _id: decoded._id })
            if (data) {
                return { isValid: true }
            } else {
                return { isValid: false }
            }
        },
        verify: { algorithms: ['HS256'] }
    })
    _api.auth.default('jwt')
}