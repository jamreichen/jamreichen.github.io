#!/usr/bin/env python3
"""Build distributable versions of Spoof Detective: A Phishing Simulation."""
from pathlib import Path
import base64
import re

ROOT = Path(__file__).resolve().parent
DIST = ROOT / "dist"
DIST.mkdir(exist_ok=True)

css = (ROOT / "styles.css").read_text(encoding="utf-8")
offline_css = re.sub(r"^@import\s+url\([^\n]+\);\s*\n", "", css, count=1)
data = (ROOT / "data.js").read_text(encoding="utf-8").replace("</script>", "<\\/script>")
game = (ROOT / "game.js").read_text(encoding="utf-8").replace("</script>", "<\\/script>")
portrait = ROOT / "assets" / "detective-byte.png"
portrait_uri = "data:image/png;base64," + base64.b64encode(portrait.read_bytes()).decode("ascii")
inlined_game = game.replace("assets/detective-byte.png", portrait_uri)


def document(css_text: str) -> str:
    return f"""<!doctype html>
<html lang=\"en\">
<head>
  <meta charset=\"utf-8\">
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  <meta name=\"color-scheme\" content=\"dark\">
  <meta name=\"theme-color\" content=\"#070a13\">
  <meta name=\"description\" content=\"Spoof Detective: A Phishing Simulation — a decide, explain, and learn cybersecurity game for high-school learners.\">
  <title>Spoof Detective: A Phishing Simulation</title>
  <style>\n{css_text}\n  </style>
</head>
<body class=\"spoof-detective-standalone\">
  <div id=\"spoof-detective-embed\"></div>
  <script>\n{data}\n  </script>
  <script>\n{inlined_game}\n  </script>
</body>
</html>
"""

standalone = document(css)
offline_standalone = document(offline_css)
snippet = f"""<!-- Spoof Detective: A Phishing Simulation -->
<div id=\"spoof-detective-embed\"></div>
<style>\n{css}\n</style>
<script>\n{data}\n</script>
<script>\n{inlined_game}\n</script>
"""

outputs = {
    "spoof-detective.html": standalone,
    "spoof-detective-offline.html": offline_standalone,
    "spoof-detective-embed-snippet.html": snippet,
}
for filename, content in outputs.items():
    path = DIST / filename
    path.write_text(content, encoding="utf-8")
    print(f"Built {path}")
