const WORKER_URL = "https://ctf-tunnel-webhook.davidlag.workers.dev";

async function fetchTunnelAddress() {
  try {
    const res = await fetch(WORKER_URL);
    if (!res.ok) return null;
    const data = await res.json();
    return data.address || null;
  } catch {
    return null;
  }
}

async function updateTunnelDisplay() {
  const el = document.getElementById("tunnel-address");
  if (!el) return;
  const address = await fetchTunnelAddress();
  if (address) {
    el.textContent = address;
  } else {
    el.textContent = "Tunnel offline";
  }
}

updateTunnelDisplay();
