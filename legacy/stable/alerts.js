/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('alerts');
 * mod.thing == 'a thing'; // true
 */

var alerts = {
    checkRate : function() {
        //Check to see if it is at or past time to send an email alert
        if( Date.now() >= Memory.alerts.nextUpdate ) {
            var emailString = '';
            var totalProgress = 0;
            // Iterate though the spawns
            for( var s in Game.spawns ) {
                if( Game.spawns[s].memory.roomControllerProgress == undefined ) {
                    emailString += 'Could not get room controller progress on '+s+' because it had no memory.';
                }
                else if( Game.spawns[s].memory.roomControllerProgress == Game.spawns[s].room.controller.progress ) {
                    emailString += 'No progress has been made on '+Memory.territories[Game.spawns[s].room.name].name+' - it will automatically downgrade in approximately '+Math.floor((Game.spawns[s].room.controller.ticksToDowngrade*2.5)/(60*60))+ ' hours.';
                }
                else {
                    territoryPercent = Math.floor((Game.spawns[s].room.controller.progress/Game.spawns[s].room.controller.progressTotal)*100);
                    territoryRemainingTime = Math.floor((Game.spawns[s].room.controller.progressTotal - Game.spawns[s].room.controller.progress)/(Game.spawns[s].room.controller.progress-Game.spawns[s].memory.roomControllerProgress));
                    if( territoryRemainingTime > 24 ) {
                        territoryRemainingTime = ((territoryRemainingTime/24).toString()).substring(0,5)+' days';
                    }
                    else {
                        territoryRemainingTime = ((territoryRemainingTime).toString()).substring(0,5)+' hours';
                    }
                    emailString += 'Territory '+Memory.territories[Game.spawns[s].room.name].name+' currently at '+territoryPercent+'% - only '+territoryRemainingTime+' remaining for this controller';
                }
                Game.spawns[s].memory.roomControllerProgress = Game.spawns[s].room.controller.progress;
                totalProgress += Game.spawns[s].room.controller.progress-Game.spawns[s].memory.roomControllerProgress;
                emailString += '\n\r';
            }
            
            emailString += "-----\n\r";
            
            gclRemainingTime = Math.floor((Game.gcl.progressTotal - Game.gcl.progress)/(Game.gcl.progress-Memory.gclProgress));
            
            if( gclRemainingTime > 24 ) {
                gclRemainingTime = ((gclRemainingTime/24).toString()).substring(0,7)+' days';
            }
            else {
                gclRemainingTime = ((gclRemainingTime).toString()).substring(0,7)+' hours';
            }
            
            emailString += "*GCL: Level "+Game.gcl.level+", currently at "+(((Game.gcl.progress/Game.gcl.progressTotal)*100).toString()).substring(0,5)+"% - Assuming all spawns progress, only "+gclRemainingTime+" remaining*";
            
            Game.notify( emailString );
            console.log("Sent e-mail update!");
            Memory.alerts.nextUpdate = Date.now() + (60*60*1000);
            Memory.gclProgress = Game.gcl.progress;
        }
    }
}

module.exports = alerts;