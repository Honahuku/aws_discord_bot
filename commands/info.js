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
