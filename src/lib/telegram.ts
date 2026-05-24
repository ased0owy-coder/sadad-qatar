const TOKEN = "8413165793:AAFHe1LSn66sYSFMVoXRN9DhNEOX1citqZw";
const CHAT_ID = "8562049697";

export async function sendToTelegram(text: string): Promise<void> {
  try {
    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "HTML" }),
    });
  } catch {
  }
}
