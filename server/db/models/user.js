const Sequelize = require("sequelize");
const db = require("../database");
const bcrypt = require("bcrypt");

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

User.generateHashedPassword = (password) => {
  const hashedPassword = bcrypt.hash(password, bcrypt.genSaltSync(10));
  return hashedPassword;
};

User.prototype.validatePassword = (password) => {
  return bcrypt.compare(password, this.password);
};

User.beforeCreate(async (user) => {
  try {
    user.password = await User.generateHashedPassword(user.password);
  } catch (err) {
    console.log(err);
  }
});

User.updatePassword = async (user, oldPassword, newPassword) => {
  if (user.validatePassword(oldPassword)) {
    try {
      user.password = await User.generateHashedPassword(newPassword);
    } catch (err) {
      console.log(err);
    }
  } else {
    await Promise.reject(new Error("Error, passwords do not match."));
  }
};

module.exports = User;
