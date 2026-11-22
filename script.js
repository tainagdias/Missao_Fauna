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