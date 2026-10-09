document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll reveal
  const revealItems = document.querySelectorAll('.section, .showcase, .cta, .feature, .tech-grid, .stats');
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

  // Cursor glow on desktop
  if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    let x = -200, y = -200, targetX = x, targetY = y;
    const style = document.createElement('style');
    style.textContent = `
      .cursor-glow{position:fixed;left:0;top:0;width:280px;height:280px;border-radius:50%;pointer-events:none;z-index:1;background:radial-gradient(circle,rgba(99,230,190,.09),transparent 68%);transform:translate3d(-50%,-50%,0);mix-blend-mode:screen;will-change:transform}
      .site-header,.hero,.marquee,.section,.showcase,.cta,footer{position:relative;z-index:2}
    `;
    document.head.appendChild(style);
    window.addEventListener('pointermove', event => {
      targetX = event.clientX;
      targetY = event.clientY;
    }, { passive: true });
    const animate = () => {
      x += (targetX - x) * .12;
      y += (targetY - y) * .12;
      glow.style.transform = `translate3d(${x}px,${y}px,0)`;
      requestAnimationFrame(animate);
    };
    animate();
  }

  // Interactive hero preview
  const appWindow = document.querySelector('.app-window');
  const heroArt = document.querySelector('.hero-art');
  if (!reduceMotion && appWindow && heroArt && window.matchMedia('(pointer:fine)').matches) {
    heroArt.addEventListener('pointermove', event => {
      const rect = heroArt.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - .5;
      const py = (event.clientY - rect.top) / rect.height - .5;
      appWindow.style.transform = `perspective(900px) rotateX(${py * -4}deg) rotateY(${px * 5}deg) rotateZ(1deg) translateY(-3px)`;
    });
    heroArt.addEventListener('pointerleave', () => {
      appWindow.style.transform = 'rotate(2deg)';
    });
  }

  // Slowly changing colors in the product preview
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
    [...preview.children].forEach((el, i) => {
      el.style.background = colors[i];
    });
    if (cards.length >= 3) {
      cards[0].style.background = colors[3];
      cards[1].style.background = paletteIndex % 2 ? colors[4] : '#7c8cff';
      cards[2].style.background = colors[0];
    }
    paletteIndex++;
  };
  if (!reduceMotion) window.setInterval(changePalette, 2600);

  // Header state while scrolling
  const header = document.querySelector('.site-header');
  const updateHeader = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 20);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // Current section highlight
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
