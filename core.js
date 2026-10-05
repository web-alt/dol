/* core.js: shared helpers, scroll loop, rail, Load after content.js, before scenes-tN.js */
(function(){
const U=DOL.util={$:s=>document.querySelector(s),R:matchMedia('(prefers-reduced-motion:reduce)').matches,
 cl:(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),lp:(a,b,t)=>a+(b-a)*t,
 prog:el=>{const r=el.getBoundingClientRect();return U.cl(-r.top/(r.height-innerHeight))}};
const $=U.$,cl=U.cl;
DOL.rail=[]; /* scenes-tN.js: DOL.rail.push('s1',...) */
/* Rail (built on load) */
const rl=$('#railist'),rf=$('#railfill');
const buildRail=()=>{DOL.rail.forEach((id,i)=>{const li=document.createElement('li'),b=document.createElement('a');b.href='#'+id;b.setAttribute('aria-label','Scene '+(i+1));li.append(b);rl.append(li)})};
const ch=$('#chap'),CH=['','What we call work','Why it matters','The people behind everyday life','Dignity and human rights','When dignity is denied','India in context','Real stories and voices','What can change'];
const railTick=()=>{const m=document.documentElement.scrollHeight-innerHeight;rf.style.transform='scaleY('+cl(scrollY/m)+')';
 let cur=0;DOL.rail.forEach((id,i)=>{if($('#'+id).getBoundingClientRect().top<innerHeight*.5)cur=i});
 const tp=$('#'+DOL.rail[cur]).closest('main');if(ch&&tp)ch.textContent=tp.dataset.topic==='0'?'':'0'+tp.dataset.topic+' / '+CH[tp.dataset.topic];
 [...rl.querySelectorAll('a')].forEach((a,i)=>i==cur?a.setAttribute('aria-current','true'):a.removeAttribute('aria-current'))};
/* Loop: DOL.scenes.push(fn) registers a scroll function */
let q=0;const run=()=>{q=0;DOL.scenes.forEach(t=>t());railTick()};
DOL.start=()=>{buildRail();DOL.mediaInit&&DOL.mediaInit();addEventListener('scroll',()=>q||(q=requestAnimationFrame(run)),{passive:true});addEventListener('resize',run);run()};
/* Media: <figure class="ph" data-media="id"> hydrated from DOL.media[id]={src,alt,credit}. Lazy, clip-reveal on view, slow parallax. */
DOL.media=DOL.media||{};
DOL.mediaInit=()=>{const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&(e.target._ph.forEach(f=>f.classList.add('in')),io.unobserve(e.target))),{threshold:.1});/* observe the PARENT: Chrome treats a fully clip-path'd element as not intersecting */
 document.querySelectorAll('[data-media]').forEach(f=>{const m=DOL.media[f.dataset.media];if(!m)return;
  f.innerHTML=`<img src="${m.src}" alt="${m.alt||''}" loading="lazy" decoding="async" onerror="this.closest('figure').remove()">${m.credit?`<figcaption>${m.credit}</figcaption>`:''}`;const pr=f.parentElement;(pr._ph=pr._ph||[]).push(f);io.observe(pr);
  if(!U.R)DOL.scenes.push(()=>{const r=f.getBoundingClientRect();f.style.setProperty('--py',((r.top+r.height/2-innerHeight/2)/innerHeight*-40).toFixed(1)+'px')})})};
})();
