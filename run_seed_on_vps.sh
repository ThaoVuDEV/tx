#!/bin/bash
# Script để chạy seed bot chat trên VPS
# Cách sử dụng: bash run_seed_on_vps.sh

echo ""
echo "========================================"
echo " 🤖 Bot Chat Messages Seeder (VPS)"
echo "========================================"
echo ""

# Định nghĩa thư mục project
PROJECT_DIR="/path/to/tx88"  # Thay bằng đường dẫn thực tế

# Kiểm tra thư mục tồn tại
if [ ! -d "$PROJECT_DIR" ]; then
    echo "[ERROR] Thư mục $PROJECT_DIR không tồn tại!"
    echo "Vui lòng sửa PROJECT_DIR trong script"
    exit 1
fi

# Chuyển vào thư mục project
cd "$PROJECT_DIR"

echo "[INFO] Đang vào thư mục: $PROJECT_DIR"
echo ""

# Kiểm tra file seed script tồn tại
if [ ! -f "scripts/seed_bot_chat.js" ]; then
    echo "[ERROR] Không tìm thấy file scripts/seed_bot_chat.js"
    exit 1
fi

echo "[INFO] Đang chạy seed script..."
echo ""

# Chạy seed script
node scripts/seed_bot_chat.js

# Kiểm tra kết quả
if [ $? -eq 0 ]; then
    echo ""
    echo "[SUCCESS] ✅ Seed hoàn tất!"
    echo ""
    echo "📊 Kiểm tra kết quả:"
    echo "mongosh mongodb://localhost:27017/tx88"
    echo "> db.taixiu_bot_chats.countDocuments()"
    echo ""
else
    echo ""
    echo "[ERROR] ❌ Seed thất bại!"
    echo ""
    exit 1
fi
