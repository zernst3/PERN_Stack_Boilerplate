// database
const db = require("./database");

// models
const thing = require("./models/thing");
const user = require("./models/user");

// associations

module.exports = { db, thing, user };
