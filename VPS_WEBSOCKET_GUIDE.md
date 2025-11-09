# 🎮 VPS WebSocket - Server-Side Setup Guide

## 📝 Giải thích

Bạn muốn **VPS tự khởi tạo và manage WebSocket connections**, không phụ thuộc vào client bên ngoài.

### Có nghĩa là:
- ✅ Server VPS sẽ **setup WebSocket server** và chờ client connect
- ✅ Khi có game update, server sẽ **push data tự động** đến tất cả clients
- ✅ Client không cần request, chỉ cần **receive data** từ server
- ✅ Server quản lý toàn bộ connection lifecycle

## 🚀 VPS Setup - Quick Start

### **1. SSH vào VPS**
```bash
ssh root@alexvudev.info
cd /path/to/project
git pull
npm install
```

### **2. Start Node.js Server**
```bash
# Option 1: Chạy trực tiếp (test)
npm start

# Option 2: Dùng PM2 (production)
npm install -g pm2
pm2 start server.js --name "redvip-server"
pm2 save
pm2 startup
```

### **3. Kiểm tra Server**
```bash
# Check logs
tail -f ~/.pm2/logs/redvip-server-out.log
tail -f ~/.pm2/logs/redvip-server-error.log

# Check WebSocket listening
netstat -tulpn | grep :2002
ps aux | grep node
```

### **4. Nginx Setup (nếu dùng reverse proxy)**
```bash
sudo cp nginx.conf /etc/nginx/sites-available/alexvudev.info
sudo sed -i 's|/path/to/ssl|/your/actual/path/ssl|g' /etc/nginx/sites-available/alexvudev.info
sudo nginx -t
sudo systemctl reload nginx
```

## 🔧 Configuration

### **server.js - WebSocket Server**
```javascript
// Server sẽ listen trên port 2002
// Chờ client connect từ: wss://alexvudev.info/client

let redT = expressWs.getWss();  // WebSocket server
global['redT'] = redT;           // Global reference
```

### **socketUsers.js - Client Handler**
```javascript
// Khi client connect:
// 1. Setup handlers (message, close, etc)
// 2. VPS bypass captcha - auto-accept
// 3. VPS push data khi game update
```

### **broadcast.js - Push Data**
```javascript
// Dùng để broadcast data đến tất cả clients
const broadcast = require('./app/Helpers/broadcast');

// Example: Push game update
broadcast.broadcast(redT, {
  gameUpdate: { /* data */ },
  timestamp: new Date()
});
```

## 📡 How It Works

### **Flow 1: Client Connect**
```
Client (Browser)
    |
    | wss://alexvudev.info/client
    ↓
Nginx (HTTPS Proxy)
    |
    | ws://localhost:2002/client
    ↓
Node.js Server
    |
    ├─ Receive connection
    ├─ Initialize WebSocket
    └─ Ready for messages
```

### **Flow 2: Game Update - Server Push**
```
Game Event (Cron Job)
    |
    ├─ Update database
    ├─ Broadcast via WebSocket
    |
    ↓ broadcast.broadcast(redT, data)
    |
Tất cả connected clients nhận data
    |
    ├─ Client 1: Update UI
    ├─ Client 2: Update UI
    └─ Client N: Update UI
```

## 💾 WebSocket Data Flow

### **Client → Server (Message)**
```javascript
// Client gửi
client.send({
  authentication: { username, password, register: true },
  // hoặc
  giftcode: { code, captcha },
  // hoặc
  // other actions...
})

// Server receive
ws.on('message', function(message) {
  message = JSON.parse(message);
  // Handle message
})
```

### **Server → Client (Push/Broadcast)**
```javascript
// Server push
broadcast.broadcast(redT, {
  gameUpdate: {
    type: 'taixiu_result',
    result: 'tai',
    amount: 1000
  }
})

// Client receive
socket.onmessage = function(event) {
  let data = JSON.parse(event.data);
  // Handle data
}
```

