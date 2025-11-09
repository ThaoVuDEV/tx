# 🤖 Bot Chat & Count Deployment Guide

## What's Changed

### 1. **Added 70+ Bot Chat Messages**
   - Location: `scripts/seed_bot_chat.js`
   - Messages include natural Vietnamese conversational phrases
   - Categories: luck/fortune, emojis, humor, strategy, encouragement
   
### 2. **Increased Bot Count**
   - Location: `app/Cron/taixiu.js` line 592
   - Changed from: `let maxBot = (botList.length*90/100)>>0;`
   - Changed to: `let maxBot = (botList.length*100/100)>>0;`
   - Effect: **All bots will now participate** in Tài Xỉu games (100% instead of 90%)

---

## 📋 Deployment Steps

### Step 1: Push Code Changes to Git
```bash
cd c:\Users\ThaoDev\Downloads\svgo88

git add scripts/seed_bot_chat.js app/Cron/taixiu.js

git commit -m "Add 70+ bot chat messages and increase bot count to 100%"

git push origin main
```

### Step 2: SSH to VPS and Pull Changes
```bash
ssh root@alexvudev.info

cd /path/to/tx88

git pull origin main
```

### Step 3: Seed Bot Chat Messages (Insert into MongoDB)
```bash
# Make sure you're in the project root directory
cd /path/to/tx88

# Run the seed script
node scripts/seed_bot_chat.js

# Expected output:
# ✅ Đã thêm 70 tin nhắn bot chat
# 📊 Tổng cộng: XXX tin nhắn trong database
```

### Step 4: Restart Node.js Server
```bash
# Using PM2 (recommended)
pm2 restart all

# Or restart specific app
pm2 restart app

# Check status
pm2 status
```

### Step 5: Verify Changes

Test in the Tài Xỉu game and confirm:
- ✅ **More bots visible** in the game (100% now vs 90% before)
- ✅ **New bot chat messages** appear every 10-28 seconds
- ✅ **Bot messages are diverse** with Vietnamese phrases and emojis
- ✅ **No 502 errors** or connection issues

---

## 🔍 Verification Queries (MongoDB)

```javascript
// Check total bot chat messages
db.taixiu_bot_chats.countDocuments()

// View sample chat messages
db.taixiu_bot_chats.find({}).limit(5)

// View specific message
db.taixiu_bot_chats.findOne({'Content': {$regex: 'tài hoai'}})

// Count active bot accounts
db.userinfoschemas.countDocuments({type: true})
```

---

## 📊 Expected Results

| Metric | Before | After |
|--------|--------|-------|
| Bot Chat Messages | Few/basic | 70+ diverse Vietnamese messages |
| Bot Participation % | 90% | 100% |
| Bots Playing Simultaneously | ~10-20 | All available bots |
| Chat Message Variety | Low | High (luck, humor, strategy) |

---

## ⚡ Quick Rollback (If Needed)

If you need to revert changes:
```bash
# Revert last commit
git revert HEAD

# Or reset to previous version
git reset --hard HEAD~1

# Restart server
pm2 restart all
```

---

## 🚨 Troubleshooting

### Seed Script Fails
```bash
# Check MongoDB connection
mongosh mongodb://localhost:27017/tx88

# Verify .env has correct MONGODB_URI
cat .env | grep MONGODB_URI

# Run seed script with debug info
DEBUG=* node scripts/seed_bot_chat.js
```

### Bot Messages Not Appearing
```bash
# Check if messages were inserted
db.taixiu_bot_chats.countDocuments()

# Verify botListChat is populated
# Check server logs for errors
pm2 logs app
```

### Bots Not Increasing
```bash
# Verify maxBot calculation
# Check taixiu.js line 592 is set to 100
grep "maxBot = " app/Cron/taixiu.js

# Verify bot accounts exist
db.userinfoschemas.countDocuments({type: true})
```

---

## 💡 Tips

- **Monitor logs**: `pm2 logs app` to see real-time game events
- **Check bot activity**: Monitor chat frequency and diversity in-game
- **Database backup**: Always backup before running seed scripts
- **Test staging first**: Test on a staging environment before production

---

## 📞 Support

If issues arise after deployment:
1. Check PM2 logs: `pm2 logs`
2. Check MongoDB connection: `mongosh`
3. Verify git pull succeeded: `git log --oneline -5`
4. Restart server: `pm2 restart all`
