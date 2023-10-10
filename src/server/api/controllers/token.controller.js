const rfr = require('rfr');
const Errors = rfr('src/server/lib/errors');
const { TokenModel } = rfr('src/server/api/models/token.model')

class Token {
	getToken(token) {
		console.log('controller - token - getToken');

		const Token = new TokenModel(token);
		Token.getToken = Token.getToken(token)

		Token.getToken.then(res => {
			console.log("token - getToken - success!");
			return res
		}).catch(error => {
			throw Errors.UNAUTHORIZED(error);
		});
	};

	create(params) {
		console.log('controller - token - create');

		const {  id, token, expireDate  } = params;
		const obligatory = ['id', 'token','expireDate'];

		obligatory.map(param => {
			if (!params[param]) {
				throw Errors.PRECONDITION_FAILED({ message: `${param}_is_a_obligatory_param` });
			}
		});

		const Token = new TokenModel();
		Token.create = Token.create({id, token, expireDate} )

		Token.create.then(res => {
			console.log("token - create - success!");
			return res
		}).catch(error => {
			throw Errors.UNAUTHORIZED(error);
		});
	};
};

module.exports = { Token }
