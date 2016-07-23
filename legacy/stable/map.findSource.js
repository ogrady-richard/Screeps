/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('map.findSource');
 * mod.thing == 'a thing'; // true
 */
var getSource = {
    get : function() {
        var nextSource = Memory.nextSource
        mapFlag = nextSource.mapFlags[nextSource.currentFlag].toString();
        nextSource.currentFlag++;
        
        if(nextSource.mapFlags[nextSource.currentFlag] == undefined)
            nextSource.currentFlag = 0;
        
        return mapFlag;
    },
    _get: function(homeSpawn) {
        roomStock = Game.spawns[homespawn].memory.roomStockList;
        
        
    }
    
}


module.exports = getSource;