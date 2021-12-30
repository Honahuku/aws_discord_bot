const { MessageEmbed } = require('discord.js');
const execSync = require('child_process').execSync;
let status;
let address;

// 非同期のdelayを定義
function delay(n) {
	return new Promise(function (resolve) {
		setTimeout(resolve, n * 1000);
	});
}

let Embed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Server Stop')
	.setDescription('サーバーを停止しています');

module.exports = {
	data: {
		name: 'stop',
		description: 'サーバーを停止します',
		options: [{
			type: 'STRING',
			name: 'server',
			description: '停止するサーバーを入力してください',
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
				execSync(`./sh/stop.sh ${process.env.DEV1_INSTANCE_ID}`).toString();
				status = execSync(`./sh/info.sh ${process.env.DEV1_INSTANCE_ID}`).toString();
				address = execSync(`./sh/address.sh ${process.env.DEV1_INSTANCE_ID}`).toString();
				Embed = new MessageEmbed()
					.setColor('#0099ff')
					.setTitle(`/ stop server: ${interaction.options.getString('server')}`)
					.addField('Status', status)
					.addField('Addres', address);
				interaction.editReply({ embeds: [Embed] });
				// Buffer から文字列に変換
				// https://qiita.com/masakielastic/items/8eb4bf4efc2310ee7baf#%E6%96%87%E5%AD%97%E5%88%97%E3%81%A8-bufferuint8array-%E3%81%AE%E7%9B%B8%E4%BA%92%E5%A4%89%E6%8F%9B
				if (status == Buffer.from('stopped').toString()) {
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