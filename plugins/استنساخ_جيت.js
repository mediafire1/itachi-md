import fetch from 'node-fetch';
const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let handler = async (m, { args, usedPrefix, command }) => {
    if (!args[0]) throw `📛 مثال: ${usedPrefix}${command} https://github.com/mediafire1/itachi-md/tree/main/`
    if (!regex.test(args[0])) throw '🚫 الرابط غير صحيح!'
    let [_, user, repo] = args[0].match(regex) || []
    repo = repo.replace(/.git$/, '')
    let url = `https://api.github.com/repos/${user}/${repo}/zipball`
    let filename = (await fetch(url, { method: 'HEAD' })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
    m.reply(`⏳ جاري تحميل المستودع، الرجاء الانتظار...`)
    conn.sendFile(m.chat, url, filename, null, m)
}

handler.help = ['استنساخ_جيت'].map(v => v + ' <رابط>')
handler.tags = ['تحميل']
handler.command = /استنساخ_جيت/i
handler.limit = true

export default handler
