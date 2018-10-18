'use strict'

const CODES = {
    ok: 200,
    created: 201,
    accepted: 202,
    badRequest: 400,
    unauthorized: 401,
    notFound: 404,
    conflict: 409,
    unprocessableEntity: 422,
    internalServerError: 500
}

module.exports = {

    ok: resObj => (data) => resObj.response({
        status: CODES.ok,
        message: `OK`,
        result: data
    }).code(CODES.ok),

    created: resObj => (data) => resObj.response({
        status: CODES.created,
        message: `CREATED`,
        result: data
    }).code(CODES.created),

    accepted: resObj => (data) => resObj.response({
        status: CODES.accepted,
        message: `ACCEPTED`,
        result: data
    }).code(CODES.accepted),

    badRequest: resObj => (data) => resObj.response({
        status: CODES.badRequest,
        message: `BADREQUEST`,
        result: data
    }).code(CODES.badRequest),

    unauthorized: resObj => (data) => resObj.response({
        status: CODES.unauthorized,
        message: `UNAUTHORIZED`,
        result: data
    }).code(CODES.unauthorized),

    notFound: resObj => (data) => resObj.response({
        status: CODES.notFound,
        message: `NOTFOUND`,
        result: data
    }).code(CODES.notFound),

    conflict: resObj => (data) => resObj.response({
        status: CODES.conflict,
        message: `CONFLICT`,
        result: data
    }).code(CODES.conflict),

    unprocessableEntity: resObj => (data) => resObj.response({
        status: CODES.unprocessableEntity,
        message: `UNPROCESSABLE`,
        result: data
    }).code(CODES.unprocessableEntity),

    internalServerError: resObj => (data) => resObj.response({
        status: CODES.internalServerError,
        message: `ERROR`,
        result: data
    }).code(CODES.internalServerError)
}