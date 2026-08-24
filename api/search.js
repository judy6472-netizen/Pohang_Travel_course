export default async function handler(req, res) {
  const query = String(req.query?.query || '').trim();
  if (!query) return res.status(400).json({ error: '검색어를 입력해주세요.' });
  if (!process.env.NAVER_SEARCH_CLIENT_ID || !process.env.NAVER_SEARCH_CLIENT_SECRET) {
    return res.status(503).json({ error: 'NAVER_SEARCH_CLIENT_ID와 NAVER_SEARCH_CLIENT_SECRET 환경변수를 등록해주세요.' });
  }
  const response = await fetch(`https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(query)}&display=15&sort=random`, {
    headers: { 'X-Naver-Client-Id': process.env.NAVER_SEARCH_CLIENT_ID, 'X-Naver-Client-Secret': process.env.NAVER_SEARCH_CLIENT_SECRET }
  });
  const data = await response.json();
  if (!response.ok) return res.status(response.status).json({ error: '네이버 장소 검색에 실패했어요.' });
  const items = (data.items || []).map(item => ({ name: item.title.replace(/<[^>]*>/g, ''), category: item.category, address: item.roadAddress || item.address, mapx: item.mapx, mapy: item.mapy, link: item.link }));
  return res.status(200).json({ items });
}
