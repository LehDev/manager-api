// global
const rfr = require('rfr');
const dateFns = require('date-fns');
// local
const JWT = rfr('src/server/lib/jwt');
const Errors = rfr('src/server/lib/errors');
const { AccountModel } = rfr('src/server/api/models/account.model');
const { Token } = rfr('src/server/api/controllers/token.controller');
const Config = rfr('src/server/config');
const knex = rfr('src/server/lib/db');

class AuthModel {
	login(user, password) {
		console.log('model - auth - login');
		console.log(`[${user}][${password}]`);

		async function login() {
			let query = knex
				.select('account.id')
				.from('account')

			const [row] = await query;

			// if the user does not exists thorw an exception
			if (!row) {
				throw Errors.UNAUTHORIZED();
			}

			let token;

			// search active token
			const isThereToken = await knex
				.select('token')
				.from('token')
				.where('accountId', row.id)
				.andWhere('expiresAt', '>', knex.fn.now())
				.orderBy('expiresAt', 'desc')
				.first();

			// validate existing token
			if (isThereToken) {
				try {
					JWT.verify(isThereToken.token);

					token = isThereToken.token;
				} catch (error) {
					console.log("JWT error", error)
				}
			}

			const account = await new AccountModel(knex).getID(row.id);
			// return the data

			if (!token) {
				// generate the token
				token = JWT.create({ id: row.id });
				// save the token for this user ID
				async function logged() {
					const tokenLogged = new AuthModel(knex).logged({
						id: row.id,
						token,
					})

					return await tokenLogged
				}

				return await logged();
			}

			return { account, token };
		};

		return login();
	};

	isLogged(token) {
		console.log('model - auth - isLogged');

		async function isLogged() {
			const { TokenModel } = rfr('src/server/api/models/token.model');
			const { AccountModel } = rfr('src/server/api/models/account.model');

			const accountId = await new TokenModel().getToken(token);
			async function getAccount() {
				return await new AccountModel().getID(accountId)
			}
			return getAccount();
		};

		return isLogged();
	}

	logged(credentials) {
		async function logged() {
			console.log('api - auth - logged');

			const expireDate = dateFns.addDays(new Date(), Config.jwt.expires.time);

			return await new Token(knex).create({
				id: credentials.id,
				token: credentials.token,
				expireDate,
			});

		}
		return logged();
	};

}

module.exports = { AuthModel }
