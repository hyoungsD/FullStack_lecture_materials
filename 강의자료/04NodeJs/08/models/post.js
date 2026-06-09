const { DataTypes } = require("sequelize")

module.exports = (sequelize) => 
    sequelize.define("Post", {
        title : {type: DataTypes.STRING, allowNull: false},
        content : {type: DataTypes.TEXT, allowNull: false},
        author : {type: DataTypes.STRING}
    });