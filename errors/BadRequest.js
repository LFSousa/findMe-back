class BadRequestError {
    constructor(invalidData) {
        this.code = 'BAD_REQUEST';
        this.data = invalidData;
    }
}

module.exports = BadRequestError;
