/**
 * SORA LUXURY FLAGSHIP — APPLICATION CONTROLLER
 * Full E-Commerce Functionality: Catalog, WhatsApp Bag, Custom 3D Hamper Studio,
 * Multi-Language (EN/SI), Dynamic Filtering & WhatsApp Concierge.
 * Self-contained with robust offline/file:// protocol fallback data.
 */

// Embedded Fallback Products so the site ALWAYS loads immediately (even via file://)
const DEFAULT_PRODUCTS = [
  {
    id: "g1",
    shop: "gift",
    category: "celebrate",
    name_en: "Sora Signature Luxury Celebration Hamper",
    name_si: "Sora Signature සුඛෝපභෝගී තෑගි පෙට්ටිය",
    tag: "Best Seller 💜",
    price_lkr: 6500,
    rating: 5.0,
    reviews: 128,
    image: "img/products/hamper_luxury.jpg",
    desc_en: "Curated pastel lilac hamper with plush teddy, luxury perfume mist, scented glass candle, gourmet chocolates, satin ribbon and warm fairy lights.",
    desc_si: "මෘදු ටෙඩී වලසා, ලක්ශරි සුවඳ විලවුන්, සුවඳ ඉටිපන්දම්, චොකලට් සහ සුන්දර ලයිට්ස් සහිත සම්පූර්ණ තෑගි පෙට්ටිය."
  },
  {
    id: "g2",
    shop: "gift",
    category: "labubu",
    name_en: "Exclusive Labubu Sweetheart Edition Hamper",
    name_si: "Labubu Sweetheart සුවිශේෂී තෑගි පෙට්ටිය",
    tag: "Trending Viral 🔥",
    price_lkr: 7800,
    rating: 5.0,
    reviews: 94,
    image: "img/products/hamper_labubu.jpg",
    desc_en: "Authentic Labubu doll with mischievous grin, lavender body mist, Ferrero chocolates, twinkle fairy lights in our signature lilac box.",
    desc_si: "ජනප්‍රිය Labubu බෝනික්කා, ලැවෙන්ඩර් බොඩි මිස්ට්, චොකලට් සහ සුරංගනා එළි සහිත විශේෂ පැකේජය."
  },
  {
    id: "g3",
    shop: "gift",
    category: "stitch",
    name_en: "Stitch Cosmic Lavender Gift Box",
    name_si: "Stitch ලැවෙන්ඩර් සුවිශේෂී තෑගි පෙට්ටිය",
    tag: "Fan Favorite 💙",
    price_lkr: 5900,
    rating: 4.9,
    reviews: 67,
    image: "img/products/hamper_stitch.jpg",
    desc_en: "Cute Disney Stitch plush, matching lavender hand cream, Ferrero treats, glitter card and custom rose ribbon bow.",
    desc_si: "ආදරණීය Stitch ප්ලෂී, සුවඳ හෑන්ඩ් ක්‍රීම්, රසවත් චොකලට් සහ රෝස රිබන් සමඟ."
  },
  {
    id: "g4",
    shop: "gift",
    category: "beauty",
    name_en: "Velvet Petals Luxury Fragrance & Mist Set",
    name_si: "Velvet Petals සුඛෝපභෝගී සුවඳ විලවුන් කට්ටලය",
    tag: "New In ✨",
    price_lkr: 4200,
    rating: 4.9,
    reviews: 53,
    image: "img/products/fragrance_set.jpg",
    desc_en: "Floral mist & shimmer body lotion duo in a frosted keepsake drawer box with gold foil lettering.",
    desc_si: "රන්වන් අකුරු සහිත ආකර්ෂණීය පෙට්ටියක බහා ඇති මල් සුවඳ බොඩි මිස්ට් සහ ලෝෂන් කට්ටලය."
  },
  {
    id: "g5",
    shop: "gift",
    category: "celebrate",
    name_en: "Sora 3D Polka Lilac Surprise Box",
    name_si: "Sora 3D Polka ලැවෙන්ඩර් සප්‍රයිස් පෙට්ටිය",
    tag: "Customer Loved 🌸",
    price_lkr: 5200,
    rating: 5.0,
    reviews: 112,
    image: "img/products/hero_box_3d.jpg",
    desc_en: "Iconic polka-dot embossed keepsake box ready for customized gift curation and sweet personal messages.",
    desc_si: "ඔබට කැමති ලෙස තෑගි පුරවා ගත හැකි අලංකාර ත්‍රිමාණ මෝස්තර සහිත ලැවෙන්ඩර් පෙට්ටිය."
  },
  {
    id: "g6",
    shop: "gift",
    category: "dropprice",
    name_en: "Mini Sweet World Treat Bundle",
    name_si: "Mini Sweet World විශේෂ වට්ටම් බණ්ඩලය",
    tag: "Drop Price 🏷️",
    price_lkr: 3800,
    rating: 4.8,
    reviews: 81,
    image: "img/products/hamper_luxury.jpg",
    desc_en: "Compact luxury bundle featuring mini fragrance mist, hair accessories pouch, and chocolates with greeting card.",
    desc_si: "මිල අඩු කළ විශේෂ කුඩා පැකේජය: බොඩි මිස්ට්, කොණ්ඩ සැරසිලි සහ චොකලට්."
  },
  {
    id: "l1",
    shop: "loom",
    category: "dresses",
    name_en: "Lavender Blossom Tiered Sundress",
    name_si: "ලැවෙන්ඩර් මල් රටා සහිත Sundress",
    tag: "Loom Signature 🪻",
    price_lkr: 4950,
    rating: 5.0,
    reviews: 86,
    image: "img/products/dress_lavender.jpg",
    desc_en: "Airy tiered silhouette with puffed cap sleeves, breathable pastel chiffon lining, and delicate floral botanical prints.",
    desc_si: "සැහැල්ලු සිසිල් රෙදි, පෆ් අත් සහ සියුම් මල් මෝස්තර සහිත මනරම් ගවුම."
  },
  {
    id: "l2",
    shop: "loom",
    category: "sleepwear",
    name_en: "Lilac Satin Romance 2-Piece Sleepwear",
    name_si: "ලැවෙන්ඩර් සිල්ක් සැටින් නිදි ඇඳුම් කට්ටලය",
    tag: "Silk Luxury ✨",
    price_lkr: 3850,
    rating: 4.9,
    reviews: 92,
    image: "img/products/sleepwear_silk.jpg",
    desc_en: "Silky smooth pajama set with French lace trims, elasticated waistband, and matching satin sleeping eye mask.",
    desc_si: "ඉතා සිනිඳු උසස් තත්වයේ සිල්ක් සැටින් සහ ලේස් සහිත සුවපහසු නිදි ඇඳුම් කට්ටලය."
  },
  {
    id: "l3",
    shop: "loom",
    category: "shawls",
    name_en: "Pure Chiffon Dream Shawl & Wrap",
    name_si: "Pure Chiffon සිහින් සුන්දර ෂෝල් එක",
    tag: "Pure Elegance 💜",
    price_lkr: 2650,
    rating: 4.9,
    reviews: 43,
    image: "img/products/shawl_chiffon.jpg",
    desc_en: "Featherlight chiffon drape in soft lavender blush with subtle scalloped hems. Perfect for daily or festive draping.",
    desc_si: "ඉතා සැහැල්ලු ලැවෙන්ඩර් පැහැති ෂෝල් එක, ඕනෑම අවස්ථාවකට මනාව ගැළපේ."
  },
  {
    id: "l4",
    shop: "loom",
    category: "dresses",
    name_en: "Pastel Meadow Ruffle Wrap Dress",
    name_si: "Pastel Meadow රැලි සහිත Wrap ගවුම",
    tag: "Trending 😍",
    price_lkr: 4600,
    rating: 4.8,
    reviews: 38,
    image: "img/products/dress_lavender.jpg",
    desc_en: "Flattering adjustable wrap waist with romantic cascading ruffles. High-end drape tailored for elegance.",
    desc_si: "ඉණට සරිලන ලෙස සකස් කළ හැකි, රැලි සහිත අලංකාර නවීන විලාසිතාවේ ගවුම."
  },
  {
    id: "l5",
    shop: "loom",
    category: "sleepwear",
    name_en: "Velvet Night Slip Dress & Kimono Robe",
    name_si: "Velvet Night ස්ලිප් ගවුම සහ රෝබ් එක",
    tag: "Loom Exclusive 🌙",
    price_lkr: 4200,
    rating: 5.0,
    reviews: 64,
    image: "img/products/sleepwear_silk.jpg",
    desc_en: "Graceful two-piece ensemble including adjustable slip dress and flowy kimono robe with tie belt.",
    desc_si: "ස්ලිප් ගවුම සහ කිමෝනෝ රෝබ් එක සහිත සුඛෝපභෝගී සැහැල්ලු ඇඳුම් කට්ටලය."
  },
  {
    id: "l6",
    shop: "loom",
    category: "shawls",
    name_en: "Lilac Breeze Featherweight Scarf",
    name_si: "Lilac Breeze සැහැල්ලු ස්කාර්ෆ් එක",
    tag: "Everyday Chic 🪻",
    price_lkr: 2400,
    rating: 4.8,
    reviews: 29,
    image: "img/products/shawl_chiffon.jpg",
    desc_en: "Ultra-soft woven texture with pastel tones, breathable and gentle on hair and skin.",
    desc_si: "දිනපතා භාවිතයට කදිම මෘදු සහ සැහැල්ලු ලැවෙන්ඩර් ස්කාර්ෆ් එක."
  }
];

