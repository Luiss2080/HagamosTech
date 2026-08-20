@echo off
chcp 65001 >nul
echo ==========================================
echo   LOS CASTORES - INICIAR DESARROLLO LOCAL
echo ==========================================
echo.

REM --- Detectar ruta del proyecto (sube un nivel desde scripts\) ---
set "PROJECT_DIR=%~dp0.."
cd /d "%PROJECT_DIR%"

REM --- Verificar Node.js ---
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js no esta instalado o no esta en el PATH
    pause
    exit /b 1
)

REM --- Verificar MySQL ---
mysql -u root -e "SELECT 1" >nul 2>&1
if errorlevel 1 (
    echo [ERROR] MySQL no esta corriendo. Inicia Laragon primero.
    pause
    exit /b 1
)

echo [OK] Node.js detectado
echo [OK] MySQL detectado
echo.

REM --- Iniciar Backend Node.js ---
echo [1/2] Iniciando API Node.js (puerto 3000)...
start "Los Castores API" cmd /k "cd /d "%PROJECT_DIR%\server" && npm run dev"

timeout /t 3 /nobreak >nul

REM --- Iniciar Frontend Vite ---
echo [2/2] Iniciando Frontend Vite (puerto 4001)...
start "Los Castores Web" cmd /k "cd /d "%PROJECT_DIR%" && npm run dev"

echo.
echo ==========================================
echo   APLICACIONES INICIADAS
echo ==========================================
echo.
echo Frontend:  http://localhost:4001
echo Backend:   http://localhost:3000
echo API:       http://localhost:3000/api
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause >nul
