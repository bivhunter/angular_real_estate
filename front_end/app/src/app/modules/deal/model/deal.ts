import { IDeal } from './deal.model';
import { Home } from './../../homes/model/home';
import { Client } from '../../clients/model/client';

export class Deal implements IDeal {
    id: number | string = null;
    price = 0;
    date: Date = new Date();
    // tslint:disable-next-line: variable-name
    homeId: number | string = '';
    // tslint:disable-next-line: variable-name
    clientId: number | string = '';
    // tslint:disable-next-line: variable-name
    user_id: number | string = '';
    home: Home;
    client: Client;

    constructor() {
    }
}
