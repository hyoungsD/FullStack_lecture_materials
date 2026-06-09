const express = require("express")
const router = express.Router();

const comments = [
    {id: 1, postId:1, content: "좋은 글입니다."},
    {id: 2, postId:1, content: "감사합니다."},
]

router.get("/", (req, res) => {
    res.json(comments)
});

module.exports = router;