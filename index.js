import { Client, GatewayIntentBits } from 'discord.js';
import { getStockVolumeData } from './finmind.js';
import { filterBoomStocks } from './filter.js';

// 印出所有 Secret，有空值就知道了（不會發送，只印）
console.log("🔍 環境變數檢查：");
console.log("DISCORD_TOKEN:", process.env.DISCORD_TOKEN ? "✅ 已設定" : "❌ 沒有設定");
console.log("DISCORD_CHANNEL_ID:", process.env.DISCORD_CHANNEL_ID ? "✅ 已設定" : "❌ 沒有設定");
console.log("FINMIND_TOKEN:", process.env.FINMIND_TOKEN ? "✅ 已設定" : "❌ 沒有設定");

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;

if (!DISCORD_TOKEN || !CHANNEL_ID) {
  console.error("❌ Token 或 頻道 ID 沒有設定，請確認 Secrets 正確");
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
      console.error("❌ 找不到指定頻道！");
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
    console.error("❌ 執行期間錯誤：", err);
  } finally {
    client.destroy();
  }
});

client.login(DISCORD_TOKEN).catch(err => {
  console.error("❌ Discord 登入失敗，可能是 Token 錯誤！");
  console.error(err);
  process.exit(1);
});
