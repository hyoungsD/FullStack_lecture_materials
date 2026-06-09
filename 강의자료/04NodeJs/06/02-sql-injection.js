const Database = require("better-sqlite3");
const path = require("path")

const db = new Database(path.join(__dirname, "sql-injection.db"))

db.exec(`
    create table if not exists posts(
        id integer primary key autoincrement,
        title text,
        content text,
        author text
    );
    `);

const count = db.prepare("select count(*) as n from posts").get().n;
if (count === 0 ) {
    const insert = db.prepare("insert into posts(title, content, author) values ( ?, ?, ?) ");
    insert.run("공개된 글", "공개된 글입니다. 안녕하세요", "김철수");
    insert.run("또 다른 글", "또 다른 글입니다. 안녕하세요", "이영희");
    insert.run("비밀 글", "비밀글 글입니다. 안녕하세요", "관리자");
}

// node 02-sql-injection.js "김철수"
const input = process.argv[2] || "김철수"
console.log(input)

function badQuery(author){
    const sql = `select * from posts where author = '${author}'`
    console.log('위험한 SQL => ', sql)
    return db.prepare(sql).all()
}

try{
    console.log('위험한 결과 : ',  badQuery(input))
}catch(e){
    console.error(e)
}