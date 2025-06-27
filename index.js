const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 10000;

// Route xác minh Zalo
app.get('/zalo_verifierHlgC59djA1PJmPmMkhumINEOWdEVxbGbDJCn.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'zalo_verifierHlgC59djA1PJmPmMkhumINEOWdEVxbGbDJCn.html'));
});

// Route mặc định
app.get('/', (req, res) => {
  res.send('Webhook is running!');
});

app.listen(port, () => {
  console.log(`Webhook chạy trên cổng ${port}`);
});
