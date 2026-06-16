export interface User {
    name : string;
    age: number;
}

export class UserService {
    private users : User[] = [];

    addUser(user: User) : void {
        this.users.push(user)
    }

    getUsers(): User[] {
        return this.users;
    }
}

import {UserService as US2, User as U2} from './ts-05';
const us1 = new US2(); // userService
const u1: U2 = { // User
    name: "이지훈", age: 25
}
us1.addUser(u1);
console.log("users", us1.getUsers());

