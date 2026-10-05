/* V2 CP28: typographic exhibition cover and eight-chapter colonnade. */
/* V2 CP31: cinematic layer: fade-up, corner marks, flare, dust, typewriter credits, pointer depth. CSS owns all timing. */
(function(){
const U=DOL.util,{$,R,cl,prog}=U,D=DOL.content.cover,el=$('#cv'),pin=el&&el.querySelector('.pin');
if(!el||!pin||!D)return;
DOL.rail.unshift('cv');
const mk=(tag,cls,parent,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;if(parent)parent.append(e);return e};
const svg=(tag,attrs,parent)=>{const e=document.createElementNS('http://www.w3.org/2000/svg',tag);Object.entries(attrs||{}).forEach(([k,v])=>e.setAttribute(k,v));if(parent)parent.append(e);return e};
pin.innerHTML='<div class="cv-frame" aria-hidden="true"></div><div class="cv-bars cv-bars-top" aria-hidden="true"></div><div class="cv-bars cv-bars-bottom" aria-hidden="true"></div><div class="cv-dots" aria-hidden="true"></div>';
const layout=mk('div','cv-layout',pin),copy=mk('div','cv-copy',layout),eyebrow=mk('p','cv-eyebrow',copy,D.kicker);eyebrow.setAttribute('aria-label',D.kicker);
const h=mk('h1','cv-title',copy);h.setAttribute('aria-label',D.title);h.setAttribute('aria-live','off');
const first=mk('span','cv-title-line cv-title-first',h),dignity=mk('span','cv-word cv-dignity',first,'Dignity'),of=mk('span','cv-word cv-of',first,'of');
first.setAttribute('aria-hidden','true');dignity.setAttribute('aria-hidden','true');of.setAttribute('aria-hidden','true');
const labour=mk('span','cv-title-line cv-labour',h,'Labour');labour.setAttribute('aria-hidden','true');
const details=mk('div','cv-details',layout);mk('p','cv-tagline',details,D.tagline);
const facts=mk('div','cv-facts',details);facts.setAttribute('aria-label',D.facts.join(', '));D.facts.forEach(t=>mk('span','',facts,t));
const actions=mk('div','cv-actions',details),cta=mk('a','cv-cta',actions,D.cta);cta.href=D.ctaHref;cta.setAttribute('aria-label',D.cta);mk('span','cv-cue',actions,D.cue);
const colwrap=mk('div','cv-columns-wrap',layout);mk('p','cv-column-label',colwrap,'Eight columns, one roof');
const roof=svg('svg',{class:'cv-roof',viewBox:'0 0 480 32','aria-hidden':'true'},colwrap);svg('path',{d:'M4 28 L34 4 H446 L476 28',pathLength:'1'},roof);
const columns=mk('nav','cv-columns',colwrap);columns.setAttribute('aria-label','Eight chapters');
D.chapters.forEach((chapter,i)=>{const a=mk('a','cv-column',columns),num=mk('em','',a,String(i+1).padStart(2,'0'));a.href=chapter.href;a.style.setProperty('--cv-color',chapter.color);a.style.setProperty('--cv-i',i);a.setAttribute('aria-label','Chapter '+(i+1)+': '+chapter.name);a.setAttribute('title',chapter.name);mk('span','',a,chapter.name);num.setAttribute('aria-hidden','true')});
const credits=mk('div','cv-creditline',layout);D.team.forEach(([role,names])=>{const item=mk('div','cv-credit',credits);mk('span','cv-credit-role',item,role);mk('span','cv-credit-names',item,names)});
/* V2 CP31 typewriter: real names stay in a visually-hidden span (read once, complete, in order); the sighted copy is aria-hidden per-character spans, all laid out from first paint and revealed by CSS delays, so nothing re-wraps. 45ms/char, eased down (floor 25ms) only when the team is long, so typing ends near 5s and the last caret fades out by about 6s. */
const T0=2.3,GAP=.2,LEAD=.3,END=5,nm=[...credits.querySelectorAll('.cv-credit-names')],cnt=nm.reduce((n,e)=>n+[...e.textContent].length,0),per=Math.max(.025,Math.min(.045,(END-T0-(nm.length-1)*GAP)/cnt));
let at=T0;
nm.forEach((e,k)=>{const txt=e.textContent,typed=mk('span','cv-type'),keys=[];e.textContent='';mk('span','cv-sr',e,txt);e.append(typed);typed.setAttribute('aria-hidden','true');e.previousElementSibling.style.setProperty('--cv-rt',(at-LEAD).toFixed(3)+'s');
[...txt].forEach(ch=>{const c=mk('span','cv-ch',typed,ch);c.style.setProperty('--cv-t',at.toFixed(3)+'s');if(ch.trim())keys.push([c,at]);at+=per});
keys.forEach(([c,s],j)=>{const nx=keys[j+1],last=k===nm.length-1&&!nx;c.classList.add(last?'cv-ce':'cv-cr');if(!last)c.style.setProperty('--cv-d',((nx?nx[1]:at+GAP)-s).toFixed(3)+'s')});at+=GAP});
const badge=mk('p','cv-badge',pin,D.badge);
const dots=pin.querySelector('.cv-dots');for(let i=0;i<96;i++){const dot=mk('i','cv-dot',dots);dot.style.setProperty('--cv-delay',((i%12)*.09+Math.floor(i/12)*.045)+'s')}
/* V2 CP31: decorative layers, all aria-hidden. Dust is deterministic: a golden-ratio hash of the index, nothing random. */
const fade=mk('div','cv-fade',pin),breath=mk('div','cv-breath',pin),flare=mk('span','cv-flare',h),motes=mk('div','cv-motes',pin),A=[.618034,.754878,.56984,.819173,.414214,.732051,.236068,.324718],fr=(i,k)=>((i+1)*A[k]+k*.37)%1;
[fade,breath,flare,motes].forEach(e=>e.setAttribute('aria-hidden','true'));
['tl','tr','bl','br'].forEach(c=>mk('i','cv-corner cv-corner-'+c,pin).setAttribute('aria-hidden','true'));
for(let i=0;i<24;i++){const s=mk('i','cv-mote',motes).style,set=(k,v)=>s.setProperty(k,v);set('--cv-x',(fr(i,0)*100).toFixed(1)+'%');set('--cv-y',(6+fr(i,1)*90).toFixed(1)+'%');set('--cv-s',(1+fr(i,2)*2).toFixed(1)+'px');set('--cv-o',(.12+fr(i,3)*.23).toFixed(2));set('--cv-dur',(14+fr(i,4)*12).toFixed(1)+'s');set('--cv-dl',(2.4+(i%8)*.9+fr(i,5)*.6).toFixed(1)+'s');set('--cv-dx',Math.round((fr(i,6)-.5)*120)+'px');set('--cv-dy',-Math.round(70+fr(i,7)*130)+'px')}
let visible=false,raf=0,px=.72,py=.38,tx=px,ty=py;
const hover=matchMedia('(hover:hover) and (pointer:fine)');
let mx=0,my=0; /* V2 CP31: pointer-depth state, -1..1, rests at 0 so nothing is displaced until the pointer moves */
if(!R&&hover.matches)addEventListener('pointermove',e=>{if(!visible)return;tx=e.clientX/innerWidth;ty=e.clientY/innerHeight;if(raf)return;raf=requestAnimationFrame(()=>{raf=0;px+=(tx-px)*.24;py+=(ty-py)*.24;pin.style.setProperty('--cv-glow-x',(px*100).toFixed(1)+'%');pin.style.setProperty('--cv-glow-y',(py*100).toFixed(1)+'%');mx+=((tx-.5)*2-mx)*.24;my+=((ty-.5)*2-my)*.24;pin.style.setProperty('--cv-mx',mx.toFixed(3));pin.style.setProperty('--cv-my',my.toFixed(3))})},{passive:true});
new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;el.classList.toggle('cv-off',!visible);if(!visible&&raf){cancelAnimationFrame(raf);raf=0}},{threshold:0}).observe(el);
DOL.scenes.push(()=>{const p=cl(prog(el));if(p>.003)el.classList.add('cv-open');el.style.setProperty('--cv-p',p.toFixed(4));if(R)el.classList.add('cv-open')});
})();
