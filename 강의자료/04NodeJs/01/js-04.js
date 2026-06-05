let personInfo = {
    name: "홍길동",
    age: 25,
    address: "서울시 금천구",
    hobby: ["뜨게질", "독서", "커피내리기"]
}
// 1. 아래의 정보를 출력해보세요 
console.log(personInfo["name"]) // 홍길동
console.log(personInfo["age"]) // 나이

// 2. personInfo 객체에 나이를 1씩 추가할 수 있는 addAge 메서를 추가해보세요
personInfo.addAge = function() {
    this.age = this.age + 1;
}
// 3. personInfo 에 추가된 addAge 호출해서 나이가 1씩 증가하는지 확인해보세요
personInfo.addAge();
console.log(personInfo.age)
