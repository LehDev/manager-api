// Global
const express = require('express');
const rfr = require('rfr');
const { get } = require('lodash');
const knex = require('knex');
// Local
const Route = rfr('src/server/middleware/prepareRoute');
const Handler = rfr('src/server/lib/handler');
const { Auth } = rfr('src/server/api/controllers/auth.controller');

const router = express.Router();

/**
 * Acess login the user.
 */

router.post('/login', Route.prepareRoute(Auth), (req, res) => {
	console.log('route - auth - login');

/* 	const user = get(req, 'body.user', null);
	const password = get(req, 'body.password', null);
	const promise = req.model.Auth.login(user, password) */

	const auth = new Auth();
	const promise = auth.login("userTest", "204863")

	Handler.json(res, promise);
});

module.exports = {
	path: '/auth',
	router,
};