// Global State
const state = {
  products: DEFAULT_PRODUCTS,
  currentLang: localStorage.getItem('sora_lang') || 'en',
  currentWing: 'all',
  currentCategory: 'all',
  searchQuery: '',
  cart: JSON.parse(localStorage.getItem('sora_cart') || '[]'),
  heroSlideIndex: 0,
  hamper: {
    boxStyle: 'Lilac Polka Dot Box',
    boxPrice: 1500,
    recipient: '',
    note: ''
  }
};

// WhatsApp Routing
const WA_NUMBERS = {
  gift: '94706008576',
  gift_alt: '94704080791',
  loom: '94741896530'
};

// Multilingual Strings
const I18N = {
  en: {
    nav_home: 'Home',
    nav_wings_all: 'All Sora World',
    nav_wings_gift: '🎁 Gift House',
    nav_wings_loom: '👗 Sora Loom',
    nav_collections: 'Collections',
    nav_studio: 'Hamper Studio',
    nav_dispatch: 'Island Delivery',
    nav_reviews: 'Reviews',
    nav_contact: 'Contact',
    hero_eyebrow: '✨ LUXURY GIFTING & BOUTIQUE COUTURE · POLONNARUWA',
    hero_title_1: 'Our Best',
    hero_title_2: 'Gifts & Loom Shop',
    hero_desc: 'Handcrafted luxury gift hampers, exclusive Labubu & Stitch collections, and graceful boutique dresses delivered island-wide across Sri Lanka.',
    btn_explore: 'Explore Collections',
    btn_build_hamper: 'Build Custom Hamper 🎁',
    btn_order_wa: 'Order on WhatsApp',
    stat_followers: 'Social Community',
    stat_reviews: 'Recommendation',
    stat_island: 'Island-wide Express',
    quick_view: 'Quick View',
    add_to_bag: 'Add to Bag',
    in_stock: 'In Stock · Fast Dispatch',
    bag_title: 'Your WhatsApp Bag',
    bag_empty: 'Your bag is empty! Pick something sweet.',
    bag_subtotal: 'Estimated Total',
    bag_checkout: 'Send Order via WhatsApp',
    studio_title: 'Build Your Own 3D Gift Box',
    studio_desc: 'Pick your box style, choose your favorite goodies, add a personal note, and we will craft & dispatch it with love.',
    step_1: '1. Select Box Theme',
    step_2: '2. Choose Sweet Goodies',
    step_3: '3. Personal Note & Name',
    recipient_placeholder: "Recipient's Name (e.g., Sanduni)",
    note_placeholder: "Your sweet personal message to write in the card...",
    order_custom_box: 'Order This Custom Box on WhatsApp',
    toast_added: 'Added to your WhatsApp bag! 💜',
    footer_copy: '© 2026 Sora Gift House & Sora Loom. Polonnaruwa, Sri Lanka.'
  },
  si: {
    nav_home: 'මුල් පිටුව',
    nav_wings_all: 'සියලුම Sora ලෝකය',
    nav_wings_gift: '🎁 Gift House',
    nav_wings_loom: '👗 Sora Loom',
    nav_collections: 'එකතුව',
    nav_studio: 'තෑගි පෙට්ටියක් හදන්න',
    nav_dispatch: 'රට පුරා ඩිලිවරි',
    nav_reviews: 'අදහස්',
    nav_contact: 'අමතන්න',
    hero_eyebrow: '✨ විශේෂ තෑගි සහ මනරම් ඇඳුම් පැළඳුම් · පොළොන්නරුව',
    hero_title_1: 'ආදරණීයයන්ට',
    hero_title_2: 'අපේ හොඳම තෑගි ලෝකය',
    hero_desc: 'පොළොන්නරුවේ සිට මුළු ශ්‍රී ලංකාවටම: සුඛෝපභෝගී තෑගි පෙට්ටි, Labubu සහ Stitch එකතු, සහ ලස්සනට අඳින්න කැමති යුවතියන්ට මනරම් ගවුම් විලාසිතා.',
    btn_explore: 'එකතුව බලන්න',
    btn_build_hamper: 'තෑගි පෙට්ටියක් හදන්න 🎁',
    btn_order_wa: 'WhatsApp එකෙන් ඕඩර් කරන්න',
    stat_followers: 'සමාජ ජාල මිතුරන්',
    stat_reviews: 'පාරිභෝගික තෘප්තිය',
    stat_island: 'දිවයින පුරාම බෙදාහැරීම',
    quick_view: 'විස්තර බලන්න',
    add_to_bag: 'බෑගයට එකතු කරන්න',
    in_stock: 'තොග ඇත · කඩිනම් ඩිලිවරි',
    bag_title: 'ඔබේ WhatsApp බෑගය',
    bag_empty: 'ඔබේ බෑගය හිස්ය. කැමති අයිටම් එකක් තෝරන්න.',
    bag_subtotal: 'මුළු මුදල',
    bag_checkout: 'WhatsApp මගින් ඕඩර් කරන්න',
    studio_title: 'ඔබේම තෑගි පෙට්ටියක් සකසා ගන්න',
    studio_desc: 'පෙට්ටියේ වර්ගය තෝරන්න, කැමති තෑගි බඩු දමන්න, ආදරණීය පණිවිඩයක් එක් කරන්න. අපි ආදරයෙන් සකසා එවන්නෙමු.',
    step_1: '1. පෙට්ටියේ ස්ටයිල් එක තෝරන්න',
    step_2: '2. අඩංගු කළ යුතු තෑගි තෝරන්න',
    step_3: '3. නම සහ ආදරණීය පණිවිඩය',
    recipient_placeholder: "ලබන්නාගේ නම (උදා: සඳුනි)",
    note_placeholder: "කාඩ්පතේ ලිවීමට ඔබේ සුබපැතුම් පණිවිඩය මෙහි සටහන් කරන්න...",
    order_custom_box: 'මෙම තෑගි පෙට්ටිය WhatsApp මගින් ඕඩර් කරන්න',
    toast_added: 'WhatsApp බෑගයට එකතු කළා! 💜',
    footer_copy: '© 2026 Sora Gift House & Sora Loom. පොළොන්නරුව, ශ්‍රී ලංකාව.'
  }
};

