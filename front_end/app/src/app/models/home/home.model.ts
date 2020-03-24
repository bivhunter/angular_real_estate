import { Client } from '../client/client';

export interface HomeModel {
    id: number | string;
    home: string;
    street: string;
    city: string;
    index: string;
    state: string;
    price: number;
    start_date: Date;
    client_id?: number | string; // used for post and patch
    clients?: Array<Client>; // used for GET
    user_id: number | string;
}