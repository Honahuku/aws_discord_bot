const { MessageEmbed } = require('discord.js');

const Embed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('help')
	.setDescription('このBotのヘルプページを表示します');

module.exports = {

	data: {
		name: 'help',
		description: 'このBotのヘルプページを表示します',
	},
	async execute(interaction) {
		await interaction.reply({ embeds: [Embed] });
	},
};