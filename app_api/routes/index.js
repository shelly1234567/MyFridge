
var express = require('express');
var router = express.Router();
var ctrlFood = require('../controllers/food');

// food
router.get('/food', ctrlFood.foodDetail);
router.post('/food', ctrlFood.foodCreate);
router.get('/food/:foodid', ctrlFood.foodReadone);
router.put('/food/:foodid', ctrlFood.foodUpdate);
router.delete('/food', ctrlFood.foodDelete);

module.exports = router;