// global
const rfr = require('rfr');
// local
const Errors = rfr('src/server/lib/errors');
/**
 * Respond the request with a statusCode and a json formated as:
 * { status: statusCode, message: message }
 *
 * @param  {Response}   res             HTTP response
 * @param  {Integer}    statusCode      HTTP code status
 */
const globalHandler = (res, statusCode, message) => {
    console.log('lib - handler - globalHandler');
    console.log(`[${statusCode}]`);
    return res
        .status(statusCode)
        .json({
            statusCode,
            message,
        })
        .end();
};

/**
 * Wrapper for handling error request that are from the REST api or not.
 */
const handlerError = (res, error) => {
    console.log('lib - handler - handlerError');
    if (!error || (!error.isApiError && (!error.statusCode || !error.errors))) {
        console.dir(error);
        error = Errors.INTERNAL_SERVER_ERROR();
    }

    console.dir(error);

    return res
        .status(error.statusCode)
        .json({
            statusCode: error.statusCode,
            title: error.title,
            errors: error.errors,
            message: {
                result: 'error',
                msg: error.errors,
            },
        })
        .end();
};

/**
 * Wrapper for the error handler.
 *
 * @param  {Response}   res   HTTP response
 * @param  {Error}      error
 */
exports.error = handlerError;

/**
 * Wrapper for handling the response as a json.
 *
 * @param  {Response}   res         HTTP response
 * @param  {Promisse}   promise     Promisse executor
 */
exports.json = async (res, promise) => {
    console.log('lib - handler - json');
    let result;
    if (promise) {
        try {
            let r = await promise;
            result = globalHandler(res, 200, r);
        } catch (error) {
            result = handlerError(res, error);
        }
    } else {
        result = handlerError(res, null);
    }
    return result;
};
