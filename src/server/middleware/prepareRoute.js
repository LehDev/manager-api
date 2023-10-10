// global
const rfr = require('rfr');
// local
const { Auth } = rfr('src/server/api/controllers/auth.controller');
const JWT = rfr('src/server/lib/jwt');
const Handler = rfr('src/server/lib/handler');
const Errors = rfr('src/server/lib/errors');
const knex = rfr('src/server/lib/db');
/**
 * Extract must extract the token from request Header.
 * @param  {object} req HTTP Request Object.
 * @return {string}     Token from header.
 */
const extract = function (req) {
	console.log('middleware - prepareroute - extract');
	const token = req.headers.authorization ? req.headers.authorization : '';
	return token.replace(new RegExp('bearer ', 'i'), '');
};

/**
 * Wrapper function to inject the database object and the current user inside each model class.
 * @param {DatabaseObject} knex Database object.
 * @param {Array} models        Array of models to be created
 */
const prepare = function (model) {
	console.log('middleware - prepareroute - prepare');

	let instance = new model();
	return instance;
};

/**
 * Used to create a transaction that can be used in the models.
 */
const createTransaction = function () {
	console.log('middleware - prepareroute - createTransaction');
	return new Promise((resolve, reject) => {
		knex.transaction(resolve).catch(err => err)
	});
};

/**
 * Create a new instance for each model used in the Routes.
 */
const prepareRoute = model =>
	async (req, res, next) => {
		console.log('middleware - prepareroute - prepareRoute');
		const knex = await createTransaction();
		res.trx = knex;
		req.models = prepare(knex, null, model);
		next();
	};
/**
 * Route middleware that will check:
 * - if the token provided is valid and it's from a logged user.
 * - if the user has access to this feature.
 * @param {Array} models List of models to instanciated.
 */
const prepareAuthRoute = model =>
	async (req, res, next) => {
		console.log('middleware - prepareroute - prepareAuthRoute');
		const knex = await createTransaction();
		res.trx = knex;
		// extract the token from the request
		const token = extract(req);
		req.token = token;

		let iAuth;
		let currentUser;
		try {
			// verify if the token is valid
			JWT.verify(token);
			// check if the user is logged and get the user
			iAuth = new Auth();
			currentUser = iAuth.isLogged(token);

		} catch (err) {
			return Handler.error(res, Errors.UNAUTHORIZED());
		}

		// add the user to the request
		req.currentUser = currentUser;
		// add the models to the request
		req.models = prepare(model);
		req.models.Auth = iAuth;

		req.headers = Object.keys(req.headers).reduce((acc, key) => {
			return { ...acc, [key]: key === 'metadata' ? JSON.parse(req.headers[key]) : req.headers[key] };
		}, {});

		next();
	};

module.exports = {
	prepareRoute,
	prepareAuthRoute,
};
