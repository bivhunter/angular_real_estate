import { Home } from '../../homes/model/home';

export interface IClientModel {
    id: number | string; //  should not be set up manually
    email: string;
    name: string;
    surname: string;
    birthday: Date;
    address: string;
    phone: string;
    level: number;
    userId: number | string;
    home_id ?: number | string; // used for post and patch
    homes?: Array<Home>; // used for GET
    createdAt?: string;
}
