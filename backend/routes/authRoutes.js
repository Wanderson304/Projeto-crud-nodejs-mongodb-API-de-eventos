const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// resgister an user 

router.post("/register", async(req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    // check for required field 
    if (name == null || email == null || password == null || confirmpassword == null) {
        return res.status(400).json({ error: "Por favor, preecha todos os campos!" });
    }

    // check if passwords match 
    if (password != confirmpassword) {
        return res.status(400).json({ error: "As senhas não conferem !" });
    }

    // check if user exists 
    const emailExists = await User.findOne({ email: email });

    if (emailExists) {
        return res.status(400).json({
            error: " O e-mail informado já está sendo usado"
        });
    }

    // create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create user 
    const user = new User({
        name: name,
        email: email,
        password: passwordHash
    });

    try {
        // salva os dados de cadastro no banco
        const newUser = await user.save();

        // realiza o login-in na plataforma. Isso é preferecial !

        // create yoken
        const token = jwt.sign(
            // payload
            {
                name: newUser.name,
                id: newUser._id
            },
            "nossosecret"
        );

        // return token
        res.json({ error: null, msg: "Você realizou o cadstro com sucesso !", token: token, userId: newUser._id })

    } catch (error) {

        res.status(400).json({ error });

    }

});

// login an user
router.post("/login", async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // check if user exists 
    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(400).json({
            error: "Não há um usuário cadastrado com este e-mail"
        });

    }

    // check if password match
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        return res.status(400).json({
            error: "senha inválida"
        });
    }

    // create yoken
    const token = jwt.sign(
        // payload
        {
            name: user.name,
            id: user._id
        },
        "nossosecret"
    );

    // return token
    res.json({ error: null, msg: "Você está autenticado !", token: token, userId: user._id })


});

module.exports = router;