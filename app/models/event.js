//Example Event model.
//TODO: Define the data and functions we'll need for each event.

module.exports = function(sequelize, DataTypes) {

	var Event = sequelize.define("Event", {
	  userId: {
	    type: Sequelize.STRING
	  },
	  eventName: {
	    type: Sequelize.STRING
	  },
	  eventAddress: {
	    type: Sequelize.STRING
	  },
	  eventCity: {
	    type: Sequelize.STRING
	  },
	  eventState: {
	    type: Sequelize.STRING
	  },
	  eventZip: {
	    type: Sequelize.STRING
	  },
	  eventCost: {
	    type: Sequelize.DECIMAL
	  }
	}
});

return Event;

};


