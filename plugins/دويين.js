import axios from "axios";

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `📛 أدخل رابطًا!\n\nمثال:\n${usedPrefix + command} https://v.douyin.com/ikq8axJ/`;    
    try {
        if (!text.match(/douyin/gi)) throw `🚫 الرابط غير صحيح أو غير موجود!`;        
        m.reply('⏳ جاري المعالجة...');      
        const response = await axios.get(`https://api.botcahx.eu.org/api/dowloader/douyin?url=${text}&apikey=${btc}`);        
        const res = response.data.result;      
        var { video, title, title_audio, audio } = res;
        let capt = `🌟 *د و ي ي ن*\n\n`;
        capt += `◦ *العنوان* : ${title}\n`;
        capt += `◦ *الصوت* : ${title_audio}\n`;
        capt += `\n`;        
        await conn.sendFile(m.chat, video, null, capt, m);
        conn.sendMessage(m.chat, { audio: { url: audio[0] }, mimetype: 'audio/mpeg' }, { quoted: m });         
    } catch (e) {
        console.log(e);
        throw `❌ حدث خطأ أثناء المعالجة`;
    }
};

handler.help = ['دويين'];
handler.command = /^(دويين)$/i;
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
