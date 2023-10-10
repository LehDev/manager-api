// Global
const express = require('express');
const rfr = require('rfr');
const { get } = require('lodash');
const knex = require('knex');
// Local
const Route = rfr('src/server/middleware/prepareRoute');
const Handler = rfr('src/server/lib/handler');
const { TaskManager } = rfr('src/server/api/controllers/task.controller');

const router = express.Router();

/**
 * List all tasks
 */
router.get('/list', Route.prepareAuthRoute(TaskManager), (req, res) => {
	console.log('route - taskManager - list');

	const task = new TaskManager();
	const promise = task.list()

	Handler.json(res, promise);
});

router.get('/:param', Route.prepareAuthRoute(TaskManager), (req, res) => {
	console.log('route - taskManager - getTask');

	const task = new TaskManager();
	const queryParams = req.query;
	// const promise = task.getTask(queryParams)
	const promise = task.getTask(1)

	Handler.json(res, promise);
});

router.post('/', Route.prepareAuthRoute(TaskManager), (req, res) => {
	console.log('route - taskManager - create');
	/* 	const dataToCreate = {
			name: get(req, 'body.name', null),
			description: get(req, 'body.description', null)
		}
		const promise = req.model.TaskManager.create(user, password) */


	const dataToCreate = {
		name: "name teste ",
		description: "description test"
	};
	const task = new TaskManager();
	const promise = task.create(dataToCreate)
	Handler.json(res, promise);
});

router.put('/:id', Route.prepareAuthRoute(TaskManager), (req, res) => {
	console.log('route - taskManager - update');

	/* const id = get(req, 'params.id', null);
		const dataToUpdate = {
		id: req.id,
		name: req.name,
		description: req.description,
		wasDone: req.wasDone
	};
	const promise = req.model.TaskManager.update({ id, dataToUpdate }) */

	const id = 5
	const dataToUpdate = {
		id: 5,
		name: "name teste ",
		description: "description test",
		wasDone: 'yes'
	};
	const task = new TaskManager();
	const promise = task.update({ id, dataToUpdate })
	Handler.json(res, promise);
});


router.delete('/:id/remove', Route.prepareAuthRoute(TaskManager), (req, res) => {
	console.log('route - taskManager - remove');

	/* const id = get(req, 'params.id', null);
		const promise = req.model.TaskManager.delete({ id, dataToUpdate }) */

	const task = new TaskManager();
	const promise = task.delete(14)
	Handler.json(res, promise);
});

module.exports = {
	path: '/taskManager',
	router,
};
