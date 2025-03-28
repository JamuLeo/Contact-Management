const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode);

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: process.env.NODE_ENV !== "production" ? err.stack : undefined,
            });
            break;

        case constants.UNAUTHORIZED: // Fixed spelling mistake
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: process.env.NODE_ENV !== "production" ? err.stack : undefined,
            });
            break;

        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: process.env.NODE_ENV !== "production" ? err.stack : undefined,
            });
            break;

        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: process.env.NODE_ENV !== "production" ? err.stack : undefined,
            });
            break;

        case constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: process.env.NODE_ENV !== "production" ? err.stack : undefined,
            });
            break;

        default:
            console.log("No error, all good");
            break;
    }
};

module.exports = errorHandler;
