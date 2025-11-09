#!/bin/bash
# ============================================
# 🤖 SCRIPT MASTER - THÊM BOT VÀO GAME
# ============================================
# Chạy: bash run_all_bot_setup.sh
# hoặc: bash run_all_bot_setup.sh 50  (tạo 50 bot)

echo ""
echo "╔════════════════════════════════════════╗"
echo "║    🤖 BOT SETUP - MASTER SCRIPT       ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Số lượng bot (mặc định 10, hoặc lấy từ argument)
NUM_BOTS=${1:-10}

echo "📝 Cấu hình:"
echo "  • Số lượng bot sẽ tạo: $NUM_BOTS"
echo "  • Bot chat messages: 70+"
echo "  • Bot participation: 100%"
echo ""

# BƯỚC 1: Thêm bot chat messages
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "BƯỚC 1️⃣: Thêm tin nhắn chat cho bot"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
node scripts/seed_bot_chat.js
CHAT_RESULT=$?

if [ $CHAT_RESULT -ne 0 ]; then
    echo ""
    echo "❌ Lỗi khi thêm bot chat messages!"
    exit 1
fi

echo ""

# BƯỚC 2: Tạo bot accounts
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "BƯỚC 2️⃣: Tạo $NUM_BOTS bot accounts"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
node scripts/create_bot_accounts.js $NUM_BOTS
BOT_RESULT=$?

if [ $BOT_RESULT -ne 0 ]; then
    echo ""
    echo "❌ Lỗi khi tạo bot accounts!"
    exit 1
fi

echo ""

# BƯỚC 3: Restart server
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "BƯỚC 3️⃣: Restart server Node.js"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
pm2 restart all
sleep 3
pm2 status

echo ""
echo "╔════════════════════════════════════════╗"
echo "║   ✅ HOÀN TẤT - BOT ĐÃ SẴN SÀNG      ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "📊 KIỂM TRA:"
echo "  • Vào game Tài Xỉu để thấy bot chơi"
echo "  • Bot chat mỗi 10-28 giây"
echo "  • Bots: 100% trong phòng"
echo ""
echo "📋 LOGS:"
echo "  pm2 logs app"
echo ""
