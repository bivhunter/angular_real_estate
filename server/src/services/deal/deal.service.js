// Initializes the `Deal` service on path `/deal`
const createService = require('feathers-sequelize');
const createModel = require('../../models/deal.model');
const hooks = require('./deal.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const HomeModel = app.services.home.Model;
  const ClientModel = app.services.client.Model;
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  let service = createService(options);

  delete service.update;
  delete service.patch;
  service.find = function(params) {
    return Model.findAll({where: {userId: params.user.id}, include: [{model: HomeModel}, {model: ClientModel}]})
      .then(results => results)
      .catch(e => e);
  };

  service.get = function(id, params) {
    return Model.findOne({where: {id, userId: params.user.id}, include: [{model: HomeModel}, {model: ClientModel}]})
      .then(result => result)
      .catch(e => e);
  };

  // Initialize our service with any options it requires
  app.use('/deal', service);

  // Get our initialized service so that we can register hooks
  service = app.service('deal');

  service.hooks(hooks);
};
