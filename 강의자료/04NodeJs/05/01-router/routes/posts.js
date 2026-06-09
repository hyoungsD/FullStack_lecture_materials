const express = require("express");
const router = express.Router();

const posts = [
    {id: 1, title: "첫 번째 글", author: "김철수"},
    {id: 2, title: "두 번째 글", author: "이영희"}
];

// http://localhost:3000/posts
router.get("/", (req,res)=> {
    res.json(posts)
});

// http://localhost:3000/posts/1
router.get("/:id", (req, res) => {
    const post = posts.find((p) => p.id === Number(req.params.id));
    if(!post) {
        return res.status(404).json({message: "게시글을 찾을 수 없습니다"})
    }
    res.json(post);
});

module.exports = router;
