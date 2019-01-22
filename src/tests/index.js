'use strict'

const chai = require('chai')
    , expect = chai.expect
    , controllers = require('./controllers/index')
    , helpers = require('./helpers/index')
    , addContext = require('mochawesome/addContext')
    , supertest = require('supertest')
    , request = supertest("localhost:4000")

describe('Integration Tests: ', function () {
    describe('/login', function () {
        it('POST', function (done) {
            request
                .post('/login')
                .send({
                    "email": "caio.majdalani@gmail.com",
                    "password": "123456"
                })
                .expect(202)
                .end((err, res) => {
                    addContext(this, {
                        title: 'Authorization and Response',
                        value: {
                            Response: res.body
                        }
                    });

                    done(err);
                });
        })
    })
})