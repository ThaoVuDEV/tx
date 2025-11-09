/**
 * Script để tạo thêm bot accounts vào MongoDB
 * Chạy: node scripts/create_bot_accounts.js
 * Ví dụ: node scripts/create_bot_accounts.js 50
 * 
 * Sử dụng hàm regbot() từ app/Cron/taixiu/bot.js
 */

require('dotenv').config();
const mongoose = require('mongoose');

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tx88', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const helpers = require('../app/Helpers/Helpers');

// Import models
const User = require('../app/Models/Users');
const UserInfo = require('../app/Models/UserInfo');
const TaiXiu_User = require('../app/Models/TaiXiu_user');
const MiniPoker_User = require('../app/Models/miniPoker/miniPoker_users');
const Bigbabol_User = require('../app/Models/BigBabol/BigBabol_users');
const VQRed_User = require('../app/Models/VuongQuocRed/VuongQuocRed_users');
const DMAnhung_User = require('../app/Models/DongMauAnhhung/DongMauAnhhung_users');
const BauCua_User = require('../app/Models/BauCua/BauCua_user');
const Mini3Cay_User = require('../app/Models/Mini3Cay/Mini3Cay_user');
const CaoThap_User = require('../app/Models/CaoThap/CaoThap_user');
const AngryBirds_user = require('../app/Models/AngryBirds/AngryBirds_user');
const RongHo_user = require('../app/Models/RongHo/RongHo_user');
const Candy_user = require('../app/Models/Candy/Candy_user');
const Sexandzen_user = require('../app/Models/Sexandzen/Sexandzen_user');
const Daohaitac_user = require('../app/Models/Daohaitac/Daohaitac_user');
const LongLan_user = require('../app/Models/LongLan/LongLan_user');
const RoyAl_user = require('../app/Models/RoyAl/RoyAl_user');
const SieuXe_user = require('../app/Models/SieuXe/SieuXe_user');
const Zeus_user = require('../app/Models/Zeus/Zeus_user');
const Caoboi_user = require('../app/Models/Caoboi/Caoboi_user');
const XocXoc_user = require('../app/Models/XocXoc/XocXoc_user');
const MegaJP_user = require('../app/Models/MegaJP/MegaJP_user');
const TXBotChat = require('../app/Models/TaiXiu_bot_chat');

// Danh sách tên bot
const botNames = [
    'anhPhong','hoangTuan','minhDu','thanhLoc','quocVu','longCa','khoiNgau','phatCa','huyKool',
    'lamChanTinh','namPhien','minhSoai','phongLangTu','hieuRong','duongPhong','tanBadBoy','vuongDe',
    'kienNgau','hungKiet','namVip',
    'emMiu','cogaixinh','ngocMy','haAnh','linhChi','thaoNhi','myDuyen','trangCute','bongHong','emCam',
    'lanAnh','ngocThao','emSocola','myNa','thanhHa','beHeo','thaoMlem','anhThu','tiNa','meoCon',
    'tieuPhong','tieuLongNu','duongQua','coBang','trieuMan','hoangDung','voTan','lamTrieu','bachLang',
    'thienVuong','huyetAnh','phongKiem','docCo','thienSon','huyetNguyet','tamCa','docHanh','tieuDao',
    'huyenMinh','kiemHanh'
];

// ✅ REUSE HÀM TỪ bot.js
const botModule = require('../app/Cron/taixiu/bot');

// Hàm tạo bot account (gọi regbot() từ bot.js)
async function createBotAccount() {
    return new Promise((resolve) => {
        try {
            // Gọi hàm regbot() sẵn có trong bot.js
            botModule.regbot();
            
            // Delay để ensure account được tạo xong
            setTimeout(() => {
                resolve(true);
            }, 500);
        } catch (error) {
            console.log(`❌ Lỗi tạo bot: ${error.message}`);
            resolve(false);
        }
    });
}

// Hàm chính
async function main() {
    try {
        console.log('\n==============================================');
        console.log('   🤖 TẠO BOT ACCOUNTS - FAKE PLAYERS');
        console.log('==============================================\n');

        // Hỏi số lượng bot muốn tạo
        const numBots = parseInt(process.argv[2]) || 10;  // Mặc định 10

        console.log(`📝 Sắp tạo ${numBots} bot accounts...\n`);

        let createdCount = 0;
        let failCount = 0;

        // Tạo từng bot
        for (let i = 0; i < numBots; i++) {
            // Delay tí để MongoDB không quá tải
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const success = await createBotAccount();
            if (success) {
                createdCount++;
            } else {
                failCount++;
            }

            // Progress bar
            const progress = Math.round((i + 1) / numBots * 100);
            process.stdout.write(`\r⏳ Tiến độ: ${progress}% (${i + 1}/${numBots})`);
        }

        console.log('\n');

        // Kiểm tra tổng số bot trong database
        UserInfo.countDocuments({ type: true }, function(err, botCount) {
            console.log('\n==============================================');
            console.log('            📊 KẾT QUẢ');
            console.log('==============================================');
            console.log(`✅ Bot tạo thành công: ${createdCount}`);
            console.log(`❌ Bot tạo thất bại: ${failCount}`);
            console.log(`📊 Tổng cộng bot trong DB: ${botCount}`);
            console.log('==============================================\n');

            mongoose.connection.close();
            process.exit(0);
        });

    } catch (error) {
        console.error('❌ Lỗi:', error);
        mongoose.connection.close();
        process.exit(1);
    }
}

main();
