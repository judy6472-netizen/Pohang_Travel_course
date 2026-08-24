export default async function handler(req, res) {
  const query = String(req.query?.query || '').trim();
  if (!query) return res.status(400).json({ error: '검색어를 입력해주세요.' });
  if (!process.env.NAVER_SEARCH_CLIENT_ID || !process.env.NAVER_SEARCH_CLIENT_SECRET) {
    return res.status(503).json({ error: 'NAVER_SEARCH_CLIENT_ID와 NAVER_SEARCH_CLIENT_SECRET 환경변수를 등록해주세요.' });
  }
  const response = await fetch(`https://naverapihub.apigw.ntruss.com/search/v1/local?query=${encodeURIComponent(query)}&display=5&sort=random&format=json`, {
    headers: { 'X-NCP-APIGW-API-KEY-ID': process.env.NAVER_SEARCH_CLIENT_ID, 'X-NCP-APIGW-API-KEY': process.env.NAVER_SEARCH_CLIENT_SECRET }
  });
  const data = await response.json();
  if (!response.ok) return res.status(response.status).json({ error: '네이버 장소 검색에 실패했어요.' });
  const items = (data.items || []).map(item => ({ name: item.title.replace(/<[^>]*>/g, ''), category: item.category, address: item.roadAddress || item.address, longitude: Number(item.mapx) / 10000000, latitude: Number(item.mapy) / 10000000, link: item.link }));
  return res.status(200).json({ items });
}
