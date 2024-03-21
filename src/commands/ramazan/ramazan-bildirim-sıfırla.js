const { AdvancedEmbed, EmbedStyle } = require("../../utils/style/AdvancedEmbed");
const { PermissionsBitField } = require("discord.js");
const { database } = require("../../utils/database/genelData");

module.exports = {
    name: "ramazan-bildirimini",
    description: "Sistemi sıfırlarsınız.",
    options: [
        { name: "sıfırla", description: "Sistemi sıfırlarsınız.", type: 1 }
    ],
    /** @param {import("discord.js").ChatInputCommandInteraction} interaction */
    async run(client, interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [new AdvancedEmbed().setInteraction(interaction).setDescription("Yetkin yetersiz.").setStyle(EmbedStyle.Error)], ephemeral: true })
        const embed = new AdvancedEmbed()
            .setInteraction(interaction)
            .setDescription("Başarıyla bildirim sistemini sıfırladım.")
            .setStyle(EmbedStyle.Success)
        interaction.reply({ embeds: [embed], ephemeral: true });
        database.delete(`bildirim${interaction.guild.id}`);
    }
};