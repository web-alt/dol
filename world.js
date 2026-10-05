/* world.js: V2 3D core. Three.js r149 UMD (js/vendor). One diorama, choreographed by scroll. Needs content.js + core.js. Exposes DOL.world (builders reused by later topics). */
(function(){
const U=DOL.util,{$,R,cl,lp,prog}=U,el=$('#s0'),cv=$('#glw');
if(!el||!cv)return;
DOL.rail.unshift('s0');
const T=window.THREE;let r;
try{r=new T.WebGLRenderer({canvas:cv,antialias:innerWidth>760,alpha:true,powerPreference:'low-power'})}catch(e){}
if(!T||!r){el.classList.add('nogl');return}
cv.addEventListener('webglcontextlost',e=>{e.preventDefault();el.classList.add('nogl')});
const mob=()=>innerWidth<=760,E=t=>t*t*(3-2*t),sc=new T.Scene(),cam=new T.PerspectiveCamera(38,1,.1,80);
sc.fog=new T.Fog(0x16150F,20,44);
const M=(c,o)=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.85,flatShading:true},o));
const add=(m,x,y,z,g)=>{m.position.set(x,y,z);(g||sc).add(m);return m};
const B=(w,h,d,c,x,y,z,g)=>add(new T.Mesh(new T.BoxGeometry(w,h,d),M(c)),x,y,z,g);
const C=(a,b,h,c,x,y,z,g)=>add(new T.Mesh(new T.CylinderGeometry(a,b,h,14),M(c)),x,y,z,g);
const S=(rad,c,x,y,z,g,o)=>add(new T.Mesh(new T.SphereGeometry(rad,12,10),M(c,o)),x,y,z,g);
const G=(x,y,z,a,b)=>{const g=new T.Group();g.position.set(x,y,z);sc.add(g);items.push({g,a,b,y});return g};
const items=[],rnd=i=>Math.abs(Math.sin(i*127.1)*43758.5453)%1;
/* builders: each returns a Group that appears between scroll progress a..b */
const mk=DOL.world={mk:{},items};mk.h={M,B,C,S,add,E,mob,T};
mk.mk.stall=(g)=>{B(3.2,1.1,1.3,'#7a4b2a',0,.55,0,g);B(3.4,.08,1.5,'#b98a52',0,1.14,0,g);
 for(let i=0;i<5;i++)B(.76,.1,2,i%2?'#F4EFE4':'#D9480F',-1.52+i*.76,2.9,.1,g).rotation.x=.1;
 [-1.7,1.7].forEach(x=>[-.85,.85].forEach(z=>C(.04,.04,2.8,'#3b2a1a',x,1.4,z,g)));
 const k=C(.2,.26,.34,'#b9b9b4',-.8,1.35,0,g);C(.04,.06,.3,'#b9b9b4',-.55,1.4,0,g).rotation.z=-1;};
mk.mk.cart=(g)=>{B(1.9,.12,1,'#0E9AA7',0,.8,0,g);B(1.9,.3,.08,'#0A7580',0,.95,.5,g);B(1.9,.3,.08,'#0A7580',0,.95,-.5,g);
 [-.6,.6].forEach(x=>[-.55,.55].forEach(z=>C(.4,.4,.08,'#16150F',x,.4,z,g).rotation.x=Math.PI/2));B(1.2,.07,.07,'#16150F',1.5,.95,0,g);
 for(let i=0;i<8;i++)S(.13,i%3?'#F2A900':'#6aa84f',-.6+(i%4)*.4,1.12,-.2+(i>3?.4:0),g)};
mk.mk.basket=(g)=>{C(.4,.3,.5,'#c58b3b',0,.25,0,g);C(.38,.38,.04,'#8a2f1d',0,.5,0,g);add(new T.Mesh(new T.TorusGeometry(.36,.03,6,16,Math.PI),M('#8a6a3a')),0,.5,0,g)};
mk.mk.broom=(g)=>{C(.025,.025,1.8,'#8a6a3a',0,.9,0,g);B(.4,.34,.14,'#c9a227',0,.15,0,g);g.rotation.z=.28};
mk.mk.parcels=(g)=>{B(.9,.5,.65,'#b98a52',0,.25,0,g);B(.92,.52,.12,'#e8dcc0',0,.25,0,g);B(.65,.4,.5,'#c99a62',.1,.7,0,g);B(.5,.3,.4,'#a87b45',-.1,1.05,0,g).rotation.y=.4};
mk.mk.lamp=(g)=>{C(.05,.07,3.2,'#2a2a28',0,1.6,0,g);S(.2,'#ffcf70',0,3.3,0,g,{emissive:'#ffb347',emissiveIntensity:1.6})};
mk.mk.city=(g)=>{const n=mob()?6:11;for(let i=0;i<n;i++){const w=1.6+rnd(i)*1.6,h=3+rnd(i+9)*6,x=-13+i*(26/n);
 B(w,h,1.6,['#1f2a44','#2b2f3a','#33281f'][i%3],x,h/2,-7,g);
 for(let j=0;j<3;j++)add(new T.Mesh(new T.BoxGeometry(.28,.38,.05),new T.MeshBasicMaterial({color:rnd(i*3+j)>.4?'#ffd27a':'#3a3f52'})),x-.4+j*.4,1.4+rnd(i+j)*(h-2.2),-6.18,g)}};
