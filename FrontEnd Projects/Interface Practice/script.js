(() => {
  const root = document.documentElement;
  const body = document.body;

  document.getElementById('year').textContent = new Date().getFullYear();

  const THEME_KEY = 'nova_theme';
  const themeToggle = document.getElementById('themeToggle');

  function setTheme(mode){
    if(mode === 'light'){
      root.classList.add('light');
      body.classList.add('light');
      themeToggle.textContent = '☀️';
      themeToggle.setAttribute('aria-pressed','true');
    } else {
      root.classList.remove('light');
      body.classList.remove('light');
      themeToggle.textContent = '🌙';
      themeToggle.setAttribute('aria-pressed','false');
    }
    localStorage.setItem(THEME_KEY, mode);
  }

  const saved = localStorage.getItem(THEME_KEY) || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  setTheme(saved);

  themeToggle.addEventListener('click', () => {
    const next = body.classList.contains('light') ? 'dark' : 'light';
    setTheme(next);
  });

  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('show');
  });

  const blob = document.querySelector('.blob');
  if(blob){
    setInterval(() => blob.classList.toggle('animate'), 3500);
  }

  const observer = new IntersectionObserver((entries) => {
    for(const e of entries){
      if(e.isIntersecting) e.target.classList.add('revealed');
    }
  }, {threshold: 0.15});
  document.querySelectorAll('.feature, .plan, .quote, .product-card').forEach(el => observer.observe(el));

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const f = new FormData(form);
    const entry = {
      name: f.get('name').trim(),
      email: f.get('email').trim(),
      message: f.get('message').trim(),
      ts: new Date().toISOString()
    };

    if(!entry.name || !entry.email || !entry.message){
      status.textContent = 'Please fill out all fields.';
      return;
    }

    const key = 'nova_messages';
    const messages = JSON.parse(localStorage.getItem(key) || '[]');
    messages.unshift(entry);
    localStorage.setItem(key, JSON.stringify(messages));
    status.textContent = 'Message saved locally. Replace with backend when ready.';
    form.reset();
    setTimeout(()=> status.textContent = '', 4000);
  });

  document.getElementById('saveNewsletter').addEventListener('click', () => {
    const name = (document.getElementById('name').value || 'Anon').trim();
    const email = (document.getElementById('email').value || '').trim();
    if(!email) {
      status.textContent = 'Enter an email to subscribe.';
      return;
    }
    const key = 'nova_news';
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    if(list.find(l => l.email === email)){
      status.textContent = 'You are already subscribed (local).';
      return;
    }
    list.push({name, email, ts: new Date().toISOString()});
    localStorage.setItem(key, JSON.stringify(list));
    status.textContent = 'Subscribed locally — replace with real service for production.';
    setTimeout(()=> status.textContent = '', 3500);
  });

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){
      nav.classList.remove('show');
      navToggle.setAttribute('aria-expanded','false');
    }
  });

  document.querySelectorAll('.avatar').forEach(el => {
    const txt = el.getAttribute('data-initials') || '';
    el.textContent = txt;
  });

})();
