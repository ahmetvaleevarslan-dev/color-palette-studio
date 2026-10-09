const palettes = [
  {
    name: "Midnight Neon",
    colors: ["#63E6BE","#7C8CFF","#00D9FF","#A855F7","#F472B6","#22D3EE","#34D399","#818CF8"]
  },
  {
    name: "Emerald Tech",
    colors: ["#00A86B","#10B981","#34D399","#6EE7B7","#A7F3D0","#059669","#047857","#064E3B"]
  },
  {
    name: "Ocean",
    colors: ["#0077B6","#00B4D8","#48CAE4","#90E0EF","#CAF0F8","#023E8A","#03045E","#38BDF8"]
  },
  {
    name: "Sunset",
    colors: ["#FF6B35","#F97316","#FB923C","#F59E0B","#FBBF24","#EF4444","#EC4899","#DB2777"]
  },
  {
    name: "Cyber Violet",
    colors: ["#7C3AED","#8B5CF6","#A78BFA","#C084FC","#D946EF","#E879F9","#6366F1","#4F46E5"]
  },
  {
    name: "Fresh",
    colors: ["#22C55E","#84CC16","#A3E635","#BEF264","#FACC15","#4ADE80","#2DD4BF","#14B8A6"]
  },
  {
    name: "Cherry",
    colors: ["#7F1D1D","#991B1B","#DC2626","#EF4444","#F87171","#FB7185","#E11D48","#BE123C"]
  },
  {
    name: "Royal",
    colors: ["#312E81","#3730A3","#4338CA","#4F46E5","#6366F1","#818CF8","#A5B4FC","#C7D2FE"]
  },
  {
    name: "Warm Earth",
    colors: ["#451A03","#78350F","#92400E","#B45309","#D97706","#F59E0B","#FBBF24","#FDE68A"]
  },
  {
    name: "Pastel Dream",
    colors: ["#FBCFE8","#F9A8D4","#C4B5FD","#A5B4FC","#93C5FD","#A7F3D0","#BBF7D0","#FEF08A"]
  },
  {
    name: "Forest",
    colors: ["#052E16","#14532D","#166534","#15803D","#16A34A","#22C55E","#4ADE80","#86EFAC"]
  },
  {
    name: "Ice",
    colors: ["#E0F2FE","#BAE6FD","#7DD3FC","#38BDF8","#0EA5E9","#0284C7","#0369A1","#075985"]
  },
  {
    name: "Lavender",
    colors: ["#2E1065","#4C1D95","#6D28D9","#7C3AED","#8B5CF6","#A78BFA","#C4B5FD","#DDD6FE"]
  },
  {
    name: "Monochrome",
    colors: ["#000000","#171717","#262626","#404040","#525252","#737373","#A3A3A3","#E5E5E5"]
  },
  {
    name: "Candy",
    colors: ["#F43F5E","#FB7185","#F472B6","#E879F9","#C084FC","#A78BFA","#818CF8","#60A5FA"]
  },
  {
    name: "Coffee",
    colors: ["#1C1917","#292524","#44403C","#57534E","#78716C","#A8A29E","#D6D3D1","#E7E5E4"]
  },
  {
    name: "Aurora",
    colors: ["#00F5D4","#00BBF9","#3A86FF","#8338EC","#FF006E","#FB5607","#FFBE0B","#80FFDB"]
  },
  {
    name: "Ocean Deep",
    colors: ["#020617","#0F172A","#172554","#1E3A8A","#075985","#0369A1","#0891B2","#06B6D4"]
  },
  {
    name: "Minimal Beige",
    colors: ["#292524","#57534E","#78716C","#A8A29E","#D6D3D1","#E7E5E4","#F5F5F4","#FAFAF9"]
  },
  {
    name: "Neon Lime",
    colors: ["#365314","#4D7C0F","#65A30D","#84CC16","#A3E635","#BEF264","#D9F99D","#ECFCCB"]
  },
  {
    name: "Berry",
    colors: ["#4A044E","#701A75","#86198F","#A21CAF","#C026D3","#D946EF","#E879F9","#F0ABFC"]
  },
  {
    name: "Steel",
    colors: ["#0F172A","#1E293B","#334155","#475569","#64748B","#94A3B8","#CBD5E1","#E2E8F0"]
  },
  {
    name: "Tropical",
    colors: ["#006D77","#008891","#00A896","#02C39A","#F0F3BD","#F4A261","#E76F51","#264653"]
  },
  {
    name: "Fire",
    colors: ["#450A0A","#7F1D1D","#B91C1C","#DC2626","#EF4444","#F97316","#F59E0B","#FDE047"]
  }
];

