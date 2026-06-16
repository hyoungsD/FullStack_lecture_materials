interface User {
    name: string;
    age: number;
    email?: string;
}

const user11 : User = {
    name: "이지훈", age: 12
}

type parialUser = Partial<User>; // 인터페이스 속성을 전부 선택적으로 바꿔줍니다. 

const puser1  : parialUser = {
}

type RequiredUser = Required<User>;  // 인터페이스 속성을 전부 필수로 바꿔줍니다. 

const ruser1 : RequiredUser = {
    name:"", age:0, email: ""
}

type ReadOnlyUser = Readonly<User>; // 인터페이스 모든 필드를 읽기전용 