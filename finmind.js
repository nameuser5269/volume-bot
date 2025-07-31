export async function getStockVolumeData() {
  // This is a placeholder implementation. In a real project,
  // you would fetch data from the FinMind API using your FINMIND_TOKEN.
  return [
    { stock_id: '2330', stock_name: '台積電', todayVolume: 1200000, yesterdayVolume: 400000 },
    { stock_id: '2317', stock_name: '鴻海', todayVolume: 300000, yesterdayVolume: 200000 },
    { stock_id: '2603', stock_name: '長榮', todayVolume: 900000, yesterdayVolume: 250000 },
  ];
}