function populatePaletteFilter() {
  const select = document.querySelector("#paletteFilter");
  if (!select) return;

  select.innerHTML = `
    <option value="all">Все палитры</option>
    ${palettes.map(p => `<option value="${htmlEscape(p.name)}">${htmlEscape(p.name)}</option>`).join("")}
  `;
}



const $=s=>document.querySelector(s);
const toast=t=>{const x=$("#toast");x.textContent=t||"Скопировано ✓";x.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>x.classList.remove("show"),1300)}
async function copy(t){try{await navigator.clipboard.writeText(t)}catch{const a=document.createElement("textarea");a.value=t;document.body.append(a);a.select();document.execCommand("copy");a.remove()}toast()}

function showColorModal(hex){
  const [r,g,b]=hexToRgb(hex),[h,s,l]=rgbToHsl(r,g,b);
  const values=[
    ["HEX",hex.toUpperCase()],
    ["RGB",`rgb(${r}, ${g}, ${b})`],
    ["HSL",`hsl(${h}, ${s}%, ${l}%)`],
    ["RGBA",`rgba(${r}, ${g}, ${b}, 1)`]
  ];
  $("#modalColor").style.background=hex;
  $("#modalFormats").innerHTML=values.map(([name,value])=>`
    <div class="modal-format">
      <div><small>${name}</small><strong>${value}</strong></div>
      <button class="copy-mini" data-modal-copy="${value}">Скопировать</button>
    </div>`).join("");
  document.querySelectorAll("[data-modal-copy]").forEach(b=>b.onclick=()=>copy(b.dataset.modalCopy));
  $("#colorModal").classList.add("show");
}
$("#closeModal").onclick=()=>$("#colorModal").classList.remove("show");
$("#colorModal").addEventListener("click",e=>{
  if(e.target.id==="colorModal") $("#colorModal").classList.remove("show");
});
document.addEventListener("keydown",e=>{
  if(e.key==="Escape") $("#colorModal").classList.remove("show");
});

function normalizeSearch(value){
  return value.trim().toLowerCase().replace(/\s+/g,"");
}
function parseColorInput(value){
  const raw=value.trim();
  let hex=null;

  if(/^#[0-9a-f]{3}$/i.test(raw)){
    hex="#"+raw.slice(1).split("").map(x=>x+x).join("");
  }else if(/^#[0-9a-f]{6}$/i.test(raw)){
    hex=raw;
  }else if(/^([0-9a-f]{6})$/i.test(raw)){
    hex="#"+raw;
  }else{
    const rgb=raw.match(/^rgba?\(\s*(\d{1,3})\s*[, ]\s*(\d{1,3})\s*[, ]\s*(\d{1,3})/i);
    if(rgb){
      const nums=[+rgb[1],+rgb[2],+rgb[3]];
      if(nums.every(n=>n>=0&&n<=255)){
        hex="#"+nums.map(n=>n.toString(16).padStart(2,"0")).join("");
      }
    }
    const hsl=raw.match(/^hsla?\(\s*(\d{1,3})\s*[, ]\s*(\d{1,3})%?\s*[, ]\s*(\d{1,3})%?/i);
    if(!hex && hsl){
      let h=(+hsl[1]%360)/360,s=Math.max(0,Math.min(100,+hsl[2]))/100,l=Math.max(0,Math.min(100,+hsl[3]))/100;
      const hue2rgb=(p,q,t)=>{if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+(q-p)*6*t;if(t<1/2)return q;if(t<2/3)return p+(q-p)*(2/3-t)*6;return p};
      let r,g,b;
      if(s===0)r=g=b=l;else{const q=l<.5?l*(1+s):l+s-l*s,p=2*l-q;r=hue2rgb(p,q,h+1/3);g=hue2rgb(p,q,h);b=hue2rgb(p,q,h-1/3)}
      hex="#"+[r,g,b].map(n=>Math.round(n*255).toString(16).padStart(2,"0")).join("");
    }
  }
  return hex?hex.toUpperCase():null;
}
function colorDistance(a,b){
  const x=hexToRgb(a),y=hexToRgb(b);
  return Math.sqrt((x[0]-y[0])**2+(x[1]-y[1])**2+(x[2]-y[2])**2);
}
/* =========================
   Supabase + authentication
   ========================= */
const SUPABASE_CONFIG = window.COLORSTUDIO_SUPABASE || {};
const SUPABASE_READY = Boolean(
  window.supabase &&
  SUPABASE_CONFIG.url &&
  SUPABASE_CONFIG.key &&
  !SUPABASE_CONFIG.url.includes("YOUR_SUPABASE") &&
  !SUPABASE_CONFIG.key.includes("YOUR_SUPABASE")
);
const supabaseClient = SUPABASE_READY
  ? window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    })
  : null;

