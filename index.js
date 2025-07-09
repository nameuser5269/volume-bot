import { Client, GatewayIntentBits } from 'discord.js';
import { getStockVolumeData } from './finmind.js';
import { filterBoomStocks } from './filter.js';

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', async () => {
  console.log(`✅ Bot logged in as ${client.user.tag}`);
  try {
    const data = await getStockVolumeData();
    const boom = filterBoomStocks(data);

    const channel = await client.channels.fetch(CHANNEL_ID);
    if (boom.length === 0) {
      await channel.send('📉 今天沒有爆量股');
    } else {
      const msg = boom.map(s =>
        `💥 ${s.stock_id} ${s.stock_name} — 今日：${s.todayVolume}，昨：${s.yesterdayVolume}`
      ).join('\n');
      await channel.send('📈 **今日爆量股**\n' + msg);
    }
  } catch (err) {
    console.error("❌ 發生錯誤：", err);
  } finally {
    client.destroy();
  }
});

client.login(DISCORD_TOKEN);
