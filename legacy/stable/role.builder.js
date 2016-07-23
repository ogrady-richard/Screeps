var idleChitchat = require('idle.chitchat');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if( creep.memory.territory == undefined)
            creep.memory.territory = "Principium";
        idleChitchat.converse(creep);

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }

        if( Memory.territories[creep.room.name].name != creep.memory.territory ) {
            roomNumber = _.findKey(Memory.territories, {name: creep.memory.territory});
            gotoLocation = new RoomPosition(25,25,roomNumber);
            creep.moveTo(gotoLocation);
        }
        else {
            if(creep.memory.building) {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                }
                else {
                    var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: object => object.hits < object.hitsMax && object.hits < 200000
                    });
                    
                    if(target != null) {
                        if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        }
                        else {
                            if( Math.random() > 0.90){
                                creep.say("⚒ : " + Math.floor((target.hits/target.hitsMax)*100) + "%",true);
                            }
                        }
                    }
                }
            }
            
            else {
                var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
    }
};

module.exports = roleBuilder;