// Available Goodies for Custom Hamper Studio
const AVAILABLE_GOODIES = [
  { id: 'g_plush', name_en: 'Cute Pastel Plushie / Teddy', name_si: 'මෘදු ටෙඩී වලසා / ප්ලෂී', price: 1800, default: true },
  { id: 'g_lights', name_en: 'Twinkle Warm Fairy Lights', name_si: 'සුරංගනා එළි වැල (Fairy Lights)', price: 650, default: true },
  { id: 'g_card', name_en: 'Handwritten Calligraphy Card', name_si: 'අතින් ලියූ සුබපැතුම් කාඩ්පත', price: 400, default: true },
  { id: 'g_candle', name_en: 'Lavender Aromatherapy Candle', name_si: 'සුවඳැති ලැවෙන්ඩර් ඉටිපන්දම', price: 1200, default: false },
  { id: 'g_mist', name_en: 'Luxury Body Mist / Fragrance', name_si: 'සුඛෝපභෝගී බොඩි මිස්ට්', price: 1950, default: false },
  { id: 'g_ferrero', name_en: 'Ferrero Rocher Treats (Box of 3)', name_si: 'Ferrero Rocher චොකලට්', price: 1100, default: false },
  { id: 'g_scrunchie', name_en: 'Silk Hair Scrunchie & Ribbon', name_si: 'සිල්ක් කොණ්ඩ සැරසිලි රිබන්', price: 450, default: false }
];

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  // 1. Immediately render fallback data so user NEVER sees empty screen
  initLanguage();
  initNav();
  initHamperStudio();
  initCatalog();
  initBag();
  initFloatingSpeedDial();
  init3DBoxAndCarousel();

  // 2. Then attempt async fetch from products.json (for live updates if on HTTP server)
  loadProductsAsync();
});

