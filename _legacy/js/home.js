/* Home page: hero untie, thread, clothesline, gift drop, dispatch belt, end bow */
(function () {
  var S = window.SORA;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var HOOK = '<svg class="hook" viewBox="0 0 46 34" aria-hidden="true"><path d="M23 4c4 0 6 3 4 6-2 2-4 3-4 6v2L5 28c-2 1-1 3 1 3h34c2 0 3-2 1-3L23 18" fill="none" stroke="#3A2350" stroke-width="2.500" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ---------- clothesline + end buttons (data driven, re-rendered on language change) ---------- */
  function renderLoom() {
    S.load().then(function (d) {
      var items = d.products.filter(function (p) { return p.shop === "loom"; }).slice(0, 6);
      $("#loomTrack").innerHTML = items.map(function (p, i) {
        return '<div class="slot"><button class="hang" style="--d:-' + (i * 0.9) + 's" data-id="' + p.id + '" type="button" aria-label="' + S.name(p).replace(/"/g, "") + '">' + HOOK + '<div class="art">' + S.art(p) + '<span class="cap">' + S.name(p) + '</span></div></button></div>';
      }).join("");
      $("#loomTrack").onclick = function (e) {
        var b = e.target.closest(".hang"); if (!b) return;
        S.openItem(d.products.filter(function (p) { return p.id === b.dataset.id; })[0]);
      };
      if (window.gsap && window.ScrollTrigger && !S.reduce && !S.slid) {
        S.slid = true;
        gsap.from("#loom .slot", { x: 120, opacity: 0, stagger: .09, duration: .7, ease: "power2.out", scrollTrigger: { trigger: "#loom .line", start: "top 85%", once: true } });
      }
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
  }
  function endButtons() {
    var hi = encodeURIComponent(S.pick("Hi Sora!", "හායි Sora!"));
    var g = $("#waGift"), l = $("#waLoom");
    g.href = "https://wa.me/94706008576?text=" + hi; l.href = "https://wa.me/94741896530?text=" + hi;
    g.innerHTML = S.waIcon + "Sora Gift House"; l.innerHTML = S.waIcon + "Sora Loom";
  }
  document.addEventListener("DOMContentLoaded", function () { renderLoom(); endButtons(); });
  window.addEventListener("sora:lang", function () { if (S.data) { renderLoom(); } endButtons(); });

  /* ---------- animation ---------- */
  function start() {
    if (!window.gsap || !window.ScrollTrigger) { // CDN blocked: show the final state, skip motion
      document.documentElement.classList.add("no-gsap");
      var lr = $(".logoRise"); if (lr) lr.style.transform = "translate(-50%,-10%)";
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    var lowEnd = (navigator.hardwareConcurrency || 8) <= 2 || (navigator.deviceMemory || 8) <= 2;

    /* hero */
    var strand = $("#strand"), len = strand.getTotalLength();
    gsap.set(strand, { strokeDasharray: len, strokeDashoffset: len });
    gsap.set(".logoRise", { xPercent: -50, yPercent: 70, opacity: 0 });
    var tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
    tl.to(".hint", { opacity: 0, duration: .15 }, 0)
      .to("#tailL", { rotation: -35, svgOrigin: "200 132", duration: .25 }, 0)
      .to("#tailR", { rotation: 35, svgOrigin: "200 132", duration: .25 }, 0)
      .to("#bow", { opacity: 0, scale: .4, svgOrigin: "200 128", duration: .25 }, .2)
      .to(strand, { strokeDashoffset: 0, duration: .45 }, .15)
      .to("#lid", { y: -230, x: 90, rotation: -20, svgOrigin: "200 150", duration: .45, ease: "power2.in" }, .35)
      .to("#lid", { opacity: 0, duration: .2 }, .65)
      .to(".logoRise", { yPercent: -22, opacity: 1, duration: .5, ease: "power2.out" }, .55);

    if (S.reduce) {
      tl.progress(1);
    } else if (lowEnd) { // short reveal on load, no pinning
      tl.timeScale(.55).play(.0);
      ScrollTrigger.create({ trigger: "#hero", start: "top top", end: "bottom top", onLeave: function () { tl.progress(1); } });
    } else {
      ScrollTrigger.create({ trigger: "#hero", start: "top top", end: "+=150%", pin: true, scrub: .5, animation: tl, anticipatePin: 1 });
    }

    if (!S.reduce) {
      /* gift tags drop into the box, then tape */
      var stage = $("#giftStage"), drops = gsap.utils.toArray("#giftStage .drop");
      var xs = [25, 37.5, 50, 62.5, 75];
      drops.forEach(function (d, i) { d.style.left = xs[i] + "%"; });
      var gtl = gsap.timeline({ scrollTrigger: { trigger: stage, start: "top 75%", end: "bottom 55%", scrub: true, invalidateOnRefresh: true } });
      drops.forEach(function (d, i) {
        gtl.fromTo(d, { y: -40, opacity: 0, rotation: (i % 2 ? 8 : -8) }, { y: function () { return stage.offsetHeight * .54 + 4 - (i % 2) * 6; }, opacity: 1, rotation: 0, duration: 1, ease: "power1.in" }, i * .6);
      });
      gtl.fromTo("#giftTape", { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "none" }, ">");

      /* dispatch belt */
      var belt = $("#belt"), counter = $("#counter"), n = belt.children.length;
      gsap.to(belt, { x: function () { return -Math.max(0, belt.scrollWidth - innerWidth); }, ease: "none",
        scrollTrigger: { trigger: "#dispatch", start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true,
          onUpdate: function (s) { var k = 1 + Math.min(n - 1, Math.round(s.progress * (n - 1))); counter.textContent = "parcel " + String(k).padStart(2, "0") + " / " + String(n).padStart(2, "0"); } } });

      /* gentle fade-up for blocks as they arrive */
      gsap.utils.toArray(".sec-head,.shopcard,.steps li,.note,.wall .polaroid,#find .cols>div,.pack").forEach(function (el) {
        gsap.from(el, { y: 34, opacity: 0, duration: .8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });

      /* end bow */
      gsap.from("#endBow", { scale: .3, rotation: -14, transformOrigin: "50% 60%", duration: 1, ease: "elastic.out(1,.5)", scrollTrigger: { trigger: "#endBow", start: "top 85%", once: true } });
    } else {
      $("#dispatch").style.overflowX = "auto";
    }

    /* ---------- the thread ---------- */
    var svg = $("#thread"), guide = $("#threadGuide"), line = $("#threadLine");
    var table = [], total = 0, endY = 0;
    function build() {
      var doc = document.documentElement, W = doc.clientWidth, H = Math.max(doc.scrollHeight, document.body.scrollHeight);
      var sy = window.scrollY || 0;
      function top(el) { return el.getBoundingClientRect().top + sy; }
      var hero = $("#hero"), sp = hero.closest(".pin-spacer") || hero;
      var y0 = sp.getBoundingClientRect().bottom + sy - 2;
      var pts = [[W / 2, y0]];
      // run down the side margins, cross over in the gaps between sections
      var edge = (W - Math.min(1120, W - (W > 900 ? 64 : 32))) / 2, sx = Math.max(8, edge / 2), left = sx, right = W - sx;
      [["#shops", left], ["#loom", right], ["#gift", left], ["#how", right], ["#feedback", left], ["#dispatch", right], ["#find", left]].forEach(function (a) {
        var el = $(a[0]), t = top(el);
        pts.push([a[1], t + 50]);
        pts.push([a[1], t + el.offsetHeight - 50]);
      });
      var bow = $("#endBow").getBoundingClientRect();
      pts.push([left, bow.top + sy - 24]);
      pts.push([bow.left + bow.width / 2, bow.top + sy + bow.height * .58]);
      var d = "M" + pts[0][0] + " " + pts[0][1];
      for (var i = 1; i < pts.length; i++) {
        var a = pts[i - 1], b = pts[i], m = (a[1] + b[1]) / 2;
        d += " C" + a[0] + " " + m + " " + b[0] + " " + m + " " + b[0] + " " + b[1];
      }
      svg.setAttribute("viewBox", "0 0 " + W + " " + H); svg.style.height = H + "px";
      guide.setAttribute("d", d); line.setAttribute("d", d);
      total = line.getTotalLength(); endY = pts[pts.length - 1][1];
      line.style.strokeDasharray = total;
      table = []; for (var k = 0; k <= 240; k++) table.push(line.getPointAtLength(total * k / 240).y);
      draw();
    }
    function draw() {
      if (!total) return;
      if (S.reduce) { line.style.strokeDashoffset = 0; return; }
      var target = (window.scrollY || 0) + innerHeight * .62, lo = 0, hi = table.length - 1;
      if (target >= endY) lo = hi; else { while (lo < hi) { var mid = (lo + hi) >> 1; if (table[mid] < target) lo = mid + 1; else hi = mid; } }
      line.style.strokeDashoffset = total * (1 - lo / (table.length - 1));
    }
    ScrollTrigger.create({ start: 0, end: "max", onUpdate: draw });
    var t; window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(build, 200); });
    ScrollTrigger.addEventListener("refresh", build);
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(function () { ScrollTrigger.refresh(); build(); });
    window.addEventListener("load", function () { ScrollTrigger.refresh(); build(); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
