// User 모델 — sequelize 인스턴스를 받아 정의해서 돌려준다(models/index.js가 연결을 넘겨줌).
const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define("User", {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
  });
