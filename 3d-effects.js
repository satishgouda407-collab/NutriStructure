/* 3D Spatial Experience - The 5-Pillar Protocol */
(function(){
'use strict';

// Particle Atmosphere
function initParticles(){
    const c=document.createElement('canvas');
    c.id='particles';
    c.style='position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:0.5;';
    document.body.insertBefore(c,document.body.firstChild);
    const x=c.getContext('2d'),p=[],t=['🍊','☕','🍋','⚡','✨'];
    let w,h,a=true;
    function r(){w=c.width=innerWidth;h=c.height=innerHeight;}
    r();addEventListener('resize',r,{passive:true});
    class P{constructor(){this.reset();}
        reset(){this.x=Math.random()*w;this.y=Math.random()*h;this.s=Math.random()*12+8;this.vx=(Math.random()-0.5)*0.4;this.vy=(Math.random()-0.5)*0.2;this.o=Math.random()*0.3+0.1;this.e=t[Math.floor(Math.random()*t.length)];this.r=Math.random()*360;this.rs=(Math.random()-0.5)*1;}
        update(){this.x+=this.vx;this.y+=this.vy;this.r+=this.rs;if(this.x<-40)this.x=w+40;if(this.x>w+40)this.x=-40;if(this.y<-40)this.y=h+40;if(this.y>h+40)this.y=-40;}
        draw(){x.save();x.globalAlpha=this.o;x.translate(this.x,this.y);x.rotate(this.r*Math.PI/180);x.font=this.s+'px Arial';x.textAlign='center';x.fillText(this.e,0,0);x.restore();}
    }
    for(let i=0;i<(innerWidth<768?10:20);i++)p.push(new P());
    function l(){if(!a)return;x.clearRect(0,0,w,h);p.forEach(q=>{q.update();q.draw();});requestAnimationFrame(l);}
    addEventListener('visibilitychange',()=>{a=!document.hidden;if(a)l();});
    l();
}

// Interactive Hero Reveal
function initReveal(){
    const h=document.querySelector('.hero');if(!h)return;
    const d=document.createElement('div');
    d.className='hero-reveal';
    d.innerHTML='<div class="reveal-before"><svg viewBox="0 0 200 300"><path d="M100,20 C120,20 135,35 135,55 C135,70 125,80 115,85 C130,90 145,105 145,130 C145,150 140,165 135,175 C140,185 150,200 150,230 C150,270 130,290 100,290 C70,290 50,270 50,230 C50,200 60,185 65,175 C60,165 55,150 55,130 C55,105 70,90 85,85 C75,80 65,70 65,55 C65,35 80,20 100,20 Z" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="5,5"/></svg></div><div class="reveal-after"><svg viewBox="0 0 200 300"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#10b981"/><stop offset="100%" stop-color="#34d399"/></linearGradient></defs><path d="M100,20 C120,20 135,35 135,55 C135,70 125,80 115,85 C130,90 145,105 145,130 C145,150 140,165 135,175 C140,185 150,200 150,230 C150,270 130,290 100,290 C70,290 50,270 50,230 C50,200 60,185 65,175 C60,165 55,150 55,130 C55,105 70,90 85,85 C75,80 65,70 65,55 C65,35 80,20 100,20 Z" fill="url(#bg)"/></svg></div><div class="reveal-slider"></div>';
    h.appendChild(d);
    const r=d.querySelector('.reveal-after'),s=d.querySelector('.reveal-slider');
    function u(p){r.style.clipPath=`inset(0 ${100-p}% 0 0)`;s.style.left=`${p}%`;}
    addEventListener('scroll',()=>u(Math.min(scrollY/500,1)*100),{passive:true});
}

// Floating Assets
function initFloat(){
    const a=[{e:'🍊',d:0.3},{e:'☕',d:0.5},{e:'🍋',d:0.4},{e:'⚡',d:0.6}];
    document.querySelectorAll('.pillars-section,.hero').forEach(s=>{
        const c=document.createElement('div');c.className='float-assets';c.style='position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:0;';
        a.forEach((v,i)=>{const e=document.createElement('div');e.className='float-asset';e.textContent=v.e;e.dataset.d=v.d;e.style=`position:absolute;font-size:50px;opacity:0.1;left:${10+i*20}%;top:${20+(i%3)*30}%;animation:floaty ${4+i}s ease-in-out infinite;animation-delay:${i*0.5}s;`;c.appendChild(e);});
        s.style.position='relative';s.insertBefore(c,s.firstChild);
    });
    let t=false;
    addEventListener('scroll',()=>{if(!t){requestAnimationFrame(()=>{const y=scrollY;document.querySelectorAll('.float-asset').forEach(e=>e.style.transform=`translateY(${y*parseFloat(e.dataset.d)*0.5}px)`);t=false;});t=true;}},{passive:true});
}

// Progress Bar
function initProgress(){
    const c=document.createElement('div');c.className='progress-wrap';c.innerHTML='<div class="progress-bar"><div class="progress-fill"></div></div><div class="badges"><div class="badge active" data-s="hero">🏠</div><div class="badge" data-s="problem">🎯</div><div class="badge" data-s="pillars">⚡</div><div class="badge" data-s="products">🛍️</div><div class="badge" data-s="testimonials">⭐</div></div>';
    document.body.appendChild(c);
    const f=c.querySelector('.progress-fill'),b=c.querySelectorAll('.badge');
    addEventListener('scroll',()=>{const p=(scrollY/(document.documentElement.scrollHeight-innerHeight))*100;f.style.height=`${p}%`;const i=Math.min(Math.floor(p/20),4);b.forEach((e,j)=>e.classList.toggle('active',j===i));},{passive:true});
    b.forEach(e=>e.addEventListener('click',()=>{const t=document.querySelector('.'+e.dataset.s+'-section')||document.getElementById(e.dataset.s);if(t)t.scrollIntoView({behavior:'smooth'});}));
}

// Micro Interactions
function initMicro(){
    document.querySelectorAll('.btn,.hero-cta,.btn-product-cta').forEach(b=>{
        b.addEventListener('click',function(e){const r=this.getBoundingClientRect(),s=document.createElement('span');s.style=`position:absolute;border-radius:50%;background:rgba(255,255,255,0.5);transform:scale(0);animation:ripple 0.5s ease-out;left:${e.clientX-r.left}px;top:${e.clientY-r.top}px;width:10px;height:10px;margin:-5px;`;this.style.position='relative';this.style.overflow='hidden';this.appendChild(s);setTimeout(()=>s.remove(),500);});
    });
}

// Light Rays
function initRays(){
    document.querySelectorAll('section').forEach(s=>{const r=document.createElement('div');r.className='light-rays';r.innerHTML='<div class="l-ray l1"></div><div class="l-ray l2"></div>';s.style.position='relative';s.insertBefore(r,s.firstChild);});
    const o=new IntersectionObserver(e=>e.forEach(i=>{if(i.isIntersecting)i.target.classList.add('in-view');}),{threshold:0.3});
    document.querySelectorAll('section').forEach(s=>o.observe(s));
}

// Glassmorphism
function initGlass(){
    document.querySelectorAll('.pillar-card,.problem-card,.testimonial-card').forEach(c=>{
        c.classList.add('glass-card');
        c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),rx=(e.clientY-r.top-r.height/2)/15,ry=(r.width/2-e.clientX+r.left)/15;c.style.transform=`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(15px)`;});
        c.addEventListener('mouseleave',()=>c.style.transform='perspective(1000px) rotateX(0) rotateY(0) translateZ(0)');
    });
}

