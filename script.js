const chat = document.getElementById("chat");
const textInput = document.getElementById("text");
const roleSelect = document.getElementById("role");

function addMessage(who, msg) {
  const div = document.createElement("div");
  div.className = "msg " + who;
  div.innerText = (who === "user" ? "你：" : "AI：") + msg;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function send() {
  const text = textInput.value.trim();
  if (!text) return;

  const role = roleSelect.value;

  addMessage("user", text);
  textInput.value = "";

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        role: role
      })
    });

    const data = await res.json();
    addMessage("ai", data.reply);
  } catch (e) {
    addMessage("ai", "連線失敗…遲啲再試啦");
  }
}
