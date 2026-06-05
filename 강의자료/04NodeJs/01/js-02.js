let arr = [5, 23, "hello", true, "world", -9]

//1.  for 또는 while 로 출력 console.log
// for(let i=0;i<arr.length;i++){
//     console.log(arr[i])
// }
let i = 0
while(i < arr.length) {
    console.log(arr[i]);
    i++;
}

//2. forEach 함수 이용해서 출력 해보세요 console.log()
arr.forEach((data)=>{
    console.log(data)
})

//3. filter arr 에서 문자만 출력 hello, world
// typeof aa === 'string'
console.log("-----")
arr.filter((aa)=>{
    const chk = typeof aa === 'string';
    if(chk) console.log(aa);
})