// Initializes the `Home` service on path `/home`
const createService = require('feathers-sequelize');
const createModel = require('../../models/home.model');
const hooks = require('./home.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  let service = createService(options);
  service.find = function(params) {
    let {Model: Home} = this;
    
    return Home.findAll({where: {userId: params.user.id}})
      .then(results => results)
      .catch(e => e);
  };

  service.get = function(id, params) {
    let {Model: Home} = this;
    
    return Home.findOne({where: {id, userId: params.user.id}})
      .then(result => result)
      .catch(e => e);
  };

  service.update = async function(id, data, params) {
    const {Model: Home} = this;
  
    const home = await Home.findOne({where: {id, userId: params.user.id}});
    if(!home) return;
  
    await home.update(data);

    return home;
  };

  // Initialize our service with any options it requires
  app.use('/home', service);

  // Get our initialized service so that we can register hooks
  service = app.service('home');

  service.hooks(hooks);
};
