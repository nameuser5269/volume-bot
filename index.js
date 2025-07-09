import { Client, GatewayIntentBits } from 'discord.js';
import { getStockVolumeData } from './finmind.js';
import { filterBoomStocks } from './filter.js';
import config from './config.json' assert { type: 'json' };

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', async () => {
  const data = await getStockVolumeData();
  const boom = filterBoomStocks(data);
  const channel = await client.channels.fetch(config.channelId);
  if (boom.length === 0) {
    await channel.send('📉 今天沒有爆量股');
  } else {
    const msg = boom.map(s =>
      `💥 ${s.stock_id} ${s.stock_name} — 今日：${s.todayVolume}，昨：${s.yesterdayVolume}`
    ).join('\n');
    await channel.send('📈 **今日爆量股**\n' + msg);
  }
  client.destroy();
});

client.login(config.botToken);
