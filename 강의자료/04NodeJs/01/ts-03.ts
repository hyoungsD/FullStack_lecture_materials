function add(x: number, y: number) : number {
    return x + y;
}
console.log("add", add(3, 4));

// 문제 1 multiply 곱하기 함수 x, y ,z  각각은 number
// 반환값도 number
function multiply(x: number, y: number, z: number) : number{
    return x * y * z
}
console.log("multiply", multiply(1,2,3));

function buildName(firstName: string, lastName?:string) : string {
    return lastName ? `${firstName} ${lastName}` : firstName;
}
console.log("build name", buildName("길동"))
console.log("build name", buildName("철수", "김"))

function greet(name: string, greeting: string = "안녕하세요") : string {
    return `${greeting} ${name}`
}
console.log("Greet" , greet("홍길동"))
console.log("Greet" , greet("홍길동", "반갑습니다."))

function identity<T>(arg: T): T {
    return arg;
}
console.log("number", identity<number>(42))
console.log("string", identity<string>("hello"))

function identity2(arg : any) : any {
    return arg;
}

function logValue<T extends string | number> (value: T) : void {
    console.log(value)
}
logValue("hello")
logValue(42)
// logValue(false)

// 문제 2
// buildSearchUrl("이어폰");
// // "/products?keyword=이어폰"
// buildSearchUrl("이어폰", "전자기기");
// // "/products?keyword=이어폰&category=전자기기"
// buildSearchUrl("이어폰", undefined, 50000);
// // "/products?keyword=이어폰&minPrice=50000"
// buildSearchUrl("이어폰", "전자기기", 50000);
// // "/products?keyword=이어폰&category=전자기기&minPrice=50000"
function buildSearchUrl (
    keyword: string, category? : string, minPrice?: number
) : string{
    // 여기에 로직을 구현해보세요 결과는 위의 주석 참조 
    // url += ""
    let url = `/products?keyword=${keyword}`
    if (category !== undefined) {
        url += `&category=${category}`
    }
    if (minPrice !== undefined) {
        url += `&minPrice=${minPrice}`
    }
    return url
}
console.log ( buildSearchUrl("이어폰") );
console.log ( buildSearchUrl("이어폰", "전자기기"));
console.log ( buildSearchUrl("이어폰", undefined, 50000));
console.log ( buildSearchUrl("이어폰", "전자기기", 50000));