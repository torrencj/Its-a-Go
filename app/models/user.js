//Example User model.
//TODO: Define the data and functions we'll need for each user.
// MySQL has a function called UUID() which will generate a long unique string. Maybe we should use that.

module.exports = function(sequelize, DataTypes) {

var User = sequelize.define("User", {
  firstname: {
    type: DataTypes.STRING
  },
  lastname: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  }
});

return User;

};
