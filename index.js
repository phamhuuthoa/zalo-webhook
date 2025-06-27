const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

// ✅ Route root để xác nhận webhook (Zalo gọi POST tới "/")
app.post('/', (req, res) => {
  console.log('✅ Nhận xác minh webhook từ Zalo:', req.body);
  res.sendStatus(200);  // Trả về 200 OK để Zalo xác nhận
});

// 📌 (Tuỳ chọn) Route GET để kiểm tra hoạt động
app.get('/', (req, res) => {
  res.send('Zalo Webhook is running.');
});

app.listen(PORT, () => {
  console.log(`Webhook server đang chạy tại cổng ${PORT}`);
});
