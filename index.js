import { Client, GatewayIntentBits } from 'discord.js';
import { getStockVolumeData } from './finmind.js';
import { filterBoomStocks } from './filter.js';

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;

if (!DISCORD_TOKEN || !CHANNEL_ID) {
  console.error("❌ Token 或頻道 ID 沒有設定！");
  process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', async () => {
  console.log(`✅ Bot logged in as ${client.user.tag}`);
  try {
    const data = await getStockVolumeData();
    const boom = filterBoomStocks(data);

    const channel = await client.channels.fetch(CHANNEL_ID);
    if (!channel) {
      console.error("❌ 找不到頻道，請檢查 CHANNEL_ID 是否正確");
      return;
    }

    if (boom.length === 0) {
      await channel.send('📉 今天沒有爆量股');
    } else {
      const msg = boom.map(s =>
        `💥 ${s.stock_id} ${s.stock_name} — 今日：${s.todayVolume}，昨：${s.yesterdayVolume}`
      ).join('\n');
      await channel.send('📈 **今日爆量股**\n' + msg);
    }
  } catch (err) {
    console.error("❌ 執行過程出錯：", err);
  } finally {
    client.destroy();
  }
});

client.login(DISCORD_TOKEN).catch(err => {
  console.error("❌ Discord 登入失敗，可能是 Token 錯誤");
  console.error(err);
  process.exit(1);
});
