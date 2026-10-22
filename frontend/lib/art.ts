const r = (i: number, n: number) => {
  const x = Math.sin(i * 97.1 + n * 13.7) * 1e4;
  return x - Math.floor(x);
};

const q = (w: number, n: number) => {
  const x = Math.sin(w * 57.3 + n * 7.9) * 1e4;
  return x - Math.floor(x);
};

export function art(i: number, w: number): string {
  const bg = Math.round(22 + r(i, 1) * 40);
  const sk = Math.round(64 + q(w, 2) * 26);
  const hr = Math.round(6 + q(w, 3) * 26);
  const st = q(w, 4);
  const sh = Math.round(hr + 22 + q(w, 6) * 30);

  let bk = "";
  for (let k = 0; k < 8; k++) {
    bk += `<circle cx="${r(i, k + 5) * 300 | 0}" cy="${r(i, k + 9) * 280 | 0}" r="${20 + r(i, k + 12) * 44 | 0}" fill="hsl(0 0% ${60 + r(i, k) * 40 | 0}%)" opacity=".${3 + (r(i, k + 3) * 4 | 0)}"/>`;
  }

  const back =
    st < 0.33
      ? `<rect x="96" y="130" width="108" height="170" rx="50" fill="hsl(0 0% ${hr}%)"/>`
      : st < 0.66
      ? ""
      : `<circle cx="150" cy="112" r="24" fill="hsl(0 0% ${hr}%)"/>`;

  const s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(0 0% ${bg + 22}%)"/><stop offset="1" stop-color="hsl(0 0% ${bg - 16}%)"/></linearGradient><filter id="b"><feGaussianBlur stdDeviation="13"/></filter></defs><rect width="300" height="400" fill="url(#g)"/><g filter="url(#b)">${bk}</g>${back}<path d="M10 400Q22 292 150 278Q278 292 290 400Z" fill="hsl(0 0% ${sh}%)"/><rect x="130" y="232" width="40" height="58" rx="14" fill="hsl(0 0% ${sk - 14}%)"/><ellipse cx="150" cy="190" rx="43" ry="53" fill="hsl(0 0% ${sk}%)"/><ellipse cx="150" cy="146" rx="47" ry="${st < 0.66 ? 30 : 24}" fill="hsl(0 0% ${hr}%)"/><circle cx="136" cy="190" r="2.8" fill="#111" opacity=".55"/><circle cx="164" cy="190" r="2.8" fill="#111" opacity=".55"/><path d="M137 216Q150 227 163 216" stroke="#111" stroke-opacity=".4" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(s);
}

export function qr(n: number): string {
  let r = "";
  const f = (x: number, y: number) => {
    for (const [ox, oy] of [
      [0, 0],
      [n - 7, 0],
      [0, n - 7],
    ]) {
      const dx = x - ox;
      const dy = y - oy;
      if (dx >= 0 && dx < 7 && dy >= 0 && dy < 7)
        return dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx > 1 && dx < 5 && dy > 1 && dy < 5) ? 1 : 0;
      if (dx >= -1 && dx < 8 && dy >= -1 && dy < 8) return 0;
    }
    return null;
  };
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      let v = f(x, y);
      if (v === null) {
        const h = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
        v = (h - Math.floor(h)) > 0.5 ? 1 : 0;
      }
      if (v) r += `<rect x="${x}" y="${y}" width="1.03" height="1.03"/>`;
    }
  }
  return `<svg viewBox="0 0 ${n} ${n}" fill="#0a0a0a" shape-rendering="crispEdges">${r}</svg>`;
}
