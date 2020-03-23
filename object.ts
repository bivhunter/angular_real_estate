interface User {
    id : Number | String, //  should not be set up manually
    email : String,
    password : String, 
    name: String,
    surname: String, 
    birthday: Date,
    level: Number, // should be calculated based on sales number, 0 after user registration
    company : String,
    rate : Number
}

/* -----------end-points-----------
    POST /user - register
    POST /authentication - login 
        required object example{
            strategy : local <--- always local
            email : myEmali@mail.com,
            password : qwerty, 
        }
        return jwt token
    PATCH /user - update data except email and password --id is not required since user can update only personal data
*/

interface Client {
    id :  Number | String, //  should not be set up manually
    email : String,
    name : String,
    surname : String,
    birthday : Date,
    address: String,
    phone: String,
    level: Number,
    user_id: Number | String,
    home_id ? : Number | String, // used for post and patch
    homes? : Array<Home> // used for GET
}

/* -----------end-points-----------
    GET /client- get list of clients -- returns homes as array
    GET /client/:id - get data about client with id -- returns homes as array
    POST /client - add new client
    PATCH /client/:id - update data (id you want to expand homes list you should use this end-point)
    DELETE /client/:id - soft delete
*/

interface Home {
    id :  Number | String,
    home: String,
    street : String,
    city: String,
    index: String,
    state: String, 
    price: Number,
    start_date : Date,
    client_id? : Number | String, // used for post and patch
    clients? : Array<Client>, // used for GET
    user_id :  Number | String
}

/* -----------end-points-----------
    GET /home - get list of homes -- returns cleints as array
    GET /home/:id - get data about home with id --  returns clients as array
    POST /home - add new home (JSON)
    PATCH /home/:id  - update data (id you want to expand  client list you should use this end-point)
    DELETE /home/:id - soft delete
*/

interface Sale{
    id :  Number | String,
    price: Number,
    date: Date, 
    home_id : Number | String,
    client_id : Number | String,
    user_id :  Number | String
}

/* -----------end-points-----------
    GET /deal - get list of sales
    GET /deal/:id - get data about sale with id
    POST /deal - add new sale (JSON)
*/