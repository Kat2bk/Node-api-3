class BaseError extends Error {
    constructor(statusCode, message) {
        super();

    this.statusCode = statusCode;
    this.message = message;
    }
}

// returning a unique response to the user
const handleError = (err, res) => {
const {statusCode, message} = err;
res.status(statusCode).json({
    status: "error",
    statusCode,
    message
    });
};


module.exports = {
    BaseError,
    handleError
}