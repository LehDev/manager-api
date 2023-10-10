const rfr = require('rfr');
const knex = rfr('src/server/lib/db');
const Errors = rfr('src/server/lib/errors');

class TaskManagerModel {
	list() {
		console.log('model - taskManager - list');

		async function listTask() {
			let query = await knex
				.select('task.*')
				.from('task')
				.orderBy('task.name');


			const rows = await query;

			// if the user does not exists throw an exception
			if (!rows) {
				throw Errors.NOT_FOUND({
					message: `no tasks registered					`,
				});
			}

			return rows.map(row => {
				const task = {
					id: row.id,
					name: row.name,
					description: row.description,
					wasDone: row.wasDone
				};
				return task;
			})
		};

		return listTask();
	};

	getTask(param) {
		console.log('model - taskManager - getID');

		async function getTask() {
			let query = await knex
				.select('task.*')
				.from('task')
				.where('task.id', param)
				.orWhere('task.name', param)

			const [row] = await query;

			// if the user does not exists throw an exception
			if (!row) {
				throw Errors.NOT_FOUND({
					message: `task not found: ${param}`,
				});
			}

			const task = {
				id: row.id,
				name: row.name,
				description: row.description,
				wasDone: row.wasDone
			};

			return task;
		};

		return getTask();
	};

	create(params) {
		console.log('model - taskManager - create');

		const { name, description } = params
		async function create() {
			const dataToInsert = {
				name,
				description,
				wasDone: "no",
				created: new Date(),
				updated: new Date(),
			};
			const insert = knex('task').insert(dataToInsert)
			return await insert;
		};

		return create();
	};

	update({ id, dataToUpdate }) {
		console.log('model - taskManager - update');
		const { name, description } = dataToUpdate
		async function update() {
			const dataToUpdate = {
				name: name,
				description: description,
				wasDone: "yes",
				updated: new Date(),
			};
			const insert = knex('task').where('id', id).update(dataToUpdate)
			return await insert;
		};

		return update();
	};

	delete(id) {
		console.log('model - taskManager - delete');

		async function remove() {
			const remove = knex('task').where('id', id).del();
			return await remove;
		};

		return remove();
	};
};

module.exports = { TaskManagerModel }