// Async loader with graceful fallback
async function loadProductsAsync() {
  try {
    const res = await fetch('products.json');
    if (res.ok) {
      const data = await res.json();
      if (data.products && data.products.length > 0) {
        state.products = data.products;
        renderCatalog();
      }
    }
  } catch (err) {
    // Expected on file:// protocol, DEFAULT_PRODUCTS is already active
    console.log('Using embedded catalog dataset.');
  }
}

// Language Switcher
function initLanguage() {
  const langBtn = document.getElementById('langToggleBtn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      state.currentLang = state.currentLang === 'en' ? 'si' : 'en';
      localStorage.setItem('sora_lang', state.currentLang);
      updateLanguageUI();
      renderCatalog();
      initHamperStudio();
    });
  }
  updateLanguageUI();
}

function updateLanguageUI() {
  const t = I18N[state.currentLang];
  if (!t) return;
  document.documentElement.lang = state.currentLang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (t[key]) el.setAttribute('placeholder', t[key]);
  });

  const langLabel = document.getElementById('currentLangLabel');
  if (langLabel) {
    langLabel.textContent = state.currentLang === 'en' ? 'සිංහල' : 'English';
  }
}

// Navigation & Wing Switcher
function initNav() {
  const wingButtons = document.querySelectorAll('.nav-wing-btn');
  wingButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const wing = e.currentTarget.getAttribute('data-wing');
      state.currentWing = wing || 'all';
      wingButtons.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');

      const catalogEl = document.getElementById('catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
      renderCatalog();
    });
  });

  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNavOverlay');
  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }
}

