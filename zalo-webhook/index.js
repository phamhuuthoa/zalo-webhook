const express = require('express');
const path = require('path');
const app = express();

// ✅ Phục vụ các file tĩnh (như file HTML xác thực) từ thư mục gốc
app.use(express.static(path.join(__dirname)));

app.use(express.json());

// Nhận dữ liệu từ Zalo webhook
app.post('/', (req, res) => {
  console.log('POST /:', req.body);
  res.status(200).send('OK');
});

app.post('/webhook', (req, res) => {
  console.log('POST /webhook:', req.body);
  res.status(200).send('OK');
});

// Test redirect
app.get('/blank.html', (req, res) => {
  res.status(200).send('OK - Redirect thành công từ Zalo');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Webhook đang chạy trên cổng ${PORT}`);
});
