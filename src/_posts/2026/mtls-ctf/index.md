---
title: "mTLS CTF Challenge"
date: 2026-09-28
tags: ["homelab", "ctf", "mtls"]
category: "ctf"
excerpt: "A hands-on challenge to test your understanding of mutual TLS, certificate chains, and X.509 extensions."
draft: false
---

Recently, I noticed first-hand difficulties in understanding the concepts of TLS certificates in the context of mTLS. This inspired me to create a CTF challenge for players to tackle these concepts:

## The Challenge

A customer needs an urgent fix on a server, but somehow that server's clock is stuck at Y2K. The customer gave you the intermediate CA and its key to generate the client certificate you need to connect. The customer also provided you with the fields the certificate needs to have.

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

<script src="/js/tunnel.js" defer></script>
