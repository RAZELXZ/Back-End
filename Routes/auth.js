const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const registerValidation = require("../validation/registerValidation");
const jwt = require("jsonwebtoken");
const reqireAuth = require('../middleware/permission');

router.get("/test", (req, res) => {
    res.send("Auth route is working")
})

router.post("/register",  async (req, res) => {
    try {
        const {errors, isValid} = registerValidation(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const existingEmail = await User.findOne({
            email : new RegExp("^" + req.body.email + "$", "i"),
        });
        if (existingEmail) {
            return res.status(400).json({error : "There is already a user with this email."})
        }
        const Hashedpassword = await bcrypt.hash(req.body.password, 12);
        const newUser = new User({   
            email: req.body.email,

            password: Hashedpassword,
            name: req.body.name,
        })
        const savedUser = await newUser.save();
        const payload = {userId: savedUser._id};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });
        res.cookie("access-token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly : true,
            secure: process.env.NODE_ENV === "production",
        });

        const userToReturn = {...savedUser._doc };
        delete userToReturn.password;

        return res.json(userToReturn);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            email: new RegExp("^" + req.body.email + "$", "i"),
        })

        if (!user) {
            return res.status(400).json({error: 'There was a problem with your login credentials.'});
        }
        const matchPassword = await bcrypt.compare(req.body.password, user.password);
        if (!matchPassword) {
            return res.status(400).json({error: 'There was a problem with your login credentials.'});
        }
        const payload = {userId: user._id};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });
        res.cookie("access-token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly : true,
            secure: process.env.NODE_ENV === "production",
        });
        const userToReturn = {...user._doc};
        delete userToReturn.password;

        return res.json({
            token: token,
            user: userToReturn,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
})



router.get("/current", reqireAuth, (req, res) => {
    if (!req.user) {
        return res.status(401).send(Unauthorized);
    }

    return res.json(req.user);
})

router.put("/logout", reqireAuth, async (req, res) => {
    try {
        res.clearCookie("access-token");
        return res.json({success: true});
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
})



module.exports = router;