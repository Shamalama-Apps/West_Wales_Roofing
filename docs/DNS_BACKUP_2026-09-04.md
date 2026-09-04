# DNS as it stood before the Cloudflare cutover

Captured 4 September 2026, immediately before moving nameservers from Spaceship
to Cloudflare. **Recreate every record below in Cloudflare and confirm it is
there before switching the nameservers.** Miss the mail records and Will's inbox
stops working.

## Mail — Spacemail. Do not lose these.

| Type | Name | Value | Priority |
|---|---|---|---|
| MX | @ | `mx1.spacemail.com` | 0 |
| MX | @ | `mx2.spacemail.com` | 0 |
| TXT | @ | `v=spf1 include:spf.spacemail.com ~all` | |
| TXT | `spacemail._domainkey` | the DKIM key below | |

DKIM value, one line, no spaces:

```
v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAk7GtrZT2Xpssp1HPXEoZ3at0WmF12YVXREjhWUuZb8nF4B9ACQMmeqSHUa1sNRC8KxwRXfa3gL9J7AL4brL3so6aicFpJtgYztzHEaR/ZFcwTovO6ErnNXWfKlLjrrm60MxDZsGOEMmeOzQqLmZSRkCC60HDDxAqhh+HRPKzkBozQg4MBMWJsUrLDbcLUCfd8zUpqCC+iAiobR9bwstnz/7gjMT+27N6eyb5bQxoks7VDFBqiQlnJb0gJsEVEIOXXQPAWZfPcjktnsrlCXXQGorwMvRWCWPI6isxozv2mOhZrL7BrhbspAcrFhu/s9i4D3EbqIlXpoD77/LjHkNl8wIDAQAB
```

There is **no DMARC record**. Worth adding one later, starting at `p=none`.

## Website — GitHub Pages, being replaced

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 |
| CNAME | www | `shamalama-apps.github.io` |

These are the ones being replaced by the Cloudflare Worker. Delete them only
after the Worker's custom domain is working.

## Nameservers before the change

`launch1.spaceship.net`, `launch2.spaceship.net`

## Two traps

1. **A domain may have only one SPF record.** When Cloudflare Email Sending is
   onboarded later it will want to add SPF. If it proposes a second record rather
   than merging, the combined value is
   `v=spf1 include:spf.spacemail.com include:_spf.mx.cloudflare.net ~all` —
   confirm the exact Cloudflare include before using that.
2. **Cloudflare's own MX for sending goes on a `cf-bounce` subdomain**, not the
   apex, so it does not displace Spacemail. If anything proposes changing the
   apex MX, stop.
