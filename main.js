(() => {
  // ── PDF.js setup ──────────────────────────────────────────
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  // ── element refs ──────────────────────────────────────────
  const pdfLightbox    = document.getElementById('lightbox-pdf');
  const iframeLightbox = document.getElementById('lightbox-iframe');
  const pdfContainer   = document.getElementById('lightbox-pdf-container');
  const iframeSrc      = document.getElementById('lightbox-iframe-src');

  // ── helpers ───────────────────────────────────────────────
  async function openPdfLightbox(pdfUrl) {
    // Clear any previously rendered pages
    pdfContainer.innerHTML = '';
    pdfLightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    try {
      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;

      for (let i = 1; i <= pdf.numPages; i++) {
        const page     = await pdf.getPage(i);
        // Scale to fit the lightbox width (~90vw, max 900px)
        const desiredWidth = Math.min(window.innerWidth * 0.85, 900);
        const unscaled     = page.getViewport({ scale: 1 });
        const scale        = desiredWidth / unscaled.width;
        const viewport     = page.getViewport({ scale });

        const canvas    = document.createElement('canvas');
        canvas.width    = viewport.width;
        canvas.height   = viewport.height;
        canvas.style.display = 'block';
        canvas.style.marginBottom = '8px';

        await page.render({
          canvasContext: canvas.getContext('2d'),
          viewport,
        }).promise;

        pdfContainer.appendChild(canvas);
      }
    } catch (err) {
      pdfContainer.innerHTML =
        '<p style="color:red;padding:1rem;">PDF konnte nicht geladen werden.</p>';
      console.error('PDF.js error:', err);
    }
  }

  function openIframeLightbox(url) {
    iframeSrc.src = url;
    iframeLightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAll() {
    pdfLightbox.classList.remove('active');
    iframeLightbox.classList.remove('active');
    pdfContainer.innerHTML = '';
    iframeSrc.src = '';
    document.body.style.overflow = '';
  }

  // ── wire up image cards ───────────────────────────────────
  const cards = document.querySelectorAll('.img-card img');
  // cards[0] = left, cards[1] = middle, cards[2] = right

  cards[0].addEventListener('click', () => {
    openPdfLightbox('submission1.pdf');
  });

  cards[1].addEventListener('click', () => {
    openIframeLightbox('https://<username>.github.io/<forked-repo>/index.html');
  });

  cards[2].addEventListener('click', () => {
    openPdfLightbox('submission3.pdf');
  });

  // ── close buttons ─────────────────────────────────────────
  document.querySelectorAll('.lightbox-close').forEach(btn => {
    btn.addEventListener('click', closeAll);
  });

  // close on backdrop click
  [pdfLightbox, iframeLightbox].forEach(lb => {
    lb.addEventListener('click', e => {
      if (e.target === lb) closeAll();
    });
  });

  // close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAll();
  });
})();
