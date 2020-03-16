const user = require('./user/user.service.js');
const client = require('./client/client.service.js');
const home = require('./home/home.service.js');
const deal = require('./deal/deal.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(user);
  app.configure(client);
  app.configure(home);
  app.configure(deal);
};
