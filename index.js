const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("Zalo Webhook đang hoạt động.");
});

app.post('/webhook', async (req, res) => {
  console.log('Webhook nhận dữ liệu:', JSON.stringify(req.body));

  const senderId = req.body?.sender?.id;
  if (senderId) {
    await appendUserToSheet(senderId);
  }

  res.sendStatus(200);
});

async function appendUserToSheet(userId) {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const spreadsheetId = '1Qz-pMGvYnAkV6zk8hk-pT_L1VI6Cmuyvxfa-_ZBI56I'; // ← Thay bằng ID Google Sheet
  const range = 'ZaloUsers!A:A';

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [[userId]] },
  });
}

app.listen(port, () => console.log(`Webhook chạy trên cổng ${port}`));
