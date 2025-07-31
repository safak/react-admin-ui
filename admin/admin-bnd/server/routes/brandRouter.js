const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brandController');

router.post('/', brandController.create);
router.get('/', brandController.getAll);
// router.get('/', (req, res) => {
//   res.json({ message: 'All brands returned' });
// });

module.exports = router;
