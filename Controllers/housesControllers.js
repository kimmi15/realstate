const userModel = require("../Models/userModel");
const House = require("../Models/houseModel");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;


//Find ALL House
const houses = async (req, res) => {
  try {
    try {
      const houses = await House.find({}, {bathroomsTotalInteger:1, bedroomsTotal:1 ,buildingAreaTotal:1 ,price:1, address:1, media:1,}).limit(req.query.limit ? +req.query.limit : 10  );
      res.status(200).json(houses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Like a house by ID

const houseslike = async (req, res) => {
  const { userId, houseId } = req.params;

  try {
    if (!userId || !houseId) {
      return res.status(400).json({ message: 'User ID and house ID are required' });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const house = await House.findById(houseId);
    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }

    const alreadyLiked = user.likedHouses.includes(houseId);
    if (alreadyLiked) {
      return res.status(404).json({ message: 'House is already liked' });
    }

    user.likedHouses.push(houseId);
    await user.save();

    res.status(200).json({ message: user});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// View liked houses of a user

const likedHouses = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userModel.findById(userId).populate({path:"likedHouses",select:'bathroomsTotalInteger bedroomsTotal buildingAreaTotal price address media'});

    return res.status(200).json({ likedHouses: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};








// View house details by ID
const viewHouseDetails = async (req, res) => {
  const { houseId } = req.params;

  try {
    const house = await House.findById(houseId).select({
      bathroomsTotalInteger: 1,
      bedroomsTotal: 1,
      buildingAreaTotal: 1,
      price: 1,
      address: 1,
      media: 1,
    });

    if (house) {
      res.json(house);
    } else {
      res.status(404).json({ error: 'House not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching house details' });
  }
};





module.exports = { houses,houseslike ,likedHouses,viewHouseDetails};

