/* ColorStudio Supabase configuration */
window.COLORSTUDIO_SUPABASE = {
  url: "https://rruevlqnvftylivpxeky.supabase.co",
  key: "sb_publishable_LE51lE3dbBTMzqpGqFnhZA_1qXst4_F"
};

/* Landing → App color handoff */
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("color");
  const color = raw && /^#[0-9a-fA-F]{6}$/.test(raw) ? raw.toUpperCase() : null;
  if (!color) return;

  const setValueAndDispatch = (selector, value) => {
    const el = document.querySelector(selector);
    if (!el) return;
    el.value = value;
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  };

  setValueAndDispatch("#nativeColor", color);
  setValueAndDispatch("#generatorColor", color);
  setValueAndDispatch("#generatorHex", color);
  setValueAndDispatch("#g1", color);
  setValueAndDispatch("#g1text", color);

  document.querySelector('.tab[data-tab="picker"]')?.click();

  requestAnimationFrame(() => {
    setValueAndDispatch("#nativeColor", color);
  });
});
