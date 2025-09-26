let handler = async (m, { usedPrefix }) => {
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) throw `_*لا يوجد حضور قائم في هذه المجموعة!*_\n\n*${usedPrefix}بدءالحضور* - لتبدأ مع إيتاشي`
    delete conn.absen[id]
    m.reply(`*تم الحذف!*\nإيتاشي يقول: الحضور انتهى، اختفى كالظلال...`)
}
handler.help = ['حذف_الحضور']
handler.tags = ['إدارة', 'حضور']
handler.command = /^(حذف_الحضور|deleteabsen)$/i
handler.group = true
handler.admin = true
export default handler
