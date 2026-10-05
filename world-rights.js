/* world-rights.js: V2 CP23. Topic 4 S22W "Three frameworks": interactive 3D model. Bay A = UDHR Articles 23+24 (9 tiles = 9 provisions), bay B = Constitution (4 article blocks), bay C = Decent Work (4 pillars), one roof. Scroll builds it; pointer/tap/buttons/chips explore it. Load AFTER world.js, scenes.js (needs DOL.world.h, DOL.content.t4). Own renderer, rAF only while visible. */
(function(){
const U=DOL.util,{$,R,cl,lp,prog}=U,W=DOL.world,el=$('#s22w');
if(!el)return;
const i0=DOL.rail.indexOf('s22');if(i0>=0)DOL.rail.splice(i0,0,'s22w');
const D=DOL.content.t4,Rw=D.rw;
$('#capsr').innerHTML=Rw.caps.map(([b,s])=>`<p><b>${b}</b>${s?`<span>${s}</span>`:''}</p>`).join('');
/* data: every label comes from existing t4 content */
const BAY=[{h:Rw.hd[0],k:3,it:[...D.a23.map(t=>({l:t,h:t,t:'Article 23: work',k:3})),...D.a24.map(t=>({l:t,h:t,t:'Article 24: rest',k:3}))]},
 {h:Rw.hd[1],k:0,it:D.arts.map(([a,t,k])=>({l:a.split(' · ')[0],h:a,t,k}))},
 {h:Rw.hd[2],k:1,it:D.pillars.map(([h,t])=>({l:h,h,t,k:0}))}];
const rpb=$('#rpb'),rph=$('#rph'),rpt=$('#rpt'),rpc=$('#rpc'),F=[0,0,0],M3=[[],[],[]],hits=[];let bay=-1,item=-1,foc=-1;
rpb.innerHTML=Rw.nm.map((n,i)=>`<button type="button" aria-pressed="false" data-b="${i}">${n}</button>`).join('');
const hl=(m,v)=>{m.material.emissive.set('#ff8a6a');m.material.emissiveIntensity=v};
const show=(b,i)=>{bay=b;item=i;if(b>=0)F[b]=1;foc=b;const B0=BAY[b],it=b>=0&&i>=0?B0.it[i]:null;
 rph.innerHTML=b<0?Rw.hint[0]:it?it.h:B0.h;
 rpt.textContent=b<0?Rw.hint[1]:it?it.t:B0.it.length+' parts. Select one to read it.';
 rpb.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',+x.dataset.b===b));
 rpc.innerHTML=b<0?'':B0.it.map((x,j)=>`<li><button type="button" aria-pressed="${j===i}" data-i="${j}">${x.l}</button></li>`).join('');
 M3.forEach((a,k)=>a.forEach((m,j)=>hl(m,k===b&&j===i?.9:0)))};
rpb.onclick=e=>{const x=e.target.closest('button');if(x)show(+x.dataset.b,-1)};
rpc.onclick=e=>{const x=e.target.closest('button');if(x)show(bay,+x.dataset.i)};
show(-1,-1);
const T=window.THREE;let r;const cv=$('#glr');
try{r=new T.WebGLRenderer({canvas:cv,antialias:innerWidth>760,alpha:true,powerPreference:'low-power'})}catch(e){}
if(!T||!W||!r){el.classList.add('nogl');return}
cv.addEventListener('webglcontextlost',e=>{e.preventDefault();el.classList.add('nogl')});
const{M,B,E,mob}=W.h,sc=new T.Scene(),cam=new T.PerspectiveCamera(38,1,.1,120),rt=new T.Group();sc.add(rt);
sc.fog=new T.Fog(0x22090f,70,190);
const amb=new T.AmbientLight(0xffe2c0,.5),key=new T.DirectionalLight(0xfff0d8,.85),pl=new T.PointLight(0xff9a6a,1.1,24);key.position.set(6,10,9);sc.add(amb,key,pl);
const BX=[-7.5,0,7.5],gb=BX.map(x=>{const g=new T.Group();g.position.x=x;g.scale.setScalar(1.25);rt.add(g);return g});
B(32,.2,9,'#14060a',0,-.1,0,rt);
const reg=(m,b,i,h)=>{m.userData={b,i,h};hits.push(m);M3[b].push(m);return m};
for(let i=0;i<9;i++)reg(B(1.2,.7,1.2,i<6?'#F25C54':'#B8444A',-1.45+(i%3)*1.45,.35,-1.45+(i/3|0)*1.45,gb[0]),0,i,.7);
for(let i=0;i<4;i++)reg(B(1.35,2.4,1.35,i<2?'#CDBFA6':'#8F826C',-2.25+i*1.5,1.2,0,gb[1]),1,i,2.4);
for(let i=0;i<4;i++){const m=new T.Mesh(new T.CylinderGeometry(.4,.4,3.8,16),M('#F25C54'));m.position.set(-2.1+i*1.4,1.9,0);gb[2].add(m);
 const c=B(1.1,.18,1.1,'#CDBFA6',0,1.99,0,m);reg(m,2,i,3.8)}
const roof=B(27,.4,6.6,'#CDBFA6',0,6.4,0,rt);B(27.2,.12,6.8,'#F25C54',0,-.26,0,roof);roof.visible=false;
const posts=[-12,-3.75,3.75,12].map(x=>B(.28,6.2,.28,'#CDBFA6',x,3.1,-2.8,rt));
/* camera poses: [p, position, target, k]; k pulls the camera back on narrow screens */
const kp=()=>{const m=mob(),k=m?1.9:1,A=[[-7.5,6,13.5],[-7.5,.3,0]],Bb=[[0,5.2,15],[0,1.5,0]],Cc=[[7.5,5.8,15.5],[7.5,2.2,0]],O=m?[[0,15,84],[0,2.4,0]]:[[0,8,30],[0,2.6,0]],o=m?1:1;
 return[[0,...A,k],[.12,...A,k],[.36,...Bb,k],[.59,...Cc,k],[.83,...O,o],[1,...O,o]]};
const path=(p,KP)=>{let i=0;while(i<KP.length-2&&p>KP[i+1][0])i++;const a=KP[i],b=KP[i+1],t=E(cl((p-a[0])/(b[0]-a[0]))),k=lp(a[3],b[3],t),T2=a[2].map((v,j)=>lp(v,b[2][j],t));return[a[1].map((v,j)=>lp(v,b[1][j],t)).map((v,j)=>T2[j]+(v-T2[j])*k),T2]};
const fpose=b=>{const k=mob()?2.4:1,t=[BX[b],b===1?1.5:b?2.2:.3,0],p=[BX[b],b===1?5:b?5.8:6,b===1?14:b?14.5:13];return[p.map((v,j)=>t[j]+(v-t[j])*k),t]};
/* stage: build schedule per bay, [start,end] in scroll progress */
const SC=[[.02,.18],[.26,.4],[.5,.62]],caps=[...el.querySelectorAll('.caps p')];
let cp=0,px=0,py=0,fz=0,lastp=0,vis=false,raf=0,hov=null,tx=0,ty=0,cw=1,ch=1;
if(!R)addEventListener('pointermove',e=>{tx=e.clientX/innerWidth*2-1;ty=e.clientY/innerHeight*2-1},{passive:true});
const size=()=>{const w=cv.clientWidth,h=cv.clientHeight;if(!w||!h)return;r.setPixelRatio(Math.min(devicePixelRatio||1,mob()?1.5:1.75));r.setSize(w,h,false);cw=w;ch=h;cam.aspect=w/h;cam.updateProjectionMatrix()};
new ResizeObserver(size).observe(cv);size();
const ray=new T.Raycaster(),mv=new T.Vector2(),pick=e=>{const b=cv.getBoundingClientRect();mv.set((e.clientX-b.left)/b.width*2-1,-((e.clientY-b.top)/b.height)*2+1);ray.setFromCamera(mv,cam);const h=ray.intersectObjects(hits,false)[0];return h&&h.object};
cv.addEventListener('click',e=>{const o=pick(e);if(o)show(o.userData.b,o.userData.i)});
cv.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const o=pick(e);cv.style.cursor=o?'pointer':'';if(o!==hov){if(hov&&!(hov.userData.b===bay&&hov.userData.i===item))hl(hov,0);hov=o;if(o&&!(o.userData.b===bay&&o.userData.i===item))hl(o,.45)}});
const fr=()=>{raf=0;if(!vis)return;const tp=prog(el);if(Math.abs(tp-lastp)>.012){foc=-1;lastp=tp}
 cp=R?tp:cp+(tp-cp)*.12;px=R?0:px+(tx-px)*.06;py=R?0:py+(ty-py)*.06;fz+=((foc>=0?1:0)-fz)*(R?1:.09);
 const[P,Tg]=path(cp,kp());let P2=P,T2=Tg;if(fz>.001&&foc>=0||fz>.001){const f=fpose(foc<0?Math.max(bay,0):foc);P2=P.map((v,j)=>lp(v,f[0][j],E(fz)));T2=Tg.map((v,j)=>lp(v,f[1][j],E(fz)))}
 if(mob())cam.setViewOffset(cw,ch,0,-.14*ch,cw,ch);else{const o=lp(.1,0,E(cl((cp-.55)/.25)));cam.setViewOffset(cw,ch,-o*cw,.05*ch,cw,ch)}cam.updateProjectionMatrix();
 cam.position.set(P2[0]+px*.6,P2[1]-py*.4,P2[2]);cam.lookAt(T2[0],T2[1],T2[2]);pl.position.set(P2[0]*.5+px*4,6-py*2,8);
 BAY.forEach((B0,b)=>{const[a,z]=SC[b],u=cl((cp-a)/(z-a)),n=M3[b].length;M3[b].forEach((m,i)=>{const e=F[b]?1:E(cl(u*1.8-i/n*.8)),h=m.userData.h;m.visible=e>0;m.scale.y=Math.max(e,.001);m.position.y=h/2*Math.max(e,.001)})});
 const ru=E(cl((cp-.7)/.12));roof.visible=ru>0;roof.position.y=lp(12,6.4,ru);posts.forEach(p=>{p.visible=ru>0;p.scale.y=Math.max(ru,.001);p.position.y=3.1*Math.max(ru,.001)});
 const n=caps.length;caps.forEach((c,i)=>{const d=cp/.95*n-i-.5;c.style.opacity=cl(1.3-Math.abs(d)*2.8);c.style.transform=`translateY(${cl(d,-1,1)*-18}px)`});
 r.render(sc,cam);raf=requestAnimationFrame(fr)};
new IntersectionObserver(([e])=>{vis=e.isIntersecting;if(vis&&!raf)raf=requestAnimationFrame(fr)},{rootMargin:'10% 0px'}).observe(el);
})();
