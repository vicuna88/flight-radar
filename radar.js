// 這是你剛剛取得的正確網址
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1506493000333656094/o1DEfLi-4DhRJyDID_FtQLKRKf_MMDnmyNRu0fOWkJaNd3MF4KrJzE8ouKf_DGpvQvRZ";

async function runRadar() {
  const payload = {
    username: "鄭州機票雷達", // 機器人名稱
    content: "✅ 系統測試成功！", // 機器人說的話
    embeds: [{
      title: "恭喜！雷達系統已連線",
      description: "這代表你已經成功掌握了 GitHub 到 Discord 的自動化連線機制。接下來我們隨時可以把真正的機票查詢結果填入這裡。",
      color: 5814783 // 設定一個亮眼的顏色
    }]
  };

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    
    console.log("發送狀態碼:", response.status);
  } catch (error) {
    console.error("發送失敗:", error);
  }
}

runRadar();
