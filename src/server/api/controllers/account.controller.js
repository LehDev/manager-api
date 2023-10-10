const rfr = require('rfr');
const Errors = rfr('src/server/lib/errors');
const { AccountModel } = rfr('src/server/api/models/account.model')

class Account {
	getID(id) {
		console.log('controller - account - getID');

		const account = new AccountModel(id);
		account.getID = account.getID(id)

		account.getID.then(res => {
			return res
		}).catch(error => {
			throw Errors.UNAUTHORIZED(error);
		});
	};
};

module.exports = { Account }
