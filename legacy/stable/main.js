/*
SCREEPS Main code
Tsuji F. Wolf
July 13, 2016

Version 0.40
*/

// Load dependencies
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleDistantHarvester = require('role.distantHarvester');
var roleDistantBuilder = require('role.distantBuilder')
var roleDefender = require('role.defender');
var roleClaimer = require('role.claimer');
var roleCleaner = require('role.cleaner');
var roleMiner = require('role.miner');
var alerts = require('alerts');
var census = require('census');

// Worker populations
var spawnRoles = { 
    defaultRoles : { 
        harvester : 7,
        claimer : 1,
        defender : 1,
        dHarvester: 7,
        builder: 3,
        dBuilder: 5,
        upgrader : 12
    },
    E36N27: function() {return(this.defaultRoles)}
}


var maxHarvesters = 4;
var maxCleaners = 1;
var maxClaimers = 2;
var maxDefenders = 2;
var maxDistantHarvesters = 7;
var maxBuilders = 2;
var maxDistantBuilders = 2;
var maxUpgraders = 3;
var maxHomeDefenders = 1;

// Establish minimum creep cost
var creepCost = 900;

// Set build loadouts
/*
    TOUGH     - 10
    MOVE      - 50
    CARRY     - 50
    ATTACK    - 80
    WORK      - 100
    R-ATTACK  - 150
    HEAL      - 250
    CLAIM     - 600
*/ 
//                          |  1   |  2   |  3   |  4   |  5   |  6   |  7   |  8   |  9   |  10  |  11  |  12  |  13  |  14  |  15  |  16  |

var defaultBuild =          [WORK  ,WORK  ,WORK  ,WORK  ,WORK  ,WORK  ,WORK  ,
                            CARRY  ,CARRY ,CARRY ,CARRY ,CARRY ,CARRY ,CARRY ,
                            MOVE   ,MOVE  ,MOVE  ,MOVE  ,MOVE  ,MOVE  ,MOVE  ];
var defenderBuild =        [TOUGH  ,TOUGH ,TOUGH ,TOUGH ,TOUGH ,
                            ATTACK ,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                            MOVE   ,MOVE  ,MOVE  ,MOVE  ,MOVE];
var distantHarvesterBuild = [WORK  ,WORK  ,WORK  ,WORK  ,
                            CARRY  ,CARRY ,CARRY ,CARRY ,CARRY ,CARRY ,CARRY ,CARRY ,
                            MOVE   ,MOVE  ,MOVE  ,MOVE  ,MOVE  ,MOVE  ,MOVE];
var claimerBuild =          [MOVE  ,
                             CLAIM];
var cleanerBuild =          [MOVE  ,MOVE  ,MOVE  ,MOVE  ,
                             CARRY ,CARRY ,CARRY ,CARRY ,
                             WORK  ];
var upgraderBuild =          [MOVE ,MOVE  ,MOVE  ,MOVE  ,MOVE  ,MOVE  ,MOVE  ,
                             CARRY ,CARRY ,CARRY ,CARRY ,CARRY ,
                             WORK  ,WORK  ,WORK  ,WORK  ,WORK ,WORK, WORK ,WORK];

// Function for getting birth/death messages
var birthMsg = function(creepName, creepRole) {
    msgArr = ["Welcome "+creepName+" the "+creepRole+" into the world!", 
              "Another "+creepRole+"!! Everybody say hello to "+creepName+"!", 
              "Let's all welcome "+creepName+" the "+creepRole+" to the party!",
              "Here comes  "+creepName+" - "+creepRole+" and born to follow!!",
              "Is that "+creepName+"? The fabled "+creepRole+" from afar?",
              "Give it up for "+creepName+" the new "+creepRole+"!!"];
    msgNum = Math.floor( Math.random() * msgArr.length );
    console.log("( + )  " + msgArr[msgNum]);
    //populationCount();
    census.getCounts();
}

var deathMsg = function(creepName) {
    msgArr = ["Poor "+creepName+" died of exhaustion.", 
              "Our fearless "+creepName+" passed away while working.", 
              "Dear sweet "+creepName+" worked themself to death.",
              "Oh no! "+creepName+" has fallen and they can't get up!",
              "Despite their strong will, "+creepName+" just can't go on any longer.",
              "Uh oh. "+creepName+" may or may not have exploded violently.",
              "Goodness! "+creepName+" sure died in a grisly fashion...",
              "Oh snap. "+creepName+" caught the death fever."];
    msgNum = Math.floor( Math.random() * msgArr.length );
    console.log("( - )  " + msgArr[msgNum]);
    //populationCount();
    census.getCounts();
}

