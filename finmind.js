import fetch from 'node-fetch';

/**
 * Fetches stock volume data from the FinMind API.
 * This is a simplified implementation and returns the raw data array.
 */
export async function getStockVolumeData() {
  const token = process.env.FINMIND_TOKEN;
  if (!token) {
    throw new Error('FINMIND_TOKEN environment variable is not set');
  }
  const url = `https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockTradingDaily&token=${token}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`FinMind request failed: ${res.status}`);
  }
  const { data } = await res.json();
  return data;
}
