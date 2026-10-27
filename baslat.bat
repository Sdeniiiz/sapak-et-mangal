@echo off
chcp 65001 >nul
title Sapak Et Mangal Bafra - Yerel Web Sunucusu
cd /d "%~dp0"
echo ========================================================
echo   Sapak Et Mangal Bafra Web Sitesi Baslatiliyor...
echo   Tarayicinizda aciliyor: http://localhost:8080
echo   Kapatmak icin bu pencereyi kapatabilirsiniz.
echo ========================================================
start "" "http://localhost:8080/index.html"
python -m http.server 8080
pause
