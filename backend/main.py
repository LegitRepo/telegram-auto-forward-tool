from fastapi import FastAPI
from pydantic import BaseModel
from telethon import TelegramClient
import os

app = FastAPI()

# Get API keys from Railway environment
API_ID = int(os.getenv("API_ID", "24378954"))
API_HASH = os.getenv("API_HASH", "d156f5e199c6aea6a4f8720dcc0d862e")
SESSION_NAME = "forward_session"

client = TelegramClient(SESSION_NAME, API_ID, API_HASH)

class ForwardRequest(BaseModel):
    from_chat: str
    to_chat: str
    message: str

@app.on_event("startup")
async def startup_event():
    await client.start()
    print("✅ Telegram client started")

@app.post("/forward")
async def forward_message(data: ForwardRequest):
    try:
        await client.send_message(data.to_chat, f"[FWD] {data.message}")
        return {"status": "success", "message": "Message forwarded!"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
