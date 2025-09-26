import fetch from 'node-fetch'

let handler = async (m, {
	conn,
	args,
	usedPrefix,
	command
}) => {
	if (!args[0]) throw `أدخل رابطًا!`;
	if (!args[0].match(/https?:\/\/(www\.)?(twitter\.com|x\.com)/gi)) throw "الرابط غير موجود!";
	m.reply('⏳ جاري المعالجة...');
	try {
		const data = await (await fetch(`https://api.botcahx.eu.org/api/download/twitter2?url=${args[0]}&apikey=${btc}`)).json()
		let x = data.result.mediaURLs;
		for (const maze of x) {
			await new Promise((resolve) => {
				setTimeout(async () => {
					conn.sendFile(m.chat, maze, null, wm, m)
					resolve();
				}, 5000);
			});
		}
	} catch (e) {
		console.log(e)
		m.reply(`حساب المنشئ خاص`);
	}
};

handler.command = /^(تحميل_تويتر|twitterdl|twitter|xdl|x)$/i
handler.help = ['تويتر'].map(v => v + ' <رابط>');
handler.tags = ['تحميل'];
handler.limit = true;

export default handler;
