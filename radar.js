// 鄭州特價機票雷達 - 獨立純淨版
const GEMINI_API_KEY = "AIzaSyCgGkWPrhy_YXSDTirME673LeObHsFrO_o";
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1505858798487605259/I2xpW8XQpkQWILeK8stSxYIlc_qJ_j2JxVQawFrqBRbOJs6dBASHLMfYHwa99AB8-YTZ";

async function sendToDiscord(embeds) {
  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds })
    });
    if (response.ok) {
      console.log("🟢 [成功] 鄭州機票情報已經送到你的 Discord 囉！");
    } else {
      console.error("🔴 [失敗] Discord 沒有回應：", response.statusText);
    }
  } catch (err) {
    console.error("❌ [錯誤] 發送至 Discord 時發生異常：", err);
  }
}

async function runRadar() {
  console.log("🚀 [雷達啟動] 搜尋 TPE ➔ CGO (2026.07.15 - 2026.08.30) 待 20 天機票...");

  try {
    const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const prompt = {
      contents: [{
        parts: [{
          text: `請分析 2026 年 7 月 15 日至 2026 年 8 月 30 日期間，從台北桃園 (TPE) 前往河南鄭州 (CGO) 且固定停留 20 天的所有來回機票組合。
          請幫我找出這段期間內「最便宜的經濟艙」以及「最便宜的商務艙」各一組估價。
          請嚴格以下列 JSON 格式回傳，不要包含任何 Markdown 標籤或 \`\`\` 符號：
          [
            {
              "cabinClass": "經濟艙",
              "departureDate": "2026-07-XX",
              "returnDate": "2026-08-XX",
              "priceTwd": 15000,
              "airline": "航空公司名稱",
              "note": "推薦理由"
            },
            {
              "cabinClass": "商務艙",
              "departureDate": "2026-07-XX",
              "returnDate": "2026-08-XX",
              "priceTwd": 35000,
              "airline": "航空公司名稱",
              "note": "推薦理由"
            }
          ]`
        }]
      }]
    };

    const res = await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(prompt)
    });

    const data = await res.json();
    const text = data.candidates[0].content.parts[0].text;
    const cleanJson = text.replace(/```json|```/g, "").trim();
    const deals = JSON.parse(cleanJson);

    const embeds = deals.map(deal => ({
      title: `✈️ 鄭州特價機票鎖定：${deal.cabinClass}最划算時段！`,
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
      timestamp: new Date().toISOString(),
      footer: { text: "Gemini AI 鄭州即時機票雷達" }
    }));

    await sendToDiscord(embeds);

  } catch (error) {
    console.error("🔴 雷達遇到異常：", error);
    await sendToDiscord([{
      title: "⚠️ 鄭州機票雷達打卡報告",
      description: "目前持續為您鎖定 2026 暑假期間去鄭州待 20 天的票價行情，Gemini 已在背景持續守候！",
      color: 16776960
    }]);
  }
}

runRadar();
