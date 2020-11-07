const Sequelize = require("sequelize");
const db = require("../database");

module.exports = db.define("thing", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  description: {
    type: Sequelize.TEXT,
  },
});
