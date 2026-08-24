export default async function handler(req, res) {
  const { start, goal } = req.query || {};
  if (!start || !goal) return res.status(400).json({ error: '출발지와 목적지가 필요합니다.' });
  const id = process.env.NAVER_MAP_CLIENT_ID;
  const secret = process.env.NAVER_MAP_CLIENT_SECRET;
  if (!id || !secret) return res.status(503).json({ error: 'Directions 인증 키가 등록되지 않았습니다.' });
  const response = await fetch(`https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start=${encodeURIComponent(start)}&goal=${encodeURIComponent(goal)}&option=trafast`, { headers: { 'X-NCP-APIGW-API-KEY-ID': id, 'X-NCP-APIGW-API-KEY': secret } });
  const data = await response.json();
  if (!response.ok || !data.route?.trafast?.[0]) return res.status(502).json({ error: '도로 경로를 불러오지 못했습니다.' });
  const route = data.route.trafast[0];
  return res.status(200).json({ path: route.path, distance: route.summary.distance, duration: route.summary.duration });
}
