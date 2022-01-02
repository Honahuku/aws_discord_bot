// embed用変数宣言
const { MessageEmbed } = require('discord.js');
const execSync = require('child_process').execSync;
let status;
let address;

module.exports = {
	data: {
		name: 'info',
		description: 'サーバー状態を確認します',
		options: [{
			type: 'STRING',
			name: 'server',
			description: '確認するサーバーを入力してください',
			required: true,
			choices: [
				{ name: 'dev1', value: 'dev1' },
				{ name: 'dev2', value: 'dev2' },
				{ name: 'dev3', value: 'dev3' },
			],
		}],
	},
	async execute(interaction) {
		// embedの定義
		// https://scrapbox.io/discordjs-japan/MessageEmbed%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E5%9F%8B%E3%82%81%E8%BE%BC%E3%81%BF%E3%82%92%E9%80%81%E4%BF%A1%E3%81%99%E3%82%8B%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB
		let Embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Server Info')
			.setDescription('サーバーの状態を取得しています');

		if (interaction.options.getString('server') === 'dev1') {
			await interaction.reply({ embeds: [Embed] });
			{
				status = execSync(`./sh/info.sh ${process.env.DEV1_INSTANCE_ID}`).toString();
				address = execSync(`./sh/address.sh ${process.env.DEV1_INSTANCE_ID}`).toString();
				console.log(status);
				Embed = new MessageEmbed()
					.setColor('#0099ff')
					.setTitle(`/ info server: ${interaction.options.getString('server')}`)
					.addField('Status', status)
					.addField('Addres', address);
				interaction.editReply({ embeds: [Embed] });
			}
		}
		else if (interaction.options.getString('server') === 'dev2') {
			await interaction.reply({ embeds: [Embed] });
			{
				status = execSync(`./sh/info.sh ${process.env.DEV2_INSTANCE_ID}`).toString();
				address = execSync(`./sh/address.sh ${process.env.DEV2_INSTANCE_ID}`).toString();
				console.log(status);
				Embed = new MessageEmbed()
					.setColor('#0099ff')
					.setTitle(`/ info server: ${interaction.options.getString('server')}`)
					.addField('Status', status)
					.addField('Addres', address);
				interaction.editReply({ embeds: [Embed] });
			}
		}
		else if (interaction.options.getString('server') === 'dev3') {
			await interaction.reply({ embeds: [Embed] });
			{
				status = execSync(`./sh/info.sh ${process.env.DEV3_INSTANCE_ID}`).toString();
				address = execSync(`./sh/address.sh ${process.env.DEV3_INSTANCE_ID}`).toString();
				console.log(status);
				Embed = new MessageEmbed()
					.setColor('#0099ff')
					.setTitle(`/ info server: ${interaction.options.getString('server')}`)
					.addField('Status', status)
					.addField('Addres', address);
				interaction.editReply({ embeds: [Embed] });
			}
		}
		else {
			await interaction.reply('正しいサーバー名を入力してください');
		}
	},
};
