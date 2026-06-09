const express = require("express")
const { sequelize, Post} = require("./models");
const postRoute = require("./routes/postRoute");

const app = express()
app.use(express.json())

app.use("/posts", postRoute);

async function main(){
    await sequelize.sync();
    app.listen(3000, () => console.log(`3000번에서 서버 실행 중`));
}

main();