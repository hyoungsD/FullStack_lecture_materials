const express = require("express")
const winston = require("winston");
const app = express();

// debug , info , warn , error 
const logger = winston.createLogger({
    level: "info", // 개발환경에서는  debug, 운영환경에서는 info ~ error 
    format:  winston.format.combine(
        winston.format.timestamp(), 
        winston.format.printf(({timestamp, level, message}) => {
            return `${timestamp} [${level}] : ${message}`
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename : "app.log"})
    ]
});

// 1.미들웨어 
app.use(express.json()); // POST/PUT BODY JSON 담기 위해서 
// 2.우리의 첫번째 미들웨어
app.use((req, res, next) => {
    console.log(`${req.url} - ${req.method}`);
    next(); // 다음 단계 라우터로 넘어가세요 next() 호출안하면 응답이 멈춤 
});
// 3. winston 미들웨어 -> postman 으로 라우터 테스트 해보세요 app.log
app.use((req, res, next) => {
    logger.info(`${req.url} - ${req.method}`);
    next();
})

let posts = [
    {id: 1, title: "첫번째 글", content:"안녕하세요", author:"김철수"}
];

let nextId = 2; // 새 글에 ID 부여 위해서 사용 

// 목록 
app.get("/posts", (req, res)=> {
    //1. json 으로 posts 객체를 클라이언트에 반환하는 코드를 작성해보세요 
    res.json(posts);
});

// 글쓰기 
app.post("/posts", (req, res) => {
    const { title, content, author } = req.body;

    if(!title || !content) {
        return res.status(400).json({message: "title 과 content는 필수입니다."})
    }
    const post = { id: nextId++, title : title, content: content, 
        author: author || "익명"}
    posts.push(post);

    res.status(201).json(post)
});

// 게시글 수정 
app.put("/posts/:id", (req, res) => {
    // 1. id 에 해당되는 게시글을 가지고 온다.
    const post = posts.find((p) => p.id === Number(req.params.id));
    if(!post) {
        return res.status(404).json({message: "게시물을 찾을 수 없습니다."})
    }
    // 문제 1 : req.body > title, content, author 변수에 넣어주세요 구조 분해할당으로 
    const {title, content, author} = req.body;
    if (title !== undefined) post.title = title;
    // 문제 2 : content, author 동일하게 post 에 업데이트 해주세요 
    if (content !== undefined) post.content = content;
    if (author !== undefined) post.author = author;
    res.json(post);
});

app.get("/posts/:id", (req, res) => {
    const post = posts.find((p) => p.id === Number(req.params.id));
    if(!post) {
        return res.status(404).json({message: "게시물을 찾을 수 없습니다."})
    }
    res.json(post)
});

app.delete("/posts/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = posts.findIndex((p) => p.id === id)
    if(index === -1) {
        return res.status(404).json({message: "게시글을 찾을 수 없습니다."})
    }
    const [removed] = posts.splice(index, 1) ;
    res.json({message: "삭제됨", post: removed})
})

app.listen(3000, ()=>{
    console.log(`http://localhost:3000에 서버가 떴어용`)
});
