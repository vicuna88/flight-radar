// 鄭州機票雷達 - 偵錯模式
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1505858798487605259/I2xpW8XQpkQWILeK8stSxYIlc_qJ_j2JxVQawFrqBRbOJs6dBASHLMfYHwa99AB8-YTZ";

async function runRadar() {
  try {
    console.log("開始發送 Discord 測試...");
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [{
          title: "🚀 機票雷達：偵錯模式啟動",
          description: "如果看到這則訊息，代表程式邏輯已確認通暢。請告知我，我將幫你加入完整的 Gemini API 機票抓取功能。",
          color: 16776960
        }]
      })
    });
    
    if (!response.ok) {
        throw new Error(`Discord 回應錯誤: ${response.status}`);
    }
    console.log("Discord 發送成功!");
  } catch (err) {
    console.error("錯誤:", err);
  }
}

runRadar();
