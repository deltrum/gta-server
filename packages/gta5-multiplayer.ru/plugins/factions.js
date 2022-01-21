var registeredEvents = [];

console.log('\nLoading factions:'); 

fs.readdirSync(path.resolve(__dirname, '../configs/faction')).forEach(src =>
{
	process.stdout.write('\t\"' + src + '\"');
	registeredEvents = registeredEvents.concat(require('../configs/faction/' + src)); 
	console.log(" - OK");
});

registeredEvents.forEach(event => { mp.events.add(event); });