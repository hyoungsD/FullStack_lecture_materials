const {Sequelize, DataTypes, Op} = require("sequelize");
const path = require("path")

// sequelize orm 객체 생성
const sequelize = new Sequelize({
    dialect : "sqlite",
    storage : path.join(__dirname, "basics.db"),
    logging: true
});

const Post = sequelize.define("Post", {
    title: {type : DataTypes.STRING, allowNull: false},
    content: {type : DataTypes.TEXT, allowNull: false},
    author: {type: DataTypes.STRING}
});

async function main() {
    await sequelize.sync(); // sync({force:false})

    // insert into Posts(title, content, author) values( ? , ? , ?)
    await Post.create({title: "첫 번째 글", content: "안녕하세요", author: "김철수"})
    await Post.create({title: "두 번째 글", content: "안녕하세요", author: "이영희"})
    await Post.create({title: "세 번째 글", content: "안녕하세요", author: "김바둑"})

    const all = await Post.findAll(); // select * from Posts
    all.forEach((a) => {
        console.log(a.title, a.content, a.author)
    });
    const first = await Post.findByPk(1); // select * from Posts where id = 1 
    console.log(first.title, first.content)

    // update Posts set title = ? where id = 1
    const post = await Post.findByPk(1);
    post.title = "1번 제목 수정"
    post.save();
    console.log("수정된 후 1번글 ", (await Post.findByPk(1)).title)

    // delete from posts where id = 2
    await Post.destroy({ where : {id : 2}});
    console.log("삭제된 후 전체 글 수", (await Post.count())) // select count(*) from Posts


    // bulk insert 
    // insert into posts(title, content, author) values (?,?,?), (?,?,?) 
    await Post.bulkCreate([
        {title: "Node.js입문", content:"Node 연습부터", author: "김철수"},
        {title: "Express.js입문", content:"Express 연습부터", author: "김기남"},
        {title: "Nest.js입문", content:"Nest 연습부터", author: "김형의"}
    ]);
    //select * from Posts where author = "김철수"
    const byAuthor = await Post.findAll({where : {author: "김철수"}})
    console.log(byAuthor)

    // select title, content from Posts where title like '%Express%'
    const likeTitle = await Post.findAll({
        where: {title : { [Op.like] : "%Express%"}}
    });
    console.log("Op.like", likeTitle.map((p)=>p.title))

    // select id, title from Posts order by id asc
    const titleOnly = await Post.findAll({
        attributes: ["id", "title"],
        order: [["id", "ASC"]],
        limit: 1
    });
    console.log("titleOnly", titleOnly.map((p)=>p.toJSON()));
    
    const one = await Post.findOne({
        where: { author: "김철수"},
        order: [["id","ASC"]]
    })
    console.log("one", one.toJSON());
    // update Posts set author= "이철수" where author = "김철수";
    const [affected] = await Post.update({author:"이철수"}, {where: {author: "김철수"}});
    console.log(affected)

    const rawRows = await sequelize.query(
        "select id, title, author from Posts where author = :author",
        {
            replacements: {author: "이철수"},
            type: Sequelize.QueryTypes.SELECT, // select 결과를 배열로..
        }
    )
    console.log("raw sql", rawRows);

    // select * from Posts where id in (1,3,5)
    const inIds = await Post.findAll({
        where : {id : { [Op.in] : [1,3,5]}}
    });
    console.log("inIds", inIds.map((p)=>p.toJSON()));

    // select * from Posts where author = "이철수" and title like "%Express%"
    const andCond = await Post.findAll({
        where : {
            [Op.and]: [{author:"이철수"}, {title: { [Op.like] : "%Express%" }}]
        }
    });
    console.log("andCond", andCond.map((p)=>p.toJSON()))
}
main();