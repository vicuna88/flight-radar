// 鄭州特價機票雷達 - 強化升級版
const GEMINI_API_KEY = "AIzaSyCgGkWPrhy_YXSDTirME673LeObHsFrO_o";
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1505858798487605259/I2xpW8XQpkQWILeK8stSxYIlc_qJ_j2JxVQawFrqBRbOJs6dBASHLMfYHwa99AB8-YTZ";

async function sendToDiscord(embeds) {
  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds })
    });
  } catch (err) {
    console.error("Discord 發送失敗:", err);
  }
}

async function runRadar() {
  try {
    // 修正為符合 v1beta 的標準 API 請求路徑
    const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
    
    const prompt = {
      contents: [{
        parts: [{
          text: `你是一個旅行社票價精算師。請幫我規劃 2026 年 7 月 15 日至 2026 年 8 月 30 日期間，從台北桃園 (TPE) 前往河南鄭州 (CGO) 且固定停留 20 天的來回機票。
          請直接幫我挑選「一組最便宜經濟艙」與「一組最便宜商務艙」的推薦組合。
          必須嚴格只回傳一個標準的 JSON 陣列，絕對不要包含任何 \`\`\`json 標籤或中文說明文字，格式如下：
          [
            {"cabinClass": "經濟艙", "departureDate": "2026-07-20", "returnDate": "2026-08-09", "priceTwd": 14500, "airline": "南方航空", "note": "直飛最低價"},
            {"cabinClass": "商務艙", "departureDate": "2026-07-25", "returnDate": "2026-08-14", "priceTwd": 32000, "airline": "長榮航空", "note": "商務艙首選"}
          ]`
        }]
      }]
    };

    const res = await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(prompt)
    });

    if (!res.ok) {
      throw new Error(`Gemini API 聯絡失敗，錯誤碼: ${res.status}`);
    }

    const data = await res.json();
    let text = data.candidates[0].content.parts[0].text.trim();
    
    // 強效清理可能夾帶的 Markdown 符號
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const deals = JSON.parse(text);

    const embeds = deals.map(deal => ({
      title: `✈️ 鄭州特價機票鎖定：${deal.cabinClass}最劃算時段！`,
      color: deal.cabinClass === "商務艙" ? 10181046 : 3447003,
      fields: [
        { name: "📍 航線", value: "桃園 (TPE) ➔ 鄭州 (CGO)", inline: true },
        { name: "📅 旅遊型態", value: "來回票 (固定停留 20 天)", inline: true },
        { name: "🛫 出發時間", value: deal.departureDate, inline: true },
        { name: "🛬 回程時間", value: deal.returnDate, inline: true },
        { name: "💰 估計票價", value: `**NT$ ${deal.priceTwd.toLocaleString()}** 元起`, inline: true },
        { name: "航空巨頭", value: deal.airline, inline: true },
        { name: "💡 秘書備忘錄", value: deal.note }
      ],
      timestamp: new Date().toISOString()
    }));

    await sendToDiscord(embeds);

  } catch (error) {
    // 升級：如果真的還是噴錯，直接把「真正的錯誤原因」丟到 Discord 頻道，方便我們一秒抓漏！
    await sendToDiscord([{
      title: "⚠️ 鄭州機票雷達·異常回報晶片",
      description: `雷達運算時卡住了，錯誤訊息：\`${error.message}\`\n請將此畫面拍照給 AI 秘書協助排除！`,
      color: 16711680
    }]);
  }
}

runRadar();
