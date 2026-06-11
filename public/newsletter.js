(() => {
  const form = document.getElementById('lc-newsletter-form');
  const emailInput = document.getElementById('lc-newsletter-email');
  const msg = document.getElementById('lc-newsletter-msg');
  if (!form || !emailInput || !msg) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = 'mandando...';
    msg.style.color = '#cbc4b9';
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput.value }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        msg.textContent = data.message || 'Listo, te anotamos.';
        msg.style.color = '#f4c20d';
        emailInput.value = '';
      } else {
        const detail = Array.isArray(data.message) ? data.message[0] : data.message;
        msg.textContent = detail || 'No pudimos anotarte. Probá de nuevo.';
        msg.style.color = '#e8472b';
      }
    } catch {
      msg.textContent = 'Fallamos. Probá de nuevo en un toque.';
      msg.style.color = '#e8472b';
    }
  });
})();
