/* Shop pages (loom.html, gift.html): filter chips + product grid from products.json */
(function () {
  var S = window.SORA, shop = document.body.dataset.shop, cat = new URLSearchParams(location.search).get("cat") || "all";
  var data;
  function render() {
    var chips = document.getElementById("chips"), grid = document.getElementById("grid");
    var list = [{ id: "all", en: "All", si: "ඔක්කොම" }].concat(data.categories[shop]);
    chips.innerHTML = list.map(function (c) {
      return '<button class="chip" type="button" data-c="' + c.id + '" aria-pressed="' + (c.id === cat) + '">' + S.pick(c.en, c.si) + "</button>";
    }).join("");
    var items = data.products.filter(function (p) { return p.shop === shop && (cat === "all" || p.category === cat); });
    grid.innerHTML = items.map(S.cardHTML).join("");
    document.getElementById("empty").hidden = items.length > 0;
  }
  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("chips").addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      cat = b.dataset.c; history.replaceState(null, "", cat === "all" ? location.pathname : "?cat=" + cat); render();
    });
    S.load().then(function (d) { data = d; render(); });
  });
  window.addEventListener("sora:lang", function () { if (data) render(); });
})();
