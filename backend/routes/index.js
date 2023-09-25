const router = require('express').Router();
const userRouter = require('./user');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/notFoundError');
const { login, createUser } = require('../controllers/auth');
const auth = require('../middlewares/auth');
const { signupValidation } = require('../utils/validation/signupValidation');
const { signinValidation } = require('../utils/validation/signinValidation');

router.post('/signup', signupValidation, createUser);

router.post('/signin', signinValidation, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', moviesRouter);
router.use((req, res, next) => {
  next(new NotFoundError('Был запрошен несуществующий роут'));
});

module.exports = router;
