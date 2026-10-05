/* V2 CP28: restrained, scroll-synced 2D visuals for Topics 7 and 8. */
(function(){
const U=DOL.util,{$,R,cl,prog}=U,C7=DOL.content.t7,C8=DOL.content.t8,reg=f=>DOL.scenes.push(f),NS='http://www.w3.org/2000/svg';
const mk=(tag,cls,parent,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;if(parent)parent.append(e);return e};
const S=(tag,attrs,parent)=>{const e=document.createElementNS(NS,tag);Object.entries(attrs||{}).forEach(([k,v])=>e.setAttribute(k,v));if(parent)parent.append(e);return e};
const fig=(id,label,caption)=>{const sec=$('#'+id),pin=sec&&sec.querySelector('.pin');if(!pin)return null;const f=mk('figure','dv st-dv',pin);f.setAttribute('role','img');f.setAttribute('aria-label',label);sec.classList.add('st-on','dv-on');if(caption)mk('figcaption','',f,caption);return{sec,pin,f}};
const ease=t=>{t=cl(t);return t*t*(3-2*t)};

/* S37: ledger details enter with the account; the final note follows the closing line. */
{const x=fig('s37','Ledger card: Bleaching powder: bare hands; Gloves: none; Protective shoes: none; Feeds stray dogs and cats on her route.');if(x){
 const card=mk('div','st-ledger',x.f);mk('p','st-ledger-head',card,'Rita akka');
 const rows=['Bleaching powder: bare hands','Gloves: none','Protective shoes: none'].map(t=>mk('p','st-ledger-row',card,t)),note=mk('p','st-ledger-note',card,'Feeds stray dogs and cats on her route');
 reg(()=>{const t=R?1:prog(x.sec);rows.forEach((e,i)=>e.classList.toggle('st-visible',R||cl((t-.5)/.12*rows.length-i)>=.98));note.classList.toggle('st-visible',R||t>=.7)})
}}

/* S40: concentric abstract sewer-cover rings; labels follow the caption timing. */
{const x=fig('s40','Abstract concentric ring with hatch lines, the year 2016, and the labels Clogged sewer, no safety gear; Left unaware of the laws.');if(x){
 const v=S('svg',{class:'st-manhole',viewBox:'0 0 420 250','aria-hidden':'true'},x.f),g=S('g',{},v);
 S('circle',{class:'st-ring',cx:210,cy:125,r:93},g);S('circle',{class:'st-ring',cx:210,cy:125,r:73},g);const ring=S('circle',{class:'st-ring-accent',cx:210,cy:125,r:54,pathLength:'1'},g);
 const hatches=[];for(let i=0;i<20;i++){const a=(i/20)*Math.PI*2,r1=61,r2=86,x1=210+Math.cos(a)*r1,y1=125+Math.sin(a)*r1,x2=210+Math.cos(a)*r2,y2=125+Math.sin(a)*r2;hatches.push(S('line',{class:'st-hatch',x1,y1,x2,y2,pathLength:'1'},g))}
 S('text',{class:'st-year',x:210,y:137},g).textContent='2016';const l1=S('text',{class:'st-small-label',x:6,y:24},v);l1.textContent='Clogged sewer, no safety gear';const l2=S('text',{class:'st-small-label st-muted','text-anchor':'end',x:414,y:238},v);l2.textContent='Left unaware of the laws';
 reg(()=>{const t=R?1:prog(x.sec),p=cl((t-.05)/.5);ring.style.strokeDashoffset=R?0:1-ease(p);hatches.forEach((a,i)=>a.style.strokeDashoffset=R?0:1-cl(p*1.3-i/20));[l1,l2].forEach(a=>a.style.opacity=R?1:cl((t-.55)/.15))})
}}

/* S43: three needs support one initially tilted, dashed platform. */
{const x=fig('s43','A three-legged table labelled Occupational dignity, supported by Safe working conditions, Fair living wages, and Genuine societal respect.');if(x){
 const v=S('svg',{class:'st-table',viewBox:'0 0 360 200','aria-hidden':'true'},x.f),platform=S('path',{class:'st-table-platform',d:'M82 62 L278 62 L255 83 L105 83 Z'},v),legs=[];
 [[115,82,91,170],[180,82,180,170],[245,82,269,170]].forEach(([x1,y1,x2,y2])=>legs.push(S('line',{class:'st-table-leg',x1,y1,x2,y2,pathLength:'1'},v)));
 S('text',{class:'st-table-label',x:180,y:76},v).textContent='Occupational dignity';
 C7.need.forEach((t,i)=>{const el=S('text',{class:'st-table-need',x:8,y:111+i*25},v);el.textContent=t});
 reg(()=>{const t=R?1:prog(x.sec),n=legs.length;let q=0;legs.forEach((line,i)=>{const a=.6+i*.2/n,z=cl((t-a)/(.2/n));q=Math.max(q,z);line.style.strokeDashoffset=1-ease(z)});const lev=ease(q);platform.setAttribute('transform','rotate('+((1-lev)*-6)+' 180 72)');platform.style.fillOpacity=(.08+lev*.92).toFixed(2);platform.style.strokeDasharray=lev>.98?'none':'7 5'})
}}

/* S45: five typographic tiles; check marks land in reading order. */
{const x=fig('s45','Checklist: Respectful titles, Thank you, Clean drinking water, Adequate restrooms, Acceptable rest.');if(x){
 const grid=mk('div','st-checklist',x.f),labels=['Respectful titles','Thank you','Clean drinking water','Adequate restrooms','Acceptable rest'],tiles=[];
 labels.forEach(t=>{const tile=mk('div','st-check',grid),icon=S('svg',{viewBox:'0 0 20 20','aria-hidden':'true'},tile);S('path',{d:'M3 10 L8 15 L18 4',pathLength:'1'},icon);mk('span','',tile,t);tiles.push(tile)});
 reg(()=>{const t=R?1:prog(x.sec),a=.06+.76/2;tiles.forEach((tile,i)=>{const on=R||cl((t-a)/.2*tiles.length-i)>=.98;tile.classList.toggle('st-lit',on)})})
}}

/* S46: unlabeled-in-scale margin bar with three text labels, no numbers. */
{const x=fig('s46','Illustrative margin bar linked to Daily survival and Children’s education, with Corporate excess crossed through.','Illustrative, not to scale');if(x){
 const v=S('svg',{class:'st-margin',viewBox:'0 0 440 190','aria-hidden':'true'},x.f);
 S('rect',{class:'st-price',x:24,y:28,width:392,height:38,rx:2},v);S('rect',{class:'st-slice',x:398,y:28,width:18,height:38},v);
 S('path',{d:'M407 68 L407 105 L140 105',},v);S('path',{d:'M407 68 L407 145 L140 145'},v);
 const daily=S('text',{x:24,y:111},v);daily.textContent='Daily survival';const education=S('text',{x:24,y:151},v);education.textContent='Children’s education';
 const excess=S('text',{class:'st-quiet',x:415,y:180,'text-anchor':'end'},v);excess.textContent='Corporate excess';
 reg(()=>{const t=R?1:prog(x.sec);v.style.opacity=R?1:cl((t-.2)/.35)})
}}

/* S48: each recap tile lights on the same stagger as its corresponding pill. */
{const x=fig('s48','Three recap visuals: a 24-hour clock arc for '+C8.st[3].p[0][0]+', a ring for '+C8.st[3].p[1][0]+', and dots for '+C8.st[3].p[2][0]+'.');if(x){
 const grid=mk('div','st-recap',x.f),tiles=[];
 C8.st[3].p.forEach((entry,i)=>{const tile=mk('div','st-recap-tile',grid),v=S('svg',{viewBox:'0 0 100 100','aria-hidden':'true'},tile);
  if(i===0){S('circle',{class:'st-clock-base',cx:50,cy:50,r:35},v);S('circle',{class:'st-clock-fill',cx:50,cy:50,r:35,pathLength:'1',transform:'rotate(-90 50 50)'},v);for(let j=0;j<12;j++){const a=j/12*Math.PI*2;S('line',{x1:50+Math.cos(a)*41,y1:50+Math.sin(a)*41,x2:50+Math.cos(a)*45,y2:50+Math.sin(a)*45,stroke:'var(--ink)','stroke-width':'1'},v)}}
  else if(i===1){S('circle',{class:'st-recap-ring',cx:50,cy:50,r:34},v);for(let j=0;j<8;j++)S('line',{class:'st-recap-hatch',x1:20+j*8,y1:30,x2:28+j*8,y2:70},v)}
  else{for(let j=0;j<25;j++)S('circle',{class:'st-recap-dots',cx:22+(j%5)*14,cy:22+Math.floor(j/5)*14,r:2.4},v)}
  mk('p','',tile,entry[0]);tiles.push(tile)
 });
 const fills=[...grid.querySelectorAll('.st-clock-fill')];
 reg(()=>{const t=R?1:prog(x.sec),n=C8.st[3].p.length,a=.06+2*.76/3;tiles.forEach((tile,j)=>{const q=cl((t-a)/.2*n-j);tile.classList.toggle('st-lit',R||q>=.98);if(fills[0]&&j===0)fills[0].style.strokeDashoffset=1-(R?1:q)})})
}}

/* S49: line scaffold assembles to support the existing labels and equity line. */
{const x=fig('s49','Line-drawn scaffold with platforms labelled The Constitution of India and ILO Decent Work Agenda, topped by equity.');if(x){
 const v=S('svg',{class:'st-scaffold',viewBox:'0 0 420 250','aria-hidden':'true'},x.f),parts=[];
 const line=(x1,y1,x2,y2,cls='')=>parts.push(S('line',{class:cls,x1,y1,x2,y2,pathLength:'1'},v));
 line(62,225,62,52);line(358,225,358,52);line(62,52,358,52);line(62,225,358,225);
 line(62,195,358,195,'st-platform');line(62,145,358,145,'st-platform');line(62,96,358,96);line(62,145,160,96);line(160,145,62,96);line(260,145,358,96);line(358,145,260,96);line(62,96,160,52);line(160,96,62,52);line(260,96,358,52);line(358,96,260,52);
 line(210,52,210,23);line(196,23,224,23);line(202,14,218,14);
 const p1=S('text',{x:210,y:164},v);p1.textContent='The Constitution of India';const p2=S('text',{x:210,y:218},v);p2.textContent='ILO Decent Work Agenda';const equity=S('text',{class:'st-equity',x:210,y:9},v);equity.textContent='equity';
 reg(()=>{const t=R?1:prog(x.sec);parts.forEach((line,i)=>line.style.strokeDashoffset=1-cl((t-.12)/.55*parts.length-i));[p1,p2,equity].forEach((el,i)=>el.style.opacity=R?1:cl((t-(.38+i*.12))/.12))})
}}
})();
