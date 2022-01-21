var registeredEvents = [];

console.log('\nLoading systems:'); 

fs.readdirSync(path.resolve(__dirname, '../systems')).forEach(src =>
{
	process.stdout.write('\t\"' + src + '\"');
	registeredEvents = registeredEvents.concat(require('../systems/' + src)); 
	console.log(" - OK");
});

registeredEvents.forEach(event => { mp.events.add(event); });