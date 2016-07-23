var census = {
    getCounts: function() {
        // Create the array for census output
        var outArray = ["\n\r\n\r\n\r|                     --CENSUS DATA--                            |"];
        outArray.push("|----------------+-----+-----+-----+-----+-----+-----+-----+-----|");
        outArray.push("|    LOCATION    |");
        
        // Create census headers
        for( var i in Memory.creepRoles ) {
            outArray[2] += ' ';
            outArray[2] += Memory.creepRoles[i].symbol;
            outArray[2] += ' |';
        }
        outArray.push("|----------------+-----+-----+-----+-----+-----+-----+-----+-----|");
        
        // Iterate through the territory list
        for(var t in Memory.territories) {
            territory = Memory.territories[t];
            // Check to make sure we want stock in this territory
            if( territory.status != 'avoid' ) {
                var nextOut = '|';
                // Get the territory location
                nextOut += territory.name;
                
                // Buffer spaces!!!
                while( nextOut.length < 17) {
                    nextOut += ' ';
                }
                
                // Iterate through registered creep roles
                for( var r in Memory.creepRoles ) {
                    if( territory.creepStock[Memory.creepRoles[r].name] != 0 ) {
                        var numCreeps = 0;
                        var tempString = '|';
                        // Iterate through the entire creep list
                        for( var c in Game.creeps ) {
                            if( Game.creeps[c].memory.role == Memory.creepRoles[r].name && Game.creeps[c].memory.territory == territory.name) {
                                numCreeps++;
                            }
                        }
                        
                        // Some formatting junk
                        if( numCreeps < 10 ) {
                            tempString += ' ';
                        }
                        else {
                            tempString += '';
                        }
                        
                        tempString += numCreeps;
                        
                        tempString += '/';
                        
                        // Output the total number of creeps for the current territory
                        tempString += territory.creepStock[Memory.creepRoles[r].name];
                        if( territory.creepStock[Memory.creepRoles[r].name] < 10 ) {
                            tempString += ' ';
                        }
                        else {
                            tempString += '';
                        }
                        
                        nextOut += tempString;
                    }
                    else {
                        nextOut += '|     ';
                    }
                }
                nextOut += '|';
                outArray.push(nextOut);
            }
        }
        outArray.push("|----------------+-----+-----+-----+-----+-----+-----+-----+-----|");
        // Output the new arrays
        for( var i in outArray ) {
            console.log(outArray[i]);
        }
        
        console.log("Total creep population: " + Object.keys(Game.creeps).length+'\n\r\n\r');
    }
}

module.exports = census;