let currentUser = null;
let authMode = "login";

function getSavedColors() {
  try {
    return JSON.parse(localStorage.getItem("savedColors") || "[]");
  } catch {
    return [];
  }
}

function saveSavedColors(colors) {
  localStorage.setItem("savedColors", JSON.stringify(colors));
}

function setAuthMessage(message = "", type = "") {
  const el = $("#authMessage");
  if (!el) return;
  el.textContent = message;
  el.className = `auth-message ${type}`.trim();
}

function openAuthModal(mode = "login") {
  authMode = mode;
  $("#authModal")?.classList.add("show");
  updateAuthMode();
  setAuthMessage("");
  setTimeout(() => $("#authEmail")?.focus(), 50);
}

function closeAuthModal() {
  $("#authModal")?.classList.remove("show");
  $("#authForm")?.reset();
  setAuthMessage("");
}

function updateAuthMode() {
  const login = authMode === "login";
  $("#authTitle").textContent = login ? "Вход" : "Регистрация";
  $("#authSubmit").textContent = login ? "Войти" : "Создать аккаунт";
  $("#authPassword").setAttribute("autocomplete", login ? "current-password" : "new-password");
  $("#loginMode")?.classList.toggle("active", login);
  $("#registerMode")?.classList.toggle("active", !login);
}

function getUserDisplayName(user = currentUser) {
  const name = user?.user_metadata?.display_name;
  return typeof name === "string" && name.trim() ? name.trim() : "";
}

function getUserInitial(value = "A") {
  const clean = String(value).trim();
  return (clean[0] || "A").toUpperCase();
}

function updateFavoriteCount() {
  const count = $("#favoriteCount");
  if (count) count.textContent = getSavedColors().length;
}

function updateAuthUI() {
  const button = $("#authButton");
  const menu = $("#userMenu");
  const email = $("#userEmail");
  const avatar = $("#userAvatar");
  const largeAvatar = $("#profileAvatarLarge");
  const largeEmail = $("#profileEmailLarge");
  if (!button || !menu) return;

  if (currentUser) {
    const userEmail = currentUser.email || "Аккаунт";
    const displayName = getUserDisplayName();
    const identity = displayName || userEmail;
    const initial = getUserInitial(identity);
    button.hidden = true;
    menu.hidden = false;
    if (email) email.textContent = displayName || userEmail;
    if (avatar) avatar.textContent = initial;
    if (largeAvatar) largeAvatar.textContent = initial;
    if (largeEmail) largeEmail.textContent = displayName || userEmail;
    $("#profileDisplayNameSmall")?.replaceChildren(document.createTextNode(displayName ? userEmail : "Ваш ColorStudio"));
    updateFavoriteCount();
  } else {
    button.hidden = false;
    menu.hidden = true;
    button.textContent = "Войти";
    if (email) email.textContent = "";
    if (avatar) avatar.textContent = "A";
    if (largeAvatar) largeAvatar.textContent = "A";
    if (largeEmail) largeEmail.textContent = "Аккаунт";
    $("#profileDisplayNameSmall")?.replaceChildren(document.createTextNode("Ваш ColorStudio"));
    $("#favoriteCount") && ($("#favoriteCount").textContent = "0");
    $("#profileDropdown")?.setAttribute("hidden", "");
    $("#profileButton")?.setAttribute("aria-expanded", "false");
  }
}

