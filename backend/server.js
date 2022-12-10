// Modules
const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const cors = require("cors");

// Routes 
const authRouter = require("./routes/authRoutes.js")
const userRouter = require("./routes/userRoutes.js")

// Middlewares

// Config
const dbName = "partytimeb"
const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// Atrelar as rotas no express 
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Conexão mongoDB
mongoose.connect(
    `mongodb://192.168.238.139/${dbName}`, {
        // As variaveis abaixo não são mais suportada no MongoDB 6
        // useNewUrlParser: true,
        // useFindAndModify: false,
        // useUnifiedTopology: true
    }
);

app.get("/", (req, res) => {

    res.json({ message: "Rota teste!" })

});

app.listen(port, () => {
    console.log(`O backend está rodando na porta  ${port}`);
})