## 🎯 Common Use Cases

### **Case 1: Real-time Game Result**
```javascript
// Khi Tài Xỉu game kết thúc
broadcast.broadcast(redT, {
  taixiu: {
    result: 'tai',
    red_tai: 1000,
    red_xiu: 500,
    timestamp: new Date()
  }
});
```

### **Case 2: User Notification**
```javascript
// Khi user đủ điều kiện nhận thưởng
broadcast.broadcast(redT, {
  notice: {
    title: 'THƯỞNG',
    text: 'Bạn được thưởng 1000 XU'
  }
});
```

### **Case 3: Send to Specific User**
```javascript
const broadcast = require('./app/Helpers/broadcast');

// Gửi cho user cụ thể
if (redT.users[userId]) {
  redT.users[userId].forEach(client => {
    broadcast.sendToClient(client, {
      notification: 'Your personal message'
    });
  });
}
```

## 🧪 Testing

### **Test 1: WebSocket Connection**
```javascript
// Browser Console
new WebSocket('wss://alexvudev.info/client')
  .addEventListener('open', () => console.log('✅ Connected!'));
  .addEventListener('message', (e) => console.log('📨', e.data));
```

### **Test 2: Server Logs**
```bash
pm2 logs redvip-server
# Bạn sẽ thấy logs như:
# ✅ Client connected via WebSocket
# 📝 Generated captcha for signUp: xxx
# ✅ User authenticated
```

### **Test 3: Network Check**
```bash
# Check WebSocket connections
lsof -i :2002 | grep LISTEN

# Check Nginx connections
curl -I https://alexvudev.info/
```

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| WebSocket timeout | Check server logs: `pm2 logs` |
| Connection refused | Firewall blocks port 2002: `sudo ufw allow 2002` |
| Nginx proxy error | Check `/var/log/nginx/error.log` |
| Captcha not showing | Browser console error - check client code |
| No data received | Check server push - use broadcast.js |

## 📊 Monitoring

### **Real-time Monitoring**
```bash
# Monitor all processes
pm2 monit

# Monitor specific app
pm2 logs redvip-server --lines 100

# See live events
pm2 web   # Access at http://localhost:9615
```

### **Check Connected Clients**
```bash
# From Node.js REPL
node
> const broadcast = require('./app/Helpers/broadcast');
> // Count clients
> redT.clients.size   // Number of connected clients
```

## 🔐 Security

1. **Enable firewall**
   ```bash
   sudo ufw enable
   sudo ufw allow 22,80,443,2002/tcp
   ```

2. **SSL/TLS**
   ```bash
   # Already configured in nginx.conf
   # wss:// uses TLS for WebSocket Secure
   ```

3. **Rate limiting** (Optional)
   ```bash
   # In nginx.conf
   limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
   ```

## 📈 Performance Tips

1. **Use connection pooling** for database
2. **Broadcast wisely** - don't spam clients
3. **Monitor memory** - WebSocket keeps connections open
4. **Use PM2 cluster mode** for scaling

## 🚀 Production Checklist

- [ ] Node.js running on VPS
- [ ] PM2 configured and auto-start enabled
- [ ] Nginx reverse proxy setup
- [ ] SSL certificates valid
- [ ] MongoDB running
- [ ] Firewall configured
- [ ] Logs monitored
- [ ] Backup strategy in place
- [ ] Auto-restart on crash
- [ ] Performance monitoring enabled

## 📞 Support Commands

```bash
# Restart service
pm2 restart redvip-server

# Stop service
pm2 stop redvip-server

# Delete service
pm2 delete redvip-server

# View all PM2 services
pm2 list

# Save PM2 state
pm2 save

# Restore PM2 state
pm2 resurrect

# Kill all PM2 services
pm2 kill
```

---

**Status:** ✅ Server-side WebSocket Ready
**Last Updated:** November 9, 2025
