(() => {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('color');
  if (!raw) return;

  const color = raw.match(/^#[0-9a-fA-F]{6}$/) ? raw.toUpperCase() : null;
  if (!color) return;

  const setValueAndDispatch = (selector, value, eventName = 'input') => {
    const el = document.querySelector(selector);
    if (!el) return;
    el.value = value;
    el.dispatchEvent(new Event(eventName, { bubbles: true }));
  };

  // Open the color picker and use the selected landing-page color as the base color.
  setValueAndDispatch('#nativeColor', color);
  setValueAndDispatch('#generatorColor', color);
  setValueAndDispatch('#generatorHex', color, 'input');

  // Keep the gradient generator in sync with the selected color as well.
  setValueAndDispatch('#g1', color);
  setValueAndDispatch('#g1text', color, 'input');

  // Show the picker tab so the selected color is immediately visible.
  const pickerTab = document.querySelector('.tab[data-tab="picker"]');
  pickerTab?.click();

  // The app's tab handlers may run asynchronously after the initial click.
  requestAnimationFrame(() => {
    const picker = document.querySelector('#nativeColor');
    if (picker) picker.dispatchEvent(new Event('input', { bubbles: true }));
  });
})();
