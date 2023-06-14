const userModel = require('../Models/userModel');
const houseModel = require('../Models/houseModel');
const jwt = require('jsonwebtoken')
const bcrypt=require('bcrypt')

// User creates
const usersignup = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        // Perform validation checks
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required.' });
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }

    // Validate password 
    // At least one uppercase letter ((?=.*[A-Z]))// At least one lowercase letter ((?=.*[a-z]))  //At least one digit ((?=.*\d))// Minimum length of 6 characters ([a-zA-Z0-9]{6,})
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: 'Password should have at least 6 characters, including one uppercase letter, one lowercase letter, and one digit.'
            });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name,
            email,
            password: hashpassword
        });

        await newUser.save();
        return res.status(201).json({ message: "user created sucessfully ",newUser });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};




const userLogin = async (req, res) => {
    try {
        let { email, password } = req.body;

        // Perform validation checks
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password.' });
        }

        let token = jwt.sign(
            {
                userId: user._id.toString(),
            },
            "realstate",
            { expiresIn: "100d" }
        );

        res.status(200).send({ status: true, message: "Login successful", token: token });
        res.setHeader("x-api-key",token)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports = { usersignup, userLogin }







