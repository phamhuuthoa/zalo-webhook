const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// Cho phép truy cập file tĩnh (bao gồm file xác minh HTML)
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.send('Webhook đang chạy...');
});

app.listen(PORT, () => {
  console.log(`Webhook chạy trên cổng ${PORT}`);
});
