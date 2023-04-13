import mongoose from "mongoose";

mongoose.connect("mongodb+srv://alura:123@alura.s4rl5mm.mongodb.net/Node-Express");

let db = mongoose.connection;

export default db;