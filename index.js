const debug = require('debug')('l4n:provider:reflexArena');
const { source } = require('l4n-query');

const publicInfo = `# Reflex Arena
[buy it on steam](http://store.steampowered.com/app/328070/Reflex_Arena/)

Reflex Arena is the hardcore arena-based shooter - the true benchmark of skill,
played both competitively and casually.

Reflex Arena is a return to roots, pure, fast, first person shooter. You will be pushed to
your limits facing other contestants in a range of rich and diverse arena-base environments.
Delivering a truly rewarding experience based purely on your skill and success. Train to unlock
your genetic potential and bring it online for the ultimate proving ground and make your mark.
There are no limitations in Reflex Arena, the true evolution of the classic arena shooter genre.`;

const modes = [{
    id: '1v1',
    name: 'Duel',
    lobby: { minPlayers: 2 },
    args: ['+sv_startmode', '1v1'],
}, {
    id: '2v2',
    name: '2 vs 2',
    lobby: { minPlayers: 4 },
    args: ['+sv_startmode', '2v2'],
}, {
    id: 'tdm',
    name: 'Team Deathmatch',
    lobby: { minPlayers: 8 },
    args: ['+sv_startmode', 'tdm'],
}, {
    id: 'ffa',
    name: 'Free For All',
    lobby: { minPlayers: 3 },
    args: ['+sv_startmode', 'ffa'],
}, {
    id: 'race',
    name: 'Race',
    lobby: { minPlayers: 1 },
    args: ['+sv_startmode', 'race'],
}, {
    id: 'ctf',
    name: 'Capture the flag',
    lobby: { minPlayers: 8 },
    args: ['+sv_startmode', 'ctf'],
}];

const getArgs = ({ lobby, port }) => {
    const { args: dynArgs } = modes.find(mode => mode.name === lobby.mode);
    return [
        '+sv_hostname', lobby.name,
        '+sv_gameport', port,
        '+sv_maxclients', '16',
        '+com_logfilename', `${Date.now()}.txt`,
    ].concat(dynArgs);
}

module.exports = ({ workingDir }) => ({
    servers: modes.map(mode => ({
        id: `reflexarena-${mode.id}`,
        lobby: {
            game: 'Reflex Arena',
            mode: mode.name,
            publicInfo,
            maxPlayers: 16,
            ...mode.lobby,
        }
    })),
    portRange: [25700, 25800],
    getArgs,
    command: {
        win32: 'reflexded.exe',
    },
    options: {
        cwd: workingDir,
    },
    query: source,
});
