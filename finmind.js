import axios from 'axios';
import dayjs from 'dayjs';
import config from './config.json' assert { type: 'json' };

export async function getStockVolumeData() {
  const today = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
  const yesterday = dayjs().subtract(2, 'day').format('YYYY-MM-DD');

  const resp = await axios.get('https://api.finmindtrade.com/api/v4/data', {
    params: {
      dataset: 'TaiwanStockPrice',
      start_date: yesterday,
      end_date: today,
      token: config.finmindToken || ''
    }
  });
  const arr = resp.data.data;
  const map = {};
  arr.forEach(d => {
    map[d.stock_id] = map[d.stock_id] || {};
    map[d.stock_id][d.date] = d;
  });
  const res = [];
  for (const id in map) {
    const r = map[id];
    if (r[today] && r[yesterday]) {
      res.push({
        stock_id: id,
        stock_name: r[today].stock_name,
        todayVolume: r[today].Trading_Volume,
        yesterdayVolume: r[yesterday].Trading_Volume
      });
    }
  }
  return res;
}
