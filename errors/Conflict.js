class BadRequestError {
    constructor(invalidData) {
        this.code = 'CONFLICT';
        this.data = invalidData;
    }
}

module.exports = BadRequestError;
