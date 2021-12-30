const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { exec } = require('child_process');
const { stat } = require('fs');
const dotenv = require('dotenv');
const execSync = require('child_process').execSync;
const { escape } = require('querystring');
let status;

function delay(n) { //非同期のdelayを定義
    return new Promise(function (resolve) {
        setTimeout(resolve, n * 1000);
    });
}

let Embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Server status')
    .setDescription('サーバーの状態を取得します');

module.exports = {
    data: {
        name: "status",
        description: "サーバーの状態を取得します",
        options: [{
            type: "STRING",
            name: "server",
            description: "確認するサーバーを入力してください",
            required: true,
            choices: [
                { name: "dev1", value: "dev1" },
                { name: "dev2", value: "dev2" },
                { name: "dev3", value: "dev3" },
            ]
        }],
    },
    async execute(interaction) {
        if (interaction.options.getString('server') === "dev1") {
            await interaction.reply({ embeds: [Embed] });
            status = execSync(`./sh/status.sh ${process.env.DEV1_INSTANCE_ID}`).toString();
            addres = execSync(`./sh/addres.sh ${process.env.DEV1_INSTANCE_ID}`).toString();
            console.log(status);
            let Embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`${interaction.options.getString('server')} start`)
                .addField('Status', status)
                .addField('Addres', addres)
            interaction.editReply({ embeds: [Embed] });
            if (status == "running") {
                break block;
            }
            await delay(1)

        }
        else if (interaction.options.getString('server') === "dev2") {
            await interaction.reply('サーバーDev2を起動します');
        }
        else if (interaction.options.getString('server') === "dev3") {
            await interaction.reply('サーバーDev3を起動します');
        }
        else {
            await interaction.reply('正しいサーバー名を入力してください');
        }
    }
}
