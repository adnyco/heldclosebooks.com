/* year */
document.querySelectorAll('.footer-year').forEach(e=>e.textContent=new Date().getFullYear());

/* mobile nav */
const burger=document.getElementById('navburger');
const navlinks=document.getElementById('navlinks');
burger?.addEventListener('click',()=>{
  const o=navlinks.classList.toggle('open');
  burger.setAttribute('aria-expanded',String(o));
});
navlinks?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  navlinks.classList.remove('open');
  burger?.setAttribute('aria-expanded','false');
}));

/* countdown */
function tick(){
  const diff=new Date('2026-04-15T00:00:00')-new Date();
  if(diff<=0){
    document.getElementById('countdown').innerHTML=
      '<span class="cd-intro" style="font-size:.85rem;letter-spacing:.2em">Just Hold Her is available now — order at Amazon.</span>';
    return;
  }
  const d=Math.floor(diff/864e5);
  const h=Math.floor(diff%864e5/36e5);
  const m=Math.floor(diff%36e5/6e4);
  const s=Math.floor(diff%6e4/1e3);
  const p=n=>String(n).padStart(2,'0');
  document.getElementById('cd-d').textContent=d;
  document.getElementById('cd-d').textContent=d;
  document.getElementById('cd-h').textContent=p(h);
  document.getElementById('cd-m').textContent=p(m);
  document.getElementById('cd-s').textContent=p(s);
}
tick();setInterval(tick,1000);

/* praise carousel */
const slides=[...document.querySelectorAll('.praise-slide')];
const dots=[...document.querySelectorAll('.praise-dot')];
let cur=0,praiseTimer;
function goTo(n){
  slides[cur].classList.remove('on');dots[cur].classList.remove('on');
  dots[cur].setAttribute('aria-selected','false');
  cur=(n+slides.length)%slides.length;
  slides[cur].classList.add('on');dots[cur].classList.add('on');
  dots[cur].setAttribute('aria-selected','true');
}
dots.forEach((d,i)=>d.addEventListener('click',()=>{
  clearInterval(praiseTimer);
  goTo(i);
  praiseTimer=setInterval(()=>goTo(cur+1),5500);
}));
praiseTimer=setInterval(()=>goTo(cur+1),5500);

/* scroll reveal — adds .in to .js-fade elements */
const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('in');
  });
},{threshold:0.08});
document.querySelectorAll('.js-fade').forEach(el=>revealObserver.observe(el));

