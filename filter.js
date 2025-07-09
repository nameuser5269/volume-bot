export function filterBoomStocks(data) {
  return data.filter(x =>
    x.todayVolume > x.yesterdayVolume * 2 && x.todayVolume > 5000
  );
}
