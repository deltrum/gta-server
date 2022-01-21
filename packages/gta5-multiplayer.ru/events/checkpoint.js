module.exports =
{
	"playerEnterCheckpoint" : (player, checkpoint) =>
	{
		console.log("Enter checkpoint:" + checkpoint.id);
	},
	"playerExitCheckpoint" : (player, checkpoint) =>
	{
		console.log("Exit checkpoint:" + checkpoint.id);
	}
};