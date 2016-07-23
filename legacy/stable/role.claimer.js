/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.claimer');
 * mod.thing == 'a thing'; // true
 */
var roleClaimer = {
    run : function(creep) {
        if( creep.memory.territory == undefined)
            creep.memory.territory = "Primum Suum";

        if( Memory.territories[creep.room.name].name != creep.memory.territory ) {
            roomNumber = _.findKey(Memory.territories, {name: creep.memory.territory});
            gotoLocation = new RoomPosition(25,25,roomNumber);
            creep.moveTo(gotoLocation);
        }
        else {
            if(creep.room.controller) {
                if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    }
}
module.exports = roleClaimer;