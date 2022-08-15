const UserService = require('../services/user.service');
// TODO : handle cases when find might return empty array or not obj
// TODO : ADD Service layer & clean up controller

class userController {
	static getAll = async (_, res, next) => {
		try {
			return res.status(200).json(await UserService.findAll());
		} catch (err) {
			next(err);
		}
	};
	static getTeachers = async (_, res, next) => {
		try {
			return res.status(200).json(await UserService.findAll({ teachers: true }));
		} catch (err) {
			next(err);
		}
	};
	static getAgents = async (_, res, next) => {
		try {
			return res.status(200).json(await UserService.findAll({ agents: true }));
		} catch (err) {
			next(err);
		}
	};
	static getStudents = async (_, res, next) => {
		try {
			return res.status(200).json(await UserService.findAll({ students: true }));
		} catch (err) {
			next(err);
		}
	};

	static create = async (req, res, next) => {
		const { firstname, lastname, email, password, phoneNumber, birthDate, role } = req.body;
		// const newUser = {
		// 	firstname,
		// 	lastname,
		// 	email,
		// 	password,
		// 	phoneNumber,
		// 	birthDate
		// };
		if (role === null || role === undefined || role === "") {
			role = "1"
		}
		const newUser = {
			firstname,
			lastname,
			phoneNumber,
			birthDate,
			email,
			password,
			image: req.files.image, 
			role
		};
		console.log(newUser)
		try {
			await UserService.create(newUser);

			return res
				.status(201)
				.json({ message: `${newUser.firstname} created.Please confirm your account.` });
		} catch (err) {
			console.log(err);

			next(err);
		}
	};

	static getOne = async (req, res, next) => {
		const id = req.params.id;
		try {
			const user = await UserService.findOne(id);
			return res.status(200).json(user);
		} catch (err) {
			next(err);
			// res.status(404).json({ error: `user ${id} not found` });
		}
	};

	static update = async (req, res, next) => {
		const { firstname, lastname, email, password, phoneNumber, birthDate,salaire } = req.body;
		let updatedUser = {
			firstname,
			lastname,
			email,
			password,
			phoneNumber,
			birthDate,
			salaire
		};
		const id = req.params.id;
		try {
			updatedUser = UserService.updateOne(id, updatedUser);
			return res.status(204).json(updatedUser);
		} catch (err) {
			console.log(err);
			// console.log(err);
			next(err);
			// res.status(404).json({ error: `user with ${id} not found` });
		}
	};
	static delete = async (req, res, next) => {
		const id = req.params.id;
		try {
			await UserService.deleteOne(id);
			return res.status(200).json({ message: `user ${id} deleted` });
		} catch (err) {
			next(err);
			// return res.status(500).json({ error: `Somethign went wrong when deleting user ${id}` });
		}
	};
	static StudentCount = async (req, res, next) => {
		const studentC = User.count({ where: { role: 1 } });
		if (!studentC) {
			res.status(500).json({ success: false })

		}
		studentC.then(function (result) {
			res.send({
				count: result
			})
		});
	}
}

module.exports = userController;
