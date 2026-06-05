const fruits = ["사과","바나나","오렌지"]

// 1. 배열 구조 분해 할당으로
// 사과는 apple 변수에 바나나는 
// banana 변수에 "오렌지" 는 orange 변수에 할당
const [apple, banana, orange] = fruits;
console.log(apple, banana, orange)

const students = {
    name: "김철수",
    age: 30,
    grade: "A"
}
// 2. 객체 구조 분해할당으로 김철수는 name, 나이는 age, "A"  grade 란 변수에
// 할당하고 출력해보세요
const {name, age, grade} = students;
console.log(name, age, grade);


const numbers = [1,2,3]
const mores = [4,5,6]
// 요 두개를 스프레드 연산자를 이용해서 합쳐보세요
// 3. 결과는  [1,2,3,4,5,6] -> combined
const combined = [...numbers, ...mores]
console.log(combined)