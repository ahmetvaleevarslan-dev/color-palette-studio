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
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
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
    const animate = () => {
      x += (targetX - x) * .12;
      y += (targetY - y) * .12;
      glow.style.transform = `translate3d(${x}px,${y}px,0)`;
      requestAnimationFrame(animate);
    };
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
    if (cards.length >= 3) {
      cards[0].style.background = colors[3];
      cards[1].style.background = paletteIndex % 2 ? colors[4] : '#7c8cff';
      cards[2].style.background = colors[0];
    }
    paletteIndex++;
  };
  if (!reduceMotion) window.setInterval(changePalette, 2600);

  // Live Color Playground
  const colorInput = document.querySelector('#landingColor');
  const hexOutput = document.querySelector('#landingHex');
  const demoHex = document.querySelector('#demoHex');
  const playground = document.querySelector('#playgroundDemo');
  const demoButton = document.querySelector('#demoButton');
  const copyButton = document.querySelector('#copyLandingColor');
  const copyStatus = document.querySelector('#copyStatus');
  const openStudio = document.querySelector('#openColorStudio');

  const hexToRgb = hex => {
    const value = hex.replace('#','');
    return {
      r: parseInt(value.slice(0,2),16),
      g: parseInt(value.slice(2,4),16),
      b: parseInt(value.slice(4,6),16)
    };
  };

  const getContrastText = hex => {
    const {r,g,b} = hexToRgb(hex);
    const luminance = (0.299*r + 0.587*g + 0.114*b) / 255;
    return luminance > .58 ? '#07100d' : '#ffffff';
  };

  const updatePlayground = () => {
    if (!colorInput || !playground) return;
    const color = colorInput.value.toUpperCase();
    const textColor = getContrastText(color);
    playground.style.setProperty('--play-color', color);
    playground.style.setProperty('--play-text', textColor);
    if (hexOutput) hexOutput.textContent = color;
    if (demoHex) demoHex.textContent = color;
    if (demoButton) {
      demoButton.style.background = color;
      demoButton.style.color = textColor;
    }
  };

  colorInput?.addEventListener('input', updatePlayground);
  updatePlayground();

  copyButton?.addEventListener('click', async () => {
    const value = colorInput?.value.toUpperCase();
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      if (copyStatus) copyStatus.textContent = `${value} скопирован`;
    } catch {
      if (copyStatus) copyStatus.textContent = 'Скопируй HEX вручную';
    }
    setTimeout(() => { if (copyStatus) copyStatus.textContent = 'HEX готов к копированию'; }, 1800);
  });

  openStudio?.addEventListener('click', () => {
    const value = colorInput?.value || '#63e6be';
    window.location.href = `app.html?color=${encodeURIComponent(value)}`;
  });

  const header = document.querySelector('.site-header');
  const updateHeader = () => { if (header) header.classList.toggle('scrolled', window.scrollY > 20); };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const sections = [...navLinks].map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const link = document.querySelector(`nav a[href="#${entry.target.id}"]`);
        if (link && entry.isIntersecting) {
          navLinks.forEach(item => item.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(section => navObserver.observe(section));
  }
});
