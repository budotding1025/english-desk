# -*- coding: utf-8 -*-
"""翻翻英语本地页：静态文件 + 进页即可出声（不依赖浏览器自动播放）。"""
import subprocess
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import parse_qs, urlparse

ROOT = Path(__file__).resolve().parent
PORT = 8731
CLIPS = {
    "turtle": ROOT / "audio" / "home" / "turtle.mp3",
    "bee": ROOT / "audio" / "home" / "bee.mp3",
}
PS = ROOT / "_play_slogan.ps1"
PS.write_text(
    """
param([string]$Path)
Add-Type -AssemblyName PresentationCore
$player = New-Object System.Windows.Media.MediaPlayer
$player.Open($Path)
$player.Volume = 1
$player.Play()
$guard = 0
while (-not $player.NaturalDuration.HasTimeSpan -and $guard -lt 40) {
  Start-Sleep -Milliseconds 50
  $guard++
}
if ($player.NaturalDuration.HasTimeSpan) {
  $ms = [int]$player.NaturalDuration.TimeSpan.TotalMilliseconds
  if ($ms -lt 300) { $ms = 300 }
  if ($ms -gt 20000) { $ms = 20000 }
  Start-Sleep -Milliseconds ($ms + 120)
} else {
  Start-Sleep -Seconds 4
}
$player.Stop()
$player.Close()
""".strip(),
    encoding="utf-8-sig",
)

current = {"proc": None}


def stop_play():
    proc = current.get("proc")
    current["proc"] = None
    if proc and proc.poll() is None:
        proc.kill()


def play_clip(who):
    path = CLIPS.get(who)
    if not path or not path.exists():
        return False
    stop_play()
    proc = subprocess.Popen(
        ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", str(PS), "-Path", str(path)],
        cwd=str(ROOT),
    )
    current["proc"] = proc
    proc.wait()
    if current.get("proc") is proc:
        current["proc"] = None
    return proc.returncode == 0


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/play":
            who = (parse_qs(parsed.query).get("who") or ["turtle"])[0]
            ok = play_clip(who)
            body = b"ok" if ok else b"fail"
            self.send_response(200 if ok else 500)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        if parsed.path == "/api/stop":
            stop_play()
            self.send_response(204)
            self.end_headers()
            return
        return super().do_GET()

    def log_message(self, fmt, *args):
        return


if __name__ == "__main__":
    ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
