const fs = require("fs");

// fs.writeFileSync("test.txt", "Hello World");

// // 1. test2.txt 파일을 만들고 "안녕하세요 남부여성발전센터입니다."
// fs.writeFileSync("test2.txt", "안녕하세요 남부여성발전센터입니다.");

// fs.writeFile("async-test.txt", "Hello World", (err) => {
//     if(err) {
//         console.error("error", err);
//         return
//     }
//     console.log("비동기 파일쓰기 완료")
    
// });
// console.log("비동기 파일 쓰기 완료2")
// // 3. async-test2.txt 파일 만들고,  "안녕하세요 남부여성발전센텅입니다." 
// // fs.writeFile 메소드로 파일 쓰기 연습 .
// fs.writeFile("async-test2.txt", "안녕하세요 남부여성발전센텅입니다.", (err) => {
//     if(err) {
//         console.error(err);
//         return
//     }
//     console.log("비동기 파일 쓰기 완료")
// })

// const data = fs.readFileSync("test2.txt", "utf-8");
// console.log(data);
// // 2. test.txt aysnc-test2.txt async-test.txt  읽어서 console 출력해주세요
// const data1 = fs.readFileSync("test.txt", "utf-8")
// // const data2 = fs.readFileSync("async-test2.txt")
// const data3 = fs.readFileSync("async-test.txt", "utf-8")
// console.log(data1, data3)

// const objData = {
//     name: "김철수", age: 25, grade: "A"
// }
// fs.writeFileSync("obj-test.json", JSON.stringify(objData))

// const data5 = fs.readFileSync("obj-test.json", "utf-8")
// console.log(data5); 
// console.log(typeof data5);
// const data6 = JSON.parse(data5)
// console.log(data6)
// console.log(data6.name)

let personInfo = {
    name: "홍길동",
    age: 25,
    address: "서울시 금천구",
    hobby: ["뜨게질", "독서", "커피내리기"]
}
// 1. personInfo 객체를 JSON string 포멧으로
// personInfo.json
fs.writeFileSync("personInfo.json", JSON.stringify(personInfo));
// 2. personInfo.json 파일에서 내용을 읽고 
// 파일 내용을 personInfo2 객체에 저장하세요 
const personInfo2 = JSON.parse(fs.readFileSync("personInfo.json", "utf-8"));
let personInfoStr;
try{
    personInfoStr = fs.readFileSync("personInfo.json", "utf-8");
}catch(e) {
    personInfoStr = "{}"
}
const personInfo22 = JSON.parse(personInfoStr);
// 3. personInfo2 의 name, age, address, hobby를 console출력 
console.log(personInfo22.name, personInfo22.age,  personInfo22.address, personInfo22.hobby)
