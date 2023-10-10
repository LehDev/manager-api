const rfr = require('rfr');
const knex = rfr('src/server/lib/db');

class AccountModel {
	getID(id) {
		console.log('model - account - getID');

		async function getID() {
			let query = await knex
				.select('a.*')
				.from('account as a')
				.where('a.id', id);

			const [row] = await query;

			// if the user does not exists throw an exception
			if (!row) {
				throw Errors.UNAUTHORIZED();
			}

			const account = {
				id: row.id,
				user: row.user,
				status: row.status,
			};

			return account;
		};
		return getID();
	};
};

module.exports = { AccountModel }
