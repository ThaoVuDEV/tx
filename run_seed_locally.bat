@echo off
REM Chạy script seed bot chat messages trên máy local
REM Đảm bảo MongoDB đang chạy trước khi chạy script này

echo.
echo ========================================
echo  Bot Chat Messages Seeder
echo ========================================
echo.

REM Kiểm tra xem file tồn tại không
if not exist "scripts\seed_bot_chat.js" (
    echo [ERROR] Không tìm thấy file scripts\seed_bot_chat.js
    exit /b 1
)

REM Chạy script seed
echo [INFO] Đang chạy seed script...
echo.
node scripts\seed_bot_chat.js

if %errorlevel% equ 0 (
    echo.
    echo [SUCCESS] ✅ Seed hoàn tất!
    echo.
) else (
    echo.
    echo [ERROR] ❌ Seed thất bại!
    echo.
    exit /b 1
)

pause
