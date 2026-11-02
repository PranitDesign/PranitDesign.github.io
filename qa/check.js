await document.fonts.ready;await new Promise(r=>setTimeout(r,1200));
{const e=performance.now()+2500;while(performance.now()<e){gsap.ticker.tick();await new Promise(r=>setTimeout(r,16))}}
const R=s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return {t:Math.round(r.top),b:Math.round(r.bottom),l:Math.round(r.left),r:Math.round(r.right),vis:getComputedStyle(e).display!=='none'}};
const out={w:innerWidth,h:innerHeight,overflowX:document.documentElement.scrollWidth-innerWidth};
const n=document.querySelector('.name'),fs=parseFloat(getComputedStyle(n).fontSize);
const ln=n.querySelector('.ln'),lr=ln.getBoundingClientRect(),ir=ln.firstElementChild.getBoundingClientRect();
const c=document.createElement('canvas').getContext('2d');c.font=`400 ${fs}px Newsreader`;const m=c.measureText('Pranit');
// glyph top = baseline - ascent; baseline approx inner top + (lineHeight - (fa+fd))/2 + fa
const lh=parseFloat(getComputedStyle(n).lineHeight),fa=m.fontBoundingBoxAscent,fd=m.fontBoundingBoxDescent;
const base=ir.top+(lh-(fa+fd))/2+fa;out.nameClipTop=Math.round((base-m.actualBoundingBoxAscent)-lr.top);out.nameClipBottom=Math.round(lr.bottom-(base+m.actualBoundingBoxDescent));
out.nameRight=Math.round(n.getBoundingClientRect().right);out.nameW=[n.scrollWidth,n.clientWidth];
out.nav=R('.nav');out.dd=R('.dd');out.feat=R('.feat');out.heroTop=R('.hero-top');out.foot=R('.hero-foot');out.ask=R('#askBtn');
out.issues=[];
if(out.overflowX>0)out.issues.push('horizontal overflow '+out.overflowX);
if(out.nameClipTop<0||out.nameClipBottom<0)out.issues.push('name clipped '+out.nameClipTop+'/'+out.nameClipBottom);
if(out.nameRight>innerWidth)out.issues.push('name wider than screen');
if(out.dd.vis&&out.dd.t<out.nav.b)out.issues.push('diagram under nav');
if(out.dd.vis&&out.feat.vis&&out.feat.b>out.dd.t&&out.feat.l<out.dd.r)out.issues.push('feat overlaps diagram');
if(out.dd.vis&&out.dd.b>out.heroTop.t)out.issues.push('diagram overlaps hero text');
if(out.foot.b>innerHeight)out.issues.push('hero text below fold by '+(out.foot.b-innerHeight));
if(out.ask.t<out.foot.b&&out.ask.l<out.foot.r&&innerWidth<761)out.issues.push('ask button over hero text');
// nav brand after scroll
scrollTo(0,innerHeight*1.2);await new Promise(r=>setTimeout(r,300));
const br=document.querySelector('.brand').getBoundingClientRect(),tl=document.querySelector('.nav .tools').getBoundingClientRect(),bn=document.querySelector('.brand .bn');
out.brandGap=Math.round(tl.left-br.right);if(out.brandGap<8)out.issues.push('nav brand collides '+out.brandGap);if(bn.scrollWidth>bn.clientWidth+1)out.issues.push('brand text cut');
scrollTo(0,0);
// covers: text vs art overlap
document.querySelectorAll('.card .cv').forEach(cv=>{const C=cv.getBoundingClientRect();const t=cv.querySelector('.ttl').getBoundingClientRect();if(t.right>C.right||t.bottom>C.bottom)out.issues.push('cover title cut '+cv.className);
  cv.querySelectorAll('.stage>*').forEach(e=>{if(getComputedStyle(e).display==='none')return;const r=e.getBoundingClientRect();const tx=cv.querySelector('.txt').getBoundingClientRect();if(r.left<tx.right-4&&r.top<tx.bottom&&r.bottom>tx.top&&!e.classList.contains('blob')&&!e.classList.contains('waves'))out.issues.push('cover art over text '+cv.className+' '+e.className)})});
// headings wider than viewport
document.querySelectorAll('h1,h2,h3,.statement,.mail').forEach(h=>{if(h.closest('.reel'))return;const r=h.getBoundingClientRect();if(r.width&&r.right>innerWidth+1)out.issues.push('wide '+h.tagName+' '+h.textContent.slice(0,20))});

JSON.stringify({w:out.w,h:out.h,issues:out.issues,clip:[out.nameClipTop,out.nameClipBottom],dd:out.dd,foot:out.foot.b,brandGap:out.brandGap})
