var Faq = require('./company.controller');
let router = require('express').Router();

router.get('/', Faq.getAll);

module.exports = router;