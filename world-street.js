/* world-street.js: V2 CP22. Topic 3 street world: S16W (the street comes alive) + S19 (A DAY WITHOUT THEM, scroll-driven degradation). Also V2 rail inserts. Load AFTER scenes.js and world.js. */
(function(){
const U=DOL.util,{$,R,cl,lp,prog}=U,D=DOL.content.t3,W=DOL.world;
const ins=(b,id)=>{const i=DOL.rail.indexOf(b);if(i>=0&&$('#'+id))DOL.rail.splice(i,0,id)};ins('s6','s5p');ins('s16','s16w');
/* captions come from content (t3.roles, t3.gone, t3.dayA, t3.dayB) */
$('#caps16').innerHTML=D.roles.map(r=>`<p>${r}</p>`).join('');
$('#caps19').innerHTML=[[D.dayA,''],...D.gone.map(([n,t])=>['Take away the '+n.toLowerCase()+'.',t]),[D.dayB[0],D.dayB[1]]].map(([b,s])=>`<p><b>${b}</b>${s?`<span>${s}</span>`:''}</p>`).join('');
if(!W||!window.THREE){['s16w','s19'].forEach(i=>$('#'+i).classList.add('nogl'));return}
const{M,B,C,S,add,E,mob,T}=W.h,mk=W.mk,rnd=i=>Math.abs(Math.sin(i*127.1)*43758.5453)%1,SK=['#8d5a3b','#a86c47','#b97a56','#6f4630'];
const person=(g,x,z,shirt,k,ry)=>{const p=new T.Group();p.position.set(x,0,z);p.rotation.y=ry||0;
 add(new T.Mesh(new T.CapsuleGeometry(.2,.55,3,10),M(shirt)),0,.82,0,p);S(.17,SK[k%4],0,1.46,0,p);
 C(.075,.075,.5,'#2b2b33',-.1,.25,0,p);C(.075,.075,.5,'#2b2b33',.1,.25,0,p);g.add(p);return p};
/* the street: vendors (S16W) + sweeper, trash, food, commuters, office windows (S19) */
const street=sc=>{const H={vend:[],food:[],win:[],trash:[],piles:[],comm:[],sweep:null};
 B(34,.2,16,'#2a2620',0,-.1,-1,sc);B(34,.22,3.4,'#3a352d',0,.01,-2.5,sc);for(let i=-6;i<6;i++)B(1.4,.02,.18,'#F2A900',i*2.8,.02,3.4,sc);
 const V=(x,fn)=>{const g=new T.Group();g.position.set(x,.12,-2.3);sc.add(g);fn(g);H.vend.push(g)};
 V(-7.5,g=>{mk.stall(g);person(g,-.2,-.9,'#2A56C6',0)});
 V(-4.2,g=>{person(g,0,0,'#1FAA6B',1);C(.02,.02,1.9,'#8a6a3a',.55,.95,.1,g);
  ['#E4572E','#F2A900','#2A56C6','#1FAA6B','#F25C54','#F2A900','#E4572E','#2A56C6','#F25C54'].forEach((c,i)=>{S(.22,c,.55+Math.sin(i*2.1)*.35,2.2+(i%3)*.3,.1+Math.cos(i*2.1)*.15,g).scale.y=1.25})});
 V(-1,g=>{B(1.3,.7,.6,'#7a4b2a',0,.35,0,g);B(1.4,.06,.7,'#b98a52',0,.73,0,g);const cs=['#E4572E','#F2A900','#2A56C6','#1FAA6B','#F25C54','#E8DCC0'];
  for(let k=0;k<6;k++)for(let j=0;j<4;j++)add(new T.Mesh(new T.TorusGeometry(.13,.025,6,16),M(cs[k])),-.5+k*.2,.8+j*.055,.05,g).rotation.x=Math.PI/2;person(g,0,-.85,'#F25C54',2)});
 V(2.3,g=>{mk.cart(g);g.traverse(o=>o.geometry&&o.geometry.type==='SphereGeometry'&&H.food.push(o));person(g,0,-1,'#E07B3C',3);
  B(.7,.35,.5,'#b98a52',-1.6,.18,.2,g);for(let i=0;i<4;i++)H.food.push(S(.12,i%2?'#6aa84f':'#F2A900',-1.8+i*.12,.45,.2+(i%2)*.1,g))});
 V(5.6,g=>{B(.9,.1,.35,'#3b2a1a',0,.55,0,g);[-.35,.35].forEach(x=>B(.07,.55,.07,'#3b2a1a',x,.27,0,g));C(.3,.3,.1,'#9a9a95',0,.95,0,g).rotation.x=Math.PI/2;
  for(let i=0;i<6;i++)S(.03,'#ffd27a',.35+i*.07,.95+Math.sin(i*2)*.15,.1,g,{emissive:'#ffb347',emissiveIntensity:2});person(g,0,-.7,'#7A1F2E',0)});
 const sw=new T.Group();sw.position.set(8.2,0,.6);sc.add(sw);person(sw,0,0,'#FF7A2B',1);const bg=new T.Group();bg.position.set(.5,0,.1);mk.broom(bg);sw.add(bg);H.sweep=sw;
 const N=mob()?40:80,cols=['#6b5f4a','#8a8a7a','#9c4a2f','#c9c2a8','#4a4a40'];
 for(let i=0;i<N;i++){const z=-1.3+rnd(i+50)*3.9,t=add(new T.Mesh(i%3?new T.BoxGeometry(.2,.12,.2):new T.SphereGeometry(.13,6,5),M(cols[i%5])),(rnd(i)-.5)*19,(z<-.8?.12:0)+.07,z,sc);t.rotation.y=i;t.scale.setScalar(.001);H.trash.push(t)}
 [-6.5,.8,7].forEach((x,k)=>{const p=new T.Group();p.position.set(x,0,1.4);sc.add(p);for(let i=0;i<7;i++)B(.3+rnd(i+k)*.3,.25,.3+rnd(i+9)*.2,cols[(i+k)%5],(rnd(i+k*3)-.5)*.9,.12+(i>3?.22:0),(rnd(i+k*5)-.5)*.5,p);p.scale.setScalar(.001);H.piles.push(p)});
 [-9.4,-5.9,-2.6,1,4.5,7].forEach((x,i)=>H.comm.push(person(sc,x,.9,['#2b2f3a','#33281f','#1f2a44'][i%3],i,.3)));
 const cg=new T.Group();sc.add(cg);mk.city(cg);cg.traverse(o=>{if(o.material&&o.material.isMeshBasicMaterial&&o.material.color.getHex()===0xffd27a)H.win.push({m:o.material,r:rnd(H.win.length+3)})});return H};
const apply=(H,s)=>{H.sweep.scale.setScalar(Math.max(1-s.sw,.001));
 H.trash.forEach((t,i)=>t.scale.setScalar(Math.max(E(cl(s.tr*3-i/H.trash.length*2)),.001)));H.piles.forEach(p=>p.scale.setScalar(Math.max(E(s.tr),.001)));
 H.food.forEach((f,i)=>f.scale.setScalar(Math.max(1-E(cl(s.fd*3-rnd(i+7)*2)),.001)));
 H.comm.forEach((p,i)=>p.scale.setScalar(Math.max(1-E(cl(s.cm*(H.comm.length+1)-i)),.001)));
 H.win.forEach(w=>{const d=w.r<s.wn;if(w.d!==d){w.d=d;w.m.color.setHex(d?0x23252f:0xffd27a)}})};
const ptr={x:0,y:0};if(!R)addEventListener('pointermove',e=>{ptr.x=e.clientX/innerWidth*2-1;ptr.y=e.clientY/innerHeight*2-1},{passive:true});
/* stage: one renderer per section, runs only while the section is on screen */
const stage=(id,cid,upd)=>{const el=$('#'+id),cv=$('#'+cid);let r;
 try{r=new T.WebGLRenderer({canvas:cv,antialias:innerWidth>760,alpha:true,powerPreference:'low-power'})}catch(e){}
 if(!r){el.classList.add('nogl');return}
 cv.addEventListener('webglcontextlost',e=>{e.preventDefault();el.classList.add('nogl')});
 const sc=new T.Scene(),cam=new T.PerspectiveCamera(38,1,.1,90),amb=new T.AmbientLight(0xffe2b0,.5),key=new T.DirectionalLight(0xfff0d0,1),pl=new T.PointLight(0xffa94d,1.6,18);
 sc.fog=new T.Fog(0x16150F,26,56);key.position.set(5,9,7);sc.add(amb,key,pl);
 const H=street(sc),caps=[...el.querySelectorAll('.caps p')];let cp=0,px=0,py=0,vis=false,raf=0;
 const size=()=>{const w=cv.clientWidth,h=cv.clientHeight;if(!w||!h)return;r.setPixelRatio(Math.min(devicePixelRatio||1,mob()?1.5:1.75));r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()};
 new ResizeObserver(size).observe(cv);size();
 const fr=()=>{raf=0;if(!vis)return;const tp=prog(el);cp=R?tp:cp+(tp-cp)*.12;px=R?0:px+(ptr.x-px)*.06;py=R?0:py+(ptr.y-py)*.06;
  pl.position.set(px*4,4-py*2,6);upd({cp,H,cam,amb,key,cv,px,py});
  const n=caps.length;caps.forEach((c,i)=>{const d=cp/.95*n-i-.5;c.style.opacity=cl(1.3-Math.abs(d)*2.8);c.style.transform=`translateY(${cl(d,-1,1)*-18}px)`});
  r.render(sc,cam);raf=requestAnimationFrame(fr)};
 new IntersectionObserver(([e])=>{vis=e.isIntersecting;if(vis&&!raf)raf=requestAnimationFrame(fr)},{rootMargin:'10% 0px'}).observe(el);return H};
const VX=[-7.5,-4.2,-1,2.3,5.6],cal=(cam,P,Tg,k)=>{cam.position.set(Tg[0]+(P[0]-Tg[0])*k,Tg[1]+(P[1]-Tg[1])*k,Tg[2]+(P[2]-Tg[2])*k);cam.lookAt(Tg[0],Tg[1],Tg[2])};
/* S16W: vendors appear one by one, camera dollies along the street */
const H16=stage('s16w','glt',({cp,H,cam,px,py})=>{const f=cl(cp/.95)*4,i=Math.min(3,f|0),cx=lp(VX[i],VX[i+1],E(f-i));
 H.vend.forEach((g,j)=>{const e=E(cl(f-j+.9));g.visible=e>0;g.scale.setScalar(Math.max(e,.001))});
 cal(cam,[cx+px*.6,3.4-py*.3,11],[cx,1.5,-2],mob()?1.75:1)});
if(H16)apply(H16,{sw:0,tr:0,fd:0,cm:0,wn:0});
/* S19: A DAY WITHOUT THEM. Sanitation -> waste; agriculture/supply -> food; domestic/care -> workforce + office lights. Visual degradation, not horror. */
stage('s19','gls',({cp,H,cam,amb,key,cv,px,py})=>{const d=E(cl((cp-.2)/.7));
 apply(H,{sw:cl((cp-.2)/.05),tr:cl((cp-.22)/.2),fd:cl((cp-.42)/.18),cm:cl((cp-.62)/.14),wn:cl((cp-.62)/.18)});
 amb.intensity=lp(.5,.22,d);key.intensity=lp(1,.5,d);cv.style.filter=`saturate(${lp(1,.3,d).toFixed(2)}) brightness(${lp(1,.82,d).toFixed(2)})`;
 const m=mob(),cx=m?lp(-3.5,3.5,cp):0;cal(cam,[cx+.5+px*.6,3.6-py*.3,lp(17,14.5,E(cl((cp-.6)/.4)))],[cx,1.3,-1],m?1.9:1)});
})();
