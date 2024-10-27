const router = require('express').Router();

const { getUsers, register, login, addCategory,  verifyEmail } = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');

router.route('/userinfo').get(authMiddleware,getUsers);
router.route('/login').post(login);
router.route('/signup').post(register);
router.route('/verifyemail').post(authMiddleware, verifyEmail);
router.route("/addcategory").post( authMiddleware, addCategory);

module.exports = router;