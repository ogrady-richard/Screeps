/*
	Screeps
	Harvester Role
	
	Purpose: Travel to its territory, find the nearest active source to itself, and then extract energy. It then returns to its home spawn, and stores the energy in a container.
	Harvests: Energy
	Build: [WORK,MOVE,CARRY] * Controller Level
*/

// How talkative are we this tick?

	// Do we have any friends nearby?
	
	// Do we have any allies nearby?

// Determine the status of this creep (harvesting, returning, or recycling)

	// If born, set to harvesting

	// If harvesting, and full of energy, set to returning
	
	// If returning, and energy is empty, set to either harvesting or recycling
	
		// If our time to live is greater than 300, set to harvesting
		
		// Else, set to recycling
		
// If this creep is harvesting

	// See if we are in the correct territory
	
		// If so, find the nearest active source
		
		// Try and harvest the source
		
			// If too far away, move towards source
		
	// If we are in the wrong territory
	
		// Move toward the correct territory
	
// If this creep is returning

	// See if we are in the correct territory
	
		// If so, find the nearest non-full spawn, extension, link, lab, or tower
		
		// If one of the above exists, see if we can transfer into it
		
			// If not, move towards the source
			
		// Else find the nearest storage container
		
		// Can we transfer into that?
		
			// If not, move towards it
			
// If this creep is recycling

	// See if the creep spawn can recycle this creep
	
		// If not, move towards the spawn
		
// Finally, check to see if this creep was attacked

	// If it was attacked by an NPC
	
		// Update the e-mail notification daemon
		
	// If it was attacked by another player
	
		// CONTINUE HERE
		
