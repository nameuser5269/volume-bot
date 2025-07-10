/**
 * Filters stocks with significantly increased trading volume.
 * Expects an array of objects with stock_id, stock_name, and volume fields.
 * Returns an array of stocks with volume at least double of the previous day.
 */
export function filterBoomStocks(data) {
  if (!Array.isArray(data)) {
    return [];
  }
  return data.filter(item => {
    const today = item.TradeVolume;
    const yesterday = item.YesterdayVolume || 0;
    return today && yesterday && today > yesterday * 2;
  }).map(item => ({
    stock_id: item.stock_id || item.StockID,
    stock_name: item.stock_name || item.StockName,
    todayVolume: item.TradeVolume,
    yesterdayVolume: item.YesterdayVolume
  }));
}
