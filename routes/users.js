var UsersHandler = require('../handlers/users');
var express = require('express');
var router = express.Router();
var usersHandler = new UsersHandler();
var sessionHelper = require('../helpers/session');
var checkAuthentication = sessionHelper.checkAuthentication;
var destroySession = sessionHelper.destroySession;
var checkAdmin = sessionHelper.checkAdmin;


router.get('/checkAuthentication', checkAuthentication, usersHandler.getCurrentUser); //remember sign in user
router.get('/', usersHandler.getAllUsers);
router.post('/', checkAdmin, usersHandler.createUser);
router.post('/signUp', usersHandler.signUp);
router.post('/signIn', usersHandler.signIn);
router.post('/logout', destroySession, usersHandler.logout);
router.patch('/', checkAuthentication,usersHandler.updateUser);
router.delete('/:id',checkAdmin, usersHandler.deleteUser);

module.exports = router;