let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `أدخل رابطًا!\n\nمثال:\n${usedPrefix + command} https://www.threads.net/@cindyyuvia/post/C_Nqx3khgkI/?xmt=AQGzpsCvidh8IwIqOvq4Ov05Zd5raANiVdvCujM_pjBa1Q`;
  }
  if (!args[0].match(/threads/gi)) {
    throw `الرابط غير موجود!`;
  }
  m.reply('⏳ جاري المعالجة...');
  try {
    const api = await fetch(`https://api.botcahx.eu.org/api/download/threads?url=${args[0]}&apikey=${btc}`).then(results => results.json());
    const foto = api.result.image_urls[0] || null;
    const video = api.result.video_urls[0] || null;   
    if (video) {
      try { 
        conn.sendFile(m.chat, video.download_url, 'threads.mp4', '> ' + wm, m);
      } catch (e) {
        throw `لم يتم العثور على الفيديو!`;
      }
    } else if (foto) {
      try {
        conn.sendFile(m.chat, foto, 'threads.jpeg', '> ' + wm, m);
      } catch (e) {
        throw `لم يتم العثور على الصورة!`;
      }
    } else {
      throw `المحتوى غير موجود!`;
    }
  } catch (e) {
    throw '❌ حدث خطأ';
  }
};

handler.command = handler.help = ['ثريدز', 'تحميل_ثريدز'];
handler.tags = ['تحميل'];
handler.premium = true;

export default handler;
