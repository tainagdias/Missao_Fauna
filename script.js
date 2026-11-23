// Abre e fecha o texto dos cards de biomas com clique, toque ou teclado
document.querySelectorAll('.card').forEach(card => {
  const alternar = () => {
    const aberto = card.classList.toggle('ativo');
    card.setAttribute('aria-expanded', aberto);
  };

  card.addEventListener('click', alternar);

  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      alternar();
    }
  });
});

// Menu burger: abre e fecha o menu de navegação no celular
const botaoMenu = document.querySelector('.menu-burger');
const menu = document.querySelector('.menu');

if (botaoMenu && menu) {
  botaoMenu.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    botaoMenu.setAttribute('aria-expanded', aberto);
    botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });

  // Fecha o menu ao clicar em um link
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('aberto');
      botaoMenu.setAttribute('aria-expanded', 'false');
      botaoMenu.setAttribute('aria-label', 'Abrir menu');
    });
  });
}


// Submenu da página Informações: destaca o botão da seção que está na tela
const linksSubmenu = document.querySelectorAll('.submenu a');

if (linksSubmenu.length) {
  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
      if (!entrada.isIntersecting) return;
      linksSubmenu.forEach(link => {
        const ativo = link.getAttribute('href') === '#' + entrada.target.id;
        link.classList.toggle('ativo', ativo);
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px' }); // conta como "na tela" a faixa do meio

  linksSubmenu.forEach(link => {
    const secao = document.querySelector(link.getAttribute('href'));
    if (secao) observador.observe(secao);
  });
}


// Botão de voltar ao topo: aparece depois de rolar a página e leva ao início
const botaoTopo = document.querySelector('.voltar-topo');

if (botaoTopo) {
  const rodape = document.querySelector('footer');

  const atualizarBotaoTopo = () => {
    botaoTopo.classList.toggle('visivel', window.scrollY > 300);

    // Quando o rodapé aparece na tela, o botão sobe para ficar acima dele
    botaoTopo.style.bottom = '';
    if (rodape) {
      const margem = parseFloat(getComputedStyle(botaoTopo).bottom);
      const rodapeVisivel = window.innerHeight - rodape.getBoundingClientRect().top;
      if (rodapeVisivel > 0) {
        botaoTopo.style.bottom = (rodapeVisivel + margem) + 'px';
      }
    }
  };

  window.addEventListener('scroll', atualizarBotaoTopo, { passive: true });
  window.addEventListener('resize', atualizarBotaoTopo);
  atualizarBotaoTopo();

  botaoTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