// Hero 3D Box & Carousel Controls
function init3DBoxAndCarousel() {
  const staticSlide = document.getElementById('heroStaticSlide');
  const threeCanvas = document.getElementById('threeBoxCanvas');
  const modeBadge = document.getElementById('modeToggleBadge');
  const unboxHint = document.getElementById('unboxHintBtn');
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');

  // Make sure the image is visible by default
  if (staticSlide) {
    staticSlide.style.opacity = '1';
    staticSlide.style.display = 'block';
  }

  // Try initializing WebGL 3D Box
  let sora3D = null;
  if (window.Sora3DBox && typeof THREE !== 'undefined' && threeCanvas) {
    try {
      sora3D = new Sora3DBox('threeBoxCanvas');
      window.soraBoxInstance = sora3D;
      if (sora3D.isReady) {
        threeCanvas.style.display = 'block';
        if (staticSlide) staticSlide.style.opacity = '0';
      }
    } catch (e) {
      console.warn('WebGL init skipped:', e);
    }
  }

  const slides = [
    { type: '3d', name: '3D Signature Lilac Box', img: 'img/products/hero_box_3d.jpg' },
    { type: 'img', name: 'Luxury Celebration Hamper', img: 'img/products/hamper_luxury.jpg' },
    { type: 'img', name: 'Exclusive Labubu Special', img: 'img/products/hamper_labubu.jpg' },
    { type: 'img', name: 'Sora Loom Lavender Frock', img: 'img/products/dress_lavender.jpg' }
  ];

  function showSlide(index) {
    state.heroSlideIndex = (index + slides.length) % slides.length;
    const current = slides[state.heroSlideIndex];

    if (current.type === '3d' && sora3D && sora3D.isReady) {
      if (threeCanvas) threeCanvas.style.display = 'block';
      if (staticSlide) staticSlide.style.opacity = '0';
      if (modeBadge) modeBadge.innerHTML = '<span class="mode-indicator-dot"></span> 3D WebGL Live';
    } else {
      if (threeCanvas) threeCanvas.style.display = 'none';
      if (staticSlide) {
        staticSlide.src = current.img;
        staticSlide.style.opacity = '1';
        staticSlide.style.display = 'block';
      }
      if (modeBadge) modeBadge.innerHTML = '<span class="mode-indicator-dot" style="background:#F472B6;box-shadow:0 0 10px #F472B6;"></span> Spotlight Comps';
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', () => showSlide(state.heroSlideIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showSlide(state.heroSlideIndex + 1));

  if (unboxHint) {
    unboxHint.addEventListener('click', () => {
      if (window.soraBoxInstance && window.soraBoxInstance.isReady) {
        window.soraBoxInstance.toggleUnbox();
      } else {
        // Fallback confetti & wobble
        if (window.confetti) {
          window.confetti({
            particleCount: 70,
            spread: 75,
            origin: { y: 0.6 },
            colors: ['#A78BFA', '#F472B6', '#FFF']
          });
        }
        if (staticSlide) {
          staticSlide.style.transform = 'scale(1.08) rotate(3deg)';
          setTimeout(() => { staticSlide.style.transform = 'scale(1) rotate(0deg)'; }, 400);
        }
      }
    });
  }

  // Add 3D Tilt on the stage frame itself via CSS for immediate tactile response
  const stageFrame = document.querySelector('.stage-outer-frame');
  if (stageFrame) {
    stageFrame.addEventListener('mousemove', (e) => {
      const rect = stageFrame.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      stageFrame.style.transform = `perspective(1000px) rotateY(${x * 0.03}deg) rotateX(${-y * 0.03}deg)`;
    });
    stageFrame.addEventListener('mouseleave', () => {
      stageFrame.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    });
  }
}

// Build Your Own 3D Hamper Studio
function initHamperStudio() {
  const boxChips = document.querySelectorAll('.box-theme-chip');
  boxChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      boxChips.forEach(c => c.classList.remove('selected'));
      e.currentTarget.classList.add('selected');
      state.hamper.boxStyle = e.currentTarget.getAttribute('data-box');
      state.hamper.boxPrice = parseInt(e.currentTarget.getAttribute('data-price'), 10) || 1500;
      updateHamperTotal();
    });
  });

  const goodiesContainer = document.getElementById('goodiesContainer');
  if (goodiesContainer) {
    goodiesContainer.innerHTML = AVAILABLE_GOODIES.map(item => `
      <label class="goodie-item ${item.default ? 'checked' : ''}" data-id="${item.id}">
        <input type="checkbox" ${item.default ? 'checked' : ''} value="${item.id}">
        <div class="goodie-box">${item.default ? '✓' : ''}</div>
        <span class="goodie-name">${state.currentLang === 'si' ? item.name_si : item.name_en}</span>
        <span class="goodie-price">Rs. ${item.price.toLocaleString()}</span>
      </label>
    `).join('');

    goodiesContainer.querySelectorAll('.goodie-item').forEach(label => {
      label.addEventListener('click', (e) => {
        const input = label.querySelector('input');
        label.classList.toggle('checked', input.checked);
        label.querySelector('.goodie-box').textContent = input.checked ? '✓' : '';
        updateHamperTotal();
      });
    });
  }

  const orderCustomBtn = document.getElementById('orderCustomHamperBtn');
  if (orderCustomBtn) {
    orderCustomBtn.onclick = handleCustomHamperWhatsAppOrder;
  }

  updateHamperTotal();
}

