const { AdvancedEmbed, EmbedStyle } = require("../../utils/style/AdvancedEmbed");
const config = require("../../config.json");
const path = require("path");
const fs = require("fs");

/** @param {import("discord.js").ChatInputCommandInteraction} interaction */
module.exports = async (client, interaction) => {
    if (interaction.isChatInputCommand()) {
        if (!interaction.guildId) return;
        const embed = new AdvancedEmbed()
            .setInteraction(interaction)
            .setDefaultColor("Green")
            .setTitle("Komut Log")
            .setDescription(`> ** ${interaction.user.globalName} ** adlı kullanıcı komut kullandı.`)
            .addFields([
                { name: `Komut Kullanım`, value: `${interaction}`, inline: true }
            ])
            .setThumbnail(interaction.user.displayAvatarURL())
            .setStyle(EmbedStyle.Default);
        client.channels.cache.get(config.command_log.channel_id).send({ embeds: [embed] });

        const commandsDir = path.join(__dirname, '..', '..', 'commands');
        fs.readdirSync(commandsDir).forEach((category) => {
            fs.readdirSync(path.join(commandsDir, category)).forEach(async (file) => {
                const cmd = require(`../../commands/${category}/${file}`);
                if (interaction.commandName.toLowerCase() === cmd.name.toLowerCase()) {
                    await cmd.run(client, interaction);
                };
            });
        });
    }
};
