// embed用変数宣言
const { MessageEmbed } = require('discord.js');

// シェルコマンドを実行するためにexecSyncの有効化
const execSync = require('child_process').execSync;

// 後から利用する変数の初期化
let status;
let address;

// 非同期のdelayを定義
function delay(n) {
	return new Promise(function(resolve) {
		setTimeout(resolve, n * 1000);
	});
}

// スラッシュコマンド用選択肢の定義
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

	// インタラクションの発生、処理を発火
	async execute(interaction) {

		// embedの定義
		// https://scrapbox.io/discordjs-japan/MessageEmbed%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E5%9F%8B%E3%82%81%E8%BE%BC%E3%81%BF%E3%82%92%E9%80%81%E4%BF%A1%E3%81%99%E3%82%8B%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB
		let Embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Server Start')
			.setDescription('サーバーを起動しています');

		// 第2引数の値に応じて分岐
		if (interaction.options.getString('server') === 'dev1') {

			// 既定のembedを一度のみ送信
			await interaction.reply({ embeds: [Embed] });

			// ec2インスタンスの起動処理、start.shを一度のみ実行
			execSync(`./sh/start.sh ${process.env.DEV1_INSTANCE_ID}`).toString();

			// 処理終了まで無限ループ
			block: for (; ;) {

				// info.shの結果を変数statusに格納
				status = execSync(`./sh/info.sh ${process.env.DEV1_INSTANCE_ID}`).toString();

				// address.shの結果を変数addressに格納
				address = execSync(`./sh/address.sh ${process.env.DEV1_INSTANCE_ID}`).toString();

				// 送信用embedの内容編集
				Embed = new MessageEmbed()
					.setColor('#0099ff')
					.setTitle(`/ start server: ${interaction.options.getString('server')}`)
					.addField('Status', status)
					.addField('Addres', address);

				// 再定義したembedをeditReplyで編集し内容反映
				interaction.editReply({ embeds: [Embed] });

				// statusはバッファ→文字列の変換結果が格納されている。
				// 普通に文字列比較を行うと変数statusに制御文字が入っており合致しないため、runningにtoStringを行い制御文字を追加する
				// https://qiita.com/masakielastic/items/8eb4bf4efc2310ee7baf#%E6%96%87%E5%AD%97%E5%88%97%E3%81%A8-bufferuint8array-%E3%81%AE%E7%9B%B8%E4%BA%92%E5%A4%89%E6%8F%9B
				if (status == Buffer.from('running').toString()) {

					// 条件に合致した場合にblock内の処理を終了する
					break block;
				}

				// 以下処理は条件が合致しない場合に実行される
				// awsコマンドを連続実行すると負荷がかかるためディレイをもたせる
				await delay(1);
			}
		}

		// 第2引数の値に応じて分岐、以下同様
		else if (interaction.options.getString('server') === 'dev2') {
			execSync(`./sh/start.sh ${process.env.DEV2_INSTANCE_ID}`).toString();
			await interaction.reply({ embeds: [Embed] });
			block: for (; ;) {
				status = execSync(`./sh/info.sh ${process.env.DEV2_INSTANCE_ID}`).toString();
				address = execSync(`./sh/address.sh ${process.env.DEV2_INSTANCE_ID}`).toString();
				Embed = new MessageEmbed()
					.setColor('#0099ff')
					.setTitle(`/ start server: ${interaction.options.getString('server')}`)
					.addField('Status', status)
					.addField('Addres', address);
				interaction.editReply({ embeds: [Embed] });
				if (status == Buffer.from('running').toString()) {
					break block;
				}
				await delay(1);
			}
		}
		else if (interaction.options.getString('server') === 'dev3') {
			execSync(`./sh/start.sh ${process.env.DEV3_INSTANCE_ID}`).toString();
			await interaction.reply({ embeds: [Embed] });
			block: for (; ;) {
				status = execSync(`./sh/info.sh ${process.env.DEV3_INSTANCE_ID}`).toString();
				address = execSync(`./sh/address.sh ${process.env.DEV3_INSTANCE_ID}`).toString();
				Embed = new MessageEmbed()
					.setColor('#0099ff')
					.setTitle(`/ start server: ${interaction.options.getString('server')}`)
					.addField('Status', status)
					.addField('Addres', address);
				interaction.editReply({ embeds: [Embed] });
				if (status == Buffer.from('running').toString()) {
					break block;
				}
				await delay(1);
			}
		}

		// エラー処理
		else {
			await interaction.reply('正しいサーバー名を入力してください');
		}
	},
};
