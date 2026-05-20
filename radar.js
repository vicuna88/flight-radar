const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1505858798487605259/I2xpW8XQpkQWILeK8stSxYIlc_qJ_j2JxVQawFrqBRbOJs6dBASHLMfYHwa99AB8-YTZ";

async function runRadar() {
  const payload = {
    username: "鄭州機票雷達", // 強制設定機器人名稱
    content: "🚀 雷達啟動測試！",
    embeds: [{
      title: "系統連接測試",
      description: "如果你看到這則訊息，代表我們已經成功解決了連線與訊息發送邏輯！",
      color: 5814783 // 設定一個顏色
    }]
  };

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    console.log("最終發送狀態碼:", response.status);
  } catch (error) {
    console.error("發送失敗:", error);
  }
}

runRadar();
