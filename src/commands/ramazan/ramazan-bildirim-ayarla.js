const { AdvancedEmbed, EmbedStyle } = require("../../utils/style/AdvancedEmbed");
const { PermissionsBitField } = require("discord.js");
const { database } = require("../../utils/database/genelData");
const util = require("../../utils/ramazan/ramazan");
const news = new util();

module.exports = {
    name: "ramazan-bildirim",
    description: "Ayarladığınıza göre iftar/sahur bildirimi yapar zamanı geldiğinde.",
    options: [
        {
            name: "göster", description: "Girdiğiniz şehir'in iftar/sahur saatlerini ve kaç saat kaldığını gösterir", type: 1, options: [
                { name: "kanal", description: "Bildirim gönderilecek kanal.", type: 7, required: true },
                { name: "il", description: "İftar/sahur bilgisi atılacak şehir giriniz.", type: 3, required: true }
            ]
        }
    ],
    /** @param {import("discord.js").ChatInputCommandInteraction} interaction */
    async run (client, interaction)  {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [new AdvancedEmbed().setInteraction(interaction).setDescription("Yetkin yetersiz.").setStyle(EmbedStyle.Error)], ephemeral: true })
        const channel = interaction.options.getChannel("kanal");
        const city = interaction.options.getString("il");
        const awaits = await news.ramazan(city);
        if (awaits === false) return interaction.reply({ embeds: [new AdvancedEmbed().setInteraction(interaction).setDescription("Şehir bulunamadı.").setStyle(EmbedStyle.Error)], ephemeral: true })
        if (database.has(`bildirim${interaction.guild.id}`)) returninteraction.reply({ embeds: [new AdvancedEmbed().setInteraction(interaction).setDescription("Zaten bildirim ayarlanmış.").setStyle(EmbedStyle.Error)], ephemeral: true })
        const embed = new AdvancedEmbed()
            .setInteraction(interaction)
            .setDescription("Başarıyla bildirim sistemi kuruldu.")
            .setStyle(EmbedStyle.Success)
        interaction.reply({ embeds: [embed], ephemeral: true });
        database.set(`bildirim${interaction.guild.id}`, { channel: channel.id, city: awaits.sehir_adi });

    }
};