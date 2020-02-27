class BadRequestError {
    constructor(data) {
        this.code = 'INTERNAL_ERROR';
        this.data = data;
    }
}

module.exports = BadRequestError;
