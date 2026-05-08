"""
fetch_nbis_data.py — NBIS daily data fetcher
Kjør: python fetch_nbis_data.py
Output: rapport i terminalen + oppdatert data/news.json (valgfritt)
"""

import json
import re
import sys
from datetime import date
from pathlib import Path

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Mangler avhengigheter. Kjør: pip install requests beautifulsoup4")
    sys.exit(1)

TODAY = date.today().isoformat()
DATA_DIR = Path(__file__).parent.parent / "data"
NEWS_JSON = DATA_DIR / "news.json"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
}

# ── 1. Barchart — pris, IV, options ──────────────────────────────────────────

def fetch_barchart():
    print("\n── Barchart ──────────────────────────────────────────")
    url = "https://www.barchart.com/stocks/quotes/NBIS/overview"
    try:
        r = requests.get(url, headers=HEADERS, timeout=15)
        soup = BeautifulSoup(r.text, "html.parser")

        def find_val(label):
            el = soup.find(string=re.compile(label, re.I))
            if el and el.parent:
                sib = el.parent.find_next_sibling()
                if sib:
                    return sib.get_text(strip=True)
            return "–"

        price_el = soup.find("span", class_=re.compile("last-price|priceText", re.I))
        price = price_el.get_text(strip=True) if price_el else "–"

        print(f"  Pris (last):       {price}")
        print(f"  52-wk high:        {find_val('52-Week High')}")
        print(f"  IV Rank:           {find_val('IV Rank')}")
        print(f"  IV Percentile:     {find_val('IV Percentile')}")
        print(f"  Put/Call Vol:      {find_val('Put/Call Vol')}")
        print(f"  Barchart Opinion:  {find_val('Opinion')}")
    except Exception as e:
        print(f"  FEIL: {e}")


# ── 2. Fintel — institusjonell eierskap ──────────────────────────────────────

def fetch_fintel():
    print("\n── Fintel — institusjonell eierskap ──────────────────")
    url = "https://fintel.io/so/us/nbis"
    try:
        r = requests.get(url, headers=HEADERS, timeout=15)
        soup = BeautifulSoup(r.text, "html.parser")

        rows = soup.select("table tbody tr")
        if not rows:
            print("  Ingen tabelldata funnet (kan kreve JS-rendering)")
            return

        print(f"  {'Institusjon':<40} {'Aksjer':>12} {'Endring':>12}")
        print(f"  {'-'*40} {'-'*12} {'-'*12}")
        for row in rows[:15]:
            cells = [td.get_text(strip=True) for td in row.select("td")]
            if len(cells) >= 3:
                print(f"  {cells[0]:<40} {cells[1]:>12} {cells[2]:>12}")
    except Exception as e:
        print(f"  FEIL: {e}")


# ── 3. Quiver Quantitative — lobbying ────────────────────────────────────────

def fetch_quiver():
    print("\n── Quiver Quantitative — NBIS ────────────────────────")
    url = "https://www.quiverquant.com/stock/NBIS"
    try:
        r = requests.get(url, headers=HEADERS, timeout=15)
        soup = BeautifulSoup(r.text, "html.parser")

        # Lobbying
        lobby_section = soup.find(string=re.compile("Lobbying", re.I))
        if lobby_section:
            parent = lobby_section.find_parent("section") or lobby_section.find_parent("div")
            if parent:
                rows = parent.select("tr")
                if rows:
                    print("  Lobbying:")
                    for row in rows[:6]:
                        cells = [td.get_text(strip=True) for td in row.select("td")]
                        if cells:
                            print(f"    {' | '.join(cells)}")
                else:
                    print(f"  Lobbying-seksjon funnet (ingen tabellrader)")
        else:
            print("  Ingen lobbying-data synlig")

        # Congressional trades
        cong = soup.find(string=re.compile("No Congress Trading", re.I))
        print(f"  Congress trades:   {'Ingen' if cong else 'Finn manuelt'}")

    except Exception as e:
        print(f"  FEIL: {e}")


# ── 4. Enkel nyhetssøk via DuckDuckGo ────────────────────────────────────────

def fetch_news():
    print("\n── NBIS nyheter siste 24t (DuckDuckGo) ──────────────")
    query = f"Nebius NBIS site:nebius.com OR site:datacenterdynamics.com OR site:seekingalpha.com {TODAY}"
    url = f"https://html.duckduckgo.com/html/?q={requests.utils.quote(query)}"
    try:
        r = requests.get(url, headers=HEADERS, timeout=15)
        soup = BeautifulSoup(r.text, "html.parser")
        results = soup.select(".result__title a")[:8]
        if not results:
            print("  Ingen resultater")
            return
        for a in results:
            print(f"  • {a.get_text(strip=True)[:80]}")
            print(f"    {a.get('href', '')[:90]}")
    except Exception as e:
        print(f"  FEIL: {e}")


# ── 5. Vis gjeldende news.json ────────────────────────────────────────────────

def show_news_json():
    print("\n── data/news.json — gjeldende entries ───────────────")
    try:
        data = json.loads(NEWS_JSON.read_text(encoding="utf-8"))
        for e in data.get("entries", []):
            impact = {"bull": "🟢", "bear": "🔴", "neutral": "🟡"}.get(e.get("impact", ""), "⚪")
            print(f"  {impact} {e['date']} [{e['category']}] {e['headline']}")
    except Exception as e:
        print(f"  FEIL: {e}")


# ── Main ──────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print(f"NBIS DATA FETCH — {TODAY}")
    print("=" * 55)
    fetch_barchart()
    fetch_fintel()
    fetch_quiver()
    fetch_news()
    show_news_json()
    print("\n" + "=" * 55)
    print("Ferdig. Oppdater news.json manuelt eller via Alpha (op).")
