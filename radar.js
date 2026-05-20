// 鄭州機票雷達 - 正式戰鬥版
const GEMINI_API_KEY = "AIzaSyCgGkWPrhy_YXSDTirME673LeObHsFrO_o";
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1505858798487605259/I2xpW8XQpkQWILeK8stSxYIlc_qJ_j2JxVQawFrqBRbOJs6dBASHLMfYHwa99AB8-YTZ";

async function runRadar() {
  const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
  
  const prompt = {
    contents: [{
      parts: [{
        text: `請幫我規劃 2026 年 7 月 15 日至 8 月 30 日期間，台北 (TPE) 到鄭州 (CGO) 停留 20 天的來回機票。請提供兩組最便宜的經濟艙組合，以 JSON 格式回傳，欄位包含：departureDate, returnDate, priceTwd, airline, note。`
      }]
    }]
  };

  try {
    const res = await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(prompt)
    });

    const data = await res.json();
    const text = data.candidates[0].content.parts[0].text;

    // 將結果發送到 Discord
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [{
          title: "✈️ 鄭州特價機票情報",
          description: text,
          color: 3447003
        }]
      })
    });
  } catch (err) {
    console.error("執行失敗:", err);
  }
}

runRadar();
