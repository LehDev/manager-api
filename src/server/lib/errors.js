const errors = {};
errors.UNAUTHORIZED = () => new ApiError(401, null, 'unauthorized');
errors.FORBIDDEN = () => new ApiError(403, null, 'forbidden');
errors.NOT_FOUND = arr => new ApiError(404, arr, 'not_found');
errors.PRECONDITION_FAILED = arr => new ApiError(412, arr, 'precondition_failed');
errors.INTERNAL_SERVER_ERROR = () => new ApiError(500, null, 'internal_server_error');

/**
 * Error class to be used in the frontend to handle REST erros.
 */
class ApiError extends Error {
	/**
	 * Constrcutor.
	 * @param {Integer} statusCode error code
	 * @param {Array} errors array of errors [{ key, data }]
	 * @param {String} errors error title
	 */
	constructor(statusCode, errors, title) {
		super(title);
		this.name = 'ApiError';
		// Error body
		this.errors = errors;
		this.statusCode = statusCode;
		this.isApiError = true;

		if (Error.hasOwnProperty('captureStackTrace')) {
			Error.captureStackTrace(this, ApiError);
		}
		this.stack = new Error(title).stack;
	}
}

module.exports = errors;
