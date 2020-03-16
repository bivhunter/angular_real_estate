// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const client = sequelizeClient.define('client', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  client.associate = function (models) {
    client.belongsToMany(models.home, {through: 'clientHome'});
    client.belongsTo(models.user);

    client.addScope('default', {
      include: [
        { 
          model: models.home,
          attributes: ['id', 'home', 'street', 'city', 'index', 'state', 'price', 'start_date'],
          through: {
            attributes: []
          }
        }
      ]
    });
  };

  return client;
};
