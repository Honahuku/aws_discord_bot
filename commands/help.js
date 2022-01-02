// embed用変数宣言
const { MessageEmbed } = require('discord.js');

// embedの定義
// https://scrapbox.io/discordjs-japan/MessageEmbed%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E5%9F%8B%E3%82%81%E8%BE%BC%E3%81%BF%E3%82%92%E9%80%81%E4%BF%A1%E3%81%99%E3%82%8B%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB
const Embed = new MessageEmbed()
	.setTitle('aws_discord_bot')
	.setDescription('これはDiscord.jsを用いてAWS CLIを操作するBotプログラムです')
	.setURL('https://github.com/Honahuku/aws_discord_bot')
	.setThumbnail('https://raw.githubusercontent.com/Honahuku/aws_discord_bot/master/img/aws_discord_bot_ico.png')
	.setColor('#0099ff')
	.addField('利用可能なコマンド', '----')
	.addField('info', 'サーバーの状態を取得します')
	.addField('start', 'サーバーを起動します')
	.addField('stop', 'サーバーを停止します')
	.addField('help', 'このヘルプページを表示します')
	.addField('----', 'エラーコード')
	.addField('"インタラクションに失敗しました"と表示される', '少し待ってから再度コマンドを実行してください');

// スラッシュコマンド用選択肢の定義
module.exports = {
	data: {
		name: 'help',
		description: 'このBotのヘルプページを表示します',
	},

	// インタラクションの発生、処理を発火
	async execute(interaction) {
		await interaction.reply({ embeds: [Embed] });
	},
};