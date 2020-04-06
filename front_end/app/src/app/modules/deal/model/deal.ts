import { IDeal } from './deal.model';
import { Home } from './../../homes/model/home';
import { Client } from '../../clients/model/client';

export class Deal implements IDeal {
    id: number | string;
    price: number;
    date: Date;
    // tslint:disable-next-line: variable-name
    home_id: number | string;
    // tslint:disable-next-line: variable-name
    client_id: number | string;
    // tslint:disable-next-line: variable-name
    user_id: number | string;
    home: Home;
    client: Client;

    constructor() {
        this.id = null;
        this.price = 0;
        this.date = new Date();
        this.home_id = '';
        this.client_id = '';
        this.user_id = '';
    }
}
