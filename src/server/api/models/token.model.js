const rfr = require('rfr');
const Errors = rfr('src/server/lib/errors');
const knex = rfr('src/server/lib/db');

class TokenModel {
	getToken(token) {
		console.log('model - token - getToken');

		async function getToken() {
			const row = await knex
				.first('token.accountId')
				.from('token')
				.join('account', 'account.id', '=', 'token.accountId')
				.where('token.token', '=', token)

			if (!row) {
				throw Errors.NOT_FOUND([{ key: 'error_404_token', data: { token } }]);
			}
			return row.accountId;
		}

		return getToken();
	};

	create({ id, token, expireDate }) {
		console.log('model - token - create');
		async function create() {
			const insert = knex('token').insert({ accountId: id, token: token, expiresAt: expireDate });
			return await insert;
		};

		return create();
	};
}

module.exports = { TokenModel }
