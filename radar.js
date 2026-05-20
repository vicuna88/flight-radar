const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1505858798487605259/I2xpW8XQpkQWILeK8stSxYIlc_qJ_j2JxVQawFrqBRbOJs6dBASHLMfYHwa99AB8-YTZ";

async function runRadar() {
  // 這裡之後會放你從 Gemini 抓到的機票資料
  const flightInfo = "目的地：鄭州 | 日期：2026/07/15 | 價格：$12,000 TWD";
  
  const payload = {
    content: "✈️ **機票雷達追蹤報告**",
    embeds: [{
      title: "發現新航班優惠！",
      description: flightInfo,
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
  } catch (error) {
    console.error("發送失敗:", error);
  }
}

runRadar();
