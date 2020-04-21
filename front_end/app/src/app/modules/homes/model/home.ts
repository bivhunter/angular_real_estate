import { HomeModel } from './home.model';
import { Client } from '../../clients/model/client';

export class Home implements HomeModel {

    id: string | number;
    home: string;
    street: string;
    city: string;
    index: string;
    state: string;
    price: number;
    start_date: Date;
    client_id?: string | number;
    clients?: any[];
    user_id: string | number;
    clientOwner: Client;
    createdAt: Date;

    constructor() {
        this.id = null;
        this.home = '';
        this.street = '';
        this.city = '';
        this.index = '';
        this.state = '';
        this.price = 0;
        this.start_date = new Date();
        this.user_id = '';
    }

}
