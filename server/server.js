require('dotenv').config();
const express = require('express');

const sequelize = require('./config/db.config');
const Token = require('./services/Token.service');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const errorHandler = require('./middlewares/errorHandler.middleware');
const isAuthenticated = require('./middlewares/isAuthenticated.middleware');
const verifyRole = require('./middlewares/isAuthorized.middleware');

const niveauRouter = require('./routes/niveau-routes');
const classeRouter = require('./routes/classe-routes');
const formationRouter = require('./routes/formation-routes');
const chargeRouter = require('./routes/charge-routes');
const salleRouter = require('./routes/salle-routes');
const noteRouter = require('./routes/note-routes');
const matiereRouter = require('./routes/matiere-routes');


const PORT = process.env.PORT || 8000;

const app = express();

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', niveauRouter);
app.use('/', classeRouter);
app.use('/', formationRouter);
app.use('/', chargeRouter);
app.use('/', salleRouter);
app.use('/', noteRouter);
app.use('/', matiereRouter);


app.use('/user', userRouter);
app.use(authRouter);

// test route for isAuthenticated middleware
app.get('/private', isAuthenticated, (req, res) => {
	return res.sendStatus(200);
});

// test route for revoking token for userId 1
app.get('/revoke', (_, res) => {
	Token.revokeRefreshTokens(1);
	res.send({ revoked: true });
});

// authorization & authentication works
app.get('/test', isAuthenticated, verifyRole('teacher', 'student'), (req, res) => {
	res.sendStatus(200);
});

app.use(errorHandler);

app.listen(PORT, async () => {
	try {
		//await sequelize.sync({ force: true });
	} catch (err) {
		console.log(err);
	}
	console.log(`Listening on ${PORT}`);
});

module.exports = app;
