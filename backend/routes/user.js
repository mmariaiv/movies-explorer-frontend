const router = require('express').Router();
const {
  getCurrentUser,
  updateUserInfo,
} = require('../controllers/user');
const {
  createUserValidation,
} = require('../utils/validation/createUserValidation');

router.get('/me', getCurrentUser);

router.patch('/me', createUserValidation, updateUserInfo);

module.exports = router;
