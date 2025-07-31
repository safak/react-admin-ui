const Router = require('express');
const router = new Router();

const brandRouter = require('./brandRouter');
const deviceRouter = require('./deviceRouter');
const userRouter = require('./userRouter');
const typeRouter = require('./typeRouter');


router.use('/user',userRouter);
router.use('/brand', brandRouter);
router.use('/type', typeRouter);
router.use('/device', deviceRouter);

module.exports = router; 
