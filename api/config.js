export default function handler(req, res) {
  res.status(200).json({ naverMapClientId: process.env.NAVER_MAP_CLIENT_ID || '' });
}
