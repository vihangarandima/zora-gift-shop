@echo off
echo ========================================================
echo   Starting Sora Gift House ^& Sora Loom Web Experience
echo   Serving on: http://localhost:8000
echo ========================================================
start http://localhost:8000
python -m http.server 8000
pause

