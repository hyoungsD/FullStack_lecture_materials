require("dotenv").config()

console.log("서버포트", process.env.PORT)
console.log("DB이름", process.env.DB_NAME)
console.log("API미", process.env.API_KEY)


// .env 에 키가 NODE_ENV 값이 development 넣고
// process.env.NODE_ENV 를 출력해보세요 
console.log("노드환경", process.env.NODE_ENV)

// 개발 환경일 경우에는 "개발 환경에서 실행중 ", "운영환경에서 실행중"
if(process.env.NODE_ENV === "development"){
    console.log("개발환경에서 실행 중입니다")
}else{
    console.log("운영환경에서 실행 중입니다")
}