import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `*مثال:* ${usedPrefix}${command} https://www.instagram.com/p/ByxKbUSnubS/?utm_source=ig_web_copy_link`

    try {
        const api = await fetch(`https://api.botcahx.eu.org/api/dowloader/igdowloader?url=${args[0]}&apikey=${btc}`)
        const res = await api.json()

        const limitnya = 10; // عدد الصور التي سيتم إرسالها للمستخدم (الافتراضي 10 صور)

        for (let i = 0; i < Math.min(limitnya, res.result.length); i++) {
            await sleep(3000)
            conn.sendFile(m.chat, res.result[i].url, null, `*تحميل إنستغرام*`, m)
        }
    } catch (e) {
        throw `*الخادم معطل!*`
    }
}

handler.help = ['إنستغرام'].map(v => v + ' <رابط>')
handler.tags = ['تحميل']
handler.command = /^(إنستغرام|212680821981)$/i
handler.limit = true

export default handler

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
                                                                                            }
