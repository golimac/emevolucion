"use client";
import { useMemo } from "react";

function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// Imagen generada por elemento. Cada semilla produce una composición distinta.
export function ElementArt({ pilar, hue, seed }) {
  const shapes = useMemo(() => {
    const r = rng(seed);
    const j = () => hue + (r() * 24 - 12);
    const out = [];
    const bg = `hsl(${j()} 45% ${88 + r() * 6}%)`;
    if (pilar === "estabilidad") {
      for (let i = 0; i < 5; i++) {
        const y = 70 + i * 26 + r() * 10;
        out.push(
          <path key={i} d={`M0 ${y} Q ${60 + r() * 60} ${y - 30 - r() * 20} 160 ${y - 6} T 320 ${y - 4} V 240 H0 Z`}
            fill={`hsl(${j()} ${38 + i * 6}% ${62 - i * 8}%)`} />
        );
      }
    } else if (pilar === "plenitud") {
      for (let i = 0; i < 6; i++) {
        const cx = 160 + (r() * 80 - 40), cy = 130 + (r() * 40 - 20), rad = 90 - i * 13;
        out.push(<circle key={i} cx={cx} cy={cy} r={rad} fill={`hsl(${j()} 80% ${58 + i * 6}%)`} opacity={0.55} />);
      }
    } else if (pilar === "crecimiento") {
      const branch = (x, y, len, ang, depth, key) => {
        if (depth === 0) return [];
        const x2 = x + Math.cos(ang) * len, y2 = y + Math.sin(ang) * len;
        const parts = [<line key={key} x1={x} y1={y} x2={x2} y2={y2} stroke={`hsl(${j()} 40% ${30 + depth * 6}%)`} strokeWidth={depth * 1.6} strokeLinecap="round" />];
        parts.push(...branch(x2, y2, len * 0.74, ang - 0.4 - r() * 0.3, depth - 1, key + "a"));
        parts.push(...branch(x2, y2, len * 0.74, ang + 0.4 + r() * 0.3, depth - 1, key + "b"));
        if (depth === 1) parts.push(<circle key={key + "l"} cx={x2} cy={y2} r={6 + r() * 4} fill={`hsl(${j()} 60% 50%)`} opacity={0.8} />);
        return parts;
      };
      out.push(...branch(160, 230, 46, -Math.PI / 2, 5, "t"));
    } else if (pilar === "integracion") {
      for (let i = 0; i < 6; i++) {
        const y = 60 + i * 28;
        const a = 10 + r() * 14;
        out.push(
          <path key={i} d={`M0 ${y} C 80 ${y - a} 100 ${y + a} 160 ${y} S 260 ${y - a} 320 ${y} V 240 H0 Z`}
            fill={`hsl(${j()} ${55 + i * 3}% ${72 - i * 7}%)`} opacity={0.75} />
        );
      }
    } else {
      for (let i = 0; i < 7; i++) {
        out.push(<circle key={i} cx={160} cy={120} r={16 + i * 16 + r() * 4} fill="none" stroke={`hsl(${j()} 30% ${35 + i * 6}%)`} strokeWidth={1.5 + r() * 2} opacity={0.8} />);
      }
      out.push(<circle key="c" cx={160} cy={120} r={8} fill={`hsl(${j()} 40% 30%)`} />);
    }
    return { bg, out };
  }, [pilar, hue, seed]);

  return (
    <svg viewBox="0 0 320 240" width="100%" style={{ display: "block", borderRadius: 10 }} role="img" aria-label={`Imagen del pilar ${pilar}`}>
      <rect width="320" height="240" fill={shapes.bg} />
      {shapes.out}
    </svg>
  );
}

export function CaminoArt({ camino, hue, seed }) {
  const els = useMemo(() => {
    const r = rng(seed);
    const out = [];
    if (camino === "tormenta") {
      for (let i = 0; i < 9; i++) {
        const y = 30 + i * 22;
        out.push(<path key={i} d={`M-10 ${y} Q ${60 + r() * 40} ${y - 30 + r() * 20} 160 ${y} T 330 ${y + 6}`} fill="none" stroke={`hsl(${hue + r() * 20} 45% ${38 + i * 4}%)`} strokeWidth={3} opacity={0.75} />);
      }
    } else if (camino === "calma") {
      for (let i = 0; i < 6; i++) {
        out.push(<ellipse key={i} cx={160} cy={130} rx={40 + i * 24} ry={14 + i * 8} fill={`hsl(${hue + r() * 12} 45% ${82 - i * 5}%)`} opacity={0.8} />);
      }
    } else {
      for (let i = 0; i < 12; i++) {
        out.push(<circle key={i} cx={40 + r() * 240} cy={40 + r() * 160} r={4 + r() * 9} fill={`hsl(${hue + r() * 20} 40% ${60 + r() * 20}%)`} opacity={0.7} />);
      }
      out.push(<path key="s" d="M40 190 Q 160 150 280 190" fill="none" stroke={`hsl(${hue} 30% 45%)`} strokeWidth={2} />);
    }
    return out;
  }, [camino, hue, seed]);
  return (
    <svg viewBox="0 0 320 240" width="100%" style={{ display: "block", borderRadius: 10 }} role="img" aria-label={`Imagen del camino ${camino}`}>
      <rect width="320" height="240" fill={`hsl(${hue} 40% 92%)`} />
      {els}
    </svg>
  );
}

export function Thermometer({ valor, etiqueta }) {
  return (
    <div className="thermo">
      <div className="thermo-bar"><div className="thermo-fill" style={{ width: valor * 10 + "%" }} /></div>
      <div className="thermo-lbl">Termómetro · {etiqueta}: {valor} de 10</div>
    </div>
  );
}
