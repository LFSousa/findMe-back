class BadRequestError {
    constructor(data) {
        this.code = 'PERMISSION_ERROR';
        this.data = data;
    }
}

module.exports = BadRequestError;
