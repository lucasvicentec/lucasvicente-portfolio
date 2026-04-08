@echo off
echo.
echo  ========================================
echo   Interview Academy - Servidor Local
echo  ========================================
echo.
echo  Abriendo en http://localhost:3000 ...
echo  Pulsa Ctrl+C para cerrar
echo.
cd /d "%~dp0"
"C:\Program Files\nodejs\npx.cmd" serve . -l 3000 --no-clipboard -s
pause
