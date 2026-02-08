// 隨機生成 userIP，用於限制使用量
let userIP = Math.random().toString(36).substring(2);

// 取得元素
const input = document.getElementById("user-input");
const box = document.getElementById("chat-box");
const personalitySelect = document.getElementById("personality");

// 發送訊息
async function sendMessage() {
  const role = personalitySelect.value;
  const text = input.value.trim();
  if (!text) return;

  // 顯示使用者訊息
  box.innerHTML += `<div class="user">你：${text}</div>`;

  // 呼叫 Replit 後端 AI
  try {
    const response = await fetch("https://nodejs-1--doomsdaypotato6
.repl.co/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text, role: role, ip: userIP })
    });

    const data = await response.json();
    box.innerHTML += `<div class="ai">AI：${data.reply}</div>`;
    box.scrollTop = box.scrollHeight;

  } catch (err) {
    console.error(err);
    box.innerHTML += `<div class="ai">AI：暫時無法連線，請稍後再試</div>`;
  }

  input.value = "";
}

// 可按 Enter 發送訊息
input.addEventListener("keydown", function(e){
  if(e.key === "Enter") sendMessage();
});

