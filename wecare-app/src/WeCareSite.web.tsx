import { useEffect, useRef, useState } from 'react';
import { Asset } from 'expo-asset';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { images } from './assets';
import { features, milestones, products, technologySteps } from './content';
import './cinematic/cinematic.css';

gsap.registerPlugin(ScrollTrigger);
const asset = (source: number) => Asset.fromModule(source).uri;
const dawn = asset(require('../assets/images/cinematic-dawn.webp'));
const care = asset(require('../assets/images/cinematic-care.webp'));
const logo = asset(images.logoReverse);
const wearable = asset(images.wearable);
const phone = asset(images.phone);
const nav = [{label:'Câu chuyện',id:'story'},{label:'Hệ sinh thái',id:'ecosystem'},{label:'Công nghệ',id:'technology'},{label:'Lộ trình',id:'roadmap'}];
type Detail = {title:string; text:string; image?:string};

function Arrow() { return <svg aria-hidden="true" className="arrow" viewBox="0 0 24 24" fill="none" focusable="false"><path d="M5 12h13M13 6l6 6-6 6"/></svg>; }

function ProductScene({motion}:{motion:{progress:number;paused:boolean}}) {
  const host = useRef<HTMLDivElement>(null);
  const [ready,setReady]=useState(false);
  useEffect(()=>{
    const el=host.current; if(!el)return;
    let disposed=false,cleanup:(()=>void)|undefined;
    const observer=new IntersectionObserver(async ([entry])=>{
      if(!entry?.isIntersecting)return; observer.disconnect();
      try { const {mountWatch}=await import('./cinematic/WatchScene'); if(!disposed){cleanup=mountWatch(el,motion);setReady(true);} } catch { /* The product photograph remains available without WebGL. */ }
    },{rootMargin:'500px'}); observer.observe(el);
    return()=>{disposed=true;observer.disconnect();cleanup?.();};
  },[motion]);
  return <div className="product-scene"><img className={`watch-fallback ${ready?'is-ready':''}`} src={wearable} alt="Thiết bị WeCare minh họa"/><div ref={host} className="webgl-host" aria-label="Minh họa thiết bị WeCare trong không gian 3D" role="img"/><span className="scene-caption">PARKGUARD AI <span>Thiết kế minh họa</span></span></div>;
}

function DetailDialog({detail,onClose}:{detail:Detail;onClose:()=>void}) {
  const ref=useRef<HTMLDialogElement>(null);
  useEffect(()=>{const active=document.activeElement as HTMLElement;ref.current?.showModal();return()=>{active?.focus();};},[]);
  return <dialog ref={ref} className="detail-dialog" onCancel={onClose} onClick={e=>{if(e.target===ref.current)onClose();}}><button autoFocus className="dialog-close" aria-label="Đóng" onClick={onClose}>×</button><span className="eyeline">WECARE / KHÁM PHÁ</span><h2>{detail.title}</h2><p>{detail.text}</p>{detail.image?<img src={detail.image} alt={detail.title}/>:null}<p className="dialog-note">Hình ảnh sản phẩm và dữ liệu là minh họa thiết kế; đây chưa phải dịch vụ chẩn đoán y tế.</p><button className="button button-dark" onClick={onClose}>Tiếp tục khám phá <Arrow/></button></dialog>;
}

