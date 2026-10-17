// Shared content + an animated mock UI of the AutoShop app (fictional demo data, no client info).
window.KIYO = {
  name: 'Aerrol John "Kiyo" Jimenez',
  first: "Aerrol John",
  last: "Jimenez",
  nick: "Kiyo",
  line: "Networking student by degree, full-stack developer by trade, defender by habit.",
  role: "Cybersecurity + Full-Stack Developer",
  loc: "Imus, Cavite, PH · Onsite / Hybrid / Remote",
  avail: "Available Dec 2026",
  email: "Jimenezaerroljj@gmail.com",
  github: "https://github.com/KiyoTopKop",
  linkedin: "https://www.linkedin.com/in/aerrol-jimenez-116b903b7/",
  autoshop: {
    title: "AutoShop Inventory & POS",
    tag: "Freelance · client confidential",
    problem: "A multi-branch auto parts shop tracked stock and sales in Excel sheets that drifted apart.",
    role: "Sole developer: design, build, security audit, delivery",
    stack: ["Next.js 14", "TypeScript", "Supabase + RLS", "Edge Functions", "Playwright"],
    approach: [
      "Four-role access control enforced in the database with Row Level Security, not just the UI",
      "Barcode stock-in/out, inter-branch transfers with approvals, and an audit log",
      "Adversarial audit before launch: tried to break my own app as a malicious staff account"
    ],
    result: "Replaced the Excel workflow, and the audit closed security and data-loss defects, including a privilege-escalation path, before launch.",
    links: "Private repo · walkthrough available on request"
  },
  projects: [
    ["AutoShop Inventory & POS", "Multi-branch inventory + POS with RLS"],
    ["Sovereign", "SOC analyst workspace and IR playbooks"],
    ["DePedal", "Campus bike-sharing: Flutter app, admin, backend"],
    ["CasaOS Home Lab", "Self-hosted server, DNS filtering, NAS"],
    ["Hermes AI Orchestration", "Orchestrator bot delegating to task bots"],
    ["AI Automation", "Study assistant, phishing triage, code helper"]
  ]
};

