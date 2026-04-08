@echo off
echo.
echo  ========================================
echo   Interview Academy - React
echo  ========================================
echo.
echo  Abriendo en http://localhost:5173 ...
echo  Pulsa Ctrl+C para cerrar
echo.
cd /d "%~dp0"
set PATH=%PATH%;C:\Program Files\nodejs
npm run dev
pause
