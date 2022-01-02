// embed用変数宣言
const { MessageEmbed } = require('discord.js');

// シェルコマンドを実行するためにexecSyncの有効化
const execSync = require('child_process').execSync;

// 後から利用する変数の初期化
let status;
let address;

// スラッシュコマンド用選択肢の定義
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

	// インタラクションの発生、処理を発火
	async execute(interaction) {

		// embedの定義
		// https://scrapbox.io/discordjs-japan/MessageEmbed%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E5%9F%8B%E3%82%81%E8%BE%BC%E3%81%BF%E3%82%92%E9%80%81%E4%BF%A1%E3%81%99%E3%82%8B%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB
		let Embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Server Info')
			.setDescription('サーバーの状態を取得しています');
		
		// 第2引数の値に応じて分岐
		if (interaction.options.getString('server') === 'dev1') {

			// 既定のembedを一度のみ送信
			await interaction.reply({ embeds: [Embed] });
			{
				// info.shの結果を変数statusに格納
				status = execSync(`./sh/info.sh ${process.env.DEV1_INSTANCE_ID}`).toString();
				
				// address.shの結果を変数addressに格納
				address = execSync(`./sh/address.sh ${process.env.DEV1_INSTANCE_ID}`).toString();
				console.log(status);
				
				// 送信用embedの内容編集
				Embed = new MessageEmbed()
					.setColor('#0099ff')
					.setTitle(`/ info server: ${interaction.options.getString('server')}`)
					.addField('Status', status)
					.addField('Addres', address);

				// 再定義したembedをeditReplyで編集し内容反映
				interaction.editReply({ embeds: [Embed] });
			}
		}

		// 第2引数の値に応じて分岐、以下同様
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

		// エラー処理
		else {
			await interaction.reply('正しいサーバー名を入力してください');
		}
	},
};
