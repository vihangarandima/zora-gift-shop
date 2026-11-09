/* Shared: language toggle, loader, mushroom taps, product helpers, WhatsApp links, item dialog */
(function () {
  var LS = "sora_lang";
  var lang = "si";
  try { lang = localStorage.getItem(LS) || "si"; } catch (e) {}
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var S = (window.SORA = { reduce: reduce, data: null });
  S.lang = function () { return lang; };

  function apply() {
    document.documentElement.lang = lang === "si" ? "si" : "en";
    document.querySelectorAll("[data-en]").forEach(function (el) {
      var t = el.dataset[lang] || el.dataset.en;
      if (el.dataset.attr) el.setAttribute(el.dataset.attr, t); else el.textContent = t;
    });
    var b = document.getElementById("langBtn");
    if (b) { b.textContent = lang === "si" ? "English" : "සිංහල"; b.setAttribute("aria-label", lang === "si" ? "Switch to English" : "සිංහලට මාරු වන්න"); }
    window.dispatchEvent(new Event("sora:lang"));
  }
  S.apply = apply;
  S.pick = function (en, si) { return lang === "si" ? si : en; };

  document.addEventListener("DOMContentLoaded", function () {
    apply();
    var b = document.getElementById("langBtn");
    if (b) b.addEventListener("click", function () {
      lang = lang === "si" ? "en" : "si";
      try { localStorage.setItem(LS, lang); } catch (e) {}
      apply();
    });
    // mushroom: hop on tap
    document.addEventListener("click", function (e) {
      var m = e.target.closest(".mush");
      if (m) { m.classList.remove("hop"); void m.offsetWidth; m.classList.add("hop"); }
    });
    // tiny mushroom pops where you tap (skipped for reduced motion and on controls)
    if (!reduce) document.addEventListener("pointerdown", function (e) {
      if (e.target.closest("a,button,input,dialog,.rail")) return;
      var p = document.createElement("img");
      p.src = (window.SORA_ROOT || "") + "img/mushroom.svg"; p.alt = ""; p.className = "pop";
      p.style.left = e.clientX + "px"; p.style.top = e.clientY + "px";
      document.body.appendChild(p);
      setTimeout(function () { p.remove(); }, 750);
    }, { passive: true });
    // floating WhatsApp menu
    var fab = document.querySelector(".fab");
    if (fab && fab.querySelector("button")) {
      var fb = fab.querySelector("button");
      fb.addEventListener("click", function () {
        var o = fab.classList.toggle("open"); fb.setAttribute("aria-expanded", o);
      });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") { fab.classList.remove("open"); fb.setAttribute("aria-expanded", false); } });
    }
  });

  window.addEventListener("load", function () {
    var l = document.getElementById("loader");
    if (l) { l.classList.add("done"); setTimeout(function () { l.remove(); }, 500); }
  });
  setTimeout(function () { var l = document.getElementById("loader"); if (l) l.classList.add("done"); }, 3000);

  /* ---- products ---- */
  S.load = function () {
    if (S.data) return Promise.resolve(S.data);
    return fetch("products.json").then(function (r) { return r.json(); }).then(function (d) { S.data = d; return d; });
  };
  S.name = function (p) { return S.pick(p.name_en, p.name_si || p.name_en); };
  S.price = function (p) {
    return p.price_lkr == null ? S.pick("Price on WhatsApp", "මිල WhatsApp එකෙන් අහන්න") : "LKR " + Number(p.price_lkr).toLocaleString("en-US");
  };
  S.wa = function (p) {
    var num = S.data.whatsapp[p.shop];
    var price = p.price_lkr == null ? "" : " (LKR " + p.price_lkr + ")";
    var msg = S.pick("Hi Sora! I'd like to order: ", "හායි Sora! මට මේක ඕනේ: ") + S.name(p) + price;
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(msg);
  };
  var WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.600 15L2 22l5.200-1.400A10 10 0 1 0 12 2zm0 18.200c-1.500 0-2.900-.4-4.100-1.200l-.3-.2-3 .8.8-2.900-.2-.3A8.200 8.200 0 1 1 12 20.200zm4.500-6.100c-.2-.1-1.500-.7-1.700-.8s-.4-.1-.6.100l-.8 1c-.1.200-.3.200-.5.100a6.700 6.700 0 0 1-3.300-2.900c-.2-.4.200-.4.700-1.300.1-.2 0-.3 0-.5l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.300 3 3 0 0 0-.9 2.200c0 1.300.9 2.600 1.100 2.800s1.900 3 4.700 4.100c1.700.7 2.400.8 3.200.6.500-.1 1.500-.6 1.700-1.200s.2-1.100.2-1.200-.2-.2-.4-.3z"/></svg>';
  S.waIcon = WA_ICON;

  var COL = { dresses: "#E7C7F0", sleepwear: "#C9D8F5", shawls: "#F6D5C8", labubu: "#E4D8F7", stitch: "#C5E3F0", celebrate: "#F9D1DC", xmas: "#D2E8C8", dropprice: "#F8E4A8" };
  S.art = function (p) {
    if (p.image) return '<img src="' + p.image + '" alt="' + S.name(p).replace(/"/g, "") + '" loading="lazy" width="500" height="600">';
    var c = COL[p.category] || "#E4D8F7";
    var ST = ' fill="#fff" fill-opacity=".78" stroke="#3A2350" stroke-width="3" stroke-linejoin="round"';
    var shape = p.shop === "loom"
      ? (p.category === "sleepwear"
        ? '<path d="M104 84l30-12c8 14 24 14 32 0l30 12 30 52-28 14-6-18v128H108V132l-6 18-28-14z"' + ST + '/><path d="M108 200h84M108 232h84" stroke="#E0567A" stroke-width="3" stroke-dasharray="6 6" opacity=".7"/>'
        : p.category === "shawls"
        ? '<path d="M64 96h172l-8 150c-18 14-28-8-46 6s-28-8-48 6-30-12-52 0z"' + ST + '/><path d="M80 246v22M112 250v22M150 246v22M188 250v22M222 246v22" stroke="#3A2350" stroke-width="3" stroke-linecap="round"/><path d="M80 130h140M78 160h144" stroke="#E0567A" stroke-width="3" stroke-dasharray="7 6" opacity=".7"/>'
        : '<path d="M120 80c10 24 50 24 60 0l22 18-14 40 26 150H86l26-150-14-40z"' + ST + '/><path d="M104 162h92" stroke="#E0567A" stroke-width="4" stroke-linecap="round"/>')
      : '<rect x="80" y="150" width="140" height="110" fill="#fff" fill-opacity=".75" stroke="#3A2350" stroke-width="3"/><rect x="70" y="120" width="160" height="34" fill="#fff" fill-opacity=".9" stroke="#3A2350" stroke-width="3"/><path d="M150 120v140M150 120c-30-40-50-10-20 0M150 120c30-40 50-10 20 0" fill="none" stroke="#E0567A" stroke-width="5" stroke-linecap="round"/>';
    return '<svg viewBox="0 0 300 360" role="img" aria-label="' + S.pick("Photo coming soon", "ෆොටෝ එක ඉක්මනින්") + '"><rect width="300" height="360" fill="' + c + '"/>' + shape + '</svg>';
  };
  S.cardHTML = function (p) {
    return '<article class="item" data-cat="' + p.category + '"><div class="polaroid"><span class="tape' + (p.id.length % 2 ? "" : " k") + '"></span><div class="art">' + S.art(p) + '</div></div><h3>' + S.name(p) + '</h3><p class="price">' + S.price(p) + '</p><a class="btn" href="' + S.wa(p) + '" target="_blank" rel="noopener">' + WA_ICON + S.pick("Order on WhatsApp", "WhatsApp එකෙන් ඕඩර් කරන්න") + '</a></article>';
  };

  /* item dialog (home clothesline) */
  S.openItem = function (p) {
    var d = document.getElementById("itemDlg");
    if (!d || !d.showModal) { window.open(S.wa(p), "_blank", "noopener"); return; }
    d.innerHTML = '<button class="x" aria-label="' + S.pick("Close", "වසන්න") + '">&times;</button><div class="art">' + S.art(p) + '</div><h3>' + S.name(p) + '</h3><p class="price">' + S.price(p) + '</p><a class="btn" href="' + S.wa(p) + '" target="_blank" rel="noopener">' + WA_ICON + S.pick("Order on WhatsApp", "WhatsApp එකෙන් ඕඩර් කරන්න") + '</a>';
    d.querySelector(".x").onclick = function () { d.close(); };
    d.onclick = function (e) { if (e.target === d) d.close(); };
    d.showModal();
  };
})();
