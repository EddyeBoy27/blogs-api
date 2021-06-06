const express = require('express');

const UserRoute = require('./controllers/UserRoutes');
const PostRoute = require('./controllers/PostRoutes');
const UserController = require('./controllers/UserController');
const endPointController = require('./controllers/endPointController');
const ErrorController = require('./controllers/errorController');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/login', UserController.loginUser);

app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use(ErrorController);

app.all('*', endPointController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
