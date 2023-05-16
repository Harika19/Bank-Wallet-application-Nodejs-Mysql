const CreateResource = require('../Models/createResource')
const { httpStatusCode } = require('./../constants')
const { CREATED, SERVICE_UNAVAILABLE} = httpStatusCode

class DatabaseController {
    static async createDatabase(req, res) {
        try {
            await CreateResource.createDatabase()
            res.status(CREATED)
                .send({ message: ' Database Created ' })
        } catch (error) {
            console.error(' Error in Database creation ', error)
            res.status(SERVICE_UNAVAILABLE)
                .send({ message: ' Unable to create database ' })
        }
    }

    static async createTables(req, res) {
        try {
            await CreateResource.createTables()
            res.status(CREATED).send({ message: ' Tables Created ' })
        } catch (error) {
            console.error(' Error in Table creation ', error)
            res.status(SERVICE_UNAVAILABLE)
                .send({ message: ' Unable to create tables ' })
        }
    }
}

module.exports = DatabaseController