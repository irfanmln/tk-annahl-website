// ===== FORCE LIGHT MODE (cegah browser dark mode override) =====
(function() {
  const m = document.createElement('meta');
  m.name = 'color-scheme';
  m.content = 'light';
  document.head.appendChild(m);
})();

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

// ===== NAVBAR =====
function renderNavbar() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const isActive = (page) => currentPath === page ? 'active' : '';

  document.getElementById('navbar').innerHTML = `
    <nav>
      <a href="index.html" class="logo">
        <img src="logo-annahl.png" alt="An-Nahl" style="width:46px;height:46px;border-radius:50%;object-fit:cover"/>
        <div class="logo-text">
          TK. PGRI An-Nahl
          <span>An-Nahl Learning Centre</span>
        </div>
      </a>
      <button class="nav-toggle" onclick="toggleNav()">☰</button>
      <ul class="nav-links" id="navLinks">
        <li><a href="index.html" class="${isActive('index.html')}">Beranda</a></li>
        <li class="nav-dropdown">
          <a href="#" onclick="toggleDropdown(this);return false;" class="${['toddler.html','nursery.html','k1.html','k2.html'].includes(currentPath) ? 'active' : ''}">Program ▾</a>
          <div class="nav-dropdown-menu">
            <a href="toddler.html">⭐ Toddler (2–3 Th)</a>
            <a href="nursery.html">🌙 Nursery (3–4 Th)</a>
            <a href="k1.html">☀️ Kindergarten 1</a>
            <a href="k2.html">☁️ Kindergarten 2</a>
          </div>
        </li>
        <li class="nav-dropdown">
          <a href="#" onclick="toggleDropdown(this);return false;" class="${['activities.html','afterschool.html'].includes(currentPath) ? 'active' : ''}">Kegiatan ▾</a>
          <div class="nav-dropdown-menu">
            <a href="activities.html">🎨 Activities</a>
            <a href="afterschool.html">🏹 Ekstrakurikuler</a>
          </div>
        </li>
        <li><a href="galeri.html" class="${isActive('galeri.html')}">Galeri</a></li>
        <li><a href="ppdb.html" class="${isActive('ppdb.html')}">Pendaftaran</a></li>
        <li><a href="kontak.html" class="${isActive('kontak.html')}">Kontak</a></li>
        <li><a href="ppdb.html" class="nav-btn">Daftar Sekarang</a></li>
      </ul>
    </nav>
    <div id="mobileDrawer" style="
      display:none;
      position:fixed;
      top:72px; left:0; right:0; bottom:0;
      z-index:9998;
      overflow-y:auto;
      background:white;
      padding:8px 16px 40px;
      flex-direction:column;
      gap:4px;
    ">
      <a href="index.html" style="display:block;padding:14px 16px;border-radius:12px;text-decoration:none;color:#3D2B00;font-weight:700;font-size:16px;background:${isActive('index.html') ? '#FFD700' : 'transparent'}">Beranda</a>
      
      <div style="padding:14px 16px;font-weight:700;font-size:16px;color:#3D2B00;cursor:pointer;border-radius:12px;display:flex;justify-content:space-between;align-items:center" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==='none'?'flex':'none';this.querySelector('.arr').textContent=this.nextElementSibling.style.display==='none'?'▾':'▴'">
        Program <span class="arr">▾</span>
      </div>
      <div style="display:none;flex-direction:column;background:#FFF8E7;border-radius:12px;padding:8px;margin-bottom:4px">
        <a href="toddler.html" style="display:block;padding:10px 14px;border-radius:10px;text-decoration:none;color:#3D2B00;font-weight:700;font-size:14px">⭐ Toddler (2–3 Th)</a>
        <a href="nursery.html" style="display:block;padding:10px 14px;border-radius:10px;text-decoration:none;color:#3D2B00;font-weight:700;font-size:14px">🌙 Nursery (3–4 Th)</a>
        <a href="k1.html" style="display:block;padding:10px 14px;border-radius:10px;text-decoration:none;color:#3D2B00;font-weight:700;font-size:14px">☀️ Kindergarten 1</a>
        <a href="k2.html" style="display:block;padding:10px 14px;border-radius:10px;text-decoration:none;color:#3D2B00;font-weight:700;font-size:14px">☁️ Kindergarten 2</a>
      </div>

      <div style="padding:14px 16px;font-weight:700;font-size:16px;color:#3D2B00;cursor:pointer;border-radius:12px;display:flex;justify-content:space-between;align-items:center" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==='none'?'flex':'none';this.querySelector('.arr').textContent=this.nextElementSibling.style.display==='none'?'▾':'▴'">
        Kegiatan <span class="arr">▾</span>
      </div>
      <div style="display:none;flex-direction:column;background:#FFF8E7;border-radius:12px;padding:8px;margin-bottom:4px">
        <a href="activities.html" style="display:block;padding:10px 14px;border-radius:10px;text-decoration:none;color:#3D2B00;font-weight:700;font-size:14px">🎨 Activities</a>
        <a href="afterschool.html" style="display:block;padding:10px 14px;border-radius:10px;text-decoration:none;color:#3D2B00;font-weight:700;font-size:14px">🏹 Ekstrakurikuler</a>
      </div>

      <a href="galeri.html" style="display:block;padding:14px 16px;border-radius:12px;text-decoration:none;color:#3D2B00;font-weight:700;font-size:16px;background:${isActive('galeri.html') ? '#FFD700' : 'transparent'}">📸 Galeri</a>
      <a href="ppdb.html" style="display:block;padding:14px 16px;border-radius:12px;text-decoration:none;color:#3D2B00;font-weight:700;font-size:16px">Pendaftaran</a>
      <a href="kontak.html" style="display:block;padding:14px 16px;border-radius:12px;text-decoration:none;color:#3D2B00;font-weight:700;font-size:16px">Kontak</a>
      <a href="ppdb.html" style="display:block;padding:14px 16px;border-radius:12px;text-decoration:none;font-weight:700;font-size:16px;background:linear-gradient(135deg,#FF8C00,#E65C00);color:white;text-align:center;margin-top:8px">Daftar Sekarang</a>
    </div>
    <div id="navOverlay" onclick="closeNav()" style="display:none;position:fixed;inset:0;top:72px;background:rgba(0,0,0,0.5);z-index:9997"></div>
  `;
}

