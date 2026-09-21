// Tygrify splash screen. Included on every page via <script src="./splash.js"></script>.
// Shows once per browser session; add ?splash to any URL to force it.
(function () {
  try {
    var force = /[?&]splash\b/.test(location.search);
    if (!force && sessionStorage.getItem('tygrifySplashSeen')) return;
    sessionStorage.setItem('tygrifySplashSeen', '1');
  } catch (e) {}

  var css = '#tyg-splash{position:fixed;inset:0;z-index:2147483647;background:#0D0D0D;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:opacity .6s ease,visibility .6s ease}'
    + '#tyg-splash.tyg-out{opacity:0;visibility:hidden}'
    + '#tyg-splash img{height:min(40vh,340px);width:auto;max-width:60vw;object-fit:contain;animation:tygIn .9s cubic-bezier(.2,.7,.2,1) both}'
    + '#tyg-splash .tyg-bar{margin-top:20px;width:min(220px,50vw);height:3px;background:#262626;border-radius:2px;overflow:hidden}'
    + '#tyg-splash .tyg-bar i{display:block;height:100%;width:100%;background:#F24405;transform-origin:left;transform:scaleX(0);will-change:transform}'
    + '@keyframes tygIn{from{opacity:0;transform:translateY(16px) scale(.94)}to{opacity:1;transform:none}}'
    + '@media (prefers-reduced-motion:reduce){#tyg-splash img{animation:none}}';

  var style = document.createElement('style');
  style.textContent = css;
  var el = document.createElement('div');
  el.id = 'tyg-splash';
  el.setAttribute('role', 'presentation');
  el.innerHTML = '<img src="./assets/Logo_text.png" alt="Tygrify"><div class="tyg-bar"><i></i></div>';
  var root = document.documentElement;
  root.appendChild(style);
  root.appendChild(el);

  // Bar eases toward 90% while loading, then glides to 100% once the page is ready.
  var bar = el.querySelector('i'), start = Date.now(), last = start, p = 0, ready = false, done = false, MIN = 1700;
  function tick(now) {
    var dt = Math.min(now - last, 50); last = now;
    var target = ready && now - start >= MIN ? 1 : Math.min(0.9, (now - start) / MIN * 0.9);
    p += (target - p) * (1 - Math.pow(0.001, dt / 1000));
    bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    if (ready && target === 1 && p > 0.995) return finish();
    requestAnimationFrame(tick);
  }
  function finish() {
    if (done) return; done = true;
    bar.style.transform = 'scaleX(1)';
    setTimeout(function () {
      el.classList.add('tyg-out');
      setTimeout(function () { el.remove(); style.remove(); }, 700);
    }, 150);
  }
  function ok() { ready = true; }
  requestAnimationFrame(function (t) { start = last = t; requestAnimationFrame(tick); });
  if (document.readyState === 'complete') ok(); else window.addEventListener('load', ok);
  setTimeout(function () { ready = true; }, 5000);
})();
