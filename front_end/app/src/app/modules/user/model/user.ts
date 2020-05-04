
import { IUserModel } from './user.model';

export class User implements IUserModel {

    id: string | number = null;
    email = '';
    password = '';
    name = '';
    surname = '';
    birthday: Date = new Date('1980.01.01');
    level = 0;
    company = '';
    rate: number | string = '';
    createdAt?: Date;

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
}
