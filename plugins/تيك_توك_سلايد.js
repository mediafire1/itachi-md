import fetch from 'node-fetch';

let handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (command == 'تيك_توك_سلايد' || command == 'ttslide') {
    if (!text) throw `أدخل رابطًا!\n\nمثال: ${usedPrefix + command} https://vt.tiktok.com/ZSY8Me4jL/`;
    try {
      const api = await fetch(`https://api.botcahx.eu.org/api/download/tiktokslide?url=${text}&apikey=${btc}`);
      const res = await api.json();
      for (let i of res.result.images) {
        await sleep(3000);
        conn.sendMessage(m.sender, { image: { url: i }, caption: `*العنوان*: ${res.result.title}` }, { quoted: m });         
      }
        conn.sendMessage(m.sender, { audio: { url: res.result.audio[0] }, mimetype: 'audio/mpeg' }, { quoted: m });
    } catch (e) {
      console.log(e);
      throw `🚩 *حدث خطأ!*`;
    }
  }
  if (command == 'دويين_سلايد' || command == 'دويين_صور') { 
    if (!text) throw `أدخل رابطًا!\n\nمثال: ${usedPrefix + command} https://v.douyin.com/i2bPkLLo/`;
    try {
      const api = await fetch(`https://api.botcahx.eu.org/api/download/douyinslide?url=${text}&apikey=${btc}`);
      const res = await api.json();
      for (let i of res.result.images) {
        await sleep(3000);
        conn.sendMessage(m.sender, { image: { url: i }, caption: `*العنوان*: ${res.result.title}` }, { quoted: m });         
      }
        conn.sendMessage(m.sender, { audio: { url: res.result.audio[0] }, mimetype: 'audio/mpeg' }, { quoted: m });
    } catch (e) {
      console.log(e);
      throw `🚩 *حدث خطأ!*`;
    }
  }
};

handler.command = handler.help = ['دويين_سلايد', 'دويين_صور', 'تيك_توك_سلايد', 'ttslide'];
handler.tags = ['تحميل'];
handler.limit = true;

export default handler;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
                                             }
