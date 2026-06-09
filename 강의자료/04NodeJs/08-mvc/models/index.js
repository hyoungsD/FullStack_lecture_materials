// 모델 계층의 입구 — DB 연결을 만들고, 각 모델을 등록하고, 관계를 설정한다.
const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../board.db"), // 09/board.db 파일
  logging: false,
});

// 연결(sequelize)은 여기 한 곳에서만 만들고, 각 모델 파일에 넘겨 정의한다.
// (그래서 모델 파일이 (sequelize) => define(...) 형태의 함수다 — 07에선 최상위에서 바로 define했다.)
const User = require("./user")(sequelize);
const Post = require("./post")(sequelize);

// 관계 — 한 User가 여러 Post를 가진다(작성자).
//   foreignKey: posts 테이블에 둘 FK 컬럼명을 직접 정한다(안 정하면 기본값은 'UserId').
//   as: 조회(include) 시 붙는 이름 — post.author, user.posts 로 접근한다.
User.hasMany(Post, { foreignKey: "userId", as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "author" });

module.exports = { sequelize, User, Post };
