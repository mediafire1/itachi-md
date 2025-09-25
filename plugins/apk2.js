import axios from 'axios';

let handler = async (m, { conn, args }) => {
  const appName = args.join(" ");
  if (!appName) return m.reply('📦 اكتب اسم التطبيق بعد الأمر.\nمثال: *.apk2 واتساب الذهبي*');

  await m.reply("⏳ جاري البحث عن التطبيق...\nيرجى الانتظار قليلاً");

  try {
    const apiUrl = `https://api.nexoracle.com/downloader/apk`;
    const params = {
      apikey: 'free_key@maher_apis',
      q: appName
    };

    const response = await axios.get(apiUrl, { params });

    if (!response.data || response.data.status !== 200 || !response.data.result) {
      return m.reply('❌ لم يتم العثور على التطبيق المطلوب.');
    }

    const { name, lastup, package: pkg, size, icon, dllink } = response.data.result;

    await conn.sendMessage(m.chat, {
      image: { url: icon },
      caption: `📲 *${name}*\n📦 الحجم: ${size}\n📅 آخر تحديث: ${lastup}\n📥 جاري التحميل...`
    }, { quoted: m });

    const apkRes = await axios.get(dllink, {
      responseType: 'arraybuffer',
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    const apkBuffer = Buffer.from(apkRes.data, 'binary');

    const caption = `📦 *معلومات التطبيق:*\n\n` +
                    `🔖 *الاسم:* ${name}\n` +
                    `📅 *آخر تحديث:* ${lastup}\n` +
                    `📦 *الحزمة:* ${pkg}\n` +
                    `📏 *الحجم:* ${size}\n\n` +
                    `✅ تم التحميل بواسطة *ساسكي بوت*`;

    await conn.sendMessage(m.chat, {
      document: apkBuffer,
      mimetype: 'application/vnd.android.package-archive',
      fileName: `${name}.apk`,
      caption
    }, { quoted: m });

    await m.reply("✅ تم إرسال التطبيق بنجاح");

  } catch (error) {
    console.error('❌ خطأ أثناء تحميل التطبيق:', error.message);
    await m.reply('⚠️ حصل خطأ أثناء تحميل التطبيق. تأكد من الاسم أو حاول لاحقاً.');
  }
};

handler.help = ['apk2'];
handler.tags = ['downloader'];
handler.command = ['apk2'];
handler.limit = true;
export default handler;