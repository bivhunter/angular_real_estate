
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
    rate: number;

    constructor() {
        this.id = null;
        this.email = '';
        this.password = '';
        this.name = '';
        this.surname = '';
        this.birthday = new Date('1980.01.01');
        this.level = 0;
        this.company = '';
        this.rate = 0;
    }
}
