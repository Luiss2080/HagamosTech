@echo off
chcp 65001 >nul
echo ==========================================
echo   LOS CASTORES - BUILD PARA PRODUCCION
echo ==========================================
echo.

REM --- Detectar ruta del proyecto ---
set "PROJECT_DIR=%~dp0.."
cd /d "%PROJECT_DIR%"

REM --- Verificar Node.js ---
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js no esta instalado
    pause
    exit /b 1
)

echo [1/3] Instalando dependencias...
call npm install
if errorlevel 1 (
    echo [ERROR] Fallo npm install
    pause
    exit /b 1
)

echo [2/3] Haciendo build para produccion...
REM Vite usa automaticamente .env.production para el build
call npm run build
if errorlevel 1 (
    echo [ERROR] Fallo el build
    pause
    exit /b 1
)

echo [3/3] Build completado exitosamente.
echo.
echo Archivos generados en: .\dist\
echo.
pause
