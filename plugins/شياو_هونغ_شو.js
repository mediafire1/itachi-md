import axios from "axios";

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `أدخل رابطًا!\n\nمثال:\n${usedPrefix + command} http://xhslink.com/a/1N9OyfeL9EFab`;
    if (!text.match(/xhslink|xiaohongshu/gi)) throw `الرابط غير صالح!`;

    m.reply('⏳ جاري المعالجة...');
    try {
        const res = await axios.get(`https://api.botcahx.eu.org/api/download/rednote?url=${text}&apikey=${btc}`);
        const result = res.data?.result;
        if (!result || !result.media) throw `فشل في جلب البيانات!`;

        const media = result.media;
        const meta = result.metadata;
        const title = meta?.title || "بدون عنوان";

        if (media.videoUrl) {
            await conn.sendMessage(
                m.chat,
                {
                    video: { url: media.videoUrl },
                    caption: `*العنوان:* ${title}`,
                },
                { quoted: m }
            );
        } else if (media.images && media.images.length > 0) {
            for (let img of media.images) {
                await sleep(2000);
                await conn.sendMessage(
                    m.chat,
                    {
                        image: { url: img },
                        caption: `*العنوان:* ${title}`,
                    },
                    { quoted: m }
                );
            }
        } else {
            throw `المحتوى غير موجود!`;
        }

    } catch (e) {
        console.error(e);
        throw `حدث خطأ أثناء معالجة الطلب!`;
    }
};

handler.help = ['شياو_هونغ_شو', 'ريد_نوت'];
handler.command = /^(شياو_هونغ_شو|xhs|xhsdl|ريد_نوت)$/i;
handler.tags = ['تحميل'];
handler.limit = true;
handler.premium = false;

export default handler;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
