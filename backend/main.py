from telethon import TelegramClient, events
from flask import Flask, request, jsonify
import asyncio
import threading

app = Flask(__name__)

API_ID = 24378954
API_HASH = "d156f5e199c6aea6a4f8720dcc0d862e"

clients = {}

# Run Telethon inside async loop
def start_client(phone):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    client = TelegramClient(f"sessions/{phone}", API_ID, API_HASH)
    loop.run_until_complete(client.start(phone))
    clients[phone] = client
    loop.run_forever()

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    phone = data["phone"]

    thread = threading.Thread(target=start_client, args=(phone,))
    thread.start()

    return jsonify({"status": "Login started, check your Telegram for OTP."})

@app.route("/send", methods=["POST"])
def send():
    data = request.json
    phone = data["phone"]
    message = data["message"]
    gap = int(data["gap"])

    client = clients.get(phone)
    if not client:
        return jsonify({"error": "Not logged in"})

    async def forward_message():
        async for dialog in client.iter_dialogs():
            if dialog.is_group:
                await client.send_message(dialog.id, message)
                await asyncio.sleep(gap)

    client.loop.create_task(forward_message())
    return jsonify({"status": "Messages are being sent."})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
