import { IHomeModel } from './home.model';
import { Client } from '../../clients/model/client';

export class Home implements IHomeModel {

    id: string | number = null;
    home = '';
    street = '';
    city = '';
    index = '';
    state = '';
    price = 0;
    // tslint:disable-next-line: variable-name
    start_date: Date = new Date();
    // tslint:disable-next-line: variable-name
    client_id?: string | number;
    clients?: any[];
    // tslint:disable-next-line: variable-name
    user_id: string | number = '';
    clientOwner: Client;
    createdAt: Date;

    constructor() {
    }

}
