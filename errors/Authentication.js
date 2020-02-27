class BadRequestError {
    constructor(data) {
        this.code = 'AUTH_ERROR';
        this.data = data;
    }
}

module.exports = BadRequestError;
