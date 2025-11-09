/**
 * Script để thêm tin nhắn chat bot vào MongoDB
 * Chạy: node scripts/seed_bot_chat.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const TXBotChat = require('../app/Models/TaiXiu_bot_chat');

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tx88', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const botChatMessages = [
  // Khi thắng
  'Trúng mẹ nó rồi',
  'Tài nổ rồi anh em ơi',
  'Xỉu ăn kìa, dễ vãi chưởng',
  'Đỉnh cao nhân phẩm',
  'Gọi tôi là Thần Tài đi',
  'Lại ăn nữa rồi',
  'Tôi bảo rồi mà, nghe tôi là win',
  'Không tin nhân phẩm tôi à',
  'Tài lên, ví dày thêm',

  // Khi thua
  'Thôi xong, bay mẹ nó vốn',
  'Cay thật sự luôn đó',
  'Toang thật rồi anh em ơi',
  'Đm nó lừa tao à',
  'Thôi nghỉ 5p cho đỡ sốc',
  'Xỉu hoài muốn khóc luôn',
  'Lại đen như chó',
  'Thua mà vẫn đẹp trai',
  'Cược vui thôi chứ thua nhiều quá',

  // Khi all in / liều
  'All in mẹ luôn',
  'Không all in sao biết ai may',
  'Một mất một còn',
  'Đánh ván này xong đi ngủ',
  'Liều ăn nhiều, sợ gì',
  'Lần này mà thắng thì làm giàu luôn',
  'Cảm giác thần tài đang gọi tên tôi',

  // Khi chọc người khác
  'Ai vừa thua kia kìa',
  'Làm ơn đừng khóc nha',
  'Đánh thế này thì sao thắng nổi',
  'May như tôi mới là đẳng cấp',
  'Đừng nhìn tôi nữa, tôi đỏ thật',
  'Anh em bên tài vui chưa kìa',
  'Xỉu gãy gọng luôn',

  // Bình luận kiểu game chat
  'Tài xỉu nó phải có phong cách',
  'Đánh theo cảm giác là win',
  'Linh tính bảo tôi đặt xỉu',
  'Nhân phẩm +10 rồi',
  'Nghe tôi nè, lần này chắc chắn tài',
  'Mấy ván sau mới thật sự căng đó',
  'Ai đang đỏ thì cứ chơi tiếp đi',
  'Phải bình tĩnh mới win được',

  // Khi phấn khích
  'Ui mẹ ơi căng thế',
  'Thắng cái là thấy yêu đời liền',
  'Không khí nóng quá anh em ơi',
  'Thề luôn tim đập nhanh vl',
  'Đánh xong toát mồ hôi tay',
  'Bốc đầu rồi anh em ơi',
  'Công nhận game này cuốn thật',

  // Cay cú - tấu hài
  'Cái đm game lừa vãi',
  'Bịp như này sao chơi',
  'Tao mà thua nữa là nghỉ',
  'May như cc, toàn xỉu',
  'Thôi xong, nhân phẩm đi du lịch rồi',
  'Ai buff đỏ vậy trời',
  'Thần tài chỉ nhìn người khác thôi à',

  // Xin lộc - cầu may - về bờ
  'Thần tài ơi cứu con với',
  'Xin tí lộc đầu năm đi nào',
  'Ai share lộc với tôi cái',
  'Cho tôi về bờ đi ông trời ơi',
  'Cầu nhân phẩm quay lại',
  'Tôi chỉ xin một ván về bờ thôi',
  'Thả tim cầu đỏ lại',
  'Khấn nhẹ cái cho ra tài nào',
  'Cầu thần tài gõ cửa nhà tôi',
  'Ai đang đỏ cho tôi ké lộc với',
  'Xin tí đỏ đi, đen quá rồi',
  'Mở hàng cái nhẹ cho vui đi',
  'Về bờ là mời tất cả cà phê',
  'Trời ơi cho trúng đi con xin luôn',
  'Một ván thôi cũng được, cho đỡ khổ',
  'Thả câu cầu lộc may đây',
  'Hôm nay tôi chỉ cần về bờ là được',
  'Cầu nguyện nhân phẩm quay lại',
  'Xin thần tài phù hộ độ trì',
  'Đen quá rồi, xin ơn trên thương con'
];


async function seedBotChat() {
    try {
        // Xóa tất cả chat cũ (tuỳ chọn, bỏ dòng này nếu muốn giữ)
        // await TXBotChat.deleteMany({});
        
        // Chèn tin nhắn mới
        await TXBotChat.insertMany(
            botChatMessages.map(msg => ({ Content: msg }))
        );
        
        console.log(`✅ Đã thêm ${botChatMessages.length} tin nhắn bot chat`);
        
        // Kiểm tra tổng số
        const total = await TXBotChat.countDocuments();
        console.log(`📊 Tổng cộng: ${total} tin nhắn trong database`);
        
        mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ Lỗi:', error);
        mongoose.connection.close();
        process.exit(1);
    }
}

seedBotChat();
