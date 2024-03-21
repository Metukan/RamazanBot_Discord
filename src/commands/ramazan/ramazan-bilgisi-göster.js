const { AdvancedEmbed, EmbedStyle } = require("../../utils/style/AdvancedEmbed");
const util = require("../../utils/ramazan/ramazan");
const news = new util();

module.exports = {
    name: "ramazam-bilgisi",
    description: "Girdiğiniz şehir'in iftar/sahur saatlerini ve kaç saat kaldığını gösterir",
    options: [
        {
            name: "göster", description: "Girdiğiniz şehir'in iftar/sahur saatlerini ve kaç saat kaldığını gösterir", type: 1, options: [
                { name: "il", description: "İftar/sahur bilgisi bakılacak şehir giriniz.", type: 3, required: true },
                { name: "seçim", description: "İftar bilgisine mi bakılacak sahur bilgisine mi?", type: 3, required: true, choices: [{ name: "İftar", value: "iftar" }, { name: "Sahur", value: "sahur" }] }
            ]
        }
    ],
    /** @param {import("discord.js").ChatInputCommandInteraction} interaction */
    async run(client, interaction) {
        const city = interaction.options.getString("il");
        const input = interaction.options.getString("seçim");
        const awaits = await news.ramazan(city);
        if (awaits === false) return interaction.reply({ embeds: [new AdvancedEmbed().setInteraction(interaction).setDescription("Şehir bulunamadı.").setStyle(EmbedStyle.Error)], ephemeral: true })
        // iftar kalan süre hesaplama
        const time = awaits.iftar;
        let [hedefSaat, hedefDakika] = time.split(":").map(Number);
        let simdikiZaman = new Date();

        let saat = simdikiZaman.getHours();
        let dakika = simdikiZaman.getMinutes();
        let saniye = simdikiZaman.getSeconds();

        let kalanSaat = hedefSaat - saat;
        let kalanDakika = hedefDakika - dakika;
        let kalanSaniye = 0 - saniye;

        if (kalanSaniye < 0) {
            kalanDakika--;
            kalanSaniye = 60 + kalanSaniye;
        };

        if (kalanDakika < 0) {
            kalanSaat--;
            kalanDakika = 60 + kalanDakika;
        };

        if (kalanSaat < 0) {
            kalanSaat = 24 + kalanSaat;
        };
        // sahur kalan süre hesaplama
        const times = awaits.sahur;
        let [hedefSaatt, hedefDakikaa] = times.split(":").map(Number);
        let simdikiZamanz = new Date();

        let saatt = simdikiZamanz.getHours();
        let dakikaa = simdikiZamanz.getMinutes();
        let saniyee = simdikiZamanz.getSeconds();

        let kalanSaatt = hedefSaatt - saatt;
        let kalanDakikaa = hedefDakikaa - dakikaa;
        let kalanSaniyee = 0 - saniyee;

        if (kalanSaniyee < 0) {
            kalanDakikaa--;
            kalanSaniyee = 60 + kalanSaniyee;
        };

        if (kalanDakikaa < 0) {
            kalanSaatt--;
            kalanDakikaa = 60 + kalanDakikaa;
        };

        if (kalanSaatt < 0) {
            kalanSaatt = 24 + kalanSaatt;
        };
        if (input === "iftar") {
            const embed = new AdvancedEmbed()
                .setInteraction(interaction)
                .setDescription(`Aşağıda __**${awaits.sehir_adi}**__ şehrinin bilgileri verilmiştir.`)
                .addFields([
                    { name: "⏰ İftar Saati", value: `${awaits.iftar}`, inline: true },
                    { name: "⏰ İftara Kalan Vakit", value: `**${kalanSaat}** saat **${kalanDakika}** dakika **${kalanSaniye}** saniye`, inline: true }
                ])
                .setStyle(EmbedStyle.Success)
            interaction.reply({ embeds: [embed] });
        } else if (input === "sahur") {
            const embed = new AdvancedEmbed()
                .setInteraction(interaction)
                .setDescription(`Aşağıda __**${awaits.sehir_adi}**__ şehrinin bilgileri verilmiştir.`)
                .addFields([
                    { name: "⏰ Sahur Saati", value: `${awaits.sahur}`, inline: true },
                    { name: "⏰ Sahura Kalan Vakit", value: `**${kalanSaatt}** saat **${kalanDakikaa}** dakika **${kalanSaniyee}** saniye`, inline: true }
                ])
                .setStyle(EmbedStyle.Success)
            interaction.reply({ embeds: [embed] });
        } else {
            interaction.reply({ embeds: [new AdvancedEmbed().setInteraction(interaction).setDescription("Bir hata ile karşılaşıldı lütfen daha sonra deneyiniz.").setStyle(EmbedStyle.Error)], ephemeral: true })
        };
    }
};