// Living Core
function initCore(){
    const h=document.querySelector('.hero');if(!h)return;
    const c=document.createElement('div');c.className='living-core';c.innerHTML='<div class="core-orb"></div><div class="core-ring r1"></div><div class="core-ring r2"></div><div class="core-ring r3"></div>';
    h.appendChild(c);
}

// Volumetric Light
function initLight(){
    const l=document.createElement('div');l.className='vol-light';document.body.appendChild(l);
    addEventListener('mousemove',e=>{l.style.left=(e.clientX-200)+'px';l.style.top=(e.clientY-200)+'px';},{passive:true});
}

// Live Chat
function initChat(){
    const c=document.createElement('div');c.className='chat-3d';c.innerHTML='<div class="chat-btn">💬</div><div class="chat-panel"><div class="chat-h"><span>🤖 AI Assistant</span><button class="chat-x">×</button></div><div class="chat-m"><div class="chat-msg bot">Hi! How can I help you today?</div></div><div class="chat-i"><input type="text" placeholder="Ask..."><button>Send</button></div></div>';
    document.body.appendChild(c);
    const b=c.querySelector('.chat-btn'),p=c.querySelector('.chat-panel'),x=c.querySelector('.chat-x');
    b.addEventListener('click',()=>p.classList.toggle('open'));
    x.addEventListener('click',()=>p.classList.remove('open'));
}

// Init all
function run(){
    initParticles();initReveal();initFloat();initProgress();initMicro();initRays();initGlass();initCore();initLight();initChat();
    console.log('🚀 3D Experience Loaded');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
