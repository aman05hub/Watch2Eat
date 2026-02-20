const express = require('express');
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
})

/* POSt /api/food/ */
router.post('/', 
    authMiddleware.authFoodPartnerMiddleware, 
    upload.single("video"), 
    foodController.createFood)

/* GET  /api/food/ */
router.get('/',
    authMiddleware.authUserMiddleware, 
    foodController.getFoodItems);

router.post('/like', 
    authMiddleware.authUserMiddleware, 
    foodController.likeFood
)

router.post('/save',
    authMiddleware.authUserMiddleware,
    foodController.saveFood
)

router.get('/save',
    authMiddleware.authUserMiddleware,
    foodController.getSavedFoods
)

router.post('/comment',
    authMiddleware.authUserMiddleware,
    foodController.commentOnFood
)

router.get('/comments/:id',
    authMiddleware.authUserMiddleware,
    foodController.getFoodComments
)

module.exports = router;