@echo off
echo Clearing Next.js cache and restarting server...
echo.

REM Stop any running dev server (if running)
echo Step 1: Stopping dev server...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

REM Delete .next folder (Next.js cache)
echo Step 2: Deleting .next cache folder...
if exist .next (
    rmdir /s /q .next
    echo .next folder deleted
) else (
    echo .next folder not found
)

REM Delete public image cache in .next (if it exists)
echo Step 3: Cache cleared!
echo.

echo Step 4: Starting dev server...
echo Please run: npm run dev
echo.
echo After the server starts, do a hard refresh in your browser:
echo Press Ctrl + Shift + R (or Ctrl + F5)
echo.
pause
