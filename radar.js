const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1505858798487605259/I2xpW8XQpkQWILeK8stSxYIlc_qJ_j2JxVQawFrqBRbOJs6dBASHLMfYHwa99AB8-YTZ";

async function runRadar() {
  console.log("🚀 程式開始執行...");
  
  const payload = {
    content: "測試：這是來自 GitHub 的強制推送。"
  };

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    // 檢查回應狀態碼 (這是最關鍵的除錯資訊)
    console.log("HTTP 狀態碼:", response.status);
    
    // 讀取並印出回應內容
    const data = await response.text();
    console.log("Discord 原始回應:", data);

  } catch (error) {
    // 如果連 fetch 連線階段都失敗，會跳到這裡
    console.error("❌ 發生連線錯誤:", error);
  }
}

runRadar();
