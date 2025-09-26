import fetch from 'node-fetch';
import uploadFile from '../lib/uploadFile.js';

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/audio/.test(mime)) {
        let buffer = await q.download();
        await m.reply('⏳ جاري المعالجة...');
        try {
            let fileSizeLimit = 5 * 1024 * 1024;
            if (buffer.length > fileSizeLimit) {
                throw 'حجم الملف يجب ألا يتجاوز 5 ميغابايت';
            }
            let media = await uploadFile(buffer);
            let response = await fetch(`https://api.botcahx.eu.org/api/tools/voiceremover?url=${media}&apikey=${btc}`);
            let res = await response.json();
            if (!res.status) {
                throw null
            }
            if (command === 'إزالة_الصوت') {
                await conn.sendMessage(m.chat, { audio: { url: res.result.instrumental_path }, mimetype: 'audio/mpeg' }, { quoted: m });
            } else if (command === 'إزالة_الآلة') {
                await conn.sendMessage(m.chat, { audio: { url: res.result.vocal_path }, mimetype: 'audio/mpeg' }, { quoted: m });
            }
        } catch (e) {
            throw '❌ حدث خطأ أثناء المعالجة';
        }
    } else {
        await m.reply(`📢 الرجاء الرد على *ملف صوتي* باستخدام الأمر ${usedPrefix + command}`);
    }
}

handler.command = handler.help = ['إزالة_الصوت', 'إزالة_الآلة'];
handler.tags = ['أدوات'];
handler.limit = true;

export default handler;
