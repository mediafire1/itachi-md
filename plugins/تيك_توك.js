import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `أدخل رابطًا!\n\nمثال:\n${usedPrefix + command} https://vm.tiktok.com/ZGJAmhSrp/`;    
    try {
        if (!text.match(/tiktok/gi) && !text.match(/douyin/gi)) {
          throw `الرابط غير موجود!`;
        }
        m.reply('⏳ جاري المعالجة...');      

        try {
            const response = await axios.get(`https://api.botcahx.eu.org/api/dowloader/tiktok?url=${text}&apikey=${btc}`);
            const res = response.data.result;      
            var { video, title, title_audio, audio } = res;
            if (!video[0]) {
                throw '❌ حدث خطأ';
            }
            let capt = `🌟 *تيك توك*\n\n`;
            capt += `◦ *العنوان* : ${title}\n`;
            capt += `\n`;   
                 
            if (video.length > 1) {
                for (let v of video) {
                    await conn.sendFile(m.chat, v, null, capt, m);
                }
            } else {
                await conn.sendFile(m.chat, video[0], null, capt, m);
            }

            if (!audio[0]) {
                await conn.reply(m.chat, "_الصوت غير متوفر!_", m);
            } else {
                conn.sendMessage(m.chat, { audio: { url: audio[0] }, mimetype: 'audio/mpeg' }, { quoted: m });
            }
            return;
        } catch (e) {
            throw '❌ حدث خطأ';
        }
    } catch (e) {
        throw '❌ حدث خطأ';
    }
};

handler.help = ['تيك_توك'];
handler.command = /^(تيك_توك|tiktok|tt|tiktokdl|tiktoknowm)$/i;
handler.tags = ['تحميل'];
handler.limit = true;
handler.group = false;
handler.premium = false;
handler.owner = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.private = false;

export default handler;
