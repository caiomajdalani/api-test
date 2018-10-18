'use strict'

const _query = (request) => {

    let query = {}
    let { name, cnpj } = request.query

    query = name ? Object.assign({}, query, { name: { '$regex': decodeURIComponent(name), '$options': 'i' } }) : query
    query = cnpj ? Object.assign({}, query, { cnpj: { '$regex': decodeURIComponent(cnpj), '$options': 'i' } }) : query

    return query
}

module.exports = {
    findAll: ({ services, schemas, moment }) => async (request, response) => {
        try {
            console.log(`Entra na controller`)
            const query = _query(request)
            const { data: dataFindCompanies, error: errorFindCompanies } = await services.repositories.find(schemas.company, query)
            if (dataFindCompanies) {
                return services.replies.ok(response)(dataFindCompanies)
            } else {
                return services.replies.notFound(response)({ resource: services.constants.company.NOT_FOUND, message: `Companies not found.` })
            }
        } catch (error) {
            return services.replies.internalServerError(response)(`Error`)
        }
    }
}