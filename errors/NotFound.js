class BadRequestError {
    constructor(invalidData) {
        this.code = 'NOT_FOUND';
        this.data = invalidData;
    }
}

module.exports = BadRequestError;
