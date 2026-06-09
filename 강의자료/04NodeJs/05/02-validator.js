const express = require("express")
const joi = require("joi")
const app = express()

app.use(express.json()); 

// JOI 스키마 정의 : 게시물 생성 규칙을 선언적으로 정의 
const createPostSchema = joi.object({
    title: joi.string().min(2).max(5).required(),
    content: joi.string().min(10).max(12).required(),
    author: joi.string().required()
});
// 검증 미들웨어는 - 스키마를 받아서 검증 후에 돌려준다. 
function validate(schema) {
    return (req, res, next) => {
        const {error} = schema.validate(req.body);
        if(error) {
            console.log(error)
            return res.status(400).json({
                message: "입력값이 올바르지 않습니다.", 
                detail: error.details[0].message
            });
        }
        next();
    };
}

const posts = []
let nextId = 1;

app.post("/posts", validate(createPostSchema) , (req, res) => {
    const {title, content, author} = req.body;
    const post = {id: nextId++, title, content, author}; 
    posts.push(post)
    res.status(201).json(post)
});

app.listen(3000, ()=>{});