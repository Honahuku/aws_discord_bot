const { MessageEmbed } = require('discord.js');
const execSync = require('child_process').execSync;
let status;
let address;

let Embed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Server Info')
	.setDescription('サーバーの状態を取得しています');

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
		if (interaction.options.getString('server') === 'dev1') {
			await interaction.reply({ embeds: [Embed] });
			{
				status = execSync(`./sh/info.sh ${process.env.DEV1_INSTANCE_ID}`).toString();
				address = execSync(`./sh/address.sh ${process.env.DEV1_INSTANCE_ID}`).toString();
				console.log(status);
				Embed = new MessageEmbed()
					.setColor('#0099ff')
					.setTitle(`${interaction.options.getString('server')} Info`)
					.addField('Status', status)
					.addField('Addres', address);
				interaction.editReply({ embeds: [Embed] });
			}
		}
		else if (interaction.options.getString('server') === 'dev2') {
			await interaction.reply('サーバーDev2を起動します');
		}
		else if (interaction.options.getString('server') === 'dev3') {
			await interaction.reply('サーバーDev3を起動します');
		}
		else {
			await interaction.reply('正しいサーバー名を入力してください');
		}
	},
};
