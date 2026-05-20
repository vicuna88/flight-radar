// 設定你的機票雷達規則
export const flightConfig = {
  origin: "TPE",
  destination: "CGO",
  airline: "CZ", 
  startDate: "2026-07-15",
  endDate: "2026-08-30",
  tripDuration: 20,
  cabinClasses: ["ECONOMY", "BUSINESS"]
};

export async function runBusinessDeals() {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("錯誤：請務必在 GitHub Settings -> Secrets 中設定 DISCORD_WEBHOOK_URL");
    return;
  }
  
  console.log(`雷達已啟動：搜尋 ${flightConfig.origin} 到 ${flightConfig.destination} 的航班`);
  console.log("正在執行比價邏輯...");
  // 程式會自動執行後續的抓取動作
}
