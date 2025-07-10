const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Route xác minh miền với Zalo
app.get('/zalo-webhook', (req, res) => {
  const echo = req.query["hub.challenge"];
  if (echo) {
    res.status(200).send(echo);
  } else {
    res.status(400).send("Missing hub.challenge");
  }
});

// Route nhận sự kiện từ Zalo
app.post('/zalo-webhook', (req, res) => {
  console.log('Nhận sự kiện Zalo:', JSON.stringify(req.body));
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Zalo Webhook server đang chạy tại cổng ${port}`);
});
