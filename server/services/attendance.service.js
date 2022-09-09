const Attendance = require('../models/Attendance');
// const ErrorResponse = require('../util/helpers/ErrorResponse');
class attendanceService {
	static async getAll() {
		return await Attendance.findAll();
	}
	static async create(attendance) {
		await Attendance.create(attendance);
	}
	static async update(id, attendance) {
		await Attendance.update(attendance, {
			where: {
				id
			}
		});
	}
	static async deleteByStudentId(id) {
		await Attendance.destroy({
			where: {
				studentId : id
			}
		})
	}
	static async delete(id) {
		await Attendance.destroy({
			where: {
				id
			}
		});
	}
	static async getOne(id) {
		console.log(id);
		const attendance = await Attendance.findByPk(id);

		return attendance;
	}
	static async getAllBySessionId(id) {
		return await Attendance.findAll({
			where: {
				seanceId: id
			}
		});
	}
	static async getOneBySessionIdAndStudentId(seanceId, studentId) {
		return await Attendance.findAll({
			where: {
				seanceId: seanceId,
				studentId: studentId
			}
		});
	}
}

module.exports = attendanceService;
