const express = require("express")
const app = express()

app.use(express.json());

const postsRouter = require("./routes/posts");
// 문제 1 commentRouter 를 추가해보세요 

// http://localhost:3000/posts -> postRouter 전달하세요 
app.use("/posts", postRouter);
// 문제 2 commentRouter 를 /comments  매핑
// /comments 주소로 들어오면 commentRouter 담당할수 있게..


app.listen(3000, ()=> {
    console.log("3000포트 서버 실행 중... ")
})