const router = require('express').Router();
const routerTalkers = require('./router.talkers');
const routerLogin = require('./router.login');

router.use('/login', routerLogin);
router.use('/talker', routerTalkers);  

module.exports = router;