/* scene assembly */
B(26,.2,15,'#2a2620',0,-.1,0);for(let i=-5;i<5;i++)B(1.4,.02,.18,'#F2A900',i*2.6,.01,3.6);
const stall=G(0,0,0,.08,.3),kettle=null;mk.mk.stall(stall);
const glass=new T.Group();glass.position.set(.7,1.18,.2);sc.add(glass);
const lp2=[[.085,0],[.1,.01],[.13,.2],[.155,.4]].map(a=>new T.Vector2(a[0],a[1]));
glass.add(new T.Mesh(new T.LatheGeometry(lp2,20),new T.MeshStandardMaterial({color:'#ffffff',transparent:true,opacity:.3,roughness:.05,side:T.DoubleSide,depthWrite:false})));
const lq=[[.001,.02],[.09,.02],[.125,.2],[.145,.33]].map(a=>new T.Vector2(a[0],a[1]));
glass.add(new T.Mesh(new T.LatheGeometry(lq,20),M('#C8741A',{emissive:'#6b3300',emissiveIntensity:.6,roughness:.4,flatShading:false})));
const cart=G(-5,0,2.6,.38,.5);mk.mk.cart(cart);const bask=G(-2.8,0,3.5,.44,.54);mk.mk.basket(bask);
const broom=G(3.6,0,2.2,.5,.62);mk.mk.broom(broom);const par=G(5.4,0,-1.2,.56,.68);mk.mk.parcels(par);
const lamp=G(2.6,0,-2.6,.62,.72);mk.mk.lamp(lamp);const city=G(0,0,0,.7,.88);mk.mk.city(city);
/* lights */
sc.add(new T.AmbientLight(0xffe2b0,.42));const key=new T.DirectionalLight(0xfff0d0,.9);key.position.set(5,8,4);sc.add(key);
const pl=new T.PointLight(0xffa94d,2.2,14);sc.add(pl);
/* camera path: [p, position, target] */
const KP=[[0,[1.25,1.5,1.55],[.7,1.38,.2]],[.2,[2.6,2.1,3.4],[.3,1.3,0]],[.55,[6.5,3.8,9.5],[0,1,0]],[.9,[11,7.5,15],[0,1.6,-1]]];
const path=p=>{let i=0;while(i<KP.length-2&&p>KP[i+1][0])i++;const a=KP[i],b=KP[i+1],t=E(cl((p-a[0])/(b[0]-a[0])));return[a[1].map((v,k)=>lp(v,b[1][k],t)),a[2].map((v,k)=>lp(v,b[2][k],t))]};
/* captions + pointer */
const caps=[...el.querySelectorAll('.caps p')],cue=$('#cue');let cp=0,tx=0,ty=0,px=0,py=0,vis=false,raf=0;
if(!R)addEventListener('pointermove',e=>{tx=e.clientX/innerWidth*2-1;ty=e.clientY/innerHeight*2-1},{passive:true});
const size=()=>{const w=cv.clientWidth,h=cv.clientHeight;if(!w||!h)return;r.setPixelRatio(Math.min(devicePixelRatio||1,mob()?1.5:1.75));r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()};
new ResizeObserver(size).observe(cv);size();
const frame=()=>{raf=0;if(!vis)return;const tp=prog(el);cp=R?tp:cp+(tp-cp)*.12;px=R?0:px+(tx-px)*.06;py=R?0:py+(ty-py)*.06;
 const[P,Tg]=path(cp),k=mob()?1.45:1;cam.position.set(Tg[0]+(P[0]-Tg[0])*k+px*.5,Tg[1]+(P[1]-Tg[1])*k-py*.3,Tg[2]+(P[2]-Tg[2])*k);cam.lookAt(Tg[0],Tg[1],Tg[2]);
 glass.rotation.y=cp*Math.PI*1.2;pl.position.set(1+px*3,3-py*1.5,3);key.intensity=lp(.9,1.4,E(cl((cp-.5)/.4)));
 items.forEach(o=>{const e=E(cl((cp-o.a)/(o.b-o.a)));o.g.visible=e>0;o.g.scale.setScalar(Math.max(e,.001));o.g.position.y=o.y-(1-e)*.5});
 const n=caps.length;caps.forEach((c,i)=>{const d=cp/.95*n-i-.5;c.style.opacity=cl(1.15-Math.abs(d)*1.9);c.style.transform=`translateY(${cl(d,-1,1)*-18}px)`});
 if(cue)cue.style.opacity=cl(1-cp*18);cv.style.opacity=1-cl((cp-.94)/.06);
 r.render(sc,cam);raf=requestAnimationFrame(frame)};
new IntersectionObserver(([e])=>{vis=e.isIntersecting;if(vis&&!raf)raf=requestAnimationFrame(frame)},{rootMargin:'10% 0px'}).observe(el);
})();
