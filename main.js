// ===== SUPABASE CONFIG =====
const SUPABASE_URL = 'https://ssfiywjmgiogixryssbx.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Xo3_edCbQl5okm56MkuiLQ_JRWyYwea';

async function supabaseInsert(table, data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(data)
  });
  return res.ok;
}

async function supabaseSelect(table, params = '') {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${params}`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
  return res.json();
}

async function supabaseUpdate(table, id, data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(data)
  });
  return res.ok;
}

// ===== NAVBAR =====
function renderNavbar(activePage = '') {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const isActive = (page) => currentPath === page ? 'active' : '';

  document.getElementById('navbar').innerHTML = `
    <nav>
      <a href="index.html" class="logo">
        <div class="logo-icon">🌻</div>
        <div class="logo-text">
          An-Nahl Learning Center
          <span>Islamic Early Childhood Education</span>
        </div>
      </a>
      <button class="nav-toggle" onclick="toggleNav()">☰</button>
      <ul class="nav-links" id="navLinks">
        <li><a href="index.html" class="${isActive('index.html')}">Beranda</a></li>
        <li class="nav-dropdown">
          <a href="#" class="${['nursery.html','toddler.html','k1.html','k2.html'].includes(currentPath) ? 'active' : ''}">Program ▾</a>
          <div class="nav-dropdown-menu">
            <a href="nursery.html">🌱 Nursery Class</a>
            <a href="toddler.html">🐣 Toddler Class</a>
            <a href="k1.html">⭐ K1</a>
            <a href="k2.html">🚀 K2</a>
          </div>
        </li>
        <li class="nav-dropdown">
          <a href="#" class="${['activities.html','afterschool.html'].includes(currentPath) ? 'active' : ''}">Activities ▾</a>
          <div class="nav-dropdown-menu">
            <a href="activities.html">🎨 Activities</a>
            <a href="afterschool.html">🌟 Afterschool</a>
          </div>
        </li>
        <li><a href="ppdb.html" class="${isActive('ppdb.html')}">Pendaftaran</a></li>
        <li><a href="kontak.html" class="${isActive('kontak.html')}">Kontak</a></li>
        <li><a href="ppdb.html" class="nav-btn">Daftar Sekarang</a></li>
      </ul>
    </nav>
  `;
}

function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

// ===== FOOTER =====
function renderFooter() {
  document.getElementById('footer').innerHTML = `
    <footer>
      <div class="footer-grid">
        <div class="footer-brand">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
            <div style="width:44px;height:44px;background:linear-gradient(135deg,#FFD700,#FF8C00);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px">🌻</div>
            <div style="font-family:'Baloo 2',cursive;font-size:16px;font-weight:800;color:#FFD700">An-Nahl Learning Center</div>
          </div>
          <p>Membangun generasi penerus yang cerdas, berkarakter Islami, dan berprestasi sejak usia dini dengan metode pembelajaran yang menyenangkan.</p>
        </div>
        <div>
          <div class="footer-title">Program</div>
          <ul class="footer-links">
            <li><a href="nursery.html">🌱 Nursery Class</a></li>
            <li><a href="toddler.html">🐣 Toddler Class</a></li>
            <li><a href="k1.html">⭐ K1</a></li>
            <li><a href="k2.html">🚀 K2</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-title">Activities</div>
          <ul class="footer-links">
            <li><a href="activities.html">🎨 Activities</a></li>
            <li><a href="afterschool.html">🌟 Afterschool</a></li>
            <li><a href="ppdb.html">📝 Pendaftaran</a></li>
            <li><a href="kontak.html">📍 Kontak</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-title">Kontak</div>
          <ul class="footer-links">
            <li><a href="#">📍 Jl. Contoh No. 123</a></li>
            <li><a href="#">📱 +62 812-XXXX-XXXX</a></li>
            <li><a href="#">📧 info@annahl.sch.id</a></li>
            <li><a href="#">📸 @annahl.learningcenter</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        © 2025 <span>An-Nahl Learning Center</span>. Dibuat dengan <span>❤️</span> untuk generasi terbaik.
      </div>
    </footer>
  `;
}

// ===== TOAST NOTIFICATION =====
function showToast(msg, type = 'success') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed; bottom:24px; right:24px; z-index:9999;
    background:${type === 'success' ? '#4CAF50' : '#F44336'};
    color:white; padding:14px 24px; border-radius:14px;
    font-family:'Nunito',sans-serif; font-weight:700; font-size:15px;
    box-shadow:0 8px 24px rgba(0,0,0,0.2);
    animation:fadeUp 0.4s ease;
  `;
  toast.textContent = (type === 'success' ? '✅ ' : '❌ ') + msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}
