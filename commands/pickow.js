const fetch = require('node-fetch');

module.exports = {
    name: 'pickow',
    description: 'Pick a random Overwatch hero based on role and ignored heroes.',
    usage: 'pickow <role> <ignore: comma separated, optional>',
    action: async (msg, args) => {
        // Validate and parse arguments
        if (args.length === 0) {
            return msg.channel.send('❌ Please specify a role: **tank, damage, support, or all**.');
        }

        const role = args[0].toLowerCase();
        const validRoles = ['tank', 'damage', 'support', 'all'];
        if (!validRoles.includes(role)) {
            return msg.channel.send('❌ Invalid role. Choose from: **tank, damage, support, or all**.');
        }

        // Parse ignored heroes (comma-separated list)
        const ignoreArg = args.slice(1).join(' ');
        const ignoredHeroes = ignoreArg
            ? ignoreArg.split(',').map(hero => hero.trim().toLowerCase())
            : [];

        try {
            // Fetch hero data from OverFast API
            const response = await fetch('https://overfast-api.tekrop.fr/heroes');
            const heroes = await response.json();

            // Filter heroes based on role and ignored list
            const filteredHeroes = heroes.filter(hero => {
                const isRoleMatch = role === 'all' || hero.role.toLowerCase() === role;
                const isIgnored = ignoredHeroes.includes(hero.name.toLowerCase());
                return isRoleMatch && !isIgnored;
            });

            if (filteredHeroes.length === 0) {
                return msg.channel.send('⚠️ No heroes available with the specified criteria.');
            }

            // Select a random hero from the filtered list
            const randomHero = filteredHeroes[Math.floor(Math.random() * filteredHeroes.length)];

            // Send the result
            msg.channel.send(`🎮 **You should play: ${randomHero.name}!**`);
        } catch (error) {
            console.error('Error fetching hero data:', error);
            msg.channel.send('❌ An error occurred while fetching hero data. Try again later.');
        }
    },
};
