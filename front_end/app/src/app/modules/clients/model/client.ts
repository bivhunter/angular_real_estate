import { ClientModel } from './client.model';

export class Client implements ClientModel {
    id: string | number;
    email: string;
    name: string;
    surname: string;
    birthday: Date;
    address: string;
    phone: string;
    level: number;
    // tslint:disable-next-line: variable-name
    user_id: string | number;
    home_id?: string | number;
    homes?: import('../../homes/model/home').Home[];

    constructor() {
        this.id = null;
        this.email = '';
        this.name = '';
        this.surname = '';
        this.birthday = this.birthday = new Date('1980.01.01');
        this.address = '';
        this.phone = '';
        this.level = 0;
        this.user_id = '';
    }
}
