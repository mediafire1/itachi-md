import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `أدخل رابطًا!\n\nمثال:\n${usedPrefix}${command} https://pin.it/4CVodSq`;
  }
  try {
    m.reply('⏳ جاري المعالجة...');
    const api = await fetch(`https://api.botcahx.eu.org/api/download/pinterest?url=${args[0]}&apikey=${global.btc}`);
    const res = await api.json();
    let { media_type, image, title } = res.result.data;
    if (media_type === 'video/mp4') {
      await conn.sendMessage(m.chat, { video: { url: image } });
    } else {
      conn.sendFile(m.chat, image, 'pindl.jpeg', `*العنوان:* ${title}\n*نوع الوسائط:* ${media_type}\n*رابط المصدر*: ${image}\n`, m);
    }
  } catch (e) {
    console.log(e);
    m.reply('❌ حدث خطأ')
  }
};

handler.help = ['تحميل_بينتيريست'].map(v => v + ' <رابط>')
handler.tags = ['تحميل']
handler.command = /^(تحميل_بينتيريست|pinterestdl|pinterestdownload|pindl)$/i
handler.register = false
handler.limit = true

export default handler
