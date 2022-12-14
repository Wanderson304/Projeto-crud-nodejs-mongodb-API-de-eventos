// route to return database users 

const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

// get an user
router.get("/:id", async(req, res) => {

    const id = req.params.id;

    // veery User
    try {

        const user = await User.findOne({ _id: id }, { password: 0 });

        res.json({ error: null, user });


    } catch (err) {

        return res.status(400).json({ error: "O usuário não existe!" });

    }



});

module.exports = router;