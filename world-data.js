/* world-data.js: V2 CP24. Topics 6-8. Data as visuals (S30-S35 dot grids, S34 nine-into-one), editorial motifs (S38 route, S41 homes), interactive roadmap (S47), signed pledge (S50), exhibition index (S51). No WebGL, no new facts: every number is read from DOL.content.t6/t7/t8 or is arithmetic on them (1 dot = 1% or 0.1%). Load AFTER scenes.js. */
(function(){
const U=DOL.util,{$,R,cl,lp,prog}=U,C6=DOL.content.t6,C7=DOL.content.t7,C8=DOL.content.t8,reg=f=>DOL.scenes.push(f);
const mk=(tag,cls,par,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;if(par)par.append(e);return e};
const E=t=>t*t*(3-2*t),rnd=i=>Math.abs(Math.sin(i*127.1+3.7)*43758.5453)%1;
/* deterministic scatter: rank[i] = order in which dot i fills */
const scatter=n=>{const o=[...Array(n).keys()].sort((a,b)=>rnd(a)-rnd(b)),r=[];o.forEach((d,k)=>r[d]=k);return r};
/* dv: one data visual block on the right of a pin (static under the number on phones) */
const dv=(sec,cap)=>{const w=mk('figure','dv',$('#'+sec+' .pin'));$('#'+sec).classList.add('dv-on');if(cap)mk('figcaption','',w,cap);return w};
const dots=(host,n,cols,label,col)=>{const g=mk('div','dg',host);g.style.setProperty('--c',cols);g.setAttribute('role','img');g.setAttribute('aria-label',label);
 const d=[];for(let i=0;i<n;i++){const e=mk('i','',g);if(col)e.style.setProperty('--k',col(i));d.push(e)}host.insertBefore(g,host.querySelector('figcaption'));return d};
const fill=(d,rank,v)=>{if(d._v===v)return;d._v=v;d.forEach((e,i)=>e.style.setProperty('--f',cl(v-rank[i])))};
const seq=n=>[...Array(n).keys()];
/* S30: 100 workers; first 56 self-employed, next 24 regular, last 20 casual (shares rounded to whole dots) */
{const e=$('#s30'),n=C6.emp.map(x=>Math.round(x[1])),k=['var(--acc)','var(--ink)','#8FA3A0'],cat=i=>i<n[0]?0:i<n[0]+n[1]?1:2;
 const h=dv('s30','One dot is about 1 in 100 workers. Shares are rounded.'),d=dots(h,100,10,'100 dots: about 56 self-employed, 24 regular wage or salaried, 20 casual labour',i=>k[cat(i)]),r=seq(100);
 reg(()=>fill(d,r,R?100:100*cl((prog(e)-.1)/.6)))}
/* S31: 1000 dots = 100% of the non-agricultural workforce, 1 dot = 0.1%. 26 dots (2.6%), then 67 (6.7%). Same scatter = the first 26 stay lit. */
{const e=$('#s31'),h=dv('s31','One dot is 0.1% of the non-agricultural workforce.'),r=scatter(1000),
 d=dots(h,1000,40,'1000 dots; 26 lit for 2.6 percent, then 67 lit for 6.7 percent',i=>r[i]<C6.gig[0][3]*10?'var(--ink)':'var(--acc)');
 reg(()=>{const p=cl((prog(e)-.05)/.85),b=p>.5,q=b?cl((p-.5)/.4):cl(p/.4),g0=C6.gig[0][3]*10,g1=C6.gig[1][3]*10;fill(d,r,R?g1:b?lp(g0,g1,q):g0*q)})}
/* S32: 100 dots, 27 lit (27% face accidents) */
{const e=$('#s32'),h=dv('s32','One dot is 1% of gig workers.'),r=scatter(100),d=dots(h,100,10,'100 dots, 27 lit: 27 percent of gig workers face accidents',()=>'var(--acc2)');
 reg(()=>fill(d,r,R?27:27*cl((cl((prog(e)-.08)/.8)-.5)/.3)))}
/* S33: two grids of 100. Female 41.7 (the last dot is a 0.7 partial), male about 79 */
{const e=$('#s33'),h=dv('s33'),w=mk('div','dg2',h),A=mk('div','',w),B=mk('div','',w);
 const a=dots(A,100,10,'Female labour force participation, 41.7 of 100 dots',()=>'var(--acc)'),b=dots(B,100,10,'Male labour force participation, about 79 of 100 dots',()=>'var(--ink)');
 mk('p','gl',A,'Female'),mk('p','gl',B,'Male, about 79%');const ra=scatter(100),rb=scatter(100);
 reg(()=>{const p=R?1:cl((prog(e)-.1)/.6);fill(a,ra,C6.fl*p);fill(b,rb,C6.ml*p)})}
/* S35: 100 dots, 53 lit for "over 53%" women */
{const e=$('#s35'),h=dv('s35','Over 53 of every 100 registrants are women.'),r=scatter(100),d=dots(h,100,10,'100 dots, 53 lit: women are over 53 percent of registrants',()=>'var(--acc)');
 reg(()=>fill(d,r,R?53:53*cl((prog(e)-.12)/.6)))}
/* S34: nine older laws into one Code. Nine blocks slide to one square; the label appears once they are one. */
{const e=$('#s34'),h=dv('s34'),w=mk('div','nine',h),B=[...Array(9).keys()].map(i=>{const b=mk('i','',w);b.dataset.c=i%3;b.dataset.r=i/3|0;return b}),
 t=mk('b','nt',w,'Code on Social Security, 2020'),k=mk('span','nk',h,'9 older laws');w.setAttribute('role','img');w.setAttribute('aria-label','Nine blocks merging into one: nine older labour laws into the Code on Social Security, 2020');
 reg(()=>{const p=cl((prog(e)-.08)/.8),m=R?1:E(cl((p-.2)/.4));B.forEach(b=>{const c=+b.dataset.c,r=+b.dataset.r;b.style.left=lp(c*35,33,m)+'%';b.style.top=lp(r*35,33,m)+'%';b.style.opacity=m>.98&&b!==B[4]?0:1;b.classList.toggle('one',m>.98&&b===B[4])});
  t.style.opacity=cl((m-.9)/.1);k.textContent=m>.5?'1 Code':'9 older laws'})}
/* S38: Amulu's route as one line drawn on scroll (45+ km, several modes of transport: no map, no stops invented) */
{const e=$('#s38'),n=$('#s38 .num'),w=mk('div','rt'),NS='http://www.w3.org/2000/svg';n.after(w);
 w.innerHTML='<svg viewBox="0 0 600 90" role="img" aria-label="A long route drawn as one line: 45 plus kilometres"><path class="rb" d="M8 70 C90 8 170 92 250 46 S420 8 470 54 S560 70 592 28" pathLength="1"/><path class="rf" d="M8 70 C90 8 170 92 250 46 S420 8 470 54 S560 70 592 28" pathLength="1"/><circle class="rd" cx="8" cy="70" r="7"/><circle class="re" cx="592" cy="28" r="7"/></svg>';
 const f=w.querySelector('.rf'),en=w.querySelector('.re');
 reg(()=>{const p=R?1:cl((prog(e)-.08)/.45);f.style.strokeDashoffset=1-p;en.style.opacity=p>.99?1:0})}
/* S41: 15-16 homes in one building: 15 houses + one dashed (the research gives a range) */
{const e=$('#s41'),n=$('#s41 .num'),w=mk('div','hs'),H=[];n.after(w);w.setAttribute('role','img');w.setAttribute('aria-label','Sixteen small houses: fifteen solid and one dashed, for 15 to 16 homes');
 for(let i=0;i<16;i++)H.push(mk('i',i==15?'h':'',w));
 reg(()=>{const p=R?1:cl((prog(e)-.08)/.45);H.forEach((h,i)=>h.style.setProperty('--f',cl(p*16-i)))})}
/* S47: interactive roadmap. Each action can be taken on ("I'll do this"); the track and the count follow; the choice is carried to the pledge (S50). */
const P=DOL.pledge={acts:new Set(),n:C8.plan.length};
{const e=$('#s47'),ol=e.querySelector('.plan'),li=[...ol.children],tr=mk('div','rmt'),cn=mk('p','rmc');ol.before(tr);ol.after(cn);tr.setAttribute('aria-hidden','true');
 const nd=li.map(()=>mk('i','',tr));const up=()=>{nd.forEach((x,i)=>x.classList.toggle('on',P.acts.has(i)));li.forEach((x,i)=>x.classList.toggle('on',P.acts.has(i)));cn.textContent=P.acts.size+' of '+P.n+' actions taken on'+(P.acts.size?'.':'. Select “I’ll do this” on any step.')};
 li.forEach((x,i)=>{const b=mk('button','cm',x,'I’ll do this');b.type='button';b.setAttribute('aria-pressed','false');b.onclick=()=>{P.acts.has(i)?P.acts.delete(i):P.acts.add(i);b.setAttribute('aria-pressed',P.acts.has(i));b.textContent=P.acts.has(i)?'Taken on ✓':'I’ll do this';up()}});up();
 reg(()=>{const p=R?1:cl((prog(e)-.1)/.6);tr.style.setProperty('--p',p)})}
/* S50: the pledge. Three promises are toggles. */
{const e=$('#s50'),ul=e.querySelector('.sym'),lis=[...ul.children],st=new Set();
 lis.forEach((l,i)=>{const t=l.textContent;l.textContent='';const b=mk('button','pb',l,t);b.type='button';b.setAttribute('aria-pressed','false');b.onclick=()=>{st.has(i)?st.delete(i):st.add(i);b.setAttribute('aria-pressed',st.has(i));l.classList.toggle('on',st.has(i))}})}
/* S28 (CP25): NAMASTE counts as dots, 1 dot = 1,000 (88,448 workers validated = 88.448 dots; 83,000 PPE kits = 83 dots). Counts, not shares. Shown only in the policy stage (same switch as scenes.js: p>.5). */
{const e=$('#s28'),h=dv('s28','One dot is 1,000 workers or PPE kits. The research says over 88,448 and over 83,000.'),w=mk('div','dg2',h),A=mk('div','',w),B=mk('div','',w);
 const a=dots(A,89,10,'About 89 dots: over 88,448 Sewer and Septic Tank Workers validated under NAMASTE',()=>'var(--acc)'),b=dots(B,83,10,'83 dots: over 83,000 PPE kits distributed',()=>'var(--ink)');
 mk('p','gl',A,'Workers validated'),mk('p','gl',B,'PPE kits');h.append(h.querySelector('figcaption'));const ra=seq(89),rb=seq(83);
 reg(()=>{const p=cl((prog(e)-.05)/.85),on=p>.5,q=R?1:cl((p-.55)/.25),k=R?1:cl((p-.6)/.25);h.style.opacity=on?1:0;h.setAttribute('aria-hidden',on?'false':'true');fill(a,ra,on?88.448*q:0);fill(b,rb,on?83*k:0)})}
/* S51: the exhibition index. Eight chapters, each hovering in its own palette. */
{const CH=['What we call work','Why it matters','The people behind everyday life','Dignity and human rights','When dignity is denied','India in context','Real stories and voices','What can change'],ex=$('#ex');
 ex.innerHTML=CH.map((t,i)=>`<li><a href="#topic-${i+1}" data-n="${i+1}"><span>0${i+1}</span><b>${t}</b></a></li>`).join('');
 [...ex.querySelectorAll('a')].forEach(a=>{const m=$('#topic-'+a.dataset.n);if(m)a.style.setProperty('--ac',getComputedStyle(m).getPropertyValue('--acc').trim()||'#F2A900')});
 DOL.rail.push('s51', 's52')}
})();
/* CP26: S18 veil (each worker group is covered in turn, then the line "most invisible") and S26 label ring (the research's own labels wrap "vital civic services"). Words come from DOL.content.t3.unseen / t5.labels; no new facts. Load order: after scenes.js, so the S18 opacity fade there is overridden every tick. */
(function(){
const U=DOL.util,{$,R,cl,prog}=U,reg=f=>DOL.scenes.push(f);
{const e=$('#s18'),L=[...$('#unseen').children];
 reg(()=>{const p=cl((prog(e)-.1)/.6);L.forEach((x,i)=>{x.style.opacity=1;x.style.setProperty('--v',cl((p-i*.1)/.4).toFixed(3))})})}
{const e=$('#s26'),pin=$('#s26 .pin'),lab=DOL.content.t5.labels,NS='http://www.w3.org/2000/svg',f=document.createElement('figure');
 f.className='stg';f.setAttribute('role','img');f.setAttribute('aria-label','Vital civic services, wrapped in the labels '+lab.join(' and '));
 const t=(lab.join(' · ')+' · ').repeat(2);
 f.innerHTML='<svg viewBox="0 0 400 400" aria-hidden="true"><defs><path id="stgp" d="M200 200 m-150 0 a150 150 0 1 1 300 0 a150 150 0 1 1 -300 0"/></defs><circle class="sr" cx="200" cy="200" r="150" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/><g class="sg"><text class="srt" textLength="930" lengthAdjust="spacing"><textPath href="#stgp">'+t+'</textPath></text></g><circle class="sk" cx="200" cy="200" r="96"/><text class="skt" x="200" y="188">Vital</text><text class="skt" x="200" y="214">civic</text><text class="skt" x="200" y="240">services</text></svg>';
 pin.append(f);const ring=f.querySelector('.sr'),g=f.querySelector('.sg'),core=f.querySelectorAll('.sk,.skt');
 reg(()=>{const p=cl((prog(e)-.08)/.8);core.forEach(x=>x.style.opacity=cl(p/.2));ring.style.strokeDashoffset=1-cl((p-.38)/.2);g.style.opacity=cl((p-.5)/.15);g.setAttribute('transform','rotate('+(R?0:p*30).toFixed(1)+' 200 200)')})}
})();

