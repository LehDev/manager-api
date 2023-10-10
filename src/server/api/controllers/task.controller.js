const rfr = require('rfr');
const Errors = rfr('src/server/lib/errors')
const { TaskManagerModel } = rfr('src/server/api/models/task.model');

class TaskManager {
	// METHOD LIST
	list() {
		console.log('controller - taskManager - list');

		const task = new TaskManagerModel();
		task.list = task.list();

		return task.list.then(res => {
			console.log("taskManager - list - sucess!");
			return res
		}).catch(error => {
			throw Errors.PRECONDITION_FAILED(error);
		});
	};

	// METHOD GET
	getTask(param) {
		console.log('controller - taskManager - getTask');

		if (!param) {
			throw Errors.PRECONDITION_FAILED({
				message: `no parameters described`,
			});
		};

		const task = new TaskManagerModel();
		task.getTask = task.getTask(param)

		return task.getTask.then(res => {
			console.log("taskManager - getTask - sucess!");
			return res
		}).catch(error => {
			throw Errors.PRECONDITION_FAILED(error);
		});
	};

	// METHOD CREATE
	create(params) {
		console.log('controller - taskManager - create');

		const { name, description } = params;
		const obligatory = ['name', 'description'];

		obligatory.map(param => {
			if (!params[param]) {
				throw Errors.PRECONDITION_FAILED({ message: `${param}_is_a_obligatory_param` });
			}
		});

		const createTask = new TaskManagerModel();
		createTask.create = createTask.create({ name, description })

		return createTask.create.then(res => {
			console.log("OK");
			return res
		}).catch(error => {
			throw Errors.PRECONDITION_FAILED(error);
		});

	}

	// METHOD UPDATE
	update({ id, dataToUpdate }) {
		console.log('controller - taskManager - update');

		if (!id) {
			throw Errors.PRECONDITION_FAILED({
				message: `no id described`,
			});
		};

		if (!dataToUpdate) {
			throw Errors.PRECONDITION_FAILED({
				message: `no data to update described`,
			});
		};

		const task = new TaskManagerModel();
		const taskExist = task.getTask = task.getTask(id)
		if (!taskExist) {
			throw Errors.NOT_FOUND({
				message: `task not found: ${id}`,
			});
		};

		task.update = task.update({ id, dataToUpdate })

		return task.update.then(res => {
			console.log("OK");
			return res
		}).catch(error => {
			throw Errors.PRECONDITION_FAILED(error);
		});
	};

	// METHOD DELETE
	delete(id) {
		console.log('controller - taskManager - delete');

		if (!id) {
			throw Errors.PRECONDITION_FAILED({
				message: `no id described`,
			});
		};

		const task = new TaskManagerModel();
		const taskExist = task.getTask = task.getTask(id)
		if (!taskExist) {
			throw Errors.NOT_FOUND({
				message: `task not found: ${id}`,
			});
		};

		task.delete = task.delete(id)

		return task.delete.then(res => {
			console.log("OK");
			return res
		}).catch(error => {
			throw Errors.PRECONDITION_FAILED(error);
		});
	};
};

module.exports = { TaskManager }
