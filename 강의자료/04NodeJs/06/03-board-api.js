const express = require("express")
const Database = require("better-sqlite3")
const path = require("path")

const app = express()
app.use(express.json())

const db = new Database(path.join(__dirname, "board.db"))

db.exec(`
    create table if not exists posts (
        id integer primary key autoincrement,
        title text not null,
        content text not null,
        author text,
        created_at text default current_timestamp
    );
    `)

//1. 글쓰기
app.post("/posts", (req, res)=> {
    const {title, content, author} = req.body;
    if(!title || !content) {
        return res.status(400).json({message: "title과 content는 필수"})
    }
    const info = db.prepare("insert into posts(title, content, author) values(?,?,?)")
        .run(title, content, author || "익명")
    const created = db.prepare("select * from posts where id = ?").get(info.lastInsertRowid);
    res.status(201).json(created)

});
//2. 목록
app.get("/posts", (req, res)=> {
   const posts = db.prepare("select * from posts order by id desc").all()
   res.json(posts) 
});
//3. 상세
app.get("/posts/:id", (req, res)=>{
    const post = db.prepare("select * from posts where id = ? ").get(req.params.id)
    if(!post){
        return res.status(404).json({message: "게시글을 찾을 수가 없습니다."})
    }
    res.json(post)
});
//4. 수정
app.put("/posts/:id", (req, res)=>{
    const post = db.prepare("select * from posts where id = ? ").get(req.params.id)
    if(!post){
        return res.status(404).json({message: "게시글을 찾을 수가 없습니다."})
    }
    const {title, content, author} = req.body;
    // console.log(title, content, author)
    if(title !== undefined) post.title = title;
    if(content !== undefined) post.content = content;
    if(author !== undefined) post.author = author;

    db.prepare("update posts set title = ? , content = ?, author = ? where id = ?")
        .run(post.title, post.content, post.author, req.params.id);

    res.json(db.prepare("select * from posts where id = ? ").get(req.params.id))
});
//5. 삭제 
app.delete("/posts/:id",(req, res) => {
    const post = db.prepare("select * from posts where id = ? ").get(req.params.id)
    if(!post){
        return res.status(404).json({message: "게시글을 찾을 수가 없습니다."})
    }
    db.prepare("delete from posts where id = ?").run(req.params.id)
    res.json({message: "삭제됨", post})
});

// server 기동
app.listen(3000, ()=>{})