/* Credits Section Animation */
(function(){
const U=DOL.util,{$,R,cl,prog}=U,reg=f=>DOL.scenes.push(f);
const e=$('#s52');
if(!e)return;
const heading=e.querySelector('.cr-heading');
const spans=[...e.querySelectorAll('.cr-nwrap span')];
const rows=[...e.querySelectorAll('.cr-row')];
const foot=e.querySelector('.cr-foot');
/* heading fades + lifts in */
if(heading){heading.style.opacity=0;heading.style.transform='translateY(28px)'}
if(foot){foot.style.opacity=0}
reg(()=>{
  const p=R?1:prog(e);
  const ease=t=>t<.5?2*t*t:(4-2*t)*t-1; /* ease-in-out */
  /* heading */
  if(heading){const v=cl(p/.18);heading.style.opacity=v;heading.style.transform=R?'none':`translateY(${(1-ease(v))*28}px)`}
  /* name spans: stagger per name */
  spans.forEach((s,i)=>{
    const v=cl((p-(.1+i*.05))/.18);
    s.style.transform=R?'none':`translateY(${(1-ease(v))*110}%)`;
  });
  /* row separators fade in */
  rows.forEach((r,i)=>{
    const v=cl((p-(.08+i*.04))/.14);
    r.style.opacity=R?1:v;
  });
  /* footer */
  if(foot){foot.style.opacity=R?1:cl((p-.55)/.2)}
});
})();
