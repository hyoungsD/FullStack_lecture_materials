interface User{
    name: string;
    age: number;
}

const user1 : User = {
    name: "이지훈",
    age: 40
}
console.log(user1);

// 문제 1 Product 인터페이스 정의
// title 문자열 , price 숫자
// product1 이름으로 객체 정의 
interface Product {
    title : string,
    price : number;
}

const product1 : Product = {
    title: "사과",
    price: 3000,
}
console.log(product1);

interface ColorConfig {
    color? : string;
    width? : number;
}
const config1 : ColorConfig = {
    color : "red"
}
console.log(config1);

// 문제 2 선택적 프로퍼티 
// UpdateProfileDTO 인터페이스를 만들고
// 속성은 nickname, phone, marketingAgreed 
// 필수 값은 nickname, 나머지는 선택적 이다 .
// nickname : 문자열, phone 문자열, marketingAgreed 불린
interface UpdateProfileDTO {
    nickname : string;
    phone?: string;
    marketingAgreed?: boolean
}

const udto1 : UpdateProfileDTO = {
    nickname : "이지훈"
}

interface Admin extends User {
    role: string
}

const admin1 : Admin = {
    name: "이지훈",
    age : 40, 
    role: "관리자"
}

type Student = {
    name: string;
    age: number;
}
type Status = "pending" | "paid" | "shipped" 

interface Order {
    id : number;
    status: Status
}

const order1 : Order = {
    id : 1,
    status: "pending"
}

// 문제 3  인터페이스 확장 
// Shape 인터페이스 정의  하고 color 속성(문자열)
// Shape 인터페이스를 확장한 Square 인터페이스 정의 
// Square 의 추가 속성 sideLength  숫자 타입으로 
// 정의 하고
// 사각형 객체를 하나 만들어보세요  
interface Shape {
    color: string
}
interface Square extends Shape {
    sideLength: number
}

const sq1 : Square = {
    color : "blude",
    sideLength: 10
}
console.log(sq1)