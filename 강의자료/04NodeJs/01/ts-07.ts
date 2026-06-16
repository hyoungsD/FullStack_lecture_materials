import 'reflect-metadata';

function MarkController(constructor: Function) {
    console.log("등록된 클래스", constructor.name)
}

@MarkController
class ExampleClass {
    constructor(public name : string) {}
}

const example = new ExampleClass("홍길동")
console.log("example name ", example.name)

/// 
const controllerUrls : Record<string, string> = {} // "어떤 클래스가 어떤 URL "

function Controller(url: string) { // 데코레이터 를 만들었어요 
    console.log(` Controller(${url}) 호출됨`)
    return function registerController(constructor : Function) {
        console.log(` class ${constructor.name} 등록`)
        controllerUrls[constructor.name] = url;
    }
}
@Controller("/products")
class ProductController {
    create () {
        return "상품 생성"
    }
}
@Controller("/orders")
class OrderController {
    create() {
        return ""
    }
}
console.log("controllerUrls ", controllerUrls);
