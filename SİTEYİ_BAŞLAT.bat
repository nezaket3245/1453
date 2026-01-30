@echo off
TITLE Akcapen PVC - Yerel Sunucu
echo ==========================================
echo    AKCAPEN PVC SISTEMI BASLATILIYOR
echo ==========================================
echo.
echo Tarayici aciliyor: http://localhost:3000
echo.
start http://localhost:3000
echo Sunucu kuruluyor, lutfen bekleyin...
npm run dev
pause
