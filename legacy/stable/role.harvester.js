var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if( creep.memory.territory == undefined)
            creep.memory.territory = "Principium";
        
	    if( (creep.carry.energy == 0 && creep.memory.harvesting == false) || creep.memory.harvesting == undefined) {
                creep.memory.harvesting = true;
                creep.say("🚀");
        }
        else if((creep.carry.energy == creep.carryCapacity) && creep.memory.harvesting == true ) {
            creep.memory.harvesting = false;
        }
        
        if( creep.memory.harvesting == true) {
            if( Memory.territories[creep.room.name].name != creep.memory.territory ) {
                roomNumber = _.findKey(Memory.territories, {name: creep.memory.territory});
                gotoLocation = new RoomPosition(25,25,roomNumber);
                creep.moveTo(gotoLocation);
            }
            else {
                var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
        else {
            if( creep.room == Game.spawns[creep.memory.spawn].room ) {
                var target =  creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => {
                        return (
                            ((s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_LINK) && s.energy < s.energyCapacity)
                            || s.structureType == STRUCTURE_TOWER && s.energy < 800)}});

                if(target != null) {
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    creep.moveTo(Game.spawns[creep.memory.spawn].pos);
                }
            }
            else {
                creep.moveTo(Game.spawns[creep.memory.spawn].pos);
            }
        }
	}
    
    
};

module.exports = roleHarvester;