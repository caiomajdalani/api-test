'use strict'

const _query = (request) => {

    let query = {}
    let { name, cnpj } = request.query

    query = name ? Object.assign({}, query, { name: { '$regex': decodeURIComponent(name), '$options': 'i' } }) : query
    query = cnpj ? Object.assign({}, query, { cnpj: { '$regex': decodeURIComponent(cnpj), '$options': 'i' } }) : query

    return query
}

const _verifyUserEmail = async (services, schemas, email) => {
    const { data: dataFindEmail, error: errorFindEmail } = await services.repositories.findOne(schemas.user, { email: email })
    return dataFindEmail ? true : false
}

const _mapEmployees = async (services, schemas, employees) => {

    let _success = [], _error = []

    const res = await Promise.all(employees.map(async employee => {
        const verify = await _verifyUserEmail(services, schemas, employee.email)
        if (!verify) {
            _error.push({ status: verify, email: employee.email })
        } else {
            _success.push({ status: verify, email: employee.email })
        }

        return { data: _success, error: _error }
    }))

    return { _success, _error }
}

module.exports = {
    findAll: ({ services, schemas, moment }) => async (request, response) => {
        try {
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
    },
    findOne: ({ services, schemas, moment }) => async (request, response) => {
        try {
            const { data: dataFindCompanies, error: errorFindCompanies } = await services.repositories.findOne(schemas.company, { _id: request.params.id })
            if (dataFindCompanies) {
                return services.replies.ok(response)(dataFindCompanies)
            } else {
                return services.replies.notFound(response)({ resource: services.constants.company.NOT_FOUND, message: `Company ${request.params.id} not found.` })
            }
        } catch (error) {
            return services.replies.internalServerError(response)(`Error`)
        }
    },
    create: ({ services, schemas, moment }) => async (request, response) => {
        try {

            const { data: dataFindCompany, error: errorFindCompany } = await services.repositories.findOne(schemas.company, { cnpj: request.payload.cnpj })

            if (dataFindCompany) {
                return services.replies.conflict(response)({ resource: services.constants.company.FOUND, message: `A company is already registered with CNPJ: ${request.payload.cnpj}` })
            } else {

                const { _success, _error } = await _mapEmployees(services, schemas, request.payload.employees)

                if (_error.length != 0) {
                    return services.replies.conflict(response)({ resource: services.constants.user.NOT_FOUND, message: `User email ${_error[0].email} not found.` })
                }

                const _same = _success.some(element => _success.filter(filtered => filtered.email === element.email).length > 1)

                if (_same) {
                    return services.replies.conflict(response)({ resource: services.constants.user.INVALID, message: `Two or more employees can not have the same email.` })
                }

                const { data: dataCreateCompany, error: errorCreateCompany } = await services.repositories.save(schemas.company, request.payload)
                if (dataCreateCompany) {
                    return services.replies.created(response)(dataCreateCompany)
                } else {
                    return services.replies.unprocessableEntity(response)({ resource: services.constants.company.ERROR, message: `Error creating company.` })
                }
            }
        } catch (error) {
            console.error(error)
            return services.replies.internalServerError(response)(`Error`)
        }
    }

}