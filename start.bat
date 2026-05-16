@echo off
echo ==========================================
echo   CC Analyser - MERN Stack Setup
echo ==========================================
echo.
echo Step 1: Installing dependencies...
call npm run install-all
echo.
echo Step 2: Starting development server...
echo Backend  → http://localhost:5000
echo Frontend → http://localhost:3000
echo.
echo Make sure MongoDB is running!
echo.
call npm run dev
pause
