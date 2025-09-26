export function before(m) {
    let user = global.db.data.users[m.sender]
    if (user.afk > -1) {
      m.reply(`
🌟 *لقد عدت من الغياب!* 🔔
${user.afkReason ? '*السبب:* ' + user.afkReason : 'بدون سبب 📝'}
*مدة الغياب:* ${clockString(new Date - user.afk)} ⏰
`.trim())
      user.afk = -1
      user.afkReason = ''
    }
    let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    for (let jid of jids) {
      let user = global.db.data.users[jid]
      if (!user) continue
      let afkTime = user.afk
      if (!afkTime || afkTime < 0) continue
      let reason = user.afkReason || ''
      m.reply(`
🚫 *هذا المستخدم غائب!* 😴
${reason ? '*السبب:* ' + reason : 'بدون سبب 📝'}
*مدة الغياب:* ${clockString(new Date - afkTime)} ⏰
`.trim())
    }
    return true
}

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

// أمر تفعيل الغياب
if (m.text.startsWith('.غياب')) {
  let reason = m.text.replace('.غياب', '').trim() || 'بدون سبب';
  global.db.data.users[m.sender].afk = Date.now();
  global.db.data.users[m.sender].afkReason = reason;
  m.reply(`✅ *تم تفعيل وضع الغياب!* 😴\n*السبب:* ${reason}`);
}
