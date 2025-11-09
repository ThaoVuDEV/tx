# 🤖 HƯỚNG DẪN THÊM BOT CHAT & TẠO BOT ACCOUNTS

## 📝 Có 2 cách thêm bot vào database:

### ✅ **CÁCH 1: Chạy riêng lẻ (Nếu muốn kiểm soát từng bước)**

#### Bước 1: Thêm bot chat messages
```bash
node scripts/seed_bot_chat.js
```
**Kết quả:** Thêm 70+ tin nhắn chat vào collection `taixiu_bot_chats`

#### Bước 2: Tạo bot accounts (fake players)
```bash
# Tạo 10 bot (mặc định)
node scripts/create_bot_accounts.js

# Hoặc tạo nhiều hơn (ví dụ 50 bot)
node scripts/create_bot_accounts.js 50
```
**Kết quả:** Tạo bot mới với tên "anhPhong1234", "emMiu5678", etc.

#### Bước 3: Restart server
```bash
pm2 restart all
```

---

### ⚡ **CÁCH 2: Chạy toàn bộ cùng lúc (Khuyến nghị)**

Một lệnh duy nhất để:
1. ✅ Thêm bot chat messages
2. ✅ Tạo bot accounts
3. ✅ Restart server Node.js

```bash
# Chạy master script với 10 bot (mặc định)
bash run_all_bot_setup.sh

# Hoặc tạo 50 bot
bash run_all_bot_setup.sh 50

# Hoặc tạo 100 bot
bash run_all_bot_setup.sh 100
```

---

## 🔍 Kiểm tra kết quả

### 1. Kiểm tra bot chat messages
```bash
mongosh
use tx88
db.taixiu_bot_chats.countDocuments()
# Output: Số lượng tin nhắn chat
```

### 2. Kiểm tra số lượng bot accounts
```bash
mongosh
use tx88
db.userinfoschemas.countDocuments({type: true})
# Output: Số lượng bot (type: true = bot)
```

### 3. Xem 1 vài bot accounts
```bash
db.userinfoschemas.find({type: true}).limit(5)
```

### 4. Xem sample bot chat messages
```bash
db.taixiu_bot_chats.find({}).limit(3)
```

---

## 📋 Chỉ số kỳ vọng sau khi hoàn tất

| Chỉ số | Giá trị |
|--------|--------|
| Bot chat messages | 70+ |
| Bot accounts | 10+ hoặc tuỳ chỉ |
| Bot participation % | 100% |
| Bot chat frequency | Mỗi 10-28 giây |

---

## 🚀 VPS Deployment

Khi bạn SSH vào VPS:

```bash
cd /path/to/tx88

# Cập nhật code từ git
git pull origin main

# Chạy master setup script (tạo 50 bot)
bash run_all_bot_setup.sh 50

# Hoặc chạy riêng lẻ
node scripts/seed_bot_chat.js
node scripts/create_bot_accounts.js 50
pm2 restart all
```

---

## 🔧 Script Files

| File | Chức năng |
|------|---------|
| `scripts/seed_bot_chat.js` | Thêm 70+ bot chat messages |
| `scripts/create_bot_accounts.js` | Tạo bot accounts (dùng hàm regbot() sẵn có) |
| `run_all_bot_setup.sh` | Master script - chạy cả 2 + restart |
| `app/Cron/taixiu/bot.js` | Hàm `regbot()` gốc (được reuse) |

---

## 💡 Lưu ý

✅ Script `create_bot_accounts.js` **REUSE** hàm `regbot()` từ `app/Cron/taixiu/bot.js`  
✅ Không cần viết code tạo bot mới, gọi hàm sẵn có  
✅ Bot names tự động sinh theo danh sách botNames[]  
✅ Delay 100ms giữa mỗi bot để tránh MongoDB quá tải  

---

## ❌ Troubleshooting

**Lỗi:** Cannot find module
```bash
npm install
```

**Lỗi:** MongoDB connection failed
```bash
# Kiểm tra MongoDB đang chạy
systemctl status mongod

# Hoặc kiểm tra kết nối
mongosh mongodb://localhost:27017/tx88
```

**Lỗi:** pm2 not found
```bash
npm install -g pm2
```
