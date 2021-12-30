const { MessageEmbed } = require('discord.js');

const Embed = new MessageEmbed()
	.setTitle('aws_discord_bot')
	.setDescription('これはDiscord.jsを用いてAWS CLIを操作するBotプログラムです')
	.setURL('https://github.com/Honahuku/aws_discord_bot')
    .setThumbnail('')
	.setColor('#0099ff')
	.addField('利用可能なコマンド', 'a')
	.addField('info', 'サーバーの状態を取得します')
	.addField('start', 'サーバーを起動します')
	.addField('stop', 'サーバーを停止します')
	.addField('help', 'このヘルプページを表示します');

module.exports = {

	data: {
		name: 'help',
		description: 'このBotのヘルプページを表示します',
	},
	async execute(interaction) {
		await interaction.reply({ embeds: [Embed] });
	},
};