function updateHamperTotal() {
  let total = state.hamper.boxPrice || 1500;
  const checkedBoxes = document.querySelectorAll('#goodiesContainer input:checked');
  checkedBoxes.forEach(cb => {
    const found = AVAILABLE_GOODIES.find(g => g.id === cb.value);
    if (found) total += found.price;
  });

  const priceEl = document.getElementById('hamperTotalPrice');
  if (priceEl) {
    priceEl.innerHTML = `Rs. ${total.toLocaleString()} <span>LKR</span>`;
  }
}

function handleCustomHamperWhatsAppOrder() {
  const recipientInput = document.getElementById('hamperRecipient');
  const noteInput = document.getElementById('hamperNote');
  const recipient = recipientInput ? recipientInput.value.trim() : '';
  const note = noteInput ? noteInput.value.trim() : '';

  const selectedGoodies = [];
  document.querySelectorAll('#goodiesContainer input:checked').forEach(cb => {
    const found = AVAILABLE_GOODIES.find(g => g.id === cb.value);
    if (found) selectedGoodies.push(state.currentLang === 'si' ? found.name_si : found.name_en);
  });

  const priceEl = document.getElementById('hamperTotalPrice');
  const priceText = priceEl ? priceEl.textContent : 'Rs. 4,350 LKR';

  let msg = `✨ *SORA GIFT HOUSE — CUSTOM HAMPER ORDER* ✨\n\n`;
  msg += `🎁 *Box Style:* ${state.hamper.boxStyle}\n`;
  msg += `🛍️ *Included Items:*\n• ` + selectedGoodies.join('\n• ') + `\n\n`;
  if (recipient) msg += `👤 *To / Recipient:* ${recipient}\n`;
  if (note) msg += `💌 *Personal Note in Card:*\n"${note}"\n\n`;
  msg += `💰 *Calculated Total:* ${priceText}\n`;
  msg += `📍 *Delivery:* Island-wide Express Delivery (Sri Lanka)\n\n`;
  msg += `Hi Kavee! I just customized this gift box on your website. Please confirm availability and bank details to dispatch! 💜`;

  const waUrl = `https://wa.me/${WA_NUMBERS.gift}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

// Product Catalog & Filtering
function initCatalog() {
  const searchInput = document.getElementById('productSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      renderCatalog();
    });
  }

  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      filterPills.forEach(p => p.classList.remove('active'));
      e.currentTarget.classList.add('active');
      state.currentCategory = e.currentTarget.getAttribute('data-cat') || 'all';
      renderCatalog();
    });
  });

  renderCatalog();
}

function renderCatalog() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const filtered = state.products.filter(p => {
    if (state.currentWing !== 'all' && p.shop !== state.currentWing) return false;
    if (state.currentCategory !== 'all' && p.category !== state.currentCategory) return false;
    if (state.searchQuery) {
      const matchEn = p.name_en.toLowerCase().includes(state.searchQuery);
      const matchSi = p.name_si.toLowerCase().includes(state.searchQuery);
      const matchDesc = (p.desc_en + ' ' + p.desc_si).toLowerCase().includes(state.searchQuery);
      if (!matchEn && !matchSi && !matchDesc) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <p style="font-size: 1.3rem;">🌸 No items found matching your filter.</p>
        <p style="font-size: 0.95rem; margin-top: 8px;">Try clearing your search or message us on WhatsApp for custom orders.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const name = state.currentLang === 'si' ? p.name_si : p.name_en;
    const desc = state.currentLang === 'si' ? p.desc_si : p.desc_en;
    const shopName = p.shop === 'loom' ? 'Sora Loom' : 'Gift House';
    const waNumber = p.shop === 'loom' ? WA_NUMBERS.loom : WA_NUMBERS.gift;

    const orderMsg = encodeURIComponent(
      `Hi Sora! 💜 I would like to order *${p.name_en}* (Rs. ${p.price_lkr.toLocaleString()} LKR) from your website. Please share bank details for island-wide delivery!`
    );

    return `
      <div class="product-card" data-id="${p.id}">
        <div class="product-img-wrap">
          <img src="${p.image || 'img/products/hamper_luxury.jpg'}" alt="${name}" loading="lazy">
          ${p.tag ? `<span class="product-badge-tag">${p.tag}</span>` : ''}
          <span class="product-shop-badge">${shopName}</span>
        </div>
        <div class="product-info">
          <h3 class="product-title">${name}</h3>
          <p class="product-desc">${desc}</p>
          <div class="product-meta">
            <div class="product-price">Rs. ${p.price_lkr.toLocaleString()} <small>LKR</small></div>
            <div class="product-rating">★ ${p.rating} (${p.reviews})</div>
          </div>
          <div class="product-actions">
            <a href="https://wa.me/${waNumber}?text=${orderMsg}" target="_blank" class="btn-order-wa">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 1 1 8.2-8.2c0 4.5-3.7 8.2-8.2 8.2z"/></svg>
              <span>Order on WhatsApp</span>
            </a>
            <button type="button" class="btn-add-bag" onclick="addToBag('${p.id}')" title="Add to WhatsApp Bag">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// WhatsApp Bag / Cart Drawer
function initBag() {
  const bagBtn = document.getElementById('openBagBtn');
  const closeBtn = document.getElementById('closeBagBtn');
  const overlay = document.getElementById('bagOverlay');
  const checkoutBtn = document.getElementById('bagCheckoutBtn');

  if (bagBtn && overlay) {
    bagBtn.addEventListener('click', () => overlay.classList.add('open'));
  }
  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
  }
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  }
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', checkoutBagViaWhatsApp);
  }

  updateBagUI();
}

