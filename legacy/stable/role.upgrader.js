var roleUpgrader = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if( creep.memory.territory == undefined)
            creep.memory.territory = "Principium";
        
        if( (creep.memory.action == "upgrading" && creep.carry.energy == 0) || creep.memory.action == undefined) {
            creep.memory.action = "harvesting";
        }
        else if( creep.memory.action == "harvesting" && creep.carry.energy == creep.carryCapacity ) {
            creep.memory.action = "upgrading";
        }
        if( Memory.territories[creep.room.name].name != creep.memory.territory ) {
            roomNumber = _.findKey(Memory.territories, {name: creep.memory.territory});
            gotoLocation = new RoomPosition(25,25,roomNumber);
            creep.moveTo(gotoLocation);
        }
        else{
            if(creep.memory.action == "harvesting") {
                creep.memory.useSources = true;
                if( creep.room.find(FIND_SOURCES_ACTIVE ) != null && creep.memory.useSources ) {
                    var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }
                else {
                    var source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter : (s) => {
                            return((s.structureType == STRUCTURE_LINK && s.energy > 0) || (s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > 0));
                        }
                    });
                    if( source != undefined ) {
                        if( source.structureType == STRUCTURE_LINK ) {
                            if( creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
                                creep.moveTo(source);
                            }
                        }
                        else {
                            if( source.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
                                creep.moveTo(source);
                            }
                        }
                    }
                }
            }
            else if( creep.memory.action == "upgrading") {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    }
}

module.exports = roleUpgrader;