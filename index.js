const express = require('express');
const path = require('path');  // ✅ Thêm dòng này
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));  // ✅ Thêm dòng này để phục vụ file HTML tĩnh

// Đáp ứng cả POST / và POST /webhook
app.post('/', (req, res) => {
  console.log('Nhận POST / từ Zalo:', req.body);
  res.status(200).send('OK');
});

app.post('/webhook', (req, res) => {
  console.log('Nhận POST /webhook từ Zalo:', req.body);
  res.status(200).send('OK');
});

// 👉 Route xác nhận redirect
app.get('/blank.html', (req, res) => {
  res.status(200).send('OK - Redirect thành công từ Zalo');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Webhook chạy trên cổng ${PORT}`);
});
