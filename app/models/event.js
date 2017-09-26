//Example Event model.
//TODO: Define the data and functions we'll need for each event.

module.exports = function(sequelize, DataTypes) {

	var Event = sequelize.define("Event", {
	  eventName: {
	    type: DataTypes.STRING
	  },
	  eventDate: {
	    type: DataTypes.STRING
	  },
	  eventAddress: {
	    type: DataTypes.STRING
	  },
	  eventCity: {
	    type: DataTypes.STRING
	  },
	  eventState: {
	    type: DataTypes.STRING
	  },
	  eventZip: {
	    type: DataTypes.INTEGER
	  },
	  eventCost: {
	    type: DataTypes.DECIMAL
	  },
	  eventMinimum: {
	    type: DataTypes.INTEGER
	  }
	});

	Event.associate = function(models) {
	  Event.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
	  });
	}

return Event;

};
