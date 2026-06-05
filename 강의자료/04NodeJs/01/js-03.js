const users = [
    {id:1, name:"홍길동", age:25, score: 85},
    {id:2, name:"김철수", age:30, score: 92},
    {id:3, name:"이영희", age:22, score: 78},
    {id:4, name:"박민수", age:19, score: 88},
    {id:5, name:"최지원", age:35, score: 95}
]; 

// 1. filter  user 의 나이가 30세 미만 사람들을 출력해보세요
const youngUsers = users.filter((data)=> {
    return data.age < 30;
});
console.log("30세 미만인 사람들", youngUsers);

// 2.  사용자 이름만 추출 해보세요 배열로 
const userNames = users.map((user)=>user.name);
console.log("사용자 이름만 추출", userNames);

// 3. 나이가 25세 미만인 사람들의 이름만 출력해보세요
const userNames2 = users.filter((x)=>x.age < 25).map((x)=>x.name)
console.log('나이가 25세 미만인 사람들의 이름은', userNames2);


