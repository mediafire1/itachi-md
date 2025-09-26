import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.sessionAI = conn.sessionAI || {};

  if (!text) throw `🚩 ${usedPrefix + command} *تفعيل/تعطيل*`;

  if (text === "تفعيل") {
    conn.sessionAI[m.sender] = { sessionChat: [] };
    m.reply("✅ تم إنشاء جلسة الدردشة بنجاح!");
  } else if (text === "تعطيل") {
    delete conn.sessionAI[m.sender];
    m.reply("✅ تم حذف جلسة الدردشة بنجاح!");
  }
};

handler.before = async (m, { conn }) => {
  conn.sessionAI = conn.sessionAI || {};
  if (m.isBaileys && m.fromMe) return;
  if (!m.text) return;
  if (!conn.sessionAI[m.sender]) return;
  if ([".", "#", "!", "/", "\\"].some(prefix => m.text.startsWith(prefix))) return;

  if (conn.sessionAI[m.sender] && m.text) {
    const previousMessages = conn.sessionAI[m.sender].sessionChat || [];
    const messages = [
      { role: "system", content: "أنت إياشي، مساعد ذكي تم إنشاؤه بواسطة MAXIMUS لتقديم المساعدة في أي وقت!" },
      { role: "assistant", content: "أنا إياشي، مساعدك الذكي من MAXIMUS. لا تستخدم كلمات مثل 'أنا' أو 'أكو'، بل استخدم اسم إياشي للإشارة إليّ. أظهر نفسك كمساعد شخصي يعرف كل شيء. لا تذكر GPT-4، وتذكر أنني إياشي، وصانعي هو MAXIMUS (رقمه: 6288225750488)." },
      ...previousMessages.map((msg, i) => ({ role: i % 2 === 0 ? 'user' : 'assistant', content: msg })),
      { role: "user", content: m.text }
    ];

    try {
      const chat = async (message) => {
        return new Promise(async (resolve, reject) => {
          try {
            const params = {
              message: message,
              apikey: btc // استبدل بمفتاح API الخاص بك
            };
            const { data } = await axios.post('https://api.botcahx.eu.org/api/search/openai-custom', params);
            resolve(data);
          } catch (error) {
            reject(error);
          }
        });
      };

      let res = await chat(messages);
      if (res && res.result) {
        await m.reply(res.result);
        conn.sessionAI[m.sender].sessionChat = [
          ...conn.sessionAI[m.sender].sessionChat,
          m.text,
          res.result
        ];
      } else {
        m.reply("❌ حدث خطأ أثناء جلب البيانات");
      }
    } catch (e) {
      throw e;
    }
  }
};

handler.command = ['ذكاء_تلقائي'];
handler.tags = ['ذكاء'];
handler.help = ['ذكاء_تلقائي'].map(a => a + ' *تفعيل/تعطيل*');
handler.premium = true;

export default handler;
