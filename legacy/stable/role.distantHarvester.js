var getSource = require('map.findSource');

var roleDistantHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if( (creep.carry.energy == 0 && creep.memory.harvesting == false) || creep.memory.harvesting == undefined) {
	        creep.memory.harvesting = true;
	        creep.memory.mapLocation = getSource.get();
	        console.log(creep.name + " is going on an expedition to the '" + creep.memory.mapLocation + "' flag!!"); 
	        creep.say("🚀");
    }
        else if( (creep.carry.energy == creep.carryCapacity) && creep.memory.harvesting == true ) {
            creep.memory.harvesting = false;
        }
        
        if( creep.memory.harvesting == true) {
            if(Game.flags[creep.memory.mapLocation] == undefined) {
                creep.memory.mapLocation = "home";
            }
	        if(Game.flags[creep.memory.mapLocation].room == creep.room) {
	            var pos = creep.room.getPositionAt(creep.pos["x"],creep.pos["y"]);
	            var source = pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE && source != null) {
                    creep.moveTo(source);
                }
                else if( source == null ) {
                    creep.moveTo(creep.memory.mapLocation);
                }
	        }
	        else {
	            creep.moveTo(Game.flags[creep.memory.mapLocation]);
	        }
        }
        else {
            if( creep.room != Game.flags["home"].room ){
                creep.moveTo( Game.flags["home"].pos )
            }
            else{
                var target =  creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (s) => {
                        return (
                            ((s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_LINK) && s.energy < s.energyCapacity)
                            || s.structureType == STRUCTURE_TOWER && s.energy < 850)}});
                if(target) {
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }
        }
	}
};

module.exports = roleDistantHarvester;