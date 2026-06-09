// Post 모델 — 작성자는 이제 문자열이 아니라 별도 User 테이블이다.
// Post엔 userId(FK)만 두고(연결은 models/index.js), 조회 시 include로 post.author(객체)가 붙는다.
const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define("Post", {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
  });
