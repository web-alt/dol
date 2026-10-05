/* scenes-t1.js: Topic 1 scenes S1-S9. Needs content.js + core.js */
(function(){
const C=DOL.content.t1,{$,R,cl,lp,prog}=DOL.util,reg=f=>DOL.scenes.push(f);
DOL.rail.push('s1','s2','s3','s4','s5','s6','s7','s8','s9');
/* S2 */
const objs=$('#objs'),chain=$('#chain');
C.objects.forEach((o,i)=>{const li=document.createElement('li'),b=document.createElement('button');b.textContent=o.n;b.setAttribute('aria-pressed','false');
 b.onclick=b.onmouseenter=()=>{objs.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed','false'));b.setAttribute('aria-pressed','true');
  chain.innerHTML=o.c.map((t,k)=>`<li style="animation-delay:${R?0:k*.12}s">${t}</li>`).join('')};
 li.append(b);objs.append(li);if(!i)b.onclick()});
/* S3 */
const tabs=$('#ltabs');Object.keys(C.words).forEach(k=>{const b=document.createElement('button');b.textContent=k;b.setAttribute('role','tab');b.setAttribute('aria-selected','false');
 b.onclick=()=>{tabs.querySelectorAll('button').forEach(x=>x.setAttribute('aria-selected',x===b));$('#ldef').textContent=C.words[k]};tabs.append(b)});
const toil=$('#toil');reg(()=>{const r=toil.getBoundingClientRect();toil.style.setProperty('--w',Math.round(lp(200,800,cl(1-(r.top)/innerHeight))))});
/* S4: sizes scale down on short viewports (k) so the 7 rows always fit */
const lad=$('#ladder'),n=C.ladder.length;C.ladder.forEach(t=>{const li=document.createElement('li');li.textContent=t;lad.append(li)});
const s4=$('#s4'),ver=$('#verdict');
reg(()=>{const p=cl((prog(s4)-.1)/.6),k=Math.min(1,innerHeight*.66/(innerWidth*.47));
 [...lad.children].forEach((li,i)=>{const r=i/(n-1),sz=lp(lp(9.5,3.2,r),5,p)*k;li.style.fontSize=sz+'vw';
  li.style.transform=`translateX(${lp((1-r)*14,0,p)}vw)`;li.style.opacity=lp(1-r*.8,1,p)});
 lad.style.setProperty('--b',p);ver.style.opacity=cl((prog(s4)-.75)/.15)});
/* S5 */
const f=$('#field'),svg=$('#edges'),ro=$('#readout'),pos=C.jobs.map(j=>({x:j.x,y:j.y})),nodes=[],lines=[];let sel=-1,gone=-1;
C.edges.forEach(()=>{const l=document.createElementNS('http://www.w3.org/2000/svg','line');svg.append(l);lines.push(l)});
const draw=()=>{const w=f.clientWidth,h=f.clientHeight;nodes.forEach((e,i)=>{const hw=e.offsetWidth/2/w*100,hh=e.offsetHeight/2/h*100;e.style.left=cl(pos[i].x,hw,100-hw)+'%';e.style.top=cl(pos[i].y,hh,100-hh)+'%'});
 C.edges.forEach(([a,b],k)=>{const l=lines[k];const cx=i=>cl(pos[i].x,nodes[i].offsetWidth/2/w*100,100-nodes[i].offsetWidth/2/w*100)*w/100,cy=i=>cl(pos[i].y,nodes[i].offsetHeight/2/h*100,100-nodes[i].offsetHeight/2/h*100)*h/100;l.setAttribute('x1',cx(a));l.setAttribute('y1',cy(a));l.setAttribute('x2',cx(b));l.setAttribute('y2',cy(b));
 const rel=sel>=0&&(a==sel||b==sel);l.classList.toggle('dim',sel>=0&&!rel);l.style.strokeWidth=rel?4:1.5});
 nodes.forEach((e,i)=>{const nb=sel>=0&&C.edges.some(([a,b])=>(a==sel&&b==i)||(b==sel&&a==i));
  e.classList.toggle('on',i==sel);e.classList.toggle('gone',i==gone);e.classList.toggle('dim',sel>=0&&i!=sel&&!nb&&gone<0||(gone>=0&&i!=gone&&!C.edges.some(([a,b])=>(a==gone&&b==i)||(b==gone&&a==i))))})};
const show=i=>{sel=i;gone=-1;const j=C.jobs[i],k=C.edges.filter(([a,b])=>a==i||b==i).length;
 ro.innerHTML=`<b>${j.n}</b> ${j.t}. Connected to ${k} other kinds of work. <br><button>Take this work away</button>`;
 ro.querySelector('button').onclick=()=>{gone=i;ro.innerHTML=`Without the ${j.n.toLowerCase()}, the ${k} kinds of work still linked to it are left short. Work connects, so no link is “small”.<br><button>Bring it back</button>`;ro.querySelector('button').onclick=()=>show(i);draw()};draw()};
C.jobs.forEach((j,i)=>{const e=document.createElement('button');e.className='node';e.textContent=j.n;f.append(e);nodes.push(e);let d=0;
 e.onpointerdown=ev=>{d=1;e.setPointerCapture(ev.pointerId);show(i)};
 e.onpointermove=ev=>{if(!d)return;const r=f.getBoundingClientRect();pos[i]={x:cl((ev.clientX-r.left)/r.width*100,4,96),y:cl((ev.clientY-r.top)/r.height*100,4,96)};draw()};
 e.onpointerup=()=>d=0;e.onkeydown=ev=>{if(ev.key=='Enter')show(i)};e.tabIndex=0});
ro.textContent='Select a kind of work.';addEventListener('resize',draw);draw();
/* S6 */
const day=$('#day'),mins=$('#mins'),s6=$('#s6');day.innerHTML=`<svg viewBox="0 0 200 200" aria-hidden="true"><circle class="trk" cx="100" cy="100" r="68"/><circle class="arc" cx="100" cy="100" r="68" transform="rotate(-90 100 100)"/>${[...Array(24)].map((_,i)=>`<line x1="100" y1="${i%6?14:10}" x2="100" y2="20" transform="rotate(${i*15} 100 100)"/>`).join('')}<text x="100" y="8" class="t">0</text><text x="195" y="103" class="t">6</text><text x="100" y="198" class="t">12</text><text x="5" y="103" class="t">18</text><text x="100" y="108" class="h" id="clk">0.0 h</text><text x="100" y="124" class="o">of 24</text></svg>`;
const arc=day.querySelector('.arc'),clk=day.querySelector('#clk'),CI=2*Math.PI*68;arc.style.strokeDasharray=CI;
reg(()=>{const p=cl((prog(s6)-.1)/.6),m=337*p;mins.textContent=Math.round(m);arc.style.strokeDashoffset=CI*(1-m/1440);clk.textContent=(m/60).toFixed(1)+' h'});
const tk=$('#tasks');C.tasks.forEach(([nm,k])=>{const li=document.createElement('li'),b=document.createElement('button');b.textContent=nm;b.setAttribute('aria-pressed','false');
 b.onclick=()=>{const on=b.getAttribute('aria-pressed')!='true';b.setAttribute('aria-pressed',on);b.dataset.k=on?'Unpaid '+k+' work':''};li.append(b);tk.append(li)});
/* S7 */
const words=(el,t,hot=[])=>{el.innerHTML=t.split(' ').map(w=>`<span class="w${hot.some(h=>w.startsWith(h))?' hot':''}">${w}</span>`).join(' ')};
words($('#q1'),C.q1,C.hot1);$('#c1').innerHTML=C.c1;words($('#q2'),C.q2);$('#c2').innerHTML=C.c2;
const s7=$('#s7');reg(()=>{const p=cl((prog(s7)-.05)/.75),ws=[...$('#q1').children];ws.forEach((w,i)=>w.style.opacity=R?1:lp(.12,1,cl(p*ws.length-i)))});
const s7b=$('#s7b');reg(()=>{const p=cl((innerHeight*.85-s7b.getBoundingClientRect().top)/(innerHeight*.45)),ws=[...$('#q2').children];ws.forEach((w,i)=>w.style.opacity=R?1:lp(.12,1,cl(p*ws.length-i)))});
/* S8, S9 */
new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add('in')),{threshold:.4}).observe($('#s8'));
const s9=$('#s9'),why=$('#why');reg(()=>why.style.setProperty('--o',cl((prog(s9)-.3)/.25)));
})();
/* scenes-t2.js: Topic 2 scenes S10-S14 (+S12b quote). Needs content.js, content-t2.js, core.js */
(function(){
const C=DOL.content.t2,{$,R,cl,lp,prog}=DOL.util,reg=f=>DOL.scenes.push(f);
DOL.rail.push('s10','s11','s12','s13','s14');
const words=(el,t,hot=[])=>{el.innerHTML=t.split(' ').map(w=>`<span class="w${hot.some(h=>w.startsWith(h))?' hot':''}">${w}</span>`).join(' ')};
const reveal=(ws,p)=>ws.forEach((w,i)=>w.style.opacity=R?1:lp(.12,1,cl(p*ws.length-i)));
/* S11: take the work away */
const pr=$('#pairs');pr.innerHTML=C.pairs.map(([w,e])=>`<li><span class="wk"><span>${w}</span></span><span class="ef"><span>${e}</span></span></li>`).join('');
const s11=$('#s11'),wks=[...pr.querySelectorAll('.wk')],efs=[...pr.querySelectorAll('.ef')],ch=$('#charity');
reg(()=>{const p=cl((prog(s11)-.08)/.72)*3;wks.forEach((w,i)=>{const q=cl(p-i);w.style.setProperty('--s',cl(q/.4));efs[i].style.opacity=cl((q-.4)/.4)});ch.style.opacity=cl(p-2)});
/* S12: bread labour */
const bt=$('#bt');bt.innerHTML=C.tasks.map(t=>`<li>${t}</li>`).join('');
const s12=$('#s12');reg(()=>{const p=cl((prog(s12)-.1)/.7)*3;[...bt.children].forEach((li,i)=>li.style.opacity=lp(.1,1,cl(p-i)))});
words($('#q3'),C.q3);$('#c3').innerHTML=C.c3;
const s12b=$('#s12b');reg(()=>reveal([...$('#q3').children],cl((innerHeight*.85-s12b.getBoundingClientRect().top)/(innerHeight*.45))));
/* S13: a division of labourers */
words($('#q4'),C.q4,C.hot4);$('#c4').innerHTML=C.c4;
$('#bar1').innerHTML='<i></i>';const b2=$('#bar2');b2.innerHTML='<i></i>'.repeat(6);
const s13=$('#s13');reg(()=>{const t=prog(s13);reveal([...$('#q4').children],cl((t-.05)/.45));b2.style.setProperty('--g',cl((t-.5)/.3))});
/* S14: Labour Day */
const s14=$('#s14'),yr=$('#yr'),yl=$('#yl'),e1=$('#e1'),e2=$('#e2'),sy=$('#sym'),sw=$('#symw');
sy.innerHTML=C.sym.map(t=>`<li>${t}</li>`).join('');
reg(()=>{const p=cl((prog(s14)-.05)/.8);yr.textContent=Math.round(lp(1886,1923,cl((p-.3)/.2)));yl.textContent=p<.4?C.place[0]:C.place[1];
 e1.style.opacity=1-cl((p-.28)/.12);e2.style.opacity=cl((p-.45)/.12);sw.style.opacity=cl((p-.6)/.05);
 [...sy.children].forEach((li,i)=>li.style.opacity=cl((p-.62)/.38*6-i))});
})();
/* scenes-t3.js: Topic 3 scenes S15-S20. Needs content.js, content-t3.js, core.js */
(function(){
const C=DOL.content.t3,{$,R,cl,lp,prog}=DOL.util,reg=f=>DOL.scenes.push(f);
DOL.rail.push('s15','s16','s17','s18','s19','s20');
const li=a=>a.map(t=>`<li>${t}</li>`).join('');
/* S16: the street economy */
const ro=$('#roles'),fc=$('#faces'),bl=$('#bl2'),fw=$('#facew');ro.innerHTML=li(C.roles);fc.innerHTML=li(C.faces);
const s16=$('#s16');reg(()=>{const p=cl((prog(s16)-.08)/.8);[...ro.children].forEach((e,i)=>e.style.opacity=lp(.12,1,cl(p*8-i)));
 bl.style.opacity=cl((p-.45)/.1);fw.style.opacity=cl((p-.62)/.05);[...fc.children].forEach((e,i)=>e.style.opacity=cl((p-.65)/.35*5-i))});
/* S17: the 2014 Act */
const tv=$('#tvc'),pc=$('#pct'),s17=$('#s17');for(let i=0;i<10;i++)tv.append(document.createElement('i'));
reg(()=>{const m=40*cl((prog(s17)-.1)/.6);pc.textContent=Math.round(m)+'%';[...tv.children].forEach((c,i)=>c.style.setProperty('--f',cl(m/10-i)*100+'%'))});
/* S18: essential and unseen */
const un=$('#unseen'),ih=$('#inv'),s18=$('#s18');un.innerHTML=li(C.unseen);
reg(()=>{const p=cl((prog(s18)-.1)/.6);[...un.children].forEach(e=>e.style.opacity=lp(1,.12,p));ih.style.opacity=cl((p-.5)/.4)});
/* S19: a day without them */
const gl=$('#gl'),out=$('#out');
C.gone.forEach(([n,t,k],i)=>{const l=document.createElement('li'),b=document.createElement('button');b.textContent=n;b.setAttribute('aria-pressed','false');
 b.onclick=b.onmouseenter=()=>{gl.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed','false'));b.setAttribute('aria-pressed','true');out.innerHTML=t};
 l.append(b);gl.append(l);if(!i)b.onclick()});
/* S20: safai karamcharis */
const dt=$('#dots'),sb=$('#sub'),s20=$('#s20');for(let i=0;i<50;i++)dt.append(document.createElement('i'));
reg(()=>{const t=prog(s20),n=50*cl((t-.05)/.5);[...dt.children].forEach((c,i)=>c.style.setProperty('--f',cl(n-i)*100+'%'));sb.style.opacity=cl((t-.6)/.2)});
})();
/* scenes-t4.js: Topic 4 scenes S21-S24. Needs content.js, content-t4.js, core.js */
(function(){
const C=DOL.content.t4,{$,R,cl,lp,prog}=DOL.util,reg=f=>DOL.scenes.push(f);
DOL.rail.push('s21','s22','s23','s24');
const li=a=>a.map(t=>`<li>${t}</li>`).join('');
/* S22: UDHR Articles 23 and 24 */
const a3=$('#a23'),a4=$('#a24'),w3=$('#a23w'),w4=$('#a24w'),uc=$('#udc'),s22=$('#s22');a3.innerHTML=li(C.a23);a4.innerHTML=li(C.a24);
reg(()=>{const p=cl((prog(s22)-.08)/.8);w3.style.opacity=cl((p-.05)/.05);[...a3.children].forEach((e,i)=>e.style.opacity=cl((p-.08)/.4*6-i));
 w4.style.opacity=cl((p-.5)/.05);[...a4.children].forEach((e,i)=>e.style.opacity=cl((p-.53)/.2*3-i));uc.style.opacity=cl((p-.8)/.15)});
/* S23: Constitution of India */
const ar=$('#arts'),as=$('#asi'),ac=$('#asic'),s23=$('#s23');
ar.innerHTML=C.arts.map(([a,t,k])=>`<li><b>${a}</b><span>${t}</span></li>`).join('');
reg(()=>{const p=cl((prog(s23)-.08)/.8);[...ar.children].forEach((e,i)=>e.style.opacity=lp(.12,1,cl(p/.55*4-i)));as.style.opacity=cl((p-.6)/.15);ac.style.opacity=cl((p-.78)/.15)});
/* S24: four pillars of decent work */
const pl=$('#pil'),sg=$('#sdg'),s24=$('#s24');
pl.innerHTML=C.pillars.map(([h,t])=>`<li><i></i><h3>${h}</h3><p>${t}</p></li>`).join('');
reg(()=>{const p=cl((prog(s24)-.08)/.8);[...pl.children].forEach((e,i)=>{const q=cl(p/.7*4-i);e.style.setProperty('--h',q);e.style.opacity=lp(.15,1,q)});sg.style.opacity=cl((p-.8)/.15)});
})();
/* scenes-t5.js: Topic 5 scenes S25-S28. Needs content.js, content-t5.js, core.js */
(function(){
const C=DOL.content.t5,{$,R,cl,lp,prog}=DOL.util,reg=f=>DOL.scenes.push(f);
DOL.rail.push('s25','s26','s27','s28');
const li=a=>a.map(t=>`<li>${t}</li>`).join('');
/* S26: stigma */
const ro=$('#r5'),lw=$('#lblw'),lb=$('#lbl'),sc=$('#stc'),sp=$('#stp'),s26=$('#s26');ro.innerHTML=li(C.roles);lb.innerHTML=li(C.labels);
reg(()=>{const p=cl((prog(s26)-.08)/.8);[...ro.children].forEach((e,i)=>e.style.opacity=lp(.12,1,cl(p/.35*4-i)));
 lw.style.opacity=cl((p-.4)/.05);[...lb.children].forEach((e,i)=>e.style.opacity=cl((p-.42)/.15*2-i));sc.style.opacity=cl((p-.62)/.12);sp.style.opacity=cl((p-.78)/.12)});
/* S27: manual scavenging, 1993 to 2014 */
const my=$('#my'),ml=$('#ml'),ev=$('#mev'),s27=$('#s27');
ev.innerHTML=C.st.map(([y,l,t])=>`<p>${t}</p>`).join('');
const tf=$('#tlf'),ta=$('#tla'),tn=$('#tln'),ty=$('#tly'),tc=[$('#tc1'),$('#tc2'),$('#tc3')];
reg(()=>{const p=cl((prog(s27)-.05)/.85),s=p<.2?0:p<.45?1:p<.7?2:3;my.textContent=C.st[s][0];ml.textContent=C.st[s][1];[...ev.children].forEach((e,i)=>e.style.opacity=i==s?1:0);
 const f=cl((p-.08)/.14),g=cl((p-.58)/.2);tf.style.strokeDashoffset=1-f;ta.style.strokeDashoffset=1-g;ty.style.opacity=f>.98?1:0;tn.style.opacity=g>.9?1:0;
 tc.forEach((c,i)=>c.classList.toggle('on',i<=Math.min(s,2)&&(i!==1||f>.98)));tc[0].classList.add('on')});
/* S28: Chennai strike, NAMASTE */
const nn=$('#nn'),nl=$('#nl'),la=$('#nla'),ea=$('#nea'),eb=$('#neb'),s28=$('#s28');
reg(()=>{const p=cl((prog(s28)-.05)/.85),b=p>.5;
 nn.textContent=b?Math.round(88448*cl((p-.55)/.25)).toLocaleString('en-IN')+'+':Math.round(130*cl((p-.05)/.25));
 nl.textContent=b?'Sewer and Septic Tank Workers validated under NAMASTE by late 2025':'days of hunger strike by Dalit sanitation workers in Chennai';
 la.textContent=b?'Rights respected: a policy response.':'Rights violated: Chennai.';
 ea.style.opacity=b?0:1;eb.style.opacity=b?1:0});
})();
/* scenes-t6.js: Topic 6 scenes S29-S35. Needs content.js (t6), core.js */
(function(){
const C=DOL.content.t6,{$,R,cl,lp,prog}=DOL.util,reg=f=>DOL.scenes.push(f);
DOL.rail.push('s29','s30','s31','s32','s33','s34','s35');
/* S30: workforce at a glance */
const mx=$('#mix'),lg=$('#lg'),em=$('#emp'),s30=$('#s30');
mx.innerHTML=C.emp.map(([n,v],i)=>`<i class="k${i}" style="--w:${v}"></i>`).join('');
lg.innerHTML=C.emp.map(([n,v],i)=>`<li><i class="k${i}"></i>${n} ~${v}%</li>`).join('');
reg(()=>{const p=cl((prog(s30)-.1)/.6);em.textContent='~'+(C.emp[0][1]*p).toFixed(1)+'%';mx.style.setProperty('--p',p);lg.style.opacity=cl((p-.8)/.2)});
/* S31: gig and platform economy */
const gn=$('#gn'),gt=$('#gt'),gs=$('#gsi'),gp=$('#gp'),s31=$('#s31');let gl=-1;
reg(()=>{const p=cl((prog(s31)-.05)/.85),b=p>.5?1:0,g=C.gig[b],q=b?cl((p-.5)/.4):cl(p/.4);
 gn.textContent=(b?lp(C.gig[0][0],g[0],q):g[0]*q).toFixed(1);gs.style.setProperty('--v',b?lp(C.gig[0][3],g[3],q):g[3]*q);
 if(b!==gl){gl=b;gt.textContent=g[1];gp.innerHTML=g[2]}});
/* S32: outside the safety net */
const lw=$('#lw'),ls=$('#lost'),ac=$('#acc'),av=$('#avc'),ap=$('#acp'),s32=$('#s32');
ls.innerHTML=C.lost.map(t=>`<li>${t}</li>`).join('');for(let i=0;i<10;i++)av.append(document.createElement('i'));
reg(()=>{const p=cl((prog(s32)-.08)/.8),m=27*cl((p-.5)/.3);lw.style.opacity=cl((p-.02)/.05);[...ls.children].forEach((e,i)=>e.style.opacity=cl((p-.05)/.4*4-i));
 ac.textContent=Math.round(m)+'%';[...av.children].forEach((c,i)=>c.style.setProperty('--f',cl(m/10-i)*100+'%'));ap.style.opacity=cl((p-.85)/.1)});
/* S33: gender gap */
const fl=$('#fl'),gf=$('#gf'),gm=$('#gm'),gc=$('#gcp'),s33=$('#s33');
reg(()=>{const p=cl((prog(s33)-.1)/.6);fl.textContent=(C.fl*p).toFixed(1)+'%';gf.style.setProperty('--v',C.fl*p);gm.style.setProperty('--v',C.ml*p);gc.style.opacity=cl((p-.8)/.2)});
/* S34: Code on Social Security */
const cd=$('#cd'),cc=$('#cc'),s34=$('#s34');
reg(()=>{const p=cl((prog(s34)-.08)/.8);cd.style.opacity=cl((p-.05)/.15);cc.style.opacity=cl((p-.3)/.25)});
/* S35: e-Shram */
const en=$('#es'),ec=$('#ec'),s35=$('#s35');
reg(()=>{const p=cl((prog(s35)-.1)/.6);en.textContent=(C.es*p).toFixed(2)+'+';ec.style.opacity=cl((p-.85)/.15)});
})();
/* scenes-t7.js: Topic 7 scenes S36-S43 (S39, S42 are quote scenes, not in the rail). Needs content.js (t7), core.js */
(function(){
const C=DOL.content.t7,{$,R,cl,lp,prog}=DOL.util,reg=f=>DOL.scenes.push(f);
DOL.rail.push('s36','s37','s38','s40','s41','s43');
const words=(el,t,hot=[])=>{el.innerHTML=t.split(' ').map(w=>`<span class="w${hot.some(h=>w.startsWith(h))?' hot':''}">${w}</span>`).join(' ')};
const reveal=(ws,p)=>ws.forEach((w,i)=>w.style.opacity=R?1:lp(.12,1,cl(p*ws.length-i)));
const inr=n=>'\u20b9'+Math.round(n).toLocaleString('en-IN');
/* S37, S38, S41: one figure each, then the account */
[['s37','rita',inr],['s38','amulu',n=>Math.round(n)+'+'],['s41','bhateri',inr]].forEach(([id,k,f])=>{
 const e=$('#'+id),d=C[k],v=e.querySelector('.v'),u=e.querySelector('.u'),c=e.querySelector('.cap'),z=e.querySelector('.z');
 u.innerHTML=d.u;c.innerHTML=d.c;if(z)z.innerHTML=d.z;
 reg(()=>{const t=prog(e),p=cl((t-.08)/.45);v.textContent=f(d.n*p);c.style.opacity=cl((t-.5)/.12);if(z)z.style.opacity=cl((t-.7)/.12)})});
/* S39, S42: quote scenes */
[['s39','q5','c5'],['s42','q7','c7']].forEach(([id,q,c])=>{
 words($('#'+q),C[q].t,C[q].h);$('#'+c).innerHTML=C[q].c;const e=$('#'+id);
 reg(()=>reveal([...$('#'+q).children],cl((innerHeight*.85-e.getBoundingClientRect().top)/(innerHeight*.45))))});
/* S40: Mangamma */
words($('#q6'),C.q6.t,C.q6.h);$('#c6').innerHTML=C.q6.c;$('#mc').innerHTML=C.m.c;
const s40=$('#s40'),mc=$('#mc');
reg(()=>{const t=prog(s40);reveal([...$('#q6').children],cl((t-.05)/.45));mc.style.opacity=cl((t-.55)/.15)});
/* S43: lessons */
const s43=$('#s43'),l7d=$('#l7d'),l7c=$('#l7c'),l7w=$('#l7w'),l7p=$('#l7p');
l7d.innerHTML=C.ld;l7c.innerHTML=C.lc.map(([t])=>t).join(' ');
$('#l7s').innerHTML=C.needl;l7p.innerHTML=C.need.map(t=>`<li>${t}</li>`).join('');
reg(()=>{const t=prog(s43);l7d.style.opacity=cl((t-.06)/.15);l7c.style.opacity=cl((t-.28)/.2);l7w.style.opacity=cl((t-.55)/.08);[...l7p.children].forEach((e,i)=>e.style.opacity=cl((t-.6)/.2*3-i))});
})();
/* scenes-t8.js: Topic 8 scenes S44-S50 (S44 title is static). Needs content.js (t8), core.js */
(function(){
const C=DOL.content.t8,{$,R,cl,prog}=DOL.util,reg=f=>DOL.scenes.push(f);
DOL.rail.push('s44','s45','s46','s47','s48','s49','s50');
const m=t=>t.replace('{}','');
C.st.forEach(d=>{const e=$('#'+d.id),q=s=>e.querySelector(s),h=q('h2.charity'),c=q('.cap'),qt=q('.q8'),so=q('.soft'),ul=q('.sym'),pn=q('.plan'),fn=q('.fin');
 q('.lede').textContent=d.l;h.innerHTML=m(d.h);if(c)c.innerHTML=m(d.c);if(qt)qt.innerHTML=m(d.q);if(so)so.textContent=d.pl;
 if(ul)ul.innerHTML=d.p.map(([t])=>`<li>${m(t)}</li>`).join('');
 if(pn)pn.innerHTML=C.plan.map(([a,b])=>`<li><b>${a}</b>${b}</li>`).join('');
 if(fn)fn.textContent=C.fin;
 const g=[...e.querySelectorAll('h2.charity,.cap,.q8,.symw,.plan,.fin')],n=g.length,li=[...e.querySelectorAll('.sym li,.plan li')];
 reg(()=>{const t=prog(e);g.forEach((x,i)=>{const a=.06+i*.76/n,v=R?1:cl((t-a)/.1);
  if(x.matches('.symw,.plan')){x.style.opacity=1;li.filter(l=>x.contains(l)).forEach((l,j,A)=>l.style.opacity=R?1:cl((t-a)/.2*A.length-j))}else x.style.opacity=v})})});
})();