/*  FUNCTION doWork
    
    Perform all worker tasks.
    
*/
var doWork = function() {
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if( creep.memory.role=="harvester") {
            roleHarvester.run(creep);
        }
        if( creep.memory.role=="upgrader") {
            roleUpgrader.run(creep);
        }
        if( creep.memory.role=="builder") {
            roleBuilder.run(creep);
        }
        if( creep.memory.role=="defender") {
            roleDefender.run(creep);
        }
        if( creep.memory.role=="claimer") {
            roleClaimer.run(creep);
        }
        if( creep.memory.role=="cleaner") {
            roleCleaner.run(creep);
        }
        if( creep.memory.role=="miner") {
            roleMiner.run(creep);
        }
    }
    alerts.checkRate();
}

var doTowerWork = function(tower) {
    if(tower.room.find(FIND_HOSTILE_CREEPS).length == 0 && tower.energy > 700) {
        var targets = tower.room.find(FIND_STRUCTURES, {filter : (s) => {return(s.hitsMax <= 300000000 && s.hits < 5000)}});
        
        targets.sort(function(a,b){
            if(a.hits/a.hitsMax < b.hits/b.hitsMax) {return -1;}
            if(a.hits/a.hitsMax > b.hits/b.hitsMax) {return 1;}
            else return 0;
        });
        
        if(targets) {
            tower.repair(targets[0]);
        }
    }
    else {
        targets = tower.room.find(FIND_HOSTILE_CREEPS, {filter: (s) => { return ( Memory.allies.indexOf(s.owner.username) == -1 )}});
        tower.attack(targets[0]);
    }
}

var openGates = function(spawnName) {
    gates = Game.spawns[spawnName].memory["gates"];
    
    for( var gateIndex in gates ) {
        structuresAtGatePosition = Game.spawns[spawnName].room.lookForAt(LOOK_STRUCTURES, gates[gateIndex][0], gates[gateIndex][1]);
        for( structureIndex in structuresAtGatePosition ) {
            if( structuresAtGatePosition[structureIndex].structureType == STRUCTURE_RAMPART) {
                structuresAtGatePosition[structureIndex].setPublic(true);
            }
        }
    }
}

var closeGates = function(spawnName) {
    gates = Game.spawns[spawnName].memory["gates"];
    
    for( var gateIndex in gates ) {
        structuresAtGatePosition = Game.spawns[spawnName].room.lookForAt(LOOK_STRUCTURES, gates[gateIndex][0], gates[gateIndex][1]);
        for( structureIndex in structuresAtGatePosition ) {
            if( structuresAtGatePosition[structureIndex].structureType == STRUCTURE_RAMPART) {
                structuresAtGatePosition[structureIndex].setPublic(false);
            }
        }
    }
}

