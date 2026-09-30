// Límites de uso compartidos por las rutas de la API. En memoria: sirven como
// freno razonable para una demo, pero se reinician cuando Vercel reinicia la
// función. El freno definitivo es el límite de gasto en la consola de Anthropic.
const IP_LIMIT = Number(process.env.DEMO_IP_LIMIT || 24);
const GLOBAL_LIMIT = Number(process.env.DEMO_GLOBAL_LIMIT || 600);

const store = globalThis.__emeStore || (globalThis.__emeStore = { day: "", global: 0, ips: new Map() });

export function allow(ip) {
  const d = new Date().toISOString().slice(0, 10);
  if (store.day !== d) {
    store.day = d;
    store.global = 0;
    store.ips = new Map();
  }
  const n = store.ips.get(ip) || 0;
  if (n >= IP_LIMIT || store.global >= GLOBAL_LIMIT) return false;
  store.ips.set(ip, n + 1);
  store.global += 1;
  return true;
}
