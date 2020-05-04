import { IClientModel } from './client.model';
import { Home } from '../../homes/model/home';

export class Client implements IClientModel {
    id: string | number = null;
    email = '';
    name = '';
    surname = '';
    birthday: Date = new Date('1980.01.01');
    address = '';
    phone = '';
    level = 0;
    // tslint:disable-next-line: variable-name
    userId: string | number = '';
    // tslint:disable-next-line: variable-name
    home_id?: string | number;
    homes?: Home[];
    createdAt?: string;

    constructor() {
    }
}
