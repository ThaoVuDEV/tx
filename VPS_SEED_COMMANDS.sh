#!/bin/bash
# ============================================
# 🤖 HƯỚNG DẪN CHẠY BOT CHAT SEED TRÊN VPS
# ============================================
# Sao chép từng lệnh dưới đây và chạy lần lượt

# BƯỚC 1: Vào thư mục project
cd /path/to/tx88
# Ví dụ: cd /home/ubuntu/tx88

# BƯỚC 2: Kiểm tra git đã cập nhật chưa
git status
# Kết quả mong đợi: working tree clean (không có file mới)

# Nếu chưa có scripts/seed_bot_chat.js, chạy:
git pull origin main
# Lệnh này sẽ kéo file seed_bot_chat.js từ GitHub

# BƯỚC 3: Kiểm tra file seed_bot_chat.js tồn tại
ls -la scripts/seed_bot_chat.js

# BƯỚC 4: Kiểm tra .env có MONGODB_URI
cat .env | grep MONGODB_URI

# BƯỚC 5: Chạy script seed
node scripts/seed_bot_chat.js

# Kết quả mong đợi:
# ✅ Đã thêm 70 tin nhắn bot chat
# 📊 Tổng cộng: XXX tin nhắn trong database

# BƯỚC 6: Restart server Node.js
pm2 restart all
# hoặc
pm2 restart app

# BƯỚC 7: Kiểm tra logs
pm2 logs app

# ============================================
# NẾUỠI LỖILỒI LỗiLỗi
# ============================================

# Nếu lỗi "Cannot find module 'dotenv'"
npm install

# Nếu lỗi MongoDB connection
# Kiểm tra MongoDB đang chạy
mongosh --eval "db.adminCommand('ping')"

# Kiểm tra số lượng chat messages trong DB
mongosh << EOF
use tx88
db.taixiu_bot_chats.countDocuments()
EOF

# Xem sample messages
mongosh << EOF
use tx88
db.taixiu_bot_chats.find({}).limit(5)
EOF
