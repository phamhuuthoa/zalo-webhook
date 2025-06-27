const express = require('express');
const app = express();

app.use(express.json());

// Đáp ứng cả POST / và POST /webhook
app.post('/', (req, res) => {
  console.log('Nhận POST / từ Zalo:', req.body);
  res.status(200).send('OK');
});

app.post('/webhook', (req, res) => {
  console.log('Nhận POST /webhook từ Zalo:', req.body);
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Webhook chạy trên cổng ${PORT}`);
});
