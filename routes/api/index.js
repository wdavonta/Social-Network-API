const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');


router.use('/comments', thoughtRoutes);
router.use('/pizzas', userRoutes);

module.exports = router;