async function syncFavoritesFromCloud() {
  if (!supabaseClient || !currentUser) return;

  const { data, error } = await supabaseClient
    .from("favorites")
    .select("color")
    .eq("user_id", currentUser.id)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    toast("Не удалось загрузить избранное");
    return;
  }

  const cloudColors = (data || []).map(row => row.color.toUpperCase());
  const localColors = getSavedColors().map(c => c.toUpperCase());
  const merged = [...new Set([...cloudColors, ...localColors])];

  // Transfer local favorites to the account when the user signs in for the first time.
  const missingInCloud = localColors.filter(color => !cloudColors.includes(color));
  if (missingInCloud.length) {
    const { error: insertError } = await supabaseClient
      .from("favorites")
      .insert(missingInCloud.map(color => ({ user_id: currentUser.id, color })));
    if (insertError) console.error(insertError);
  }

  saveSavedColors(merged);
  updateFavoriteCount();
  renderSaved();
  updatePaletteStars();
}

async function addFavoriteToCloud(hex) {
  if (!supabaseClient || !currentUser) return true;
  const { error } = await supabaseClient
    .from("favorites")
    .insert({ user_id: currentUser.id, color: hex.toUpperCase() });

  if (error && error.code !== "23505") {
    console.error(error);
    toast("Не удалось сохранить цвет в облако");
    return false;
  }
  return true;
}

async function removeFavoriteFromCloud(hex) {
  if (!supabaseClient || !currentUser) return true;
  const { error } = await supabaseClient
    .from("favorites")
    .delete()
    .eq("user_id", currentUser.id)
    .eq("color", hex.toUpperCase());

  if (error) {
    console.error(error);
    toast("Не удалось удалить цвет из облака");
    return false;
  }
  return true;
}

async function toggleFavoriteColor(hex) {
  if (!currentUser) {
    toast("Войдите в аккаунт, чтобы добавлять цвета в избранное");
    openAuthModal("login");
    return;
  }

  const normalized = hex.toUpperCase();
  const saved = getSavedColors();
  const index = saved.indexOf(normalized);

  if (index === -1) {
    saved.push(normalized);
    saveSavedColors(saved);
    updateFavoriteCount();
    updatePaletteStars();
    renderSaved();
    toast(currentUser ? "Добавлено и синхронизировано ★" : "Добавлено в избранное ★");

    if (currentUser) await addFavoriteToCloud(normalized);
  } else {
    saved.splice(index, 1);
    saveSavedColors(saved);
    updateFavoriteCount();
    updatePaletteStars();
    renderSaved();
    toast("Удалено из избранного");

    if (currentUser) await removeFavoriteFromCloud(normalized);
  }
}

function updatePaletteStars() {
  const saved = currentUser ? getSavedColors() : [];
  document.querySelectorAll("#paletteList .color-star").forEach(star => {
    const hex = star.dataset.star;
    const active = saved.includes(hex);
    star.textContent = active ? "★" : "☆";
    star.classList.toggle("is-favorite", active);
    star.title = active ? "Убрать из избранного" : "Добавить в избранное";
    star.setAttribute("aria-label", active ? "Убрать из избранного" : "Добавить в избранное");
  });
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  if (!supabaseClient) {
    setAuthMessage("Сначала подключи Supabase в config.js", "error");
    return;
  }

  const email = $("#authEmail").value.trim();
  const password = $("#authPassword").value;
  const submit = $("#authSubmit");

  submit.disabled = true;
  setAuthMessage("Подключаемся…");

  try {
    let result;
    if (authMode === "login") {
      result = await supabaseClient.auth.signInWithPassword({ email, password });
    } else {
      result = await supabaseClient.auth.signUp({ email, password });
    }

    if (result.error) throw result.error;

    if (authMode === "register" && !result.data.session) {
      setAuthMessage("Аккаунт создан. Проверь почту и подтверди email, затем войди.", "success");
      return;
    }

    closeAuthModal();
  } catch (error) {
    console.error(error);
    setAuthMessage(error.message || "Не удалось выполнить операцию", "error");
  } finally {
    submit.disabled = false;
  }
}

