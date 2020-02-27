const ConflictError = require('./Conflict');
const BadRequestError = require('./BadRequest');

let errorHandler = res => error => {
    // console.log(error)
    switch(error.code) {
        case 'BAD_REQUEST':
            return res.status(400).json({ error: error });
        case 'AUTH_ERROR':
            return res.status(401).json({ error: error });
        case 'NOT_FOUND':
            return res.status(404).json({ error: error });
        case 'ER_DUP_ENTRY':
            return res.status(409).json({ error: new ConflictError([{ message: error.sqlMessage }]) });
        case 'ER_NO_REFERENCED_ROW_2':
            console.log(error.sqlMessage)
            return res.status(409).json({ error: new BadRequestError() });
        default:
            console.log(error)
            return res.status(500).json({ error: error });
    }
}

module.exports = errorHandler;
