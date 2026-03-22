/* ═══════════════════════════════════════════════════
   NELLY HUERTA · PSICÓLOGA CLÍNICA
   main.js — Interacciones y comportamiento
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ────────────────────────────────────────────────
     CURSOR PERSONALIZADO
  ──────────────────────────────────────────────── */
  const cursor = document.getElementById('cursor');
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
  const hoverTargets = 'a, button, .servicio-card, .testimonio, .credencial, #heart-btn, #music-player';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  /* ────────────────────────────────────────────────
     NAV SCROLL
  ──────────────────────────────────────────────── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ────────────────────────────────────────────────
     HAMBURGER MENÚ MÓVIL
  ──────────────────────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  window.closeMobile = () => mobileMenu.classList.remove('open');

  /* ────────────────────────────────────────────────
     EMAIL PROTEGIDO
  ──────────────────────────────────────────────── */
  const u = 'nelly', d = 'nellyhuerta', t = 'com';
  const email = u + '@' + d + '.' + t;
  document.querySelectorAll('[data-email]').forEach(el => {
    el.href = 'mailto:' + email;
    if (el.dataset.showEmail !== undefined) el.textContent = email;
  });
  const agendarBtn = document.getElementById('agendarBtn');
  if (agendarBtn) agendarBtn.href = 'mailto:' + email + '?subject=Quisiera%20agendar%20una%20conversación';

  /* ────────────────────────────────────────────────
     ENCUADRADO — REVIEWS SLIDER
  ──────────────────────────────────────────────── */
  const reviews = [
    { text: '"Siempre un agrado aclarar la mente con Nelly, la mejor atención siempre"',          autor: 'Anónima',          fecha: 'Hace 3 días'  },
    { text: '"Excelente profesional, muy comprometida."',                                          autor: 'Anónima',          fecha: 'Agosto 2025'  },
    { text: '"Excelente profesional. Muy empática, asertiva y profesional. La recomiendo 1000%!"', autor: 'Yolimar Ramírez',  fecha: 'Feb 2025'     },
    { text: '"Nelly tiene una capacidad única para hacer las preguntas exactas en el momento justo."', autor: 'Consulta familiar', fecha: '2025'     },
  ];
  const slideContainer = document.getElementById('encReviewSlides');
  const dotsContainer  = document.getElementById('encReviewDots');
  if (slideContainer && dotsContainer) {
    reviews.forEach((r, i) => {
      const slide = document.createElement('div');
      slide.className = 'enc-review-slide' + (i === 0 ? ' active' : '');
      slide.innerHTML = `<p class="enc-review-text">${r.text}</p><p class="enc-review-meta">${r.autor} · <span>${r.fecha}</span></p>`;
      slideContainer.appendChild(slide);
      const dot = document.createElement('div');
      dot.className = 'enc-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goToReview(i));
      dotsContainer.appendChild(dot);
    });
    let cur = 0;
    const goToReview = (idx) => {
      document.querySelectorAll('.enc-review-slide').forEach((s,i) => s.classList.toggle('active', i===idx));
      document.querySelectorAll('.enc-dot').forEach((d,i)           => d.classList.toggle('active', i===idx));
      cur = idx;
    };
    setInterval(() => goToReview((cur + 1) % reviews.length), 4200);
  }

  /* ────────────────────────────────────────────────
     SCROLL REVEAL
  ──────────────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const siblings = Array.from(e.target.parentElement.children).filter(c => c.classList.contains('reveal'));
      e.target.style.transitionDelay = (siblings.indexOf(e.target) * 0.08) + 's';
      e.target.classList.add('visible');
      io.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => io.observe(r));

  /* ════════════════════════════════════════════════
     MUSIC PLAYER FLOTANTE
     Activa tras primer gesto del usuario (req. Chrome)
     Loop infinito · barra de progreso · seek en barra
  ═════════════════════════════════════════════════ */
  const audio       = document.getElementById('bgAudio');
  const mpPlayer    = document.getElementById('music-player');
  const mpToggle    = document.getElementById('mp-toggle');
  const mpIconPlay  = document.getElementById('mp-icon-play');
  const mpIconPause = document.getElementById('mp-icon-pause');
  const mpBar       = document.getElementById('mpProgressBar');
  const mpWrap      = document.getElementById('mpProgressWrap');
  const mpHint      = document.getElementById('mpHint');
  let audioReady    = false;

  const setPlayUI = (playing) => {
    mpIconPlay.style.display  = playing ? 'none'  : 'block';
    mpIconPause.style.display = playing ? 'block' : 'none';
    mpPlayer.classList.toggle('playing', playing);
  };

  const playAudio = () => {
    audio.volume = 0.25;
    audio.play().then(() => {
      audioReady = true;
      setPlayUI(true);
      if (mpHint) { mpHint.classList.add('hidden'); setTimeout(() => mpHint?.remove(), 500); }
    }).catch(() => {}); // bloqueado por autoplay policy → no pasa nada
  };

  const pauseAudio = () => { audio.pause(); setPlayUI(false); };

  // Toggle al pulsar botón o el propio player
  mpToggle.addEventListener('click', (e) => { e.stopPropagation(); audio.paused ? playAudio() : pauseAudio(); });
  mpPlayer.addEventListener('click', () => { audio.paused ? playAudio() : pauseAudio(); });

  // Primer gesto activa el audio
  const firstGesture = () => { if (!audioReady) playAudio(); };
  ['click','keydown','touchstart'].forEach(ev => document.addEventListener(ev, firstGesture, { once: true, passive: true }));

  // Barra de progreso en tiempo real
  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    mpBar.style.transition = 'width 0.8s linear';
    mpBar.style.width = ((audio.currentTime / audio.duration) * 100) + '%';
  });

  // Seek clickando la barra
  mpWrap && mpWrap.addEventListener('click', (e) => {
    e.stopPropagation();
    const r = mpWrap.getBoundingClientRect();
    audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
  });

  /* ════════════════════════════════════════════════
     BOTÓN CORAZÓN
     — contador GLOBAL compartido entre todos los visitantes
       usando countapi.xyz (gratuito, sin backend)
     — like personal persiste en localStorage del navegador
  ═════════════════════════════════════════════════ */
  const heartBtn   = document.getElementById('heart-btn');
  const heartCount = document.getElementById('heart-count');
  const LIKED_KEY  = 'nelly_heart_liked';
  // Namespace único para este sitio en countapi
  const COUNT_NS   = 'nellyhuerta.com';
  const COUNT_KEY  = 'megusta';

  let liked = localStorage.getItem(LIKED_KEY) === '1';

  const renderHeart = (n) => {
    if (n !== undefined) heartCount.textContent = n >= 1000
      ? (n / 1000).toFixed(1).replace('.0','') + 'k'
      : n;
    heartBtn.classList.toggle('liked', liked);
  };

  // Cargar el conteo actual al iniciar
  fetch(`https://api.countapi.xyz/get/${COUNT_NS}/${COUNT_KEY}`)
    .then(r => r.json())
    .then(d => renderHeart(d.value || 0))
    .catch(() => renderHeart(0));

  // Estado inicial del corazón (sin número hasta que carga la API)
  renderHeart();

  // Partículas volando
  const launchParticles = () => {
    const rect = heartBtn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    for (let i = 0; i < 6; i++) {
      const p = document.createElement('span');
      p.className = 'heart-particle';
      p.textContent = '♥';
      p.style.cssText = `
        left: ${cx + (Math.random()-0.5)*44}px;
        top:  ${cy + (Math.random()-0.5)*24}px;
        color: ${i%2===0 ? '#d9479a' : '#e86bb8'};
        font-size: ${0.7+Math.random()*0.6}rem;
        animation-delay: ${i*0.06}s;
      `;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1300);
    }
  };

  heartBtn.addEventListener('click', () => {
    if (!liked) {
      // Primer like: sumar en la API global
      liked = true;
      localStorage.setItem(LIKED_KEY, '1');
      heartBtn.classList.add('pop');
      setTimeout(() => heartBtn.classList.remove('pop'), 350);
      launchParticles();
      // Crear la clave si no existe, luego incrementar
      fetch(`https://api.countapi.xyz/hit/${COUNT_NS}/${COUNT_KEY}`)
        .then(r => r.json())
        .then(d => renderHeart(d.value))
        .catch(() => {});
    } else {
      // Quitar like: restar en la API
      liked = false;
      localStorage.setItem(LIKED_KEY, '0');
      fetch(`https://api.countapi.xyz/update/${COUNT_NS}/${COUNT_KEY}?amount=-1`)
        .then(r => r.json())
        .then(d => renderHeart(Math.max(0, d.value)))
        .catch(() => {});
    }
    renderHeart();
  });

}); // end DOMContentLoaded
