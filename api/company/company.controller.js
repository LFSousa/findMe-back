const errorHandler = require('../../errors/handler');
const companyDAO = require('./company.dao');
const companyModel = require('./company.model');

module.exports = {

    create(req, res) {
        companyModel.create(req.body)
        .then(company => companyDAO.create(company))
        .then(() => res.sendStatus(201))
        .catch(errorHandler(res));
    },

    
    edit(req, res) {
        companyModel.edit(req.body)
        .then(company => companyDAO.edit(company, req.params.id))
        .then(() => res.json())
        .catch(errorHandler(res));
    },

    get(req, res) {
        companyDAO.get(req.params.id)
        .then(company => res.json(company))
        .catch(errorHandler(res));
    },

    
    getAll(req, res) {
        
        companyDAO.getAll()
        .then(companys => res.json(companys))
        .catch(errorHandler(res));
    },

}