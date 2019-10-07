// the logic for our  stuff  routes

const express = require('express'); 
const router = express.Router();

// require auth middleware
const auth = require('../middleware/auth');

// require multer middleware
const multer = require('../middleware/multer-config'); 

// import controller
const stuffCtrl = require('../controllers/stuff'); 

router.get('/', auth, stuffCtrl.getAllStuff); 
router.post('/', auth, multer, stuffCtrl.createThing); 
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;