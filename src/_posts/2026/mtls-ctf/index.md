---
title: "mTLS CTF Challenge"
date: 2026-09-28
tags: ["homelab", "ctf", "mtls"]
category: "homelab"
excerpt: "A hands-on challenge to test your understanding of mutual TLS, certificate chains, and X.509 extensions."
draft: true
---

## The Challenge

A customer needs an urgent fix on a server but somehow that server's block is stuck at Y2K. The customer gave you the intermediate CA and key to generate the client certificate you need to connect. The customer also provided you with the fields the certificate needs to have.

**Server address:** <code id="tunnel-address">Loading...</code>

## Rules

Your client certificate must pass these checks:

1. **Chain of Trust**: Must be signed by the challenge Intermediate CA
2. **Required SAN**: Must contain `player.ctf.local`
3. **Enterprise OID**: Must contain custom OID `1.3.6.1.4.1.99999.1` with value `CTF-MEMBER-ACCESS`

## Getting Started

The PKI materials are available directly from the server:

- `ca.crt` — Root CA certificate
- `intermediate.crt` — Intermediate CA certificate
- `intermediate.key` — Intermediate CA private key

<script>
  // TODO: replace with real Worker URL
  // const WORKER_URL = "https://<YOUR_WORKER_URL>";

  async function fetchTunnelAddress() {
    // TODO: uncomment when Worker is deployed
    // try {
    //   const res = await fetch(WORKER_URL);
    //   if (!res.ok) return null;
    //   const data = await res.json();
    //   return data.address || null;
    // } catch {
    //   return null;
    // }

    // Test: simulate a response
    return "ldn1.e.tunnelthat.xyz:12345";
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
</script>