function openProfileModal() {
  if (!currentUser) return;
  $("#profileDropdown")?.setAttribute("hidden", "");
  $("#profileButton")?.setAttribute("aria-expanded", "false");

  const displayName = getUserDisplayName();
  const email = currentUser.email || "";
  const identity = displayName || email || "A";
  $("#displayNameInput").value = displayName;
  $("#profileEmailInput").value = email;
  $("#profileModalEmail").textContent = displayName || email || "Аккаунт";
  $("#profileModalCount").textContent = `${getSavedColors().length} избранных цветов`;
  $("#profileModalAvatar").textContent = getUserInitial(identity);
  $("#newPasswordInput").value = "";
  setProfileMessage("");
  $("#profileModal")?.classList.add("show");
}

function closeProfileModal() {
  $("#profileModal")?.classList.remove("show");
  setProfileMessage("");
}

function setProfileMessage(message, type = "") {
  const el = $("#profileMessage");
  if (!el) return;
  el.textContent = message;
  el.className = `auth-message${type ? ` ${type}` : ""}`;
}

async function handleProfileSubmit(event) {
  event.preventDefault();
  if (!supabaseClient || !currentUser) return;

  const displayName = $("#displayNameInput").value.trim();
  const newPassword = $("#newPasswordInput").value;
  const submit = event.currentTarget.querySelector("button[type=submit]");
  submit.disabled = true;
  setProfileMessage("Сохраняем изменения…");

  try {
    const updates = { data: { ...currentUser.user_metadata, display_name: displayName } };
    if (newPassword) updates.password = newPassword;

    const { data, error } = await supabaseClient.auth.updateUser(updates);
    if (error) throw error;

    currentUser = data.user || currentUser;
    updateAuthUI();
    $("#profileModalEmail").textContent = displayName || currentUser.email || "Аккаунт";
    $("#profileModalAvatar").textContent = getUserInitial(displayName || currentUser.email || "A");
    $("#newPasswordInput").value = "";
    setProfileMessage("Профиль сохранён ✓", "success");
    toast("Профиль обновлён ✓");
  } catch (error) {
    console.error(error);
    setProfileMessage(error.message || "Не удалось сохранить изменения", "error");
  } finally {
    submit.disabled = false;
  }
}

async function initAuth() {
  updateAuthUI();

  if (!supabaseClient) {
    console.info("Supabase is not configured yet. Local favorites remain available.");
    return;
  }

  const { data } = await supabaseClient.auth.getSession();
  currentUser = data.session?.user || null;
  updateAuthUI();
  if (currentUser) await syncFavoritesFromCloud();

  supabaseClient.auth.onAuthStateChange(async (_event, session) => {
    currentUser = session?.user || null;
    updateAuthUI();
    if (currentUser) await syncFavoritesFromCloud();
    else renderSaved();
  });
}

$("#profileButton")?.addEventListener("click", (event) => {
  event.stopPropagation();
  const dropdown = $("#profileDropdown");
  const button = $("#profileButton");
  if (!dropdown || !button) return;
  const isOpen = !dropdown.hidden;
  dropdown.hidden = isOpen;
  button.setAttribute("aria-expanded", String(!isOpen));
});

document.addEventListener("click", (event) => {
  const menu = $("#userMenu");
  const dropdown = $("#profileDropdown");
  const button = $("#profileButton");
  if (!menu || !dropdown || !button) return;
  if (!menu.contains(event.target)) {
    dropdown.hidden = true;
    button.setAttribute("aria-expanded", "false");
  }
});

$("#openProfileSettings")?.addEventListener("click", openProfileModal);
$("#closeProfileModal")?.addEventListener("click", closeProfileModal);
$("#profileForm")?.addEventListener("submit", handleProfileSubmit);
$("#profileModal")?.addEventListener("click", event => {
  if (event.target.id === "profileModal") closeProfileModal();
});