// Loop
module.exports.loop = function () {
    // Check for poor dead creeps.
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            deathMsg(name);
        }
    }
    
    // Get the current running total of all creeps
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == "harvester");
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == "claimer");
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == "builder");
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == "upgrader");
    var distantHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == "dHarvester");
    var distantBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == "dBuilder");
    var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == "defender");
    var cleaners = _.filter(Game.creeps, (creep) => creep.memory.role == "cleaner");
    
    // If we are running out of a certain creep at any spawn, make more.
    for( var s in Game.spawns) {
        
        // Check for happy new creeps!
        if( Memory.spawns[s].spawning == false && Game.spawns[s].spawning == undefined ) {
            Memory.spawns[s].spawning = false;
        }
        else if(  Game.spawns[s].spawning != undefined ) {
            Memory.spawns[s].spawning = true;
        }
        else if(Memory.spawns[s].spawning == true && Game.spawns[s].spawning == undefined) {
            birthMsg(Memory.newWorker[0], Memory.newWorker[1]);
            Memory.spawns[s].spawning = false;
        }
        
        // Manage links
        try {
            if( Memory.spawns[s].linkNetwork[0] != 0 && Memory.spawns[s].linkNetwork[1] != 0) {
                if( Game.getObjectById(Memory.spawns[s].linkNetwork[0]).energy == Game.getObjectById(Memory.spawns[s].linkNetwork[0]).energyCapacity &&
                Game.getObjectById(Memory.spawns[s].linkNetwork[1]).energy != 799) {
                    Game.getObjectById(Memory.spawns[s].linkNetwork[0]).transferEnergy(Game.getObjectById(Memory.spawns[s].linkNetwork[1]));
                }
            }
        }
        catch (e){console.log(e)}
    
        // Manage towers
        towers = Game.spawns[s].room.find(FIND_STRUCTURES, {filter : (t) => {return(t.structureType == STRUCTURE_TOWER)}});
        for( var t in towers ) {
            doTowerWork(towers[t]);
        }
        
        if( Game.rooms[Game.spawns[s].room.name].find(FIND_HOSTILE_CREEPS, {filter: (c) => {return( Memory.allies.indexOf(c.owner.username) != -1 )}}).length > 0 &&
            Game.rooms[Game.spawns[s].room.name].find(FIND_HOSTILE_CREEPS, {filter: (c) => {return( Memory.allies.indexOf(c.owner.username) == -1 )}}).length == 0        ) {
            openGates(s);
        }
        else {
            closeGates(s);
        }
        
        var numHomeHarvesters = 0;
        for( var c in Game.creeps ) {
            if( Game.creeps[c].memory.role == 'harvester' && Game.creeps[c].memory.territory == Memory.territories[Memory.spawns[s].territories[0]].name )
                numHomeHarvesters++;
        }
        
        if( numHomeHarvesters >= Memory.territories[Memory.spawns[s].territories[0]].creepStock.harvester ) {
            // Iterate through this spawns territory list
            for( var territoryNumber in Memory.spawns[s].territories ) {
                tName = Memory.spawns[s].territories[territoryNumber];
                if( Memory.territories[tName].status != 'avoid' ) {
                    // Iterate through the roles in the creep stock list of each territory, if we have enough workers
                    for( var role in Memory.territories[tName].creepStock ) {
                        if( Memory.territories[tName].creepStock[role] == undefined ) {
                            Memory.territories[tName].creepStock[role] = 0;
                        }
                        var numCreeps = 0;
                        for( var c in Game.creeps) {
                            if( Game.creeps[c].memory.role == role && Memory.territories[tName].name == Game.creeps[c].memory.territory ) {
                                numCreeps++;
                            }
                        }
                        
                        if( numCreeps < Memory.territories[tName].creepStock[role] ) {
                            if( Game.spawns[s].canCreateCreep(Memory.creepRoles[role].build) == OK && Game.spawns[s].room.controller.level > 4) {
                                var newName = Game.spawns[s].createCreep( Memory.creepRoles[role].build, undefined, {role:role, spawn:s, territory: Memory.territories[tName].name} );
                                Memory.newWorker = [newName, role];
                            }
                            else if (Game.spawns[s].canCreateCreep(Memory.creepRoles[role].basicBuild) == OK && Game.spawns[s].room.controller.level <= 4) {
                                var newName = Game.spawns[s].createCreep( Memory.creepRoles[role].basicBuild, undefined, {role:role, spawn:s, territory: Memory.territories[tName].name} );
                                Memory.newWorker = [newName, role];
                            }
                        }
                    }
                    
                }
            }
        }
        else {
            role = 'harvester';
            if( Game.spawns[s].canCreateCreep(Memory.creepRoles[role].build) == OK && Game.spawns[s].room.controller.level > 5) {
                var newName = Game.spawns[s].createCreep( Memory.creepRoles[role].build, undefined, {role:role, spawn:s, territory: Memory.territories[Memory.spawns[s].territories[0]].name} );
                Memory.newWorker = [newName, role];
            }
            else if( Game.spawns[s].canCreateCreep(Memory.creepRoles[role].basicBuild) == OK && Game.spawns[s].room.controller.level <= 5) {
                var newName = Game.spawns[s].createCreep( Memory.creepRoles[role].basicBuild, undefined, {role:role, spawn:s, territory: Memory.territories[Memory.spawns[s].territories[0]].name} );
                Memory.newWorker = [newName, role];
            }
        }
    }

    // Perform creep duties.
    doWork();
}