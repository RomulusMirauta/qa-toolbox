# Security

This repository holds test tooling only. Its modules run **read-only, low-rate** checks against one public app
(<https://romulus-mirauta.vercel.app>); the ZAP module is a **passive** baseline scan.

## Reporting

If you find a vulnerability in this tooling or in the app it tests, please report it privately through
[GitHub's private vulnerability reporting](https://github.com/RomulusMirauta/qa-toolbox/security/advisories/new)
instead of opening a public issue. I aim to reply within a week.

## Scope

- Please do not run active or high-rate scans against the app.
- Secrets are never committed: the only key (for the live promptfoo eval) lives in a GitHub Actions secret.
