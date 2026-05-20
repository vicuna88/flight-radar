// 已經更新為你最新的文字頻道 Webhook 網址
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1506495298631897178/fzYkRoZyKR07W15npX23T8Fj9hcama-k21Tl7TpgfFPPuEFNWnOq_42mWscINLrzPvSG";

async function runRadar() {
  const payload = {
    username: "鄭州機票雷達",
    content: "✅ 系統已經成功連接到文字頻道！",
    embeds: [{
      title: "雷達連線測試報告",
      description: "這代表你已經完全掌握 Discord Webhook 的設定邏輯，這是學習自動化最重要的一步！",
      color: 3066993 // 藍色
    }]
  };

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    
    console.log("最終發送狀態碼:", response.status);
    const data = await response.text();
    console.log("Discord 回應:", data);
  } catch (error) {
    console.error("發送失敗:", error);
  }
}

runRadar();
