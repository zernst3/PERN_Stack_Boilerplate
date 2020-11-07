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

User.generateHash = (password) => {
  return bcrypt.hash(password, bcrypt.genSaltSync(10));
};

User.prototype.validatePassword = (password) => {
  return bcrypt.compare(password, this.password);
};

User.beforeCreate(async (user) => {
  try {
    const hashedPassword = await User.generateHash(user.password);
    user.password = hashedPassword;
  } catch (err) {
    console.log(err);
  }
});

User.beforeUpdate(async (user, oldPassword, newPassword) => {
  if (user.validatePassword(oldPassword)) {
    try {
      const hashedPassword = await User.generateHash(newPassword);
      user.password = hashedPassword;
    } catch (err) {
      console.log(err);
    }
  } else {
    await Promise.reject(new Error("Error, passwords do not match."));
  }
});

module.exports = User;
