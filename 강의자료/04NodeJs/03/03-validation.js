// npm install validator uuid
const validator = require("validator")
const { v4 : uuidv4 } = require("uuid"); // uuid 모듈 안에 v4 객체를 uuidv4 이름으로 여기서 사용할 수 있게 함 

const emailStr = "test@example.com"
console.log("이메일 검증", validator.isEmail(emailStr)) 

const urlStr = "http://www.naver.com"
console.log("URL 검증", validator.isURL(urlStr))

const ipStr = "127.0.9.1";
console.log("IP 검증", validator.isIP(ipStr))

const phoneStr = "010-8011-2222"
console.log("전화번호 검증", validator.isMobilePhone(phoneStr))

// http://example.com/user/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d

const uuid = uuidv4();
// console.log("UUID v4", uuid)

const user = {
    id: uuidv4(),
    name: "홍길동",
    email: "hong@email.com"
}

console.log(user)