export function WeCareSite() {
  const scroller=useRef<HTMLDivElement>(null);
  const [menu,setMenu]=useState(false);
  const [paused,setPaused]=useState(()=>typeof window!=='undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [detail,setDetail]=useState<Detail|null>(null);
  const [chapter,setChapter]=useState(0);
  const motion=useRef({progress:0,paused}).current;
  motion.paused=paused;
  const go=(id:string)=>{setMenu(false);scroller.current?.querySelector(`#${id}`)?.scrollIntoView({behavior:paused?'instant':'smooth',block:'start'});};

  useEffect(()=>{
    const media=matchMedia('(prefers-reduced-motion: reduce)');
    const changed=()=>setPaused(media.matches);media.addEventListener('change',changed);return()=>media.removeEventListener('change',changed);
  },[]);
  useEffect(()=>{
    const root=scroller.current; if(!root)return;
    const context=gsap.context(()=>{
      const progress=root.querySelector('.reading-line');
      ScrollTrigger.create({trigger:root.querySelector('.page-content'),scroller:root,start:'top top',end:'bottom bottom',onUpdate:self=>{gsap.set(progress,{scaleX:self.progress});root.dataset.scrolled=self.scroll()>70?'true':'false';}});
      if(paused)return;
      gsap.from('.hero-enter',{y:40,opacity:0,duration:1.4,stagger:.15,ease:'power3.out',delay:.15});
      const film=gsap.timeline({scrollTrigger:{trigger:'.hero-sequence',scroller:root,start:'top top',end:'bottom bottom',scrub:1.1}});
      film.to('.hero-photo',{scale:1.22,yPercent:-4,ease:'none',duration:1},0)
        .to('.hero-copy',{y:-100,opacity:0,duration:.34},.08)
        .fromTo('.hero-after',{y:45,opacity:0},{y:0,opacity:1,duration:.3},.4)
        .to('.hero-vignette',{opacity:.9,duration:.5},.2)
        .to('.hero-after',{y:-30,opacity:0,duration:.18},.82);
      gsap.utils.toArray<HTMLElement>('.reveal',root).forEach(el=>{gsap.from(el,{y:46,opacity:0,duration:1.05,ease:'power3.out',scrollTrigger:{trigger:el,scroller:root,start:'top 90%',toggleActions:'play none none reverse'}});});
      gsap.utils.toArray<HTMLElement>('.parallax-photo',root).forEach(el=>{gsap.fromTo(el,{yPercent:-6,scale:1.14},{yPercent:6,scale:1.05,ease:'none',scrollTrigger:{trigger:el.parentElement,scroller:root,start:'top bottom',end:'bottom top',scrub:1}});});
      const product=gsap.timeline({scrollTrigger:{trigger:'.product-sequence',scroller:root,start:'top top',end:'bottom bottom',scrub:.8,onUpdate:self=>{motion.progress=self.progress;}}});
      product.to('.product-intro',{autoAlpha:0,y:-45,duration:.22},.14)
        .fromTo('.product-second',{autoAlpha:0,y:45},{autoAlpha:1,y:0,duration:.25},.4)
        .to('.product-word',{xPercent:-12,opacity:.05,duration:1},0);
      gsap.fromTo('.timeline-fill',{scaleY:0},{scaleY:1,ease:'none',scrollTrigger:{trigger:'.roadmap-list',scroller:root,start:'top 60%',end:'bottom 65%',scrub:.5}});
      gsap.utils.toArray<HTMLElement>('.milestone',root).forEach(el=>{ScrollTrigger.create({trigger:el,scroller:root,start:'top 65%',end:'bottom 65%',toggleClass:'milestone-active'});});
    },root);
    let timer=setTimeout(()=>ScrollTrigger.refresh(),350);
    const refresh=()=>ScrollTrigger.refresh();window.addEventListener('load',refresh);
    return()=>{clearTimeout(timer);window.removeEventListener('load',refresh);context.revert();};
  },[paused,motion]);

  const showProduct=(index:number)=>{const p=products[index];if(p)setDetail({title:p.title,text:p.text,image:asset(p.image)});};

  return <div ref={scroller} className={`cinema ${paused?'motion-paused':''}`} data-testid="cinematic-scroller">
    <div className="reading-line"/>
    <header className="cinema-nav"><button className="brand" onClick={()=>go('home')} aria-label="WeCare — về đầu trang"><img src={logo} alt="WeCare"/></button><nav aria-label="Điều hướng chính">{nav.map(n=><button key={n.id} onClick={()=>go(n.id)}>{n.label}</button>)}</nav><button className="nav-contact" onClick={()=>go('contact')}>Khám phá WeCare <Arrow/></button><button className="menu-toggle" aria-label={menu?'Đóng menu':'Mở menu'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?'Đóng':'Menu'} <span>{menu?'−':'+'}</span></button></header>
    {menu?<nav className="mobile-nav" aria-label="Menu di động">{nav.map((n,i)=><button key={n.id} onClick={()=>go(n.id)}><span>0{i+1}</span>{n.label}<Arrow/></button>)}<button onClick={()=>go('contact')}>Khám phá WeCare <Arrow/></button></nav>:null}
    <main className="page-content">
      <section id="home" className="hero-sequence" aria-label="Hành trình WeCare">
        <div className="hero-sticky">
          <div className="hero-photo-wrap"><img className="hero-photo" src={dawn} alt="Người phụ nữ lớn tuổi đi dạo trong ánh bình minh trên đồi xanh" fetchPriority="high"/><div className="ambient-light"/></div><div className="hero-vignette"/>
          <div className="hero-copy"><p className="hero-enter hero-kicker">WECARE — ĐỒNG HÀNH CÙNG PARKINSON</p><h1 className="hero-enter">Khi điều quan trọng<br/>vẫn chờ <em>phía trước.</em></h1><p className="hero-enter hero-description">WeCare lắng nghe từng chuyển động,<br/>để bạn sống theo nhịp riêng của mình.</p><button className="hero-enter button button-light" onClick={()=>go('ecosystem')}>Khám phá WeCare <Arrow/></button></div>
          <div className="hero-after"><span className="eyeline">MỖI BƯỚC ĐI ĐỀU CÓ Ý NGHĨA.</span><h2>Hành trình phía trước.<br/><em>Vẫn là của bạn.</em></h2><p>Chúng tôi ở bên để những ngày bình thường<br/>tiếp tục được sống trọn vẹn.</p></div>
          <div className="hero-bottom"><button onClick={()=>go('story')} className="scroll-cue"><span className="scroll-tick"/> CUỘN ĐỂ CẢM NHẬN</button><span>WECARE — THE ART OF CARING</span></div>
        </div>
      </section>

      <section id="story" className="manifesto-section section-pad"><div className="section-label reveal">01 — ĐIỀU CHÚNG TÔI TIN</div><div className="manifesto-content"><h2 className="reveal">Sống chủ động.<br/>Sống <em>trọn vẹn hơn.</em></h2><div className="manifesto-aside reveal"><span className="small-spark">✳</span><p>Đằng sau mỗi tín hiệu vận động là một con người. Một thói quen. Một điều vẫn muốn tự mình làm.</p><p>WeCare kết nối thiết bị đeo, ứng dụng và trí tuệ nhân tạo để hỗ trợ theo dõi vận động — đồng hành cùng người dùng và gia đình trên hành trình chăm sóc Parkinson.</p><button className="text-link" onClick={()=>go('technology')}>Khám phá cách chúng tôi đồng hành <Arrow/></button></div></div><div className="manifesto-rule reveal"><span>CON NGƯỜI LÀ ĐIỂM BẮT ĐẦU.</span><span>CÔNG NGHỆ LÀ SỰ ĐỒNG HÀNH.</span></div></section>

      <section id="ecosystem" className="product-sequence"><div className="product-sticky"><div className="product-word" aria-hidden="true">wecare</div><div className="product-top section-label">02 — CÔNG NGHỆ Ở GẦN BẠN</div><ProductScene motion={motion}/><div className="product-copy product-intro"><span className="eyeline">PARKGUARD AI</span><h2>Nhỏ trên cổ tay.<br/><em>Lớn trong quan tâm.</em></h2><p>Cảm biến ghi lại chuyển động thường ngày.<br/>Một sự đồng hành nhẹ nhàng, xuyên suốt.</p><button className="text-link light-link" onClick={()=>showProduct(0)}>Tìm hiểu thiết bị <Arrow/></button></div><div className="product-copy product-second"><span className="eyeline">TỪ TÍN HIỆU ĐẾN THẤU HIỂU</span><h2>Hiểu hơn.<br/><em>An tâm hơn.</em></h2><p>Theo dõi xu hướng vận động, kết nối với gia đình và chia sẻ những thông tin hữu ích với bác sĩ.</p><button className="text-link light-link" onClick={()=>showProduct(1)}>Khám phá ứng dụng <Arrow/></button></div><div className="product-bottom"><span>THIẾT BỊ ĐEO / ỨNG DỤNG / PHÂN TÍCH AI</span><span>CUỘN ĐỂ KHÁM PHÁ ↘</span></div></div></section>

      <section id="technology" className="technology-section section-pad"><div className="section-label reveal">03 — MỘT DÒNG CHẢY LIỀN MẠCH</div><div className="tech-layout"><div className="tech-copy reveal"><h2>Từ chuyển động<br/>đến <em>thấu hiểu.</em></h2><p>Mỗi bước xử lý là một lớp thông tin, giúp bạn nhìn rõ hơn những thay đổi theo thời gian.</p><div className="tech-tabs" role="tablist" aria-label="Quy trình công nghệ">{technologySteps.map((step,i)=><button role="tab" id={`tech-tab-${i}`} aria-controls="tech-panel" aria-selected={chapter===i} key={step.title} tabIndex={chapter===i?0:-1} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const next=(i+(e.key==='ArrowRight'?1:4))%5;setChapter(next);document.getElementById(`tech-tab-${next}`)?.focus();}}} onClick={()=>setChapter(i)}><span>0{i+1}</span>{step.title}<span>{chapter===i?'−':'+'}</span></button>)}</div></div><div className="signal-stage reveal"><div className="signal-orb" aria-hidden="true">{Array.from({length:14},(_,i)=><i key={i} style={{transform:`rotate(${i*13}deg) rotateY(${i*7}deg)`}}/>)}</div><div id="tech-panel" className="signal-detail" role="tabpanel" aria-labelledby={`tech-tab-${chapter}`} key={chapter}><span>0{chapter+1} / 05</span><h3>{technologySteps[chapter]?.title}</h3><p>{technologySteps[chapter]?.text}</p></div></div></div></section>

      <section className="care-section"><div className="care-photo"><img className="parallax-photo" src={care} alt="Bàn tay người thân nâng niu bàn tay người lớn tuổi đang đeo thiết bị theo dõi" loading="lazy"/></div><div className="care-caption reveal"><span className="eyeline">CHĂM SÓC LÀ MỘT SỰ KẾT NỐI</span><h2>Công nghệ ở bên.<br/><em>Yêu thương ở lại.</em></h2></div></section>

      <section id="features" className="features-section section-pad"><div className="section-label reveal">04 — NHẸ NHÀNG TRONG TỪNG ĐIỂM CHẠM</div><div className="features-heading reveal"><h2>Ít lo lắng hơn.<br/><em>Nhiều cuộc sống hơn.</em></h2><p>Những tính năng thiết thực, cùng bạn tạo nên thói quen chăm sóc sức khỏe mỗi ngày.</p></div><div className="feature-list">{features.map((f,i)=><article className="feature-item reveal" key={f.title}><span>0{i+1}</span><h3>{f.title}</h3><p>{f.text}</p></article>)}</div></section>

      <section id="roadmap" className="roadmap-section section-pad"><div className="roadmap-intro reveal"><div className="section-label">05 — HÀNH TRÌNH PHÁT TRIỂN</div><h2>Từng bước nhỏ.<br/><em>Một tầm nhìn dài.</em></h2><p>Tiến bộ bắt đầu từ nghiên cứu. Trưởng thành bằng lắng nghe. Đây là các mốc trong lộ trình dự kiến của WeCare.</p></div><div className="roadmap-list"><div className="timeline-line"><div className="timeline-fill"/></div>{milestones.map((m,i)=><article className="milestone reveal" key={m.title}><div className="milestone-dot"/><span className="milestone-date">{m.date}</span><h3>{m.title}</h3><ul>{m.items.map(t=><li key={t}>{t}</li>)}</ul><span className="milestone-number">0{i+1}</span></article>)}</div></section>

      <section id="contact" className="closing-section"><img className="parallax-photo" src={dawn} alt="Thung lũng xanh trong nắng sớm" loading="lazy"/><div className="closing-shade"/><div className="closing-content reveal"><span className="eyeline">VÌ NHỮNG NGÀY MAI KHỎE HƠN</span><h2>Cuộc sống vẫn đẹp.<br/><em>Hãy tiếp tục.</em></h2><button className="button button-light" onClick={()=>setDetail({title:'Một hệ sinh thái. Một sự đồng hành.',text:'WeCare kết nối thiết bị đeo ParkGuard AI, ứng dụng theo dõi vận động và phân tích AI. Khám phá giao diện minh họa để hình dung cách theo dõi và chia sẻ thông tin với gia đình, bác sĩ.',image:phone})}>Khám phá WeCare <Arrow/></button></div></section>
      <footer className="cinema-footer"><div className="footer-top"><img src={logo} alt="WeCare"/><p>Công nghệ thấu hiểu.<br/>Cuộc sống trọn vẹn.</p><button className="footer-return" onClick={()=>go('home')}>Trở về đầu trang <Arrow/></button></div><div className="footer-bottom"><span>© 2026 WECARE</span><span>Hình ảnh và sản phẩm minh họa. Lộ trình dự kiến.</span><span>MADE WITH CARE.</span></div></footer>
    </main>
    {detail?<DetailDialog detail={detail} onClose={()=>setDetail(null)}/>:null}
  </div>;
}
