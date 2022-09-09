const express = require('express');
const attendanceController = require('../controllers/attendance.controller');
const attendanceRouter = express.Router();

attendanceRouter.get('/all', attendanceController.getAll);

attendanceRouter.get('/:id', attendanceController.getOne);
attendanceRouter.get('/getBySeancesId/:id', attendanceController.getBySeanceId);
attendanceRouter.get('/getOneBySeancesIdAndStudentId/:seanceId/:studentId', attendanceController.getBySeanceIdAndStudentId);
attendanceRouter.post('/', attendanceController.create);

attendanceRouter.patch('/:id', attendanceController.update);

attendanceRouter.delete('/:id', attendanceController.delete);
attendanceRouter.delete('byStudentId/:id', attendanceController.deleteByStudentId)

module.exports = attendanceRouter;
