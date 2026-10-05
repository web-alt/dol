/* rail-index.js: CP30. Chapter index panel beside the left rail. Rows are cloned from #ex (S51), so names, numbers and hrefs have one source. Colours follow the active chapter through DOL.scenes. Load after world-data.js, immediately before DOL.start(). */
(function(){
const U=DOL.util,$=U.$,ex=$('#ex'),rail=$('#rail');
if(!ex||!ex.children.length||!rail)return;
const mk=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
const src=$('#s51 .if'),btn=mk('button','ri-btn','Chapters'),pan=mk('aside','ri'),ol=mk('ol','ri-list');
btn.type='button';btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-controls','ri-panel');
pan.id='ri-panel';pan.setAttribute('aria-label','Chapters');
[...ex.children].forEach(li=>ol.append(li.cloneNode(true)));
pan.append(mk('p','ri-eb',src?src.textContent:'The exhibition'),ol);
rail.before(btn,pan); /* siblings of the rail, ahead of its dots, so Tab goes button > panel links > dots */
const rows=[...ol.querySelectorAll('a')],off=matchMedia('(max-width:1100px)');

/* open / close */
let open=false,hov=false,to=0;
const held=()=>pan.contains(document.activeElement);
const set=v=>{if(v===open)return;open=v;pan.classList.toggle('ri-open',v);btn.setAttribute('aria-expanded',v)};
const arm=(v,ms)=>{clearTimeout(to);to=setTimeout(()=>{if(v||!held())set(v)},ms)}; /* one timer: entering cancels a pending close, leaving cancels a pending open */
const over=t=>!!t&&(rail.contains(t)||pan.contains(t));
const pin=e=>{if(e.pointerType==='touch'||off.matches)return;hov=true;arm(true,80)};
const pout=e=>{if(e.pointerType==='touch'||over(e.relatedTarget))return;hov=false;arm(false,220)};
[rail,pan].forEach(x=>{x.addEventListener('pointerenter',pin);x.addEventListener('pointerleave',pout)});
pan.addEventListener('click',e=>{if(e.target.closest('a')){clearTimeout(to);hov=false;set(false)}});
btn.addEventListener('click',()=>{clearTimeout(to);set(!open)});
document.addEventListener('keydown',e=>{if(e.key!=='Escape'||!open)return;const f=held()||document.activeElement===btn;clearTimeout(to);if(f)btn.focus();set(false)});
const fo=e=>{const t=e.relatedTarget;if(open&&!hov&&!(t&&(t===btn||pan.contains(t))))arm(false,0)};
btn.addEventListener('focusout',fo);pan.addEventListener('focusout',fo);
const gone=()=>{if(off.matches){clearTimeout(to);hov=false;set(false)}};
off.addEventListener?off.addEventListener('change',gone):off.addListener(gone);

/* page-driven colour: same rule as the rail (last main[data-topic] above 50% of the viewport), recomputed only when it changes */
const mains=[...document.querySelectorAll('main[data-topic]')];
let cv,cur;try{cv=document.createElement('canvas').getContext('2d')}catch(_){}
const rgb=v=>{cv.fillStyle='#000';cv.fillStyle=v;const s=cv.fillStyle;return s[0]==='#'?[1,3,5].map(i=>parseInt(s.substr(i,2),16)):s.match(/[\d.]+/g).slice(0,3).map(Number)};
const lum=c=>{const [r,g,b]=c.map(x=>{x/=255;return x<=.03928?x/12.92:Math.pow((x+.055)/1.055,2.4)});return .2126*r+.7152*g+.0722*b};
const cr=(a,b)=>{const x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
const put=(el,k,v)=>v?el.style.setProperty(k,v):el.style.removeProperty(k);
DOL.scenes.push(()=>{
 if(off.matches)return;
 let m=null;for(const x of mains)if(x.getBoundingClientRect().top<innerHeight*.5)m=x;
 if(m===cur)return;cur=m;
 const s=getComputedStyle(m||document.documentElement),g=n=>s.getPropertyValue(n).trim(),
  V={'--paper':g('--paper'),'--ink':g('--ink'),'--acc':g('--acc'),'--acc2':g('--acc2'),'--mute':g('--mute')};
 if(cv){ /* hover text: whichever of ink/paper reads better on the accent (ink on all eight chapters); marker colour: accent unless it is under 4.5:1 on the panel */
  const A=rgb(V['--acc']),I=rgb(V['--ink']),P=rgb(V['--paper']);
  V['--ri-on']=cr(A,I)>=cr(A,P)?V['--ink']:V['--paper'];V['--ri-mk']=cr(A,I)>=4.5?V['--acc']:V['--paper']}
 [pan,btn].forEach(el=>Object.keys(V).forEach(k=>put(el,k,V[k])));
 put(rail,'--acc',V['--acc']);
 const t=m?m.dataset.topic:'';
 rows.forEach(a=>a.dataset.n===t?a.setAttribute('aria-current','true'):a.removeAttribute('aria-current'))});
})();
