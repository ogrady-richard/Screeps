var idleChitchat = require('idle.chitchat');
var getSource = require('map.findSource');


var roleDistantBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(Game.flags[creep.memory.mapLocation] == undefined) {
            creep.memory.mapLocation = getSource.get();
            console.log(creep.name+" is going away to the '"+creep.memory.mapLocation+"' flag to do some construction!");
        }
        
        idleChitchat.converse(creep);
        
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say("🔨");
	    }

	    if(creep.memory.building) {
	        if(Game.flags[creep.memory.mapLocation].room == creep.room) {
    	        var targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    
                if(targets) {
                    if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets);
                    }
                }
                else {
                    var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: object => object.hits < object.hitsMax && object.hitsMax <= 1000000
                    });
                    
                    targets.sort(function(a,b){
                        if(a.hits/a.hitsMax < b.hits/b.hitsMax) {return -1;}
                        if(a.hits/a.hitsMax > b.hits/b.hitsMax) {return 1;}
                        else return 0;
                    });
                    
                    if(targets.length > 0) {
                        if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0]);
                        }
                        else {
                            if( Math.random() > 0.90){
                                creep.say("⚒ : " + Math.floor((targets[0].hits/targets[0].hitsMax)*100) + "%");
                            }
                        }
                    }
                }
            }
            else {
                creep.moveTo(Game.flags[creep.memory.mapLocation]);
            }
        }
	    else {
            var pos = creep.room.getPositionAt(creep.pos["x"],creep.pos["y"]);
            var source = pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE && source != null) {
                creep.moveTo(source);
            }
            else if( source == null ) {
                creep.moveTo(creep.memory.mapLocation);
            }
        }
	}
};

module.exports = roleDistantBuilder;