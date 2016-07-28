/*
	Screeps
	Builder Role
	
	Purpose: Travel to its territory, find the nearest active source to itself, and then extract energy. It then looks for building sites or weakened structures to build.
	Harvests: Energy
	Build: [WORK, MOVE] * Controller Level, [CARRY] * Controller Level * 1.5
	
*/

// How talkative are we this tick?

	// Do we have any friends nearby?
	
	// Do we have any allies nearby?

// Determine the status of this creep

	// If born, set to harvesting

	// If harvesting, and full on energy, set to building or emergency fortification
	
		// If there is a detected nuke in the room, set to emergency fortification
		
		// Otherwise, set to harvesting
		
	// If building, and no energy left, set to harvesting 
		
// See if we are in the correct territory

	// If not, move toward the correct territory
	
// If this creeps is harvesting

	// If so, find the nearest active source
	
	// Try and harvest the source
	
		// If too far away, move towards source
		
// If this creep is building

	// Look for critically low structures (Hits <= 10%)
	
		// If found, try and repair the structure
		
			// If too far away, move closer
			
	// Otherwise, look for construction sites
	
		// If found, try and build the structure
		
			// If too far away, move closer
			
	// Otherwise, find the nearest structure below the RCL structure threshold
	
		// If found, try and fortify it
		
			// If too far away, move closer

// If this creep is fortifying for an emergency Nuke

	// If the Nuke is already encapsulated
	
		// Fortify the ramparts, from the closest to the furthest to the Nuke
		
	// Otherwise, create a construction site at each structure in the Nuke's range for a rampart
