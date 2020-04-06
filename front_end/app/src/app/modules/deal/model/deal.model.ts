import { Home } from '../../homes/model/home';
import { Client } from '../../clients/model/client';

export interface IDeal {
    'id': number | string;
    'price': number;
    'date': Date;
    'home_id': number | string;
    'client_id': number | string;
    'user_id': number | string;
    'home'?: Home;
    'client'?: Client;
}
