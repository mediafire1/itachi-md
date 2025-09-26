import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {  
    if (!args[0]) throw `📛 استخدم مثالاً: ${usedPrefix}${command} https://fb.watch/mcx9K6cb6t/?mibextid=8103lRmnirLUhozF`;
    try {
        const res = await fetch(`https://api.botcahx.eu.org/api/dowloader/fbdown?url=${args[0]}&apikey=${btc}`);
        const json = await res.json();
        let urls = json.result.url.urls;
        if (!Array.isArray(urls)) {
            throw `🚫 تعذر الحصول على رابط الفيديو من الرابط المقدم`;
        }
        for (let url of urls) {
            if (url.hd) {
                conn.sendFile(m.chat, url.hd, 'fb.mp4', `*تحميل فيسبوك*`, m);
                break;
            }
        }
    } catch (error) {
        console.log(error);
        throw `❌ حدث خطأ أثناء المعالجة`;
    }
}

handler.help = ['فيسبوك'].map(v => v + ' <رابط>');
handler.command = /^(فيسبوك|fb|facebookdl|fbdl|fbdown|dlfb)$/i;
handler.tags = ['تحميل'];
handler.limit = true;
handler.group = false;
handler.premium = false;
handler.owner = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.private = false;

export default handler
