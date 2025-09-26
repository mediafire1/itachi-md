import fetch from 'node-fetch';
import uploadFile from '../lib/uploadFile.js';

async function handler(m, { conn, usedPrefix, command }) {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/^image/.test(mime) && !/webp/.test(mime)) {
      const img = await q.download();
      const out = await uploadFile(img);
      const api = await fetch(`https://api.botcahx.eu.org/api/tools/remini?url=${out}&apikey=${btc}`);
      const image = await api.json();
      const { url } = image;
      conn.sendFile(m.chat, url, null, wm, m);
    } else {
      m.reply(`📷 أرسل صورة مع الأمر *${usedPrefix + command}* أو قم بالرد على صورة مرسلة.`);
    }
  } catch (e) {
    console.error(e);
    m.reply(`❌ فشل في تحسين الصورة. حاول مرة أخرى.`);
  }
}

handler.help = ['تحسين', 'وضوح', 'عالية_الدقة', 'إزالة_الضبابية'];
handler.tags = ['أدوات'];
handler.command = ['تحسين', 'إزالة_الضبابية'];
handler.limit = true;

export default handler;
