document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealItems = document.querySelectorAll('.section, .showcase, .cta, .feature, .tech-grid, .stats, .color-playground');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealStyle = document.createElement('style');
    revealStyle.textContent = `
      .reveal-ready{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s cubic-bezier(.2,.7,.2,1)}
      .reveal-ready.is-visible{opacity:1;transform:none}
      .feature.reveal-ready:nth-child(2){transition-delay:.05s}.feature.reveal-ready:nth-child(3){transition-delay:.1s}
      .feature.reveal-ready:nth-child(4){transition-delay:.15s}.feature.reveal-ready:nth-child(5){transition-delay:.2s}
    `;
    document.head.appendChild(revealStyle);
    revealItems.forEach(el => el.classList.add('reveal-ready'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: .12 });
    revealItems.forEach(el => observer.observe(el));
  }

  if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    let x = -200, y = -200, targetX = x, targetY = y;
    const style = document.createElement('style');
    style.textContent = `
      .cursor-glow{position:fixed;left:0;top:0;width:280px;height:280px;border-radius:50%;pointer-events:none;z-index:1;background:radial-gradient(circle,rgba(99,230,190,.09),transparent 68%);transform:translate3d(-50%,-50%,0);mix-blend-mode:screen;will-change:transform}
      .site-header,.hero,.marquee,.section,.showcase,.cta,.color-playground,footer{position:relative;z-index:2}
    `;
    document.head.appendChild(style);
    window.addEventListener('pointermove', event => { targetX = event.clientX; targetY = event.clientY; }, { passive: true });
    const animate = () => { x += (targetX - x) * .12; y += (targetY - y) * .12; glow.style.transform = `translate3d(${x}px,${y}px,0)`; requestAnimationFrame(animate); };
    animate();
  }

  const appWindow = document.querySelector('.app-window');
  const heroArt = document.querySelector('.hero-art');
  if (!reduceMotion && appWindow && heroArt && window.matchMedia('(pointer:fine)').matches) {
    heroArt.addEventListener('pointermove', event => {
      const rect = heroArt.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - .5;
      const py = (event.clientY - rect.top) / rect.height - .5;
      appWindow.style.transform = `perspective(900px) rotateX(${py * -4}deg) rotateY(${px * 5}deg) rotateZ(1deg) translateY(-3px)`;
    });
    heroArt.addEventListener('pointerleave', () => { appWindow.style.transform = 'rotate(2deg)'; });
  }

  const preview = document.querySelector('.palette-preview');
  const cards = document.querySelectorAll('.mini-cards span');
  const palettes = [
    ['#07111f','#113b4a','#0f766e','#63e6be','#b8ffe8'],
    ['#10091d','#30204d','#6941a5','#9b8cff','#ddd5ff'],
    ['#07151a','#0c3b43','#087f8c','#45d6c8','#b8fff6'],
    ['#1a0b0b','#4a1717','#a83b32','#ff7b72','#ffd0c7']
  ];
  let paletteIndex = 0;
  const changePalette = () => {
    if (!preview) return;
    const colors = palettes[paletteIndex % palettes.length];
    [...preview.children].forEach((el, i) => { el.style.background = colors[i]; });
    if (cards.length >= 3) { cards[0].style.background = colors[3]; cards[1].style.background = paletteIndex % 2 ? colors[4] : '#7c8cff'; cards[2].style.background = colors[0]; }
    paletteIndex++;
  };
  if (!reduceMotion) window.setInterval(changePalette, 2600);

  // Interactive "What if this was your website?" playground
  const playground = document.querySelector('#playgroundDemo');
  const playgroundSection = document.querySelector('.color-playground');
  if (playground && playgroundSection) {
    playgroundSection.innerHTML = `
      <div class="playground-copy">
        <div class="eyebrow"><span></span> LIVE UI COLOR LAB</div>
        <h2>А если это<br><em>будет твоим сайтом?</em></h2>
        <p>Выбери основной цвет и сразу увидь его на настоящем UI. ColorStudio автоматически соберёт гармоничную палитру.</p>
        <div class="color-controls">
          <label class="color-input-wrap"><input id="landingColor" type="color" value="#63e6be" aria-label="Выберите цвет"><span>Выбрать цвет</span></label>
          <div class="hex-output"><span id="landingHex">#63E6BE</span><button id="copyLandingColor" type="button" aria-label="Скопировать HEX">⧉</button></div>
        </div>
        <div class="playground-actions">
          <button class="btn primary" id="openColorStudio" type="button">Открыть в ColorStudio <b>→</b></button>
          <span id="copyStatus" class="copy-status">Живой предпросмотр активен</span>
        </div>
        <div class="generated-palette" id="generatedPalette"></div>
        <button class="regen-btn" id="regenPalette" type="button">↻ Сгенерировать другую палитру</button>
      </div>
      <div class="playground-demo" id="playgroundDemo">
        <div class="demo-glow"></div>
        <div class="demo-window">
          <div class="demo-window-top"><span>LIVE PREVIEW / DASHBOARD</span><b id="demoHex">#63E6BE</b></div>
          <div class="demo-nav"><strong>STUDIO</strong><span>Overview</span><span>Projects</span><span>Analytics</span><i></i></div>
          <div class="demo-content">
            <span class="demo-label">YOUR COLOR SYSTEM</span>
            <h3>Design that<br>feels <em id="demoAccent">alive.</em></h3>
            <p>Посмотри, как один оттенок меняет настроение всего интерфейса.</p>
            <div class="demo-buttons"><button id="demoButton" type="button">Get started →</button><button class="ghost-demo" type="button">Explore</button></div>
          </div>
          <div class="demo-stats"><div><small>Projects</small><b>24</b></div><div><small>Conversion</small><b id="demoPercent">+38%</b></div><div><small>System</small><b>AA ✓</b></div></div>
        </div>
      </div>`;

    const style = document.createElement('style');
    style.textContent = `
      .color-playground{position:relative}
      .color-playground:after{content:'LIVE';position:absolute;right:26px;top:22px;font:800 9px/1 Inter,sans-serif;letter-spacing:2px;color:#526176;padding:7px 9px;border:1px solid #243247;border-radius:99px;background:#0b111a}
      .generated-palette{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-top:26px;max-width:430px}
      .generated-palette button{height:54px;border:0;border-radius:9px;cursor:pointer;position:relative;overflow:hidden;transition:transform .2s,box-shadow .2s}
      .generated-palette button:hover{transform:translateY(-3px);box-shadow:0 8px 22px rgba(0,0,0,.25)}
      .generated-palette button span{position:absolute;left:7px;bottom:6px;font:700 7px ui-monospace,monospace;text-shadow:0 1px 5px rgba(0,0,0,.45);opacity:0;transition:opacity .2s}
      .generated-palette button:hover span{opacity:1}
      .regen-btn{margin-top:10px;background:none;border:0;color:#6f7d91;font:700 10px Inter,sans-serif;cursor:pointer;padding:5px 0}.regen-btn:hover{color:#fff}
      .demo-window{min-height:365px}
      .demo-nav{display:flex;align-items:center;gap:15px;padding:15px 4px 13px;border-bottom:1px solid #202c3d;color:#657187;font-size:8px}.demo-nav strong{color:#fff;font-size:10px;margin-right:auto}.demo-nav i{width:18px;height:18px;border-radius:50%;background:var(--play-color);display:block}
      .demo-content{padding:27px 24px 20px}.demo-content h3{font-size:31px}.demo-content h3 em{font-style:normal;color:var(--play-color);transition:color .3s}.demo-buttons{display:flex;gap:7px;align-items:center}.demo-buttons button{margin-top:8px}.ghost-demo{background:#172130;color:#aab5c5}
      .demo-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;padding:0 24px}.demo-stats div{padding:11px;border:1px solid #202d40;border-radius:9px;background:#0d151f}.demo-stats small{display:block;color:#657187;font-size:7px;margin-bottom:5px}.demo-stats b{font-size:12px;color:#eef3fa}.demo-stats div:nth-child(2) b{color:var(--play-color);transition:color .3s}
      @media(max-width:620px){.color-playground:after{right:15px;top:15px}.generated-palette{max-width:none}.generated-palette button{height:46px}.demo-nav span{display:none}.demo-content{padding:24px 17px 18px}.demo-stats{padding:0 17px}}
    `;
    document.head.appendChild(style);

    const colorInput = document.querySelector('#landingColor');
    const hexOutput = document.querySelector('#landingHex');
    const demoHex = document.querySelector('#demoHex');
    const demoButton = document.querySelector('#demoButton');
    const demoAccent = document.querySelector('#demoAccent');
    const demoPercent = document.querySelector('#demoPercent');
    const copyButton = document.querySelector('#copyLandingColor');
    const copyStatus = document.querySelector('#copyStatus');
    const openStudio = document.querySelector('#openColorStudio');
    const generatedPalette = document.querySelector('#generatedPalette');
    const regenPalette = document.querySelector('#regenPalette');
    const hexToRgb = hex => { const v=hex.replace('#',''); return {r:parseInt(v.slice(0,2),16),g:parseInt(v.slice(2,4),16),b:parseInt(v.slice(4,6),16)}; };
    const rgbToHex = (r,g,b) => '#' + [r,g,b].map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('');
    const rgbToHsl = (r,g,b) => { r/=255;g/=255;b/=255;const max=Math.max(r,g,b),min=Math.min(r,g,b);let h=0,s=0,l=(max+min)/2;if(max!==min){const d=max-min;s=l>.5?d/(2-max-min):d/(max+min);switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;default:h=(r-g)/d+4;}h/=6;}return [h*360,s*100,l*100]; };
    const hslToRgb = (h,s,l) => { s/=100;l/=100;const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2;let r=0,g=0,b=0;if(h<60){r=c;g=x}else if(h<120){r=x;g=c}else if(h<180){g=c;b=x}else if(h<240){g=x;b=c}else if(h<300){r=x;b=c}else{r=c;b=x}return {r:(r+m)*255,g:(g+m)*255,b:(b+m)*255}; };
    const getContrastText = hex => { const {r,g,b}=hexToRgb(hex); const y=(.299*r+.587*g+.114*b)/255; return y>.58?'#07100d':'#fff'; };
    let locked = false;
    let generated = [];
    const makePalette = base => { const {r,g,b}=hexToRgb(base); const [h,s,l]=rgbToHsl(r,g,b); return [base, rgbToHex(...Object.values(hslToRgb((h+30)%360,Math.min(90,s+5),Math.min(82,Math.max(28,l+8))))), rgbToHex(...Object.values(hslToRgb((h+180)%360,Math.min(90,s+2),Math.min(78,Math.max(30,l+3))))), rgbToHex(...Object.values(hslToRgb((h+210)%360,Math.min(90,s+10),Math.max(18,l-20)))), rgbToHex(...Object.values(hslToRgb(h,s*.35,Math.min(94,l+35))))]; };
    const renderPalette = () => { generatedPalette.innerHTML=''; generated.forEach((color,i)=>{const b=document.createElement('button');b.type='button';b.style.background=color;b.title=`${color.toUpperCase()} · нажми, чтобы выбрать`;const s=document.createElement('span');s.textContent=color.toUpperCase();b.appendChild(s);b.addEventListener('click',()=>{colorInput.value=color;updatePlayground();});generatedPalette.appendChild(b);}); };
    const updatePlayground = () => {
      const color=colorInput.value.toUpperCase(); const text=getContrastText(color); playground.style.setProperty('--play-color',color); playground.style.setProperty('--play-text',text); hexOutput.textContent=color; demoHex.textContent=color; demoButton.style.background=color; demoButton.style.color=text; demoAccent.textContent=['alive.','memorable.','powerful.','yours.'][Math.floor(Math.random()*4)]; demoPercent.textContent=`+${30+parseInt(color.slice(1,3),16)%21}%`;
      if(!locked){generated=makePalette(color);renderPalette();}
    };
    colorInput.addEventListener('input',updatePlayground); updatePlayground();
    regenPalette.addEventListener('click',()=>{locked=true;const seed=rgbToHex(Math.random()*180+40,Math.random()*180+40,Math.random()*180+40);colorInput.value=seed;locked=false;updatePlayground();regenPalette.textContent='↻ Палитра обновлена';setTimeout(()=>regenPalette.textContent='↻ Сгенерировать другую палитру',1400);});
    copyButton.addEventListener('click',async()=>{const value=colorInput.value.toUpperCase();try{await navigator.clipboard.writeText(value);copyStatus.textContent=`${value} скопирован`;}catch{copyStatus.textContent='Скопируй HEX вручную';}setTimeout(()=>copyStatus.textContent='Живой предпросмотр активен',1800);});
    openStudio.addEventListener('click',()=>{window.location.href=`app.html?color=${encodeURIComponent(colorInput.value)}`;});
  }

  const header = document.querySelector('.site-header');
  const updateHeader = () => { if (header) header.classList.toggle('scrolled', window.scrollY > 20); };
  updateHeader(); window.addEventListener('scroll', updateHeader, { passive:true });

  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const sections = [...navLinks].map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver(entries=>{entries.forEach(entry=>{const link=document.querySelector(`nav a[href="#${entry.target.id}"]`);if(link&&entry.isIntersecting){navLinks.forEach(item=>item.classList.remove('active'));link.classList.add('active');}});},{rootMargin:'-35% 0px -55% 0px'});
    sections.forEach(section=>navObserver.observe(section));
  }
});
