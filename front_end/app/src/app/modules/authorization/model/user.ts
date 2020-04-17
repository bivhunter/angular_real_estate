
import { UserModel } from './user.model';

export class User implements UserModel {

    id: string | number;
    email: string;
    password: string;
    name: string;
    surname: string;
    birthday: Date;
    level: number;
    company: string;
    rate: number | string;
    createdAt?: Date;
    // _fullName: string;

    constructor(user?: User) {
        if (user) {
            this.id = user.id || null;
            this.email = user.email || '';
            this.name = user.name || '';
            this.surname = user.surname || '';
            this.birthday = user.birthday || new Date('1980.01.01');
            this.level = user.level || 0;
            this.company = user.company || '';
            this.rate = user.rate || '';
            this.createdAt = user.createdAt || new Date('1980.01.01');
        } else {
            this.id = null;
            this.email = '';
            this.password = '';
            this.name = '';
            this.surname = '';
            this.birthday = new Date('1980.01.01');
            this.level = 0;
            this.company = '';
            this.rate = '';
        }
    }

    set fullName(value: string) {
        // this._fullName = value;
        const wordArray = value.trim().split(' ');
        if (wordArray[0]) {
            this.name = wordArray[0];
        } else {
            this.name = '';
        }
        if (wordArray[1]) {
            this.surname = wordArray[1];
        } else {
            this.surname = '';
        }
    }

    get fullName(): string {
        return (this.name + ' ' + this.surname).trim();
    }

    // get name(): string {
    //     const wordArray = this.fullName.trim().split(' ');
    //     if (wordArray[0]) {
    //         return wordArray[0];
    //     }
    //     return '';
    // }

    // get surname(): string {
    //     const wordArray = this.fullName.trim().split(' ');
    //     if (wordArray[1]) {
    //        return wordArray[1];
    //     }
    //     return '';
    // }
}
