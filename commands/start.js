const { MessageEmbed } = require('discord.js');
const execSync = require('child_process').execSync;
let status;
let address;

// 非同期のdelayを定義
function delay(n) {
	return new Promise(function(resolve) {
		setTimeout(resolve, n * 1000);
	});
}

let Embed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Server Start')
	.setDescription('サーバーを起動しています');

module.exports = {
	data: {
		name: 'start',
		description: 'サーバーを起動します',
		options: [{
			type: 'STRING',
			name: 'server',
			description: '起動するサーバーを入力してください',
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
			block: for (; ;) {
				execSync(`./sh/start.sh ${process.env.DEV1_INSTANCE_ID}`).toString();
				status = execSync(`./sh/info.sh ${process.env.DEV1_INSTANCE_ID}`).toString();
				address = execSync(`./sh/address.sh ${process.env.DEV1_INSTANCE_ID}`).toString();
				Embed = new MessageEmbed()
					.setColor('#0099ff')
					.setTitle(`${interaction.options.getString('server')} Start`)
					.addField('Status', status)
					.addField('Addres', address);
				interaction.editReply({ embeds: [Embed] });
				console.log(status);
				if (status == 'running') {
					break block;
				}
				await delay(1);
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
