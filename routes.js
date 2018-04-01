//auth_router.js

const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require(`${__dirname}/../controllers/auth_controller.js`);

router.get('/login', passport.authenticate('auth0', { 
  successRedirect: '/api/auth/setUser', 
  failureRedirect: '/api/auth/login', 
  failureFlash: true 
}));

router.get('/setUser', authController.setUser);
router.get('/authenticated', authController.sendUserToClient);
router.post('/logout', authController.logout);

module.exports = router;

//friend_router.js

const express = require('express');
const router = express.Router();
const friend_controller = require(`${__dirname}/../controllers/friend_controller.js`);

router.get('/list', friend_controller.list);
router.post('/add', friend_controller.add);
router.post('/remove', friend_controller.remove);

module.exports = router;




//recommended_router.js

const express = require('express');
const router = express.Router();
const recommended_controller = require(`${__dirname}/../controllers/recommended_controller.js`);

router.post('/', recommended_controller.find);
router.post('/add', recommended_controller.add);

module.exports = router;




//user_router.js

const express = require('express');
const router = express.Router();
const user_controller = require(`${__dirname}/../controllers/user_controller.js`);

router.post('/patch/:id', user_controller.patch);
router.get('/list', user_controller.list);
router.get('/search', user_controller.search);

module.exports = router;