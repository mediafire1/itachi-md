let handler = async (m, { conn, usedPrefix, text, command }) => {
    let hash = text
    if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex')
    if (!hash) throw `📛 لا يوجد هاش`
    let sticker = global.db.data.sticker
    if (sticker[hash] && sticker[hash].locked) throw '🚫 لا تملك الإذن لحذف أمر الملصق هذا'
    delete sticker[hash]
    m.reply(`✅ تم الحذف بنجاح!`)
}

handler.help = ['أمر'].map(v => 'حذف_' + v + ' <نص>')
handler.tags = ['قاعدة_بيانات', 'مميز']
handler.command = ['حذف_أمر']
handler.premium = true

export default handler
