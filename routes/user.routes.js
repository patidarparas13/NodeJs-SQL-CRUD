var express = require('express');
var router = express.Router();
const {createUserController,findUsersController,updateUserController,deleteUserController} = require('../controllers/user.controller')

/* GET users listing. */
router.post('/createUser',[],createUserController);
router.post('/findUsers',[],findUsersController);
router.put('/updateUser',[],updateUserController);
router.delete('/deleteUser',[],deleteUserController);
module.exports = router;
