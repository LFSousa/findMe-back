const jwt = require('jsonwebtoken');

const SECRET = 'thisIsmy612en1en1enunsin912921m@@#!!@$2es';

const { InternalError, AuthenticationError } = require('../errors');
const errorHandler = require('../errors/handler');

const decoding = function(token) {
    return new Promise(function(resolve, reject) {
        jwt.verify(token, SECRET, function(error, result) {
            error ? reject(new AuthenticationError(error)) : resolve(result);
        });
    });
}

const tokenUtility = {
    create: function(object) {
        return new Promise(function(resolve, reject) {
            jwt.sign(object, SECRET, function(error, result) {
                error ? reject(new InternalError()) : resolve(result);
            });
        });
    },
    decoding: decoding,
    tokenValidation: (min_rule) => (req, res, next) => {
        if (req.method == 'OPTIONS') return next();

        let token = req.headers['x-access-token'] || req.headers['authorization'] || req.headers['token'];
        if (token && token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }
    
        decoding(token)
        .then(result => {
            req.user = result;
            next();
        })
        .catch(errorHandler(res));
    }
};

module.exports = tokenUtility;
