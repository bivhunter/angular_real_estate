import { Home } from '../../homes/model/home';
import { Client } from '../../clients/model/client';

export interface IDeal {
    'id': number | string;
    'price': number;
    'date': Date;
    'homeId': number | string;
    'clientId': number | string;
    'user_id': number | string;
    'home'?: Home;
    'client'?: Client;
}
