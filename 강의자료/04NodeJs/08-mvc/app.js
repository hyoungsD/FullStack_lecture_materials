// 진입점 — 요청은 [라우터 → 컨트롤러 → 서비스 → 모델] 순서로 흐른다.
const express = require("express");
const { sequelize, User, Post } = require("./models");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();
app.use(express.json());

// 자원별 라우터를 마운트한다.
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// 테이블 준비(sync) 후 서버 시작. 처음이면 샘플 데이터도 한 번 넣는다. (07과 같은 async 함수 패턴)
async function main() {
  await sequelize.sync();
  if ((await User.count()) === 0) {
    const user = await User.create({ name: "김철수", email: "kim@example.com" });
    await Post.bulkCreate([
      { title: "첫 번째 글", content: "MVC 구조로 만든 게시판입니다.", userId: user.id },
      { title: "두 번째 글", content: "계층을 나눠 관리합니다.", userId: user.id },
    ]);
  }
  app.listen(3000, () => console.log("http://localhost:3000 에서 실행 중"));
}
main();
