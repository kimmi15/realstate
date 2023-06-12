const express = require('express');
const router = express.Router();
const UserController = require("../Controllers/userControllers")
const HouseController = require("../Controllers/housesControllers")

//User

router.post('/userregister',UserController.usersignup)
router.post('/userlogin',UserController.userLogin);

// House
router.get("/houses",HouseController.houses)

router.post('/user/:userId/like/:houseId',HouseController.houseslike);

router.post('/user/:userId',HouseController.likedHouses)

router.get('/house/:houseId',HouseController.viewHouseDetails)



module.exports = router;

