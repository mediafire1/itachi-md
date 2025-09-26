let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) throw `_*لا يوجد حضور قائم في هذه المجموعة!*_\n\n*${usedPrefix}بدءالحضور* - لبدء الحضور`

    let d = new Date
    let date = d.toLocaleDateString('ar-EG', { // تغيير إلى تنسيق عربي
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let absen = conn.absen[id][1]
    let list = absen.map((v, i) => `│ ${i + 1}. @${v.split`@`[0]}`).join('\n')
    conn.reply(m.chat, `*「 الحضور 」*

التاريخ: ${date}
${conn.absen[id][2]}

┌ *الذين سجلوا الحضور:*
│ 
│ الإجمالي: ${absen.length}
${list}
│ 
└────

_${global.wm}_`, m, { contextInfo: { mentionedJid: absen } })
}
handler.help = ['تحقق_من_الحضور']
handler.tags = ['إدارة', 'حضور']
handler.command = /^تحقق_من_الحضور$/i // تغيير الأمر إلى عربية
handler.admin = true
export default handler
