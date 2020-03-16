// Initializes the `Client` service on path `/client`
const createService = require('feathers-sequelize');
const createModel = require('../../models/client.model');
const hooks = require('./client.hooks');


/* eslint-disable */
async function create(params) {
  const {Model: Client} = this;
  const {homeId} = params;

  const newClient = await Client.create(params);

  if(homeId) {
    newClient.addHome(homeId);
    await newClient.save();
  }

  return newClient;
}

async function update(id, data, params) {
  const {homeAdd, homeRemove} = data;
  const {Model: Client} = this;

  const client = await Client.findOne({where: {id, userId: params.user.id}});
  if(!client) return;

  await client.update(data);

  if(homeAdd) {
    client.addHome(homeAdd);
    await client.save();
  }

  if(homeRemove) {
    client.removeHome(homeRemove);
    await client.save();
  }

  return client;
}

function find(params) {
  let {Model: ClientModel} = this;
  Client = ClientModel.scope('default');
  
  return Client.findAll({where: {userId: params.user.id}})
    .then(results => results)
    .catch(e => e);
}

function get(id, params) {
  let {Model: ClientModel} = this;
  Client = ClientModel.scope('default');
  
  return Client.findOne({where: {id, userId: params.user.id}})
    .then(result => result)
    .catch(e => e);
}

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  console.log('created model:', Model);

  const options = {
    Model,
    paginate
  };

  let service = createService(options);
  service.create = create;
  service.get = get;
  service.find = find;
  service.patch = update;
  service.update = update;


  // Initialize our service with any options it requires
  app.use('/client', service);

  // Get our initialized service so that we can register hooks
  service = app.service('client');

  service.hooks(hooks);
};
