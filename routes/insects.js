const express = require('express');
const router = express.Router();
const insectsController = require('../controllers/insectsController');

router.get('/', insectsController.getAllInsects);
router.get('/:id', insectsController.getInsectById);
router.post('/', insectsController.createInsect);
router.put('/:id', insectsController.updateInsect);
router.delete('/:id', insectsController.deleteInsect);

module.exports = router;
