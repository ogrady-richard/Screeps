/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.miner');
 * mod.thing == 'a thing'; // true
 */

var roleMiner = {
run: function(creep) {
        if( creep.memory.territory == undefined)
            creep.memory.territory = "Principium";
        
        creepSpawnMineral = creep.room.find(FIND_MINERALS)[0];
        
	    if( ((creep.carry[creepSpawnMineral.mineralType] == 0 || creep.carry[creepSpawnMineral.mineralType] == undefined) && creep.memory.harvesting == false) || creep.memory.harvesting == undefined) {
                creep.memory.harvesting = true;
                creep.say("🚀");
        }
        else if((creep.carry[creepSpawnMineral.mineralType] == creep.carryCapacity) && creep.memory.harvesting == true ) {
            creep.memory.harvesting = false;
        }
        
        if( creep.memory.harvesting == true) {
            if( Memory.territories[creep.room.name].name != creep.memory.territory ) {
                roomNumber = _.findKey(Memory.territories, {name: creep.memory.territory});
                gotoLocation = new RoomPosition(25,25,roomNumber);
                creep.moveTo(gotoLocation);
            }
            else {
                var source = creep.pos.findClosestByRange(FIND_MINERALS);
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
                            (s.structureType == STRUCTURE_LAB && Memory.labs[s.id].mineral == creepSpawnMineral.mineralType ))}});

                if(target != null) {
                    if(creep.transfer(target, creepSpawnMineral.mineralType) == ERR_NOT_IN_RANGE) {
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
    
}

module.exports = roleMiner;