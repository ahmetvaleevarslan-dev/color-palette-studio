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
function getSavedColors() {
  return JSON.parse(localStorage.getItem("savedColors") || "[]");
}

function saveSavedColors(colors) {
  localStorage.setItem("savedColors", JSON.stringify(colors));
}

function toggleFavoriteColor(hex) {
  const saved = getSavedColors();
  const index = saved.indexOf(hex);

  if (index === -1) {
    saved.push(hex);
    toast("Добавлено в избранное ★");
  } else {
    saved.splice(index, 1);
    toast("Удалено из избранного");
  }

  saveSavedColors(saved);
  updatePaletteStars();
  renderSaved();
}

function updatePaletteStars() {
  const saved = getSavedColors();

  document.querySelectorAll("#paletteList .color-star").forEach(star => {
    const hex = star.dataset.star;
    const active = saved.includes(hex);

    star.textContent = active ? "★" : "☆";
    star.classList.toggle("is-favorite", active);
    star.title = active ? "Убрать из избранного" : "Добавить в избранное";
    star.setAttribute("aria-label", active ? "Убрать из избранного" : "Добавить в избранное");
  });
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

let saved=JSON.parse(localStorage.getItem("savedColors")||"[]");
function renderSaved() {
  const list = document.querySelector("#savedList");
  if (!list) return;

  const saved = JSON.parse(localStorage.getItem("savedColors") || "[]");

  if (!saved.length) {
    list.innerHTML = `
      <div class="empty">
        <strong>Избранных цветов пока нет</strong>
        <span>Сохрани цвет из вкладки «Подбор цвета», чтобы он появился здесь.</span>
      </div>`;
    return;
  }

  list.innerHTML = saved.map(hex => `
    <article class="saved-color-card">
      <button class="saved-preview" type="button" data-saved-color="${hex}"
              style="background:${hex}" title="Открыть форматы ${hex}">
      </button>
      <div class="saved-info">
        <strong>${hex}</strong>
        <span>Нажми на цвет, чтобы выбрать HEX, RGB, HSL или RGBA</span>
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
    btn.addEventListener("click", () => {
      const next = saved.filter(c => c !== btn.dataset.remove);
      localStorage.setItem("savedColors", JSON.stringify(next));
      renderSaved();
      toast("Удалено из избранного");
    });
  });
}
$("#saveColor").onclick=()=>{let c=$("#nativeColor").value.toUpperCase();if(!saved.includes(c))saved.push(c);localStorage.setItem("savedColors",JSON.stringify(saved));renderSaved();toast("Добавлено в избранное ☆")}
$("#clearSaved").onclick=()=>{saved=[];localStorage.removeItem("savedColors");renderSaved()}
renderSaved();

function updateGradient(){
 let a=$("#g1").value,b=$("#g2").value,angle=$("#angle").value;
 $("#g1text").value=a;$("#g2text").value=b;
 $("#gradientBox").style.background=`linear-gradient(${angle}deg, ${a}, ${b})`;
}
$("#g1").oninput=updateGradient;$("#g2").oninput=updateGradient;$("#angle").onchange=updateGradient;
$("#g1text").onchange=e=>{if(/^#[0-9a-f]{6}$/i.test(e.target.value)){$("#g1").value=e.target.value;updateGradient()}}
$("#g2text").onchange=e=>{if(/^#[0-9a-f]{6}$/i.test(e.target.value)){$("#g2").value=e.target.value;updateGradient()}}
$("#copyGradient").onclick=()=>copy(`background: linear-gradient(${$("#angle").value}deg, ${$("#g1").value}, ${$("#g2").value});`);
