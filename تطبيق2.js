import { search, download } from 'aptoide-scraper'

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, '📱 اكتب اسم التطبيق لتحميله.\n\nمثال:\n*.تطبيق2* Facebook', m)

  try {
    await conn.reply(m.chat, '⏳ جاري البحث عن التطبيق...', m)

    // البحث عن التطبيق
    let results = await search(text)
    if (!results.length) return conn.reply(m.chat, '❌ لم يتم العثور على أي تطبيق بهذا الاسم.', m)

    let app = await download(results[0].id) // أخذ أول نتيجة

    // رسالة معلومات التطبيق
    let info = `📦 *اسم التطبيق:* ${app.name}\n`
    info += `📂 *Package:* ${app.package}\n`
    info += `🗓 *آخر تحديث:* ${app.lastup}\n`
    info += `⚖ *الحجم:* ${app.size}\n`

    // إرسال صورة + المعلومات
    await conn.sendFile(m.chat, app.icon, 'icon.jpg', info, m)

    // فحص إذا الحجم ضخم جدًا
    if (app.size.includes('GB') || app.size.replace(' MB', '') > 999) {
      return conn.reply(m.chat, '🛑 الملف ضخم جدًا ولا يمكن إرساله هنا.', m)
    }

    // إرسال التطبيق كملف APK
    await conn.sendMessage(
      m.chat,
      {
        document: { url: app.dllink },
        mimetype: 'application/vnd.android.package-archive',
        fileName: `${app.name}.apk`
      },
      { quoted: m }
    )

    await conn.reply(m.chat, '✅ تم إرسال التطبيق بنجاح!', m)
  } catch (err) {
    console.error(err)
    return conn.reply(m.chat, '⚠️ حدث خطأ أثناء محاولة تحميل التطبيق.', m)
  }
}

handler.help = ['تطبيق2']
handler.tags = ['downloader']
handler.command = ['تطبيق2']
handler.register = true

export default handler