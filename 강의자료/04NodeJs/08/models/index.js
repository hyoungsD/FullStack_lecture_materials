const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "../board.db"),
    logging: false
});
const Post = require("./post")(sequelize);

module.exports = { sequelize, Post}