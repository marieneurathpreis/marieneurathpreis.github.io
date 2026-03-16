(() => {
  // ── element refs ──────────────────────────────────────────
  const iframeLightbox = document.getElementById('lightbox-iframe');
  const iframeSrc      = document.getElementById('lightbox-iframe-src');

  // ── helpers ───────────────────────────────────────────────
  function openIframeLightbox(url) {
    iframeSrc.src = url;
    iframeLightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAll() {
    iframeLightbox.classList.remove('active');
    iframeSrc.src = '';
    document.body.style.overflow = '';
  }

  // ── wire up image cards ───────────────────────────────────
  const cards = document.querySelectorAll('.img-card img');
  // cards[0] = left, cards[1] = middle, cards[2] = right

  cards[0].addEventListener('click', () => {
    openIframeLightbox('submission1.pdf');
  });

  cards[1].addEventListener('click', () => {
    openIframeLightbox('https://<username>.github.io/<forked-repo>/index.html');
  });

  cards[2].addEventListener('click', () => {
    openIframeLightbox('submission3.pdf');
  });

  // ── close button ──────────────────────────────────────────
  document.querySelectorAll('.lightbox-close').forEach(btn => {
    btn.addEventListener('click', closeAll);
  });

  // close on backdrop click
  iframeLightbox.addEventListener('click', e => {
    if (e.target === iframeLightbox) closeAll();
  });

  // close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAll();
  });
})();
