export interface UserModel {
    id: number | string; //  should not be set up manually
    email: string;
    password: string;
    name: string;
    surname: string;
    birthday: Date;
    level: number; // should be calculated based on sales number; 0 after user registration
    company: string;
    rate: number;
}
