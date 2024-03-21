class Ramazan {
    async ramazan(sehir) {
        sehir = sehir.charAt(0).toUpperCase() + sehir.slice(1);
        sehir = sehir.replace("I", "İ");
        sehir = sehir.replaceAll("İğdır","Iğdır");
        sehir = sehir.replaceAll("İsparta","Isparta")
        const api = await fetch("https://metehanstudio.com/api/namaz-vakitleri?api_key=metehanfreekey");
        const apiData = await api.json();

        let sehir_veri = null;
        for (const item of apiData.data) {
            if (item.cityName === sehir) {
                sehir_veri = item;
                break;
            };
        };

        if (sehir_veri) {
            const data = { plaka: sehir_veri.plate, sehir_adi: sehir_veri.cityName, sahur: sehir_veri.callToPrayer.preNightPray, iftar: sehir_veri.callToPrayer.eveningPrayer };
            return data;
        } else {
            return false;
        };
    };
};

module.exports = Ramazan;
