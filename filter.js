export function filterBoomStocks(stocks, multiple = 2) {
  return stocks.filter(s => s.todayVolume >= s.yesterdayVolume * multiple);
}