$("#authButton")?.addEventListener("click", () => openAuthModal("login"));
$("#closeAuthModal")?.addEventListener("click", closeAuthModal);
$("#loginMode")?.addEventListener("click", () => { authMode = "login"; updateAuthMode(); setAuthMessage(""); });
$("#registerMode")?.addEventListener("click", () => { authMode = "register"; updateAuthMode(); setAuthMessage(""); });
$("#authForm")?.addEventListener("submit", handleAuthSubmit);
$("#logoutButton")?.addEventListener("click", async () => {
  $("#profileDropdown")?.setAttribute("hidden", "");
  $("#profileButton")?.setAttribute("aria-expanded", "false");
  if (supabaseClient) await supabaseClient.auth.signOut();
  currentUser = null;
  updateAuthUI();
  toast("Вы вышли из аккаунта");
});
$("#authModal")?.addEventListener("click", event => {
  if (event.target.id === "authModal") closeAuthModal();
});

async function removeFavoriteColor(hex) {
  const next = getSavedColors().filter(c => c !== hex);
  saveSavedColors(next);
  updateFavoriteCount();
  renderSaved();
  updatePaletteStars();
  if (currentUser) await removeFavoriteFromCloud(hex);
  toast("Удалено из избранного");
}

async function clearAllFavorites() {
  saveSavedColors([]);
  updateFavoriteCount();
  renderSaved();
  updatePaletteStars();
  if (supabaseClient && currentUser) {
    const { error } = await supabaseClient
      .from("favorites")
      .delete()
      .eq("user_id", currentUser.id);
    if (error) console.error(error);
  }
  toast("Избранное очищено");
}

function renderPalettes() {
  const filter = document.querySelector("#paletteFilter")?.value || "all";
  const searchInput = document.querySelector("#colorSearch");
  const query = (searchInput?.value || "").trim().toLowerCase();

  const filtered = palettes.filter(p => {
    const byFilter = filter === "all" || p.name === filter;

    if (!query) return byFilter;

    const name = p.name.toLowerCase();
    const colors = p.colors.join(" ").toLowerCase();

    // Search by full/partial palette name or any color code inside it.
    return byFilter && (name.includes(query) || colors.includes(query));
  });

  const list = document.querySelector("#paletteList");
  if (!list) return;

  if (!filtered.length) {
    list.innerHTML = `
      <div class="empty">
        <strong>Ничего не найдено</strong>
        <span>Попробуй другое название палитры или HEX-код, например: Ocean, Forest или #22C55E.</span>
      </div>`;
    return;
  }

  list.innerHTML = filtered.map(p => `
    <article class="palette-card">
      <div class="palette-head">
        <div>
          <h3>${htmlEscape(p.name)}</h3>
          <span>${p.colors.length} цветов</span>
        </div>
      </div>
      <div class="colors">
        ${p.colors.map(c => `
          <button class="color" type="button" data-color="${c}" title="Открыть форматы ${c}"
                  style="background:${c}">
            <span>${c}</span>
            <span class="color-star" data-star="${c}" title="Добавить в избранное" aria-label="Добавить в избранное">☆</span>
          </button>
        `).join("")}
      </div>
    </article>
  `).join("");

  document.querySelectorAll("#paletteList .color").forEach(btn => {
    const star = btn.querySelector(".color-star");

    btn.addEventListener("click", (event) => {
      if (event.target.closest(".color-star")) return;
      showColorModal(btn.dataset.color);
      setColor(btn.dataset.color);
    });

    star?.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleFavoriteColor(btn.dataset.color);
    });
  });

  updatePaletteStars();
}
function htmlEscape(s){
 return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
}

document.querySelector("#paletteFilter")?.addEventListener("change", renderPalettes);
document.querySelector("#colorSearch")?.addEventListener("input", renderPalettes);

populatePaletteFilter();
renderPalettes();
$("#paletteFilter").onchange=renderPalettes;
$("#colorSearch").addEventListener("input",renderPalettes);

document.querySelectorAll(".tab").forEach(btn=>btn.onclick=()=>{
 document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
 document.querySelectorAll(".panel").forEach(x=>x.classList.remove("active"));
 btn.classList.add("active");$("#"+btn.dataset.tab).classList.add("active");
});

