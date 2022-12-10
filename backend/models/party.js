const mongoose = require("mongoose");

const PartySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    priacy: {
        type: Boolean
    },
    userId: {
        type: mongoose.ObjectId
    }
});

// Criando o modulo do eschima
const Party = mongoose.model("Party", PartySchema)

// Exportando o modulo 
module.exports = Party;