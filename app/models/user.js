//Example User model.
//TODO: Define the data and functions we'll need for each user.
// MySQL has a function called UUID() which will generate a long unique string. Maybe we should use that.

module.exports = function(sequelize, DataTypes) {

var User = sequelize.define("User", {
  uuid: {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV1,
  primaryKey: true
  },
  firstname: {
    type: DataTypes.STRING
  },
  lastname: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  hash: {
    type: DataTypes.STRING
  }
});

return User;

};
