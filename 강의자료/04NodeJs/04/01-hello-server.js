const express = require("express")
const app = express();

// http://localhost:3000/
app.get("/", (req, res)=>{
    res.json({message: "Hello Express~~"});
});
// http://localhost:3000/hello
app.get("/hello", (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Hello World</title>
            </head>
            <body>
                <h1>Hello Express</h1>
                <p> 첫 번째 express 응답 페이지 </p>
            </body>
        </html>
    `);
});


app.listen(3000, ()=> {
    console.log(`http://localhost:3000 에서 실행중`)
})