function hexToRgb(hex){hex=hex.replace("#","");return [parseInt(hex.slice(0,2),16),parseInt(hex.slice(2,4),16),parseInt(hex.slice(4,6),16)]}
function rgbToHsl(r,g,b){
 r/=255;g/=255;b/=255;let max=Math.max(r,g,b),min=Math.min(r,g,b),h,s,l=(max+min)/2;
 if(max===min)h=s=0;else{let d=max-min;s=l>.5?d/(2-max-min):d/(max+min);switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4}h/=6}
 return [Math.round(h*360),Math.round(s*100),Math.round(l*100)]
}
function setColor(hex){
 $("#nativeColor").value=hex;$("#bigPreview").style.background=hex;
 const [r,g,b]=hexToRgb(hex),[h,s,l]=rgbToHsl(r,g,b);
 const values=[["HEX",hex.toUpperCase()],["RGB",`rgb(${r}, ${g}, ${b})`],["HSL",`hsl(${h}, ${s}%, ${l}%)`],["RGBA",`rgba(${r}, ${g}, ${b}, 1)`]];
 $("#formats").innerHTML=values.map(([n,v])=>`<div class="format"><div><label>${n}</label><strong>${v}</strong></div><button class="copy-mini" data-copy="${v}">COPY</button></div>`).join("");
 document.querySelectorAll("[data-copy]").forEach(b=>b.onclick=()=>copy(b.dataset.copy));
}
setColor("#63e6be");
$("#nativeColor").oninput=e=>setColor(e.target.value);

function renderSaved() {
  const list = $("#savedList");
  if (!list) return;

  if (!currentUser) {
    list.innerHTML = `
      <div class="empty saved-auth-empty">
        <div class="saved-lock">🔒</div>
        <strong>Войди в аккаунт, чтобы использовать избранное</strong>
        <span>После входа ты сможешь добавлять цвета в избранное и получать к ним доступ с любого устройства.</span>
        <button id="savedLoginButton" class="primary" type="button">Войти в аккаунт</button>
      </div>`;
    $("#clearSaved")?.setAttribute("hidden", "");
    $("#savedLoginButton")?.addEventListener("click", () => openAuthModal("login"));
    updateFavoriteCount();
    return;
  }

  const saved = getSavedColors();
  updateFavoriteCount();
  $("#clearSaved")?.removeAttribute("hidden");
  if (!saved.length) {
    list.innerHTML = `
      <div class="empty">
        <strong>Избранных цветов пока нет</strong>
        <span>Добавляй цвета — они будут доступны на других устройствах.</span>
      </div>`;
    return;
  }

  list.innerHTML = saved.map(hex => `
    <article class="saved-color-card">
      <button class="saved-preview" type="button" data-saved-color="${hex}" style="background:${hex}" title="Открыть форматы ${hex}"></button>
      <div class="saved-info">
        <strong>${hex}</strong>
        <span>${currentUser ? "Синхронизировано с аккаунтом" : "Локальное избранное · войди для синхронизации"}</span>
      </div>
      <button class="remove-saved" type="button" data-remove="${hex}" aria-label="Удалить ${hex}">×</button>
    </article>
  `).join("");

  list.querySelectorAll("[data-saved-color]").forEach(btn => {
    btn.addEventListener("click", () => {
      showColorModal(btn.dataset.savedColor);
      setColor(btn.dataset.savedColor);
    });
  });

  list.querySelectorAll("[data-remove]").forEach(btn => {
    btn.addEventListener("click", () => removeFavoriteColor(btn.dataset.remove));
  });
}

$("#saveColor").onclick = () => toggleFavoriteColor($("#nativeColor").value.toUpperCase());
$("#clearSaved").onclick = clearAllFavorites;
renderSaved();
initAuth();

function updateGradient(){
 let a=$("#g1").value,b=$("#g2").value,angle=$("#angle").value;
 $("#g1text").value=a;$("#g2text").value=b;
 $("#gradientBox").style.background=`linear-gradient(${angle}deg, ${a}, ${b})`;
}
$("#g1").oninput=updateGradient;$("#g2").oninput=updateGradient;$("#angle").onchange=updateGradient;
$("#g1text").onchange=e=>{if(/^#[0-9a-f]{6}$/i.test(e.target.value)){$("#g1").value=e.target.value;updateGradient()}}
$("#g2text").onchange=e=>{if(/^#[0-9a-f]{6}$/i.test(e.target.value)){$("#g2").value=e.target.value;updateGradient()}}
$("#copyGradient").onclick=()=>copy(`background: linear-gradient(${$("#angle").value}deg, ${$("#g1").value}, ${$("#g2").value});`);
