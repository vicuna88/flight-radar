// 確認連線測試程式碼
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1505858798487605259/I2xpW8XQpkQWILeK8stSxYIlc_qJ_j2JxVQawFrqBRbOJs6dBASHLMfYHwa99AB8-YTZ";

async function testConnection() {
  const payload = {
    content: "雷達測試：GitHub 成功連線到 Discord 了！"
  };

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    console.log("連線測試狀態:", response.status);
  } catch (err) {
    console.error("測試失敗:", err);
  }
}

testConnection();
