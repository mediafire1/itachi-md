import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*Example:* ${usedPrefix + command} https://www.youtube.com/watch?v=Z28dtg_QmFw`;
  m.reply(wait);
  try {
    const response = await fetch(`https://api.botcahx.eu.org/api/dowloader/yt?url=${encodeURIComponent(text)}&apikey=${btc}`);
    const result = await response.json();

    if (result.status && result.result && result.result.mp4) {
      await conn.sendMessage(m.chat, { 
        video: { url: result.result.mp4 }, 
        mimetype: 'video/mp4',
        caption: `Successfully downloaded from: ${text}`
      }, { quoted: m });
    } else {
      throw new Error('Unable to fetch video');
    }
  } catch (error) {
    console.error(error);
    throw 'Error processing video download';
  }
};

handler.help = handler.command = ['ytmp4', 'ytv'];
handler.tags = ['downloader'];
handler.limit = true;
handler.premium = false;

export default handler;