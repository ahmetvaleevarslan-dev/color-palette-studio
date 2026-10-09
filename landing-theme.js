document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;

  const style = document.createElement('style');
  style.id = 'dynamic-landing-theme';
  style.textContent = `
    :root {
      --accent: #63e6be;
      --accent-rgb: 99,230,190;
      --accent-contrast: #07100d;
      --accent-soft: rgba(99,230,190,.12);
      --accent-border: rgba(99,230,190,.28);
    }

    body {
      background:
        radial-gradient(circle at 78% 4%, rgba(var(--accent-rgb), .12), transparent 26%),
        radial-gradient(circle at 10% 48%, rgba(var(--accent-rgb), .055), transparent 24%),
        #06090d;
      transition: background .45s ease;
    }

    .brand span,
    .eyebrow span,
    .hero h1 em,
    .showcase h2 em,
    .cta h2 em,
    .color-playground h2 em,
    .marquee b,
    .marquee span:nth-of-type(odd),
    .text-link,
    .feature .icon,
    .stats strong,
    .steps b,
    .tech-grid strong {
      color: var(--accent) !important;
      transition: color .35s ease;
    }

    .eyebrow span {
      background: var(--accent) !important;
      box-shadow: 0 0 16px rgba(var(--accent-rgb), .55);
    }

    .btn.primary,
    .hero-actions .btn.primary,
    .cta .btn.primary,
    .playground-actions .btn.primary {
      background: var(--accent) !important;
      color: var(--accent-contrast) !important;
      border-color: var(--accent) !important;
      box-shadow: 0 12px 30px rgba(var(--accent-rgb), .16) !important;
      transition: background .35s ease, color .35s ease, box-shadow .35s ease, transform .2s ease;
    }

    .btn.primary:hover {
      box-shadow: 0 16px 36px rgba(var(--accent-rgb), .27) !important;
    }

    .nav-app,
    .feature:hover,
    .tech-grid > div:hover,
    .text-link:hover {
      border-color: var(--accent-border) !important;
    }

    .nav-app {
      color: var(--accent) !important;
      background: rgba(var(--accent-rgb), .055) !important;
    }

    .nav-app:hover {
      background: rgba(var(--accent-rgb), .11) !important;
    }

    .stats strong {
      text-shadow: 0 0 26px rgba(var(--accent-rgb), .15);
    }

    .feature .icon {
      border-color: rgba(var(--accent-rgb), .22) !important;
      background: rgba(var(--accent-rgb), .055) !important;
    }

    .rings b:first-child,
    .rings b:nth-child(2),
    .rings b:nth-child(3) {
      border-color: var(--accent) !important;
    }

    .contrast-demo strong {
      color: var(--accent) !important;
    }

    .gradient-demo {
      background: linear-gradient(120deg, #111722, var(--accent), #7c8cff) !important;
      box-shadow: 0 0 30px rgba(var(--accent-rgb), .12);
    }

    .image-demo span:first-child,
    .image-demo span:nth-child(4) {
      background: var(--accent) !important;
    }

    .mini-sidebar b,
    .mini-sidebar .active {
      background: var(--accent) !important;
      color: var(--accent-contrast) !important;
    }

    .mini-cards span:first-child {
      background: var(--accent) !important;
    }

    .orb-a {
      background: var(--accent) !important;
      box-shadow: 0 0 100px rgba(var(--accent-rgb), .28) !important;
    }

    .color-playground {
      --play-color: var(--accent);
    }

    .color-playground:before {
      background: radial-gradient(circle, rgba(var(--accent-rgb), .14), transparent 68%) !important;
    }

    .demo-glow {
      background: radial-gradient(circle, rgba(var(--accent-rgb), .2), transparent 68%) !important;
    }

    .site-header.scrolled {
      border-bottom-color: rgba(var(--accent-rgb), .18) !important;
      box-shadow: 0 10px 40px rgba(var(--accent-rgb), .035);
    }

    .cursor-glow {
      background: radial-gradient(circle, rgba(var(--accent-rgb), .13), transparent 68%) !important;
    }

    .dynamic-accent-pulse {
      animation: dynamicAccentPulse .55s ease;
    }

    @keyframes dynamicAccentPulse {
      0% { filter: saturate(1); }
      45% { filter: saturate(1.35) brightness(1.08); }
      100% { filter: saturate(1); }
    }
  `;
  document.head.appendChild(style);

  const hexToRgb = hex => {
    const value = hex.replace('#', '');
    return {
      r: parseInt(value.slice(0, 2), 16),
      g: parseInt(value.slice(2, 4), 16),
      b: parseInt(value.slice(4, 6), 16)
    };
  };

  const getContrastText = ({ r, g, b }) => {
    const luminance = (.299 * r + .587 * g + .114 * b) / 255;
    return luminance > .58 ? '#07100d' : '#ffffff';
  };

  const applyAccent = value => {
    if (!/^#[0-9a-f]{6}$/i.test(value)) return;

    const color = value.toUpperCase();
    const { r, g, b } = hexToRgb(color);
    root.style.setProperty('--accent', color);
    root.style.setProperty('--accent-rgb', `${r},${g},${b}`);
    root.style.setProperty('--accent-contrast', getContrastText({ r, g, b }));
    root.style.setProperty('--accent-soft', `rgba(${r},${g},${b},.12)`);
    root.style.setProperty('--accent-border', `rgba(${r},${g},${b},.28)`);

    document.querySelectorAll('.brand, .hero h1 em, .showcase h2 em, .cta h2 em').forEach(el => {
      el.classList.remove('dynamic-accent-pulse');
      void el.offsetWidth;
      el.classList.add('dynamic-accent-pulse');
    });
  };

  const syncFromPicker = () => {
    const picker = document.querySelector('#landingColor');
    if (picker) applyAccent(picker.value);
  };

  syncFromPicker();

  document.addEventListener('input', event => {
    if (event.target?.id === 'landingColor') applyAccent(event.target.value);
  });

  document.addEventListener('change', event => {
    if (event.target?.id === 'landingColor') applyAccent(event.target.value);
  });

  document.addEventListener('click', event => {
    if (event.target.closest('.generated-palette button, #regenPalette')) {
      window.setTimeout(syncFromPicker, 0);
    }
  });
});
