//Example Event model.
//TODO: Define the data and functions we'll need for each event.

module.exports = function(sequelize, DataTypes) {

	var Event = sequelize.define("Event", {
	  event: {
	    type: DataTypes.STRING,
	    allowNull: false
	  },
	  date: {
	    type: DataTypes.STRING,
	    allowNull: false,
	    validate: {
	    	isDate: true
	    }	    
	  },
	  notes: {
	    type: DataTypes.STRING,
	    allowNull: true
	  },
	  totalCost: {
	    type: DataTypes.DECIMAL,
	    allowNull: false,
	    validate: {
	    	isDecimal: true
	    }	    
	  },
	  maxCPP: {
	    type: DataTypes.DECIMAL,
	    allowNull: false,
	    validate: {
	    	isDecimal: true
	    }	    
	  }
	});

	Event.associate = function(models) {
	  Event.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
	  });
	};

	Event.associate = function(models) {
	  Event.hasMany(models.Participant, {
	    onDelete: "cascade"
	  });
	};

return Event;

};
