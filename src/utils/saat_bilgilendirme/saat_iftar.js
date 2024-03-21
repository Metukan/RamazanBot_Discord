const { EmbedBuilder } = require("discord.js");
const { database } = require("../database/genelData");

function saat_iftar(message, { time, sunucuId }) {
    setInterval(() => {
        const veri = database.get(`bildirim${sunucuId}`);

        const [hours, minutes] = time.split(":").map((num) => parseInt(num));
        const now = new Date();
        const targetTime = new Date(now);
        targetTime.setHours(hours);
        targetTime.setMinutes(minutes);
        targetTime.setSeconds(0);
        targetTime.setMilliseconds(0);

        let timeout;
        if (targetTime <= now) {
            targetTime.setDate(targetTime.getDate() + 1);
        };
        timeout = targetTime - now;

        setTimeout(() => {
            saat_iftar(message, { time: time, sunucuId: sunucuId });

            const embed = new EmbedBuilder()
                .setColor("Green")
                .setTitle("İftar Bildirim")
                .setDescription("Artık iftar zamanı geldi afiyetle yemeğini yiyebilirsin.")
                .addFields([
                    { name: "🏙️ Şehir", value: `${veri.city}`, inline: true }
                ])
                .setThumbnail(message.guild.iconURL())
                .setFooter({ text: "Afiyet olsun 🎉🎉" })
            try {
                return message.guild.channels.cache.get(veri.channel).send({ embeds: [embed] });
            } catch (e) {

            };
        }, timeout);
    }, 90000);
}

module.exports = { saat_iftar };
