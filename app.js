const routes=[
 {tag:'MIX · 추천 01',title:'바다와 동네 사이, 포항의 첫 장면',desc:'대표 명소와 로컬 쉼터를 가장 자연스럽게 잇는 코스',time:'2박 3일',distance:'48.2 km',price:'₩1,764,000',places:[['★','영일대 해수욕장'],['○','송도 솔밭'],['★','스페이스워크'],['○','청림동 카페']]},
 {tag:'LOCAL · 추천 02',title:'파도 따라 천천히, 로컬의 주말',desc:'사람이 붐비지 않는 해안과 동네 식당 중심',time:'2박 3일',distance:'39.8 km',price:'₩1,586,000',places:[['○','송도 솔밭'],['○','연오랑세오녀 테마공원'],['★','호미곶'],['○','구룡포 골목']]},
 {tag:'TOURIST · 추천 03',title:'처음이라면 꼭, 포항 클래식',desc:'포항을 대표하는 장면을 빠짐없이 만나는 코스',time:'2박 3일',distance:'62.4 km',price:'₩1,832,000',places:[['★','스페이스워크'],['★','영일대'],['★','호미곶'],['★','죽도시장']]},
 {tag:'CALM · 추천 04',title:'멍때림을 위한 바다와 숲',desc:'정적인 운동과 느린 호흡을 위한 휴식형 일정',time:'2박 3일',distance:'35.6 km',price:'₩1,402,000',places:[['○','송도 솔밭'],['○','기청산 식물원'],['★','보경사'],['○','월포 해변']]},
 {tag:'ACTIVE · 추천 05',title:'걷고 오르고, 바람을 타는 하루',desc:'액티비티와 전망 포인트를 밀도 있게 연결',time:'2박 3일',distance:'54.7 km',price:'₩1,718,000',places:[['★','스페이스워크'],['○','내연산 트레킹'],['★','영일대'],['○','칠포 해변']]},
 {tag:'LOCAL · 추천 06',title:'구룡포에서 만나는 포항의 결',desc:'근대문화 골목과 현지 식탁을 따라가는 코스',time:'2박 3일',distance:'58.1 km',price:'₩1,638,000',places:[['★','구룡포 일본인 가옥거리'],['○','구룡포항'],['○','대보항'],['★','호미곶']]}
];
const grid=document.querySelector('#routeGrid');
function renderRoutes(){grid.innerHTML=routes.map((r,i)=>`<article class="route-card ${i===0?'featured':''}"><div class="route-top"><div><span class="route-tag">${r.tag}</span><h3>${r.title}</h3><p>${r.desc}</p></div><span>♡</span></div><div class="route-line"></div><div class="route-stats"><span>예상 이동 <strong>${r.distance}</strong></span><span>예상 비용 <strong>${r.price}</strong></span></div><div class="route-places">${r.places.map(p=>`<span class="place ${p[0]==='★'?'star':'circle'}">${p[0]} ${p[1]}</span>`).join('')}</div><button class="save" aria-label="일정 저장">＋</button></article>`).join('')}
renderRoutes();
document.querySelectorAll('.choice').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.choice').forEach(x=>x.classList.remove('selected'));b.classList.add('selected')}));
document.querySelectorAll('.segmented').forEach(group=>group.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{group.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active')})));
document.querySelector('#recommendBtn').addEventListener('click',()=>{const style=document.querySelector('#styleChoices .active').dataset.style;const title=style==='tourist'?'대표 명소를 중심으로':style==='local'?'로컬의 결을 따라':'대표와 로컬을 반반으로';document.querySelector('#resultTitle').textContent=title;document.querySelector('.results').scrollIntoView({behavior:'smooth'});showToast('조건에 맞춰 추천 코스를 업데이트했어요.')});
document.addEventListener('click',e=>{if(e.target.matches('.save')||e.target.id==='shareTop'){showToast(e.target.id==='shareTop'?'공유 링크를 준비했어요. 카카오톡으로 보내보세요.':'일정을 저장했어요. 링크를 복사해 카카오톡으로 공유해보세요.')}});
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');showToast(`${b.textContent} 기준으로 정렬했어요.`)}));
function showToast(msg){const t=document.querySelector('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove('show'),2600)}