function toggleNav() {
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('navOverlay');
  const isOpen = drawer.style.display === 'flex';
  if (isOpen) {
    closeNav();
  } else {
    drawer.style.display = 'flex';
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function closeNav() {
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('navOverlay');
  if (drawer) drawer.style.display = 'none';
  if (overlay) overlay.style.display = 'none';
  document.body.style.overflow = '';
}

function toggleDropdown(el) {
  // Hanya aktif di mobile
  if (window.innerWidth > 900) return;
  const parent = el.closest('.nav-dropdown');
  const isOpen = parent.classList.contains('mobile-open');
  // Tutup semua dropdown dulu
  document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('mobile-open'));
  // Buka yang diklik kalau belum open
  if (!isOpen) parent.classList.add('mobile-open');
}

// ===== FOOTER =====
function renderFooter() {
  document.getElementById('footer').innerHTML = `
    <footer>
      <div class="footer-grid">
        <div class="footer-brand">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
            <img src="logo-annahl.png" alt="An-Nahl" style="width:48px;height:48px;border-radius:50%;object-fit:cover"/>
            <div>
              <div style="font-family:'Baloo 2',cursive;font-size:16px;font-weight:800;color:#FFD700">TK. PGRI An-Nahl</div>
              <div style="font-size:12px;color:rgba(255,255,255,0.5)">An-Nahl Learning Centre</div>
            </div>
          </div>
          <p>Sekolah anak usia dini (2–6 tahun) dengan pendekatan Islamic Montessori. Membangun generasi bertaqwa, berakhlak mulia, sehat, cerdas, kreatif dan mandiri.</p>
        </div>
        <div>
          <div class="footer-title">Program</div>
          <ul class="footer-links">
            <li><a href="toddler.html">⭐ Toddler Class (2–3 Th)</a></li>
            <li><a href="nursery.html">🌙 Nursery Class (3–4 Th)</a></li>
            <li><a href="k1.html">☀️ Kindergarten 1 (4–5 Th)</a></li>
            <li><a href="k2.html">☁️ Kindergarten 2 (5–6 Th)</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-title">Kegiatan</div>
          <ul class="footer-links">
            <li><a href="activities.html">🎨 Activities</a></li>
            <li><a href="afterschool.html">🏹 Ekstrakurikuler</a></li>
            <li><a href="galeri.html">📸 Galeri Foto</a></li>
            <li><a href="ppdb.html">📝 Pendaftaran PPDB</a></li>
            <li><a href="kontak.html">📍 Kontak Kami</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-title">Kontak</div>
          <ul class="footer-links">
            <li><a href="#">📍 Jl. Didi Sukardi Gang SMA PGRI, Citamiang, Kota Sukabumi</a></li>
            <li><a href="https://wa.me/6281296282841">📱 0812-9628-2841 (Ms. Laeli)</a></li>
            <li><a href="https://wa.me/6281333412607">📱 0813-3341-2607 (Ms. Salsa)</a></li>
            <li><a href="mailto:annahllearningcentre@gmail.com">📧 annahllearningcentre@gmail.com</a></li>
            <li><a href="https://instagram.com/annahl_learningcentre" target="_blank">📸 @annahl_learningcentre</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        © 2026 <span>TK. PGRI An-Nahl</span> – An-Nahl Learning Centre. Kota Sukabumi. Dibuat dengan <span>❤️</span>
      </div>
    </footer>
  `;
}

// ===== TOAST =====
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
