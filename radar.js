const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1505858798487605259/I2xpW8XQpkQWILeK8stSxYIlc_qJ_j2JxVQawFrqBRbOJs6dBASHLMfYHwa99AB8-YTZ";

async function runRadar() {
  const payload = { content: "測試中...如果這句話沒出現，代表 Webhook 被 Discord 伺服器擋掉了。" };
  
  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    
    // 強制把回應結果印在 GitHub Actions 的 Log 裡面
    const result = await response.text();
    console.log("Discord 回應內容:", result);
  } catch (err) {
    console.error("連線發生嚴重錯誤:", err);
  }
}
runRadar();