window.MockUI = {
  autoshop(c = {}) {
    const t = Object.assign({
      bg: "#101116", panel: "#181a22", line: "#2a2d38", fg: "#eceae4", muted: "#8d8f9c",
      acc: "#3d6bff", ok: "#3fb27f", warn: "#e0a43a", bad: "#e5534b", font: "Inter, system-ui, sans-serif"
    }, c);
    const rows = [
      ["Brake pad set, front", "Main", 0.82, "OK"],
      ["Oil filter, spin-on", "Main", 0.18, "Low"],
      ["Spark plug, iridium", "Branch 2", 0.64, "OK"],
      ["Timing belt kit", "Branch 2", 0.4, "OK"],
      ["Wiper blade 22in", "Main", 0.09, "Low"],
    ];
    const nav = ["Dashboard", "Inventory", "POS", "Stock In", "Transfers", "Audit Log"];
    let s = `<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mock UI of the AutoShop inventory app with demo data" style="font-family:${t.font};display:block;width:100%;height:auto">
<style>
.mu-scan{animation:muScan 4.8s ease-in-out infinite}
.mu-row{animation:muRow 4.8s ease-in-out infinite;opacity:0}
.mu-toast{animation:muToast 9.6s ease-in-out infinite;opacity:0}
@keyframes muScan{0%,100%{transform:translateY(0)}50%{transform:translateY(152px)}}
@keyframes muRow{0%,10%{opacity:0}20%,40%{opacity:1}55%,100%{opacity:0}}
@keyframes muToast{0%,52%{opacity:0;transform:translateY(8px)}58%,88%{opacity:1;transform:none}94%,100%{opacity:0}}
@media (prefers-reduced-motion: reduce){.mu-scan,.mu-row,.mu-toast{animation:none}.mu-toast{opacity:1}}
</style>
<rect width="640" height="400" rx="14" fill="${t.bg}"/>
<rect width="640" height="30" rx="14" fill="${t.panel}"/><rect y="16" width="640" height="14" fill="${t.panel}"/>
<circle cx="18" cy="15" r="5" fill="${t.bad}"/><circle cx="34" cy="15" r="5" fill="${t.warn}"/><circle cx="50" cy="15" r="5" fill="${t.ok}"/>
<rect x="220" y="7" width="200" height="16" rx="8" fill="${t.bg}"/><text x="320" y="19" font-size="9.5" fill="${t.muted}" text-anchor="middle">inventory · demo data</text>
<rect x="0" y="30" width="128" height="370" fill="${t.panel}"/>
<rect x="0" y="384" width="128" height="16" fill="${t.panel}"/>`;
    nav.forEach((n, i) => {
      const y = 58 + i * 30, on = i === 1;
      if (on) s += `<rect x="10" y="${y - 14}" width="108" height="24" rx="6" fill="${t.acc}" fill-opacity=".16"/>`;
      s += `<rect x="20" y="${y - 6}" width="8" height="8" rx="2" fill="${on ? t.acc : t.muted}"/><text x="36" y="${y + 2}" font-size="11" fill="${on ? t.fg : t.muted}" font-weight="${on ? 600 : 400}">${n}</text>`;
    });
    s += `<text x="20" y="372" font-size="9" fill="${t.muted}">ROLE</text><rect x="48" y="362" width="62" height="14" rx="7" fill="${t.line}"/><text x="79" y="372" font-size="8.5" fill="${t.fg}" text-anchor="middle">staff</text>`;
    ["Parts in stock", "Low stock", "Sales today", "Pending transfers"].forEach((k, i) => {
      const x = 144 + i * 122;
      s += `<rect x="${x}" y="46" width="112" height="62" rx="10" fill="${t.panel}" stroke="${t.line}"/><text x="${x + 12}" y="66" font-size="9.5" fill="${t.muted}">${k}</text>
<rect x="${x + 12}" y="76" width="${[58, 30, 46, 22][i]}" height="10" rx="5" fill="${i === 1 ? t.warn : t.fg}" fill-opacity="${i === 1 ? .9 : .85}"/>
<polyline points="${[0, 1, 2, 3, 4, 5, 6].map(j => `${x + 12 + j * 14},${98 - [3, 6, 4, 8, 5, 9, 7][(j + i) % 7]}`).join(" ")}" fill="none" stroke="${t.acc}" stroke-width="1.6"/>`;
    });
    s += `<rect x="144" y="122" width="480" height="218" rx="10" fill="${t.panel}" stroke="${t.line}"/>
<text x="160" y="144" font-size="12" font-weight="600" fill="${t.fg}">Inventory</text>
<rect x="476" y="131" width="132" height="20" rx="6" fill="${t.acc}"/><text x="542" y="145" font-size="10" font-weight="600" fill="${t.onAcc || "#fff"}" text-anchor="middle">Scan barcode</text>
<g font-size="9" fill="${t.muted}"><text x="160" y="170">PART</text><text x="350" y="170">BRANCH</text><text x="430" y="170">STOCK</text><text x="560" y="170">STATUS</text></g>
<line x1="156" y1="178" x2="612" y2="178" stroke="${t.line}"/>`;
    rows.forEach((r, i) => {
      const y = 198 + i * 30;
      s += `<text x="160" y="${y}" font-size="10.5" fill="${t.fg}">${r[0]}</text><text x="350" y="${y}" font-size="10" fill="${t.muted}">${r[1]}</text>
<rect x="430" y="${y - 8}" width="100" height="6" rx="3" fill="${t.line}"/><rect x="430" y="${y - 8}" width="${r[2] * 100}" height="6" rx="3" fill="${r[3] === "Low" ? t.warn : t.ok}"/>
<rect x="556" y="${y - 11}" width="${r[3] === "Low" ? 34 : 28}" height="15" rx="7.5" fill="${r[3] === "Low" ? t.warn : t.ok}" fill-opacity=".18"/><text x="${r[3] === "Low" ? 573 : 570}" y="${y}" font-size="9" fill="${r[3] === "Low" ? t.warn : t.ok}" text-anchor="middle">${r[3]}</text>`;
      if (i < 4) s += `<line x1="156" y1="${y + 12}" x2="612" y2="${y + 12}" stroke="${t.line}" stroke-opacity=".6"/>`;
    });
    s += `<g class="mu-scan"><rect x="146" y="184" width="476" height="24" fill="${t.acc}" fill-opacity=".10"/><rect x="146" y="184" width="3" height="24" fill="${t.acc}"/></g>
<g class="mu-row"><rect x="350" y="352" width="120" height="22" rx="11" fill="${t.ok}" fill-opacity=".16"/><text x="410" y="367" font-size="10" fill="${t.ok}" text-anchor="middle" font-weight="600">+1 stock in · logged</text></g>
<g class="mu-toast"><rect x="144" y="348" width="196" height="30" rx="8" fill="${t.bad}" fill-opacity=".14" stroke="${t.bad}" stroke-opacity=".5"/>
<text x="156" y="367" font-size="10" fill="${t.bad}" font-weight="600">Blocked by RLS: staff → super_admin</text></g>
</svg>`;
    return s;
  }
};
