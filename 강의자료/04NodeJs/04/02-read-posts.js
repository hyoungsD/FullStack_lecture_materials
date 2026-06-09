const express = require("express")
const app = express()

const posts = [
    {id: 1, title:"첫 번째글", content:"안녕하세요", author: "김철수"},
    {id: 2, title:"두 번째글", content:"반갑습니다.", author: "이형희"},
    {id: 3, title:"세 번째글", content:"또 만나요", author: "태연"},
];

// http://localhost:3000/posts?author=김철수
app.get("/posts", (req, res) => {
    const { author } = req.query; 
    console.log(author)
    if(author) {
        return res.json(posts.filter((p)=>{
            return p.author === author
        } )); // db select * from posts where author = '김철수'
    }
    res.json(posts);
});

// http://localhost:3000/posts/1, http://localhost:3000/posts/2, http://localhost:3000/posts/4
app.get("/posts/:id", (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find((p)=> p.id === id);
    if(!post) {
        return res.status(404).json({message: "게시물을 찾을 수 없습니다."})
    }
    res.json(post)
});

app.listen(3000, ()=>{
    console.log(`http://localhost:3000 에서 실행중`)
})