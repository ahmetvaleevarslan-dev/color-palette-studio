const palettes=[
 {name:"Midnight Neon",type:"dark",colors:["#0B1020","#111A33","#263B73","#5C7CFA","#7C8CFF"]},
 {name:"Emerald Tech",type:"nature",colors:["#071A12","#0B3D2E","#0E7A5B","#20E58A","#A7FFD1"]},
 {name:"Sunset",type:"bright",colors:["#FF4D6D","#FF7A45","#FFB703","#FFD166","#FFF0B5"]},
 {name:"Ocean",type:"nature",colors:["#001F3F","#003B73","#0077B6","#00B4D8","#90E0EF"]},
 {name:"Cyber Violet",type:"dark",colors:["#12002B","#3B0A70","#6C2BD9","#A66CFF","#E0C3FF"]},
 {name:"Fresh",type:"bright",colors:["#062C30","#05595B","#62B6B7","#B8E1DD","#F4F7F5"]}
];

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
function renderPalettes(){
 const filter=$("#paletteFilter").value;
 const query=normalizeSearch($("#colorSearch").value);
 let list=palettes.filter(p=>filter==="all"||p.type===filter);

 if(query){
   const queryHex=parseColorInput(query);
   list=list.map(p=>{
     const matchedColors=p.colors.filter(c=>{
       if(normalizeSearch(c).includes(query)) return true;
       if(queryHex && colorDistance(c,queryHex)<95) return true;
       return false;
     });
     return {...p,colors:matchedColors};
   }).filter(p=>p.colors.length || normalizeSearch(p.name).includes(query));

   $("#searchResult").style.display="block";
   if(queryHex){
     const [r,g,b]=hexToRgb(queryHex),[h,s,l]=rgbToHsl(r,g,b);
     $("#searchResult").innerHTML=`<strong>Найденный цвет</strong>
       <div style="display:flex;align-items:center;gap:14px;margin-top:12px">
         <div style="width:58px;height:58px;border-radius:12px;background:${queryHex};box-shadow:inset 0 0 0 1px rgba(255,255,255,.15)"></div>
         <div><div style="font-weight:800">${queryHex}</div>
         <div class="small">rgb(${r}, ${g}, ${b}) · hsl(${h}, ${s}%, ${l}%)</div></div>
         <button class="copy-mini" id="copySearchColor">Скопировать HEX</button>
       </div>`;
     $("#copySearchColor").onclick=()=>copy(queryHex);
   }else{
     $("#searchResult").innerHTML=`<strong>Поиск: «${htmlEscape($("#colorSearch").value)}»</strong>
       <div class="small" style="margin-top:7px">Можно вводить HEX, RGB, HSL или название палитры.</div>`;
   }
 }else{
   $("#searchResult").style.display="none";
 }

 $("#paletteList").innerHTML=list.length ? list.map(p=>`
 <div class="palette"><div class="palette-head"><div class="palette-name">${p.name}</div><div class="small">${p.colors.length} цветов</div></div>
 <div class="colors">${p.colors.map(c=>`<button class="color" style="background:${c}" data-color="${c}" title="Скопировать ${c}"><span>${c}</span></button>`).join("")}</div></div>`).join("")
 : '<div class="empty">Ничего не найдено. Попробуй другой код или название палитры.</div>';

 document.querySelectorAll(".color").forEach(b=>b.onclick=()=>{showColorModal(b.dataset.color);setColor(b.dataset.color)})
}
function htmlEscape(s){
 return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
}
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
function renderSaved(){
 if(!saved.length){$("#savedList").innerHTML='<div class="empty" style="grid-column:1/-1">Пока пусто. Добавь цвет через вкладку «Подбор цвета».</div>';return}
 $("#savedList").innerHTML=saved.map((c,i)=>`<button class="color" style="background:${c};min-height:150px" data-save="${i}"><span>${c} · нажми, чтобы скопировать</span></button>`).join("");
 document.querySelectorAll("[data-save]").forEach(b=>b.onclick=()=>copy(saved[+b.dataset.save]));
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
