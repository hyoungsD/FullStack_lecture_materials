class Animal {
 protected name: string;
 protected age : number;
 
 constructor(name: string, age: number) {
    this.name = name;
    this.age = age; 
 }

 public move(distance: number  = 0 ): void {
    console.log(`${this.name} moved ${distance}`)
 }

 public getInfo() : string{
    return `이름 : ${this.name}, 나이 : ${this.age}`
 }

}

const ani1 = new Animal("기린", 3);
console.log("ani1의 정보", ani1.getInfo())


class Dog extends Animal {
    private breed: string;

    constructor(name: string, age: number, breed:string) {
        super(name, age);
        this.breed = breed;
    }

    public bark(): void {
        console.log("멍멍!")
    }

    public getInfo(): string {
        return `${super.getInfo()}, 품종 : ${this.breed}`
    }
}

const golden = new Dog("금둥이", 2, "골든 리트리버 ");
console.log("dog info", golden.getInfo())
golden.bark()
golden.move(20)

interface Flyable {
    fly() : void 
}

class Bird extends Animal implements Flyable {
    private wingspan: number ;

    constructor(name: string, age: number, wingspan: number) {
        // 문제 2 생성자 안의 내용을 구현해보세요 
        super(name, age);
        this.wingspan = wingspan
    }

    fly() : void {
        console.log(`${this.name} is flying with wingspan ${this.wingspan}`)
    }
}

const bird = new Bird("참새", 2, 0.1)
console.log(bird.getInfo());
bird.fly();