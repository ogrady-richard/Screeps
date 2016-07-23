var idleChitchat = require('idle.chitchat');

Game.spawns["HomeSweetHome"].memory.friendlies = ["nac","Camamoow"];

var roleDefender = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if( creep.memory.territory == undefined)
            creep.memory.territory = "Principium";
        idleChitchat.converse(creep);
        
        if( Memory.territories[creep.room.name].name != creep.memory.territory ) {
            roomNumber = _.findKey(Memory.territories, {name: creep.memory.territory});
            gotoLocation = new RoomPosition(25,25,roomNumber);
            creep.moveTo(gotoLocation);
        }
        else {
            var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if( target != null ) {
                if( Memory.allies.indexOf(target.owner.username) == -1) {
                    if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    barracks = _.findKey(Memory.territories, {name: creep.memory.territory});
                    gotoLocation = new RoomPosition(Memory.territories[barracks].barracks[0],Memory.territories[barracks].barracks[1],barracks);
                    creep.moveTo(gotoLocation);
                }
            }
            else {
                barracks = _.findKey(Memory.territories, {name: creep.memory.territory});
                gotoLocation = new RoomPosition(Memory.territories[barracks].barracks[0],Memory.territories[barracks].barracks[1],barracks);
                creep.moveTo(gotoLocation);
            }
            
        }
    }
}

module.exports = roleDefender;