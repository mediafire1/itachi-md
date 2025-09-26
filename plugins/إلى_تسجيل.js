import { toPTT } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/video|audio/.test(mime)) throw `📢 الرجاء الرد على فيديو أو صوت لتحويله إلى تسجيل صوتي/vn باستخدام الأمر *${usedPrefix + command}*`
    let media = await q.download?.()
    if (!media) throw '❌ تعذر تحميل الملف'
    let audio = await toPTT(media, 'mp4')
    if (!audio.data) throw '❌ تعذر تحويل الملف إلى تسجيل صوتي'
    conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, true, { mimetype: 'audio/mp4' })
}

handler.help = ['إلى_تسجيل (الرد على الفيديو/الصوت)']
handler.tags = ['صوتيات']
handler.limit = true;
handler.register = true;
handler.command = /^إلى(_تسجيل|vn|ptt)$/i

export default handler
