const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { google } = require('googleapis');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// File credentials JSON của dịch vụ Google (tải từ Google Cloud)
const CREDENTIALS = require('./credentials.json');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  SCOPES
);

const sheets = google.sheets({ version: 'v4', auth });

// ID file Google Sheet và tên sheet
const SPREADSHEET_ID = '1uBIrbIk_mF3bTKyPqy3VVqyJc8_zMnbDzQZLtU9qwk4';
const SHEET_NAME = 'ZaloUsers';

app.get('/', (req, res) => {
  res.send('Zalo Webhook đang hoạt động!');
});

app.get('/zalo-callback', async (req, res) => {
  const { code, state } = req.query;

  try {
    const app_id = '1038593225884871871';
    const app_secret = 'XYKVv18XaEntT89k3A83'; // ← Thay bằng App Secret thật

    // Lấy access token từ Zalo
    const tokenRes = await axios.post(
      'https://oauth.zalo.me/v4/access_token',
      {
        code,
        app_id,
        app_secret,
        grant_type: 'authorization_code'
      }
    );

    const { access_token } = tokenRes.data;

    // Lấy thông tin người dùng
    const userInfoRes = await axios.get('https://graph.zalo.me/v2.0/me?fields=id,name', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    const zalo_id = userInfoRes.data.id;
    const name = userInfoRes.data.name || '';

    // Ghi dữ liệu vào Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[new Date().toISOString(), zalo_id, name]]
      }
    });

    res.send('Lấy ID Zalo thành công. Bạn có thể đóng tab này!');
  } catch (error) {
    console.error('Lỗi callback:', error.response?.data || error.message);
    res.status(500).send('Có lỗi xảy ra khi xử lý callback.');
  }
});

app.listen(port, () => {
  console.log(`Zalo webhook đang chạy tại http://localhost:${port}`);
});
