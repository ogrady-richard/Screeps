// Create the territory object in game memory
Memory.creepRoles = {
    harvester: {
        name: 'harvester',
        symbol: 'HAR',
        basicBuild: [WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY],
        build: [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]
    },
    cleaner: {
        name: 'cleaner',
        symbol: 'CLE',
        build: [MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,WORK],
        basicBuild: [MOVE,CARRY,WORK]
    },
    claimer: {
        name: 'claimer',
        symbol: 'CLA',
        build: [MOVE,CLAIM],
        build: [MOVE,CLAIM]

    },
    defender: {
        name: 'defender',
        symbol: 'DEF',
        build: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE],
        basicBuild: [TOUGH,TOUGH,TOUGH,ATTACK,MOVE]
    },
    builder: {
        name: 'builder',
        symbol: 'BUI',
        build: [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
        basicBuild: [WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY]
    },
    upgrader: {
        name: 'upgrader',
        symbol: 'UPG',
        build: [MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,WORK],
        basicBuild: [WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY]
    }
};
Memory.territories = {
    E36N27 : {
        status: 'owned',
        name: 'Principium',
        creepStock: {
            harvester: 4,
            builder: 2,
            claimer: 0,
            defender: 1,
            cleaner: 1,
            upgrader: 3
        },
        tickAcquired: 11721740,
        tickLastAttacked: -1,
        attacker: '',
        barracks: [34,19]
    },
    E37N27 : {
        status: 'reserve',
        name: 'Primum Suum',
        creepStock: {
            harvester: 4,
            builder: 2,
            claimer: 2,
            defender: 0,
            cleaner: 0,
            upgrader: 0
        },
        tickAcquired: -1,
        tickLastAttacked: -1,
        attacker: '',
        barracks: [29,34]
    },
    E37N28 : {
        status: 'owned',
        name: 'Secundo Terram',
        creepStock: {
            harvester: 4,
            builder: 2,
            claimer: 0,
            defender: 1,
            cleaner: 0,
            upgrader: 2
        },
        tickAcquired: -1,
        tickLastAttacked: -1,
        attacker: '',
        barracks: [31,24]
    },
    E38N29 : {
        status: 'avoid',
        name: 'Unde Procul',
        creepStock: {
            harvester: 4,
            builder: 2,
            claimer: 2,
            defender: 1,
            cleaner: 0,
            upgrader: 0
        },
        tickAcquired: -1,
        tickLastAttacked: -1,
        attacker: '',
        barracks: [30,38]
    }
};