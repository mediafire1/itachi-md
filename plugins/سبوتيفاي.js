import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `*🚩 أدخل رابطًا أو عنوان الأغنية!*\n\nمثال:\n${usedPrefix + command} https://open.spotify.com/track/3zakx7RAwdkUQlOoQ7SJRt\n\nمثال:\n${usedPrefix + command} payung teduh`;
  if (args[0].match(/https:\/\/open.spotify.com/gi)) {
    m.reply('⏳ جاري المعالجة...');
    try {
      const res = await fetch(`https://api.botcahx.eu.org/api/download/spotify?url=${args[0]}&apikey=${btc}`);
      let jsons = await res.json();
      const {
        thumbnail,
        title,
        name,
        duration,
        url
      } = jsons.result.data;
      const {
        id,
        type
      } = jsons.result.data.artist;
      let captionvid = ` ∘ العنوان: ${title}\n∘ المعرف: ${id}\n∘ المدة: ${duration}\n∘ النوع: ${type}`;
      let pesan = await conn.sendMessage(m.chat, {
        text: captionvid,
        contextInfo: {
          externalAdReply: {
            title: "تحميل سبوتيفاي",
            body: "",
            thumbnailUrl: thumbnail,
            sourceUrl: args[0],
            mediaType: 1,
            showAdAttribution: true,
            renderLargerThumbnail: true
          }
        }
      });
      await conn.sendMessage(m.chat, {
        audio: {
          url: url
        },
        mimetype: 'audio/mpeg',
        contextInfo: {
          externalAdReply: {
            title: title,
            body: "",
            thumbnailUrl: thumbnail,
            sourceUrl: args[0],
            mediaType: 1,
            showAdAttribution: true,
            renderLargerThumbnail: true
          }
        }
      }, {
        quoted: m
      });
    } catch (e) {
      throw `❌ حدث خطأ`;
    }
  } else { 
    m.reply('⏳ جاري المعالجة...');
    const text = args.join(" ");
    try {
      const api = await fetch(`https://api.botcahx.eu.org/api/search/spotify?query=${text}&apikey=${btc}`);
      let json = await api.json();
      let res = json.result.data;
      let teks = "";
      for (let i in res) {
        teks += `*${parseInt(i) + 1}.* *العنوان:* ${res[i].title}\n`;
        teks += `*المدة:* ${res[i].duration}\n`;
        teks += `*الشعبية:* ${res[i].popularity}\n`;
        teks += `*الرابط:* ${res[i].url}\n\n`;
      }
      await conn.relayMessage(m.chat, {
        extendedTextMessage: {
          text: teks,
          contextInfo: {
            externalAdReply: {
              title: `🔍 البحث: ${text}`,
              mediaType: 1,
              previewType: 0,
              showAdAttribution: true,
              renderLargerThumbnail: true,
              thumbnailUrl: 'https://www.scdn.co/i/_global/open-graph-default.png',
              sourceUrl: ''
            }
          },
          mentions: [m.sender]
        }
      }, {});
    } catch (e) {
      throw `❌ حدث خطأ`;
    }
  }
};

handler.help = ['سبوتيفاي'];
handler.command = /^(سبوتيفاي)$/i;
handler.tags = ['تحميل'];
handler.limit = true;

export default handler;
