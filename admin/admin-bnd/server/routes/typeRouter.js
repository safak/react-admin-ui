const Router = require('express');
const router = new Router();
const TypeController = require('../controllers/typeController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware'); 



router.post('/',checkRoleMiddleware('ADMIN') ,TypeController.create);
router.get('/', TypeController.getAll);
// router.get('/', (req, res) => {
//   res.json({ message: 'All types returned' });
// });

module.exports = router;
