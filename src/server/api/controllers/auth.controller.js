const rfr = require('rfr');
const Errors = rfr('src/server/lib/errors');
const { AuthModel } = rfr('src/server/api/models/auth.model');

class Auth {
	login(user, password) {
		console.log('controller - auth - login');

		if (!user || !password) {
			throw Errors.PRECONDITION_FAILED({
				message: `no parameters described`,
			});
		};

		const auth = new AuthModel();
		auth.login = auth.login(user, password)

		return auth.login.then(res => {
			console.log("Ok!");
			return res
		}).catch(error => {
			throw Errors.UNAUTHORIZED(error);
		});
	};

	isLogged(token) {
		console.log('controller - auth - isLogged');

		if (!token) {
			throw Errors.PRECONDITION_FAILED({
				message: `no token described`,
			});
		};

		const auth = new AuthModel();
		auth.isLogged = auth.isLogged(token)

		return auth.isLogged.then(res => {
			console.log("auth - isLogged - success!");

			return res
		}).catch(error => {
			throw Errors.UNAUTHORIZED(error);
		});
	};
};

module.exports = { Auth }
