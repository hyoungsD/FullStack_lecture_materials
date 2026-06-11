let isDone : boolean = false
console.log("boolean", isDone)

let decimal : number = 6;
console.log("number", decimal)

let color : string = "blue"
console.log("string", color)

let list: number[] = [1,2,3]
console.log("number[]", list)

let tuple : [string, number] = ["hello", 3]
console.log("tuple Type", tuple)

enum Color { // 열거 
    Red, Green, Blue, Orange, Puple
}

let fColor : Color = Color.Blue
console.log("Color", fColor)

let notSure : any = 4 ;
notSure = "string"
console.log(notSure);

let unionType : string | number = "hello" 
unionType = 42 
console.log(unionType)