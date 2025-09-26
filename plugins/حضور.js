let handler = async (m, { usedPrefix }) => {
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) throw `_*لا يوجد حضور قائم في هذه المجموعة!*_\n\n*${usedPrefix}بدءالحضور* - لبدء الحضور`

    let absen = conn.absen[id][1]
    const wasVote = absen.includes(m.sender)
    if (wasVote) throw '*لقد سجلت حضورك بالفعل!*'
    absen.push(m.sender)
    m.reply(`*تم!* \n\n\`\`\`إجمالي عدد المسجلين الحضور\`\`\`\n*${absen.length} عضو*`)
    let d = new Date
    let date = d.toLocaleDateString('ar-EG', { // تغيير إلى تنسيق عربي
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let list = absen.map((v, i) => `│ ${i + 1}. @${v.split`@`[0]}`).join('\n')
}
handler.help = ['حضور']
handler.tags = ['حضور']
handler.command = /^(حضور|hadir)$/i // تغيير الأوامر إلى عربية
handler.group = true
export default handler
