import { Home } from '../home/home';

export interface ClientModel {
    id: number | string; //  should not be set up manually
    email: string;
    name: string;
    surname: string;
    birthday: Date;
    address: string;
    phone: string;
    level: number;
    user_id: number | string;
    home_id ?: number | string; // used for post and patch
    homes?: Array<Home>; // used for GET
}
