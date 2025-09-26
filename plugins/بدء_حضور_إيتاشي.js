let handler = async (m, { usedPrefix, text }) => {
    conn.absen = conn.absen ? conn.absen : {}
    let id = m.chat
    if (id in conn.absen) {
        throw `_*ما زال هناك حضور في هذه الدردشة!*_\n\n*${usedPrefix}حذف_حضور_إيتاشي* - لحذف الحضور`
    }
    conn.absen[id] = [
        m.reply(`تم بدء الحضور بنجاح مع إيتاشي!\n\n*${usedPrefix}حضور_إيتاشي* - لتسجيل الحضور\n*${usedPrefix}تحقق_من_حضور_إيتاشي* - للتحقق من الحضور\n*${usedPrefix}حذف_حضور_إيتاشي* - لحذف بيانات الحضور`),
        [],
        text
    ]
}
handler.help = ['بدء_حضور_إيتاشي'].map(v => v + ' <text>')
handler.tags = ['إدارة_إيتاشي', 'حضور_إيتاشي']
handler.command = /^(بدء_حضور_إيتاشي|startabsen)$/i
handler.group = true
handler.admin = true
export default handler
