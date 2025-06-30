const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// ✅ Lấy App ID và Secret từ biến môi trường
const APP_ID = process.env.APP_ID;
const APP_SECRET = process.env.APP_SECRET;

// ⚠️ Đừng thay đổi redirect URI này trừ khi bạn đổi đường dẫn Render
const REDIRECT_URI = 'https://zalo-webhook-1.onrender.com/callback';
// Trang chính
app.get('/', (req, res) => {
  res.send('Zalo Webhook đang hoạt động. Truy cập /auth để lấy token.');
});

// Bắt đầu xác thực OAuth
app.get('/auth', (req, res) => {
  const authUrl = `https://oauth.zalo.me/auth?app_id=${APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=abc&scope=oa.send.update`;
  res.redirect(authUrl);
});

// Nhận mã code từ Zalo và lấy access_token + refresh_token
app.get('/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.send('❌ Không nhận được mã xác thực (code) từ Zalo');

  try {
    const tokenRes = await axios.post(`https://oauth.zalo.me/v4/oa/access_token`, {
      code: code,
      app_id: APP_ID,
      app_secret: APP_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
    });

    res.send(`
      <h2>✅ Token nhận được:</h2>
      <pre>${JSON.stringify(tokenRes.data, null, 2)}</pre>
      <p>Bạn hãy copy <code>access_token</code> và <code>refresh_token</code> để dùng trong Google Sheets hoặc gửi tin nhắn.</p>
    `);
  } catch (err) {
    console.error(err.response?.data || err);
    res.send('❌ Lỗi khi gọi API lấy token. Vui lòng kiểm tra lại APP_ID, APP_SECRET hoặc quyền truy cập.');
  }
});
const path = require('path');
app.get('/zalo_verifierHlgC59djA1PJmPmMkhumINEOWdEVxbGbDJCn.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'zalo_verifierHlgC59djA1PJmPmMkhumINEOWdEVxbGbDJCn.html'));
});

app.listen(port, () => {
  console.log(`🚀 App chạy tại http://localhost:${port}`);
});
