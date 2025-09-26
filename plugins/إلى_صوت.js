import { toAudio } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/video|audio/.test(mime)) throw `📢 الرجاء الرد على فيديو أو تسجيل صوتي لتحويله إلى صوت/mp3 باستخدام الأمر *${usedPrefix + command}*`
    let media = await q.download?.()
    if (!media) throw '❌ تعذر تحميل الملف'
    conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key }})
    let audio = await toAudio(media, 'mp4')
    if (!audio.data) throw '❌ تعذر تحويل الملف إلى صوت'
    conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m)
    conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}

handler.help = ['إلى_صوت (الرد على الفيديو/الصوت)']
handler.tags = ['صوتيات']
handler.command = /^(إلى(_صوت|mp3))$/i
handler.limit = true;
handler.register = true;

export default handler
