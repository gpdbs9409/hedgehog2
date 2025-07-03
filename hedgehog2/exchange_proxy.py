from flask import Flask, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import threading
import time

app = Flask(__name__)
CORS(app)

cached_data = []
last_update = 0

def fetch_exchange():
    global cached_data, last_update
    while True:
        try:
            url = "https://finance.naver.com/marketindex/exchangeList.naver"
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
            }
            response = requests.get(url, headers=headers)
            soup = BeautifulSoup(response.text, "html.parser")
            rows = soup.select("table.tbl_exchange tbody tr")
            result = []
            for row in rows:
                tds = row.find_all("td")
                if len(tds) < 7:
                    continue
                currency_name = tds[0].text.strip()
                base_rate = tds[1].text.strip()
                cash_buy = tds[2].text.strip()
                cash_sell = tds[3].text.strip()
                remittance_send = tds[4].text.strip()
                remittance_receive = tds[5].text.strip()
                buy_spread = tds[6].text.strip()
                change = tds[7].text.strip() if len(tds) > 7 else ""
                result.append({
                    "currency": currency_name,
                    "base_rate": base_rate,
                    "cash_buy": cash_buy,
                    "cash_sell": cash_sell,
                    "remittance_send": remittance_send,
                    "remittance_receive": remittance_receive,
                    "buy_spread": buy_spread,
                    "change": change
                })
            cached_data = result
            last_update = int(time.time())
        except Exception as e:
            print("Error fetching exchange rates:", e)
        time.sleep(1)

@app.route("/api/exchange")
def get_exchange():
    return jsonify({
        "data": cached_data,
        "last_update": last_update
    })

if __name__ == "__main__":
    t = threading.Thread(target=fetch_exchange, daemon=True)
    t.start()
    app.run(port=5050) 