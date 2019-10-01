// the logic for our  stuff  routes

const express = require('express'); 
const router = express.Router();

// import controller
const stuffCtrl = require('../controllers/stuff'); 

router.get('/', stuffCtrl.getAllStuff); 
router.post('/', stuffCtrl.createThing); 
router.get('/:id', stuffCtrl.getOneThing);
router.put('/:id', stuffCtrl.modifyThing);
router.delete('/:id', stuffCtrl.deleteThing);

module.exports = router;