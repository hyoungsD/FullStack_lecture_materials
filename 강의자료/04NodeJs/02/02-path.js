const path = require("path")
const fs = require("fs")

// console.log(__dirname, __filename)

const sampleDir = path.join(__dirname, "samples", "test.json")
console.log(sampleDir, typeof sampleDir)

// 현재 디렉토리 밑에  02/samples/files/token/jwt.json 
// path.join 을 이용해서 만들어보세요 
const tokenDir = path.join(__dirname, "samples", "files","token", "jwt.json")
console.log(tokenDir)

// 3. 02/samples/files/token/jwt.json
// 이 파일을 생성하고 여기에 jwtObj 객체를 string 형태로 저장하고 
const jwtObj = {
    token: "11111", expiredAt:"2026-06-04"
}
const dirName = path.join(__dirname, "samples", "files")
fs.mkdirSync(dirName, {recursive:  true})

fs.writeFileSync(path.join(dirName, "jwt.json"), JSON.stringify(jwtObj));

// 4. 02/samples/files/token/jwt.json 파일을 읽어서 내용을
// jwtObj2 로 저장하고 , 그 객체의 token 정보를 출력해보세요 
const tokenStr = fs.readFileSync(path.join(dirName, "jwt.json"), "utf-8")
console.log(tokenStr)
const token = JSON.parse(tokenStr)
console.log(token, typeof token)


// 디렉토리 만들기 
// const dirName = path.join(__dirname, "parent", "child");
// console.log(dirName)
// fs.mkdirSync(dirName, {recursive: true})