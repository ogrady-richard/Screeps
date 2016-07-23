var roleCleaner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if( creep.memory.territory == undefined)
            creep.memory.territory = "Principium";
	    if( (creep.carry.energy == 0 && creep.memory.harvesting == false) || creep.memory.harvesting == undefined) {
	        creep.memory.harvesting = true;
        }
        else if( (creep.carry.energy == creep.carryCapacity) && creep.memory.harvesting == true ) {
            creep.memory.harvesting = false;
        }
        
        if( creep.memory.harvesting == true) {
	        if( creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES) != null ){
	            source = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                if(creep.pickup(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
	        }
	        else {
    	        var source = creep.room.find(FIND_SOURCES_ACTIVE)[0];
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
	        }
        }
        else {
            var target =  creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => {
                        return (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_TOWER) &&
                            s.energy < s.energyCapacity;
                    }
            });
            if(target != null) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
	}
    
    
};

module.exports = roleCleaner;