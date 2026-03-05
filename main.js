(() => {
  const imgLightbox    = document.getElementById('lightbox-image');
  const iframeLightbox = document.getElementById('lightbox-iframe');
  const lightboxImg    = document.getElementById('lightbox-img');
  const lightboxIframe = document.getElementById('lightbox-iframe-src');

  // ── helpers ──────────────────────────────────────────────
  function openImageLightbox(src) {
    lightboxImg.src = src;
    imgLightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function openIframeLightbox(url) {
    lightboxIframe.src = url;
    iframeLightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAll() {
    imgLightbox.classList.remove('active');
    iframeLightbox.classList.remove('active');
    lightboxImg.src = '';
    lightboxIframe.src = '';
    document.body.style.overflow = '';
  }

  // ── wire up image cards ───────────────────────────────────
  const cards = document.querySelectorAll('.img-card img');
  // cards[0] = left, cards[1] = middle, cards[2] = right

  cards[0].addEventListener('click', () => {
    openImageLightbox(cards[0].src);
  });

  cards[1].addEventListener('click', () => {
    openIframeLightbox('submission2.html');
  });

  cards[2].addEventListener('click', () => {
    openImageLightbox(cards[2].src);
  });

  // ── close buttons ─────────────────────────────────────────
  document.querySelectorAll('.lightbox-close').forEach(btn => {
    btn.addEventListener('click', closeAll);
  });

  // close on backdrop click
  [imgLightbox, iframeLightbox].forEach(lb => {
    lb.addEventListener('click', e => {
      if (e.target === lb) closeAll();
    });
  });

  // close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAll();
  });
})();
