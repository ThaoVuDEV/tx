// WebSocket Broadcast Helper - Server sẽ push data đến tất cả clients
module.exports = {
  // Broadcast message to all connected clients
  broadcast: function(redT, data) {
    if (!redT || !redT.clients) {
      console.log('⚠️  No WebSocket server or clients');
      return;
    }
    
    redT.clients.forEach(function(client) {
      if (client.readyState === 1) { // 1 = OPEN
        try {
          client.send(JSON.stringify(data));
        } catch (err) {
          console.error('Error sending to client:', err.message);
        }
      }
    });
  },

  // Send message to specific client
  sendToClient: function(client, data) {
    if (client && client.readyState === 1) {
      try {
        client.send(JSON.stringify(data));
      } catch (err) {
        console.error('Error sending message:', err.message);
      }
    }
  },

  // Get all connected clients count
  getClientCount: function(redT) {
    return redT && redT.clients ? redT.clients.size : 0;
  },

  // Get all connected clients
  getClients: function(redT) {
    return redT && redT.clients ? Array.from(redT.clients) : [];
  }
};
