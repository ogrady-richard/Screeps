/*
	This initializing script will prepare all the correct Memory objects for a clean setup.
	WARNING: While this script is not designed to impact any existing Memory objects, it will overwrite any existing Memory objects of the same name.
	It will not check for conflicts first because the rest of the scripts are dependant on these MEmory objects being correct and configured properly.
	Therefore, make sure you backup your memory if you are attempting to use this initialize script.
*/

// Fill this in with your pre-existing spawn and territory data using this template:
/*
Memory.territories = {
	<territory room id> : {
		name: <name flavor text>,
		status: <owned/claim/reserve/attack/avoid>,
		tickAcquired: <tick you acquired the room, leave blank>,
		tickLastAttacked: <tick upon which one of your creeps sustained damage, leave blank>,
		attacker: undefined,
		barracks: [<an x-y array of where you would like defender units to migrate to>],
		creepStock: {
			harvester: <amount>
			builder: <amount>
			..
			..
			upgrader: <amount>
			// Any roles left blank will be treated as an amount of 0
		}
	}
	// Repeat for each territory
}
Memory.spawns[<spawner name>] = {
	linkNetwork : [
		{
			to: <link or terminal id>,
			from: <link or terminal id>
		}
		// Repeat for each link network node
	],
	gates: [<x-y array of the location of a 'gate' rampart>]
}
*/
var initializeMemory = {

	
}
	
module.exports = initializeMemory;
