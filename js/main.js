
// MENU HAMBÚRGUER

const menuToggle    = document.getElementById('menuToggle');
const menuPrincipal = document.getElementById('menuPrincipal');

if (menuToggle && menuPrincipal) {

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const aberto = menuPrincipal.classList.toggle('aberto');
    menuToggle.setAttribute('aria-expanded', String(aberto));
  });

  // Fecha o menu ao clicar em qualquer link
  menuPrincipal.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuPrincipal.classList.remove('aberto');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (!menuPrincipal.contains(e.target) && !menuToggle.contains(e.target)) {
      menuPrincipal.classList.remove('aberto');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

//
// CARROSSEL
//

function inicializarCarousel(id) {
  const carousel = document.getElementById(id);
  if (!carousel) return;

  const track   = carousel.querySelector('.carousel__track');
  const dotsEl  = carousel.querySelector('.carousel__dots');
  const btnPrev = carousel.querySelector('.carousel__btn--prev');
  const btnNext = carousel.querySelector('.carousel__btn--next');
  const total   = parseInt(carousel.dataset.total, 10);
  let atual = 0;

  // Gera os dots dinamicamente
  const dots = [];
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.classList.add('carousel__dot');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    if (i === 0) dot.classList.add('ativo');
    dot.addEventListener('click', () => irPara(i));
    dotsEl.appendChild(dot);
    dots.push(dot);
  }

  // Move para o slide pelo indice (em pixels)
  function irPara(indice) {
    atual = ((indice % total) + total) % total;
    const largura = carousel.offsetWidth;
    track.style.transform = 'translateX(-' + (atual * largura) + 'px)';
    dots.forEach((d, i) => d.classList.toggle('ativo', i === atual));
  }

  btnPrev.addEventListener('click', () => irPara(atual - 1));
  btnNext.addEventListener('click', () => irPara(atual + 1));

  // Recalcula posicao ao redimensionar (evita desalinhamento)
  window.addEventListener('resize', () => {
    track.style.transition = 'none';
    irPara(atual);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.style.transition = '';
      });
    });
  });

  // Suporte a swipe (touch)
  let touchStartX = 0;
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      irPara(diff > 0 ? atual + 1 : atual - 1);
    }
  }, { passive: true });
}

inicializarCarousel('carouselAmuletos');
inicializarCarousel('carouselPersonagens');


// MAPA FULLSCREEN
// Cria overlay que cobre a tela ao clicar na imagem.

function inicializarMapaFullscreen() {
  const imgMapa = document.querySelector('.imagem-bloco--zoom img');
  if (!imgMapa) return;

  // Cria o overlay dinamicamente
  const overlay = document.createElement('div');
  overlay.classList.add('mapa-overlay');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Mapa em tela cheia');

  const imgGrande = document.createElement('img');
  imgGrande.src = imgMapa.src;
  imgGrande.alt = imgMapa.alt;

  const btnFechar = document.createElement('button');
  btnFechar.classList.add('mapa-overlay__fechar');
  btnFechar.setAttribute('aria-label', 'Fechar');
  btnFechar.innerHTML = '&times;';

  overlay.appendChild(btnFechar);
  overlay.appendChild(imgGrande);
  document.body.appendChild(overlay);

  // Abre
  imgMapa.addEventListener('click', () => {
    overlay.classList.add('visivel');
    document.body.style.overflow = 'hidden';
  });

  // Fecha
  function fechar() {
    overlay.classList.remove('visivel');
    document.body.style.overflow = '';
  }

  btnFechar.addEventListener('click', (e) => {
    e.stopPropagation();
    fechar();
  });

  overlay.addEventListener('click', (e) => {
    if (e.target !== imgGrande) fechar();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fechar();
  });
}

inicializarMapaFullscreen();

// Scroll suave para links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    const destino = document.querySelector(href);
    if (!destino) return;

    e.preventDefault();
    menuPrincipal.classList.remove('aberto');
    menuToggle.setAttribute('aria-expanded', 'false');

    // Remove o hover do menu
    link.blur();
    document.activeElement.blur();

    const headerAltura = document.querySelector('header').offsetHeight;
    const topo = destino.getBoundingClientRect().top + window.scrollY - headerAltura;
    const inicio = window.scrollY;
    const distancia = topo - inicio;
    const duracao = 700;
    let startTime = null;

    function easeInOut(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function animar(timestamp) {
      if (!startTime) startTime = timestamp;
      const progresso = Math.min((timestamp - startTime) / duracao, 1);
      window.scrollTo(0, inicio + distancia * easeInOut(progresso));
      if (progresso < 1) requestAnimationFrame(animar);
    }

    requestAnimationFrame(animar);
  });
});