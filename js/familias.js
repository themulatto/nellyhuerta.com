/* ═══════════════════════════════════════════════════
   NELLY HUERTA · FAMILIAS ENSAMBLADAS
   familias.js — camino que se dibuja, cambio de pregunta, barra móvil
   ═══════════════════════════════════════════════════ */

document.documentElement.classList.add('js');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Borde de la cabecera al hacer scroll ── */
const cabecera = document.getElementById('cabecera');
const barraMovil = document.getElementById('barraMovil');
const portada = document.querySelector('.portada');
const cierre = document.querySelector('.cierre');

/* ── El camino avanza con la lectura del relato ── */
const relato = document.getElementById('relato');
const trazo = document.querySelector('.camino-trazo');
const caminoSvg = document.querySelector('.camino');

// Con non-scaling-stroke el guion se mide en píxeles de pantalla:
// medimos el largo real del trazo ya estirado por preserveAspectRatio="none".
let largoCamino = 0;
const medirCamino = () => {
  if (!trazo) return;
  const caja = caminoSvg.getBoundingClientRect();
  const sx = caja.width / 100, sy = caja.height / 1000;
  const total = trazo.getTotalLength();
  let largo = 0, prev = trazo.getPointAtLength(0);
  for (let i = 1; i <= 400; i++) {
    const p = trazo.getPointAtLength(total * i / 400);
    largo += Math.hypot((p.x - prev.x) * sx, (p.y - prev.y) * sy);
    prev = p;
  }
  largoCamino = largo;
  trazo.style.strokeDasharray = largo;
  if (reduceMotion) trazo.style.strokeDashoffset = 0;
};

let pendiente = false;
const actualizar = () => {
  pendiente = false;
  cabecera.classList.toggle('con-borde', window.scrollY > 10);

  if (trazo && !reduceMotion) {
    const r = relato.getBoundingClientRect();
    const vh = window.innerHeight;
    // 0 cuando el relato entra por abajo, 1 cuando su final pasa por el centro
    const avance = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / (r.height - vh * 0.25)));
    trazo.style.strokeDashoffset = (largoCamino * (1 - avance)).toFixed(1);
  }

  if (barraMovil) {
    const trasPortada = portada.getBoundingClientRect().bottom < 0;
    const enCierre = cierre.getBoundingClientRect().top < window.innerHeight;
    barraMovil.classList.toggle('visible', trasPortada && !enCierre);
  }
};
const alScroll = () => {
  if (!pendiente) { pendiente = true; requestAnimationFrame(actualizar); }
};
window.addEventListener('scroll', alScroll, { passive: true });
window.addEventListener('resize', () => { medirCamino(); alScroll(); }, { passive: true });
// El alto del relato cambia cuando cargan las fuentes e imágenes
window.addEventListener('load', () => { medirCamino(); actualizar(); });
medirCamino();
actualizar();

/* ── La pregunta vieja se tacha, aparece la nueva (una sola vez) ── */
const cambio = document.getElementById('preguntaCambio');
if (cambio) {
  if (reduceMotion || !('IntersectionObserver' in window)) {
    cambio.classList.add('visto');
  } else {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { cambio.classList.add('visto'); io.disconnect(); }
    }, { threshold: 0.6 });
    io.observe(cambio);
  }
}

/* ── Correo ofuscado ── */
const correo = ['nelly', 'nellyhuerta.com'].join('@');
document.querySelectorAll('[data-email]').forEach(a => { a.href = 'mailto:' + correo; });

/* ── Reproductor: botón propio sobre el póster; controles nativos solo al reproducir ── */
const reproductor = document.getElementById('reproductor');
const video = reproductor && reproductor.querySelector('video');
const play = reproductor && reproductor.querySelector('.reproductor-play');
if (video && play) {
  video.controls = false;
  play.hidden = false;
  play.addEventListener('click', () => {
    video.controls = true;
    video.play();
  });
  video.addEventListener('play', () => {
    play.hidden = true;
    reproductor.classList.add('reproduciendo');
  });
  video.addEventListener('ended', () => {
    video.controls = false;
    video.load(); // vuelve al póster
    play.hidden = false;
    reproductor.classList.remove('reproduciendo');
    play.querySelector('.reproductor-titulo').textContent = 'Volver a escuchar';
  });
}

/* ── Un solo video sonando: pausa al salir de pantalla ── */
if (video && 'IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => { if (!e.isIntersecting && !video.paused) video.pause(); }, { threshold: 0.2 })
    .observe(video);
}
