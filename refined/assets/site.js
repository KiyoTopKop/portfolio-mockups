// Rackmount · shared behaviour: lights (theme), review bar (palette), nav, magnetic CTAs,
// marquee, reveals and the token-driven mock UI. Each page adds its own signature effect.
(function () {
  const d = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const store = (k, v) => { try { v === undefined ? (v = localStorage.getItem(k)) : localStorage.setItem(k, v); } catch (e) { v = null; } return v; };
  d.classList.remove("no-js");

  /* ── theme + palette ── */
  function changed() { document.dispatchEvent(new CustomEvent("kiyo:look")); renderMocks(); syncReview(); syncLights(); }
  function setTheme(t) { d.dataset.theme = t; store("kiyo-theme", t); changed(); }
  function setPalette(p) { d.dataset.palette = p; store("kiyo-palette", p); changed(); }
  window.KiyoLook = { setTheme, setPalette, toggleTheme: () => setTheme(d.dataset.theme === "light" ? "dark" : "light") };

  function syncLights() {
    document.querySelectorAll(".lights").forEach(b => {
      const on = d.dataset.theme === "light";
      b.setAttribute("aria-pressed", on);
      const l = b.querySelector(".lbl"); if (l) l.textContent = on ? "Lights on" : "Lights off";
    });
  }
  document.querySelectorAll(".lights").forEach(b => b.addEventListener("click", () => KiyoLook.toggleTheme()));

  /* ── review bar (Phase 2 only) ── */
  const PAL = [["c", "#303 Field olive ★", ["#253122", "#fbe6a0", "#f15a30", "#b6bfc1"]], ["a", "#295 Rack violet", ["#1e0e3f", "#006eb8", "#fdbf68", "#fff200"]], ["b", "#298 Poster red", ["#111314", "#f15a30", "#f8ed43", "#bb7125"]]];
  const rb = document.createElement("div");
  rb.className = "review"; rb.setAttribute("role", "region"); rb.setAttribute("aria-label", "Phase 2 review controls");
  rb.innerHTML = `<button class="tog" type="button" aria-expanded="false">Review ▾</button><b>Palette</b>` +
    PAL.map(([k, n, c]) => `<button type="button" data-p="${k}" aria-pressed="false"><span class="chip">${c.map(x => `<i style="background:${x}"></i>`).join("")}</span>${n}</button>`).join("") +
    `<b>Theme</b><button type="button" data-t="dark" aria-pressed="false">Dark</button><button type="button" data-t="light" aria-pressed="false">Light</button><a href="index.html">Spec ↗</a>`;
  document.body.appendChild(rb);
  rb.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.classList.contains("tog")) { const o = rb.classList.toggle("open"); b.setAttribute("aria-expanded", o); return; }
    if (b.dataset.p) setPalette(b.dataset.p);
    if (b.dataset.t) setTheme(b.dataset.t);
  });
  function syncReview() { rb.querySelectorAll("[data-p]").forEach(b => b.setAttribute("aria-pressed", b.dataset.p === d.dataset.palette)); rb.querySelectorAll("[data-t]").forEach(b => b.setAttribute("aria-pressed", b.dataset.t === d.dataset.theme)); }

  /* ── nav ── */
  const nav = document.querySelector(".nav");
  const onScroll = () => nav && nav.classList.toggle("scrolled", scrollY > 24);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const mb = document.querySelector(".menu-btn");
  if (mb) mb.addEventListener("click", () => { const o = document.body.classList.toggle("menu-open"); mb.setAttribute("aria-expanded", o); mb.setAttribute("aria-label", o ? "Close menu" : "Open menu"); });
  document.querySelectorAll(".sheet a").forEach(a => a.addEventListener("click", () => document.body.classList.remove("menu-open")));
  addEventListener("keydown", e => { if (e.key === "Escape" && document.body.classList.contains("menu-open")) { document.body.classList.remove("menu-open"); mb && mb.focus(); } });

  /* ── magnetic CTAs (fine pointers only) ── */
  if (!reduce && finePointer) document.querySelectorAll(".mag").forEach(b => {
    b.addEventListener("pointermove", e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .28}px,${(e.clientY - r.top - r.height / 2) * .28}px)`; });
    b.addEventListener("pointerleave", () => b.style.transform = "");
  });

  /* ── marquee: pauses off-screen ── */
  document.querySelectorAll(".band[data-words]").forEach(band => {
    const seq = band.dataset.words.split("|").map(w => `${w}<b>✦</b>`).join("");
    band.innerHTML = `<div class="track">${seq}${seq}</div>`;
    new IntersectionObserver(([en]) => band.classList.toggle("paused", !en.isIntersecting)).observe(band);
  });

  /* ── reveals ── */
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".rv").forEach(el => io.observe(el));

  /* ── mock UI in the live palette ── */
  function renderMocks() {
    if (!window.MockUI) return;
    const cs = getComputedStyle(d), v = n => cs.getPropertyValue(n).trim();
    document.querySelectorAll("[data-mock='autoshop']").forEach(el => {
      el.innerHTML = MockUI.autoshop({ bg: v("--bg-2"), panel: v("--surface"), line: v("--line"), fg: v("--fg"), muted: v("--muted"), acc: v("--accent"), ok: v("--m-ok"), warn: v("--m-warn"), bad: v("--m-bad"), onAcc: v("--on-accent"), font: '"Familjen Grotesk", system-ui, sans-serif' });
    });
  }
  window.renderMocks = renderMocks;
  renderMocks(); syncReview(); syncLights();
})();
