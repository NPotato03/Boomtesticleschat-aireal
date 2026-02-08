// 隨機生成 userIP，用於限制每人使用量
let userIP = Math.random().toString(36).substring(2);

// 取得元素
const input = document.getElementById("user-input");
const box = document.getElementById("chat-box");
const personalitySelect = document.getElementById("personality");

// 發送訊息函式
async function sendMessage() {
  const role = personalitySelect.value;       // 角色選擇
  const text = input.value.trim();            // 使用者輸入
  if (!text) return;

  // 顯示使用者訊息
  box.innerHTML += `<div class="user">你：${text}</div>`;

  // 呼叫 Replit 後端 AI
  try {
    const response = await fetch("https://ai-idol-chat.doomsdaypotato6/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text, role: role, ip: userIP })
    });

    const data = await response.json();

    // 判斷回覆內容
    if (data.reply === "等等先～使用量達上限 😴") {
      box.innerHTML += `<div class="ai">AI：${data.reply}</div>`;
    } else {
      box.innerHTML += `<div class="ai">AI：${data.reply}</div>`;
    }

    // 自動滾動到底部
    box.scrollTop = box.scrollHeight;

  } catch (err) {
    console.error(err);
    box.innerHTML += `<div class="ai">AI：暫時無法連線，請稍後再試</div>`;
  }

  // 清空輸入框
  input.value = "";
}

// 支援按 Enter 發送
input.addEventListener("keydown", function(e){
  if(e.key === "Enter") sendMessage();
});