window.addToBag = function(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const existing = state.cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      id: product.id,
      shop: product.shop,
      name_en: product.name_en,
      name_si: product.name_si,
      price_lkr: product.price_lkr,
      image: product.image,
      qty: 1
    });
  }

  localStorage.setItem('sora_cart', JSON.stringify(state.cart));
  updateBagUI();
  showToast(I18N[state.currentLang].toast_added);
};

window.updateBagQty = function(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter(i => i.id !== productId);
  }
  localStorage.setItem('sora_cart', JSON.stringify(state.cart));
  updateBagUI();
};

function updateBagUI() {
  const countBadge = document.getElementById('bagCountBadge');
  const list = document.getElementById('bagItemsList');
  const subtotalEl = document.getElementById('bagSubtotal');

  const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
  if (countBadge) countBadge.textContent = totalItems;

  if (!list) return;

  if (state.cart.length === 0) {
    list.innerHTML = `
      <div style="text-align:center; padding: 60px 10px; color: var(--text-dim);">
        <p style="font-size: 1.1rem;">🌸 ${I18N[state.currentLang].bag_empty}</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = 'Rs. 0 LKR';
    return;
  }

  let totalLkr = 0;
  list.innerHTML = state.cart.map(item => {
    const itemTotal = item.price_lkr * item.qty;
    totalLkr += itemTotal;
    const name = state.currentLang === 'si' ? item.name_si : item.name_en;

    return `
      <div class="bag-item-card">
        <img class="bag-item-thumb" src="${item.image || 'img/products/hamper_luxury.jpg'}" alt="${name}">
        <div class="bag-item-details">
          <div class="bag-item-name">${name}</div>
          <div class="bag-item-price">Rs. ${item.price_lkr.toLocaleString()}</div>
        </div>
        <div class="bag-item-qty">
          <button onclick="updateBagQty('${item.id}', -1)">-</button>
          <span>${item.qty}</span>
          <button onclick="updateBagQty('${item.id}', 1)">+</button>
        </div>
      </div>
    `;
  }).join('');

  if (subtotalEl) {
    subtotalEl.textContent = `Rs. ${totalLkr.toLocaleString()} LKR`;
  }
}

function checkoutBagViaWhatsApp() {
  if (state.cart.length === 0) return;

  let hasLoom = false;
  let hasGift = false;
  let totalLkr = 0;

  let msg = `✨ *SORA SHOPPING BAG ORDER INVOICE* ✨\n\n`;
  state.cart.forEach((item, idx) => {
    if (item.shop === 'loom') hasLoom = true;
    if (item.shop === 'gift') hasGift = true;
    const itemSum = item.price_lkr * item.qty;
    totalLkr += itemSum;
    msg += `${idx + 1}. *${item.name_en}*\n   Qty: ${item.qty} × Rs. ${item.price_lkr.toLocaleString()} = Rs. ${itemSum.toLocaleString()}\n`;
  });

  msg += `\n💰 *Total Order Amount:* Rs. ${totalLkr.toLocaleString()} LKR\n`;
  msg += `📍 *Delivery:* Island-wide Courier Delivery (Sri Lanka)\n\n`;
  msg += `Hello! I would like to confirm this order. Please send payment instructions so you can dispatch my parcel! 💜🪻`;

  const targetNumber = (hasLoom && !hasGift) ? WA_NUMBERS.loom : WA_NUMBERS.gift;
  const waUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

// Floating Speed Dial WhatsApp
function initFloatingSpeedDial() {
  const hub = document.getElementById('floatingWaHub');
  const trigger = document.getElementById('fabWaTrigger');
  if (hub && trigger) {
    trigger.addEventListener('click', () => {
      hub.classList.toggle('active');
    });
  }
}

// Toast Notification
function showToast(text) {
  let toast = document.getElementById('soraToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'soraToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: rgba(30, 14, 53, 0.95);
      border: 1px solid var(--rose-blush);
      color: #FFFFFF;
      padding: 12px 24px;
      border-radius: 999px;
      font-weight: 700;
      font-size: 0.92rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.6);
      z-index: 9999;
      transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1);
      backdrop-filter: blur(12px);
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.style.transform = 'translateX(-50%) translateY(0)';
  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(120px)';
  }, 2600);
}
